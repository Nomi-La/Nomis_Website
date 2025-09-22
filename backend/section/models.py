from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Max

from category.models import Category
from utils.validators import mb_size

User = get_user_model()


class Section(models.Model):
    name = models.CharField(max_length=200)
    content = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='section_images/', validators=[mb_size(5)], null=True, blank=True)
    image2 = models.ImageField(upload_to='section_images/', validators=[mb_size(5)], null=True, blank=True)
    position = models.PositiveIntegerField(default=0, db_index=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sections')

    def __str__(self):
        return f'{self.id} {self.name} ({self.category.name})'

    class Meta:
        ordering = ["position", "id"]

    def save(self, *args, **kwargs):
        if self._state.adding and (not self.position or self.position <= 0):
            last = Section.objects.filter(category=self.category).aggregate(m=Max('position'))['m'] or 0
            self.position = last + 1
        super().save(*args, **kwargs)
