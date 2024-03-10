from django.urls import path
from .views import *

from django.urls import path


urlpatterns = [
    path('',Home,name='home'),
]
