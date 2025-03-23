// frontend/src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

function Carousel({ title, filterTag, products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5; // Display five products at a time
  const cardWidth = 300;  // Must match product card width in CSS
  const gap = 20;         // Gap between cards in px

  // Filter products by the given tag (ensure categories is always an array)
  const filtered = products.filter(
    (p) => Array.isArray(p.categories) && p.categories.includes(filterTag)
  );
  const maxIndex = Math.max(0, filtered.length - visibleCount);

  const prev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleProducts = filtered.slice(currentIndex, currentIndex + visibleCount);

  if (filtered.length === 0) return null;

  return (
    <div className="carousel-section">
      <div className="carousel-header">
        <h2>{title}</h2>
        <div className="carousel-arrows">
          <button 
            className="carousel-arrow left" 
            onClick={prev} 
            title="Previous" 
            disabled={currentIndex === 0}
          >
            <i className="bi bi-arrow-left-circle"></i>
          </button>
          <button 
            className="carousel-arrow right" 
            onClick={next} 
            title="Next" 
            disabled={currentIndex >= maxIndex}
          >
            <i className="bi bi-arrow-right-circle"></i>
          </button>
        </div>
      </div>
      <div className="carousel-container">
        <div 
          className="carousel-items" 
          style={{ transform: `translateX(-${currentIndex * (cardWidth + gap)}px)` }}
        >
          {visibleProducts.map(product => {
            const imageUrl = product.image.startsWith('/')
              ? `http://localhost:5000${product.image}`
              : product.image;
            return (
              <div className="product-card" key={product._id}>
                <img
                  src={imageUrl}
                  alt={product.name}
                  onError={(e) => {
                    if (e.target.src !== 'http://localhost:5000/images/placeholder.png') {
                      e.target.onerror = null;
                      e.target.src = 'http://localhost:5000/images/placeholder.png';
                    }
                  }}
                />
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <Link to={`/product/${product._id}`} className="details-btn">
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Read the search keyword from the URL query string.
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const keyword = queryParams.get('keyword') ? queryParams.get('keyword').toLowerCase() : '';

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter products based on the keyword (if any)
  const filteredProducts = keyword
    ? products.filter(product =>
        product.name.toLowerCase().includes(keyword)
      )
    : products;

  return (
    <div className="home-container">
      {/* Removed extra "Games" title */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <Carousel title="Discover New" filterTag="Discover New" products={filteredProducts} />
          <Carousel title="Featured Discounts" filterTag="Featured Discounts" products={filteredProducts} />
          <Carousel title="Free Games" filterTag="Free Games" products={filteredProducts} />
          <Carousel title="Trending Games" filterTag="Trending Games" products={filteredProducts} />
          <Carousel title="New Releases" filterTag="New Releases" products={filteredProducts} />
          <Carousel title="Top Sellers" filterTag="Top Sellers" products={filteredProducts} />
          <Carousel title="Most Played" filterTag="Most Played" products={filteredProducts} />
          <Carousel title="Most popular" filterTag="Most popular" products={filteredProducts} />
        </>
      )}
    </div>
  );
}

export default Home;
