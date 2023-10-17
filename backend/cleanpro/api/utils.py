"""
Вспомогательные функции приложения Api.
"""

from datetime import date, datetime, time, timedelta
import random
import string

from django.core import mail
from django.db.models import Q, QuerySet

from cleanpro.app_data import (
    schedule_generate_bool,
    DEFAULT_FROM_EMAIL, EMAIL_CODE_LENGTH,
    SCHEDULE_WORK_START_H, SCHEDULE_WORK_STOP_H,
)
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
        total_time: int,
        order_set: QuerySet = None,
        cleaning_end_time: time = None) -> QuerySet:
    """
    Получает данные об уборке (дата, время, продолжительность) и возвращает
    список пользователей, которые доступны для ее выполнения.
    """
    if cleaning_end_time is None:
        cleaning_end_time: time = (
            datetime.combine(cleaning_date, cleaning_time) +
            timedelta(minutes=total_time)
        ).time()
    if order_set is None:
        order_set: QuerySet = Order.objects.filter(cleaning_date=cleaning_date)
    overlapping_orders: QuerySet = order_set.filter(
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


def get_available_time_json(cleaning_date: date, total_time: int) -> dict:
    """
    Возвращает словарь, где для каждого времени кратного 30 минутам
    указана возможность бронирования заказа с указанной продолжительностью
    в казанный день. Если указано True - заказ возможно оформить,
    Если указано False - заказ оформить нельзя.

    Формат ответа: {"00:00": False, "00:30": False, ... "23:30": False}
    """
    response_data: dict[str, bool] = schedule_generate_bool(value=False)
    order_set: QuerySet = Order.objects.filter(cleaning_date=cleaning_date)
    if cleaning_date < date.today():
        return response_data
    for current_time in response_data:
        hour: int = int(current_time[:2])
        if hour < SCHEDULE_WORK_START_H:
            continue
        minute: int = int(current_time[-2:])
        cleaning_time = time(hour=hour, minute=minute)
        cleaning_end_time: time = (
            datetime.combine(cleaning_date, cleaning_time) +
            timedelta(minutes=total_time)
        ).time()
        # TODO: сделать через datetime.
        if cleaning_end_time.hour > SCHEDULE_WORK_STOP_H:
            break
        available_cleaners: QuerySet = get_available_cleaners(
            cleaning_date=cleaning_date,
            cleaning_time=cleaning_time,
            total_time=total_time,
            order_set=order_set,
            cleaning_end_time=cleaning_end_time,
        )
        if available_cleaners.exists():
            response_data[current_time] = True
    return response_data
