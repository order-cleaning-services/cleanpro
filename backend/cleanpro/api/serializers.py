from rest_framework import serializers
from django.shortcuts import get_object_or_404
from users.models import User
# Советую установить, они проверяют орфографию:
# https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
# https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-russian
# Поправил много чего. Например, "Adress" -> "Address", "cancell" -> "cancel" и т.д..
from service.models import Order, ServicePackage, Rating, Address
from phonenumber_field.serializerfields import PhoneNumberField


class CustomUserSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации пользователей."""
    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'email',
            'phone',
            'address',
        )


class ConfirmMailSerializer(serializers.Serializer):
    """Подтвердить электронную почту."""
    email = serializers.EmailField()

    def validate_email(self, value):
        """Производит валидацию поля email."""
        # TODO: я для поля модели писал regexp - его надо сюда
        return value


# Прошу ознакомиться с правилами названия классов в Python:
# https://peps.python.org/pep-0008/#class-names
class ServicePackageSerializer(serializers.ModelSerializer):
    # TODO: уточнить назначение сериализатора и точно прописать docstring.
    """Сериализатор для отображения услуг и их цен."""
    class Meta:
        model = ServicePackage
        fields = ('title', 'price')


# TODO: добавить dockstring.
class Service_packageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServicePackage
        fields = ('title', 'price')


class PostOrderSerializer(serializers.Serializer):
    # TODO: WARNING! ВАЖНО!
    # Best practice: сериализатор нужен только для валидации и перевода
    # информации из json в python-типы и обратно. Вся логика взаимодействия
    # с БД - это работа view-функции. Это место обязательно требует
    # рефакторинга!
    """Сериализатор для создания заказа."""
    # TODO: в полях могут быть пустые значения, и получится 500 на сайте,
    # так как будет не APIException c кастомным указанием ошибки и кода,
    # а ValueError от БД, и сайт накроется.
    # TODO: не повторяться, и сделать валидацию через сериализаторы для
    # моделей User, Address и Order. Этот сериализатор вообще удалить.
    city = serializers.CharField(
        max_length=256,)
    street = serializers.CharField(
        max_length=256,)
    house = serializers.IntegerField()
    apartment = serializers.IntegerField(required=False)
    floor = serializers.IntegerField(required=False)
    entrance = serializers.IntegerField(required=False)
    first_name = serializers.CharField(required=False)
    email = serializers.EmailField()
    phone = PhoneNumberField(required=False, region='RU')
    service_package = serializers.PrimaryKeyRelatedField(
        queryset=ServicePackage.objects.all(),)
    total_sum = serializers.IntegerField(
        default=0)
    cleaning_date = serializers.DateField()
    cleaning_time = serializers.TimeField()
    comment = serializers.CharField(required=False)

    def create(self, data):
        address, created = Address.objects.get_or_create(
            city=data['city'],
            street=data['street'],
            house=data['house'],
        )
        user, created = User.objects.get_or_create(email=data['email'])
        user.first_name = data['first_name']
        user.address = Address.objects.get(id=address.id)
        user.phone = data['phone']
        user.save()
        service = data['service_package']
        order = Order.objects.create(user=user, service_package=service,
                                     total_sum=service.price,
                                     address=user.address,
                                     cleaning_date=data['cleaning_date'],
                                     cleaning_time=data['cleaning_time'],
                                     )
        return order, created

    def update(self, instance, validated_data):
        instance.save()
        return instance


class OrderStatusSerializer(serializers.ModelSerializer):
    """Сериализатор для изменения статуса заказа."""
    # TODO: уточнить необходимость параметра, так как он прописан в модели.
    order_status = serializers.ChoiceField(
        choices=Order.STATUS_CHOICES)

    class Meta:
        model = Order
        fields = ('order_status',)

    def update(self, instance, validated_data):
        instance.order_status = validated_data.get(
            'order_status', instance.order_status)
        instance.save()
        return instance
    

# TODO: убрать сериализатор, он в точности повторяет предыдущий.
class CancelSerializer(serializers.ModelSerializer):
    """Отменить заказ."""
    # Зачем?
    order_status = 'cancelled'


    class Meta:
        model = Order
        fields = ('order_status',)

    def update(self, instance, validated_data):
        instance.order_status = 'cancelled'
        instance.save()
        return instance



class PaySerializer(serializers.ModelSerializer):
    """Сериализатор для оплаты заказа."""
    # Зачем?
    pay_status = True

    class Meta:
        model = Order
        fields = ('pay_status',)

    def update(self, instance, validated_data):
        instance.pay_status = True
        instance.save()
        return instance


class AddressSerializer(serializers.ModelSerializer):
    """Сериализатор для представления адреса."""
    class Meta:
        model = Address
        fields = '__all__'



class GetOrderSerializer(serializers.ModelSerializer):
    """Сериализатор для представления заказа."""
    user = CustomUserSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    service_package = ServicePackageSerializer(read_only=True)

    class Meta:
        model = Order
        # TODO: не best practice, указать все поля, это важно с точки зрения
        # безопасности и читаемости кода. 
        fields = (
            "__all__"
        )



class CommentSerializer(serializers.ModelSerializer):
    """Сериализатор для добавления комментария к заказу."""
    comment = serializers.CharField()


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
        fields = ('cleaning_date', 'cleaning_time')

    def update(self, instance, validated_data):
        instance.cleaning_date = validated_data.get(
            'cleaning_date', instance.cleaning_date)
        instance.cleaning_time = validated_data.get(
            'cleaning_time', instance.cleaning_time)
        instance.save()
        return instance




class RatingSerializer(serializers.ModelSerializer):
    """Сериализатор для представления отзыва на уборку."""
    user = CustomUserSerializer(read_only=True)

    class Meta:
        fields = '__all__'
        model = Rating
        read_only_fields = ('order',)

