import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import styles from "../UserProfile/profile2Copy.module.css";
import { Button } from "flowbite-react";

const PublicFollowers = ({ sendDataToParent, sendDataToParent2 }) => {
  const { id } = useParams();
  const { user, authTokens } = useContext(AuthContext);
  const [followStatus, setFollowStatus] = useState([]);
  const [followers_count, SetFollowersCount] = useState([]);
  const [following_count, SetFollowingCount] = useState([]);
  const [followersDetails, setFollowersDetails] = useState([]);
  const [followingDetails, setFollowingDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, [followStatus, id]);

  const fetchData = async () => {
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
        setFollowStatus("following");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
        setFollowersDetails(data.followers_Details);
        setFollowingDetails(data.following_Details);
      } else if (response.status === 201) {
        setFollowStatus("Follow");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
        setFollowersDetails(data.followers_Details);
        setFollowingDetails(data.following_Details);
      }
    } catch (error) {
      console.error("Error:", error);
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
        setFollowStatus("following");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
        setFollowersDetails(data.followers_Details);
        setFollowingDetails(data.following_Details);

        // console.log("response following", data.followers_Details);
      } else if (response.status === 201) {
        setFollowStatus("Follow");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
        setFollowersDetails(data.followers_Details);
        setFollowingDetails(data.following_Details);

        // console.log("response2 notfollowing", data.followers_Details);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handletrigger = () => {
    sendDataToParent(followersDetails);
  };

  const handletrigger2 = () => {
    sendDataToParent2(followingDetails);
  };

  return (
    <div className=" flex flex-col items-center lg:flex-row ">
      <button
        onClick={handleFollow}
        className="flex m-2 items-center text-center bg-[#7ED6D8] text-black hover:bg-green-500 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
      >
        <span className="capitalize ">{followStatus}</span>
      </button>

      <button
        onClick={handletrigger}
        className="flex m-2 items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
      >
        <span>Followers</span>
        <span className="font-bold">{followers_count}</span>
      </button>

      <button
        onClick={handletrigger2}
        className="flex m-2 items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
      >
        <span>Following</span>
        <span className="font-bold">{following_count}</span>
      </button>
    </div>
  );
};

export default PublicFollowers;
