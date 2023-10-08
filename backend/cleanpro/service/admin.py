from django.contrib import admin

from .models import Order, Rating, RatingViaMaps, ServicesInOrder


class ServicesToOrder(admin.StackedInline):
    model = ServicesInOrder


class OrderAdmin(admin.ModelAdmin):
    """
    Переопределяет административный интерфейс Django для модели Order.

    Атрибуты:
        - list_display (tuple) - список полей для отображения в интерфейсе:
            - ID заказа (pk)
            - ID заказчика (user)
            - статус заказа (order_status)
            - статус оплаты (pay_status)
            - суммарное время работ (total_time)
            - сумма заказа (total_sum)
            - ID адреса (address)
            - комментарий заказа (comment)
            - тип уборки (cleaning_type)
            - дата создания заказа (creation_date)
            - время создания заказа (creation_time)
            - дата начала уборки (cleaning_date)
            - время начала уборки (cleaning_time)
            - комментарий отмены заказа (comment_cancel)
            - дата отмены заказа (cancel_date)
            - время отмены заказа (cancel_time)
        - list_editable (tuple) - список полей для изменения в интерфейсе:
            - статус заказа (order_status)
            - статус оплаты (pay_status)
            - сумма заказа (total_sum)
            - комментарий заказа (comment)
            - комментарий отмены заказа (comment_cancel)
        - list_filter (tuple) - список фильтров:
            - статус заказа (order_status)
        - search_fields (tuple) - список полей для поиска объектов:
            - ID заказчика (user)
        - list_per_page (int) - количество объектов на одной странице
    """
    list_display = (
        'pk',
        'user',
        'order_status',
        'pay_status',
        'total_time',
        'total_sum',
        'address',
        'comment',
        'cleaning_type',
        'creation_date',
        'creation_time',
        'cleaning_date',
        'cleaning_time',
        'comment_cancel',
        'cancel_date',
        'cancel_time',
    )
    list_editable = (
        'order_status',
        'pay_status',
        'total_sum',
        'comment',
        'comment_cancel',
    )
    list_filter = ('order_status',)
    search_fields = ('user',)
    list_per_page = 15


class RatingAdmin(admin.ModelAdmin):
    """
    Переопределяет административный интерфейс Django для модели Rating.

    Атрибуты:
        - list_display (tuple) - список полей для отображения в интерфейсе:
            - ID отзыва (pk)
            - ID заказчика (user)
            - ID заказа (order)
            - дата публикации (pub_date)
            - текст отзыва (text)
            - оценка заказа (score)
        - list_editable (tuple) - список полей для изменения в интерфейсе:
            - текст отзыва (text)
            - оценка заказа (score)
        - list_filter (tuple) - список фильтров:
            - оценка заказа (score)
        - search_fields (tuple) - список полей для поиска объектов:
            - ID заказчика (user)
        - list_per_page (int) - количество объектов на одной странице
    """
    list_display = (
        'pk',
        'user',
        'order',
        'pub_date',
        'text',
        'score',
    )
    list_editable = (
        'text',
        'score',
    )
    list_filter = ('score',)
    search_fields = ('user',)
    list_per_page = 15


class RatingViaMapsAdmin(admin.ModelAdmin):
    """
    Переопределяет административный интерфейс Django для модели RatingViaMaps.

    Атрибуты:
        - list_display (tuple) - список полей для отображения в интерфейсе:
            - ID отзыва (pk)
            - имя пользователя Я.Карт (username)
            - дата публикации (pub_date)
            - текст отзыва (text)
            - оценка заказа (score)
        - list_editable (tuple) - список полей для изменения в интерфейсе:
            - текст отзыва (text)
            - оценка заказа (score)
        - list_filter (tuple) - список фильтров:
            - оценка заказа (score)
        - search_fields (tuple) - список полей для поиска объектов:
            - имя пользователя Я.Карт (username)
        - list_per_page (int) - количество объектов на одной странице
    """
    list_display = (
        'pk',
        'username',
        'pub_date',
        'text',
        'score',
    )
    list_editable = (
        'text',
        'score',
    )
    list_filter = ('score',)
    search_fields = ('username',)
    list_per_page = 15


admin.site.register(Order, OrderAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(RatingViaMaps, RatingViaMapsAdmin)
