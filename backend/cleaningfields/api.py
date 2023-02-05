from rest_framework import viewsets

from cleaningfields.models import CleaningField
from cleaningfields.serializers import CleaningFieldSerializer


class CleaningFieldViewSet(viewsets.ModelViewSet):
    queryset = CleaningField.objects.all()
    serializer_class = CleaningFieldSerializer
