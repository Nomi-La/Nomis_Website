from io import BytesIO
from pathlib import Path
from PIL import Image, ImageFile, ImageOps, features
from django.core.files.uploadedfile import InMemoryUploadedFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

def _seek0(f):
    try: f.seek(0)
    except Exception: pass

def _encode(img, fmt, quality=None):
    buf = BytesIO()
    try:
        if fmt == "WEBP":
            img.save(buf, "WEBP", quality=int(quality if quality is not None else 80), method=6, optimize=True)
        elif fmt == "JPEG":
            img.convert("RGB").save(buf, "JPEG", quality=int(quality if quality is not None else 85), optimize=True, progressive=True)
        elif fmt == "PNG":
            img.save(buf, "PNG", optimize=True)
        else:
            return None
        return buf
    except Exception:
        return None

def _buf_to_upload(buf, upload, ext, content_type):
    buf.seek(0)
    name = f"{Path(getattr(upload, 'name', 'image')).stem}.{ext}"
    return InMemoryUploadedFile(buf, None, name, content_type, buf.getbuffer().nbytes, None)

def _quality_search(img, fmt, target_bytes, q_min=40, q_max=95, tries=8):
    low, high = q_min, q_max
    best = None
    while low <= high and tries > 0:
        tries -= 1
        q = (low + high) // 2
        buf = _encode(img, fmt, q)
        if not buf:
            break
        sz = buf.getbuffer().nbytes
        if sz <= target_bytes:
            best = (sz, buf, q)
            low = q + 1
        else:
            high = q - 1
    if best:
        return best

    buf = _encode(img, fmt, q_min)
    return (buf.getbuffer().nbytes, buf, q_min) if buf else None

def _scale_search(img, fmt, target_bytes, q_min, q_max, min_side=128, tries=6):
    w0, h0 = img.size

    s_low = max(min_side / max(w0, h0), 0.05)
    s_high = 1.0
    best = None
    while tries > 0 and s_high - s_low > 0.01:
        tries -= 1
        s = (s_low + s_high) / 2
        w = max(int(w0 * s), 1)
        h = max(int(h0 * s), 1)
        test = img.resize((w, h), Image.LANCZOS)
        if fmt == "PNG":

            buf = _encode(test, "PNG")
            if not buf:
                break
            sz = buf.getbuffer().nbytes
            if sz <= target_bytes:
                best = (sz, buf, s)

                s_low = s
            else:
                s_high = s
        else:
            r = _quality_search(test, fmt, target_bytes, q_min, q_max, tries=6)
            if r:
                sz, buf, _ = r
                best = (sz, buf, s)
                s_low = s
            else:
                s_high = s
    return best

def compress_image_to_target(upload, *, target_mb=0.5, max_side=None, q_min=40, q_max=95, attempts=8):

    target_bytes = int(target_mb * 1024 * 1024)
    orig_size = getattr(upload, "size", None)

    if orig_size is not None and orig_size <= target_bytes:
        _seek0(upload)
        return upload

    try:
        _seek0(upload)
        img = Image.open(upload); img.load()
        img = ImageOps.exif_transpose(img)
    except Exception:
        _seek0(upload)
        return upload

    has_alpha = (img.mode in ("RGBA","LA")) or (img.mode == "P" and "transparency" in img.info)
    img = img.convert("RGBA" if has_alpha else "RGB")

    if max_side:
        try: img.thumbnail((max_side, max_side), Image.LANCZOS)
        except Exception: pass

    webp_ok = features.check("webp")
    fmt = "WEBP" if webp_ok else ("PNG" if has_alpha else "JPEG")
    ext = "webp" if fmt == "WEBP" else ("png" if fmt == "PNG" else "jpg")
    ctype = "image/webp" if fmt == "WEBP" else ("image/png" if fmt == "PNG" else "image/jpeg")

    if fmt == "PNG":
        buf = _encode(img, "PNG")
        if buf:
            sz = buf.getbuffer().nbytes
            if sz <= target_bytes:
                if orig_size is not None and sz >= orig_size:
                    _seek0(upload); return upload
                return _buf_to_upload(buf, upload, ext, ctype)
    else:
        r = _quality_search(img, fmt, target_bytes, q_min, q_max, tries=attempts)
        if r:
            sz, buf, _ = r
            if orig_size is not None and sz >= orig_size:
                _seek0(upload); return upload
            return _buf_to_upload(buf, upload, ext, ctype)

    r2 = _scale_search(img, fmt, target_bytes, q_min, q_max, min_side=128, tries=6)
    if r2:
        sz, buf, _ = r2
        if orig_size is not None and sz >= orig_size:
            _seek0(upload); return upload
        return _buf_to_upload(buf, upload, ext, ctype)

    _seek0(upload)
    return upload


