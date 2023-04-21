from django.db import models
from children.models import Children


class Salary(models.Model):
    date = models.DateField()
    value = models.DecimalField(max_digits=6, decimal_places=2)
    child = models.ForeignKey(Children, on_delete=models.CASCADE)
