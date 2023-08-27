from django.conf import settings
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Order(models.Model):
    STATUS_CHOICES = (
        ('created', 'Создан'),
        ('accepted', 'Принят'),
        ('in progress', 'В работе'),
        ('finished', 'Завершен'),
        ('cancelled', 'Отменен'),
    )
    CLEANING_TYPE = (
        ('maintenance', 'Поддерживающая уборка'),
        ('general', 'Генеральная уборка'),
        ('repair', 'Уборка после ремонта'),
        ('holiday', 'Уборка после торжества'),
        ('optional', 'Опциональная уборка'),
    )
    title = models.CharField(choices=CLEANING_TYPE,
        default='maintenance',
        verbose_name='Название',)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='orders',
        verbose_name='Заказчик',
    )
    number = models.IntegerField(
        verbose_name='Номер',)
    total_sum = models.IntegerField(
        default=0, verbose_name='Сумма',)
    comment = models.TextField(
        verbose_name='Комментарий',)
    order_status = models.CharField(choices=STATUS_CHOICES,
        default='created',
        verbose_name='Статус',)
    service_package = models.ForeignKey(
        Service_package,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='orders',
        verbose_name='Услуги',
    )
    city = models.CharField(
        max_length=256, verbose_name='Город',)
    street = models.CharField(
        max_length=256, verbose_name='Улица',)
    house = models.IntegerField(
        verbose_name='Дом',)
    apartment = models.IntegerField(
        verbose_name='Квартира', null=True, default=None)
    creation_date = models.DateField(
        'Дата создания', auto_now_add=True)
    creation_time = models.TimeField(
        'Время создания', auto_now_add=True)
    cleaning_date = models.DateField(
        'Дата уборки', db_index=True)
    cleaning_time = models.TimeField(
        'Время уборки')
    rating = models.ForeignKey(
        Rating,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='orders',
        verbose_name='Оценка',
    )

    def __str__(self):
        return self.title

class Rating(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='ratings',
        verbose_name='Название',
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ratings',
        verbose_name='Автор',
    )
    pub_date = models.DateTimeField(
        'Дата отзыва',
        auto_now_add=True,
        db_index=True,
    )
    text = models.TextField('Текст отзыва',)
    score = models.IntegerField(default=0,
        verbose_name='Оценка',
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )

    class Meta:
        ordering = ['-pub_date']