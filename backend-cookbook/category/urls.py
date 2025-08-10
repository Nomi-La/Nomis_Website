from django.urls import path

from category.views import (
    DietaryCategoryListCreateView, DietaryCategoryDetailView,
    FoodStyleListCreateView, FoodStyleDetailView
)

urlpatterns = [
    # dietary category
    path('dietary-categories/', DietaryCategoryListCreateView.as_view(), name='dietarycategory-list-create'),
    path('dietary-categories/<int:id>/', DietaryCategoryDetailView.as_view(), name='dietarycategory-detail'),
    # food style
    path('food-styles/', FoodStyleListCreateView.as_view(), name='foodstyle-list-create'),
    path('food-styles/<int:id>/', FoodStyleDetailView.as_view(), name='foodstyle-detail'),
]
