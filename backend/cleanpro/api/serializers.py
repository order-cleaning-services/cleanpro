from rest_framework import serializers
from django.shortcuts import get_object_or_404
from users.models import User
from service.models import Order, Service_package, Rating, Adress


class UserSerializer(serializers.ModelSerializer):
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
        fields = ('email')

class PostOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            'id', 'user', 'service_package',
            'total_sum', 'cleaning_date',
            'cleaning_time', 'comment',
        )
        extra_fields = (
            'first_name',
            'email',
            'phone',
            'city',
            'street',
            'house',
            'apartment',
            'floor',
            'entrance',
        )

    def create(self, validated_data):
        adress = Adress.objects.create(city=validated_data.get('city'),
                                       street=validated_data.get('street'),
                                       house=validated_data.get('house'),
                                       apartment=validated_data.get('apartment'),
                                       floor=validated_data.get('floor'))
        if self.context.get('request'):
            user = self.context.get('request').user
            if user.is_anonymous:
                user = User.objects.create(email=validated_data.get('email'),
                                           phone=validated_data.get('phone'),
                                           first_name=validated_data.get('first_name'),
                                           adress=adress)
        id = validated_data.get('id')
        service = get_object_or_404(Service_package,
                                    id=self.service_packege)
        order = Order.objects.create(user=user,
                                     total_sum=service.price,
                                     order_number=id,
                                     **validated_data)
        return order
    
    def update(self, instance, validated_data):
        instance.save()
        return instance

class OrderStatusSerializer(serializers.ModelSerializer):
    order_status = serializers.ChoiceField(
        choices=Order.STATUS_CHOICES)

    class Meta:
        model = Order
        fields = 'order_status'

# class Service_packageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Service_package
#         fields = 'title', 'price'

class AdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adress
        fields = '__all__'

class GetOrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    adress = AdressSerializer(read_only=True)
    service_package = Service_packageSerializer(read_only=True)

    class Meta:
        model = Order
        fields = (
            'user', 'service_package', 'adress',
            'total_sum', 'cleaning_date',
            'cleaning_time', 'comment'
        )

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = 'comment'

    def update(self, instance, validated_data):
        instance.comment = validated_data.get(
            'comment', instance.comment)
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
    user = UserSerializer(read_only=True)

    class Meta:
        fields = '__all__'
        model = Rating
        read_only_fields = ('order',)