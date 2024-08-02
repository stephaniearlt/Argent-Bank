import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/userSlice";
import {
  selectUserStatus,
  selectUserToken,
  selectUserError,
} from "../selectors/userSelectors";
import { saveToken } from "../utils/tokenManager";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectUserToken);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, rememberMe }));
  };

  useEffect(() => {
    if (userStatus === "succeeded" && token) {
      saveToken(token, rememberMe);
      navigate("/profile");
    }
  }, [userStatus, token, navigate, rememberMe]);

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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
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
          <Link to="/register">Je n'ai pas de compte</Link>
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
