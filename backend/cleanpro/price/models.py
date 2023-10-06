# TODO: при релизе проверить, что валидация на клиенте
#       совпадает с валидацией на сервере!

from django.core.validators import MinValueValidator
from django.db import models


class Measure(models.Model):
    """Модель единиц измерения услуг."""

    title = models.CharField(
        verbose_name='Единица измерения',
        max_length=25,
        unique=True,
    )

    class Meta:
        verbose_name = 'Единица измерения'
        verbose_name_plural = 'Единицы измерения'

    def __str__(self):
        return self.title


class Service(models.Model):
    """Модель цен услуг."""
    SERVICE_TYPE = [
        ('main', 'Основная'),
        ('additional', 'Дополнительная'),
    ]

    title = models.CharField(
        verbose_name='Название услуги',
        max_length=60,
        unique=True
    )
    price = models.FloatField(
        verbose_name='Цена услуги за единицу измерения',
        max_length=7,
        validators=(
            MinValueValidator(1, 'Укажите корректную сумму.'),
        ),
    )
    measure = models.ForeignKey(
        Measure,
        verbose_name='Единица измерения услуги',
        related_name='services',
        on_delete=models.PROTECT,
    )
    image = models.ImageField(
        upload_to='service_photo/',
        verbose_name='Фото вида уборки',
        # TODO: это временно же?
        # REPLE: Нет. Вроде у нас будут услуги, которые будут без картинок.
        null=True,
        blank=True,
    )
    service_type = models.CharField(
        verbose_name='Тип услуги',
        choices=SERVICE_TYPE,
        max_length=11,
        default='main',
    )
    cleaning_time = models.IntegerField(
        verbose_name='Время на услугу',
        validators=(
            MinValueValidator(1, 'Укажите корректное время!'),
        ),
    )

    class Meta:
        verbose_name = 'Услуга и цена'
        verbose_name_plural = 'Услуги и цены'

    def __str__(self):
        return self.title


class CleaningType(models.Model):
    """Модель наборов услуг."""

    title = models.CharField(
        verbose_name='Название наборов услуг.',
        max_length=25,
        unique=True,
    )
    coefficient = models.FloatField(
        verbose_name='Коэффициент увеличения цены',
        max_length=3,
        validators=(
            MinValueValidator(1, 'Коэффициент не может быть меньше 1'),
        ),
    )
    service = models.ManyToManyField(
        Service,
        through='ServicesInCleaningType',
        through_fields=('cleaning_type', 'service',),
    )

    class Meta:
        verbose_name = 'Набор услуг'
        verbose_name_plural = 'Наборы услуг'

    def __str__(self):
        return self.title


class ServicesInCleaningType(models.Model):
    """Модель перечня услуг в наборах услуг."""

    cleaning_type = models.ForeignKey(
        CleaningType,
        on_delete=models.CASCADE,
        verbose_name='Набор услуг',
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        verbose_name='Услуга',
    )

    class Meta:
        verbose_name = 'Услуга в наборе'
        verbose_name_plural = 'Услуги в наборе'
