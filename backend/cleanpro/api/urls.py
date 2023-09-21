from django.urls import include, path
from rest_framework import routers

from .views import (
    CleaningTypeViewSet, OrderViewSet, RatingViewSet,
    ServiceViewSet, UserViewSet,
    confirm_mail, order_create,
)

app_name = 'api'

router = routers.DefaultRouter()
ROUTER_DATA = (
    ('orders', OrderViewSet,),
    # TODO: два рейтинга. Зачем? Достаточно в OrderViewSet сделать @action.
    ('ratings', RatingViewSet,),
    (r'^orders/(?P<order_id>\d+)/rating', RatingViewSet),
    ('services', ServiceViewSet),
    ('types', CleaningTypeViewSet,),
    ('users', UserViewSet,),
)
for api_path in ROUTER_DATA:
    router.register(*api_path)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.authtoken')),
    path('order_create/', order_create, name='order_create'),
    path('confirm_mail/', confirm_mail, name='confirm_mail'),
]
