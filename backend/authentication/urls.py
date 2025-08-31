from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from authentication.views import MyTokenObtainPairView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('verify/', TokenVerifyView.as_view())
]
