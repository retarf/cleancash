from django.urls import path, include
from rest_framework.routers import DefaultRouter
from salary import api

router = DefaultRouter()
router.register(r'', api.SalaryViewSet, basename="salary")

urlpatterns = [
    path('', include(router.urls)),
]
