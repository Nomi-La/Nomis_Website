from rest_framework import serializers

from section.models import Section
from showcase.models import Project, Link


class ProjectSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    updated = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    links = serializers.SerializerMethodField()
    section_id = serializers.PrimaryKeyRelatedField(source='section', queryset=Section.objects.all(), write_only=True)
    section = serializers.CharField(source='section.name', read_only=True)
    plan = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'name', 'image', 'created', 'updated', 'plan', 'section', 'section_id', 'links']

        extra_kwargs = {
            'image': {'required': False, 'allow_null': True},
        }

    def get_plan(self, obj):
        if hasattr(obj, 'plan'):
            return True
        return False

    def get_links(self, obj):
        qs = getattr(obj, 'links', None)
        if qs is None:
            return []
        links = []
        for link in qs.all():
            links.append({
                'id': link.id,
                'name': link.name,
                'icon': getattr(link, 'icon', None),
                'link': link.link
            })
        return links

class LinkSerializer(serializers.ModelSerializer):
    project = serializers.CharField(source='project.name', read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(source='project', queryset=Project.objects.all())

    class Meta:
        model = Link
        fields = ['id', 'name', 'icon', 'link', 'project', 'project_id']
        extra_kwargs = {
            'icon': {'required': False, 'allow_null': True},
        }



