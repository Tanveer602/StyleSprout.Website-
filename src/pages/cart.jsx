
import React from "react";
import "../styles/cart.css";

export default function Cart({ cart, removeFromCart, updateQuantity, clearCart }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={`${item.id}-${item.selectedSize || 'nosize'}-${index}`}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  {item.selectedSize && <p>Size: <strong>{item.selectedSize}</strong></p>}
                  <p>Price: <strong>${item.price}</strong></p>
                  
                  {/* QUANTITY CONTROLS IN CART */}
                  <div className="cart-quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                      className="cart-qty-btn"
                    >
                      −
                    </button>
                    <span className="cart-qty-display">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="item-total">Item Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <div className="summary-details">
              <p>Total Items: <strong>{getTotalItems()}</strong></p>
              <p>Total Products: <strong>{cart.length}</strong></p>
              <p className="grand-total">Grand Total: <strong>${calculateTotal().toFixed(2)}</strong></p>
            </div>
            
            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>
              <button className="checkout-btn">
                Proceed to Checkout (${calculateTotal().toFixed(2)})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}