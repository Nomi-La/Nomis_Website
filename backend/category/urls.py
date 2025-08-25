from django.urls import path

from category.views import CategoryListCreateView, CategoryRetrieveView

urlpatterns = [
    path('', CategoryListCreateView.as_view()),
    path('<int:pk>/', CategoryRetrieveView.as_view())
]
