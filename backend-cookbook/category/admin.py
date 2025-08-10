from category.models import DietaryCategory, FoodStyle
from django.contrib import admin


@admin.register(DietaryCategory)
class DietaryCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


@admin.register(FoodStyle)
class FoodStyleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']
