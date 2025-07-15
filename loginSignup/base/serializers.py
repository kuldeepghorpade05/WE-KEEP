from rest_framework import serializers
from .models import NoteData  

class NoteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteData
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']
