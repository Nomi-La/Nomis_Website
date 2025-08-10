from django.db.models import Q


class FilterMixin:
    filter_fields = {}

    def get_queryset(self):
        queryset = super().get_queryset()
        filters = Q()

        for param, lookup_fields in self.filter_fields.items():
            value = self.request.query_params.get(param)
            if value:
                if isinstance(lookup_fields, list):
                    subfilters = Q()
                    for field in lookup_fields:
                        subfilters |= Q(**{f"{field}__icontains": value})
                    filters &= subfilters
                else:
                    filters &= Q(**{f"{lookup_fields}__icontains": value})

        return queryset.filter(filters).distinct()
