from rest_framework import serializers

from category.models import DietaryCategory, FoodStyle


class DietaryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DietaryCategory
        fields = '__all__'


class FoodStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodStyle
        fields = '__all__'


class DietaryCategoryFlexibleField(serializers.Field):
    def to_internal_value(self, data):
        if isinstance(data, int):
            try:
                return DietaryCategory.objects.get(id=data)
            except DietaryCategory.DoesNotExist:
                raise serializers.ValidationError(f"DietaryCategory with id {data} does not exist.")
        elif isinstance(data, dict) and "name" in data:
            name = data["name"].strip()
            description = data.get("description", "").strip()
            category, created = DietaryCategory.objects.get_or_create(name=name, defaults={"description": description})
            if not created and description:
                # optional: update description if provided
                category.description = description
                category.save()
            return category
        raise serializers.ValidationError("DietaryCategory must be an ID or {'name': ..., 'description': ...}.")

    def to_representation(self, obj):
        return {
            "id": obj.id,
            "name": obj.name,
            "description": obj.description
        }


class FoodStyleFlexibleField(serializers.Field):
    def to_internal_value(self, data):
        if isinstance(data, int):
            try:
                return FoodStyle.objects.get(id=data)
            except FoodStyle.DoesNotExist:
                raise serializers.ValidationError(f"FoodStyle with id {data} does not exist.")
        elif isinstance(data, dict) and "name" in data:
            name = data["name"].strip()
            description = data.get("description", "").strip()
            style, created = FoodStyle.objects.get_or_create(name=name, defaults={"description": description})
            if not created and description:
                style.description = description
                style.save()
            return style
        raise serializers.ValidationError("FoodStyle must be an ID or {'name': ..., 'description': ...}.")

    def to_representation(self, obj):
        return {
            "id": obj.id,
            "name": obj.name,
            "description": obj.description
        }
