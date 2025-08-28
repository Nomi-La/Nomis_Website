from io import BytesIO
from pathlib import Path

from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile


def compress_image_to_target(upload, *, target_mb=0.5, max_side=None, q_min=40, q_max=95, attempts=8):
    target_bytes = int(target_mb * 1024 * 1024)

    size_bytes = getattr(upload, "size", None)
    if size_bytes is not None and size_bytes <= target_bytes:
        return upload

    img = Image.open(upload)
    img.load()
    has_alpha = (img.mode in ("RGBA", "LA")) or (img.mode == "P" and "transparency" in img.info)
    img = img.convert("RGBA" if has_alpha else "RGB")

    if max_side:
        img.thumbnail((max_side, max_side), Image.LANCZOS)

    def encode(q, im):
        buf = BytesIO()
        im.save(buf, format="WEBP", quality=int(q), method=6, optimize=True)
        return buf

    low, high, best = q_min, q_max, None
    while low <= high and attempts > 0:
        attempts -= 1
        q = (low + high) // 2
        buf = encode(q, img)
        if buf.getbuffer().nbytes <= target_bytes:
            best, low = buf, q + 1
        else:
            high = q - 1

    if best is None and max_side:
        w, h = img.size
        while best is None and min(w, h) > 64:
            w, h = int(w * 0.9), int(h * 0.9)
            img = img.resize((max(w, 64), max(h, 64)), Image.LANCZOS)
            buf = encode(q_min, img)
            if buf.getbuffer().nbytes <= target_bytes:
                best = buf

    if best is None:
        best = encode(q_min, img)

    best.seek(0)
    name = f"{Path(getattr(upload, 'name', 'image')).stem}.webp"
    return InMemoryUploadedFile(best, None, name, "image/webp", best.getbuffer().nbytes, None)
