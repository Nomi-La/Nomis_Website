from django.db import models

from category.models import Category
from section.models import Section


class Project(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='project_images/', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    plan = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='projects', blank=True, null=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return f'Project: {self.name}'


class Link(models.Model):
    name = models.CharField(max_length=200)
    icon = models.ImageField(upload_to='link_icons/', null=True, blank=True)
    link = models.URLField(max_length=500)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='links')
