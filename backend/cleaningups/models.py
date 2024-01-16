from django.db import models

from children.models import Children
from fields.models import Field
from salary.models import Salary


class CleaningUp(models.Model):
    date = models.DateField()
    child = models.ForeignKey(Children, on_delete=models.CASCADE)
    field = models.ManyToManyField(Field, blank=True)
    salary = models.ForeignKey(Salary, on_delete=models.PROTECT)
    bill = models.DecimalField(max_digits=7, decimal_places=2)
