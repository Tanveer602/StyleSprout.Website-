import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, setUser, cart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">StyleSprout</h2>
      
      {/* Hamburger Menu */}
      <div 
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <div className={`nav-center ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/men" onClick={closeMenu}>Men</Link>
        <Link to="/women" onClick={closeMenu}>Women</Link>
        <Link to="/kids" onClick={closeMenu}>Kids</Link>
        <Link to="/cart" onClick={closeMenu}>Cart ({cart ? cart.length : 0})</Link>
      </div>

      {/* Right Side (Auth/Profile) */}
      <div className="nav-right">
        {user ? (
          <div className="profile-container">
            <div 
              className="profile-button"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {user.name.split(" ")[0]} ⬇
            </div>
            {profileOpen && (
              <div className="profile-dropdown">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/signin" className="signin-btn">Sign In</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}