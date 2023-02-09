from rest_framework import viewsets

from cleaningups.models import CleaningUp
from cleaningups.serializers import CleaningUpSerializer


class CleaningUpViewSet(viewsets.ModelViewSet):
    queryset = CleaningUp.objects.all()
    serializer_class = CleaningUpSerializer
