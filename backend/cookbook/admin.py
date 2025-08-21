from cookbook.models import Cookbook
from django.contrib import admin


@admin.register(Cookbook)
class CookbookAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'user', 'created']
    search_fields = ['title', 'description']
