# TODO: аннотировать типы данных. Везде. Абсолютно.

from django.contrib.auth.tokens import default_token_generator
from django.core import mail
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet
from rest_framework import permissions, serializers, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from cleanpro.app_data import (
    DEFAULT_FROM_EMAIL, EMAIL_CONFIRM_SUBJECT, EMAIL_CONFIRM_TEXT
)
from cleanpro.settings import ADDITIONAL_CS
from service.models import CleaningType, Order, Rating, Service
from users.models import User
from .permissions import IsOwner, IsOwnerOrReadOnly
from .serializers import (
    CleaningTypeSerializer,
    CommentSerializer,
    CustomUserSerializer,
    DateTimeSerializer,
    EmailConfirmSerializer,
    OrderCancelSerializer,
    OrderGetSerializer,
    OrderPostSerializer,
    OrderStatusSerializer,
    PaySerializer,
    RatingSerializer,
    ServiceSerializer,
)


def send_mail(subject: str, message: str, to: tuple[str]) -> None:
    """Отправляет электронное сообщение.
    "backend=None" означает, что бекенд будет выбран согласно указанному
    значению в settings.EMAIL_BACKEND."""
    with mail.get_connection(backend=None, fail_silently=False) as conn:
        mail.EmailMessage(
            subject=subject,
            body=message,
            from_email=DEFAULT_FROM_EMAIL,
            to=to,
            connection=conn
        ).send(fail_silently=False)
    return


class CleaningTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """Получение списка типов основных услуг."""
    queryset = CleaningType.objects.all()
    serializer_class = CleaningTypeSerializer
    pagination_class = None


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """Получение списка дополнительных услуг."""
    queryset = Service.objects.filter(service_type=ADDITIONAL_CS)
    serializer_class = ServiceSerializer
    pagination_class = None


class UserViewSet(UserViewSet):
    """Список пользователей."""
    serializer_class = CustomUserSerializer
    http_method_names = ('get', 'post', 'put')

    def create(self, request):
        """Создание пользователей (без вывода данных)."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(status=status.HTTP_201_CREATED, headers=headers)

    @action(
        detail=True,
        url_path='orders',
        methods=('get',),
        permission_classes=(permissions.IsAuthenticated,)
    )
    def orders(self, request, id):
        """Список заказов пользователя."""
        queryset = Order.objects.filter(
            user=id
        ).select_related('user', 'cleaning_type', 'address')
        page = self.paginate_queryset(queryset)
        serializer = OrderGetSerializer(
            page,
            many=True,
            context={'request': request}
        )
        return self.get_paginated_response(serializer.data)

    @action(
        detail=False,
        url_path='me',
        methods=('get',),
        permission_classes=(permissions.IsAuthenticated,)
    )
    def me(self, request):
        """Личные данные авторизованного пользователя."""
        instance = request.user
        serializer = CustomUserSerializer(instance)
        return Response(serializer.data)


# TODO: обновить эндпоинт, когда придем с Викой к результату.
@api_view(('POST',))
def confirm_mail(request):
    """Подтвердить электронную почту."""
    serializer = EmailConfirmSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = get_object_or_404(
        User,
        email=serializer.validated_data.get('email'),
    )
    user.password = default_token_generator.make_token(user)
    user.save()
    send_mail(
        subject=EMAIL_CONFIRM_SUBJECT,
        message=EMAIL_CONFIRM_TEXT.format(
            username=user.username,
            password=user.password,
        ),
        to=(user.email,),
    )
    return Response(
        data="Email has confirmed! Please check you mailbox",
        status=status.HTTP_200_OK,
    )


class OrderViewSet(viewsets.ModelViewSet):
    """Список заказов."""
    methods = ('get', 'post', 'patch',)
    queryset = Order.objects.all().select_related('user', 'address',)
    # TODO: получается, что сейчас любой пользователь может прочитать
    #       чужие заказы? Это нужно сделать только для администратора.
    #       То же самое для PATCH запроса. DELETE я убрал - нельзя никому!
    #       А вот POST - для пользователя.
    # permission_classes = ()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrderGetSerializer
        else:
            return OrderPostSerializer

    def __modify_order(
            order_id,
            request: HttpRequest,
            serializer_class: serializers,
            ) -> serializers:  # NoQa
        order = get_object_or_404(Order, id=order_id)
        serializer = serializer_class(order, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer

    @action(
        detail=True,
        methods=('patch',),
        permission_classes=(IsOwner,),
        url_path='pay',
    )
    def pay(self, request, pk):
        """Оплатить заказ."""
        serializer: serializers = self.__modify_order(
            order_id=pk,
            request=request,
            serializer_class=PaySerializer,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=('patch',),
        permission_classes=(IsOwner,),
        url_path='cancel',
    )
    def cancel(self, request, pk):
        """Отменить заказ."""
        serializer: serializers = self.__modify_order(
            order_id=pk,
            request=request,
            serializer_class=OrderCancelSerializer,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=('patch',),
        permission_classes=(IsOwner),
    )
    def comment(self, request, pk):
        """Добавить комментарий к заказу."""
        serializer: serializers = self.__modify_order(
            order_id=pk,
            request=request,
            serializer_class=CommentSerializer,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=('patch',),
        permission_classes=(IsOwner,)
    )
    def change_datetime(self, request, pk):
        """Перенести заказ."""
        serializer: serializers = self.__modify_order(
            order_id=pk,
            request=request,
            serializer_class=DateTimeSerializer,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=('patch',),
        permission_classes=(permissions.IsAdminUser,)
    )
    def change_status(self, request, pk):
        """Изменить статус заказа."""
        serializer: serializers = self.__modify_order(
            order_id=pk,
            request=request,
            serializer_class=OrderStatusSerializer,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class RatingViewSet(viewsets.ModelViewSet):
    """Список отзывов."""
    queryset = Rating.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = RatingSerializer
    methods = ('get', 'post', 'patch', 'delete')

    def perform_create(self, serializer):
        order_id = self.kwargs.get('order_id')
        order = get_object_or_404(Order, id=order_id)
        serializer.save(user=self.request.user, order=order)
