from django.contrib.auth import get_user_model
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from category.models import Category
from category.permissions import IsOwnerOrReadOnly
from category.serializers import CategorySerializer
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


class CategoryRetrieveView(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsOwnerOrReadOnly]
