import os
from pathlib import Path

from dotenv import load_dotenv
from corsheaders.defaults import default_headers

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

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = 'media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users.User'

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

USER = 'user'

ADMIN = 'admin'

ADDITIONAL_CS = 'additional'

DEFAULT_FROM_EMAIL = 'cleanpronew2023@gmail.com'
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

# TODO: адекватно разделить код на смысловые блоки. Частично вынести в core.
# Допускается не делать core, а складировать все здесь. Но навести порядок.
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