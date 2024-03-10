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

@receiver(post_save, sender=Comment)
def create_comment_notification(sender, instance, created, **kwargs):
    if created and instance.image_post.user != instance.user:
        post_username=instance.image_post.main_user.id
        post_user = User.objects.get(pk=post_username)
        action_data=instance.user.user.id
        action_user = User.objects.get(pk=action_data)
        date=instance.created_at
        formatted_date = date.strftime("%d-%m-%y %H:%M")

        message = f"{instance.user.name} commented on your post: '{instance.image_post.caption}'" if instance.image_post.caption else f"{instance.user.name} commented on your post created on '{formatted_date}'"
        Notification.objects.create(user=post_user, action_user=action_user, message=message)

@receiver(post_delete, sender=Comment)
def delete_comment_notification(sender, instance, **kwargs):
        date=instance.created_at
        formatted_date = date.strftime("%d-%m-%y %H:%M")
        message = f"{instance.user.name} commented on your post: '{instance.image_post.caption}'" if instance.image_post.caption else f"{instance.user.name} commented on your post created on '{formatted_date}'"

        post_username=instance.image_post.main_user.id
        post_user = User.objects.get(pk=post_username)
        action_data=instance.user.user.id
        action_user = User.objects.get(pk=action_data)

        try:
            notification = Notification.objects.get(
            user=post_user, action_user=action_user, message=message
            )
            notification.delete()
        except Notification.DoesNotExist:
            pass 

            message = f"{instance.user.name} commented on your post: '{instance.image_post.caption}'" if instance.image_post.caption else f"{instance.user.name} commented on your post created on '{formatted_date}'"

            Notification.objects.create(user=post_user, action_user=action_user, message=message)