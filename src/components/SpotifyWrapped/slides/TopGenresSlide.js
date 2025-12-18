import React from 'react';

export const TopGenresSlide = ({ genres }) => {
  return (
    <div className="top-genres-slide">
      <h2>Your Musical Taste</h2>
      <p className="genre-subtitle">The genres that shaped your year</p>
      
      <div className="genres-list">
        {genres.map((genre, index) => (
          <div 
            key={genre}
            className="genre-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="rank">#{index + 1}</div>
            <div className="genre-name">{genre}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
