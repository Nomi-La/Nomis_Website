from rest_framework import serializers

from category.models import Category
from section.models import Section
from utils.serializers_mixin import ImageCompressOnDemandMixin


class SectionSerializer(ImageCompressOnDemandMixin, serializers.ModelSerializer):
    COMPRESS_FIELDS = ['image', 'image2']
    TARGET_IMAGE_MB = 1.5
    MAX_SIDE = None
    HARD_MAX_MB = 6

    # user = serializers.HiddenField(default=serializers.CreateOnlyDefault(serializers.CurrentUserDefault()))
    user = serializers.IntegerField(source='category.user.id', read_only=True)
    projects = serializers.SerializerMethodField()
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_name = serializers.CharField(source='category.name', read_only=True)
    username = serializers.CharField(source='category.user.username' or 'user.first_name', read_only=True)
    created = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    updated = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)

    class Meta:
        model = Section
        fields = ['id', 'name', 'content', 'image', 'image2', 'position', 'created', 'updated', 'category', 'category_name', 'user',
                  'username', 'projects']
        extra_kwargs = {
            'content': {'required': False, 'allow_blank': True, 'allow_null': True},
            'image': {'required': False, 'allow_null': True, 'use_url': True},
            'image2': {'required': False, 'allow_null': True, 'use_url': True},
            "position": {"required": False},
        }

    def get_projects(self, obj):
        return obj.projects.all().count()

    def create(self, validated_data):
        self._maybe_compress(validated_data)
        return super().create(validated_data)
