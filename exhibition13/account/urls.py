from django.urls import path
from account.views import SignUp

urlpatterns = [
    path('admin/', SignUp.as_view())
]