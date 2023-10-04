from django.db.models.signals import post_save,post_delete,pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from . models import *

def Create_profile(sender, instance ,created , **kwargs):
    if created:
        User_Account.objects.create(user=instance,name=instance.username,email=instance.email)

post_save.connect(Create_profile,sender=User)


@receiver(post_save, sender=UserFollowing)
def create_follow_notification(sender, instance, created, **kwargs):
    if created:
        # Create a notification for the user being followed
        Notification.objects.create(
            user=instance.following_user_id,
            action_user=instance.user_id,
            message=f"{instance.user_id.username} started following you."
        )

@receiver(post_delete, sender=UserFollowing)
def delete_follow_notification(sender, instance, **kwargs):
    try:
        notification = Notification.objects.get(
            user=instance.following_user_id,
            action_user=instance.user_id,
            message=f"{instance.user_id.username} started following you."
        )
        notification.delete()
    except Notification.DoesNotExist:
        pass 
