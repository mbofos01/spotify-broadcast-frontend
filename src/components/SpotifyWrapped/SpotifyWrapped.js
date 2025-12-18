import React, { useState, useMemo } from 'react';
import { WelcomeSlide } from './slides/WelcomeSlide';
import { TopArtistsSlide } from './slides/TopArtistsSlide';
import { TopTracksSlide } from './slides/TopTracksSlide';
import { TopGenresSlide } from './slides/TopGenresSlide';
import { SavedShowsSlide } from './slides/SavedShowsSlide';
import './SpotifyWrapped.css';

export const SpotifyWrapped = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = useMemo(() => [
    { id: 'welcome', component: <WelcomeSlide period={data.period} /> },
    { id: 'artists', component: <TopArtistsSlide artists={data.top_artists} /> },
    { id: 'tracks', component: <TopTracksSlide tracks={data.top_tracks} /> },
    { id: 'shows', component: <SavedShowsSlide shows={data.saved_shows || []} /> },
    { id: 'genres', component: <TopGenresSlide genres={data.top_genres} /> },
  ], [data]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="spotify-wrapped">
      <div className="slide-container">
        <div 
          className="slides-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="slide">
              {slide.component}
            </div>
          ))}
        </div>
      </div>
      
      <div className="navigation">
        <button onClick={prevSlide} disabled={currentSlide === 0}>
          Previous
        </button>
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};
