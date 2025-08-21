from django.urls import path

from recipe.views import (
    RecipeListView,
    RecipeCreateView,
    RecipeMeListView,
    RecipeDetailView,
)

urlpatterns = [
    path('', RecipeListView.as_view(), name='recipes-list'),
    path('create/', RecipeCreateView.as_view(), name='recipes-create'),
    path('me/', RecipeMeListView.as_view(), name='recipes-me'),
    path('<int:id>/', RecipeDetailView.as_view(), name='recipes-detail'),
]
