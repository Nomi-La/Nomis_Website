from django.db.models import Q


class FilterMixin:
    filter_fields = {}

    def filter_queryset(self, queryset):
        qs = super().filter_queryset(queryset)
        filters = Q()

        for param, lookup_fields in self.filter_fields.items():
            value = self.request.query_params.get(param)
            if value:
                if isinstance(lookup_fields, list):
                    subfilters = Q()
                    for field in lookup_fields:
                        subfilters |= Q(**{field: value})
                    filters &= subfilters
                else:
                    filters &= Q(**{lookup_fields: value})

        return qs.filter(filters).distinct()
