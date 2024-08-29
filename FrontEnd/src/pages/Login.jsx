import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../utils/PasswordInput";
import Button from "../components/Button";
import { selectUserToken, selectUserLoading, selectUserError } from "../features/user/userSlice";
import { getStorageData, setStorageData } from "../utils/TimeStorage";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  // Envoi des actions au store Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sélection des données depuis le store Redux
  const token = useSelector(selectUserToken);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  // Redirection basée sur le token de Redux
  useEffect(() => {
    if (token) {
      navigate("/profile");
    } else {
      // Récupération des informations depuis le stockage
      const savedEmail = getStorageData("email");
      const savedPassword = getStorageData("password");
      if (savedEmail && savedPassword) {
        setCredentials({ email: savedEmail, password: savedPassword });
        setRememberMe(true); // Coche automatiquement la case si les données sont présentes
      }
    }
  }, [token, navigate]);

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      setStorageData("email", credentials.email);
      setStorageData("password", credentials.password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (error) {
      alert(error);
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
              onChange={() => setRememberMe((prev) => !prev)}
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
