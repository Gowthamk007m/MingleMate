
import React, { useState } from "react";

import styles from "./profile2Copy.module.css";


const LazyImageForProfile = ({ src, alt, ...restProps }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={`${styles["h-auto max-w-full rounded-3xl"]} ${styles["image"]}`}
    >
      <img
        {...restProps}
        src={src}
        alt={alt || "Lazy-loaded Image"}
    
        onLoad={handleImageLoad}
        loading="lazy" // Enable native lazy loading for modern browsers
      />
    </div>
  );
};

export default LazyImageForProfile;
