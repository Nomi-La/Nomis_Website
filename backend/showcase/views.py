from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from showcase.models import Project, Link
from showcase.permissions import IsProjectLinkOwnerOrReadOnly
from showcase.serializers import ProjectSerializer, LinkSerializer
from utils.filter_mixin import FilterMixin


class ProjectListCreateView(FilterMixin, ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsProjectLinkOwnerOrReadOnly]
    filter_fields = {
        'section': 'section__id',
        'user': 'section__user__id',
    }


class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsProjectLinkOwnerOrReadOnly]


class LinkListCreateView(FilterMixin, ListCreateAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsProjectLinkOwnerOrReadOnly]
    filter_fields = {
        'project': 'project__id'
    }


class LinkRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsProjectLinkOwnerOrReadOnly]
