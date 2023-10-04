import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import favorite_border from "../Svg/favorite_border.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/fontawesome-free-solid";
import styles from "../UserProfile/profile2Copy.module.css";


const LikeButton = ({ image_id, profile, likeCount,from_pro }) => {
  const [count, setCount] = useState(likeCount);

  const [isLiked, setIsLiked] = useState(false);
  const { authTokens } = useContext(AuthContext);

  // Fetch the liked status from the server whenever the component mounts
  useEffect(() => {
    fetchLikedStatus();
  }, []);

  const fetchLikedStatus = async () => {
    try {
      const response = await fetch(`/Api/liked-by/${image_id.id}/`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authTokens.access,
        },
      });

      if (response.ok) {
        const data = await response.json();
      // console.log("Fetch error:", data);

        setIsLiked(data.isLiked);
      } else {
        // console.error("Failed to fetch liked status.");
      }
    } catch (error) {
      // console.error("Fetch error:", error);
    }
  };

const handleLikeToggle = async () => {
  try {
    const response = await fetch(`/Api/like-post/${image_id.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authTokens.access,
      },
      body: JSON.stringify({}),
    });

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



  return (
    <div>
      {from_pro ? (
        <div className="" onClick={handleLikeToggle}>
          {isLiked ? (
            <div className={`heart-button  ${isLiked ? "liked" : ""}`}>
              {/* <span className={styles["material-icons md-36 red"]}>favorite</span> */}
              <svg
                className={styles["material-icons md-36 red"]}
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 0 24 24"
                width="35"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#EA1515"
                />
              </svg>
            </div>
          ) : (
            <div className={`heart-button ${isLiked ? "liked" : ""}`}>
              {/* <span className={styles["material-icons md-36 "]}>favorite_border</span> */}
              <svg
                className={styles["material-icons md-36 "]}
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 0 24 24"
                width="35"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            </div>
          )}
          <div className=' w-16 ml-0'>{count} Likes</div>
        </div>
      ) : (
        <div onClick={handleLikeToggle} className={styles.likebtn}>
          {isLiked ? (
            <FontAwesomeIcon icon={faHeart} color="red" />
          ) : (
            <FontAwesomeIcon icon={faHeart} color="white" />
          )}
          <div >{count}</div>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
