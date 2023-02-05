from rest_framework import serializers

from cleaningfields.models import CleaningField


class CleaningFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CleaningField
        fields = '__all__'
