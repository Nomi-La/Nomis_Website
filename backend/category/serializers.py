from rest_framework import serializers

from category.models import Category


class CategorySerializer(serializers.ModelSerializer):
    sections = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'user', 'position', 'sections', 'project']

        extra_kwargs = {"position": {"required": False}}

    def get_sections(self, obj):
        qs = getattr(obj, 'sections', None)
        if qs is None:
            return []
        sections = []
        for section in qs.all():
            sections.append({
                'id': section.id,
                'name': section.name,
            })
        return sections

    def validate_user(self, user):
        request = self.context.get("request")
        if user != request.user:
            raise serializers.ValidationError('This is NOT your category :)')
        return user
