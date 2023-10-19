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
// console.log("com", commentLength);
    return (
      <div
        key={index}
        className={`${styles["image-container"]}`}
        onClick={update}
      >
        <div className={`${styles["image-wrapper"]}`}>
          <Suspense
            fallback={
              <div>
                <Animation.LoadingOval />
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
                <div className={styles.com_like}>
                  <div>
                    <LikeButton
                      image_id={image}
                      profile={profile}
                      likeCount={image.like_count}
                      from_pro={From_pro}
                    />
                  </div>

                  <div className={styles.comments}>
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
                        className="cursor-pointer flex items-center"
                        onClick={() => setShowAllComments(!showAllComments)}
                      >
                        <svg
                          className="material-icons md-36 "
                          xmlns="http://www.w3.org/2000/svg"
                          height="34"
                          viewBox="0 0 24 24"
                          width="34"
                          fill="white"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                        </svg>
                        <p>{commentLength}</p>
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
                  <div className={`${styles["confirmation"]}`}>
                    <p>Are you sure you want to delete this image?</p>
                    <button onClick={handleConfirmDelete}>Yes</button>
                    <button onClick={handleCancelDelete}>Cancel</button>
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
