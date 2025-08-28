from django.urls import path

from section.views import SectionListCreateView, SectionRetrieveUpdateDeleteView

urlpatterns = [
    path('', SectionListCreateView.as_view()),
    path('<int:pk>/', SectionRetrieveUpdateDeleteView.as_view()),
]
