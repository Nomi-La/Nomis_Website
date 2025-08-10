from django.urls import path

from cookbook.views import (
    CookbookListView, CookbookCreateView, CookbookMeListView, CookbookDetailView
)

urlpatterns = [
    path('', CookbookListView.as_view(), name='cookbooks-list'),
    path('create/', CookbookCreateView.as_view(), name='cookbooks-create'),
    path('me/', CookbookMeListView.as_view(), name='cookbooks-me'),
    path('<int:id>/', CookbookDetailView.as_view(), name='cookbooks-detail'),
]
