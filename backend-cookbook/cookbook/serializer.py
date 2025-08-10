from rest_framework import serializers

from cookbook.models import Cookbook
from customUser.serializer import CustomUserSerializer
from recipe.basic_serializer import BasicRecipeSerializer


class CookbookSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    recipes = BasicRecipeSerializer(many=True, read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)
    image_url = serializers.URLField(
        required=False, allow_blank=True, allow_null=True, write_only=True
    )
    image_url_display = serializers.SerializerMethodField()

    class Meta:
        model = Cookbook
        fields = [
            'id', 'title', 'description', 'user',
            'created', 'updated', 'recipes',
            'image', 'image_url', 'image_url_display'
        ]

    def get_image_url_display(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        elif obj.image_url:
            return obj.image_url
        return None


"""
- use image to upload an image as file
- use image_url to upload image with url

- you get image_url_display back with url of image
"""
