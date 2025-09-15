from rest_framework import serializers

from section.models import Section
from showcase.models import Project
from utils.serializers_mixin import ImageCompressOnDemandMixin


class ProjectSerializer(ImageCompressOnDemandMixin, serializers.ModelSerializer):
    COMPRESS_FIELDS = ['image']
    TARGET_IMAGE_MB = 2
    MAX_SIDE = None
    HARD_MAX_MB = 6

    created = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    updated = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    section = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all())
    section_name = serializers.CharField(source='section.name', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'image', 'view', 'view_code', 'position', 'created', 'updated', 'category', 'section',
                  'section_name', ]

        extra_kwargs = {
            'image': {'required': False, 'allow_null': True, 'use_url': True},
            'view': {'required': False, 'allow_blank': True},
            'view_code': {'required': False, 'allow_blank': True},
            "position": {"required": False},
        }
