import React, { useContext } from "react";
import useFollowUser from "./useFollowUser";
import AuthContext from "../Context/AuthContext";

const FollowUser = ({ userId, profile }) => {
  const { user } = useContext(AuthContext);

  const { isFollowing, handleFollowToggle } = useFollowUser(userId.id);
  const isCurrentUser = profile.id === userId.id;
  // console.log(
  //   "user",
  //   user.user_id,
  //   "user2",
  //   userId.id,
  //   "profile",
  //   profile.id
  // );

  if (isCurrentUser) {
    return null;
  }

  return (
    <button style={{ border:"solid 2px",borderRadius:"20px",paddingLeft:'10px',paddingRight:'10px' }}>
      <div className="cursorfollow" onClick={handleFollowToggle}>
        <span></span>
        {isFollowing ? "Unfollow" : "Follow"}
      </div>
    </button>
  );
};

export default FollowUser;
