from rest_framework import serializers

from .models import Price, CleanSet


class PriceSerializer(serializers.ModelSerializer):
    """Сериализатор модели Price."""
    
    measure = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Price
        fields = (
            'id',
            'title',
            'description',
            'price',
            'service_type',
            'measure',       
        )


class PriceInSetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Price
        fields = (
            'title',
            'price',
        )


class CleanSetSerializer(serializers.ModelSerializer):
    """Сериализатор для модели CleanSet."""
    
    prices = PriceInSetSerializer(source='price', many=True)
    
    class Meta:
        model = CleanSet
        fields = (
            'id',
            'title',
            'prices',
        )
