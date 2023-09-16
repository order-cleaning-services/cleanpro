# cleanpro

## Как запустить проект локально в контейнерах:

Клонировать репозиторий и перейти в него в командной строке:

``` git clone git@github.com:order-cleaning-services/cleanpro.git -b backend ``` 

``` cd cleanpro/ ``` 

Запустить docker-compose:

```
docker-compose up --build

```

После окончания сборки контейнеров выполнить миграции:

```
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate

```

Загрузить статику:

```
docker compose exec backend python manage.py collectstatic

```

Скопировать статику в вольюм (команда не всегда работает в терминале bash, но точно работает в powershell):

```
docker compose exec backend cp -r /app/static/. /static/
```

Проверить работу проекта возможно по любой из ссылок:

```
http://127.0.0.1/
```

**Документация для Cleanpro будет доступна по любой из ссылок**:

```
http://127.0.0.1/redocs/ 
```

**Содержание файла .env (распологаться он должен в одной папке с файлом manage.py)**

SECRET_KEY='django-insecure-^9iei$9fqe84qic^#hbp+$ymq+1o+h7a9jckpa&n64t)ekt(nt'
CLEANPRO_HOST=cleanpro.com
DB_ENGINE=django.db.backends.postgresql
POSTGRES_PASSWORD=postgres
POSTGRES_USER=cs_user
POSTGRES_DB=cs
DB_HOST=db_cs
DB_PORT=5432

# Email settings
### SMTP-server host.
EMAIL_HOST=smtp.gmail.com
### SMTP-server port.
EMAIL_PORT=587
### SMTP-server username.
EMAIL_HOST_USER=cleanpronew2023@gmail.com
### SMTP-server password.
EMAIL_HOST_PASSWORD=vcdeidvfygmyufsk
### True: use TLS connection (safe) with SMTP-server.
EMAIL_USE_TLS=True
### True: use SSL connection (protected) with SMTP-server.
EMAIL_USE_SSL=False
### If EMAIL_USE_TLS or EMAIL_USE_SSL: optionaly provide a path to sertificates PEM file
EMAIL_SSL_CERTFILE=None
### If EMAIL_USE_TLS or EMAIL_USE_SSL: optionaly provide a path to secret code PEM file
EMAIL_SSL_KEYFILE=ssl_keyfile
### Operation block timeout (sec)
EMAIL_TIMEOUT=60

**Создание суперпользователя**

После запуска в контейнерах переходим по ссылке http://127.0.0.1/api/users/

Создаем пользователя и потом нужно его сделать супер пользователем для чего нужно провалиться в базу данных.

Для этого в терминале в папке с docker файлом последовательно выполняем следующие команды:

docker compose exec -it db_cs psql -U cs_user -d cs

Потом уже в самой базе данных:

update users_user set is_superuser=True;

update users_user set is_staff=True;

Проверить что все данные изменились можно:

select * from users_user;

Потом можно зайти в админку http://127.0.0.1/admin/

Войти с логином и паролем созданного пользователя и там создать услуги и все остальное.
