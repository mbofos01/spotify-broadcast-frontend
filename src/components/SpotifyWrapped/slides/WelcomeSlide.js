import React from 'react';

export const WelcomeSlide = ({ period }) => {
  return (
    <div className="welcome-slide">
      <h1>Your {period} Wrapped</h1>
      <p>Let's dive into your musical journey</p>
      <div className="spotify-logo">🎵</div>
    </div>
  );
};
