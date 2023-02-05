from rest_framework import viewsets

from fields.models import Field
from fields.serializers import FieldSerializer


class FieldViewSet(viewsets.ModelViewSet):
    queryset = Field.objects.all()
    serializer_class = FieldSerializer
