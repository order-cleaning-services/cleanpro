from django.contrib import admin

from .models import Price, Measure, CleanSet, CleanSetPrice


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    
    list_display = (
        'title',
        'price',
        'measure',
        'service_type',
    )


@admin.register(Measure)
class MeasureAdmin(admin.ModelAdmin):
    
    list_display = (
        'title',
        'short_name',
    )


class CleanSetPriceInline(admin.TabularInline):
    """Добавление услуг в админку наборов услуг."""

    model = CleanSetPrice
    extra = 0


@admin.register(CleanSet)
class CleanSetAdmin(admin.ModelAdmin):
    """Админка наборов услуг."""
    
    inlines = (CleanSetPriceInline,)
    
    list_display = (
        'title',
    )
    
    
    
