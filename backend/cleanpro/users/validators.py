import re
from django.core.exceptions import ValidationError
from django.utils.translation import gettext

USERNAME_PATTERN: str = r'^[0-9A-Za-z]{5,30}$'
NAME_REGEXP: str = r'^[^ -][А-ЯЁа-яё\-\s]{3,30}$'
EMAIL_PATTERN: str = r'^(?!\.)[0-9A-Za-z\.]{5,50}@[a-zA-z]+\.[a-zA-z]+$'
PASS_PATTERN: str = (
    r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!_@#$%^&+=]).{5,50}$'
)


def validate_password(value):
    """Производит валидацию поля модели для пароля."""
    if re.fullmatch(PASS_PATTERN, value):
        return value
    raise ValidationError(
        gettext(
            'Введите пароль, который удовлетворяет критериям:\n'
            '    - длина от 5 до 50 символов;\n'
            '    - включает хотя бы одну цифру (0-9);\n'
            '    - включает хотя бы одну прописную букву (a-z);\n'
            '    - включает хотя бы одну заглавную букву (A-Z);\n'
            '    - включает хотя бы один специальный символ (!_@#$%^&+=).'
        )
    )


def validate_username(value):
    """Производит валидацию поля модели для имени пользователя."""
    if re.fullmatch(USERNAME_PATTERN, value):
        return value
    raise ValidationError(
        gettext(
            'Введите имя пользователя, которое удовлетворяет критериям:\n'
            '    - длина от 5 до 50 символов;\n'
            '    - включает только цифры (0-9) или буквы (a-z)(A-Z).'
        )
    )


def validate_name(value):
    """Производит валидацию поля модели для имени."""
    if re.fullmatch(NAME_REGEXP, value):
        return value
    raise ValidationError(
        gettext(
            'Укажите корректное имя '
            '(например: Апполинарий Вальдемарович фон Спасо-Преображенский'
        )
    )


def validate_email(value):
    """Производит валидацию поля модели для почты."""
    if re.fullmatch(EMAIL_PATTERN, value):
        return value
    raise ValidationError(
        gettext('Введите корректный email (например: example@example.ru')
    )
