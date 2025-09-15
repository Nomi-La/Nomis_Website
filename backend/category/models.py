from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Max

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, related_name='categories', on_delete=models.CASCADE)
    position = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ["position", "id"]

    def __str__(self):
        return f'{self.id} {self.name}'

    def save(self, *args, **kwargs):
        if self._state.adding and (not self.position or self.position <= 0):
            last = Category.objects.filter(user=self.user).aggregate(m=Max('position'))['m'] or 0
            self.position = last + 1
        super().save(*args, **kwargs)


