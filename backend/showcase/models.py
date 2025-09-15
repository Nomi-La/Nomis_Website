from django.db import models
from django.db.models import Max

from utils.validators import mb_size


class Project(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='project_images/', validators=[mb_size(5)], blank=True, null=True)
    view = models.URLField(max_length=500, blank=True)
    view_code = models.URLField(max_length=500, blank=True)
    position = models.PositiveIntegerField(default=0, db_index=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    category = models.OneToOneField('category.Category', on_delete=models.PROTECT, related_name='project', null=True,  blank=True)
    section = models.ForeignKey('section.Section', on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return f'{self.id} Project: {self.name}'

    class Meta:
        ordering = ["position", "id"]

    def save(self, *args, **kwargs):
        if self._state.adding and (not self.position or self.position <= 0):
            last = Project.objects.filter(section=self.section).aggregate(m=Max('position'))['m'] or 0
            self.position = last + 1
        super().save(*args, **kwargs)
