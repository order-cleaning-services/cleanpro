from django.urls import include, path
from rest_framework import routers

from .views import (
    CleaningTypeViewSet,
    MeasureViewSet,
    OrderViewSet,
    RatingViewSet,
    ServiceViewSet,
    UserViewSet,
    confirm_mail,
)

app_name = 'api'

router = routers.DefaultRouter()
ROUTER_DATA = (
    ('measure', MeasureViewSet,),
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
    path('confirm_mail/', confirm_mail, name='confirm_mail'),
]
