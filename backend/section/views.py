from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from section.models import Section
from section.permissions import IsSectionOwnerOrReadOnly
from section.serializers import SectionSerializer
from utils.filter_mixin import FilterMixin


class SectionListCreateView(FilterMixin, ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsSectionOwnerOrReadOnly]
    filter_fields = {
        "category": "category__id",
        'user': "category__user__id",
        'project': 'category__project__id',
    }


class SectionRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsSectionOwnerOrReadOnly]
