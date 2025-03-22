// frontend/src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

function Carousel({ title, products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5; // Show five products at a time
  const cardWidth = 300;  // Width of each product card in px (must match CSS)
  const gap = 20;         // Gap between product cards in px

  const prev = () => {
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const next = () => {
    setCurrentIndex(prevIndex => Math.min(products.length - visibleCount, prevIndex + 1));
  };

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
            disabled={currentIndex >= products.length - visibleCount}
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
          {products.map(product => {
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

  // For demonstration, split filteredProducts into two groups for two carousels.
  const halfIndex = Math.ceil(filteredProducts.length / 2);
  const trendingGames = filteredProducts.slice(0, halfIndex);
  const newReleases = filteredProducts.slice(halfIndex);

  return (
    <div className="home-container">
      <h1>Games</h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          {trendingGames.length > 0 && (
            <Carousel title="Trending Games" products={trendingGames} />
          )}
          {newReleases.length > 0 && (
            <Carousel title="New Releases" products={newReleases} />
          )}
        </>
      )}
    </div>
  );
}

export default Home;
