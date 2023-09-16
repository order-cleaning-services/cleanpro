from django.urls import include, path
from rest_framework import routers

from .views import (
    UserViewSet, OrderViewSet, RatingViewSet,
    order_create, confirm_mail, CleaningTypeViewSet,
    ServiceViewSet)

app_name = 'api'

router = routers.DefaultRouter()
# TODO: нарушается DRY
router.register('users', UserViewSet, basename='users')
router.register('orders', OrderViewSet, basename='orders')
# TODO: разобраться с рейтингом, как это должно работать и удалить
#       лишний роутер, так быть не должно
router.register('ratings', RatingViewSet, basename='ratings')
router.register('types', CleaningTypeViewSet)
router.register('services', ServiceViewSet)
router.register(r'^orders/(?P<order_id>\d+)/rating',
                RatingViewSet,
                basename='rating_via_orders')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.authtoken')),
    path('order_create/', order_create, name='order_create'),
    path('confirm_mail/', confirm_mail, name='confirm_mail'),
]
