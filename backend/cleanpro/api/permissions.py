from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        # Проверяется, что или запрос на чтение, или пользователь авторизован
        # и можно переходить к has_object_permission.
        return (
            request.method in permissions.SAFE_METHODS or
            request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        return (
            request.user == obj.user or
            # Добавлен "is_stuff", так как superuser != администратор сайта.
            # TODO: уточнить роли is_staff и is_superuser
            request.user.is_staff or
            request.user.is_superuser
        )


class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        # Аналогично - сначала проверяется, что с пользователем можно работать.
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # TODO: уточнить, нужно ли добавлять админа в доступ.
        return obj.user == request.user
