from django.conf import settings
from django.db import models


class Cookbook(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='cookbook_images/', null=True, blank=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # relationship with others fields

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cookbooks')

    def __str__(self):
        return self.title
