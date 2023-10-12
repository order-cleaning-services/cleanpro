# TODO: аннотировать типы данных. Везде. Абсолютно.

from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet
from rest_framework import permissions, serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination

from cleanpro.app_data import (
    EMAIL_CONFIRM_CODE_TEXT, EMAIL_CONFIRM_CODE_SUBJECT
)
from cleanpro.settings import ADDITIONAL_CS
from service.models import CleaningType, Order, Rating, Service
from service.signals import get_cached_reviews
from .permissions import IsOwner, IsOwnerOrReadOnly
from .serializers import (
    CleaningGetTimeSerializer,
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
from .utils import generate_code, get_available_time_json, send_mail


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

    @action(
        detail=False,
        url_path='confirm_email',
        methods=('post',),
        permission_classes=(permissions.AllowAny,)
    )
    def confirm_email(self, request):
        """
        Смотрит request.data и проверяет следующие данные:
            - email: адрес электронной почты.

        Если данные являются валидными, генерирует произвольный
        код подтверждения электронной почты. Этот код отправляется
        в JSON клиенту и письмом на указанную электронную почту.
        """
        serializer: serializers = EmailConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        confirm_code: str = generate_code()
        send_mail(
            subject=EMAIL_CONFIRM_CODE_SUBJECT,
            message=EMAIL_CONFIRM_CODE_TEXT.format(confirm_code=confirm_code),
            to=(serializer.validated_data.get('email'),),
        )
        return Response(
            data={"confirm_code": confirm_code},
            status=status.HTTP_200_OK,
        )


class OrderViewSet(viewsets.ModelViewSet):
    """Список заказов."""
    methods = ('get', 'post', 'patch',)
    queryset = Order.objects.select_related('user', 'address',).all()
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
        permission_classes=(IsOwner,),
        url_path='comment',
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
        permission_classes=(IsOwner,),
        url_path='change_datetime',
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
        permission_classes=(permissions.IsAdminUser,),
        url_path='change_status',
    )
    def change_status(self, request, pk):
        """Изменить статус заказа."""
        serializer: serializers = self.__modify_order(
            order_id=pk,
            request=request,
            serializer_class=OrderStatusSerializer,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=False,
        methods=('post',),
        url_path='get_available_time',
    )
    def get_available_time(self, request):
        serializer = CleaningGetTimeSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            data=get_available_time_json(
                cleaning_date=serializer.validated_data['cleaning_date'],
                cleaning_time=serializer.validated_data['cleaning_time'],
                total_time=serializer.validated_data['total_time'],
            ),
            status=status.HTTP_200_OK,
        )


class RatingViewSet(viewsets.ModelViewSet):
    """Список отзывов."""
    queryset = Rating.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = RatingSerializer
    methods = ('get', 'post', 'patch', 'delete')
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        cached_reviews: list[dict] = get_cached_reviews()
        limit: int = request.query_params.get('limit')
        if limit and cached_reviews:
            try:
                cached_reviews: list[dict] = cached_reviews[:int(limit)]
            except ValueError:
                raise serializers.ValidationError(
                    detail="Invalid limit value. Limit must be an integer.",
                    code=status.HTTP_400_BAD_REQUEST
                )
        return Response(
            data=cached_reviews,
            status=status.HTTP_200_OK,
        )

    def perform_create(self, serializer):
        order_id = self.kwargs.get('order_id')
        order = get_object_or_404(Order, id=order_id)
        serializer.save(user=self.request.user, order=order)
        return
