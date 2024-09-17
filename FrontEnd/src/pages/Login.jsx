import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import {
  selectLoginStatus,
  selectLoginError,
} from "../features/user/userSlice";
import Button from "../components/Button";
import PasswordInput from "../utils/PasswordInput";

const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ credentials, rememberMe }));
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
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            Sign In
          </Button>
          <Link to="/register" aria-label="Go to registration page">
            No account? Register here
          </Link>
          {status === "loading" && (
            <p role="status" aria-live="assertive">
              Loading...
            </p>
          )}
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default Login;
