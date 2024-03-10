from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User_Account)
admin.site.register(ImagePost)
admin.site.register(Comment)
admin.site.register(UserFollowing)
admin.site.register(Notification)




