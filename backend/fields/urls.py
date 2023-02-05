from django.urls import path, include
from rest_framework.routers import DefaultRouter
from fields import api

router = DefaultRouter()
router.register(r'', api.FieldViewSet, basename="fields")

urlpatterns = [
    path('', include(router.urls)),
]
