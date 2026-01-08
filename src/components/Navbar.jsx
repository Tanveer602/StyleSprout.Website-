import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, setUser, cart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [userOrders, setUserOrders] = useState([]);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showOrdersInfo, setShowOrdersInfo] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const hamburgerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current user:", user);
    console.log("Orders from localStorage:", JSON.parse(localStorage.getItem("orders") || "[]"));
  }, [user]);

  useEffect(() => {
    if (!user || !user.email) {
      console.log("No user found");
      setOrderCount(0);
      setUserOrders([]);
      return;
    }
    
    try {
      const ordersStr = localStorage.getItem("orders") || "[]";
      const allOrders = JSON.parse(ordersStr);
      
      console.log("All orders found:", allOrders.length);
      console.log("User email:", user.email.toLowerCase());
      
      const filteredOrders = allOrders.filter(order => {
        if (!order || !order.email) return false;
        return order.email.toLowerCase() === user.email.toLowerCase();
      });
      
      console.log("Filtered orders for user:", filteredOrders.length);
      console.log("Filtered orders:", filteredOrders);
      
      setOrderCount(filteredOrders.length);
      setUserOrders(filteredOrders);
      
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrderCount(0);
      setUserOrders([]);
    }
  }, [user]);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
        setShowProfileInfo(false);
        setShowOrdersInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
    setShowProfileInfo(false);
    setShowOrdersInfo(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOrderCount(0);
    setUserOrders([]);
    setProfileOpen(false);
    setMenuOpen(false);
    setShowProfileInfo(false);
    setShowOrdersInfo(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setProfileOpen(false);
    setShowProfileInfo(false);
    setShowOrdersInfo(false);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    setShowProfileInfo(false);
    setShowOrdersInfo(false);
  };

  // ✅ Create sample orders if none exist (FOR TESTING)
  const createSampleOrders = () => {
    if (!user || !user.email) return;
    
    const sampleOrders = [
      {
        orderId: `ORD${Date.now()}`,
        email: user.email,
        date: new Date().toISOString(),
        totalAmount: 2499.99,
        status: "Delivered",
        items: [
          { name: "Men's Casual Shirt", quantity: 1, price: 999.99 },
          { name: "Jeans", quantity: 2, price: 750.00 }
        ]
      },
      {
        orderId: `ORD${Date.now() - 86400000}`, 
        email: user.email,
        date: new Date(Date.now() - 86400000).toISOString(),
        totalAmount: 1599.50,
        status: "Processing",
        items: [
          { name: "Women's Dress", quantity: 1, price: 1599.50 }
        ]
      },
      {
        orderId: `ORD${Date.now() - 172800000}`, 
        email: user.email,
        date: new Date(Date.now() - 172800000).toISOString(),
        totalAmount: 3299.00,
        status: "Shipped",
        items: [
          { name: "Kids T-Shirt", quantity: 3, price: 499.00 },
          { name: "Sneakers", quantity: 1, price: 1799.00 }
        ]
      }
    ];
    

    localStorage.setItem("orders", JSON.stringify(sampleOrders));
    console.log("Sample orders created:", sampleOrders);
    
    
    setOrderCount(3);
    setUserOrders(sampleOrders);
  };

  
  const clearOrders = () => {
    localStorage.removeItem("orders");
    setOrderCount(0);
    setUserOrders([]);
    console.log("Orders cleared");
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recent";
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return "Recent";
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="logo-link" onClick={closeAllMenus}>
            <h1 className="logo">StyleSprout</h1>
          </Link>

          <button
            ref={hamburgerRef}
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div
            ref={menuRef}
            className={`nav-center ${menuOpen ? "open" : ""}`}
          >
            <div className="nav-links">
              <Link to="/" className="nav-link" onClick={closeAllMenus}>
                Home
              </Link>
              <Link to="/men" className="nav-link" onClick={closeAllMenus}>
                Men
              </Link>
              <Link to="/women" className="nav-link" onClick={closeAllMenus}>
                Women
              </Link>
              <Link to="/kids" className="nav-link" onClick={closeAllMenus}>
                Kids
              </Link>
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
                >
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name.split(" ")[0]}</span>
                  <i
                    className={`fas fa-chevron-${profileOpen ? "up" : "down"}`}
                  ></i>
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-menu">
                     
                      <div className="debug-buttons" style={{ padding: '8px 16px', borderBottom: '1px solid #eee' }}>
                        <button 
                          onClick={createSampleOrders}
                          style={{ 
                            fontSize: '10px', 
                            padding: '4px 8px', 
                            marginRight: '8px',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          + Add Sample Orders
                        </button>
                        <button 
                          onClick={clearOrders}
                          style={{ 
                            fontSize: '10px', 
                            padding: '4px 8px',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Clear Orders
                        </button>
                      </div>

                      
                      <div className="profile-section">
                        <button
                          className="dropdown-item toggle-btn"
                          onClick={() => {
                            setShowProfileInfo(!showProfileInfo);
                            setShowOrdersInfo(false);
                          }}
                        >
                          <i className="fas fa-user-circle"></i> 
                          <span>My Profile</span>
                          <i className={`fas fa-chevron-${showProfileInfo ? 'up' : 'down'}`}></i>
                        </button>
                        
                        {showProfileInfo && (
                          <div className="info-content">
                            <div className="user-info">
                              <div className="user-name-bold">{user.name}</div>
                              <div className="user-email">{user.email}</div>
                              <div className="orders-count">
                                Total Orders: <span className="count">{orderCount}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      
                      <div className="profile-section">
                        <button
                          className="dropdown-item toggle-btn"
                          onClick={() => {
                            setShowOrdersInfo(!showOrdersInfo);
                            setShowProfileInfo(false);
                          }}
                        >
                          <i className="fas fa-box"></i> 
                          <span>My Orders</span>
                          <div className="order-indicator">
                            {orderCount > 0 && (
                              <span className="order-count-badge">{orderCount}</span>
                            )}
                            <i className={`fas fa-chevron-${showOrdersInfo ? 'up' : 'down'}`}></i>
                          </div>
                        </button>
                        
                        {showOrdersInfo && (
                          <div className="orders-content">
                            <div className="orders-header">
                              <span>Recent Orders ({orderCount})</span>
                            </div>
                            
                            {userOrders.length === 0 ? (
                              <div className="no-orders">
                                <i className="fas fa-shopping-bag"></i>
                                <p>No orders yet</p>
                                <div style={{ fontSize: '11px', color: '#999', marginTop: '8px' }}>
                                  Click "Add Sample Orders" above to test
                                </div>
                                <Link to="/" onClick={closeAllMenus} className="shop-now-btn">
                                  Shop Now
                                </Link>
                              </div>
                            ) : (
                              <>
                                <div className="orders-list">
                                  {userOrders.slice(0, 3).map((order, index) => (
                                    <div key={index} className="order-card">
                                      <div className="order-header">
                                        <div className="order-id">Order #{order.orderId || `ORD${index + 1}`}</div>
                                        <div className={`order-status ${order.status?.toLowerCase() || 'processing'}`}>
                                          {order.status || 'Processing'}
                                        </div>
                                      </div>
                                      <div className="order-details">
                                        <div className="order-date">
                                          <i className="far fa-calendar"></i>
                                          {formatDate(order.date || new Date())}
                                        </div>
                                        <div className="order-total">
                                          <i className="fas fa-rupee-sign"></i>
                                          {order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                                        </div>
                                      </div>
                                      {order.items && order.items.length > 0 && (
                                        <div className="order-items">
                                          {order.items.slice(0, 2).map((item, i) => (
                                            <div key={i} className="order-item-preview">
                                              <span className="item-name">{item.name || 'Item'}</span>
                                              <span className="item-qty">x{item.quantity || 1}</span>
                                            </div>
                                          ))}
                                          {order.items.length > 2 && (
                                            <div className="more-items">+{order.items.length - 2} more items</div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                
                                {userOrders.length > 3 && (
                                  <Link to="/orders" onClick={closeAllMenus} className="view-all-orders">
                                    View All Orders ({userOrders.length})
                                    <i className="fas fa-arrow-right"></i>
                                  </Link>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>

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
                <Link
                  to="/signin"
                  className="signin-btn"
                  onClick={closeAllMenus}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="signup-btn"
                  onClick={closeAllMenus}
                >
                  Sign Up
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