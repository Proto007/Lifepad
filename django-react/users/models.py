from django.db import models

from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from rest_framework_simplejwt.tokens import RefreshToken

class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None):
        if(username is None):
            raise TypeError("Username must exist")
        if(email is None):
            raise TypeError("Email must exist")
        
        user=self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, email, password):
        if(password is None):
            raise TypeError("Password must exist")
        if(username is None):
            raise TypeError("Username must exist")
        if(email is None):
            raise TypeError("Email must exist")
        
        user=self.create_user(username, email, password)
        user.is_admin=True
        user.is_verified=True
        user.is_superuser=True
        user.is_staff=True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username=models.CharField(max_length=255, unique=True)
    email=models.EmailField(max_length=255, unique=True, db_index=True)
    password=models.CharField(max_length=255)
    is_verified=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)
    initial_login=models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS=['username']

    objects=UserManager()

    def __str__(self):
        return self.email

    
    def tokens(self):
        refresh=RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
