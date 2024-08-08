import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/userSlice";
import { selectUserStatus, selectUserError } from "../selectors/userSelectors";
import PasswordInput from "../utils/PasswordInput";
import Button from "../components/Button";

const Register = () => {
  // États locaux pour gérer les champs du formulaire
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hooks pour accéder aux fonctions et store de Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Déclenche l'action pour registrer les données du formulaire
    dispatch(registerUser({ lastName, firstName, userName, email, password }));
  };

  // Vérifie le statut de l'utilisateur et redirige si l'inscription est réussie
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
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              ria-label="Lastname"
              placeholder="Angel"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="sign-in-button"
            type="submit"
            disabled={userStatus === "loading"}
            aria-busy={userStatus === "loading"}
          >
            Register
          </Button>
          <Link to="/login" aria-label="Login page">
            Account
          </Link>
          {userStatus === "loading" && (
            <p role="status" aria-live="polite">
              Loading...
            </p>
          )}
          {userStatus === "failed" && userError && (
            <p className="error" role="alert">
              {userError.message || "An error occurred"}
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Register;
