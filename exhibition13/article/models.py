from django.db import models


# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    image = models.ImageField(upload_to='images/articles/', default='images/default_article', blank=True, null=True)
    video = models.FileField(upload_to='videos/articles', blank=True)
    user = models.ForeignKey('account.User', on_delete=models.CASCADE)
