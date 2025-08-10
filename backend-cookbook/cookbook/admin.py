from django.contrib import admin

from cookbook.models import Cookbook


@admin.register(Cookbook)
class CookbookAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'user', 'created']
    search_fields = ['title', 'description']
