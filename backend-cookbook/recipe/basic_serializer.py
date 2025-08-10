from rest_framework import serializers
from .models import Recipe


class BasicRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'difficulty']
