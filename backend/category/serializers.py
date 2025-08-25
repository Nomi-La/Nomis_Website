from rest_framework import serializers
from category.models import Category


class CategorySerializer(serializers.ModelSerializer):
    sections = serializers.SerializerMethodField()
    users = serializers.SerializerMethodField()
    projects = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'users', 'sections', 'projects']

    def get_sections(self, obj):
        return obj.sections.all().count()

    def get_users(self, obj):
        return obj.users.all().count()

    def get_projects(self, obj):
        return obj.projects.all().count()


    def validate_name(self, value):
        return value.strip()
        # if Category.objects.filter(name__iexact=value).exists():
        #     raise serializers.ValidationError("This category already exists")
        # return value

    def create(self, validated_data):
        name = validated_data['name']
        category, _ = Category.objects.get_or_create(
            name__iexact=name,
            defaults={'name': name}
        )
        return category
