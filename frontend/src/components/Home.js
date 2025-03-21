// frontend/src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

function Carousel({ title, products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4; // number of product cards visible at once

  const prev = () => {
    setCurrentIndex(Math.max(0, currentIndex - visibleCount));
  };

  const next = () => {
    setCurrentIndex(Math.min(products.length - visibleCount, currentIndex + visibleCount));
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel-container">
        {currentIndex > 0 && (
          <button className="carousel-arrow left" onClick={prev} title="Previous">
            <i className="bi bi-arrow-left-circle"></i>
          </button>
        )}
        <div className="carousel-items">
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
        {currentIndex < products.length - visibleCount && (
          <button className="carousel-arrow right" onClick={next} title="Next">
            <i className="bi bi-arrow-right-circle"></i>
          </button>
        )}
      </div>
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Read search keyword from URL query string
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

  // For demonstration, split filteredProducts into two groups for two carousels
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
