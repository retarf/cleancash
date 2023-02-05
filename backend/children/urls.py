from django.urls import path, include
from rest_framework.routers import DefaultRouter
from children import api

router = DefaultRouter()
router.register(r'', api.ChildrenViewSet, basename="children")

urlpatterns = [
    path('', include(router.urls)),
]