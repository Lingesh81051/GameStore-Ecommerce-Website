// frontend/src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Read the search keyword from the URL query string
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
    ? products.filter((product) =>
        product.name.toLowerCase().includes(keyword)
      )
    : products;

  return (
    <div className="home-container">
      <h1>Games</h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => {
            // For local images, prepend the backend URL
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
      )}
    </div>
  );
}

export default Home;
