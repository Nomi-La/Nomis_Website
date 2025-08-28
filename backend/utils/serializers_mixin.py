from django.db import models
from rest_framework import serializers

from .images import compress_image_to_target

BYTES_PER_MB = 1024 * 1024


class ImageCompressOnDemandMixin:
    COMPRESS_FIELDS = None  # e.g. ['image', 'icon']; None → auto-detect ImageFields
    TARGET_IMAGE_MB = None  # float MB; None → no compression
    MAX_SIDE = None  # int px; None → no resizing
    HARD_MAX_MB = None  # reject files bigger than this (ValidationError)

    def _image_fields(self):
        if self.COMPRESS_FIELDS is not None:
            return self.COMPRESS_FIELDS
        model = getattr(getattr(self, 'Meta', None), 'model', None)
        if not model:
            return []
        return [f.name for f in model._meta.fields if isinstance(f, models.ImageField)]

    def _maybe_compress(self, attrs):
        if not self.TARGET_IMAGE_MB:
            return
        target_bytes = int(self.TARGET_IMAGE_MB * BYTES_PER_MB)
        for name in self._image_fields():
            f = attrs.get(name)
            if not f:
                continue
            size = getattr(f, "size", None)
            if size is None:
                continue
            if self.HARD_MAX_MB and size > int(self.HARD_MAX_MB * BYTES_PER_MB):
                # clean 400; never 500
                raise serializers.ValidationError({name: f"Max {self.HARD_MAX_MB}MB per file"})
            if size > target_bytes:
                try:
                    attrs[name] = compress_image_to_target(
                        f, target_mb=self.TARGET_IMAGE_MB, max_side=self.MAX_SIDE
                    )
                except Exception:
                    # absolutely no crashes on image handling
                    pass

    def create(self, validated_data):
        self._maybe_compress(validated_data)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        self._maybe_compress(validated_data)
        return super().update(instance, validated_data)
