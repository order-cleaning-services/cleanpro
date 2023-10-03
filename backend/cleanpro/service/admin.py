from django.contrib import admin

from .models import Order, Rating, ServicesInOrder


class ServicesToOrder(admin.StackedInline):
    model = ServicesInOrder


class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'user',
        'total_sum',
        'order_status',
        'comment',
        'comment_cancel',
    )
    list_editable = (
        'total_sum',
        'order_status',
        'comment',
    )
    list_filter = ('order_status',)
    search_fields = ('comment',)
    empty_value_display = '-пусто-'
    inlines = [
        ServicesToOrder,
    ]


admin.site.register(Order, OrderAdmin)
admin.site.register(Rating)
