import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/argentBankLogo.png";
import { logoutUser, profileUser } from "../store/slices/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  console.log("User object:", user);
  const dispatch = useDispatch();
  const token = user?.token;

  useEffect(() => {
    // Fetch user details if token exists
    if (token) {
      dispatch(profileUser(token));
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logoutUser());
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
        {user ? (
          <>
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i> {user.firstName || "User"}
            </span>
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
