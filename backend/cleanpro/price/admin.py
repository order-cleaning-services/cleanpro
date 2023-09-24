from django.contrib import admin

from .models import Measure, Service, CleaningType, ServicesInCleaningType


class MeasureAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title',)
    list_editable = ('title',)
    search_fields = ('title',)
    empty_value_display = '-пусто-'


class ServiceAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'price', 'measure', 'image', 'service_type')
    list_editable = ('title', 'price', 'measure', 'image', 'service_type')
    list_filter = ('service_type', )
    search_fields = ('title',)
    empty_value_display = '-пусто-'


class Services_in_CleaningAdmin(admin.StackedInline):
    model = ServicesInCleaningType
    min_num = 1


class CleaningTypeAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'coefficient', )
    list_editable = ('title', 'coefficient', )
    list_filter = ('coefficient', )
    search_fields = ('title', )
    empty_value_display = '-пусто-'
    inlines = [
        Services_in_CleaningAdmin,
    ]


admin.site.register(Measure, MeasureAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(CleaningType, CleaningTypeAdmin)
