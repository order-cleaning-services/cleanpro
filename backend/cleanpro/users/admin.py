from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'first_name',
        'phone',
        'adress'
    )
    search_fields = ('email', 'first_name', 'phone', 'adress')
    list_per_page = 50
