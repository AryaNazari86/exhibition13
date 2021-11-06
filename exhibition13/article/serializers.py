from django.db import models
from rest_framework import serializers
from article.models import Article, HomeArticles
from account.models import User


class User(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'profile_picture', 'first_name', 'last_name')
        read_only_fields = []


class Article(serializers.ModelSerializer):
    user = User(read_only=True)

    class Meta:
        model = Article
        fields = ('title', 'body', 'image', 'video', 'user')
        read_only_fields = []


class HomeArticles(serializers.ModelSerializer):
    article = Article()

    class Meta:
        model = HomeArticles
        fields = ('is_important', 'article')
        read_only_fields = []
