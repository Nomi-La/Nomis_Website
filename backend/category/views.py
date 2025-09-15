from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, GenericAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from category.models import Category
from category.permissions import IsOwnerOrReadOnly
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
        'user': 'user__id',
        'project': 'project__id'
    }

    def perform_create(self, serializer):
        category = serializer.save()
        category.users.add(self.request.user)


class CategoryRetrieveView(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsOwnerOrReadOnly]

