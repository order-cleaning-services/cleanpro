from django.contrib import admin

from .models import Price, Measure


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    
    list_display = (
        'title',
        'description',
        'price',
    )


@admin.register(Measure)
class MeasureAdmin(admin.ModelAdmin):
    
    list_display = (
        'title',
        'short_name',
    )