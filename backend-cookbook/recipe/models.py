from django.conf import settings
from django.db import models


class Recipe(models.Model):
    DIFFICULTY_CHOICES = [
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='cookbook_images/', null=True, blank=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)

    # relationship with others fields

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='recipes')
    ingredients = models.ManyToManyField(
        'ingredient.Ingredient',
        through='RecipeIngredient',
        related_name='recipes'
    )
    dietary_categories = models.ManyToManyField('category.DietaryCategory', related_name='recipes', blank=True)
    food_styles = models.ManyToManyField('category.FoodStyle', related_name='recipes', blank=True)
    cookbooks = models.ManyToManyField('cookbook.Cookbook', related_name='recipes', blank=True)

    def __str__(self):
        return self.title


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey("Recipe", on_delete=models.CASCADE, related_name='recipe_ingredients')
    ingredient = models.ForeignKey("ingredient.Ingredient", on_delete=models.CASCADE)
    quantity = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.quantity} of {self.ingredient.name} for {self.recipe.title}"
