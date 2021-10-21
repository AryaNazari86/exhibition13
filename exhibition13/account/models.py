from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, username, password, **other_fields):
        user = self.model(
            username=username,
            **other_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        user = self.create_user(
            username=username,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.us_superuser = True
        user.save(using=self._db)
        return user




class User(AbstractBaseUser):
    username = models.CharField(unique=True, max_length=100)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    profile_picture = models.ImageField(upload_to='images/accounts/', default='images/default_account.png', blank=True)
    bio = models.TextField(null=True)
    participated_class = models.CharField(max_length=50)
    

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.username)

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


def ready(self):
    # importing model classes
    from rest_framework.authtoken.models import Token

    for user in User.objects.all():
        Token.objects.get_or_create(user=user)

    from django.db.models.signals import pre_save
