import re
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


class MaximumLengthValidator:
    def __init__(self, max_length=15):
        self.max_length = max_length

    def validate(self, password, user=None):
        if len(password) > self.max_length:
            raise ValidationError(
                _(f'Длина пароля больше {self.max_length} символов.'),
                code='password_too_long',
                params={'max_length': self.max_length},
            )

    def get_help_text(self):
        return _(f'Ваш пароль не должен превышать {self.max_length} символов.')


def validate_password(value):
    min_length = 8
    password_regex = r'^(?=.*[a-z])(?=.*[A-Z])' \
                     r'(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'

    if len(value) < min_length:
        raise ValidationError(
            _(f'Длина пароля меньше {min_length} символов.'),
            params={'mIN_length': min_length},
        )

    if not re.match(password_regex, value):
        raise ValidationError(
            _('Пароль должен включать в себя минимум заглавную и прописную'
              'букву, специальный символ (@$!%*?&) и цифру.'),
        )
    return value


def validate_name(value):
    sum = len(value)
    min_lenght = 2
    name_regex = r'([А-ЯЁ][а-яё]+[\-\s]?){3,}'

    if min_lenght > sum:
        raise ValidationError(
            _(f'Имя не может быть меньше {min_lenght} символов.'),
        )

    if not re.match(name_regex, value):
        raise ValidationError(
            _("Укажите ваше имя. Пример: Апполинарий "
              "Вальдемарович фон Спасо-Преображенский"),
        )


def validate_email(value):
    sum = len(value)
    min_lenght = 5
    email_regex = r'^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$'

    if min_lenght > sum:
        raise ValidationError(
            _(f'Email не может быть меньше {min_lenght} символов.'),
        )

    if not re.match(email_regex, value):
        raise ValidationError(
            _('Введите Email. Пример: example@example.ru'),
        )
