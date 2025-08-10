# from django.shortcuts import render

from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from customUser.models import CustomUser
from customUser.permissions import IsOwnerOrAdmin
from customUser.serializer import CustomUserSerializer
from utils.fitler_mixin import FilterMixin


# Create your views here.


class UserListView(FilterMixin, ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    filter_fields = {
        'search': ['username', 'email', 'first_name', 'last_name'],
    }


class UserMeGetPostUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE']:
            return [IsAuthenticated(), IsOwnerOrAdmin()]
        return [IsAuthenticated()]


class UserGetPostUpdateDeleteSingleView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]
