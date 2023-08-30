from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if (
            request.method in permissions.SAFE_METHODS
            or request.user.is_authenticated
            or request.user.is_superuser
        ):
            return True
        return bool(
            obj.user == request.user
            and request.user.is_authenticated
        )

class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return bool(
            obj.user == request.user
            and request.user.is_authenticated
        )