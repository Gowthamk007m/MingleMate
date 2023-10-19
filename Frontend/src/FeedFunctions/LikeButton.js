import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import favorite_border from "../Svg/favorite_border.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/fontawesome-free-solid";
import styles from "../UserProfile/profile2Copy.module.css";

const LikeButton = ({ image_id, profile, likeCount, from_pro }) => {
  const [count, setCount] = useState(likeCount);

  const [likeStatus, setLikeStatus] = useState(Boolean);

  const [isLiked, setIsLiked] = useState(false);
  const { authTokens } = useContext(AuthContext);

  const handleLikeToggle = async () => {
    try {
      const response = await fetch(
        `https://minglemate.pythonanywhere.com/Api/like-post/${image_id.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.access,
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        // Fetch the updated liked status from the server
        fetchLikedStatus();

        // Toggle the like status
        setIsLiked((prevIsLiked) => !prevIsLiked);

        // Update the like count based on the current like status
        setCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      } else {
        console.error("Failed to Like/unLike Image");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Fetch the liked status from the server whenever the component mounts
  useEffect(() => {
    fetchLikedStatus();
  }, []);

  const fetchLikedStatus = async () => {
    try {
      const response = await fetch(
        `https://minglemate.pythonanywhere.com/Api/liked-by/${image_id.id}/`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authTokens.access,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setLikeStatus(data);

        setIsLiked(data.isLiked);
      } else {
        // console.error("Failed to fetch liked status.");
      }
    } catch (error) {
      // console.error("Fetch error:", error);
    }
  };

  return (
    <div className="relative" onClick={handleLikeToggle}>
      {isLiked ? (
        <div
          className={
            " cursor-pointer md:transition-transform duration-300 md:transform md:hover:scale-110"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35"
            viewBox="0 0 24 24"
            width="35"
            className="fill-red text-red-500 transition-transform animate-rotate-y animate-once transform-gpu scale-100 hover:scale-110"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#EA1515"
            />
          </svg>
        </div>
      ) : (
        <div
          className={
            "heart - button  cursor-pointer transition-transform duration-300 transform hover:scale-110 "
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35"
            viewBox="0 0 24 24"
            width="35"
            className="fill-white text-red-500 transition-transform transform-gpu scale-100 hover:scale-110"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="grey"
            />
          </svg>
        </div>
      )}
      <div className="w-16 ml-0">{count} Likes</div>
    </div>
  );
};

export default LikeButton;
