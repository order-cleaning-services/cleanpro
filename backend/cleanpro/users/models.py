from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField('Email', unique=True)
    password = models.CharField('Пароль', max_length=16)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('password',)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ('email',)

    def __str__(self):
        return self.username[:30]
