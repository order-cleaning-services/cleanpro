# cleanpro

## Как запустить проект локально в контейнерах:

Клонировать репозиторий и перейти в него в командной строке:

``` git@github.com:order-cleaning-services/cleanpro.git ``` 

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

Остальное можно взять из файла .env.example