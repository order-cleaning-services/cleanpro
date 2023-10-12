"""
Вспомогательные функции приложения Api.
"""

from datetime import date, datetime, time, timedelta
import random
import string

from django.core import mail
from django.db.models import Q, QuerySet

from cleanpro.app_data import DEFAULT_FROM_EMAIL, EMAIL_CODE_LENGTH
from service.models import Order
from users.models import Address, User


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


def get_available_cleaners(
        cleaning_date: date,
        cleaning_time: time,
        total_time: int) -> QuerySet:
    """
    Получает данные об уборке (дата, время, продолжительность) и возвращает
    список пользователей, которые доступны для ее выполнения.
    """
    cleaning_end_time: time = (
        datetime.combine(cleaning_date, cleaning_time) +
        timedelta(minutes=total_time)
    ).time()
    overlapping_orders: QuerySet = Order.objects.filter(
        cleaning_date=cleaning_date,
    ).filter(
        Q(
            cleaning_time__gte=cleaning_time,
            cleaning_time__lt=cleaning_end_time,
        ) |
        Q(
            cleaning_time_end__gt=cleaning_time,
            cleaning_time_end__lte=cleaning_end_time,
        ) |
        Q(
            cleaning_time__lte=cleaning_time,
            cleaning_time_end__gte=cleaning_end_time,
        ) |
        Q(
            cleaning_time__gte=cleaning_time,
            cleaning_time_end__lte=cleaning_end_time,
        )
    )
    all_cleaners: QuerySet = User.objects.filter(
        is_cleaner=True,
    ).filter(
        Q(on_vacation_from__isnull=True) |
        Q(on_vacation_from__gt=cleaning_date) |
        Q(on_vacation_to__lt=cleaning_date)
    )
    busy_cleaners: QuerySet = overlapping_orders.values_list(
        'cleaner',
        flat=True,
    )
    available_cleaners: QuerySet = all_cleaners.exclude(pk__in=busy_cleaners)
    return available_cleaners
