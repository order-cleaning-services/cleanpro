from django.urls import include, path
from rest_framework import routers

from .views import (UserViewSet, OrderViewSet,
                    RatingViewSet, order_create, confirm_mail)

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('orders', OrderViewSet)
router.register('ratings', RatingViewSet)
router.register(
    r'^orders/(?P<order_id>\d+)/rating',
    RatingViewSet,
    basename='rating')

urlpatterns = [
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),
    path('order_create/', order_create, name='order_create'),
    path('confirm_mail/', confirm_mail, name='confirm_mail'),
]
