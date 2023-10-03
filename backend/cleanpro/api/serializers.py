import re

from drf_base64.fields import Base64ImageField
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers, status

from price.models import CleaningType, Service
from service.models import Address, Order, Rating, ServicesInOrder
from users.models import User
from users.validators import EMAIL_PATTERN
from .utils import address_create, services_bulk_create


class ServiceSerializer(serializers.ModelSerializer):
    """Сериализатор услуг."""
    image = Base64ImageField(read_only=True)
    measure = serializers.ReadOnlyField(
        source='measure.title',
        read_only=True
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


class CleaningTypeSerializer(serializers.ModelSerializer):
    """Сериализатор набора услуг."""
    service = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = CleaningType
        fields = (
            'id',
            'title',
            'coefficient',
            'service',
        )


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


class AddressSerializer(serializers.ModelSerializer):
    """Сериализатор адреса."""

    class Meta:
        model = Address
        fields = (
            'id',
            'city',
            'street',
            'house',
            'apartment',
            'floor',
            'entrance',
        )


class CustomUserSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации пользователей."""
    address = AddressSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'email',
            'phone',
            'address',
        )


# TODO: название класса не отображает истинный смысл
class TokenSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('password',)


class ConfirmMailSerializer(serializers.Serializer):
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


class PostOrderSerializer(serializers.Serializer):
    # TODO: WARNING! ВАЖНО!
    #       Best practice: сериализатор нужен только для валидации и перевода
    #       информации из json в python-типы и обратно. Вся логика
    #       взаимодействия с БД - это работа view-функции. Это место
    #       обязательно требует рефакторинга!
    """Сериализатор для создания заказа."""
    # TODO: в полях могут быть пустые значения, и получится 500 на сайте,
    #       так как будет не APIException c кастомным указанием ошибки и кода,
    #       а ValueError от БД, и сайт накроется.
    # TODO: не повторяться, и сделать валидацию через сериализаторы для
    #       моделей User, Address и Order. Этот сериализатор вообще удалить.
    city = serializers.CharField(max_length=256,)
    street = serializers.CharField(max_length=256,)
    house = serializers.IntegerField()
    apartment = serializers.IntegerField(required=False,)
    floor = serializers.IntegerField(required=False,)
    entrance = serializers.IntegerField(required=False,)
    first_name = serializers.CharField(required=False,)
    email = serializers.EmailField()
    phone = PhoneNumberField(required=False, region='RU',)
    cleaning_type = serializers.PrimaryKeyRelatedField(
        queryset=CleaningType.objects.all(),
    )
    services = serializers.ListField()
    total_sum = serializers.IntegerField(default=0,)
    cleaning_date = serializers.DateField()
    cleaning_time = serializers.TimeField()
    comment = serializers.CharField(required=False,)

    def create(self, data):
        # TODO: сообщить проверку в сериализатор адреса.
        for attribute in ('house', 'city', 'street'):
            if attribute not in data:
                raise serializers.ValidationError(
                    data=(
                        'Заполните все обязательные поля адреса: \n'
                        '"house", "city", "street"'
                    ),
                    code=status.HTTP_400_BAD_REQUEST,
                )
        address, _ = Address.objects.get_or_create(
            city=data['city'],
            street=data['street'],
            house=data['house'],
        )
        for attribute in ('apartment', 'entrance', 'floor'):
            value = data.get(attribute)
            if value is not None:
                setattr(address, attribute, value)
        address.save()
        user, _ = User.objects.get_or_create(email=data['email'])
        user.first_name = data['first_name']
        user.address = Address.objects.get(id=address.id)
        user.phone = data['phone']
        user.save()
        order = Order.objects.create(
            user=user,
            total_sum=data['total_sum'],
            cleaning_type=data['cleaning_type'],
            address=user.address,
            cleaning_date=data['cleaning_date'],
            cleaning_time=data['cleaning_time'],
        )
        services_bulk_create(order, data['services'])
        return order

    def update(self, instance, validated_data):
        # TODO: тут не происходит никаких обновлений.
        instance.save()
        return instance


class OrderStatusSerializer(serializers.ModelSerializer):
    """Сериализатор для изменения статуса заказа."""
    # TODO: уточнить необходимость параметра, так как он прописан в модели.
    order_status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)

    class Meta:
        model = Order
        fields = ('order_status',)

    def update(self, instance, validated_data):
        instance.order_status = validated_data.get(
            'order_status',
            instance.order_status
        )
        instance.save()
        return instance


# TODO: убрать сериализатор, он в точности повторяет предыдущий.
class CancelSerializer(serializers.ModelSerializer):
    """Отменить заказ."""
    # TODO: Зачем?
    order_status = 'cancelled'

    class Meta:
        model = Order
        fields = ('order_status',)

    def update(self, instance, validated_data):
        instance.order_status = 'cancelled'
        instance.save()
        return instance


# TODO: убрать сериализатор, он в точности повторяет предыдущий
#       и предпредыдущий.
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


class GetOrderSerializer(serializers.ModelSerializer):
    """Сериализатор для представления заказа."""
    user = CustomUserSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    cleaning_type = CleaningTypeSerializer(read_only=True)
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
            # TODO: вопрос про datetime поле все-еще активен, дублирую тут.
            'creation_date',
            'creation_time',
            'cleaning_date',
            'cleaning_time'
        )


class CreateServicesInOrderSerializer(serializers.ModelSerializer):
    """Создание списка дополнительных услуг с указанием количества."""
    id = serializers.IntegerField()
    amount = serializers.IntegerField()

    class Meta:
        model = ServicesInOrder
        fields = (
            'id',
            'amount',
        )


class CreateCustomUserSerializer(serializers.ModelSerializer):
    """Создание пользователя."""

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'email',
            'phone',
        )


class CreateUserAndOrderSerializer(serializers.ModelSerializer):
    """Создание заказа."""
    user = CreateCustomUserSerializer()
    address = AddressSerializer()
    cleaning_type = serializers.PrimaryKeyRelatedField(
        queryset=CleaningType.objects.all(),
    )
    services = CreateServicesInOrderSerializer(
        many=True, source='servicesinorder_set')

    class Meta:
        model = Order
        fields = (
            'user',
            'address',
            'cleaning_type',
            'services',
            'total_sum',
            'total_time',
            'comment',
            'cleaning_date',
            'cleaning_time',
        )

    def create(self, validated_data):
        valid_address = validated_data.pop('address')
        valid_user = validated_data.pop('user')
        services = validated_data.pop('servicesinorder_set')
        address = address_create(valid_address)
        user, _ = User.objects.get_or_create(
            email=valid_user.get('email'))
        user.first_name, = valid_user.get('first_name'),
        user.address, = address,
        user.phone, = valid_user.get('phone'),
        user.save()
        validated_data['user'] = user
        validated_data['address'] = user.address
        order = super().create(validated_data)
        services_bulk_create(order, services)
        return order


class CreateOrderSerializer(serializers.ModelSerializer):
    """Создание заказа."""
    address = AddressSerializer()
    cleaning_type = serializers.PrimaryKeyRelatedField(
        queryset=CleaningType.objects.all(),
    )
    services = CreateServicesInOrderSerializer(
        many=True, source='servicesinorder_set')

    class Meta:
        model = Order
        fields = (
            'address',
            'cleaning_type',
            'services',
            'total_sum',
            'total_time',
            'comment',
            'cleaning_date',
            'cleaning_time',
        )

    def create(self, validated_data):
        request = self.context.get('request')
        valid_address = validated_data.pop('address')
        valid_user = request.user
        services = validated_data.pop('servicesinorder_set')
        address = address_create(valid_address)
        validated_data['user'] = valid_user
        validated_data['address'] = address
        order = super().create(validated_data)
        services_bulk_create(order, services)
        return order

    def to_representation(self, value):
        request = self.context['request']
        return GetOrderSerializer(
            value,
            context={'request': request}
        ).data


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
