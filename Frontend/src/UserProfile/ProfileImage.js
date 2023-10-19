import React, { Suspense, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
} from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import styles from "./profile2Copy.module.css";
import LikeButton from "../FeedFunctions/LikeButton";
import Animation from "../Animations/LoadingAnimation";
import Commnetspop from "../comments/commnetspop";
import { format } from "date-fns";

// import { LazyImage, LazyImageForProfile } from "../ImageFeed/LazyImage";
const LazyImage = React.lazy(() => import("./LazyForProfile"));


const ProfileImage = ({ image, onDelete, index, profile,update }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [From_pro, setFrom_pro] = useState(false);

  const [showAllComments, setShowAllComments] = useState(false);

  const { user } = useContext(AuthContext);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  }

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
              {/* <svg
                className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current"
                viewBox="0 0 24 24"
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                </g>
              </svg> */}
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
            <div className="text-gray-500 dark:text-gray-400 flex mt-0">
              <LikeButton
                image_id={image}
                profile={profile}
                likeCount={image.like_count}
                from_pro={From_pro}
              />
              <div className="flex flex-col items-center mr-6 ">
                {showAllComments ? (
                  <div className="mb-2 text-sm">
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
            </div>
          </div>
        </div>
      </>
    );
  };
export default ProfileImage;
