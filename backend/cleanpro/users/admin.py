from django.contrib import admin

from .models import User, Address


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'email',
        'phone',
        'address'
    )
    search_fields = ('email', 'first_name', 'phone', 'address')
    # exclude = ('last_name', 'first_name',)
    list_per_page = 50


admin.site.register(Address)
