"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny

from project import settings

schema_view = get_schema_view(
    openapi.Info(
        title="Django REST API",
        default_version="v1",
        description="My nice webshop for the Batch 32",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="academy@constructor.org"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[AllowAny, ]
)

urlpatterns = [
    path("backend/admin/", admin.site.urls),

    path('backend/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    # users
    path('backend/api/users/', include('customUser.urls')),

    # auth
    path('backend/api/auth/', include('authentication.urls')),

    # categories
    path('backend/api/category/', include('category.urls')),

    # ingredient
    path('backend/api/ingredients/', include('ingredient.urls')),
    # recipe
    path('backend/api/recipes/', include('recipe.urls')),
    # cookbook
    path('backend/api/cookbooks/', include('cookbook.urls')),
    # ai
    path('backend/api/ai/', include('generate_recipe.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
