from django.db import models
from rest_framework import serializers
from comment.models import Comment


class Comment(serializers.ModelSerializer):
    title = models.CharField(max_length=25)
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('account.User', on_delete=models.CASCADE)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = []
