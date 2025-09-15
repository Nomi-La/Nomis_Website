from django.db import transaction
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from showcase.models import Project
from showcase.permissions import IsProjectLinkOwnerOrReadOnly
from showcase.serializers import ProjectSerializer
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

