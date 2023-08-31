from django.contrib import admin

from .models import (Order, Rating, Adress, Service_package)

admin.site.register(Order)
admin.site.register(Rating)
admin.site.register(Adress)
admin.site.register(Service_package)