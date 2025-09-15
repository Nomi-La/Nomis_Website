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

    @action(detail=False, methods=['post'])
    def reorder(self, request):
        ids = request.data.get('ids', [])
        with transaction.atomic():
            updates = [Project(id=pid, position=i) for i, pid in enumerate(ids, start=1)]
            Project.objects.bulk_update(updates, ['position'])
        return Response(status=204)


class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsProjectLinkOwnerOrReadOnly]

    @action(detail=False, methods=['post'])
    def reorder(self, request):
        ids = request.data.get('ids', [])
        with transaction.atomic():
            updates = [Project(id=pid, position=i) for i, pid in enumerate(ids, start=1)]
            Project.objects.bulk_update(updates, ['position'])
        return Response(status=204)

# class LinkListCreateView(FilterMixin, ListCreateAPIView):
#     queryset = Link.objects.all()
#     serializer_class = LinkSerializer
#     permission_classes = [IsProjectLinkOwnerOrReadOnly]
#     filter_fields = {
#         'project': 'project__id'
#     }


# class LinkRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
#     queryset = Link.objects.all()
#     serializer_class = LinkSerializer
#     permission_classes = [IsProjectLinkOwnerOrReadOnly]
