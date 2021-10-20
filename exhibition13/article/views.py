from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from article import serializers
from article.models import Article, HomeArticles
from rest_framework.response import Response
from django.forms.models import model_to_dict


# Create your views here.

class ArticlesList(ListCreateAPIView):
    serializer_class = serializers.Article
    queryset = Article.objects.all()


class HomeArticlesList(ListCreateAPIView):
    serializer_class = serializers.HomeArticles
    queryset = HomeArticles.objects.all()

class LatestArticlesList(ListCreateAPIView):
    serializer_class = serializers.Article
    length = len(Article.objects.all())
    queryset = Article.objects.all()[length-3: length]


