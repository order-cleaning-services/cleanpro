"""
Команда для создания кеширования объектов модели Rating.

Вызов команды осуществляется из папки с manage.py файлом:
python manage.ru init_reviews_cache
"""

from django.core.management.base import BaseCommand, CommandError

from service.signals import update_cached_reviews


class Command(BaseCommand):
    help = 'Loading services from csv.'

    def handle(self, *args: any, **options: any):
        try:
            update_cached_reviews()
        except Exception as err:
            raise CommandError(f'Exception has occurred: {err}')
        return
