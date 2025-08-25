from rest_framework import serializers

from category.models import Category
from section.models import Section


class SectionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CreateOnlyDefault(serializers.CurrentUserDefault()))
    projects = serializers.SerializerMethodField()
    category_id = serializers.PrimaryKeyRelatedField(source='category', queryset=Category.objects.all(),
                                                     write_only=True)
    category = serializers.CharField(source='category.name', read_only=True)
    owner = serializers.CharField(source='user.first_name', read_only=True)
    created = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    updated = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)

    class Meta:
        model = Section
        fields = ['id', 'name', 'content', 'image', 'image2', 'created', 'updated', 'category', 'category_id', 'user',
                  'owner', 'projects']
        extra_kwargs = {
            'content': {'required': False, 'allow_blank': True, 'allow_null': True},
            'image': {'required': False, 'allow_null': True},
            'image2': {'required': False, 'allow_null': True},
        }

    def get_projects(self, obj):
        return obj.projects.all().count()
