// frontend/src/components/News.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css';

function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        // Uncomment and adjust this when you have an endpoint:
        // const response = await axios.get('/api/news');
        // setNewsItems(response.data);

        // For now, use dummy data:
        const dummyData = [
          { _id: 1, title: 'Game Release: Epic Adventure', image: '/images/news1.jpg', description: 'New adventure game released today.' },
          { _id: 2, title: 'Update: RPG Legends Patch', image: '/images/news2.jpg', description: 'Latest patch improves gameplay performance.' },
          { _id: 3, title: 'Interview: Developer Insights', image: '/images/news3.jpg', description: 'Exclusive interview with the creators of RPG Legends.' },
          { _id: 4, title: 'Industry News: Gaming Trends', image: '/images/news4.jpg', description: 'An in-depth look at upcoming gaming trends.' },
        ];
        setNewsItems(dummyData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1>News</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : newsItems.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <div className="news-grid">
          {newsItems.map(item => {
            // Prepend backend URL for local images
            const imageUrl = item.image.startsWith('/')
              ? `http://localhost:5000${item.image}`
              : item.image;
            return (
              <div className="news-card" key={item._id}>
                <img
                  src={imageUrl}
                  alt={item.title}
                  onError={(e) => {
                    if (e.target.src !== 'http://localhost:5000/images/placeholder.png') {
                      e.target.onerror = null;
                      e.target.src = 'http://localhost:5000/images/placeholder.png';
                    }
                  }}
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default News;
