from django.db import models
from django.core.validators import MinValueValidator


class Measure(models.Model):
    """Модель единиц измерения услуг."""

    title = models.CharField(
        verbose_name='Единица измерения',
        max_length=25,
    )

    class Meta:
        verbose_name = 'Единица измерения'
        verbose_name_plural = 'Единицы измерения'

    def __str__(self):
        return self.title


class Service(models.Model):
    """Модель цен услуг."""

    title = models.CharField(
        verbose_name='Название услуги',
        max_length=60,
    )
    price = models.FloatField(
        verbose_name='Цена услуги за единицу измерения',
        max_length=7,
        validators=[MinValueValidator(1, 'Укажите корректную сумму.')]
    )
    measure = models.ForeignKey(
        Measure,
        verbose_name='Единица измерения услуги',
        related_name='services',
        on_delete=models.PROTECT,
    )
    image = models.ImageField(
        upload_to='service_photo/',
        verbose_name='Фото вида уборки'
    )
    service_type = models.CharField(
        verbose_name='Тип услуги',
        choices=(
            ('main', 'Основная'),
            ('additional', 'Дополнительная'),
        ),
        max_length=11,
        default='main',
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
    )
    coefficient = models.FloatField(
        verbose_name='Коэффициент увеличения цены',
        max_length=3,
        validators=[
            MinValueValidator(1, 'Коэффициент не может быть меньше 1')
        ],
    )
    type = models.CharField(
        verbose_name='Тип набора',
        choices=(
            ('main', 'Основной'),
            ('additional', 'Дополнительный'),
        ),
        max_length=11,
        default='main',
    )
    service = models.ManyToManyField(
        Service,
        through='ServicesInCleaningtype',
        through_fields=('cleaning_type', 'service'),
    )

    class Meta:
        verbose_name = 'Набор услуг'
        verbose_name_plural = 'Наборы услуг'

    def __str__(self):
        return self.title


class ServicesInCleaningtype(models.Model):
    """Модель перечня услуг в наборах услуг."""

    cleaning_type = models.ForeignKey(
        CleaningType,
        on_delete=models.CASCADE,
        verbose_name='Набор услуг'
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        verbose_name='Услуга'
    )
