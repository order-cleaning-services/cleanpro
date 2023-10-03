import string

from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core import mail
from django.shortcuts import get_object_or_404
from djoser.views import UserViewSet
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from cleanpro.settings import ADDITIONAL_CS
from price.models import CleaningType, Service
from .permissions import IsOwner, IsOwnerOrReadOnly
from .serializers import (
    CancelSerializer,
    CleaningTypeSerializer,
    CommentSerializer,
    ConfirmMailSerializer,
    CreateOrderSerializer,
    CreateUserAndOrderSerializer,
    CustomUserSerializer,
    DateTimeSerializer,
    GetOrderSerializer,
    OrderStatusSerializer,
    PaySerializer,
    PostOrderSerializer,
    RatingSerializer,
    ServiceSerializer
)
from service.models import Order, Rating
# TODO: ну надо определиться - или из строки 3, или отсюда. Полагаю - отсюда
from users.models import User

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


# TODO: аннотировать типы данных. Везде. Абсолютно.
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
        serializer = GetOrderSerializer(
            page,
            many=True,
            context={'request': request}
        )
        return self.get_paginated_response(serializer.data)


@api_view(('POST',))
def confirm_mail(request):
    """Подтвердить электронную почту."""
    serializer = ConfirmMailSerializer(data=request.data)
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


@api_view(['POST'])
def order_create(request):
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
    serializer_class = GetOrderSerializer
    queryset = Order.objects.all().select_related('user', 'address',)

    def get_serializer_class(self):
        if (self.request.method == 'POST'
                or self.request.method == 'PATCH'
                or self.request.method == 'PUT'):
            if not self.request.user.is_authenticated:
                return CreateUserAndOrderSerializer
            return CreateOrderSerializer
        return GetOrderSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        user = request.user
        if not user.is_authenticated:
            email = request.data['user']['email']
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
                f'Заказ создан. Пароль от учетной записи: {password}',
                status=status.HTTP_200_OK, headers=headers
            )
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

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
        # TODO: IsOwner "сильнее", чем "IsAuthenticated".
        #       Убрать "IsAuthenticated" и проверить везде пермишены на
        #       задвоения.
        #       Также логическая ошибка: аунтифицированный юзер по первому
        #       пермишену мог бы удалить любой заказ.
        #       Если все же нужен хотя бы один - можно ознакомиться с
        #       необходимым для этого синтаксисом, например:
        #       https://ufchgu.ru/blog/algebra-logiki-v-pitone-kak-zapisyvajutsja#:~:text=%D0%92%20Python%20%D0%B4%D0%BB%D1%8F%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B8%20%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85,%2C%20%C2%AB%D0%BD%D0%B5%20%D1%80%D0%B0%D0%B2%D0%BD%D0%BE%C2%BB%20(!
        #       (я не уверен, что на 3.9 это так заработает. Возможно нужно
        #       будет импортировать Optional:
        #       https://docs-python.ru/standart-library/modul-typing-python/tip-annotatsii-optional-modulja-typing/)
        permission_classes=(permissions.IsAuthenticated, IsOwner,),
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
        permission_classes=(permissions.IsAuthenticated, IsOwner),
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
        permission_classes=(permissions.IsAuthenticated, IsOwner,)
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
