import os
from pathlib import Path

from dotenv import load_dotenv
from corsheaders.defaults import default_headers

from core.email_settings import (
    EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD,
    EMAIL_USE_TLS, EMAIL_USE_SSL, EMAIL_SSL_CERTFILE, EMAIL_SSL_KEYFILE,
    EMAIL_TIMEOUT, DEFAULT_FROM_EMAIL
)
from core.date_settings import (
    LANGUAGE_CODE, TIME_ZONE, USE_I18N, USE_TZ
)
from core.user_settings import (
    USER, ADMIN, ADDITIONAL_CS
)

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(os.path.join(BASE_DIR, '.env'), verbose=True)

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

# TODO архинебезопасно! Для прода вписать допустимые данные. Лучше через
# переменные окружения, чтобы скрыть их от злоумышленников.
ALLOWED_HOSTS = ['*']

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
    'users',
    'api',
    'service',
    'core',
    'drf_yasg',
    'price.apps.PriceConfig',
]

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

ROOT_URLCONF = 'cleanpro.urls'

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

WSGI_APPLICATION = 'cleanpro.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_ENGINE'),
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
    }
}

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

"""Time zone"""

LANGUAGE_CODE = LANGUAGE_CODE

TIME_ZONE = TIME_ZONE

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

USER = USER

ADMIN = ADMIN

ADDITIONAL_CS = ADDITIONAL_CS

DEFAULT_FROM_EMAIL = DEFAULT_FROM_EMAIL
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# TODO: это для фронтов, чтобы в локальной сети был доступ к бэку.
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1',
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = (
    *default_headers,
    "access-control-allow-credentials",
)

"""Email backend data"""

EMAIL_HOST = EMAIL_HOST
EMAIL_PORT = EMAIL_PORT
EMAIL_HOST_USER = EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = EMAIL_HOST_PASSWORD
EMAIL_USE_TLS = EMAIL_USE_TLS
EMAIL_USE_SSL = EMAIL_USE_SSL
EMAIL_SSL_CERTFILE = EMAIL_SSL_CERTFILE
# TODO: проверить SSL_KEYFILE
EMAIL_SSL_KEYFILE = EMAIL_SSL_KEYFILE
EMAIL_TIMEOUT = EMAIL_TIMEOUT

# TODO: при выключении DEBUG будет ошибка, так как SMTP у нас не арендован
# и не подключен.
EMAIL_BACKEND = (
    'django.core.mail.backends.console.EmailBackend' if DEBUG else
    'django.core.mail.backends.smtp.EmailBackend')
