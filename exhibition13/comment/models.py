from django.db import models


# Create your models here.
class Comment(models.Model):
    title = models.CharField(max_length=25)
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        'account.User', on_delete=models.CASCADE, null=True, blank=True)
