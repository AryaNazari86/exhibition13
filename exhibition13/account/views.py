from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.generics import ListCreateAPIView
from account import serializers


# Create your views here.

class SignUp(ListCreateAPIView):
    queryset = User
    serializer_class = serializers.User
