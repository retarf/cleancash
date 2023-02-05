from django.db import models

from children.models import Children
from fields.models import Field


class CleaningUp(models.Model):
    date = models.DateField()
    child = models.ForeignKey(Children, on_delete=models.CASCADE)
    field = models.ForeignKey(Field, on_delete=models.CASCADE)