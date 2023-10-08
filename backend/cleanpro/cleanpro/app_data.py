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
