import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { selectUserToken } from "../features/user/userSlice";
import { selectUserName } from "../features/profile/profileSlice";
import logo from "../assets/argentBankLogo.webp";

const Header = () => {
  // Envoi les actions au store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sélection des données depuis le store Redux
  const token = useSelector(selectUserToken); 
  const userName = useSelector(selectUserName); 

  const handleLogout = () => {
    dispatch(logoutUser()); 
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
