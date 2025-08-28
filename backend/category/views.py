from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from category.models import Category
from category.serializers import CategorySerializer
from showcase.models import Project
from utils.filter_mixin import FilterMixin

User = get_user_model()


class CategoryListCreateView(FilterMixin, ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_fields = {
        'name': 'name__iexact',
        'user': 'users__id',
        'project': 'projects__id'
    }

    def perform_create(self, serializer):
        category = serializer.save()
        category.users.add(self.request.user)


class CategoryRetrieveView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryRemoveUserView(GenericAPIView):
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, user_id):
        category = self.get_object()
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=404)

        if user != request.user and not request.user.is_staff:
            return Response({"detail": "Not allowed."}, status=403)

        category.users.remove(user)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryRemoveProjectView(GenericAPIView):
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, project_id):
        category = self.get_object()
        try:
            project = Project.objects.get(pk=project_id)
        except Project.DoesNotExist:
            return Response({"detail": "project not found."}, status=404)

        if project.section.user != request.user and not request.user.is_staff:
            return Response({"detail": "Not allowed."}, status=403)

        category.projects.remove(project)
        return Response(status=status.HTTP_204_NO_CONTENT)
