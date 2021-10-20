from django.urls import path
from account.views import SignUp

urlpatterns = [
    path('Signup/', SignUp.as_view()),
]