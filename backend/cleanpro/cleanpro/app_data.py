import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(os.path.join(BASE_DIR, '.env'), verbose=True)


"""Company data."""


CLEANPRO_HOST = os.getenv('CLEANPRO_HOST')

CLEANPRO_YA_MAPS_ID: str = os.getenv('CLEANPRO_YA_MAPS_ID')

CLEANPRO_YA_MAPS_URL: str = (
    f'https://yandex.ru/maps-reviews-widget/{CLEANPRO_YA_MAPS_ID}?comments'
)


"""Database settings."""


DB_ENGINE = os.getenv('DB_ENGINE')
DB_USER = os.getenv('POSTGRES_USER')
DB_PASSWORD = os.getenv('POSTGRES_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('POSTGRES_DB')


"""Models data."""


ORDER_CANCELLED_STATUS: str = 'cancelled'


"""Email data."""


DEFAULT_FROM_EMAIL: str = 'cleanpronew2023@gmail.com'

PASSWORD_RESET_LINK: str = None

EMAIL_CONFIRM_SUBJECT: str = 'Welcome to CleanPro!'

EMAIL_CONFIRM_TEXT: str = (
    'Dear {username},\n'
    '\n'
    'Welcome to CleanPro! We are thrilled to have you as part '
    'of our community.\n'
    '\n'
    'You have successfully confirmed your email, and now you have '
    'full access to your account.\n'
    '\n'
    'Below, you will find your account details:\n'
    '\n'
    'Username: {username}\n'
    'Password: {password}\n'
    '\n'
    'Please keep this information in a secure place. '
    'If you ever forget your password, you can reset it by following this '
    f'link: {PASSWORD_RESET_LINK}''\n'
    '\n'
    'If you have any questions or need further assistance, do not hesitate '
    f'to reach out to us at {DEFAULT_FROM_EMAIL}.''\n'
    '\n'
    'Thank you for choosing CleanPro! We hope you enjoy your time with us '
    'and wish you a pleasant experience.\n'
    '\n'
    'Best regards,\n'
    'The CleanPro Team'
)
