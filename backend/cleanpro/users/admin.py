from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'first_name',
        'phone',
        'city',
        'street',
        'house',
        'apartment',
    )
    search_fields = ('email', 'first_name', 'phone')
    list_filter = ('city', 'street')
    list_per_page = 50
