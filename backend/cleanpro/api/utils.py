import string
from random import randint

from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import serializers, status

from price.models import Service
from service.models import Address, ServicesInOrder
from users.models import User
from django.core import mail

def send_mail(subject: str, message: str, to: tuple[str]) -> None:
    """Отправляет электронное сообщение.
    "backend=None" означает, что бекенд будет выбран согласно указанному
    значению в settings.EMAIL_BACKEND."""
    with mail.get_connection(backend=None, fail_silently=False) as conn:
        mail.EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=to,
            connection=conn
        ).send(fail_silently=False)
    return

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


def user_create(data):
    for attribute in ('email', 'phone', 'first_name'):
        if attribute not in data:
            raise serializers.ValidationError(
                data=(
                    'Заполните все обязательные поля адреса: \n'
                    '"email", "phone", "first_name"'
                ),
                code=status.HTTP_400_BAD_REQUEST,
            )
    user, _ = User.objects.get_or_create(
            email=data.get('email'))
    user.first_name, = data.get('first_name'),
    user.phone, = data.get('phone'),
    user.save()
    password = User.objects.make_random_password(
                # TODO: best practice - избегать магических чисел,
                length=randint(8, 16),
                # INFO: встроенных библиотек Django великое множество.
                #       запоминаем такое профессиональное решение :)
                allowed_chars=string.ascii_lowercase + string.digits,
            )
    user.set_password(password)
    user.save()
    send_mail(
                subject=settings.EMAIL_CONFIRM_SUBJECT,
        message=settings.EMAIL_CONFIRM_TEXT.format(
            username=user.first_name,
            password=user.password,
        ),
        to=(user.email,),
            )
    return user

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
