import React from "react";

const FeatureItem = ({ imgSrc, title, description }) => {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={`${title} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;
