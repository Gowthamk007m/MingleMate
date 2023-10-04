
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from Accounts.forms import User_create_form
from Accounts.models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
import random
import io
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import serializers, viewsets

# @permission_classes([IsAuthenticated])
class UserAccountList(APIView):
    def get(self, request):
        try:
            current_user = request.user.id
            user_accounts = User_Account.objects.all().exclude(user=current_user)
            serializer = UserAccountSerializer(user_accounts, many=True)
            # print("Serialized data:", serializer.data)
            return Response(serializer.data)
        except Exception as e:
            print("Error:", e)
            return Response({"error": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Follow_Suggestion(APIView):
    def get(self, request):
        current_user_id = request.user.id   # Get the current user's ID

        current_user = get_object_or_404(User, id=current_user_id)

        # Get the users that the current user is already following
        following_users = UserFollowing.objects.filter(user_id=current_user).values_list('following_user_id', flat=True)

        # Get users who are not followed by the current user
        suggestions = User.objects.exclude(id__in=following_users).exclude(id=current_user_id)
        randomized_suggestions = random.sample(list(suggestions), min(7, len(suggestions)))

        suggestion_data = []
        for user in randomized_suggestions:
            user_data = UserSerializer(user).data
            suggestion_data.append(user_data)

        return Response(suggestion_data)

class ImagePostList(APIView):
    def get(self, request):
        image_posts = ImagePost.objects.all().order_by('-created_at')
        serializer = ImagePostSerializer(image_posts, many=True)
        return Response(serializer.data)


class Notifications(APIView):

    def get(self,request):
        current_user_id = request.user.id   # Get the current user's ID

        current_user = get_object_or_404(User, id=current_user_id)
        get_user_notifications=Notification.objects.filter(user=current_user).order_by('-created_at')
        
        serializer=NotificationSerializer(get_user_notifications,many=True)
        return Response(serializer.data)
        


@api_view(['POST'])
def upload_image_post(request):
    caption = request.data.get('caption')
    image = request.FILES.get('image')
    user_id = request.data.get('user')

    # Get the User_Account instance based on the provided user_name
    try:
        user = get_object_or_404(User_Account, user=user_id)
    except User_Account.DoesNotExist:
        return Response({'error': 'User not found'}, status=400)

    if image:
        # Perform image compression here
        compressed_image = compress_image(image)

        # Create a new SimpleUploadedFile with the compressed image data
        compressed_image_file = SimpleUploadedFile(
            image.name, compressed_image.getvalue(), content_type=image.content_type)

        # Save the compressed image to the database
        new_post = ImagePost.objects.create(
            user=user, image=compressed_image_file, caption=caption)

        serializer = ImagePostSerializer(new_post)
        return Response(serializer.data, status=201)
    else:
        return Response({'error': 'Missing required fields'}, status=400)


class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user_account = User_Account.objects.get(pk=pk)
        serializer = UserAccountUpdateSerializer(user_account, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success":serializer.data},status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def compress_image(image):
    # Open the image using PIL
    img = Image.open(image)

    # Perform the compression as per your requirements
    # For example, you can resize the image and save it in JPEG format with a specific quality
    # img = img.resize((800, 600))
    img = img.convert('RGB')
    img_io = io.BytesIO()
    img.save(img_io, format='JPEG', quality=70)

    return img_io



class ImagePostViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ImagePostSerializer
    queryset = ImagePost.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user

        # Get the list of user IDs the current user is following
        following_users = UserFollowing.objects.filter(user_id=current_user)
        following_user_ids = following_users.values_list('following_user_id', flat=True)

        # Include the current user's ID in the list
        all_user_ids = list(following_user_ids) + [current_user.id] # type: ignore

        # Get the ImagePost instances of the users being followed and the current user
        image_posts = ImagePost.objects.filter(user_id__in=all_user_ids).order_by('-created_at')
        return image_posts


@api_view(['GET', 'DELETE'])
def getProfile(request, pk):
    if request.method == 'GET':
        profile = User_Account.objects.get(user_id=pk)
        User_data=User.objects.get(id=pk)
        images = ImagePost.objects.filter(user=profile).order_by('-created_at')
        follower_users = UserFollowing.objects.filter(
            following_user_id=User_data).count()
        following_users = UserFollowing.objects.filter(
            user_id=User_data).count()

        # Calculate and set comment count for each image

        image_serializer = ImagePostSerializerForProfile(images, many=True)

        serializer = UserAccountSerializer(profile, many=False)

        profile_data = {
            'profile': serializer.data,
            'images': image_serializer.data,
            'following_users': following_users,
            'follower_users': follower_users,
            'post_count': images.count(),
        }

        return Response(profile_data)

    elif request.method == 'DELETE':
        try:
            image = ImagePost.objects.get(id=pk)
            image.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ImagePost.DoesNotExist:
            return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile_detail(request):
    current_user = request.user
    # print(current_user)
    profile = get_object_or_404(User_Account, user=current_user)
    serializer = UserAccountSerializer(profile)
    return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class FollowAPIView_Test(APIView):

    def get(self, request, user_id):
        if not request.user.is_authenticated:
            return Response({"detail": "User is not authenticated."}, status=401)
        get_user_id = request.user.id  # Get the current user's ID

        # print(get_user_id)

        current_user = get_object_or_404(User, id=get_user_id)
        user_to_follow = get_object_or_404(User, id=user_id)

        followers_Details=UserFollowing.objects.filter(
            following_user_id=user_to_follow
            )
        
        following_Details=UserFollowing.objects.filter(
                user_id=user_to_follow
            )
        
        followers_Serilizer=UserFollowingSerializer(followers_Details, many=True)
        following_Serilizer=UserFollowingSerializer(following_Details, many=True)

     
        try:
            existing_relationship = UserFollowing.objects.get(
                user_id=current_user,
                following_user_id=user_to_follow
            )

          

            followers_count = UserFollowing.objects.filter(
                following_user_id=user_to_follow
                ).count()

            following_count = UserFollowing.objects.filter(
                    user_id=user_to_follow
                ).count()

            # print(existing_relationship)
            # print(following_count)

            return Response({
                            "detail": "Following.",
                            'following_Details':following_Serilizer.data,
                             'followers_Details':followers_Serilizer.data,
                             'followers_count': followers_count,
                             'following_count': following_count
                             }, status=200)

        except:
            followers_count = UserFollowing.objects.filter(
                following_user_id=user_to_follow
                ).count()

            following_count = UserFollowing.objects.filter(
                    user_id=user_to_follow
                ).count()
            # print(following_count)
            return Response({"detail": "Not Following.",
                             'following_Details':following_Serilizer.data,
                             'followers_Details':followers_Serilizer.data,
                              'followers_count': followers_count,
                             'following_count': following_count}, status=201)

    def post(self, request, user_id):
        if not request.user.is_authenticated:
            return Response({"detail": "User is not authenticated."}, status=401)

        get_user_id = request.user.id 
         # Get the current user's ID
        user_to_follow = get_object_or_404(User, id=user_id)


        followers_Details=UserFollowing.objects.filter(
            following_user_id=user_to_follow
            )
        
        following_Details=UserFollowing.objects.filter(
                user_id=user_to_follow
            )

        followers_Serilizer=UserFollowingSerializer(followers_Details, many=True)
        following_Serilizer=UserFollowingSerializer(following_Details, many=True)

        current_user = get_object_or_404(User, id=get_user_id)
        Target_User = get_object_or_404(User, id=user_id)

        if current_user == Target_User:
            # The user should not be allowed to follow/unfollow themselves
            return Response({"detail": "You cannot follow/unfollow yourself."}, status=400)
            # If it doesn't exist, create a new follow relationship (follow action)

        else:
            try:
                existing_relationship = UserFollowing.objects.get(
                    user_id=current_user,
                    following_user_id=Target_User
                )
                existing_relationship.delete()

                followers_count = UserFollowing.objects.filter(
                following_user_id=Target_User
                ).count()

                following_count = UserFollowing.objects.filter(
                    user_id=Target_User
                ).count()
                
                return Response({"detail": "UnFollowed",
                                 'followers_count': followers_count,
    'following_Details':following_Serilizer.data,
                             'followers_Serilizer':followers_Serilizer.data,
                             'following_count': following_count}, status=201)

            except:
                UserFollowing.objects.create(user_id=current_user,
                                             following_user_id=Target_User)
                
                followers_count = UserFollowing.objects.filter(
                following_user_id=Target_User
                ).count()

                following_count = UserFollowing.objects.filter(
                    user_id=Target_User

                ).count()

                return Response({"detail": "Followed successfully.",
                                     'following_Details':following_Serilizer.data,
                             'followers_Serilizer':followers_Serilizer.data,
                                 'followers_count': followers_count,
                             'following_count': following_count}, status=200)


class LikePostAPIView(APIView):
    def post(self, request, post_id):
        post = get_object_or_404(ImagePost, pk=post_id)
        user = request.user

        if user in post.likes.all():
            post.likes.remove(user)
            post.like_count = post.likes.count()
            post.liked_by.remove(user)
            post.save()
            
            # if post.main_user != user:  
            #     # Avoid notifying the user about their own like
            #     cap=post.caption
            #     if cap!= None:
            #         message = f"{user.username} liked your post: '{cap}'"
            #     # Ensure that you provide a valid User object for user_id
            #         data=Notification.objects.get(user=post.main_user, action_user=user, message=message)

            #         if data:
            #             data.delete()
            #     else:
            #         message = f"{user.username} liked your post"
            #         data=Notification.objects.get(user=post.main_user, action_user=user, message=message)

            #         if data:
            #             data.delete()

            return Response({"message": "Post unliked successfully."}, status=status.HTTP_200_OK)
        else:
            post.likes.add(user)
            post.like_count = post.likes.count()
            post.liked_by.add(user)
            post.save()
            print(post.main_user)
            # Create a like notification
            # if post.main_user != user:  
            #     # Avoid notifying the user about their own like
            #     message = f"{user.username} liked your post: '{post.caption}'"
            #     # Ensure that you provide a valid User object for user_id
            #     Notification.objects.create(user=post.main_user, action_user=user, message=message)

            return Response({"message": "Post liked successfully."}, status=status.HTTP_200_OK)

    def get(self, request, post_id):
        post = get_object_or_404(ImagePost, pk=post_id)
        current_user = request.user

        # Check if the current user has liked the post
        is_liked = post.likes.filter(pk=current_user.pk).exists()

        return Response({"isLiked": is_liked}, status=status.HTTP_200_OK)


class CommentAPIView(APIView):
    def get(self, request, post_id):
        try:
            # Get the ImagePost object based on post_id
            post = ImagePost.objects.get(pk=post_id)

            # Get all the comments associated with the ImagePost
            
            comments = Comment.objects.filter(image_post=post).order_by('-created_at')

            # Serialize the comments using the CommentSerializer
            serializer = CommentSerializer(comments, many=True)

            image_serializer = ImagePostSerializer(post, many=False)
            return Response({
                'comment': serializer.data,
                'images': image_serializer.data
            })

        except ImagePost.DoesNotExist:
            return Response({"error": "ImagePost does not exist."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, post_id):
        try:
            # Get the user identifier from the authenticated user or any other source
            # Replace this with the actual logic to get the user identifier
            user_identifier = request.user.id

            # Get the ImagePost object based on post_id
            post = ImagePost.objects.get(pk=post_id)

            # Get the User_Account object based on the user identifier (e.g., user_id or username)
            user = User_Account.objects.get(user_id=user_identifier)

            # Get the content of the comment from the request data
            content = request.data.get('content')

            # Create a new Comment instance and associate it with the ImagePost and User_Account
            comment = Comment.objects.create(
                image_post=post, user=user, content=content)
            post.update_comment_count()
            # Optionally, you can serialize the new comment using the CommentSerializer
            serializer = CommentSerializer(comment)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except ImagePost.DoesNotExist:
            return Response({"error": "ImagePost does not exist."}, status=status.HTTP_404_NOT_FOUND)

        except User_Account.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, comment_id):
        try:
            # Get the Comment object based on comment_id
            comment = Comment.objects.get(pk=comment_id)
            # Check if the authenticated user has the permission to delete the comment

            # Delete the comment
            comment.delete()
            comment.image_post.update_comment_count()

            # Optionally, you can return a success message or an empty response
            return Response({"message": "Comment deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

        except Comment.DoesNotExist:
            return Response({"error": "Comment does not exist."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@login_required
@api_view(['GET'])
def current_user_view(request):
    user_account = request.user.user_account
    serializer = UserAccountSerializer(user_account)
    return Response(serializer.data, status=status.HTTP_200_OK)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_account = User_Account.objects.get(user=user)
        token['username'] = user.username
        token['userprofile'] = {
            'id': user.id,  # type: ignore
            'name': user_account.name,
            'email': user_account.email,
        }
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@login_required
@api_view(['GET'])
def Get_data(request):
    route = [
        "api token",
        'api refresh'
    ]
    return Response(route)
