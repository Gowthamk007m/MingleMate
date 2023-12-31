import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import LoadingAnimation from "./../Animations/LoadingAnimation";


const FollowStatus = ({ id }) => {
  const { user, authTokens } = useContext(AuthContext);
  const [followStatus, setFollowStatus] = useState([]);
  const [followers_count, SetFollowersCount] = useState([]);
  const [following_count, SetFollowingCount] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log("id", id);

  useEffect(() => {
    fetchData();
  }, [setFollowStatus]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await fetch(
        `https://minglemate.pythonanywhere.com/Api/follow_test/${id}/`,
        {
          headers: {
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        setFollowStatus("Following");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
      } else if (response.status === 201) {
        setFollowStatus("Follow");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched (whether successful or not)
    }
  };

  const handleFollow = async () => {
    try {
      const response = await fetch(
        `https://minglemate.pythonanywhere.com/Api/follow_test/${id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setFollowStatus("Following");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
      } else if (response.status === 201) {
        setFollowStatus("Follow");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingAnimation.LoadingOval3 />
      ) : (
        // Render the loading animation when loading is true
        <div
          onClick={handleFollow}
          className="text-blue-600 hover:text-orange-500 cursor-pointer"
        >
          {followStatus === "Following" ? "Unfollow" : followStatus}
        </div>
      )}
    </div>
  );
};
export default FollowStatus;
