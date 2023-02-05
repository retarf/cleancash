from rest_framework import viewsets

from children.models import Children
from children.serializers import ChildrenSerializer


class ChildrenViewSet(viewsets.ModelViewSet):
    queryset = Children.objects.all()
    serializer_class = ChildrenSerializer