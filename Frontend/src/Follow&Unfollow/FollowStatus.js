import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";

const FollowStatus = ({id}) => {

  const { user, authTokens } = useContext(AuthContext);
  const [followStatus, setFollowStatus] = useState([]);
  const [followers_count, SetFollowersCount] = useState([]);
  const [following_count, SetFollowingCount] = useState([]);

  // console.log("id", id);

  useEffect(() => {
    fetchData();
  }, [setFollowStatus]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/Api/follow_test/${id}`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
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

  const handleFollow = async () => {
    try {
      const response = await fetch(`/Api/follow_test/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (response.status === 200) {
        setFollowStatus("Following");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);

        console.log("response", data);
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
    <div
      onClick={handleFollow}
      className="text-blue-600 hover:text-orange-500 cursor-pointer"
    >
      {followStatus}
    </div>
  );
};

export default FollowStatus;
