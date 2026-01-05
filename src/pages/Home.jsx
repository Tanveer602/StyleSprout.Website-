import React, { useState } from "react";
import "./Home.css";

const productsData = [
  {
    id: 1,
    name: "Textured Johnny Collar Polo T-Shirt",
    price: 50,
    oldPrice: 60,
    rating: 5.6,
    image: "https://zellbury.com/cdn/shop/files/MPJ25004_blac_1.jpg?v=1760002898&width=823",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
     name: "Graphic Hoodie",
    price: 50,
    oldPrice: 55,
    rating: 5.3,
    image: "https://zellbury.com/cdn/shop/files/WWPH25001_4.jpg?v=1762864503&width=823",
    sizes: ["XS", "S", "M", ]
  },
   {
    id: 3,
    name: "Salwar kamze",
    price: 60,
    oldPrice: 65,
    rating: 5.1,
    image: "https://www.gulahmedshop.com/cdn/shop/files/basic_waistcoat_kwc-pd24-014_8.jpg?v=1758376644",
    sizes: ["4 Years", "6 Years", "8 Years", "10 Years" ,   ]
  },
  {
    id: 4,
    name: "Men Shoes",
    price: 60,
    oldPrice: 70,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    sizes: ["7", "8", "9", "10"]
  },
    {
    id: 5,
    name: "pink women's tunic",
    price: 45,
    oldPrice: 55,
    rating: 4.8,
    image: "https://zellbury.com/cdn/shop/files/Wws251285_8.jpg?v=1760095107&width=823",
    sizes: ["S", "M", "L", ]
  },
   {
    id: 6,
    name: "Junior Girls Tees",
    price: 50,
    oldPrice: 60,
    rating: 4.5,
    image: "https://www.gulahmedshop.com/cdn/shop/files/junior-girls-tees-color-pink-regular-fit-jg-ts-ss25-009-half-front.jpg?v=1758455899",
    sizes: ["3 to 4 Years", "5 to 6 Years", "7 to 8 Years", ]
  },
];

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="home-page">
      <div className="hero-video">
        <video autoPlay loop muted>
          <source src="https://media.istockphoto.com/id/1316773371/video/shopping-clothing-store-interior-modern-fashionable-shop-clothes-for-every-taste-stylish.mp4?s=mp4-640x640-is&k=20&c=1XHLA4eNvH0OpngnL0tqQpNDGtQOWFxIl5adl8JipOE=" type="video/mp4" />
        </video>
        <h1 className="hero-title">Welcome to StyleSprout
        </h1>
        
      </div>

    
      <div className="top-products">
        <h2>Top Products</h2>
        <div className="products-container grid-view">
          {productsData.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button
                  className="quick-view-btn"
                  onClick={() => openModal(product)}
                >
                  Quick View
                </button>
              </div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-rating">
                  <span className="stars">{product.rating} ★</span>
                </div>
                <div className="product-price">
                  <span className="current">${product.price}</span>
                  <span className="old">${product.oldPrice}</span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => openModal(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="quick-view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-content">
              
              <div className="product-gallery">
                <div className="main-image">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                  />
                </div>
              </div>

           
              <div className="product-details-modal">
                <h2 className="product-title">{selectedProduct.name}</h2>

                <div className="product-meta">
                  <span className="rating">Rating: {selectedProduct.rating} ★</span>
                  <span className="sku">SKU: #{selectedProduct.id}</span>
                </div>

                <div className="price-modal">
                  <span className="current">${selectedProduct.price}</span>
                  <span className="old">${selectedProduct.oldPrice}</span>
                </div>

               
                <div className="size-selector">
                  <h4>Choose Size</h4>
                  <div className="size-options">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${
                          selectedSize === size ? "selected" : ""
                        }`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <a href="#" className="size-guide-link">
                    Size Guide
                  </a>
                </div>

                
                <div className="add-to-cart-section">
                  <div className="quantity-selector-modal">
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={quantity}
                      className="qty-input"
                    />
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  <button className="add-to-cart-modal">Add to Cart</button>
                </div>

                <div className="product-meta-info">
                  <p>10 Days Return Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      
      <div className="shipping-bar">
        <div className="shipping-container">
          <div className="shipping-item">
            <span className="shipping-icon">🚚</span>
            <div className="shipping-text">
              <h4>Free Shipping</h4>
              <p>On orders over $50</p>
            </div>
          </div>
          
          <div className="shipping-item">
            <span className="shipping-icon">🔄</span>
            <div className="shipping-text">
              <h4>Easy Returns</h4>
              <p>10-Day Return Policy</p>
            </div>
          </div>
          
          <div className="shipping-item">
            <span className="shipping-icon">🔒</span>
            <div className="shipping-text">
              <h4>Secure Payment</h4>
              <p>100% Safe & Secure</p>
            </div>
          </div>
          
          <div className="shipping-item">
            <span className="shipping-icon">📞</span>
            <div className="shipping-text">
              <h4>24/7 Support</h4>
              <p>Always Here to Help</p>
            </div>
          </div>
        </div>
      </div>

      
      <footer className="footer">
        <div className="footer-container">
        
          <div className="footer-section">
            <div className="footer-brand">
              <h2 className="footer-logo">StyleSprout</h2>
              <p className="brand-tagline">Fashion for Everyone</p>
              <p className="footer-description">
                Your trusted destination for quality fashion products. 
                Shop the latest trends in men's, women's, and kids' fashion.
              </p>
            </div>
            
           
           
          </div>

         
          <div className="footer-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/Men">Men</a></li>
              <li><a href="/Women">Women</a></li>
              <li><a href="/kids">kids</a></li>
             
            </ul>
          </div>

         
          <div className="footer-section">
            <h3 className="section-title">Categories</h3>
            <ul className="footer-links">
              <li><a href="/men">Men's Fashion</a></li>
              <li><a href="/women">Women's Fashion</a></li>
              <li><a href="/kids">Kids & Toys</a></li>
              
            </ul>
          </div>

          
          <div className="footer-section">
            <h3 className="section-title">Get in Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p>123 Fashion Street</p>
                  <p>Style City, SC 10001</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <p>support@stylesprout.com</p>
                  <p>info@stylesprout.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <p>+1 (555) 123-4567</p>
                  <p>Mon-Sun: 9AM-9PM</p>
                </div>
              </div>
            </div>
            
           
            <div className="social-media">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <span>📘</span>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <span>📸</span>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <span>🐦</span>
                </a>
                <a href="#" className="social-icon" aria-label="Pinterest">
                  <span>📌</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} StyleSprout. All rights reserved.
            </p>
            <p className="footer-note">
              Prices are inclusive of all taxes. Free shipping on orders above $50.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
