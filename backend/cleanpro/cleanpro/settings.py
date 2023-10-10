from datetime import timedelta
import os

from celery.schedules import crontab
from corsheaders.defaults import default_headers

<<<<<<< Updated upstream
from .app_data import (
    BASE_DIR,

    DEFAULT_FROM_EMAIL,
    
    DB_ENGINE, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER,
)

"""App settings."""

=======
<<<<<<< HEAD
from core.email_settings import DEFAULT_FROM_EMAIL
from core.date_settings import (
    LANGUAGE_CODE, TIME_ZONE, USE_I18N, USE_TZ
)
from core.user_settings import (
    USER, ADMIN, ADDITIONAL_CS
)

BASE_DIR = Path(__file__).resolve().parent.parent
=======
from .app_data import (
    BASE_DIR,
>>>>>>> develop

    DEFAULT_FROM_EMAIL,
    
    DB_ENGINE, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER,
)

"""App settings."""

>>>>>>> Stashed changes

DEBUG = True

CLEANPRO_HOST = os.getenv('HOST_YANDEX_MAPS', None)

CLEANPRO_YA_MAPS_ID = os.getenv('HOST_YANDEX_MAPS', None)


"""Celery settings."""


CELERY_TIMEZONE = 'Europe/Moscow'

CELERY_BEAT_SCHEDULE = {
    'parse_yandex_maps': {
        'task': 'service.tasks.parse_yandex_maps',
        'schedule': (
            timedelta(minutes=5) if DEBUG else
            crontab(minute=1, hour=0)
        ),
    },
}

CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60

CELERY_BROKER_URL = 'redis://redis:6379/0'
CELERY_RESULT_BACKEND = 'redis://redis:6379/0'


"""Django settings."""


DATABASES = {
    'default': {
        'ENGINE': DB_ENGINE,
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': DB_HOST,
        'PORT': DB_PORT,
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'rest_framework.authtoken',
    'djoser',
    'django_password_validators',
    'django_filters',
    'phonenumber_field',
    'drf_yasg',
    'api',
    'service',
<<<<<<< Updated upstream
    'users',
=======
<<<<<<< HEAD
    'core',
    'drf_yasg',
    'price.apps.PriceConfig',
=======
    'users',
>>>>>>> develop
>>>>>>> Stashed changes
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

ROOT_URLCONF = 'cleanpro.urls'

WSGI_APPLICATION = 'cleanpro.wsgi.application'


"""Email settings."""


DEFAULT_FROM_EMAIL = DEFAULT_FROM_EMAIL

EMAIL_BACKEND = (
    'django.core.mail.backends.console.EmailBackend' if DEBUG else
    'django.core.mail.backends.smtp.EmailBackend')

EMAIL_HOST: str = os.getenv('EMAIL_HOST')

EMAIL_PORT: int = int(os.getenv('EMAIL_PORT'))

EMAIL_HOST_USER: str = os.getenv('EMAIL_HOST_USER')

EMAIL_HOST_PASSWORD: str = os.getenv('EMAIL_HOST_PASSWORD')

EMAIL_USE_TLS: bool = bool(os.getenv('EMAIL_USE_TLS'))

EMAIL_USE_SSL: bool = bool(os.getenv('EMAIL_USE_SSL'))

EMAIL_SSL_CERTFILE: str = os.getenv('EMAIL_SSL_CERTFILE')

EMAIL_SSL_KEYFILE: str = os.getenv('EMAIL_SSL_KEYFILE')

EMAIL_TIMEOUT: int = int(os.getenv('EMAIL_TIMEOUT'))


"""Static files settings."""


MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

MEDIA_URL = 'media/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATIC_URL = 'static/'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


<<<<<<< Updated upstream
"""Models data."""


ADDITIONAL_CS = 'additional'

ADMIN = 'admin'

ACCOUNT_EMAIL_REQUIRED = True

ACCOUNT_USER_MODEL_USERNAME_FIELD = None

ACCOUNT_USERNAME_REQUIRED = False

AUTH_USER_MODEL = 'users.User'

USER = 'user'


"""Regional settings."""


LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


"""Security settings."""

=======
<<<<<<< HEAD
# DATABASES = {
#     'default': {
#         'ENGINE': os.getenv('DB_ENGINE'),
#         'NAME': os.getenv('POSTGRES_DB'),
#         'USER': os.getenv('POSTGRES_USER'),
#         'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
#         'HOST': os.getenv('DB_HOST'),
#         'PORT': os.getenv('DB_PORT'),
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
}
=======
"""Models data."""


ADDITIONAL_CS = 'additional'

ADMIN = 'admin'

ACCOUNT_EMAIL_REQUIRED = True

ACCOUNT_USER_MODEL_USERNAME_FIELD = None

ACCOUNT_USERNAME_REQUIRED = False

AUTH_USER_MODEL = 'users.User'

USER = 'user'


"""Regional settings."""


LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


"""Security settings."""

>>>>>>> develop
>>>>>>> Stashed changes

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.MinimumLengthValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.CommonPasswordValidator'
        ),
    },
    {
        'NAME': (
            'django.contrib.auth.password_validation.NumericPasswordValidator'
        ),
    },
    {
        'NAME': 'django_password_validators.password_character_requirements.password_validation.PasswordCharacterValidator'
    },
]

