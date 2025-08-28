from django.urls import path

from category.views import CategoryListCreateView, CategoryRetrieveView, CategoryRemoveUserView

urlpatterns = [
    path('', CategoryListCreateView.as_view()),
    path('<int:pk>/', CategoryRetrieveView.as_view()),
    path('<int:pk>/user/<int:user_id>/', CategoryRemoveUserView.as_view())
]
