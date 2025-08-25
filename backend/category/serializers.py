from rest_framework import serializers

from category.models import Category


class CategorySerializer(serializers.ModelSerializer):
    sections = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'sections']
        read_only_fields = ['id']

    def get_sections(self, obj):
        return obj.sections.all().count()
