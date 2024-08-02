import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/userSlice";
import { selectUserStatus, selectUserError } from "../selectors/userSelectors";

const Register = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ lastName, firstName, userName, email, password }));
  };

  useEffect(() => {
    if (userStatus === "succeeded") {
      navigate("/login");
    }
  }, [userStatus, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              required
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              required
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="sign-in-button"
            type="submit"
            disabled={userStatus === "loading"}
          >
            Sign In
          </button>
          <Link to="/login">J'ai déjà un compte</Link>
          {userStatus === "loading" && <p>Loading...</p>}
          {userStatus === "failed" && userError && (
            <p className="error">{userError.message || "An error occurred"}</p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Register;
