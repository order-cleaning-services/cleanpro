import re

from django.db import transaction
from django.db.models import QuerySet
from drf_base64.fields import Base64ImageField
from phonenumber_field.phonenumber import PhoneNumber
from rest_framework import serializers, status

from service.models import (Address, CleaningType, Measure, Order, Rating,
                            Service, ServicesInOrder)
from users.models import User, generate_random_password
from users.validators import EMAIL_PATTERN, USERNAME_PATTERN


def get_or_create_address(address_data) -> Address:
    """Получить или создать объект адреса."""
    address, _ = Address.objects.get_or_create(
        city=address_data.get('city'),
        street=address_data.get('street'),
        house=address_data.get('house'),
        entrance=address_data.get('entrance'),
        floor=address_data.get('floor'),
        apartment=address_data.get('apartment'),
    )
    return address


class AddressSerializer(serializers.ModelSerializer):
    """Сериализатор адреса."""

    class Meta:
        model = Address
        fields = (
            'id',
            'city',
            'street',
            'house',
            'floor',
            'entrance',
            'apartment',
        )


class CustomUserSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации пользователей."""
    address = AddressSerializer()

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'phone',
            'address',
        )

    def update(self, instance, validated_data):
        """Производит обновление данных о пользователе и его адресе."""
        address_values = validated_data.pop('address')
        super().update(instance, validated_data)
        instance.address = get_or_create_address(
            address_data=address_values
        )
        instance.save()
        return instance


class EmailConfirmSerializer(serializers.Serializer):
    """Подтвердить электронную почту."""

    email = serializers.EmailField()

    def validate_email(self, value):
        """Производит валидацию поля email."""
        # TODO: слишком много валидации повторной, копирует полностью:
        #       users.validators.validate_password - не хорошо, не DRY
        if re.fullmatch(EMAIL_PATTERN, value):
            return value
        raise serializers.ValidationError(
            detail='Введите корректный email (например: example@example.ru',
            code=status.HTTP_400_BAD_REQUEST,
        )


class MeasureSerializer(serializers.ModelSerializer):
    """Сериализатор единиц измерения"""

    class Meta:
        model = Measure
        fields = (
            'id',
            'title',
        )


class GetServiceSerializer(serializers.ModelSerializer):
    """Сериализатор услуг"""

    image = Base64ImageField(read_only=True)
    measure = serializers.ReadOnlyField(
        source='measure.title',
        read_only=True,
    )

    class Meta:
        model = Service
        fields = (
            'id',
            'title',
            'price',
            'measure',
            'image',
            'cleaning_time',
        )


class CreateServiceSerializer(serializers.ModelSerializer):
    """Сериализатор создания и изменения услуг"""

    image = Base64ImageField(allow_null=True)
    measure = serializers.PrimaryKeyRelatedField(
        queryset=Measure.objects.all()
    )

    class Meta:
        model = Service
        fields = (
            'id',
            'title',
            'price',
            'measure',
            'image',
            'service_type',
            'cleaning_time',
        )

    def to_representation(self, value):
        representation = super().to_representation(value)

        representation['measure'] = value.measure.title
        return representation


class GetCleaningTypeSerializer(serializers.ModelSerializer):
    """Сериализатор набора услуг."""

    service = GetServiceSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = CleaningType
        fields = (
            'id',
            'title',
            'coefficient',
            'service',
        )


class CreateCleaningTypeSerializer(serializers.ModelSerializer):
    """Сериализатор создания и изменения наборов услуг"""

    service = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Service.objects.all(),
    )

    class Meta:
        model = CleaningType
        fields = (
            'id',
            'title',
            'coefficient',
            'service',
        )

    def create(self, validated_data):
        services = validated_data.pop('service')
        cleaning_type = super().create(validated_data)
        cleaning_type.service.set(services)
        return cleaning_type

    def update(self, instance, validated_data):
        services = validated_data.pop('service')
        super().update(instance, validated_data)
        if services:
            instance.service.set(services)
        instance.save()
        return instance

    def to_representation(self, value):
        request = self.context['request']
        return GetCleaningTypeSerializer(
            value,
            context={'request': request}
        ).data


class ServicesInOrderSerializer(serializers.ModelSerializer):
    """Сериализатор перечня услуг в заказе."""

    id = serializers.ReadOnlyField(source='service.id')
    title = serializers.ReadOnlyField(source='service.title')
    measure = serializers.ReadOnlyField(source='service.measure.title')
    price = serializers.ReadOnlyField(source='service.price')
    image = Base64ImageField(source='service.image')

    class Meta:
        model = ServicesInOrder
        fields = (
            'id',
            'title',
            'measure',
            'price',
            'image',
            'amount',
        )


class OrderGetSerializer(serializers.ModelSerializer):
    """Сериализатор для представления заказа."""

    user = CustomUserSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    cleaning_type = GetCleaningTypeSerializer(read_only=True)
    services = ServicesInOrderSerializer(
        source='servicesinorder_set',
        many=True,
        read_only=True,
    )

    class Meta:
        model = Order
        fields = (
            'id',
            'user',
            'total_sum',
            'total_time',
            'comment',
            'order_status',
            'cleaning_type',
            'services',
            'pay_status',
            'address',
            'creation_date',
            'creation_time',
            'cleaning_date',
            'cleaning_time',
        )


class OrderPostSerializer(serializers.ModelSerializer):
    """Сериализатор для создания заказа."""

    # INFO: нельзя использовать CustomUserSerializer по причине того,
    #       Django будет проверять поля на уникальность и не позволит
    #       новому пользователю создать заказ.
    user = serializers.DictField(child=serializers.CharField())
    services = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        )
    )
    address = AddressSerializer()

    class Meta:
        model = Order
        fields = (
            'user',
            'total_sum',
            'comment',
            'cleaning_type',
            'services',
            'address',
            'creation_date',
            'creation_time',
            'cleaning_date',
            'cleaning_time',
        )

    def validate_user(self, user_data):
        """Производит валидацию данных о пользователе."""
        invalid_data: list[str] = []
        username: str = user_data.get('username', 'None')
        email: str = user_data.get('email', 'None')
        phone: str = user_data.get('phone', 'None')
        if not re.fullmatch(USERNAME_PATTERN, username):
            invalid_data.append("username")
        if not re.fullmatch(EMAIL_PATTERN, email):
            invalid_data.append("email")
        if not self.__validate_phone(phone):
            invalid_data.append("phone")
        if invalid_data:
            raise serializers.ValidationError(
                'Отсутствуют или указаны невалидные данные: '
                f'{", ".join(invalid_data)}.'
            )
        return user_data

    def validate_services(self, services_data):
        """Производит валидацию сервисов и их количества в заказе."""
        all_services_id: list[int] = [
            service.id for service in Service.objects.all()
        ]
        invalidated_services: list[int] = []
        for service in services_data:
            service_id: str = service.get('id')
            amount: str = service.get('amount')
            if service_id is None or amount is None:
                raise serializers.ValidationError(
                    'Укажите id и amount сервиса.'
                )
            if int(service_id) not in all_services_id or int(amount) <= 0:
                invalidated_services.append(service_id)
        if invalidated_services:
            raise serializers.ValidationError(
                'Убедитесь, что услуги со следующими id существуют, '
                'и для них указано валидное значение поля amount: '
                f'{", ".join(id for id in invalidated_services)}.'
            )
        return services_data

    @transaction.atomic
    def create(self, data):
        """Создает новый заказ.
        Если пользователь отсутствует в базе данных - создает нового.
        Если адрес отсутствует в базе данных - создает новый."""
        address: Address = get_or_create_address(
            address_data=data.get('address')
        )
        user_data = data.get('user', {})
        user: QuerySet = User.objects.filter(email=user_data.get('email'))
        if user:
            user: User = user.first()
        else:
            user: User = self.__create_new_user(
                user_data=user_data,
                address=address
            )
        order, is_created = Order.objects.get_or_create(
            user=user,
            total_sum=data.get('total_sum'),
            cleaning_type=data.get('cleaning_type'),
            address=address,
            cleaning_date=data.get('cleaning_date'),
            cleaning_time=data.get('cleaning_time'),
        )
        if not is_created:
            raise serializers.ValidationError(
                {"Статус": "Заказ уже был создан."}
            )
        self.__services_bulk_create(order, data.get('services'))
        return order

    def to_representation(self, instance):
        return {'Статус': 'Заказ создан.'}

    def __create_new_user(self, user_data, address: Address) -> User:
        """Создает нового пользователя."""
        new_user = User.objects.create(
            username=user_data.get('username'),
            email=user_data.get('email'),
            phone=user_data.get('phone'),
        )
        password = generate_random_password()
        new_user.set_password(password)
        new_user.address: Address = address
        new_user.save()
        # TODO: подключить сигнал, чтобы отправился совой
        #       пароль в этом месте перед return.
        return new_user

    def __services_bulk_create(self, order, services):
        """Добавляет сервисы в заказ."""
        ing_objs = []
        for item in services:
            id: str = item.get('id')
            amount: str = item.get('amount')
            service = Service.objects.get(id=int(id))
            ing_objs.append(
                ServicesInOrder(
                    order=order,
                    service=service,
                    amount=int(amount)
                )
            )
        ServicesInOrder.objects.bulk_create(ing_objs)
        return

    def __validate_phone(self, phone_data):
        """Производит валидацию номера телефона.
        Возвращает False, в случае ошибки валидации."""
        try:
            parsed_phone = PhoneNumber.from_string(phone_data)
            if parsed_phone.is_valid():
                return phone_data
        except Exception:
            pass
        return False


class OrderStatusSerializer(serializers.ModelSerializer):
    """Сериализатор для изменения статуса заказа."""

    order_status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)

    class Meta:
        model = Order
        fields = ('order_status',)

    def update(self, instance, validated_data):
        instance.order_status = validated_data.get(
            'order_status',
            instance.order_status,
        )
        instance.save()
        return instance


class OrderCancelSerializer(serializers.ModelSerializer):
    """Сериализатор для отмены заказа."""

    class Meta:
        model = Order
        fields = ('comment_cancel',)

    def update(self, instance, validated_data):
        instance.order_status = 'cancelled'
        instance.comment_cancel = validated_data.get(
            'comment_cancel',
            instance.comment_cancel
        )
        instance.save()
        return instance


# TODO: убрать сериализатор, он в точности повторяет предыдущий
#       и предпредыдущий.
#       Сделать один общий сериализатор для PATCH запросов!
class PaySerializer(serializers.ModelSerializer):
    """Сериализатор для оплаты заказа."""

    # TODO: Зачем?
    pay_status = True

    class Meta:
        model = Order
        fields = ('pay_status',)

    def update(self, instance, validated_data):
        instance.pay_status = True
        instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    """Сериализатор для добавления комментария к заказу."""

    class Meta:
        model = Order
        fields = ('comment',)

    def update(self, instance, validated_data):
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance


# TODO: уточнить необходимость таких сериализаторов. Рассмотреть возможность
# PATCH запросов и использования сериализатора для отображения модели.
class DateTimeSerializer(serializers.ModelSerializer):
    """Сериализатор для переноса времени заказа."""

    class Meta:
        model = Order
        # TODO: вопрос про datetime поле все-еще активен, дублирую тут.
        fields = ('cleaning_date', 'cleaning_time')

    def update(self, instance, validated_data):
        instance.cleaning_date = validated_data.get(
            'cleaning_date',
            instance.cleaning_date,
        )
        instance.cleaning_time = validated_data.get(
            'cleaning_time',
            instance.cleaning_time,
        )
        instance.save()
        return instance


class RatingSerializer(serializers.ModelSerializer):
    """Сериализатор для представления отзыва на уборку."""

    user = CustomUserSerializer(read_only=True)

    class Meta:
        fields = (
            'id',
            'order',
            'user',
            'pub_date',
            'text',
            'score',
        )
        model = Rating
        read_only_fields = ('order',)
