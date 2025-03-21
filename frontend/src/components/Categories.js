// frontend/src/components/Categories.js
import React, { useState } from 'react';
import './Categories.css';

function Categories() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Dummy category filter options – adjust as needed.
  const categoryOptions = [
    'Action',
    'Adventure',
    'RPG',
    'Sports',
    'Strategy',
    'Simulation',
    'Puzzle'
  ];

  // (Optional) You could add filtering functionality here if needed.

  return (
    <div className="categories-page">
      <div className="categories-content">
        <h1>Categories</h1>
        <p>
          {selectedCategories.length > 0
            ? `Filtering by: ${selectedCategories.join(', ')}`
            : 'No filters applied.'}
        </p>
        {/* Render your category items here, if needed */}
      </div>
    </div>
  );
}

export default Categories;
