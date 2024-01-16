from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cleaningups import api

router = DefaultRouter()
router.register(r'', api.CleaningUpViewSet, basename="cleanings")

urlpatterns = [
    path('', include(router.urls)),
]
