import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

export default function Checkout({ cart, user }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (user) {
      setForm({ ...form, name: user.name });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please Sign In or Sign Up to place an order!");
      navigate("/signin");
      return;
    }

    for (let key in form) {
      if (form[key].trim() === "") {
        alert(`Please fill ${key}`);
        return;
      }
    }

    alert(
      `Order placed successfully! ✅\nParcel will be delivered to:\n${form.address}, ${form.city}, ${form.country}`
    );

    navigate("/");
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * (item.qty || 1), 0);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <div className="checkout-container">
          <div className="checkout-form">
            <h3>Delivery Details</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                required
              />
              <button type="submit" className="place-order-btn">
                Place Order (${totalPrice.toFixed(2)})
              </button>
            </form>
          </div>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>
                  {item.name} x {item.qty || 1}
                </span>
                <span>${(item.price * (item.qty || 1)).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
