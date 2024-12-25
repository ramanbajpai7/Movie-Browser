import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import "./HomePage.css";

const HomePage = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="home-page">
      <SearchBar setQuery={setQuery} />
      <MovieList query={query} />
    </div>
  );
};

export default HomePage;
