from django.db import models

from fields.models import Field


class Children(models.Model):
    name = models.CharField(max_length=10)
    fields = models.ManyToManyField(Field)

