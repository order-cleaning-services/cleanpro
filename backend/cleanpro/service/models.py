# TODO: при релизе проверить, что валидация на клиенте
#       совпадает с валидацией на сервере!

from django.conf import settings
# TODO: ко всем валидаторам приписать пояснения во всех models.py
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from price.models import CleaningType, Service
from users.models import Address


ORDER_CANCELLED_STATUS: str = 'cancelled'


class Order(models.Model):
    """Модель заказа."""

    STATUS_CHOICES = (
        ('created', 'Создан'),
        ('accepted', 'Принят'),
        ('finished', 'Завершен'),
        (ORDER_CANCELLED_STATUS, 'Отменен'),
    )
    user = models.ForeignKey(
        verbose_name='Заказчик',
        to=settings.AUTH_USER_MODEL,
        related_name='orders',
        on_delete=models.CASCADE,
    )
    total_sum = models.IntegerField(
        verbose_name='Сумма',
        validators=[
            MinValueValidator(1, 'Укажите корректную итоговую сумму!'),
        ]
    )
    total_time = models.IntegerField(
        verbose_name='Суммарное время',
        validators=(
            MinValueValidator(1, 'Укажите корректное время!'),
        ),
        # TODO: Сделать поле обязательным после перехода на OrderViewSet
        #       для создания и работы с заказом.
        blank=True,
        null=True,
    )
    comment = models.CharField(
        verbose_name='Комментарий',
        max_length=512,
        default=None,
        blank=True,
        null=True,
    )
    comment_cancel = models.CharField(
        verbose_name='Комментарий отмены',
        max_length=512,
        default=None,
        blank=True,
        null=True,
    )
    order_status = models.CharField(
        verbose_name='Статус заказа',
        choices=STATUS_CHOICES,
        default='Создан',
        max_length=512,
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
        default=False,
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
        auto_now_add=True,
    )
    creation_time = models.TimeField(
        verbose_name='Время создания',
        auto_now_add=True,
    )
    cleaning_date = models.DateField(
        verbose_name='Дата уборки',
        db_index=True,
    )
    cleaning_time = models.TimeField(
        verbose_name='Время уборки',
    )
    # INFO! Я НАСТАИВАЮ на Datetime field - посмотрите, какая ерунда уже
    #       вырисовывается! А могло быть 3 лаконичных поля!
    cancel_date = models.DateField(
        verbose_name='Дата отмены заказа',
        db_index=True,
        blank=True,
        null=True,
    )
    cancel_time = models.TimeField(
        verbose_name='Время отмены заказа',
        blank=True,
        null=True,
    )

    class Meta:
        ordering = ('-cleaning_date',)

    def __str__(self):
        return f"Заказ №: {self.id}"


class ServicesInOrder(models.Model):
    """Модель перечня услуг в заказе."""

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        verbose_name='Заказ',
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        verbose_name='Услуга',
    )
    amount = models.PositiveIntegerField(
        validators=(MinValueValidator(0),),
        verbose_name='Количество',
    )


class RatingViaMaps(models.Model):
    """Модель отзыва с Я.Карт."""

    username = models.CharField(
        verbose_name='Заказчик',
        max_length=60,
    )
    pub_date = models.DateTimeField(
        verbose_name='Дата отзыва',
        auto_now_add=True,
        db_index=True,
    )
    text = models.CharField(
        verbose_name='Текст отзыва',
        max_length=512,
    )
    score = models.IntegerField(
        verbose_name='Оценка',
        validators=(
            MinValueValidator(1),
            MaxValueValidator(5),
        ),
    )

    class Meta:
        ordering = ('-id',)


class Rating(RatingViaMaps):
    """
    Модель отзыва с сайта.
    Основана на RatingViaMaps, добавляет связи с таблицами Order и User.
    """
    order = models.ForeignKey(
        verbose_name='Название',
        to=Order,
        related_name='ratings',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    user = models.ForeignKey(
        verbose_name='Заказчик',
        to=settings.AUTH_USER_MODEL,
        related_name='ratings',
        on_delete=models.CASCADE,
    )
