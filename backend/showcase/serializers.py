from rest_framework import serializers

from section.models import Section
from showcase.models import Project, Link
from utils.serializers_mixin import ImageCompressOnDemandMixin


class ProjectSerializer(ImageCompressOnDemandMixin, serializers.ModelSerializer):
    COMPRESS_FIELDS = ['image']
    TARGET_IMAGE_MB = 1
    MAX_SIDE = None
    HARD_MAX_MB = 6

    created = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    updated = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    links = serializers.SerializerMethodField()
    section = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all())
    section_name = serializers.CharField(source='section.name', read_only=True)
    plans = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'name', 'image', 'created', 'updated', 'plan', 'plans', 'section', 'section_name', 'links']

        extra_kwargs = {
            'image': {'required': False, 'allow_null': True, 'use_url': True},
            'plan': {'required': False, 'allow_null': True},
        }

    def get_plans(self, obj):
        return obj.plans.all().count()

    def validate_section_id(self, section):
        request = self.context.get("request")
        if section.user != request.user:
            raise serializers.ValidationError('This is NOT your section :)')
        return section

    def get_links(self, obj):
        qs = getattr(obj, 'links', None)
        if qs is None:
            return []
        links = []
        for link in qs.all():
            icon_val = None
            icon = getattr(link, 'icon', None)
            if icon and hasattr(icon, 'url'):
                icon_val = icon.url

            links.append({
                'id': link.id,
                'name': link.name,
                'icon': icon_val,
                'link': link.link
            })
        return links


class LinkSerializer(ImageCompressOnDemandMixin, serializers.ModelSerializer):
    COMPRESS_FIELDS = ['icon']
    TARGET_IMAGE_MB = 0.2
    MAX_SIDE = None
    HARD_MAX_MB = 3

    project = serializers.CharField(source='project.name', read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(source='project', queryset=Project.objects.all())

    class Meta:
        model = Link
        fields = ['id', 'name', 'icon', 'link', 'project', 'project_id']
        extra_kwargs = {
            'icon': {'required': False, 'allow_null': True, 'use_url': True},
        }

    def validate_project_id(self, project):
        request = self.context.get("request")
        if project.section.user != request.user:
            raise serializers.ValidationError('This is NOT your project :)')
        return project
