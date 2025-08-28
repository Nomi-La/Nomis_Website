from django.urls import path

from showcase.views import ProjectListCreateView, ProjectRetrieveUpdateDestroyView, LinkListCreateView, \
    LinkRetrieveUpdateDestroyView

urlpatterns = [
    path('', ProjectListCreateView.as_view()),
    path('<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view()),
    path('links/', LinkListCreateView.as_view()),
    path('links/<int:pk>/', LinkRetrieveUpdateDestroyView.as_view()),
]
