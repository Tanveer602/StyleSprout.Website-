
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, setUser, cart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setProfileOpen(false);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="logo-link" onClick={closeAllMenus}>
            <h1 className="logo">
              
              StyleSprout
            </h1>
          </Link>

          
          <button 
            ref={hamburgerRef}
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

        
          <div ref={menuRef} className={`nav-center ${menuOpen ? "open" : ""}`}>
            <div className="nav-links">
              <Link to="/" className="nav-link" onClick={closeAllMenus}>
                <i className="fas fa-home"></i> 
                <span className="link-text">Home</span>
              </Link>
              <Link to="/men" className="nav-link" onClick={closeAllMenus}>
                <i className="fas fa-male"></i>
                <span className="link-text">Men</span>
              </Link>
              <Link to="/women" className="nav-link" onClick={closeAllMenus}>
                <i className="fas fa-female"></i>
                <span className="link-text">Women</span>
              </Link>
              <Link to="/kids" className="nav-link" onClick={closeAllMenus}>
                <i className="fas fa-child"></i>
                <span className="link-text">Kids</span>
              </Link>
              
             
              <Link to="/cart" className="nav-link mobile-cart" onClick={closeAllMenus}>
                <i className="fas fa-shopping-cart"></i>
                <span className="link-text">
                  Cart 
                  <span className="cart-count-mobile">
                    ({cart ? cart.length : 0})
                  </span>
                </span>
              </Link>
              
             
              {!user ? (
                <>
                  <Link to="/signin" className="nav-link mobile-auth" onClick={closeAllMenus}>
                    <i className="fas fa-sign-in-alt"></i>
                    <span className="link-text">Sign In</span>
                  </Link>
                  <Link to="/signup" className="nav-link mobile-auth signup-mobile" onClick={closeAllMenus}>
                    <i className="fas fa-user-plus"></i>
                    <span className="link-text">Sign Up</span>
                  </Link>
                </>
              ) : (
                <div className="mobile-user-info">
                  <div className="mobile-user-header">
                    <div className="mobile-user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" className="nav-link mobile-profile" onClick={closeAllMenus}>
                    <i className="fas fa-user-circle"></i>
                    <span className="link-text">My Profile</span>
                  </Link>
                  <Link to="/orders" className="nav-link mobile-profile" onClick={closeAllMenus}>
                    <i className="fas fa-box"></i>
                    <span className="link-text">My Orders</span>
                  </Link>
                  <Link to="/wishlist" className="nav-link mobile-profile" onClick={closeAllMenus}>
                    <i className="fas fa-heart"></i>
                    <span className="link-text">Wishlist</span>
                  </Link>
                  <button onClick={handleLogout} className="nav-link mobile-logout">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="link-text">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

         
          <div className="nav-right">
         
            <Link to="/cart" className="cart-icon-link" onClick={closeAllMenus}>
              <i className="fas fa-shopping-cart"></i>
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </Link>
            
       
            {user ? (
              <div ref={profileRef} className="profile-container">
                <button 
                  className="profile-button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="User profile"
                  aria-expanded={profileOpen}
                >
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name.split(" ")[0]}</span>
                  <i className={`fas fa-chevron-${profileOpen ? "up" : "down"}`}></i>
                </button>
                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <div className="profile-avatar-large">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="profile-info">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="profile-menu">
                      <Link to="/profile" className="dropdown-item" onClick={closeAllMenus}>
                        <i className="fas fa-user-circle"></i> My Profile
                      </Link>
                      <Link to="/orders" className="dropdown-item" onClick={closeAllMenus}>
                        <i className="fas fa-box"></i> My Orders
                      </Link>
                      <Link to="/wishlist" className="dropdown-item" onClick={closeAllMenus}>
                        <i className="fas fa-heart"></i> Wishlist
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button onClick={handleLogout} className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/signin" className="signin-btn" onClick={closeAllMenus}>
                  <i className="fas fa-sign-in-alt"></i> 
                  <span className="btn-text">Sign In</span>
                </Link>
                <Link to="/signup" className="signup-btn" onClick={closeAllMenus}>
                  <i className="fas fa-user-plus"></i> 
                  <span className="btn-text">Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      

      {menuOpen && <div className="menu-overlay" onClick={closeAllMenus}></div>}
    </>
  );
}