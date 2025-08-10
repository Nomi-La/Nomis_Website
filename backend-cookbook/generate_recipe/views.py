import json
import os
import requests
import uuid

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema

from .serializers import RecipeRequestSerializer, RecipeResponseSerializer, ImageGenerationRequestSerializer

client = OpenAI(api_key=settings.OPENAI_API_KEY)


@swagger_auto_schema(
    method='post',
    request_body=RecipeRequestSerializer,
    responses={200: RecipeResponseSerializer}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_recipe(request):
    serializer = RecipeRequestSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        user_prompt = data.get('user_prompt')
        recipe_ingredients = data.get('recipe_ingredients')
        food_styles = data.get('food_styles')
        dietary_categories = data.get('dietary_categories')

        prompt_text = f"""
        You are a culinary assistant AI.

        Given the following details, generate a recipe.

        INPUT:
        - User prompt: "{user_prompt}"
        - Recipe Ingredients: {recipe_ingredients}
        - Food styles: {food_styles}
        - Dietary categories: {dietary_categories}

        RULES:
        1. If there is a contradiction (like 'meat' in ingredients and 'vegan' in dietary categories),
           or if the user prompt is irrelevant to food or recipe generation (for example asking about translation, technology, or random unrelated topics),
           immediately return a JSON object like:
           {{
             "error": "The provided data does not make sense for generating a recipe. Please adjust your input."
           }}

        2. Otherwise, produce a recipe with:
        - title: short recipe title.
        - description: detailed cooking instructions (steps to prepare the dish).
        - difficulty: one of "Easy", "Medium", "Hard".
        - ingredients: into list of ingredients and quantity (ex. {{"ingredient": {{"name": "carrot"}}, "quantity": "200g"}}).
        - dietary_categories: list of dietary tags (e.g. "Contains dairy", "Vegan").
        - food_styles: list of tags (e.g. "Italian", "Comfort food").

        OUTPUT:
        Always return valid JSON in this format:
        {{
          "title": "...",
          "description": "...",
          "difficulty": "...",
          "recipe_ingredients": [
             {{"ingredient": {{"name": "..."}}, "quantity": "..." }}
          ],
          "dietary_categories": [
             {{"name": "...", "description": "..."}}
          ],
          "food_styles": [
             {{"name": "...", "description": "..."}}
          ]
        }}
        or in case of contradiction or irrelevant data:
        {{
          "error": "The provided data does not make sense for generating a recipe. Please adjust your input."
        }}
        """

        try:
            completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt_text}]
            )
            content = completion.choices[0].message.content

            # Parse JSON
            data = json.loads(content)

            # return Response(data)

            # If the AI returned a contradiction error
            if "error" in data:
                return Response({"error": data["error"]}, status=status.HTTP_400_BAD_REQUEST)

            # Validate output using the serializer (optional but robust)
            response_serializer = RecipeResponseSerializer(data=data)
            if response_serializer.is_valid():
                return Response(response_serializer.data)
            else:
                return Response({
                    "error": "Generated data did not match expected schema.",
                    "details": response_serializer.errors
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except json.JSONDecodeError:
            return Response({"error": "Failed to parse recipe JSON from OpenAI output."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method='post',
    request_body=ImageGenerationRequestSerializer,
    responses={200: "Returns JSON with {'image_uri': '/media-files/...'}"}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_image(request):
    serializer = ImageGenerationRequestSerializer(data=request.data)
    if serializer.is_valid():
        user_prompt = serializer.validated_data.get('prompt')

        # Build a specialized prompt for DALL·E
        image_prompt = (f"Photorealistic image of a freshly prepared {user_prompt}, served on a plate, high detail, realistic lighting, studio photography."
                        f"or When it is mentioned as a cookbook then generate an image for a cookbook with the {user_prompt}")

        try:
            # Generate image with DALL·E-3
            response = client.images.generate(
                model="dall-e-3",
                prompt=image_prompt,
                size="1024x1024"
            )
            image_url = response.data[0].url

            # Download
            img_response = requests.get(image_url)
            if img_response.status_code != 200:
                return Response({"error": "Failed to download generated image."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Save to media-files/ai_images/
            folder_path = os.path.join(settings.MEDIA_ROOT, "ai_images")
            os.makedirs(folder_path, exist_ok=True)

            filename = f"generated_{uuid.uuid4().hex}.png"
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'wb') as f:
                f.write(img_response.content)

            # Return the URI
            image_uri = request.build_absolute_uri(f"{settings.MEDIA_URL}ai_images/{filename}")
            return Response({"image_uri": image_uri})

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
