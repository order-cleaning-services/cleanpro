from django.contrib import admin

from .models import Address, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'first_name',
        'phone',
        'address'
    )
    search_fields = ('email', 'first_name', 'phone', 'address')
    list_per_page = 50


admin.site.register(Address)
