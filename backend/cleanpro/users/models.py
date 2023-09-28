# TODO: при релизе проверить, что валидация на клиенте
#       совпадает с валидацией на сервере!

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from .validators import (
    validate_email, validate_name, validate_password, validate_username)


class Address(models.Model):
    """Модель адреса."""
    city = models.CharField(
        verbose_name='Город',
        max_length=50
    )
    street = models.CharField(
        verbose_name='Улица',
        max_length=50
    )
    house = models.IntegerField(
        verbose_name='Дом'
    )
    apartment = models.IntegerField(
        verbose_name='Квартира',
        validators=[
            MaxValueValidator(9999, 'Укажите корректный номер квартиры.')
        ],
        null=True,
        blank=True,
    )
    floor = models.IntegerField(
        verbose_name='Этаж',
        validators=[MaxValueValidator(150, 'Укажите корректный этаж.')],
        null=True,
        blank=True,
    )
    entrance = models.IntegerField(
        verbose_name='Подъезд',
        validators=[MaxValueValidator(50, 'Укажите корректный подъезд.')],
        null=True,
        blank=True,
    )


class UserManager(BaseUserManager):
    '''Менеджер модели пользователя.'''

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        '''Создает и сохраняет пользователя с полученными почтой и паролем.'''
        if not email or password:
            raise ValueError('Укажите email и password.')
        email = self.normalize_email(email).lower()
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
        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """Модель пользователя."""

    username = models.CharField(
        verbose_name='Имя пользователя',
        max_length=30,
        validators=(validate_username,),
    )
    first_name = models.CharField(
        verbose_name='Имя',
        max_length=60,
        validators=(validate_name,),
    )
    email = models.EmailField(
        verbose_name='Адрес электронной почты',
        max_length=50,
        validators=(validate_email,),
        unique=True,
    )
    password = models.CharField(
        verbose_name='Пароль',
        max_length=256,
        # # TODO: Пока отключил валидацию, т.к. не могу создать пользователя.
        # Нужно проверять.
        # max_length=16,
        validators=(validate_password,),
    )
    phone = PhoneNumberField(
        verbose_name='Номер телефона',
        region='RU',
    )
    address = models.ForeignKey(
        Address,
        verbose_name='Услуги',
        related_name='users',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
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
