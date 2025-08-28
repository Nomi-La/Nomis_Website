from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from category.models import Category
from category.serializers import CategorySerializer
from utils.filter_mixin import FilterMixin


class CategoryListCreateView(FilterMixin, ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_fields = {
        'name': 'name__icontains',
        'user': 'users__id'
    }

    def perform_create(self, serializer):
        category = serializer.save()
        category.users.add(self.request.user)


class CategoryRetrieveView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
