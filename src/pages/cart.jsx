import React, { useState } from "react";
import "../styles/cart.css";

export default function Cart({ cart, removeFromCart, updateQuantity, clearCart }) {
  const [showDeliveryMessage, setShowDeliveryMessage] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    setShowDeliveryMessage(true);
  };

  const confirmOrder = () => {
    const newOrderId = `ORD${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;

    setOrderId(newOrderId);
    setOrderConfirmed(true);
    setShowDeliveryMessage(false);
    clearCart();
  };

  const closeMessage = () => {
    setShowDeliveryMessage(false);
  };

  const closeConfirmation = () => {
    setOrderConfirmed(false);
    setOrderId("");
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {/* ✅ ORDER CONFIRMATION MESSAGE */}
      {orderConfirmed && (
        <div className="order-success-box">
          <div className="order-success-icon">🎉</div>
          <h3 className="order-success-title">Order Confirmed!</h3>
          <p className="order-success-text">
            Thank you for shopping with us.
          </p>
          <p className="order-success-subtext">
            Your order <strong>{orderId}</strong> has been placed successfully.
          </p>
          <p className="order-success-delivery">
            📦 Delivery within <strong>3 working days</strong>
          </p>
          <button
            className="order-success-btn"
            onClick={closeConfirmation}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {!orderConfirmed && cart.length === 0 && (
        <p className="empty-cart">Your cart is empty</p>
      )}

      {!orderConfirmed && cart.length > 0 && (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div
                className="cart-item"
                key={`${item.id}-${item.selectedSize || "nosize"}-${index}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  {item.selectedSize && (
                    <p>
                      Size: <strong>{item.selectedSize}</strong>
                    </p>
                  )}
                  <p>
                    Price: <strong>${item.price}</strong>
                  </p>

                  <div className="cart-quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.selectedSize, -1)
                      }
                      className="cart-qty-btn"
                    >
                      −
                    </button>
                    <span className="cart-qty-display">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.selectedSize, 1)
                      }
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                  </div>

                  <p className="item-total">
                    Item Total:{" "}
                    <strong>
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id, item.selectedSize)
                  }
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>
              Total Items: <strong>{getTotalItems()}</strong>
            </p>
            <p>
              Grand Total:{" "}
              <strong>${calculateTotal().toFixed(2)}</strong>
            </p>

            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>
              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to Checkout (${calculateTotal().toFixed(2)})
              </button>
            </div>
          </div>
        </>
      )}

      {showDeliveryMessage && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <h3 className="checkout-title">Delivery Information</h3>

            <p className="checkout-text">
              Your order will be delivered within{" "}
              <strong>3 working days</strong>.
            </p>

            <div className="checkout-summary">
              <p>
                <strong>Total Items:</strong> {getTotalItems()}
              </p>
              <p>
                <strong>Total Amount:</strong> $
                {calculateTotal().toFixed(2)}
              </p>
            </div>

            <div className="checkout-buttons">
              <button
                onClick={confirmOrder}
                className="checkout-confirm-btn"
              >
                ✅ Confirm Order
              </button>
              <button
                onClick={closeMessage}
                className="checkout-cancel-btn"
              >
                ✗ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
