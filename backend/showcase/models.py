from django.db import models
from django.db.models import Max

from utils.validators import mb_size


class Project(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='project_images/', validators=[mb_size(5)], blank=True, null=True)
    view = models.URLField(max_length=500, blank=True)
    view_code = models.URLField(max_length=500, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    position = models.PositiveIntegerField(default=0, db_index=True)
    section = models.ForeignKey('section.Section', on_delete=models.CASCADE, related_name='projects')
    plan = models.ForeignKey('category.Category', on_delete=models.PROTECT, related_name='projects', null=True,
                             blank=True)

    class Meta:
        ordering = ["position", "id"]

    def __str__(self):
        return f'{self.id} Project: {self.name}'

    def save(self, *args, **kwargs):
        if self._state.adding and (not self.position or self.position <= 0) and self.section_id:
            last = Project.objects.filter(section_id=self.section_id).aggregate(m=Max('position'))['m'] or 0
            self.position = last + 1
        super().save(*args, **kwargs)

