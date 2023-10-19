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
      .get("https://minglemate.pythonanywhere.com/Api/image/", {
        headers: {
          Authorization: "Bearer " + String(authTokens.access), // Replace 'your-authentication-token' with the actual token
        },
      })
      .then((res) => {
        const data = res.data;
        setImagePosts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

//   const navigate = useNavigate();
//   const nav = () => {
//   if (imagePosts.length === 0) {
//     navigate("/suggestion");
//   }
// }
//    if (imagePosts.length === 0) {
//      nav()
//    }

  return (
    <div className="lg:mt-0 m-2   ">
      <div className="md:ml-[25%] ">
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
      </div>
    </div>
  );
};

export default MainComponent;
