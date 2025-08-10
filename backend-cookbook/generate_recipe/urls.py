from django.urls import path
from .views import generate_recipe, generate_image

urlpatterns = [
    path('generate-recipe/', generate_recipe, name='generate_recipe'),
    path('generate-image/', generate_image, name='generate_image'),
]
