from rest_framework import serializers
from users.models import User
from service.models import Order


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
    service_packege = Service_packageSerializer()
    total_sum = serializers.SerializerMethodField(
        'get_total_sum')

    class Meta:
        model = Order
        fields = (
            'id', 'title', 'user', 'service_package', 'total_sum',
            'city', 'street', 'house', 'apartment', 'cleaning_date', 'cleaning_time',
        )

    def get_total_sum(self, obj):
        pass

    def create(self, validated_data):
        user = self.context.get('request').user
        order = Order.objects.create(user=user, **validated_data)
        return order

class OrderStatusSerializer(serializers.ModelSerializer):
    order_status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)

    class Meta:
        model = Order
        fields = 'order_status'

class Service_packageSerializer(serializers.ModelSerializer):
    pass