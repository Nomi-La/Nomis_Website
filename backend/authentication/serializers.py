from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from user.serializers import UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user, context=self.context)
        data['user'] = serializer.data
        return data
