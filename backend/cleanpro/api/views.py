# TODO: аннотировать типы данных. Везде. Абсолютно.

from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.core import mail
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet
from rest_framework import permissions, serializers, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from cleanpro.settings import ADDITIONAL_CS
from price.models import CleaningType, Service
from service.models import Order, Rating
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

# TODO: создать core для сайта, перенести туда часть настроек из settings.py,
#       перенести это, сделать там смысловое разделение с указанием блоков.
# TODO: Добавить URL сайта из переменных окружения с указанием эндпоинта
PASSWORD_RESET_LINK: str = None
EMAIL_CONFIRM_SUBJECT: str = 'Welcome to CleanPro!'
EMAIL_CONFIRM_TEXT: str = (
    'Dear {username},\n'
    '\n'
    'Welcome to CleanPro! We are thrilled to have you as part '
    'of our community.\n'
    '\n'
    'You have successfully confirmed your email, and now you have '
    'full access to your account.\n'
    '\n'
    'Below, you will find your account details:\n'
    '\n'
    'Username: {username}\n'
    'Password: {password}\n'
    '\n'
    'Please keep this information in a secure place. '
    'If you ever forget your password, you can reset it by following this '
    f'link: {PASSWORD_RESET_LINK}''\n'
    '\n'
    'If you have any questions or need further assistance, do not hesitate '
    f'to reach out to us at {settings.DEFAULT_FROM_EMAIL}.''\n'
    '\n'
    'Thank you for choosing CleanPro! We hope you enjoy your time with us '
    'and wish you a pleasant experience.\n'
    '\n'
    'Best regards,\n'
    'The CleanPro Team'
)


def send_mail(subject: str, message: str, to: tuple[str]) -> None:
    """Отправляет электронное сообщение.
    "backend=None" означает, что бекенд будет выбран согласно указанному
    значению в settings.EMAIL_BACKEND."""
    with mail.get_connection(backend=None, fail_silently=False) as conn:
        mail.EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
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
        serializer = OrderGetSerializer(
            page,
            many=True,
            context={'request': request}
        )
        return self.get_paginated_response(serializer.data)


@api_view(('POST',))
def confirm_mail(request):
    """Подтвердить электронную почту."""
    serializer = EmailConfirmSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = get_object_or_404(
        User,
        email=serializer.validated_data.get('email'),
    )
    # TODO: разобраться, с со строкой кода ниже.
    #       Пароль сам генерируется? Еще и в виде токена? Что это вообще такое?
    #       Для установки пароля используется метод .set_password()
    #       Только пользователь сам себе ставит пароль при регистрации.
    #       Если это попытка а-ля "хешировать" пароль - Django сам это делает.
    # TODO: адекватная практика на мой взгляд: при регистрации делать
    #       пользователя с параметром "is.active=False" и при подтверждении
    #       почты переводить его в состояние "is.active=True".
    #       Ниже я закомментил этот вариант реализации.
    user.password = default_token_generator.make_token(user)
    # TODO: при принятии этого решения - надо переделать регистрацию,
    #       либо переделать поле модели (что надежнее)
    #       is_active = models.BooleanField(default=False)
    # user.is_active = True
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
            ) -> serializers: # NoQa
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
