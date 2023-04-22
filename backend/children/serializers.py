from rest_framework import serializers

from children.models import Children


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Children
        fields = '__all__'
        extra_kwargs = {'fields': {'required': False}}