<<<<<<< Updated upstream
# TODO архинебезопасно! Для прода вписать допустимые данные. Лучше через
# переменные окружения, чтобы скрыть их от злоумышленников.
ALLOWED_HOSTS = ['*']
=======
<<<<<<< HEAD
"""Time zone"""
>>>>>>> Stashed changes

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    *default_headers,
    "access-control-allow-credentials",
]

<<<<<<< Updated upstream
=======
USE_I18N = USE_I18N

USE_TZ = USE_TZ

"""Media settings"""

STATIC_URL = 'static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = 'media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users.User'

"""Account settings"""

ACCOUNT_USER_MODEL_USERNAME_FIELD = None

ACCOUNT_USERNAME_REQUIRED = False

ACCOUNT_EMAIL_REQUIRED = True

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

DJOSER = {
    'PERMISSIONS': {
        'user_list': ['rest_framework.permissions.IsAdminUser'],
    }
}

USER = USER

ADMIN = ADMIN

ADDITIONAL_CS = ADDITIONAL_CS

DEFAULT_FROM_EMAIL = DEFAULT_FROM_EMAIL
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# TODO: это для фронтов, чтобы в локальной сети был доступ к бэку.
=======
# TODO архинебезопасно! Для прода вписать допустимые данные. Лучше через
# переменные окружения, чтобы скрыть их от злоумышленников.
ALLOWED_HOSTS = ['*']

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    *default_headers,
    "access-control-allow-credentials",
]

>>>>>>> develop
>>>>>>> Stashed changes
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1',
]

DJOSER = {
    'SERIALIZERS': {
        'user': 'api.serializers.CustomUserSerializer',
    }
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

<<<<<<< Updated upstream
SECRET_KEY = os.getenv('SECRET_KEY')
=======
<<<<<<< HEAD
"""Email backend data"""

EMAIL_HOST: str = os.getenv('EMAIL_HOST')
EMAIL_PORT: int = int(os.getenv('EMAIL_PORT'))
EMAIL_HOST_USER: str = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD: str = os.getenv('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS: bool = bool(os.getenv('EMAIL_USE_TLS'))
EMAIL_USE_SSL: bool = bool(os.getenv('EMAIL_USE_SSL'))
EMAIL_SSL_CERTFILE: str = os.getenv('EMAIL_SSL_CERTFILE')
# TODO: проверить SSL_KEYFILE
EMAIL_SSL_KEYFILE: str = os.getenv('EMAIL_SSL_KEYFILE')
EMAIL_TIMEOUT: int = int(os.getenv('EMAIL_TIMEOUT'))

# TODO: при выключении DEBUG будет ошибка, так как SMTP у нас не арендован
# и не подключен.
EMAIL_BACKEND = (
    'django.core.mail.backends.console.EmailBackend' if DEBUG else
    'django.core.mail.backends.smtp.EmailBackend')
=======
SECRET_KEY = os.getenv('SECRET_KEY')
>>>>>>> develop
>>>>>>> Stashed changes
