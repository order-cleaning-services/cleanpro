from django.conf import settings
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Service_package(models.Model):
    '''Модель пакета услуг.'''
    CLEANING_TYPE = (
        ('maintenance', 'Поддерживающая уборка'),
        ('general', 'Генеральная уборка'),
        ('repair', 'Уборка после ремонта'),
        ('holiday', 'Уборка после мероприятия'),
        ('windows', 'Мытье окон'),
    )
    title = models.CharField(choices=CLEANING_TYPE,
        default='maintenance', max_length=256,
        verbose_name='Название',)
    price = models.IntegerField(
        default=0, verbose_name='Сумма',)
    quantity = models.IntegerField(default=0,
        verbose_name='Количество',)

    def __str__(self):
        return self.title

class Adress(models.Model):
    '''Модель адреса.'''
    city = models.CharField(
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

class Order(models.Model):
    '''Модель заказа.'''
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
        default=0, verbose_name='Сумма',)
    comment = models.TextField(
        verbose_name='Комментарий',
        blank=True,
        null=True,
        )
    order_status = models.CharField(choices=STATUS_CHOICES,
        default='created', max_length=256,
        verbose_name='Статус',)
    service_package = models.ForeignKey(
        Service_package,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name='orders',
        verbose_name='Услуги',
    )
    pay_status = models.BooleanField(default=False)
    adress = models.ForeignKey(
        Adress,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name='orders',
        verbose_name='Услуги',
    )
    creation_date = models.DateField(
        'Дата создания', auto_now_add=True)
    creation_time = models.TimeField(
        'Время создания', auto_now_add=True)
    cleaning_date = models.DateField(
        'Дата уборки', db_index=True)
    cleaning_time = models.TimeField(
        'Время уборки')

    def __str__(self):
        return f"Заказ №: {self.id}"

class Rating(models.Model):
    '''Модель отзыва.'''
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
        ordering = ['-score']