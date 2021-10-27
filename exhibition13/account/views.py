from django.shortcuts import render, HttpResponse
from account.models import User
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from account import serializers
from rest_framework.response import Response
from django.contrib.auth.views import LoginView, LogoutView
# Create your views here.

class SignUp(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.User

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
import json
class Profile(APIView):
    def post(self, request):
        token = json.loads(request.body)['token']
        user = User.objects.get(auth_token=token)
        data = {
            'username': user.username,
            'name': str(user.first_name) + ' ' + str(user.last_name),
            'avatar': user.profile_picture.url,
            'bio': user.bio
        }
        return Response(data, status=201)