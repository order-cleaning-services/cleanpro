from django.core.exceptions import ValidationError
# Хотелось бы узнать, почему функция импортирована с именем "_"
# Нижнее подчеркивание не используют обычно в таких случаях. Вот хорошая
# статья по теме:
# https://pythonist.ru/zachem-nuzhno-nizhnee-podcherkivanie-v-python/#:~:text=%D0%9D%D0%B8%D0%B6%D0%BD%D0%B5%D0%B5%20%D0%BF%D0%BE%D0%B4%D1%87%D0%B5%D1%80%D0%BA%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20(%20_%20)%20%D1%82%D0%B0%D0%BA%D0%B6%D0%B5%20%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82%D1%81%D1%8F,%D0%BF%D1%80%D0%B8%D1%81%D0%B2%D0%BE%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B9%20%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9%20%D0%BF%D0%BE%D0%B4%D1%87%D0%B5%D1%80%D0%BA%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F.
from django.utils.translation import gettext as _


# Он нигде не используется.
class MaximumLengthValidator:
    def __init__(self, max_length=16):
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
