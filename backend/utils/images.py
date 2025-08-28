from io import BytesIO
from pathlib import Path
from PIL import Image, ImageFile
from django.core.files.uploadedfile import InMemoryUploadedFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

def compress_image_to_target(upload, *, target_mb=0.5, max_side=None, q_min=40, q_max=95, attempts=8):
    target_bytes = int(target_mb * 1024 * 1024)

    size_bytes = getattr(upload, "size", None)
    if size_bytes is not None and size_bytes <= target_bytes:
        return upload

    try:
        img = Image.open(upload)
        img.load()
    except Exception:

        return upload

    has_alpha = (img.mode in ("RGBA", "LA")) or (img.mode == "P" and "transparency" in img.info)
    img = img.convert("RGBA" if has_alpha else "RGB")

    if max_side:
        img.thumbnail((max_side, max_side), Image.LANCZOS)

    def try_encode_webp(q: int):

        buf = BytesIO()
        try:
            img.save(buf, format="WEBP", quality=int(q))
            return buf
        except Exception:
            return None

    low, high, best = q_min, q_max, None
    while low <= high and attempts > 0:
        attempts -= 1
        q = (low + high) // 2
        buf = try_encode_webp(q)
        if buf is None:
            return upload

        if buf.getbuffer().nbytes <= target_bytes:
            best, low = buf, q + 1
        else:
            high = q - 1

    if best is None:
        buf = try_encode_webp(q_min)
        if buf is None:
            return upload
        best = buf

    best.seek(0)
    name = f"{Path(getattr(upload, 'name', 'image')).stem}.webp"
    return InMemoryUploadedFile(best, None, name, "image/webp", best.getbuffer().nbytes, None)