from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsProjectLinkOwnerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        else:
            if hasattr(obj, 'section'):
                return request.user == obj.section.category.user

            return request.user == obj.project.section.category.user
