from django.db import models
from rest_framework import serializers
from article.models import Article


class Article(serializers.ModelSerializer):
    title = models.CharField(max_length=100)
    body = models.TextField()
    image = models.ImageField(upload_to='images/articles/', default='images/default_article', blank=True)
    video = models.FileField(upload_to='videos/articles', blank=True)
    user = models.ForeignKey('account.User', on_delete=models.CASCADE)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = []
