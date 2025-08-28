from django.db import models

from utils.validators import mb_size


class Project(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='project_images/', validators=[mb_size(1)], null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    section = models.ForeignKey('section.Section', on_delete=models.CASCADE, related_name='projects')
    plan = models.ForeignKey('category.Category', on_delete=models.PROTECT, related_name='projects', null=True,
                             blank=True)

    def __str__(self):
        return f'Project: {self.name}'


class Link(models.Model):
    name = models.CharField(max_length=200)
    icon = models.ImageField(upload_to='link_icons/', validators=[mb_size(0.4)], null=True, blank=True)
    link = models.URLField(max_length=500)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='links')

    def __str__(self):
        return f'{self.name}, {self.project.section.user.username or self.project.section.user.first_name}'
