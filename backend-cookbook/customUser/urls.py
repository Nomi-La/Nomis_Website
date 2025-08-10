from customUser.views import UserListView, UserMeGetPostUpdateDeleteView, UserGetPostUpdateDeleteSingleView
from django.urls import path

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),
    path('me/', UserMeGetPostUpdateDeleteView.as_view(), name='user-me'),
    path('<int:pk>/', UserGetPostUpdateDeleteSingleView.as_view(), name='user-detail'),
]
