from django.shortcuts import render, HttpResponse
from django.contrib.auth.models import User
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from account import serializers
from rest_framework.response import Response

# Create your views here.

class SignUp(ListCreateAPIView):
    queryset = User
    serializer_class = serializers.User

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Profile(APIView):
    def get(self, request):
        data = {
            'name': f'{request.user.first_name} {request.user.last_name}',
            'username': request.user.username,
        }
        return Response(data, status=201)