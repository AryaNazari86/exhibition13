from django.urls import path
from comment.views import CommentList

urlpatterns = [
    path('CommentList/', CommentList.as_view())
]