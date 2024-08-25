import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../utils/PasswordInput";
import Button from "../components/Button";
import {
  selectUserToken,
  selectUserLoading,
  selectUserError,
} from "../features/user/userSlice";

const Login = () => {
  // États locaux pour gérer les champs du formulaire
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(
    () => localStorage.getItem("rememberMe") === "true"
  );

  // Hooks pour accéder aux fonctions et store de Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectUserToken);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  // Hook lorsque le composant est monté ou lorsque la valeur de token ou navigate change
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  // Fonction qui gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs du formulaire
    if (!credentials.email || !credentials.password) {
      // Affiche un message d'erreur pour les champs manquants
      alert("Please fill in both email and password.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    dispatch(login({ ...credentials, rememberMe }));
  };

  useEffect(() => {
    if (error) {
      alert(error); // Affiche l'erreur si elle existe
    }
  }, [error]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
              aria-label="Email address"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <PasswordInput
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              name="password"
              aria-label="Password input"
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              aria-label="Remember me option"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Button
            className="sign-in-button"
            type="submit"
            disabled={loading}
            aria-busy={loading}
          >
            Sign In
          </Button>
          <Link to="/register" aria-label="Go to registration page">
            No account? Register here
          </Link>
          {loading && (
            <p role="status" aria-live="assertive">
              Loading...
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Login;