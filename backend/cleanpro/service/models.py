from django.conf import settings
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from users.models import Adress


class Service_package(models.Model):
    """Модель пакета услуг."""
    CLEANING_TYPE = (
        ('maintenance', 'Поддерживающая уборка'),
        ('general', 'Генеральная уборка'),
        ('repair', 'Уборка после ремонта'),
        ('holiday', 'Уборка после мероприятия'),
        ('windows', 'Мытье окон'),
    )
    title = models.CharField(
        choices=CLEANING_TYPE,
        verbose_name='Название',
        default='maintenance',
        max_length=256
    )
    price = models.IntegerField(
        verbose_name='Сумма',
        default=0
    )
    quantity = models.IntegerField(
        verbose_name='Количество',
        default=0
    )

    def __str__(self):
        return self.title


class Order(models.Model):
    """Модель заказа."""
    STATUS_CHOICES = (
        ('created', 'Создан'),
        ('accepted', 'Принят'),
        ('finished', 'Завершен'),
        ('cancelled', 'Отменен'),
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='orders',
        verbose_name='Заказчик',
    )
    total_sum = models.IntegerField(
        default=0,
        verbose_name='Сумма'
    )
    comment = models.CharField(
        verbose_name='Комментарий',
        max_length=250,
        blank=True,
        null=True,
    )
    order_status = models.CharField(
        choices=STATUS_CHOICES,
        verbose_name='Статус',
        max_length=256,
        default='created'
    )
    service_package = models.ForeignKey(
        Service_package,
        on_delete=models.CASCADE,
        related_name='orders',
        verbose_name='Услуги'
    )
    pay_status = models.BooleanField(
        default=False
    )
    adress = models.ForeignKey(
        Adress,
        on_delete=models.CASCADE,
        related_name='orders',
        verbose_name='Услуги'
    )
    creation_date = models.DateField(
        verbose_name='Дата создания',
        auto_now_add=True
    )
    creation_time = models.TimeField(
        verbose_name='Время создания',
        auto_now_add=True
    )
    cleaning_date = models.DateField(
        verbose_name='Дата уборки',
        db_index=True
    )
    cleaning_time = models.TimeField(
        verbose_name='Время уборки'
    )

    class Meta:
        ordering = ['-cleaning_date']

    def __str__(self):
        return f"Заказ №: {self.id}"


class Rating(models.Model):
    """Модель отзыва."""
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='ratings',
        verbose_name='Название',
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ratings',
        verbose_name='Заказчик',
    )
    pub_date = models.DateTimeField(
        verbose_name='Дата отзыва',
        auto_now_add=True,
        db_index=True,
    )
    text = models.CharField(
        verbose_name='Текст отзыва',
        max_length=250)
    score = models.IntegerField(
        verbose_name='Оценка',
        default=0,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )

    class Meta:
        ordering = ['-score']
