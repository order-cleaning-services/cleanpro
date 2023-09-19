#!/bin/bash

echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@ preparing migrations @@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
sleep 5
python manage.py makemigrations
python manage.py migrate

echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@   collecting static   @@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
python manage.py collectstatic --noinput

# TODO: DELETE ON PRODUCTION!
echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@  creating superuser  @@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
if ! python manage.py shell -c "from users.models import User; User.objects.filter(username='admin').exists()" | grep -q "True"; then
    echo "from users.models import User; \
    admin = User.objects.create_superuser('admin@email.com', 'admin'); \
    admin.username = 'admin'; \
    admin.first_name = 'admin_first'; \
    admin.phone = '+799911122233'; \
    admin.save()" | python manage.py shell
    echo "Создан пользователь 'admin' с паролем 'admin' и адресом электронной почты 'admin@email.com'"
else
    echo "Пользователь 'admin' уже существует"
fi

# echo @@@@@@@@@@@@@@@@@@@@@@@   loading database   @@@@@@@@@@@@@@@@@@@@@@@@
# echo pass...

# Run server
gunicorn --bind 0.0.0.0:8000 cleanpro.wsgi
