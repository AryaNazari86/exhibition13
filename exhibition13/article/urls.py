from django.contrib import admin
from django.urls import path
from article.views import ArticlesList, HomeArticlesList, LatestArticlesList
urlpatterns = [
    path('ArticlesList/', ArticlesList.as_view()),
    path('HomeArticlesList/', HomeArticlesList.as_view()),
    path('LatestArticlesList/', LatestArticlesList.as_view())
]
