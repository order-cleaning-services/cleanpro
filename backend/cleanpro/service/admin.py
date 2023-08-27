from django.contrib import admin

from .models import (Order, Rating)

admin.site.register(Order)
admin.site.register(Rating)
