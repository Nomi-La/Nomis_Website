from django.contrib.auth.models import AbstractUser
from django.db import models

from utils.validators import mb_size


class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='user_avatars/', validators=[mb_size(0.5)], null=True, blank=True)
    avatar2 = models.ImageField(upload_to='user_avatars/', validators=[mb_size(0.5)], null=True, blank=True)
    logo = models.ImageField(upload_to='user_logo/', null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    intro = models.CharField(max_length=1000, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        if hasattr(self, 'username') and self.username:
            return self.username
        else:
            return f'{self.first_name} {self.last_name}'
