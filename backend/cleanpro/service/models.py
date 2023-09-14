from django.conf import settings
from django.db import models
# TODO: ко всем валидаторам приписать пояснения во всех models.py
from django.core.validators import MaxValueValidator, MinValueValidator

from users.models import Address


# https://peps.python.org/pep-0008/#class-names
class ServicePackage(models.Model):
    """Модель пакета услуг."""
    CLEANING_TYPES = (
        ('maintenance', 'Поддерживающая уборка'),
        ('general', 'Генеральная уборка'),
        ('repair', 'Уборка после ремонта'),
        ('holiday', 'Уборка после мероприятия'),
        ('windows', 'Мытье окон')
    )
    title = models.CharField(
        verbose_name='Название',
        choices=CLEANING_TYPES
    )
    price = models.IntegerField(
        verbose_name='Сумма',
        validators=[MinValueValidator(1, 'Укажите корректную сумму.')]
    )
    # TODO: лишнее поле
    quantity = models.IntegerField(
        default=0,
        verbose_name='Количество'
    )

    def __str__(self):
        return self.title


class Order(models.Model):
    """Модель заказа."""
    STATUS_CHOICES = (
        ('created', 'Создан'),
        ('accepted', 'Принят'),
        ('finished', 'Завершен'),
        ('cancelled', 'Отменен')
    )
    user = models.ForeignKey(
        verbose_name='Заказчик',
        to=settings.AUTH_USER_MODEL,
        related_name='orders',
        on_delete=models.CASCADE,
    )
    total_sum = models.IntegerField(
        verbose_name='Сумма',
        validators=[MinValueValidator(1, 'Укажите корректную итоговую сумму!')]
    )
    comment = models.TextField(
        verbose_name='Комментарий',
        max_length=250,
        default=None,
        blank=True,
        null=True,
    )
    order_status = models.CharField(
        verbose_name='Статус заказа',
        choices=STATUS_CHOICES,
        default='Создан'
    )
    service_package = models.ForeignKey(
        verbose_name='Услуги',
        to=ServicePackage,
        related_name='orders',
        on_delete=models.CASCADE,
    )
    pay_status = models.BooleanField(
        default=False
    )
    address = models.ForeignKey(
        verbose_name='Услуги',
        to=Address,
        related_name='orders',
        on_delete=models.CASCADE,
    )
    # А почему(?) не:
    # creation_datetime = models.DateTimeField(
    #     'Дата и время создания',
    #     auto_now_add=True
    # )
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
        verbose_name='Название',
        to=Order,
        related_name='ratings',
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        verbose_name='Заказчик',
        to=settings.AUTH_USER_MODEL,
        related_name='ratings',
        on_delete=models.CASCADE
    )
    pub_date = models.DateTimeField(
        verbose_name='Дата отзыва',
        auto_now_add=True,
        db_index=True
    )
    text = models.TextField(
        verbose_name='Текст отзыва',
        max_length=250,
    )
    score = models.IntegerField(
        verbose_name='Оценка',
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )

    class Meta:
        ordering = ['-score']
