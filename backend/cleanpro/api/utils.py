"""
Вспомогательные функции приложения Api.
"""
import random
import string

from django.core import mail

from cleanpro.app_data import DEFAULT_FROM_EMAIL, EMAIL_CODE_LENGTH
from users.models import Address


def generate_code():
    """Генерирует случайный цифро-символьный код."""
    return ''.join(
        random.choices(
            string.ascii_uppercase + string.digits,
            k=EMAIL_CODE_LENGTH
        )
    )


def get_or_create_address(address_data) -> Address:
    """Получить или создать объект адреса."""
    address, _ = Address.objects.get_or_create(
        city=address_data.get('city'),
        street=address_data.get('street'),
        house=address_data.get('house'),
        entrance=address_data.get('entrance'),
        floor=address_data.get('floor'),
        apartment=address_data.get('apartment'),
    )
    return address


def send_mail(subject: str, message: str, to: tuple[str]) -> None:
    """
    Отправляет электронное сообщение списку пользователей в to.
    Назначает subject темой письма и message текстом.

    "backend=None" означает, что бекенд будет выбран согласно указанному
    значению в settings.EMAIL_BACKEND.
    """
    with mail.get_connection(backend=None, fail_silently=False) as conn:
        mail.EmailMessage(
            subject=subject,
            body=message,
            from_email=DEFAULT_FROM_EMAIL,
            to=to,
            connection=conn
        ).send(fail_silently=False)
    return
