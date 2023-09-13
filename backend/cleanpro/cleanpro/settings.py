import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(os.path.join(BASE_DIR, '.env'), verbose=True)

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    'django_password_validators',
    'django_filters',
    'phonenumber_field',
    'users',
    'api',
    'service',
    'drf_yasg',
]

MIDDLEWARE = [
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
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': BASE_DIR / 'db.sqlite3',
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
        'NAME': 'users.validators.MaximumLengthValidator',
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

DEFAULT_FROM_EMAIL = 'cleanpro@admin.com'


# TODO: адекватно разделить код на смысловые блоки. Частично вынести в core.
# Допускается не делать core, а складировать пока все здесь. Но навести порядок.
"""Email backend data"""

# TODO: заменить на реальный серверный
# TODO: вынести в .env и .env.example файлы 
EMAIL_HOST: str = 'localhost'  # Хост SMTP-сервера.
EMAIL_PORT: str = '8000'  # Порт SMTP-сервера.
EMAIL_HOST_USER: str = 'user'  # Имя пользователя SMTP-сервера.
EMAIL_HOST_PASSWORD: str = 'pass'  # Пароль пользователя SMTP-сервера.
EMAIL_USE_TLS: bool = False  # Использовать ли TLS (безопасное) соединение при общении с SMTP-сервером
EMAIL_USE_SSL: str = False  # Использовать ли неявное TLS (защищенное) соединение при общении с SMTP-сервером
EMAIL_SSL_CERTFILE: str = None  # Если EMAIL_USE_SSL или EMAIL_USE_TLS - True, вы можете опционально указать путь к файлу цепочки сертификатов в формате PEM
EMAIL_SSL_KEYFILE: str = 'ssl_keyfile'  # Если EMAIL_USE_SSL или EMAIL_USE_TLS - True, вы можете опционально указать путь к файлу закрытого ключа в формате PEM
EMAIL_TIMEOUT: str = 60  # Указывает тайм-аут в секундах для блокировки операций, таких как попытка соединения

# TODO: при выключении DEBUG будет ошибка, так как SMTP у нас не арендован
# и не подключен.
EMAIL_BACKEND = (
    'django.core.mail.backends.console.EmailBackend' if DEBUG else
    'django.core.mail.backends.smtp.EmailBackend')
