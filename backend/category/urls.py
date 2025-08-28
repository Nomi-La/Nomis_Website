from django.urls import path

from category.views import CategoryListCreateView, CategoryRetrieveView, CategoryRemoveUserView, \
    CategoryRemoveProjectView

urlpatterns = [
    path('', CategoryListCreateView.as_view()),
    path('<int:pk>/', CategoryRetrieveView.as_view()),
    path('<int:pk>/user/<int:user_id>/', CategoryRemoveUserView.as_view()),
    path('<int:pk>/project/<int:project_id>/', CategoryRemoveProjectView.as_view())
]
