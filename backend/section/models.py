from django.contrib.auth import get_user_model
from django.db import models

from category.models import Category

User = get_user_model()


class Section(models.Model):
    name = models.CharField(max_length=200)
    content = models.CharField(max_length=10000, null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    link = models.CharField(max_length=500, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sections')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sections')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} ({self.category.name})'
