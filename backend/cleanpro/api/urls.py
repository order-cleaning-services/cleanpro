from django.urls import include, path
from rest_framework import routers

from price.views import PriceViewSet, CleanSetViewSet

from .views import UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('price', PriceViewSet)
router.register('cleanset', CleanSetViewSet)

urlpatterns = [
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),
]
