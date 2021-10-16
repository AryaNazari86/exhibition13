from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from comment.models import Comment
from comment import serializers


# Create your views here.

class CommentList(ListCreateAPIView):
    serializer_class = serializers.Comment
    queryset = Comment.objects.all()
