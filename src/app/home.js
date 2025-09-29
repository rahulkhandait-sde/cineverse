import React from "react";
import "./Home.css"; // We'll create this CSS for movie cards

const movies = [
  {
    id: 1,
    title: "Inception",
    poster: "https://via.placeholder.com/200x300?text=Inception",
    description: "Mind-bending thriller by Christopher Nolan",
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://via.placeholder.com/200x300?text=Interstellar",
    description: "Epic space exploration movie",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://via.placeholder.com/200x300?text=The+Dark+Knight",
    description: "Batman fights crime in Gotham",
  },
];

export default function Home() {
  return (
    <div className="home-container">
      <h1>Now Showing 🍿</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
