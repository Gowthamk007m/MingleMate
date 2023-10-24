import React, { Suspense, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import styles from "./profile2Copy.module.css";
import LikeButton from "../FeedFunctions/LikeButton";
import Animation from "../Animations/LoadingAnimation";
import Commnetspop from "../comments/commnetspop";
import { format } from "date-fns";

// import { LazyImage, LazyImageForProfile } from "../ImageFeed/LazyImage";
const LazyImage = React.lazy(() => import("./LazyForProfile"));

const ProfileImage = ({ image, onDelete, index, profile, update }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [From_pro, setFrom_pro] = useState(false);

  const [showAllComments, setShowAllComments] = useState(false);

  const { user } = useContext(AuthContext);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = () => {
    onDelete(image.id);
    setShowConfirmation(false);
  };
  const commentLength = image.comments.length;

  const formattedDateTime = format(
    new Date(image.created_at),
    "hh:mm a · dd/MM/yy"
  );
  console.log("com", image);
  return (
    <>
      {/* component */}
      <div className="border-gray-100 border-2 rounded-3xl drop-shadow-2xl dark:bg-black p-5 flex items-center justify-center ">
        <div className="bg-white w-full  dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="h-11 w-11 rounded-full"
                src={`https://minglemate.pythonanywhere.com${profile.profile_picture}`}
              />
              <div className="ml-1.5 text-sm leading-tight">
                <span className="text-black dark:text-white font-bold block ">
                  {profile.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>
          <p className="text-black dark:text-white block text-sm leading-snug mt-3  ">
            {image.caption}
          </p>
          <img
            className="mt-2 max-h-[20rem] w-full object-cover  rounded-2xl border border-gray-100 dark:border-gray-700"
            src={`https://minglemate.pythonanywhere.com${image.image}`}
          />
          <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
            {formattedDateTime}
          </p>
          <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />

          <div className="relative text-gray-500 dark:text-gray-400 flex mt-0 ">
            {!showConfirmation && (
              <>
                <div>
                  <LikeButton
                    image_id={image}
                    profile={profile}
                    likeCount={image.like_count}
                    from_pro={From_pro}
                  />
                </div>
                <div className="flex  items-center mr-6 ">
                  {showAllComments ? (
                    <div className=" mb-2 text-sm">
                      <Commnetspop
                        comments={image.comments}
                        image_id={image.id}
                        image={image.image}
                        onClose={() => setShowAllComments(false)}
                      />
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer flex-col items-center"
                      onClick={() => setShowAllComments(!showAllComments)}
                    >
                      <svg
                        className="material-icons md-36 "
                        xmlns="http://www.w3.org/2000/svg"
                        height="34"
                        viewBox="0 0 24 24"
                        width="34"
                        fill="black"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                      </svg>
                      <p>{commentLength} Comments</p>
                    </div>
                  )}
                </div>
              </>
            )}
            {user.username === profile.name && (
                <div className=" flex flex-col mt-1  ">
                  <Link>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                    className="w-7 h-7"
                      onClick={handleDeleteClick}
                    />
                  </Link>
                  {showConfirmation && (
                    <div className="text-lg flex-col ">
                      <p className="flex justify-center items-center">Are you sure you want to delete this image?</p>
                      <button
                        onClick={handleConfirmDelete}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleCancelDelete}
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileImage;
