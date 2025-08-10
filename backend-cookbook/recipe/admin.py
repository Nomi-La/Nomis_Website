from django.contrib import admin

from recipe.models import Recipe, RecipeIngredient


class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'difficulty', 'user']
    list_filter = ['difficulty', 'created']
    search_fields = ['title', 'description']
    filter_horizontal = ['dietary_categories', 'food_styles', 'cookbooks']
    inlines = [RecipeIngredientInline]
