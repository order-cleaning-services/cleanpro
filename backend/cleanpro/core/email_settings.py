import os

from dotenv import load_dotenv

from cleanpro.settings import DEFAULT_FROM_EMAIL, BASE_DIR

load_dotenv(os.path.join(BASE_DIR, '.env'), verbose=True)


# Email message api/views.py
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


# Email backend data settings.py
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

DEFAULT_FROM_EMAIL: str = 'cleanpronew2023@gmail.com'
