from django.urls import include, path
from rest_framework import routers

from .views import (
    CleaningTypeViewSet,
    OrderViewSet,
    RatingViewSet,
    ServiceViewSet,
    UserViewSet,
)

app_name = 'api'

router = routers.DefaultRouter()
ROUTER_DATA = (
    ('orders', OrderViewSet,),
    ('ratings', RatingViewSet,),
    ('services', ServiceViewSet),
    ('types', CleaningTypeViewSet,),
    ('users', UserViewSet,),
)
for api_path in ROUTER_DATA:
    router.register(*api_path)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.authtoken')),
]
