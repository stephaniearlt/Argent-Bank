import React from "react";
import Image from "./Image";

const FeatureItem = ({ imgSrc, title, description }) => {
  return (
    <div className="feature-item">
      <Image
        src={imgSrc}
        alt={`${title} Icon`} 
        width={100}
        height={100}
        className="feature-icon" 
      />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;
