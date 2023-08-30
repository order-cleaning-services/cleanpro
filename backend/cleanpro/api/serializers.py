from rest_framework import serializers
from users.models import User
from service.models import Order, Service_package, Rating


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'phone',
            'city',
            'street',
            'house',
            'apartment',
        )

class PostOrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    title = serializers.ChoiceField(choices=Order.CLEANING_TYPE)

    class Meta:
        model = Order
        fields = (
            'id', 'title', 'user', 'service_package',
            'total_sum', 'email', 'phone_number',
            'city', 'street', 'house', 'apartment',
            'cleaning_date', 'cleaning_time', 'email', 'comment'
        )

    def create(self, validated_data):
        if self.context.get('request'):
            user = self.context.get('request').user
            if user.is_anonymous:
                user = User.objects.create(email=validated_data.pop('email'),
                                    city=validated_data.pop('city'),
                                    street=validated_data.pop('street'),
                                    house=validated_data.pop('house'),
                                    apartment=validated_data.pop('apartment')
                                    )
        service = Service_package.objects.filter(id=self.service_packege)
        order = Order.objects.create(user=user, total_sum=service.price, title=service.title, **validated_data)
        return order
    
    def update(self, instance, validated_data):
        instance.save()
        return instance

class OrderStatusSerializer(serializers.ModelSerializer):
    order_status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)

    class Meta:
        model = Order
        fields = 'order_status'

class Service_packageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service_package
        fields = 'title', 'price'

class GetOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            'title', 'user', 'service_package',
            'total_sum', 'email', 'phone_number',
            'city', 'street', 'house', 'apartment',
            'cleaning_date', 'cleaning_time', 'email', 'comment'
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
        read_only_fields = 'order'