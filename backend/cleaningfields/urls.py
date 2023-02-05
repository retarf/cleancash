from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cleaningfields import api

router = DefaultRouter()
router.register(r'', api.CleaningFieldViewSet, basename="cleaningfields")

urlpatterns = [
    path('', include(router.urls)),
]
