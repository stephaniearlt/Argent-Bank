import React, { useState } from "react";

// Fonction pour gérer la visibilité du mot de passe
const PasswordInput = ({ value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(true);

  // Bascule l'état de visibilité du mot de passe
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Fonction pour gérer les changements de valeur
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="password-input-container">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={handleChange}
        minLength={8}
        placeholder="8 minimum characters"
        aria-label="Password"
      />
      <i
        className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
        onClick={toggleShowPassword}
        aria-label={showPassword ? "Hide password" : "Show password"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleShowPassword();
          }
        }}
      ></i>
    </div>
  );
};

export default PasswordInput;
