from django.contrib import admin

from .models import Address, Order, Rating, ServicePackage

admin.site.register(Order)
admin.site.register(Rating)
admin.site.register(Address)
admin.site.register(ServicePackage)
