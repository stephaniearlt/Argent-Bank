import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { selectUserToken } from "./features/user/userSlice";
import "./styles/style.scss";

function App() {
  const token = useSelector(selectUserToken);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/profile" replace /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" replace />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
