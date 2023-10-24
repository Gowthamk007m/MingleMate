import React, { Suspense, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import styles from "./profile2Copy.module.css";
import LikeButton from "../FeedFunctions/LikeButton";
import Animation from "../Animations/LoadingAnimation";
import Commnetspop from "../comments/commnetspop";
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
  // console.log("com", commentLength);
  useEffect(() => {
  }, [showAllComments]);
  return (
    <div
      key={index}
      className={`${styles["image-container"]}`}
      // onClick={update}
    >
      <div className={`${styles["image-wrapper"]}`}>
        <Suspense
          fallback={
            <div>
              <Animation.LoadingOval2 />
            </div>
          }
        >
          <LazyImage
            src={`https://minglemate.pythonanywhere.com${image.image}`}
            className={`${styles["h-auto max-w-full rounded-3xl"]} ${styles["image"]}`}
          />
        </Suspense>

        <div className={`${styles["image-overlay"]}`}>
          {!showConfirmation && (
            <>
              <div className="flex">
                <div className="mt-2 text-lg ">
                  <LikeButton
                    image_id={image}
                    profile={profile}
                    likeCount={image.like_count}
                    from_pro={From_pro}
                  />
                </div>

                <div className="   mr-6 ">
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
                      className="cursor-pointer flex-col align-middle items-start inline ml-10  text-lg"
                      onClick={() => setShowAllComments(true)}
                    >
                      <svg
                        className="material-icons md-36  "
                        xmlns="http://www.w3.org/2000/svg"
                        height="34"
                        viewBox="0 0 24 24"
                        width="34"
                        fill="white"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                      </svg>
                      <p className="ml-10 md:visible">
                        {commentLength} Comments
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {user.username === profile.name && (
            <div className={`${styles["overlay-content"]}`}>
              <Link>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className={styles.icon2}
                  onClick={handleDeleteClick}
                />
              </Link>
              {showConfirmation && (
                <div className="flex-col text-lg md:text-xl">
                  <p className="">Want to delete the post ?</p>
                  <div className="flex justify-center ">
                    <button
                      className=" text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                      onClick={handleConfirmDelete}
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileImage;
