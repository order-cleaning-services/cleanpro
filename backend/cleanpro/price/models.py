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


class CleanSet(models.Model):
    """Модель наборов услуг."""
    
    title = models.CharField(
        'Название наборов услуг.',
        max_length=150,
    )
    price = models.ManyToManyField(
        Price,
        through='CleanSetPrice',
        through_fields=('clean_set', 'price'),
    )
    
    class Meta:
        verbose_name = 'Набор услуг'
        verbose_name_plural = 'Набор услуг'

    def __str__(self):
        return self.title


class CleanSetPrice(models.Model):
    """Модель перечня услуг в наборах услуг."""
    
    clean_set = models.ForeignKey(
        CleanSet,
        on_delete=models.CASCADE,
    )
    price = models.ForeignKey(
        Price,
        on_delete=models.CASCADE,
    )

# class OrderPrice():
    
#     price = models.ForeignKey(price)
#     order = models models.ForeignKey(order)
#     amount = models.IntegerField()
