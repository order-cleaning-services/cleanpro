# Cleanpro

___

## Запуск проекта локально в контейнерах

Клонировать репозиторий и перейти в него в командной строке

```
git clone git@github.com:order-cleaning-services/cleanpro.git -b develop
```

Перейти в папку с backend проекта

```
cd cleanpro/backend/cleanpro
```

Создать файл переменных окружения из примера

```
cp .env.example .env
```

Изменить переменные окружения (если необходимо)
```
(на примере редактора Nano)
nano .env
```

Перейти в корневую папку проекта
```
cd ../..
```

Запустить Docker проект

```
docker-compose up --build
```

## Работа с сайтом

По умолчанию проект доступен на localhost:80

```
http://localhost/
```

Документация проекта доступна по URL

```
http://localhost/redocs/ 
```
