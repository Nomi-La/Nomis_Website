from cookbook.models import Cookbook
from customUser.serializer import CustomUserSerializer
from rest_framework import serializers


class BasicCookbookSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Cookbook
        fields = ['id', 'title', 'description', 'user', 'created', 'updated']
