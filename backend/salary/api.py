from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from salary.models import Salary
from salary.serializers import SalarySerializer


class SalaryViewSet(viewsets.ModelViewSet):
    queryset = Salary.objects.all()
    serializer_class = SalarySerializer


@api_view(['GET'])
def last(request):
    try:
        last_salary = Salary.objects.latest("date")
        serializer = SalarySerializer(last_salary)
        return Response(serializer.data)
    except Salary.DoesNotExist:
        raise NotFound
