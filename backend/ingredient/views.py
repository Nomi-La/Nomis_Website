from ingredient.serializer import IngredientSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

from .models import Ingredient


class IngredientListCreateView(ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    lookup_field = 'id'
