import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../utils/PasswordInput";
import Button from "../components/Button";
import {
  registerUser,
  selectProfileLoading,
  selectProfileError,
  selectProfileSuccess,
} from "../features/profile/profileSlice";

const Register = () => {
  // États locaux pour gérer les champs du formulaire
  const [credentials, setCredentials] = useState({
    lastName: "",
    firstName: "",
    userName: "",
    email: "",
    password: "",
  });

  // Hooks pour accéder aux fonctions et store de Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);
  const success = useSelector(selectProfileSuccess);

  // Fonction pour gérer le changement des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.password) {
      alert("Password is required");
      return;
    }

    // Déclenche l'action d'inscription
    dispatch(registerUser(credentials));
  };

  // Utilise useEffect pour gérer les erreurs et succès
  useEffect(() => {
    if (success) {
      // Redirection après succès
      navigate("/login");
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) {
      alert(error); // Affiche l'erreur si elle existe
    }
  }, [error]);

  // Définition des placeholders pour chaque champ
  const placeholders = {
    lastName: "Cooper",
    firstName: "Angel",
    userName: "angelcooper",
    email: "example@gmail.com",
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {["lastName", "firstName", "userName", "email"].map((field) => (
            <div className="input-wrapper" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={credentials[field]}
                onChange={handleChange}
                required
                aria-label={field}
                placeholder={
                  placeholders[field] ||
                  field.charAt(0).toUpperCase() + field.slice(1)
                }
              />
            </div>
          ))}
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <PasswordInput
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <Button
            className="sign-in-button"
            type="submit"
            disabled={loading}
            aria-busy={loading}
          >
            Register
          </Button>
          <Link to="/login" aria-label="Login page">
            Already have an account? Log in
          </Link>
          {loading && (
            <p role="status" aria-live="polite">
              Loading...
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Register;
