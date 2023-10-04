from django.urls import path
from .views import UserAccountList, ImagePostList
from api import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [
    path('user-accounts/', UserAccountList.as_view(), name='user-account-list'),
    path('image-posts/', ImagePostList.as_view(), name='image-post-list'),
    path('api/<str:pk>/', views.getProfile, name='getProfile'),
    path('follow_test/<int:user_id>/', FollowAPIView_Test.as_view(), name='follow_user_api_test'),
    path('upload/', views.upload_image_post, name='upload_image_post'),
    path('notifications/',Notifications.as_view(), name='notify'),
    path('update_profile/<int:pk>/', UserProfileUpdateView.as_view(), name='update-profile'),
    path('currentuser/',views.user_profile_detail,name='current_user'),
    path('follow_suggestion/',Follow_Suggestion.as_view(),name='follow_suggestion'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('image/', ImagePostViewSet.as_view({'get': 'list'}), name='image'),
    path('like-post/<int:post_id>/', LikePostAPIView.as_view(), name='like_post_api'),
    path('liked-by/<int:post_id>/', LikePostAPIView.as_view(), name='liked_by_data_api'),
    path('updated-like-count/<int:post_id>/', LikePostAPIView.as_view(), name='liked_by_data_api'),
    path('comments/<int:post_id>/', CommentAPIView.as_view(), name='comments'),
    path('comments_delete/<int:comment_id>/', CommentAPIView.as_view(), name='delete_comment'),
    path('', Get_data, name='Get_data'), # type: ignore
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # type: ignore
]