from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class UserManager(BaseUserManager):
    '''Менеджер модели пользователя.'''

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        '''Создает и сохраняет пользователя с полученными почтой и паролем.'''
        if not email:
            raise ValueError('Email должен быть предоставлен.')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Администратор должен иметь поле is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(
                'Администратор должен иметь поле is_superuser=True.'
            )

        return self._create_user(email, password, **extra_fields)


class Roles(models.Model):
    '''Модель ролей пользователей.'''

    ADMIN = 'admin'
    USER = 'user'
    ROLE_CHOICES = (
        (ADMIN, 'Администратор'),
        (USER, 'Пользователь'),
    )


class User(AbstractUser):
    '''Модель пользователя.'''

    username = last_name = None
    email = models.EmailField('Адрес электронной почты', unique=True)
    password = models.CharField('Пароль')
    phone = PhoneNumberField(
        'Номер телефона', blank=True, unique=True, region='RU'
    )
    city = models.CharField('Город', max_length=150, blank=True)
    street = models.CharField('Улица', max_length=150, blank=True)
    house = models.PositiveSmallIntegerField('Дом', blank=True, null=True)
    apartment = models.PositiveSmallIntegerField(
        'Квартира', blank=True, null=True
    )

    objects = UserManager()
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ('email',)

    def __str__(self):
        return self.email

    @property
    def is_admin(self):
        return self.role == Roles.ADMIN
