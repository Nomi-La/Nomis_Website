from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.functions import Lower

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=200)
    users = models.ManyToManyField(User, related_name='categories', blank=True)

    def __str__(self):
        return self.name

    # name should be unique
    class Meta:
        constraints = [
            models.UniqueConstraint(
                Lower('name'),
                name='uniq_category_name_ci'
            )
        ]
