import React, { Suspense, useContext, useEffect, useState,useMemo } from "react";
import axios from "axios";
import RightData from "./RightData";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const MainComponent = () => {
  const [imagePosts, setImagePosts] = useState([]);
  const { authTokens, user } = useContext(AuthContext);
  const [rerender,setrerender]=useState('')
const profile = useMemo(() => user.userprofile, []); 
  useEffect(() => {
    fetchData();
  }, [rerender]);




  const fetchData = () => {
    axios
      .get("/Api/image/", {
        headers: {
          Authorization: "Bearer " + String(authTokens.access), // Replace 'your-authentication-token' with the actual token
        },
      })
      .then((res) => {
        const data = res.data;
        setImagePosts(data);
        console.log("commnets",data);

      })
      .catch((err) => {
        console.error(err);
      });
  };

  const navigate = useNavigate();

   if (imagePosts.length === 0) {
     navigate('/suggestion')
   }

  return (
    <div className="mt-20 lg:mt-5">
      {imagePosts.map((imagePost, index) => (
        <RightData
          key={index}
          userAccount={imagePost.user}
          image={imagePost.image}
          likeCount={imagePost.like_count}
          caption={imagePost.caption}
          comments={imagePost.comments}
          profile={profile}
          image_id={imagePost}
          rerender={fetchData}
        />
      ))}
    </div>
  );
};

export default MainComponent;
