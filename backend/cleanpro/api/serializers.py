from rest_framework import serializers
from django.shortcuts import get_object_or_404
from users.models import User
from service.models import Order, Service_package, Rating, Adress
from phonenumber_field.serializerfields import PhoneNumberField

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'email',
            'phone',
            'adress',
        )

class Confirm_mailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        max_length=254,
        required=True
    )

    class Meta:
        model = User
        fields = ('email',)
    

class Service_packageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service_package
        fields = 'title', 'price'

class PostOrderSerializer(serializers.Serializer):
    city = serializers.CharField(
        max_length=256,)
    street = serializers.CharField(
        max_length=256,)
    house = serializers.IntegerField()
    apartment = serializers.IntegerField(
        required=False)
    floor = serializers.IntegerField(required=False)
    entrance = serializers.IntegerField(required=False)
    first_name =  serializers.CharField(max_length=256, required=False)
    email = serializers.EmailField()
    phone = PhoneNumberField(required=False, region='RU')
    service_package = serializers.PrimaryKeyRelatedField(queryset=Service_package.objects.all(),)
    total_sum = serializers.IntegerField(
        default=0)
    cleaning_date = serializers.DateField()
    cleaning_time = serializers.TimeField()
    comment = serializers.CharField(required=False)



    def create(self, data):
        adress, created = Adress.objects.get_or_create(city=data['city'],
                                       street=data['street'],
                                       house=data['house'],
                                       )
        user, created = User.objects.get_or_create(email=data['email'])
        user.first_name, = data['first_name'],
        user.adress, = Adress.objects.get(id=adress.id),
        user.phone, = data['phone'],
        user.save()
        service = data['service_package']
        total_sum=service.price
        order = Order.objects.create(user=user, service_package=service,
                                     total_sum=service.price,
                                     adress=user.adress,
                                     cleaning_date=data['cleaning_date'],
                                     cleaning_time=data['cleaning_time'],
                                     )
        return order, created
    
    def update(self, instance, validated_data):
        instance.save()
        return instance

class OrderStatusSerializer(serializers.ModelSerializer):
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
    
class CancellSerializer(serializers.ModelSerializer):
    order_status = 'cancelled'

    class Meta:
        model = Order
        fields = ('order_status',)

    def update(self, instance, validated_data):
        instance.order_status = 'cancelled'
        instance.save()
        return instance

class PaySerializer(serializers.ModelSerializer):
    pay_status = True

    class Meta:
        model = Order
        fields = ('pay_status',)

    def update(self, instance, validated_data):
        instance.pay_status = True
        instance.save()
        return instance

class AdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adress
        fields = '__all__'

class GetOrderSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    adress = AdressSerializer(read_only=True)
    service_package = Service_packageSerializer(read_only=True)

    class Meta:
        model = Order
        fields = (
            "__all__"
        )

class CommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField()
    class Meta:
        model = Order
        fields = ('comment',)

    def update(self, instance, validated_data):
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance
    
class DateTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = 'cleaning_date', 'cleaning_time'

    def update(self, instance, validated_data):
        instance.cleaning_date = validated_data.get(
            'cleaning_date', instance.cleaning_date)
        instance.cleaning_time = validated_data.get(
            'cleaning_time', instance.cleaning_time)
        instance.save()
        return instance
    
class RatingSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        fields = '__all__'
        model = Rating
        read_only_fields = ('order',)