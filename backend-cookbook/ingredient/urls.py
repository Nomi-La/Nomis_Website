from django.urls import path

from ingredient.views import IngredientListCreateView, IngredientUpdateDeleteView

urlpatterns = [
    path('', IngredientListCreateView.as_view(), name='ingredients-list'),  # GET
    path('<int:id>/', IngredientUpdateDeleteView.as_view(), name='ingredients-detail'),  # PATCH, DELETE
]
