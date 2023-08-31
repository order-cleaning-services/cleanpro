from rest_framework.permissions import SAFE_METHODS
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
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
                          Confirm_mailSerializer)


class UserViewSet(UserViewSet):
    serializer_class = UserSerializer

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def confirm_mail(request):
    email = request.data.get('email')
    if User.objects.filter(
       email=email):
        user = get_object_or_404(User, email=email)
        send_mail(
            'Пароль',
            f'Пароль: {user.password}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        return Response(request.data, status=status.HTTP_200_OK)
    serializer = Confirm_mailSerializer(data=request.data)
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


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
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
        permission_classes=(permissions.IsAdminUser)
    )
    def change_status(self, request):
        serializer = OrderStatusSerializer
        return Response(serializer.data, status=status.HTTP_200_OK)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = RatingSerializer

    def get_queryset(self):
        order = get_object_or_404(Order, pk=self.kwargs.get('order_id'))
        return order.rating.all()

    def perform_create(self, serializer):
        order_id = self.kwargs.get('order_id')
        order = get_object_or_404(Order, id=order_id)
        serializer.save(user=self.request.user, order=order)
