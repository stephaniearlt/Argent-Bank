import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, profileUser } from "../store/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (userStatus === "succeeded" && user?.token) {
      // Récupération des détails de l'utilisateur après connexion
      dispatch(profileUser(user.token));
    }
  }, [userStatus, dispatch, user?.token]);

  useEffect(() => {
    if (userStatus === "succeeded" && user?.firstName) {
      navigate("/profile");
    }
  }, [userStatus, navigate, user?.firstName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            type="submit"
            disabled={userStatus === "loading"}
          >
            Sign In
          </button>
          {userStatus === "loading" && <p>Loading...</p>}
          {userStatus === "failed" && userError && (
            <p className="error">{userError.message || "An error occurred"}</p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Login;