# from io import BytesIO
# from pathlib import Path
#
# from PIL import Image, ImageFile, ImageOps, features
# from django.core.files.uploadedfile import InMemoryUploadedFile
#
# ImageFile.LOAD_TRUNCATED_IMAGES = True
#
#
# def _seek0(obj):
#     try:
#         obj.seek(0)
#     except Exception:
#         pass
#
#
# def _buf_to_upload(buf: BytesIO, upload, fmt: str, content_type: str):
#     buf.seek(0)
#     name = f"{Path(getattr(upload, 'name', 'image')).stem}.{fmt.lower()}"
#     return InMemoryUploadedFile(buf, None, name, content_type, buf.getbuffer().nbytes, None)
#
#
# def _encode(im: Image.Image, fmt: str, quality: int | None = None):
#     """Return BytesIO or None on failure."""
#     buf = BytesIO()
#     try:
#         if fmt == "WEBP":
#             # if Pillow lacks webp support, this will raise
#             im.save(buf, format="WEBP", quality=int(quality if quality is not None else 80), method=6, optimize=True)
#             return buf
#         if fmt == "JPEG":
#             im_rgb = im.convert("RGB")  # JPEG has no alpha
#             im_rgb.save(buf, format="JPEG", quality=int(quality if quality is not None else 85), optimize=True,
#                         progressive=True)
#             return buf
#         if fmt == "PNG":
#             im.save(buf, format="PNG", optimize=True)
#             return buf
#     except Exception:
#         return None
#     return None
#
#
# def compress_image_to_target(upload, *, target_mb=0.5, max_side=None, q_min=40, q_max=95, attempts=8):
#     """
#     - Never enlarges files (returns original if result isn't smaller).
#     - Only compresses if original size > target.
#     - Respects max_side (only downsizes; never upsizes).
#     - Robust to bad/corrupt/unsupported images (returns original).
#     - Fallbacks: WEBP (if available) → JPEG/PNG.
#     """
#     target_bytes = int(target_mb * 1024 * 1024)
#     orig_size = getattr(upload, "size", None)
#
#     # If already small enough, don’t touch
#     if orig_size is not None and orig_size <= target_bytes:
#         _seek0(upload)
#         return upload
#
#     # Open safely
#     try:
#         _seek0(upload)
#         img = Image.open(upload)
#         img.load()
#         img = ImageOps.exif_transpose(img)  # respect EXIF orientation
#     except Exception:
#         _seek0(upload)
#         return upload
#
#     # Normalize mode: keep alpha if exists (for PNG/WEBP), else RGB
#     has_alpha = (img.mode in ("RGBA", "LA")) or (img.mode == "P" and "transparency" in img.info)
#     img = img.convert("RGBA" if has_alpha else "RGB")
#
#     # Optional downscale (never upscale)
#     if max_side:
#         try:
#             img.thumbnail((max_side, max_side), Image.LANCZOS)
#         except Exception:
#             pass
#
#     candidates: list[tuple[int, str, BytesIO, str]] = []  # (size, ext, buf, content_type)
#
#     # --- Try WEBP (if supported) with quality binary search ---
#     if features.check("webp"):
#         low, high, best_buf, best_sz = q_min, q_max, None, None
#         tries = max(1, int(attempts))
#         while low <= high and tries > 0:
#             tries -= 1
#             q = (low + high) // 2
#             buf = _encode(img, "WEBP", q)
#             if buf is None:
#                 break
#             sz = buf.getbuffer().nbytes
#             if sz <= target_bytes:
#                 best_buf, best_sz = buf, sz
#                 low = q + 1
#             else:
#                 high = q - 1
#         if best_buf is None:
#             # last resort WEBP at q_min
#             buf = _encode(img, "WEBP", q_min)
#             if buf is not None:
#                 best_buf, best_sz = buf, buf.getbuffer().nbytes
#         if best_buf is not None:
#             candidates.append((best_sz, "webp", best_buf, "image/webp"))
#
#     # --- Fallbacks: JPEG (no alpha) or PNG (has alpha) ---
#     if not candidates:
#         if has_alpha:
#             buf = _encode(img, "PNG", None)
#             if buf is not None:
#                 candidates.append((buf.getbuffer().nbytes, "png", buf, "image/png"))
#         else:
#             # binary search JPEG quality
#             low, high, best_buf, best_sz = q_min, q_max, None, None
#             tries = max(1, int(attempts))
#             while low <= high and tries > 0:
#                 tries -= 1
#                 q = (low + high) // 2
#                 buf = _encode(img, "JPEG", q)
#                 if buf is None:
#                     break
#                 sz = buf.getbuffer().nbytes
#                 if sz <= target_bytes:
#                     best_buf, best_sz = buf, sz
#                     low = q + 1
#                 else:
#                     high = q - 1
#             if best_buf is None:
#                 buf = _encode(img, "JPEG", q_min)
#                 if buf is not None:
#                     best_buf, best_sz = buf, buf.getbuffer().nbytes
#             if best_buf is not None:
#                 candidates.append((best_sz, "jpg", best_buf, "image/jpeg"))
#
#     # No candidate? keep original
#     if not candidates:
#         _seek0(upload)
#         return upload
#
#     # Pick the smallest candidate that actually improves on original (if we know original size)
#     best_sz, ext, buf, ctype = min(candidates, key=lambda x: x[0])
#     if orig_size is not None and best_sz >= orig_size:
#         _seek0(upload)
#         return upload
#
#     return _buf_to_upload(buf, upload, ext, ctype)
