import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import Sidebar from "../sidebar/Sidebar";
import Animation from "../Animations/LoadingAnimation";

const HomePage = () => {
  const [profile, setProfile] = useState(null); // Change initial value to null

  const { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let response = await fetch(
      "https://minglemate.pythonanywhere.com/Api/currentuser/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      setProfile(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };
      // console.log("profile2", profile);

  return (
    <div>
      {profile ? (
        <Sidebar profile={profile} />
      ) : (
        <div>
          <Animation.LoadingOval />
        </div>
      )}
    </div>
  );
};

export default HomePage;
