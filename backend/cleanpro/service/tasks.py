"""
Список задач для Celery.
"""

from datetime import datetime, timedelta
import requests

from bs4 import BeautifulSoup, ResultSet
from bs4.element import Tag, ResultSet
from celery import shared_task
from django.core.exceptions import ValidationError
from django.db.models import QuerySet
from rest_framework import status


from service.models import RatingViaMaps

CLEANPRO_YA_MAPS_URL: str = (
    'https://yandex.ru/maps-reviews-widget/106240454928?comments'
)


@shared_task
def parse_yandex_maps():
    response: requests = requests.get(CLEANPRO_YA_MAPS_URL)
    if not response.status_code == status.HTTP_200_OK:
        raise Exception('Указан неверный URL отзыва.')
    soup: BeautifulSoup = BeautifulSoup(response.text, features="html.parser")
    if not soup:
        raise Exception('Отзывы отсутствуют.')
    all_comment_elements: ResultSet = soup.find_all('div', class_='comment')
    all_comments: QuerySet = RatingViaMaps.objects.all()
    new_comments: list[RatingViaMaps] = []
    for comment in all_comment_elements:
        text: str = comment.find('p', class_='comment__text').text.strip()
        if all_comments.filter(text=text).exists():
            break
        username: str = comment.find('p', class_='comment__name').text.strip()
        stars_ul: Tag = comment.find('ul', class_='stars-list')
        stars: ResultSet = stars_ul.find_all('li', class_='stars-list__star')
        full_stars: list[Tag] = [
            star for star in stars if
            '_empty' not in star.get('class') and
            '_half' not in star.get('class')
        ]
        try:
            new_comments.append(
                RatingViaMaps(
                    username=username,
                    # INFO: на картах просто указывается что-то вроде
                    #       "1 января" без указания года. Чтобы не
                    #       усложнять логику - данная задача запускается
                    #       разв сутки в 00:00 (UTC+3) и записывает
                    #       "вчерашние" отзывы.
                    pub_date=datetime.now() - timedelta(days=1),
                    text=text,
                    score=len(full_stars),
                )
            )
        except ValidationError:
            continue
    if new_comments:
        RatingViaMaps.objects.bulk_create(new_comments)
    return
