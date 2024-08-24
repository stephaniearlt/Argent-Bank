import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import { selectUserToken } from "../reducers/userReducer";
import { selectUserName } from "../reducers/profileReducer";
import logo from "../assets/argentBankLogo.webp";

const Header = () => {
  // Envoi les actions au store
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Sélectionne les informations de l'utilisateur depuis le store
  const token = useSelector(selectUserToken); // Sélectionne le token
  const userName = useSelector(selectUserName); // Sélectionne le nom d'utilisateur

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i> {userName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
