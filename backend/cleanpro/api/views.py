from rest_framework.permissions import SAFE_METHODS
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from api.serializers import UserSerializer
from djoser.views import UserViewSet
from rest_framework import viewsets, status
from rest_framework import permissions
from .permissions import (IsOwnerOrReadOnly, IsOwner)
from service.models import Order, Rating
from .serializers import (PostOrderSerializer,
                          GetOrderSerializer,
                          CommentSerializer,
                          DateTimeSerializer,
                          RatingSerializer,
                          OrderStatusSerializer)


class UserViewSet(UserViewSet):
    serializer_class = UserSerializer


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Order.objects.all()

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return GetOrderSerializer
        else:
            return PostOrderSerializer

    @action(
        detail=False,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def pay(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        order.pay_status = True

    @action(
        detail=False,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def cancell(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        order.order_status = 'cancelled'

    @action(
        detail=False,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def comment(self, request):
        user = request.user
        serializer = CommentSerializer
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(
        detail=False,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def change_datetime(self, request):
        user = request.user
        serializer = DateTimeSerializer
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(
        detail=False,
        methods=['patch', ],
        permission_classes=(permissions.IsAdminOrReadOnly)
    )
    def change_status(self, request):
        serializer = OrderStatusSerializer
        return Response(serializer.data, status=status.HTTP_200_OK)


    class RatingViewSet(viewsets.ModelViewSet):
        queryset = Rating.objects.all()
        permission_classes = (IsOwnerOrReadOnly,)
        serializer = RatingSerializer

        def get_queryset(self):
            order = get_object_or_404(Order, pk=self.kwargs.get("order_id"))
            return order.rating.all()

        def perform_create(self, serializer):
            order_id = self.kwargs.get('order_id')
            order = get_object_or_404(Order, id=order_id)
            serializer.save(user=self.request.user, order=order)
