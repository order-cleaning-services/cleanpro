from django.contrib import admin

from .models import Address, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'username',
        'email',
        'phone',
        'address'
    )
    search_fields = ('email', 'first_name', 'phone', 'address')
    # exclude = ('last_name', 'first_name',)
    list_per_page = 50


admin.site.register(Address)
