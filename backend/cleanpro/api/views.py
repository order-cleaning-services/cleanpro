from api.serializers import UserSerializer
from djoser.views import UserViewSet


class UserViewSet(UserViewSet):
    serializer_class = UserSerializer
