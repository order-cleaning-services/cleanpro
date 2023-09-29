#!/bin/bash

echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@ waiting for database @@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

while ! pg_isready -h db_cs -p 5432; do
    echo "База данных недоступна, ждем 5 секунд..."
    sleep 5
done

# Disconnect from Postgres client timeout
sleep 5

echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@ preparing migrations @@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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

if ! python manage.py shell -c "from users.models import User; print(User.objects.filter(username='admin').exists())" | grep -q "True"; then
    echo "from users.models import User; \
    admin = User.objects.create_superuser('admin@email.com', 'admin'); \
    admin.username = 'admin'; \
    admin.phone = '+799911122233'; \
    admin.save()" | python manage.py shell
    echo "Создан пользователь 'admin' с паролем 'admin' и адресом электронной почты 'admin@email.com'"
else
    echo "Пользователь 'admin' уже существует"
fi

# TODO: DELETE ON PRODUCTION!
echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@@  import services  @@@@@@@@@@@@@@@@@@@@@@@@@@
echo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

python manage.py csv_services_import

echo "Все сервисы импортированы!"

# echo @@@@@@@@@@@@@@@@@@@@@@@   loading database   @@@@@@@@@@@@@@@@@@@@@@@@
# echo pass...

# Run server
gunicorn --bind 0.0.0.0:8000 cleanpro.wsgi
