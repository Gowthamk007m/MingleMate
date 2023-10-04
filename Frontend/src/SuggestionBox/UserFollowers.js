import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useParams } from "react-router-dom";
// import styles from "../UserProfile/profile2.module.css";
import { Button } from "flowbite-react";

import styles from "../UserProfile/profile2Copy.module.css";

const UserFollowers = ({ onEdit, sendDataToParent, sendDataToParent2 }) => {
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
      const response = await fetch(`/Api/follow_test/${id}`, {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setFollowStatus("following");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
        setFollowersDetails(data.followers_Details);
        setFollowingDetails(data.following_Details);
        data.followers_Details.forEach((follower) => {
          console.log("Follower ID:", follower.user_id_data.id);
          console.log("Follower Username:", follower.user_id_data.username);
          console.log(
            "Follower Profile_pic:",
            follower.user_id_data.profile_picture
          );
        });

        data.following_Details.forEach((follower) => {
          // Access properties of each follower
          console.log("Following ID:", follower.following_user_id_data.id);
          console.log(
            "Following Username:",
            follower.following_user_id_data.username
          );
          console.log(
            "Following Profile_pic:",
            follower.following_user_id_data.profile_picture
          );
        });
      } else if (response.status === 201) {
        setFollowStatus("Follow");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
        setFollowersDetails(data.followers_Details);
        setFollowingDetails(data.following_Details);

        console.log("response2 notfollowing", data.following_Details);
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
        setFollowStatus("following");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
        // setFollowersDetails(data);

        console.log("response", data);
      } else if (response.status === 201) {
        setFollowStatus("Follow");
        SetFollowersCount(data.followers_count);
        SetFollowingCount(data.following_count);
        // setFollowersDetails(data);
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
    // <div className={styles.followersmain}>
    //   <div className={styles.followbtn}>
    //     <Button color="light" onClick={onEdit}>
    //       Edit_profile
    //     </Button>
    //   </div>

    //   <div className={styles.fol_status}>
    //     <div
    //       className="cursor-pointer hover:text-green-600"
    //       onClick={handletrigger}
    //     >
    //       <div>Followers</div>
    //       <span>{followers_count}</span>
    //     </div>

    //     <div
    //       className="cursor-pointer hover:text-green-600"
    //       onClick={handletrigger2}
    //     >
    //       <div>Following</div>
    //       <span>{following_count}</span>
    //     </div>
    //   </div>
    // </div>

    <div className=" flex flex-col lg:flex-row ">
      <button
        onClick={onEdit}
        className="flex m-2 items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
      >
        <span>Edit_profile</span>
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

export default UserFollowers;
