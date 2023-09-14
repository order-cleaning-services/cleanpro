from cleanpro.settings import ADMIN, USER
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from .validators import validate_name, validate_password, validate_email
from service.models import Address


class Address(models.Model):
    """Модель адреса."""
    city = models.CharField(
        # TODO: прописать все магические числа. Везде.
        verbose_name='Город',
        max_length=25,
    )
    street = models.CharField(
        verbose_name='Улица',
        max_length=150
    )
    house = models.CharField(
        verbose_name='Дом',
        max_length=60
    )
    apartment = models.PositiveSmallIntegerField(
        verbose_name='Квартира',
        default=None,
        blank=True,
        null=True,
        validators=[MaxValueValidator(9999)],
    )
    floor = models.PositiveSmallIntegerField(
        verbose_name='Этаж',
        blank=True,
        null=True,
        validators=[MaxValueValidator(200)]
    )
    entrance = models.PositiveSmallIntegerField(
        verbose_name='Подъезд',
        blank=True,
        null=True,
        validators=[MaxValueValidator(99)]
    )


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


class User(AbstractUser):
    """Модель пользователя."""

    username = last_name = None
    first_name =  models.CharField(
        verbose_name='Имя',
        max_length=60,
        validators=[validate_name]
    )
    email = models.EmailField(
        verbose_name='Адрес электронной почты',
        max_length=50,
        unique=True,
        validators=[validate_email]
    )
    password = models.CharField(
        verbose_name='Пароль',
        max_length=16,
        validators=[validate_password]
    )
    phone = PhoneNumberField(
        verbose_name='Номер телефона',
        region='RU'
    )
    address = models.ForeignKey(
        Address,
        verbose_name='Услуги',
        related_name='users',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    role = models.CharField(
        verbose_name='Роль',
        choices=(
            (USER, 'Пользователь'),
            (ADMIN, 'Администратор'),
        ),
        max_length=5,
        default=USER,
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
        self.role == ADMIN
        return
