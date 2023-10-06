from django.shortcuts import get_object_or_404
from rest_framework import serializers, status

from price.models import Service
from service.models import Address, ServicesInOrder


def services_bulk_create(order, services):
    ing_objs = []
    for item in services:
        id = item.get('id')
        amount = item.get('amount')
        if id is not None and amount is not None and amount > 0:
            service = get_object_or_404(Service, id=id)
            ing_objs.append(
                ServicesInOrder(
                    order=order, service=service, amount=amount
                )
            )
    return ServicesInOrder.objects.bulk_create(ing_objs)


def address_create(data):
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
        city=data.get('city'),
        street=data.get('street'),
        house=data.get('house'),
    )
    for attribute in ('apartment', 'entrance', 'floor'):
        value = data.get(attribute)
        if value is not None:
            setattr(address, attribute, value)
    address.save()
    return address
