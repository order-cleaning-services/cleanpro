# TODO: при релизе проверить, что валидация на клиенте
#       совпадает с валидацией на сервере!

from django.conf import settings
from django.db import models
# TODO: ко всем валидаторам приписать пояснения во всех models.py
from django.core.validators import MaxValueValidator, MinValueValidator

from users.models import Address
from price.models import CleaningType, Service


# https://peps.python.org/pep-0008/#class-names
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
        default='Создан',
        # TODO: Без этого не работает
        max_length=256,
    )
    cleaning_type = models.ForeignKey(
        CleaningType,
        verbose_name='Наборы услуг',
        related_name='orders',
        on_delete=models.PROTECT,
    )
    services = models.ManyToManyField(
        Service,
        through='ServicesInOrder',
        through_fields=('order', 'service'),
        verbose_name='Услуги',
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


class ServicesInOrder(models.Model):
    """Модель перечня услуг в заказе."""

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        verbose_name='Заказ'
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        verbose_name='Услуга'
    )
    amount = models.PositiveIntegerField(
        validators=[MinValueValidator(0)],
        verbose_name='Количество'
    )


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
