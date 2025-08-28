from django.core.exceptions import ValidationError

class MaxFileSizeValidator:
    def __init__(self, max_mb: float):
        self.max_mb = float(max_mb)

    def __call__(self, file):
        if not file or not hasattr(file, "size"):
            return
        if file.size > self.max_mb * 1024 * 1024:
            raise ValidationError(f"Max {self.max_mb}MB per file")

    def deconstruct(self):
        return ("utils.validators.MaxFileSizeValidator", (), {"max_mb": self.max_mb})

    def __eq__(self, other):
        return isinstance(other, MaxFileSizeValidator) and self.max_mb == other.max_mb

def mb_size(max_mb: float):
    return MaxFileSizeValidator(max_mb)