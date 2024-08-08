import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    // accepte tous les évènements (ex. "onClick")
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;