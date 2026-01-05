import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/kids";
import Cart from "./pages/cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    
   
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
     
      const productKey = product.selectedSize 
        ? `${product.id}-${product.selectedSize}`
        : `${product.id}`;
      
      const existingItemIndex = prevCart.findIndex(item => {
        const itemKey = item.selectedSize 
          ? `${item.id}-${item.selectedSize}`
          : `${item.id}`;
        return itemKey === productKey;
      });
      
      if (existingItemIndex !== -1) {
      
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + (product.quantity || 1)
        };
        return updatedCart;
      } else {
        
        return [...prevCart, { 
          ...product, 
          quantity: product.quantity || 1 
        }];
      }
    });
  };

  const removeFromCart = (id, selectedSize = null) => {
    setCart(prevCart => {
      if (selectedSize) {
       
        return prevCart.filter(item => 
          !(item.id === id && item.selectedSize === selectedSize)
        );
      } else {
        
        return prevCart.filter(item => item.id !== id);
      }
    });
  };

  const updateQuantity = (id, selectedSize = null, change) => {
    setCart(prevCart => 
      prevCart.map(item => {
        
        const isTargetItem = selectedSize 
          ? (item.id === id && item.selectedSize === selectedSize)
          : (item.id === id);
        
        if (isTargetItem) {
          const newQuantity = item.quantity + change;
          if (newQuantity < 1) return item; 
          if (newQuantity > 20) return item; 
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} cart={cart} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men addToCart={addToCart} />} />
        <Route path="/women" element={<Women addToCart={addToCart} />} />
        <Route path="/kids" element={<Kids addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
            />
          } 
        />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
