from rest_framework.permissions import SAFE_METHODS
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from api.serializers import UserSerializer
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
                          PaySerializer)


class UserViewSet(UserViewSet):
    serializer_class = UserSerializer

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def confirm_mail(request):
    email = request.data.get('email')
    user = get_object_or_404(User, email=email)
    serializer = Confirm_mailSerializer(data=request.data)
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
    serializer = PostOrderSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(request.data, status=status.HTTP_201_CREATED)


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    queryset = Order.objects.all()

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return GetOrderSerializer


    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def pay(self, request, pk=None):
        serializer = PaySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def cancell(self, request, pk=None):
        order = self.get_object()
        order.order_status = 'cancelled'
        return Response(request.data, status=status.HTTP_201_CREATED)

    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def comment(self, request, pk=None):
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAuthenticated, IsOwner)
    )
    def change_datetime(self, request, pk=None):
        serializer = DateTimeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(
        detail=True,
        methods=['patch', ],
        permission_classes=(permissions.IsAdminUser,)
    )
    def change_status(self, request, pk=None):
        serializer = OrderStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = RatingSerializer


    def perform_create(self, serializer):
        order_id = self.kwargs.get('order_id')
        order = get_object_or_404(Order, id=order_id)
        serializer.save(user=self.request.user, order=order)
