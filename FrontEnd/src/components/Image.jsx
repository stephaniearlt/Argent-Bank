import React from 'react';

const Image = ({ src, alt, width, height, className }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    loading="lazy" // Chargement paresseux pour améliorer les performances
  />
);

export default Image;


