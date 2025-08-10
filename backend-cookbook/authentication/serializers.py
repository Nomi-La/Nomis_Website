from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from authentication.models import CodeModel
from customUser.serializer import CustomUserSerializer

CustomUser = get_user_model()


# Registration
class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeModel
        fields = ['email']

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value


class RegistrationValidationSerializer(serializers.ModelSerializer):
    code = serializers.CharField(write_only=True)
    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password_repeat', 'first_name', 'last_name', 'code']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'validators': []},
        }

    def validate(self, data):
        # Check the code
        try:
            reg_code = CodeModel.objects.get(email=data['email'], code=data['code'])
            if reg_code.is_expired():
                raise serializers.ValidationError("The code has expired.")
        except CodeModel.DoesNotExist:
            raise serializers.ValidationError("Invalid code.")

        # Check passwords
        if data['password'] != data['password_repeat']:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    def update(self, instance, validated_data):
        # Clean up
        validated_data.pop('code', None)
        validated_data.pop('password_repeat', None)
        password = validated_data.pop('password', None)

        # Set all other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        # Delete used code
        CodeModel.objects.filter(email=instance.email).delete()

        return instance


class PasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeModel
        fields = ['email']

    def validate_email(self, value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user is registered with this email.")
        return value


class PasswordResetValidationSerializer(serializers.ModelSerializer):
    code = serializers.CharField(write_only=True)
    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'password_repeat', 'code']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'validators': []},  # disables uniqueness check
        }

    def validate_email(self, value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user registered with this email.")
        return value

    def validate(self, data):
        try:
            reg_code = CodeModel.objects.get(email=data['email'], code=data['code'])
            if reg_code.is_expired():
                raise serializers.ValidationError("The code has expired.")
        except CodeModel.DoesNotExist:
            raise serializers.ValidationError("Invalid code.")

        if data['password'] != data['password_repeat']:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        CodeModel.objects.filter(email=instance.email).delete()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = CustomUserSerializer(self.user, context=self.context)
        data['user'] = serializer.data
        return data
