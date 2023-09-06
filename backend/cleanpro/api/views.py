from rest_framework.permissions import SAFE_METHODS
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from api.serializers import CustomUserSerializer
from djoser.views import UserViewSet
from rest_framework import viewsets, status
from rest_framework import permissions
from .permissions import (IsOwnerOrReadOnly, IsOwner)
from service.models import Order, Rating
from users.models import User
from .serializers import (PostOrderSerializer,
                          GetOrderSerializer,
                          CommentSerializer,
                          DateTimeSerializer,
                          RatingSerializer,
                          OrderStatusSerializer,
                          Confirm_mailSerializer,
                          PaySerializer,
                          CancellSerializer)


class UserViewSet(UserViewSet):
    """Список пользователей."""
    serializer_class = CustomUserSerializer

    @action(
        detail=True,
        methods=['get', ],
        permission_classes=(permissions.IsAuthenticated,)
    )
    def orders(self, request, id):
        """Список заказов пользователя."""
        queryset = Order.objects.filter(user=id)
        page = self.paginate_queryset(queryset)
        serializer = GetOrderSerializer(page, many=True,
                                            context={'request': request})
        return self.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def confirm_mail(request):
    """Подтвердить электронную почту."""
    email = request.data.get('email')
    user = get_object_or_404(User, email=email)
    serializer = Confirm_mailSerializer(user, request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    user.password = default_token_generator.make_token(user)
    user.save
    send_mail(
        'Пароль',
        f'Пароль: {user.password}',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def order_create(request):
    """Создать заказ."""
    serializer = PostOrderSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(request.data, status=status.HTTP_201_CREATED)


class OrderViewSet(viewsets.ModelViewSet):
    """Список заказов."""
    permission_classes = [permissions.AllowAny, ]
    queryset = Order.objects.all()
    methods=['get', 'post', 'patch', 'delete'],
    serializer_class = GetOrderSerializer

    def perform_update(self, serializer):
        serializer.save()

    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def pay(self, request, pk):
        """Оплатить заказ."""
        order = get_object_or_404(Order, id=pk)
        serializer = PaySerializer(order, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def cancell(self, request, pk):
        """Отменить заказ."""
        order = get_object_or_404(Order, id=pk)
        serializer = CancellSerializer(order, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def comment(self, request, pk):
        """Добавить комментарий к заказу."""
        order = get_object_or_404(Order, id=pk)
        serializer = CommentSerializer(order, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def change_datetime(self, request, pk):
        """Перенести заказ."""
        order = get_object_or_404(Order, id=pk)
        serializer = DateTimeSerializer(order, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAdminUser,)
    )
    def change_status(self, request, pk):
        """Изменить статус заказа."""
        order = get_object_or_404(Order, id=pk)
        serializer = OrderStatusSerializer(order, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class RatingViewSet(viewsets.ModelViewSet):
    """Список отзывов."""
    queryset = Rating.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = RatingSerializer
    methods=['get', 'post', 'patch', 'delete'],


    def perform_create(self, serializer):
        order_id = self.kwargs.get('order_id')
        order = get_object_or_404(Order, id=order_id)
        serializer.save(user=self.request.user, order=order)
