from tkinter.font import names

from django.core.exceptions import ValidationError
from django.db import transaction, IntegrityError
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly

from category.models import Category
from category.serializers import CategorySerializer
from utils.filter_mixin import FilterMixin


class CategoryListCreateView(FilterMixin, ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_fields = {
        'name': 'name__icontains'
    }

    def perform_create(self, serializer):
        category = serializer.save()
        category.users.add(self.request.user)

class CategoryRetrieveView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]



