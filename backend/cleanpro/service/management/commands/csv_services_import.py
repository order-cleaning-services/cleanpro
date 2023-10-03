import csv
from typing import Any

from django.core.files import File
from django.core.management.base import BaseCommand, CommandError

from price.models import Measure
from service.models import Service

import_path: str = 'service/management/commands/csv_import/services/'
import_img_path: str = 'service/management/commands/csv_import/services/res/'

# measure_units: list[str] = list(Measure.objects.all().values_list('title'))
services_data: list[Service] = []
services_titles: list[str] = list(
    [title[0] for title in Service.objects.values_list('title')]
)


def return_service_object(data: dict) -> Service:
    title: str = data.get('title')
    measure = data.get('measure')
    if title in services_titles or measure is None:
        return None
    # TODO: подумать, как это сделать оптимально для БД.
    measure, _ = Measure.objects.get_or_create(title=measure)
    service: Service = Service(
        title=title,
        price=float(data.get('price')),
        measure=measure,
        service_type = data.get('service_type'),
        cleaning_time = data.get('cleaning_time'),
    )
    file_name: str = f'{import_img_path}{title}.jpg'
    try:
        image: File = File(open(file_name, 'rb'))
        service.image.save(file_name, image, save=False)
    except FileNotFoundError:
        pass
    services_titles.append(title)
    return service

# TODO: Добавить создание наборов услуг в БД.

class Command(BaseCommand):
    help = 'Loading services from csv.'

    def handle(self, *args: Any, **options: Any):
        try:
            csv_file: csv.DictReader = csv.DictReader(
                open(f'{import_path}services.csv', 'r', encoding='utf-8'),
                delimiter=';',
            )
            for row in csv_file:
                service_to_add: Service = return_service_object(row)
                if isinstance(service_to_add, Service):
                    services_data.append(service_to_add)
            Service.objects.bulk_create(services_data)
        except FileNotFoundError:
            print('File services.csv is not provided. Skip task.')
        except Exception as err:
            raise CommandError(f'Exception has occurred: {err}')
