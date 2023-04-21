from rest_framework import viewsets

from salary.models import Salary
from salary.serializers import SalarySerializer


class SalaryViewSet(viewsets.ModelViewSet):
    queryset = Salary.objects.all()
    serializer_class = SalarySerializer
