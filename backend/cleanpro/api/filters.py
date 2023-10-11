from django_filters import rest_framework as filters

from service.models import Service


class FilterService(filters.FilterSet):
    title = filters.CharFilter(
        field_name='title', lookup_expr='istartswith')

    class Meta:
        model = Service
        fields = ['title']
