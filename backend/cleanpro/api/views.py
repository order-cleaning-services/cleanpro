from api.serializers import UserSerializer
from djoser.views import UserViewSet
from rest_framework import viewsets
from rest_framework import permissions
from service.models import Order
from .serializers import PostOrderSerializer

class UserViewSet(UserViewSet):
    serializer_class = UserSerializer

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Order.objects.all()

    def get_serializer_class(self):
        if self.request.method  == 'POST':
            return PostOrderSerializer