from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Предоставляет доступ:
        - на чтение: всем;
        - на запись: автору объекта или администратору.
    """

    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS or
            request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user or request.user.is_staff


class IsOwner(permissions.BasePermission):
    """
    Предоставляет доступ:
        - на чтение - автору объекта;
        - на запись - автору объекта.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Предоставляет доступ:
        - на чтение: всем;
        - на запись: только администратору.
    """

    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS or
            request.user.is_staff
        )

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff


# TODO: убрать это. Повторяет IsOwnerOrReadOnly.
# class IsAdminOrIsOwner(permissions.BasePermission):
#     """
#     Предоставляет доступ:
#         - на запись: только администратору и автору.
#     """

#     def has_object_permission(self, request, view, obj):
#         return request.user == obj.user or request.user.is_staff


# TODO: убрать это. В DRF уже встроен такой тип разрешений.
# class IsAdminOnly(permissions.BasePermission):
#     """
#     Предоставляет доступ только администратору.
#     """

#     def has_permission(self, request, view):
#         return request.user.is_staff
