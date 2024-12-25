import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    genre: "",
    yearFrom: "",
    yearTo: "",
    minRating: "",
  });

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const fetchMovies = async (isInitialLoad = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          apikey: "7c8b057b",
          s: isInitialLoad ? "avengers" : query,
          page: page,
          y: filters.yearFrom || "",
        },
      });

      if (response.data && response.data.Search) {
        setMovies((prev) =>
          isInitialLoad || page === 1
            ? response.data.Search
            : [...prev, ...response.data.Search]
        );
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setPage(1);
    fetchMovies();
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchMovies(true);
  }, []);

  useEffect(() => {
    if (query) {
      setPage(1);
      fetchMovies();
    }
  }, [query]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          placeholder="Year"
          name="yearFrom"
          value={filters.yearFrom}
          onChange={handleFilterChange}
        />

        <input
          type="number"
          placeholder="Rating"
          name="minRating"
          value={filters.minRating}
          onChange={handleFilterChange}
        />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
              toggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p>No movies found. Try searching for something else.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
