from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from article import serializers
from article.models import Article


# Create your views here.

class ArticleList(ListCreateAPIView):
    serializer_class = serializers.Student
    queryset = Article.objects.all()
