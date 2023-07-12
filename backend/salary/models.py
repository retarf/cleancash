from django.db import models


class Salary(models.Model):
    value = models.DecimalField(max_digits=6, decimal_places=2)
