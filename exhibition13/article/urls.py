from django.contrib import admin
from django.urls import path
from article.views import ArticleList
urlpatterns = [
    path('ArtcleList/', ArticleList.as_view()),
]
