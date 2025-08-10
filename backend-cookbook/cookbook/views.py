from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated

from cookbook.models import Cookbook
from cookbook.serializer import CookbookSerializer


class CookbookListView(ListAPIView):
    queryset = Cookbook.objects.all()
    serializer_class = CookbookSerializer


class CookbookCreateView(CreateAPIView):
    serializer_class = CookbookSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CookbookMeListView(ListAPIView):
    serializer_class = CookbookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cookbook.objects.filter(user=self.request.user)


class CookbookDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cookbook.objects.all()
    serializer_class = CookbookSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
