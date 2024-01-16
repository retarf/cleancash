from rest_framework import serializers
from cleaningups.models import CleaningUp


class CleaningUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = CleaningUp
        fields = '__all__'
        extra_kwargs = {'fields': {'required': False}}
