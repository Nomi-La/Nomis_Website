from rest_framework import serializers
from cookbook.models import Cookbook
from recipe.models import Recipe, RecipeIngredient
from category.serializer import DietaryCategoryFlexibleField, FoodStyleFlexibleField
from ingredient.models import Ingredient

from customUser.serializer import CustomUserSerializer

from cookbook.basic_serializer import BasicCookbookSerializer


class IngredientFlexibleField(serializers.Field):
    def to_internal_value(self, data):
        if isinstance(data, int):
            try:
                return Ingredient.objects.get(id=data)
            except Ingredient.DoesNotExist:
                raise serializers.ValidationError(f"Ingredient with id {data} does not exist.")
        elif isinstance(data, dict) and "name" in data:
            name = data["name"].strip().lower()
            ingredient, created = Ingredient.objects.get_or_create(name=name)
            return ingredient
        raise serializers.ValidationError("Ingredient must be an ID or {'name': ...}.")

    def to_representation(self, obj):
        return {
            "id": obj.id,
            "name": obj.name
        }


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientFlexibleField()

    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'quantity']


class RecipeSerializer(serializers.ModelSerializer):
    recipe_ingredients = RecipeIngredientSerializer(many=True)

    # Flexible input fields
    dietary_categories = serializers.ListField(
        child=DietaryCategoryFlexibleField(), required=False, write_only=True
    )
    food_styles = serializers.ListField(
        child=FoodStyleFlexibleField(), required=False, write_only=True
    )

    # Unified output via SerializerMethodField
    dietary_categories_output = serializers.SerializerMethodField(read_only=True)
    food_styles_output = serializers.SerializerMethodField(read_only=True)

    user = CustomUserSerializer(read_only=True)
    cookbooks = serializers.PrimaryKeyRelatedField(
        queryset=Cookbook.objects.all(), many=True
    )
    # still return full cookbook data on output under a different field
    cookbooks_output = BasicCookbookSerializer(source='cookbooks', many=True, read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)
    image_url = serializers.URLField(
        required=False, allow_blank=True, allow_null=True, write_only=True
    )
    image_url_display = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            'id', 'title', 'description', 'difficulty', 'user',
            'dietary_categories', 'food_styles',  # for input
            'dietary_categories_output', 'food_styles_output',  # for output
            'cookbooks', 'cookbooks_output', 'recipe_ingredients', 'created', 'updated',
            'image', 'image_url', 'image_url_display'
        ]

    def create(self, validated_data):
        ingredients_data = validated_data.pop('recipe_ingredients')
        dietary_categories = validated_data.pop('dietary_categories', [])
        food_styles = validated_data.pop('food_styles', [])
        cookbooks = validated_data.pop('cookbooks', [])

        recipe = Recipe.objects.create(**validated_data)
        recipe.dietary_categories.set(dietary_categories)
        recipe.food_styles.set(food_styles)
        recipe.cookbooks.set(cookbooks)

        for item in ingredients_data:
            RecipeIngredient.objects.create(
                recipe=recipe,
                ingredient=item['ingredient'],
                quantity=item['quantity']
            )

        return recipe

    def get_dietary_categories_output(self, instance):
        return [
            {"id": cat.id, "name": cat.name, "description": cat.description}
            for cat in instance.dietary_categories.all()
        ]

    def get_food_styles_output(self, instance):
        return [
            {"id": style.id, "name": style.name, "description": style.description}
            for style in instance.food_styles.all()
        ]

    def get_image_url_display(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        elif obj.image_url:
            return obj.image_url
        return None


"""
This is an example of how the body of a POST request should look like at the endpoint /recipes/create/ :

{
  "title": "Pasta with pesto",
  "description": "With fresh basil",
  "difficulty": "Easy",
  "dietary_categories": [1],
  "food_styles": [2],
  "cookbooks": [1],
  "recipe_ingredients": [
    { "ingredient": {"name": "carrots"}, "quantity": "200 g" }, # unknown ingredient
    { "ingredient": 2, "quantity": "2 tablespoons" } # known ingredient
  ]
}

ingredient: is the ID of the ingredient (1 = "Pasta", 2 = "Basil", etc..)
quantity: is the exact amount for that ingredient in this recipe

"""
