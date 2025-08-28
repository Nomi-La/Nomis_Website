from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from section.models import Section
from section.permissions import IsOwnerOrReadOnly
from section.serializers import SectionSerializer
from utils.filter_mixin import FilterMixin


class SectionListCreateView(FilterMixin, ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_fields = {
        "category": "category__name__icontains",
        'user': "user__id",
        'project': 'category__projects__id',
    }

class SectionRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsOwnerOrReadOnly]

