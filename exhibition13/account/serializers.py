from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User


class User(serializers.ModelSerializer):
    username = models.CharField(unique=True, max_length=100)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    profile_picture = models.ImageField(upload_to='images/accounts/', default='images/default_account.png', blank=True)
    bio = models.TextField(null=True)
    participated_class = models.CharField(max_length=50)
    grade = models.IntegerField()

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = []
