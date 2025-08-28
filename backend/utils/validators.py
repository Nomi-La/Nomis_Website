from django.core.exceptions import ValidationError

def mb_size(max_mb):
    def _validate(file):
        if file.size > max_mb * 1024 * 1024:
            raise ValidationError(f"Max  {max_mb}MB per file")
    return _validate