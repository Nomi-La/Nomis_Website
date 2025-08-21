from rest_framework import serializers


class IngredientNameSerializer(serializers.Serializer):
    name = serializers.CharField()


class IngredientRecipeSerializer(serializers.Serializer):
    ingredient = IngredientNameSerializer()
    quantity = serializers.CharField()


class DietaryCategoryOutSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField()


class FoodStyleOutSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField()


class RecipeRequestSerializer(serializers.Serializer):
    user_prompt = serializers.CharField()
    ingredients = serializers.ListField(
        child=serializers.CharField(), required=False, default=[]
    )
    food_styles = serializers.ListField(
        child=serializers.CharField(), required=False, default=[]
    )
    dietary_categories = serializers.ListField(
        child=serializers.CharField(), required=False, default=[]
    )


class RecipeResponseSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    difficulty = serializers.ChoiceField(choices=['Easy', 'Medium', 'Hard'])
    recipe_ingredients = serializers.ListField(child=IngredientRecipeSerializer())
    dietary_categories = serializers.ListField(child=DietaryCategoryOutSerializer())
    food_styles = serializers.ListField(child=FoodStyleOutSerializer())


class ImageGenerationRequestSerializer(serializers.Serializer):
    prompt = serializers.CharField()
