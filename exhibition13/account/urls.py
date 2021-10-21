from django.urls import path
from account.views import SignUp, Profile

urlpatterns = [
    path('SignUp/', SignUp.as_view()),
    path('Profile/', Profile.as_view())
]
from rest_framework.authtoken import views
urlpatterns += [
    path('api-token-auth/', views.obtain_auth_token)
]