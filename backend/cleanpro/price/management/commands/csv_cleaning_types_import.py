import csv
from typing import Optional

from django.core.management.base import BaseCommand, CommandError
from django.db.models import QuerySet

from price.models import CleaningType, Service, ServicesInCleaningType


import_path: str = 'price/management/commands/csv_import/cleaning_types/'

cleaning_types_data: list[CleaningType] = []
cleaning_types_titles: list[str] = list(
    [title[0] for title in CleaningType.objects.values_list('title')]
)
services: QuerySet = Service.objects.all()
services_dict = {service.title: service for service in services}


class ServicesIsEmptyException(Exception):
    """Ошибка отсутствия в базе данных объектов модели Services."""
    def __init__(self, message='No single Service object exists. Skip task.'):
        super().__init__(message)


def check_if_services_exists() -> None:
    """вызывает ServicesIsEmptyException, если не существует
    ни одного объекта модели Services. Иначе - возвращает None."""
    if not services.exists():
        raise ServicesIsEmptyException
    return None


def create_services_in_cleaning_types(
        cleaning_type: CleaningType,
        services_titles: list[str]
        ) -> Optional[list[str]]: # noqa E126
    """Создает объекты модели ServicesInCleaningType.
    Возвращает None в случае успеха (нет отсутствующих сервисов).
    Возвращает список наименований сервисов в случае,
    если они отсутствуют в базе данных."""
    services_in_cleaning_types: list[ServicesInCleaningType] = []
    broken_services: list[str] = []
    for title in services_titles:
        service: Service = services_dict.get(title)
        if service:
            services_in_cleaning_types.append(
                ServicesInCleaningType(
                    cleaning_type=cleaning_type,
                    service=service,
                )
            )
        else:
            broken_services.append(title)
    if broken_services:
        return broken_services
    ServicesInCleaningType.objects.bulk_create(services_in_cleaning_types)
    return None


def get_cleaning_type_data(
        data: dict
        ) -> Optional[tuple[str, float, str, list[str]]]:  # noqa E126
    """Проверяет наличие необходимых данных для создания объекта модели
    CleaningType приводит их нужным Python типам и возвращает в следующем
    порядке: title, coefficient, type, services_titles.
    Не возвращает ничего, если данные отсутствуют или объект модели
    CleaningType с заданным полем title уже существует."""
    title: str = data.get('title')
    if not title or title in cleaning_types_titles:
        return
    coefficient: str = data.get('coefficient')
    type: str = data.get('type')
    services_titles: str = data.get('services')
    if not all((coefficient, type, services_titles)):
        return None
    return title, float(coefficient), type, services_titles.split('/')


def create_cleaning_type_object(data: dict) -> Optional[CleaningType]:
    """Создает и возвращает объект модели CleaningType в случае сообщения
    валидных данных данных. Иначе - возвращает None"""
    title, coefficient, type_, services_titles = (
        get_cleaning_type_data(data=data)
    )
    # TODO: посмотреть за безопасностью создания объектов в БД
    cleaning_type: CleaningType = CleaningType.objects.create(
        title=title,
        coefficient=coefficient,
        type=type_,
    )
    broken_services = create_services_in_cleaning_types(
        cleaning_type=cleaning_type,
        services_titles=services_titles,
    )
    if broken_services:
        cleaning_type.delete()
        # TODO: подключить логгер.
        print(
            f'Can not create "{title}" because some services does not exists:'
            f'{", ".join(broken_services)}'
        )
    return None


def read_csv(full_path: str) -> csv.DictReader:
    """Возвращает содержимое файла, указанное в full_path.
    Если файл не существует - вызывает FileNotFoundError."""
    # TODO подумать над закрытием файла. Выдает ошибку последующего чтения.
    return csv.DictReader(open(full_path, encoding='utf-8'), delimiter=';')


class Command(BaseCommand):
    help = 'Loading cleaning types from csv.'

    def handle(self, *args: any, **options: any):
        file_path: str = f'{import_path}cleaning_types.csv'
        try:
            check_if_services_exists()
            csv_file: csv.DictReader = read_csv(full_path=file_path)
            for row in csv_file:
                create_cleaning_type_object(data=row)
        except FileNotFoundError:
            print(f'File "{file_path}" is not provided. Skip task.')
        except ServicesIsEmptyException as err:
            print(err)
        except Exception as err:
            raise CommandError(f'Exception has occurred: {err}')
