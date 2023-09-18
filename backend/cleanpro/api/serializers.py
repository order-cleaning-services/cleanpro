from rest_framework import serializers
from drf_base64.fields import Base64ImageField
from django.shortcuts import get_object_or_404
from users.models import User
# TODO: Советую установить, они проверяют орфографию:
#       https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
#       https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-russian
#       Поправил много чего. Например, "Adress" -> "Address", "cancell" -> "cancel" и т.д..
from service.models import Order, Rating, Address, ServicesInOrder
from price.models import CleaningType, Service
from phonenumber_field.serializerfields import PhoneNumberField


class ServiceSerializer(serializers.ModelSerializer):
    """Выгрузка списка дополнительных услуг."""
    image = Base64ImageField(read_only=True)
    # TODO: просьба придерживаться общего код-стайла. Я тоже очень люблю, как
    #       было тут исходно, но по всему проекту прослеживается иной стиль.
    #       Неконсистентный код бросается в глаза и выглядит непрофессионально.
    #       Тренируем навык написания программ в общем стиле!
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
        )


class CleaningTypeSerializer(serializers.ModelSerializer):
    """Выгрузка списка блоков основных услуг."""
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
    """Выгрузка списка дополнительных услуг с указанием количества."""
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
    """Адрес заказа."""

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


# TODO: этот сериализатор был ниже. Я его перенес выше для наглядности.
#       Пожалуйста, не плодите ненужные и тем более задвоенные сериализаторы.
#       Комментарии ниже есть и для других.
#       Особое внимание к PostOrderSerializer. Могу с ним помочь в будущем.
class AddressSerializer(serializers.ModelSerializer):
    """Сериализатор для представления адреса."""
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
        # TODO: я для поля модели писал regexp - его надо сюда
        return value


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

    def services_bulk_create(self, order, services):
        ing_objs = []
        for item in services:
            id = item.get('id')
            amount = item.get('amount')
            # INFO: Вот тут 'amount' если None - привет 500 из-за TypeError.
            #       Если id None - выдаст 404 исключение.
            # TODO: вопрос! Какая должна быть логика, если хоть у одного адреса
            #       произойдет сбой в присланных данных?
            if id is not None and amount is not None and amount > 0:
                service = get_object_or_404(Service, id=id)
                ing_objs.append(
                    ServicesInOrder(
                        order=order, service=service, amount=amount
                    )
                )
        return ServicesInOrder.objects.bulk_create(ing_objs)

    def create(self, data):
        # TODO: будет 500 при отсутствии какого-либо ключа в data.
        address, _ = Address.objects.get_or_create(
            city=data['city'],
            street=data['street'],
            house=data['house'],
        )
        # TODO: подумать, как написать это "хорошо"
        if 'apartment' in data:
            address.apartment = data['apartment']
        if 'floor' in data:
            address.floor = data['floor']
        if 'entrance' in data:
            address.entrance = data['entrance']
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
        self.services_bulk_create(order, data['services'])
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
