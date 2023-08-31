from django.urls import include, path
from rest_framework import routers

from .views import UserViewSet, OrderViewSet, RatingViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('orders', OrderViewSet)
router.register(
    r'^orders/(?P<order_id>\d+)/rating',
    RatingViewSet,
    basename='rating')

urlpatterns = [
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),
]
