import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>Year: {movie.Year}</p>
        <button
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          onClick={() => toggleFavorite(movie)}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
