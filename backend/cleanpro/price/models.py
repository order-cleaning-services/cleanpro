from django.db import models
from django.core.validators import MinValueValidator


class Price(models.Model):
    """Модель цен услуг."""
    
    MAIN = 'main'
    ADDITIONAL = 'additional'
    SERVICE_TYPES = [
        (MAIN, 'main'),
        (ADDITIONAL, 'additional'),
    ]

    title = models.CharField(
        'Название услуги',
        max_length=250,
    )
    description = models.TextField(
        'Описание услуги'
    )
    price = models.FloatField(
        'Цена услуги за единицу измерения',
        validators=[
            MinValueValidator(0)
        ],
    )
    measure = models.ForeignKey(
        'Measure',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Единица измерения услуги',
    )
    service_type = models.CharField(
        max_length=max(len(type) for type, _ in SERVICE_TYPES),
        choices=SERVICE_TYPES,
        default=MAIN,
    )

    class Meta:
        verbose_name = 'Цена'
        verbose_name_plural = 'Цены'

    def __str__(self):
        return self.title


class Measure(models.Model):
    """Модель единиц измерения услуг."""
    
    title = models.CharField(
        'Название единицы измерения',
        max_length=150,
    )
    short_name = models.CharField(
        'Краткое обозначение',
        max_length=10,
    )

    class Meta:
        verbose_name = 'Единица измерения'
        verbose_name_plural = 'Единицы измерения'

    def __str__(self):
        return self.title
