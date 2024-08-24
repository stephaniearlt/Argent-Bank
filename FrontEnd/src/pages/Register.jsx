import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../utils/PasswordInput";
import Button from "../components/Button";
import { registerUser } from "../actions/profileActions";
import { selectUserLoading, selectUserError } from "../reducers/userReducer";

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
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  // Fonction pour gérer le changement des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Déclenche l'action d'inscription
    dispatch(registerUser(credentials));
    // Redirection après inscription réussie
    navigate("/login");
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              name="lastName"
              value={credentials.lastName}
              onChange={handleChange}
              required
              aria-label="Lastname"
              placeholder="Angel"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              name="firstName"
              value={credentials.firstName}
              onChange={handleChange}
              required
              aria-label="Firstname"
              placeholder="Cooper"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="userName"
              value={credentials.userName}
              onChange={handleChange}
              required
              aria-label="Username"
              placeholder="Angel"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              aria-label="Email address"
              placeholder="example@gmail.com"
            />
          </div>
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
            Account
          </Link>
          {loading && (
            <p role="status" aria-live="polite">
              Loading...
            </p>
          )}
          {error && (
            <p className="error" role="alert">
              {error.message || "An error occurred"}
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Register;
