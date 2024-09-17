import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../utils/PasswordInput";
import Button from "../components/Button";
import {
  registerUser,
  selectProfileError,
  selectProfileStatus,
} from "../features/profile/profileSlice"; 

const Register = () => {
  const [credentials, setCredentials] = useState({
    lastName: "",
    firstName: "",
    userName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectProfileError);
  const status = useSelector(selectProfileStatus);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.password) {
      alert("Password is required");
      return;
    }
    dispatch(registerUser(credentials));
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login"); 
    }
  }, [status, navigate]);

  useEffect(() => {
    if (error) {
      alert(error); 
    }
  }, [error]);

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
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            Register
          </Button>
          <Link to="/login" aria-label="Login page">
            Already have an account? Log in
          </Link>
          {status === "loading" && (
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
