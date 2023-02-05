from django.db import models


class Children(models.Model):
    name = models.CharField(max_length=10)

