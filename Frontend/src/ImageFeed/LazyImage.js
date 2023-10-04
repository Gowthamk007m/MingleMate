import React, { useState } from "react";
import "../Home/style.css";
// Import the stylesheet
import Animation from "../Animations/LoadingAnimation";

const LazyImage = ({ from_comment,src, alt, ...restProps }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div>
      {!imageLoaded && (
        <div className="w-full bg-cover max-h-[24rem]  lg:max-h-[36rem] ">
          <div className="  ">
            <Animation.LoadingOval />
          </div>
        </div>
      )}
      <img
        {...restProps}
        src={src}
        alt={alt }
        className="w-full  max-h-[24rem]  object-cover  lg:hover:scale-[104%] duration-500 lg:max-h-[36rem] "
        onLoad={handleImageLoad}
        loading="lazy" // Enable native lazy loading for modern browsers
      />
    </div>
  );
};



export default LazyImage;
