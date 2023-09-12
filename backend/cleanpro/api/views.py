from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response

from .permissions import IsOwnerOrReadOnly, IsOwner
from .serializers import (
    CancelSerializer,
    CommentSerializer,
    ConfirmMailSerializer,
    CustomUserSerializer,
    DateTimeSerializer,
    GetOrderSerializer,
    OrderStatusSerializer,
    PaySerializer,
    PostOrderSerializer,
    RatingSerializer,
    )
from service.models import Order, Rating
from users.models import User


class UserViewSet(UserViewSet):
    """Список пользователей."""
    serializer_class = CustomUserSerializer

    @action(
        detail=True,
        url_path='subscribe',
        methods=['get',],
        permission_classes=(permissions.IsAuthenticated,)
    )
    def orders(self, request, id):
        """Список заказов пользователя."""
        queryset = Order.objects.filter(user=id
            ).select_related('user', 'service_package')
        page = self.paginate_queryset(queryset)
        serializer = GetOrderSerializer(
            page,
            many=True,
            context={'request': request}
        )
        return self.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def confirm_mail(request):
    """Подтвердить электронную почту."""
    # TODO: использовать сериализатор для проверки входных данных.
    # TODO: email может быть None, проверить данную ошибку.
    email = request.data.get('email')
    user = get_object_or_404(User, email=email)
    serializer = ConfirmMailSerializer(user, request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    user.password = default_token_generator.make_token(user)
    user.save()
    send_mail(
        'Пароль',
        f'Пароль: {user.password}',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def order_create(request):
    """Создать заказ."""
    serializer = PostOrderSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(request.data, status=status.HTTP_201_CREATED)


class OrderViewSet(viewsets.ModelViewSet):
    """Список заказов."""
    methods=['get', 'post', 'patch', 'delete']
    serializer_class = GetOrderSerializer
    queryset = Order.objects.all().select_related('user', 'address')

    # Зачем?
    def perform_update(self, serializer):
        serializer.save()

    @action(
        detail=True,
        # TODO: сделать везде через tuple, ускорит код.
        methods=['patch',],
        url_path='pay',
        permission_classes=(IsOwner)
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
        methods=['patch',],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def cancel(self, request, pk):
        """Отменить заказ."""
        order = get_object_or_404(Order, id=pk)
        serializer = CancelSerializer(order, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=['patch',],
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
        methods=['patch',],
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
        methods=['patch',],
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
