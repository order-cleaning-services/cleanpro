from rest_framework import viewsets

from .models import Price, CleanSet
from .serializers import PriceSerializer, CleanSetSerializer


class PriceViewSet(viewsets.ReadOnlyModelViewSet):
    """Вьюсет для получения цен."""
    
    queryset = Price.objects.all()
    serializer_class = PriceSerializer


class CleanSetViewSet(viewsets.ReadOnlyModelViewSet):
    """Вьюсет для получения цен."""
    
    queryset = CleanSet.objects.all()
    serializer_class = CleanSetSerializer
