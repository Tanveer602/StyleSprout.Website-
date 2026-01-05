import React, { useState, useEffect } from "react";
import menProducts from "../data/menproducts";
import "../styles/men.css";

export default function Men({ addToCart }) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  
 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(menProducts);
  const [viewMode, setViewMode] = useState("grid"); 
  
  useEffect(() => {
    const initialSizes = {};
    const initialQuantities = {};
    
    menProducts.forEach(product => {
      if (product.sizes && product.sizes.length > 0) {
        initialSizes[product.id] = product.sizes[0];
      }
      initialQuantities[product.id] = 1;
    });
    
    setSelectedSizes(initialSizes);
    setSelectedQuantities(initialQuantities);
  }, []);


  const categories = ["All", ...new Set(menProducts.map(product => product.category || "Men"))];

 
  useEffect(() => {
    let results = [...menProducts];

   
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== "All") {
      results = results.filter(product =>
        (product.category || "Men") === selectedCategory
      );
    }


    results = results.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

   
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        
        results.sort((a, b) => b.id - a.id);
        break;
      default:
        
        break;
    }

    setFilteredProducts(results);
  }, [searchTerm, sortBy, priceRange, selectedCategory]);

  const showAlert = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuantityChange = (productId, change) => {
    setSelectedQuantities((prev) => {
      const currentQty = prev[productId] || 1;
      const newQty = currentQty + change;
      
      if (newQty < 1) return prev;
      if (newQty > 10) {
        showAlert("Maximum quantity is 10");
        return prev;
      }
      
      return { ...prev, [productId]: newQty };
    });
  };

  const openModal = (product) => {
    setCurrentProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleAddToCart = () => {
    if (!currentProduct) return;
    
    const size = selectedSizes[currentProduct.id] || 
                 (currentProduct.sizes ? currentProduct.sizes[0] : null);
    const quantity = selectedQuantities[currentProduct.id] || 1;
    
    const cartItem = {
      ...currentProduct,
      selectedSize: size,
      quantity: quantity
    };
    
    addToCart(cartItem);
    showAlert(`${quantity}x ${currentProduct.name} added to cart!`);
    closeModal();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("featured");
    setPriceRange([0, 1000]);
    setSelectedCategory("All");
  };

 
  const maxPrice = Math.max(...menProducts.map(p => p.price));

  return (
    <div className="men-page">
      
      {showMessage && (
        <div className="alert-message">
          {message}
        </div>
      )}
      
     

      
      <div className="page-header">
        <h1>Men's Collection</h1>
        <p className="page-subtitle">Discover our premium collection of men's fashion</p>
      </div>

      
      <div className="page-content">
        
        <aside className="sidebar">
       
          <div className="sidebar-widget">
            <h3 className="widget-title">Search</h3>
            <div className="search-widget">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>

         
          <div className="sidebar-widget">
            <h3 className="widget-title">Categories</h3>
            <ul className="category-list">
              {categories.map(category => (
                <li key={category}>
                  <button
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    <span className="category-count">
                      ({category === "All" ? menProducts.length : 
                        menProducts.filter(p => (p.category || "Men") === category).length})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="sidebar-widget">
            <h3 className="widget-title">Filter by Price</h3>
            <div className="price-filter">
              <div className="price-slider-container">
                <div className="slider-track"></div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="range-slider min-slider"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="range-slider max-slider"
                />
              </div>
              <div className="price-inputs">
                <div className="price-input">
                  <span>$</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    min="0"
                    max={maxPrice}
                  />
                </div>
                <span className="price-separator">-</span>
                <div className="price-input">
                  <span>$</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    min="0"
                    max={maxPrice}
                  />
                </div>
              </div>
            </div>
          </div>

   
          <div className="filter-buttons">
            <button className="apply-filters" onClick={() => {}}>
              Apply Filters
            </button>
            <button className="clear-filters" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        </aside>

       
        <main className="products-main">
        
          <div className="products-toolbar">
            <div className="toolbar-left">
              <p className="products-count">
                Showing <strong>{filteredProducts.length}</strong> of <strong>{menProducts.length}</strong> products
              </p>
            </div>
            <div className="toolbar-right">
              
              <div className="sort-by">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          
          <div className={`products-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
                <button onClick={clearFilters} className="reset-btn">
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div className="product-item" key={product.id}>
                  
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    
                   
                    {product.sale && (
                      <span className="product-badge sale">SALE</span>
                    )}
                    {product.new && (
                      <span className="product-badge new">NEW</span>
                    )}
                    {product.popular && (
                      <span className="product-badge popular">HOT</span>
                    )}

                  
                    <button 
                      className="quick-view-btn"
                      onClick={() => openModal(product)}
                      title="Quick View"
                    >
                      👁 Quick View
                    </button>
                  </div>

                
                  <div className="product-info">
                    <div className="product-category">{product.category || "Men"}</div>
                    <h3 className="product-name">{product.name}</h3>
                    
                   
                    <div className="product-rating">
                      <div className="stars">
                        {"★".repeat(5)}
                        <span className="rating-text">(0)</span>
                      </div>
                    </div>

                    <div className="product-price">
                      <span className="current-price">${product.price}</span>
                      {product.oldPrice && (
                        <span className="old-price">${product.oldPrice}</span>
                      )}
                    </div>

                   
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => openModal(product)}
                    >
                      <span className="cart-icon">🛒</span>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>


      {modalOpen && currentProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-content">
          
              <div className="product-gallery">
                <div className="main-image">
                  <img src={currentProduct.image} alt={currentProduct.name} />
                </div>
                <div className="image-thumbnails">
                  <div className="thumbnail active">
                    <img src={currentProduct.image} alt="Thumbnail" />
                  </div>
                 
                </div>
              </div>

              <div className="product-details-modal">
                <h2 className="product-title">{currentProduct.name}</h2>
                
               
                <div className="product-meta">
                  <div className="rating">
                    {"★".repeat(5)}
                    <span className="review-count">(0 reviews)</span>
                  </div>
                  <div className="sku">SKU: N/A</div>
                </div>

              
                <div className="price-modal">
                  <span className="current">${currentProduct.price}</span>
                  {currentProduct.oldPrice && (
                    <span className="old">${currentProduct.oldPrice}</span>
                  )}
                </div>

              
                <div className="description">
                  <p>{currentProduct.description || "High-quality men's product. Comfortable, durable, and stylish."}</p>
                </div>

              
                {currentProduct.sizes && currentProduct.sizes.length > 0 && (
                  <div className="size-selector">
                    <h4>Size:</h4>
                    <div className="size-options">
                      {currentProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className={`size-option ${selectedSizes[currentProduct.id] === size ? 'selected' : ''}`}
                          onClick={() => handleSizeChange(currentProduct.id, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <a href="#size-guide" className="size-guide-link">Size Guide</a>
                  </div>
                )}

                
                <div className="add-to-cart-section">
                  <div className="quantity-selector-modal">
                    <button 
                      className="qty-btn minus"
                      onClick={() => handleQuantityChange(currentProduct.id, -1)}
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      value={selectedQuantities[currentProduct.id] || 1}
                      readOnly
                      className="qty-input"
                    />
                    <button 
                      className="qty-btn plus"
                      onClick={() => handleQuantityChange(currentProduct.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="add-to-cart-modal"
                    onClick={handleAddToCart}
                  >
                    <span className="cart-icon">🛒</span>
                    Add to Cart
                  </button>
                </div>

               
                <div className="product-meta-info">
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{currentProduct.category || "Men"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Tags:</span>
                    <span className="meta-value">Fashion, Men, Clothing</span>
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}