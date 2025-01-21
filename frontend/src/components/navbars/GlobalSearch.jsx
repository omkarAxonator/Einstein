import React, { useState } from 'react';
import './top_navbar.css'; // Custom CSS for styling the user image and other elements

const GlobalSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Trigger search logic
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default GlobalSearch;
