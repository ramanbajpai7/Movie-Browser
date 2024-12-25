import React from "react";
import "./SearchBar.css";

const SearchBar = ({ setQuery }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
