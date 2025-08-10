from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from category.models import DietaryCategory, FoodStyle
from category.serializer import DietaryCategorySerializer, FoodStyleSerializer


# DietaryCategory views
class DietaryCategoryListCreateView(ListCreateAPIView):
    queryset = DietaryCategory.objects.all()
    serializer_class = DietaryCategorySerializer


class DietaryCategoryDetailView(RetrieveUpdateDestroyAPIView):
    queryset = DietaryCategory.objects.all()
    serializer_class = DietaryCategorySerializer
    lookup_field = 'id'


# FoodStyle views
class FoodStyleListCreateView(ListCreateAPIView):
    queryset = FoodStyle.objects.all()
    serializer_class = FoodStyleSerializer


class FoodStyleDetailView(RetrieveUpdateDestroyAPIView):
    queryset = FoodStyle.objects.all()
    serializer_class = FoodStyleSerializer
    lookup_field = 'id'
