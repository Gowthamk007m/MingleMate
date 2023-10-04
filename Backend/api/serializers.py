from rest_framework import serializers
from Accounts.models import *
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Account
        fields = ['id', 'name', 'email', 'profile_picture', 'bio']


class UserAccountSerializer_for_followers(serializers.ModelSerializer):

    class Meta:
        model = User_Account
        fields = ['id', 'name', 'email', 'profile_picture', 'bio']


class UserAccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Account
        fields = ['id', 'profile_picture', 'email', 'bio']


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'first_name', 'last_name', 'profile_picture']

    def get_profile_picture(self, user):
        try:
            user_account = user.user_account
            return user_account.profile_picture.url
        except User_Account.DoesNotExist:
            return None


class NotificationSerializer(serializers.ModelSerializer):
    user_account = UserAccountSerializer(source='user.user_account', read_only=True)
    action_user_data=UserAccountSerializer(source='action_user.user_account', read_only=True)
    created_at_formatted = serializers.SerializerMethodField(read_only=True)
    class Meta :
        model=Notification
        fields=['user_account','action_user_data','message','is_read','created_at_formatted']

    def get_created_at_formatted(self, obj):
        return obj.time_since_created()



class UserFollowingSerializer(serializers.ModelSerializer):
    user_id_data = UserSerializer(source='user_id', read_only=True)
    following_user_id_data = UserSerializer(
        source='following_user_id', read_only=True)

    class Meta:
        model = UserFollowing
        fields = ['user_id', 'user_id_data',
                  'following_user_id', 'following_user_id_data']


class ImagePostSerializers(serializers.ModelSerializer):
    user = UserAccountSerializer()

    class Meta:
        model = ImagePost
        fields = ['id', 'user', 'user_name', 'image', 'caption', 'created_at',
                  'updated_at', 'likes', 'like_count', 'liked_by', 'comment_count']


class UserAccountSerializerForImage(serializers.ModelSerializer):
    class Meta:
        model = User_Account
        fields = ['name', 'profile_picture']


class CommentSerializer(serializers.ModelSerializer):
    user = UserAccountSerializer()

    class Meta:
        model = Comment
        fields = '__all__'


class CommentSerializerforImage(serializers.ModelSerializer):
    user = UserAccountSerializerForImage()

    class Meta:
        model = Comment
        fields = ['content', 'user']


class ImagePostSerializer(serializers.ModelSerializer):
    user = UserAccountSerializer()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = ImagePost
        fields = '__all__'


class ImagePostSerializerForProfile(serializers.ModelSerializer):
    user = UserAccountSerializerForImage()
    comments = CommentSerializerforImage(many=True, read_only=True)

    class Meta:
        model = ImagePost
        fields = ['id', 'image', 'user', 'comments',
                  'like_count', 'comment_count']


class ProfileUpdate(serializers.ModelSerializer):
    user = UserAccountSerializer()

    class Meta:
        model = User_Account
        fields = ['email', 'bio', 'profile_picture']


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],

        )

        user.set_password(validated_data['password'])
        user.save()

        return user


