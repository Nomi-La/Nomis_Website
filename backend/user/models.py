from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='user_avatars/', null=True, blank=True)
    avatar2 = models.ImageField(upload_to='user_avatars/', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        if hasattr(self, 'username') and self.username:
            return self.username
        else:
            return f'{self.first_name} {self.last_name}'
