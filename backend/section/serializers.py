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
    user = serializers.IntegerField(source='user.id', read_only=True)
    projects = serializers.SerializerMethodField()
    category_id = serializers.PrimaryKeyRelatedField(source='category', queryset=Category.objects.all(),
                                                     write_only=True)
    category = serializers.CharField(source='category.name', read_only=True)
    username = serializers.CharField(source='user.username' or'user.first_name', read_only=True)
    created = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    updated = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)

    class Meta:
        model = Section
        fields = ['id', 'name', 'content', 'image', 'image2', 'created', 'updated', 'category', 'category_id', 'user',
                  'username', 'projects', 'project']
        extra_kwargs = {
            'content': {'required': False, 'allow_blank': True, 'allow_null': True},
            'image': {'required': False, 'allow_null': True, 'use_url': True},
            'image2': {'required': False, 'allow_null': True, 'use_url': True},
        }

    def get_projects(self, obj):
        return obj.projects.all().count()

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        self._maybe_compress(validated_data)
        return super().create(validated_data)
