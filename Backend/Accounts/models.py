from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone
# Create your models here.


class User_Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True, null=True)
    email = models.EmailField(blank=True)
    bio = models.TextField(blank=True,null=True)
    profile_picture = models.ImageField(
        upload_to='profile_pictures/', blank=True, default='default_image.png')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return f"{self.name}  {self.id} {self.user.id} "  # type: ignore


class UserFollowing(models.Model):
    user_id = models.ForeignKey(
        User, related_name="following", on_delete=models.CASCADE, db_index=True)

    following_user_id = models.ForeignKey(
        User, related_name="followers", on_delete=models.CASCADE, db_index=True)

    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        unique_together = ('user_id', 'following_user_id')

    def __str__(self):
        # type: ignore
        return f"{self.user_id} {self.user_id.id} follows {self.following_user_id} {self.following_user_id.id}" # type: ignore



class ImagePost(models.Model):
    main_user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    user = models.ForeignKey(User_Account, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='image_posts/', null=False)
    caption = models.CharField(max_length=255, blank=True, null=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    like_count = models.IntegerField(default=0)
    liked_by = models.ManyToManyField(User, related_name='liked_by_posts', blank=True)

    comment_count = models.IntegerField(
        default=0)  # New field for comment count

    def update_comment_count(self):
        self.comment_count = self.comments.count()  # type: ignore
        self.save()

    def save(self, *args, **kwargs):
        self.user_name = self.user.name
        self.main_user = self.user.user


        super().save(*args, **kwargs)

    def __str__(self):
        return f"Posted by {self.user.name} with caption {self.caption}"


class Comment(models.Model):
    user = models.ForeignKey(User_Account, on_delete=models.CASCADE)
    image_post = models.ForeignKey(
        ImagePost, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # type: ignore
        return f"Comment by {self.user.user.username} on {self.image_post.user_name}'s {self.image_post.caption} "


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action_user= models.ForeignKey(User, on_delete=models.CASCADE,related_name="action_user",null=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        time_diff = self.time_since_created()
        return f"{self.user.username} {self.user.id}: {self.message}({time_diff}) " # type: ignore
    
    def time_since_created(self):
        now = timezone.now()
        delta = now - self.created_at

        if delta.days > 0:
            if delta.days == 1:
                return "1 day ago"
            else:
                return f"{delta.days} days ago"
        elif delta.seconds >= 3600:
            hours = delta.seconds // 3600
            if hours == 1:
                return "1 hour ago"
            else:
                return f"{hours} hours ago"
        elif delta.seconds >= 60:
            minutes = delta.seconds // 60
            if minutes == 1:
                return "1 minute ago"
            else:
                return f"{minutes} minutes ago"
        else:
            return "just now"