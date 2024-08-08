import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/userSlice";
import {
  selectUserStatus,
  selectUserToken,
  selectUserError,
} from "../selectors/userSelectors";
import { saveToken } from "../utils/tokenManager";
import PasswordInput from "../utils/PasswordInput";
import Button from "../components/Button";

const Login = () => {
  // États locaux pour gérer les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Hooks pour accéder aux fonctions et store de Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectUserToken);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  // Vérifie comment, et si, le token est déjà stocké
  useEffect(() => {
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken) {
      navigate("/profile");
    }
  }, [navigate]);

  // Soumission du formulaire de connexion
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, rememberMe }));
  };

  // Vérifie l'état de connexion et le token après connexion
  useEffect(() => {
    if (userStatus === "succeeded" && token) {
      saveToken(token, rememberMe);
      navigate("/profile");
    }
  }, [userStatus, token, navigate, rememberMe]);

  // Fonction pour basculer l'état "se souvenir de moi"
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // Fonction pour gérer l'accessibilité de "se souvenir de moi"
  const handleKeyDownRememberMe = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRememberMe();
    }
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMe}
              aria-label="Remember me"
              onKeyDown={handleKeyDownRememberMe}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Button className="sign-in-button" type="submit" disabled={userStatus === "loading"} aria-busy={userStatus === "loading"}>
            Sign In
          </Button>
          <Link to="/register" aria-label="Register page">No account</Link>
          {userStatus === "loading" && <p role="status" aria-live="polite">Loading...</p>}
          {userStatus === "failed" && userError && <p className="error" role="alert">{userError.message || "An error occurred"}</p>}
        </form>
      </section>
    </main>
  );
};

export default Login;