from cleanpro.settings import ADMIN, USER
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Address(models.Model):
    """Модель адреса."""
    city = models.CharField(
        # TODO: прописать все магические числа. Везде.
        max_length=256, verbose_name='Город',
        blank=False,
        null=False,)
    street = models.CharField(
        max_length=256, verbose_name='Улица',
        blank=False,
        null=False,)
    house = models.IntegerField(
        verbose_name='Дом',
        blank=False,
        null=False,)
    apartment = models.IntegerField(
        verbose_name='Квартира',
        null=True,
        blank=True, default=None)
    floor = models.IntegerField(
        verbose_name='Этаж',
        null=True,
        blank=True)
    entrance = models.IntegerField(
        verbose_name='Подъезд',
        null=True,
        blank=True)


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
        'Имя',
        max_length=256,
        blank=True)
    email = models.EmailField(
        'Адрес электронной почты',
        max_length=254,
        unique=True)
    password = models.CharField(
        'Пароль',
        max_length=256)
    phone = PhoneNumberField(
        'Номер телефона',
        blank=True,
        region='RU')
    address = models.ForeignKey(
        Address,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='users',
        verbose_name='Услуги',
    )
    role = models.CharField(
        'Роль',
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
