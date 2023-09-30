import string
from random import randint

from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.core import mail
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS

from cleanpro.settings import ADDITIONAL_CS
from price.models import CleaningType, Service
from .permissions import IsOwnerOrReadOnly, IsOwner
from .serializers import (
    CancelSerializer,
    CleaningTypeSerializer,
    CommentSerializer,
    ConfirmMailSerializer,
    CustomUserSerializer,
    DateTimeSerializer,
    GetOrderSerializer,
    OrderStatusSerializer,
    PaySerializer,
    PostOrderSerializer,
    RatingSerializer,
    ServiceSerializer,
    CreateOrderSerializer,
)
from service.models import Order, Rating
from users.models import User
# TODO: ну надо определиться - или из строки 3, или отсюда. Полагаю - отсюда
from .utils import user_create, send_mail


# TODO: аннотировать типы данных. Везде. Абсолютно.


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

    @action(
        detail=True,
        url_path='subscribe',
        methods=('get',),
        permission_classes=(permissions.IsAuthenticated,)
    )
    def orders(self, request, id):
        """Список заказов пользователя."""
        queryset = Order.objects.filter(
            user=id
        ).select_related('user', 'service_package')
        page = self.paginate_queryset(queryset)
        serializer = GetOrderSerializer(
            page,
            many=True,
            context={'request': request}
        )
        return self.get_paginated_response(serializer.data)


@api_view(('POST',))
def confirm_mail(request):
    # TODO: нам в итоге нужна эта вьюха или
    # подтверждение почты происходит только при создании заказа?
    """Подтвердить электронную почту."""
    serializer = ConfirmMailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = get_object_or_404(
        User,
        email=serializer.validated_data.get('email'),
    )
    # TODO: адекватная практика на мой взгляд: при регистрации делать
    #       пользователя с параметром "is.active=False" и при подтверждении
    #       почты переводить его в состояние "is.active=True".
    #       Ниже я закомментил этот вариант реализации.
    password = User.objects.make_random_password(
        # TODO: best practice - избегать магических чисел,
        length=randint(8, 16),
        # INFO: встроенных библиотек Django великое множество.
        #       запоминаем такое профессиональное решение :)
        allowed_chars=string.ascii_lowercase + string.digits,
    )
    user.set_password(password)
    # TODO: при принятии этого решения - надо переделать регистрацию,
    #       либо переделать поле модели (что надежнее)
    #       is_active = models.BooleanField(default=False)
    # user.is_active = True
    user.save()
    send_mail(
        subject=settings.EMAIL_CONFIRM_SUBJECT,
        message=settings.EMAIL_CONFIRM_TEXT.format(
            username=user.username,
            password=user.password,
        ),
        to=(user.email,),
    )
    return Response(
        data="Email has confirmed! Please check you mailbox",
        status=status.HTTP_200_OK,
    )


@api_view(['POST'])
def order_create(request):
    # TODO: удалить эту вьюху когда поменяют эндпойнт на фронте
    """Создать заказ."""
    serializer = PostOrderSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    user = request.user
    if user.is_authenticated:
        return Response(request.data, status=status.HTTP_201_CREATED)
    email = request.data['email']
    user = User.objects.get(email=email)
    password = User.objects.make_random_password(
        # TODO: best practice - избегать магических чисел,
        #       длина пароля также может быть рандомной в пределах допустимого
        length=8,
        # INFO: встроенных библиотек Django великое множество.
        #       запоминаем такое профессиональное решение :)
        allowed_chars=string.ascii_lowercase + string.digits,
    )
    user.set_password(password)
    user.save()
    send_mail(
        # TODO: какое-то сжатое письмо. Добавить информативности.
        subject='Пароль',
        message=f'Пароль: {password}',
        to=(user.email,),
    )
    return Response(
        data=f'Заказ создан. Пароль от учетной записи: {password}',
        status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    """Список заказов."""
    methods = ('get', 'post', 'patch', 'delete',)
    queryset = Order.objects.all().select_related('user', 'address',)

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return GetOrderSerializer
        return CreateOrderSerializer

    def create(self, request):
        user = request.user
        if not user.is_authenticated:
            user = user_create(request.data['user'])
        serializer = self.get_serializer(data=request.data, user=user)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(
        detail=True,
        # TODO: сделать везде через tuple, ускорит код.
        methods=('patch',),
        permission_classes=(IsOwner,),
        url_path='pay',
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
        methods=('patch',),
        # TODO: проверить везде пермишены на
        #       задвоения.
        #       Если все же нужен хотя бы один - можно ознакомиться с
        #       необходимым для этого синтаксисом, например:
        #       https://ufchgu.ru/blog/algebra-logiki-v-pitone-kak-zapisyvajutsja#:~:text=%D0%92%20Python%20%D0%B4%D0%BB%D1%8F%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B8%20%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85,%2C%20%C2%AB%D0%BD%D0%B5%20%D1%80%D0%B0%D0%B2%D0%BD%D0%BE%C2%BB%20(!
        #       (я не уверен, что на 3.9 это так заработает. Возможно нужно
        #       будет импортировать Optional:
        #       https://docs-python.ru/standart-library/modul-typing-python/tip-annotatsii-optional-modulja-typing/)
        permission_classes=(IsOwner,),
        # INFO: "явное лучше неявного" (см.код `import this`) - рекомендуется
        #       прописывать url путь.
        url_path='pay',
    )
    def cancel(self, request, pk):
        """Отменить заказ."""
        order = get_object_or_404(Order, id=pk)
        # TODO: сериализаторы не предназначены для изменения данных объектов.
        #       Они нужны только для сериализации и для валидации - это
        #       общепринятые стандарты разделения отвутственности частей
        #       сервера. Т.о. убрать вообще сериализатор и перенести
        #       логику в функцию.
        # TODO: аналогичная ситуация есть в других функциях.
        serializer = CancelSerializer(order, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(
        detail=True,
        methods=('patch',),
        permission_classes=(IsOwner),
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
        methods=('patch',),
        permission_classes=(IsOwner,)
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
        methods=('patch',),
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
    methods = ('get', 'post', 'patch', 'delete')

    def perform_create(self, serializer):
        order_id = self.kwargs.get('order_id')
        order = get_object_or_404(Order, id=order_id)
        serializer.save(user=self.request.user, order=order)
