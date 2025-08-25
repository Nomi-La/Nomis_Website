from django.contrib.auth import get_user_model
from django.db import models

from category.models import Category

User = get_user_model()


class Section(models.Model):
    name = models.CharField(max_length=200)
    content = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='section_images/', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='sections')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sections')

    def __str__(self):
        return f'{self.name} ({self.category.name})'
