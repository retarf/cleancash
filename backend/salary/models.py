from django.db import models


class Salary(models.Model):
    date = models.DateField()
    value = models.DecimalField(max_digits=6, decimal_places=2)
