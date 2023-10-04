from django.forms import ModelForm
from  .models import *
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class User_create_form(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']


class User_data_form(ModelForm):
    class Meta:
        model = User_Account
        fields = '__all__'
        exclude = ['password','created_at','updated_at']

class ImageForm(ModelForm):
    class Meta:
        model = ImagePost
        fields = '__all__'
        exclude = ['created_at','updated_at']
