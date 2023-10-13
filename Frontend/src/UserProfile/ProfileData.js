import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./profile2Copy.module.css";
import ProfileImage from "./ProfileImage";
import AuthContext from "../Context/AuthContext";
import PublicFollowers from "../SuggestionBox/PublicFollowers";
import UserFollowers from "../SuggestionBox/UserFollowers";
import EditProfile from "../Edit_profile/EditProfile";
import FollowersData from "../Follow&Unfollow/FollowersData";
import Animation from "../Animations/LoadingAnimation";

const ProfileData = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);

  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);

  const [isFollowerList, setFollowerList] = useState(false);

  const [status, setStatus] = useState(false);

  const [receivedData, setReceivedData] = useState([""]);

  const FollowersDetails = useState();

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleChildData = (data) => {
    setFollowerList(true);
    setStatus(true);

    setReceivedData(data);
  };

  const handleChildData2 = (data) => {
    setFollowerList(true);
    setStatus(false);

    setReceivedData(data);
  };

  const handleFollowerListClose = () => {
    setFollowerList(false);
    setIsEditMode(false);
  };

  useEffect(() => {
    getProfile();
  }, [id, FollowersData]);

  const LoadingAnimation = () => (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-animation"]} />
      <div>
        <Animation.LoadingOval />
      </div>
    </div>
  );

  const getProfile = async () => {
    try {
      const response = await fetch(
        `https://minglemate.pythonanywhere.com/Api/api/${id}/`
      );
      const data = await response.json();
      setProfile(data.profile);
      setImages(data.images);
      setPost(data.post_count);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const profileUpdate = async () => {
    try {
      const response = await fetch(
        `https://minglemate.pythonanywhere.com/Api/api/${id}/`
      );
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const DeleteProfile = async (imageId) => {
    try {
      const response = await fetch(
        `https://minglemate.pythonanywhere.com/Api/api/${imageId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        const responseProfile = await fetch(
          `https://minglemate.pythonanywhere.com/Api/api/${id}/`
        );
        const data = await responseProfile.json();
        setProfile(data.profile);
        setImages(data.images);
        setPost(data.post_count);

        // console.log("Profile and images updated:", data);
      } else {
        // console.log("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const isProfile = profile;

  return (
    <div>
      <div className="relative md:left-[10%] md:w-[88%] top-16 lg:left-[18%] lg:h-full lg:w-[80%] md:top-0 bg-gray-200 p-8">
        <>
          <div className="bg-white rounded-lg shadow-xl pb-8">
            <div className="absolute right-12 mt-4 rounded">
              <button
                className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
                title="Settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
              {/* Removed the Alpine.js related code */}
            </div>
            <div className="w-full h-[250px]">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
              />
            </div>
            {profile === null ? (
              <LoadingAnimation />
            ) : (
              <>
                <div className="flex flex-col items-center -mt-20">
                  {profile.profile_picture ? (
                    <img
                      src={profile.profile_picture}
                      alt=""
                      className="w-40 h-40 border-4 object-cover border-white rounded-full"
                    />
                  ) : (
                    <LoadingAnimation />
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl capitalize">{profile.name}</p>
                  </div>
                  <p className="text-gray-700">{profile.bio}</p>
                  <p className="text-sm text-gray-500"> {profile.email}</p>
                  {post ? (
                    <p className="text-1xl relative top-6 capitalize font-semibold  text-blue-700">
                      {post} POSTS
                    </p>
                  ) : (
                    <p className="text-1xl relative top-8 capitalize font-serif text-blue-700">
                      Nothing to See Here Yet !
                    </p>
                  )}
                </div>

                <div className="flex-1 w-full justify-center  flex flex-row items-center lg:items-end lg:justify-end px-8 mt-2">
                  <div className="flex flex-col lg:flex-row items-center space-x-4 mt-2 ">
                    {user.username === profile.name ? (
                      <UserFollowers
                        onEdit={handleEditClick}
                        id={id}
                        sendDataToParent={handleChildData}
                        sendDataToParent2={handleChildData2}
                      />
                    ) : (
                      <PublicFollowers
                        sendDataToParent={handleChildData}
                        sendDataToParent2={handleChildData2}
                        id={id}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="">
            {isFollowerList ? (
              <FollowersData
                close={handleFollowerListClose}
                FollowersData={receivedData}
                status={status}
                user={profile}
                log_user={user}
              />
            ) : isEditMode ? (
              <EditProfile userId={id} close={handleFollowerListClose} />
            ) : (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <ProfileImage
                    key={index}
                    index={index}
                    image={image}
                    image_id={image.id}
                    onDelete={DeleteProfile}
                    profile={profile}
                    update={profileUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default ProfileData;
