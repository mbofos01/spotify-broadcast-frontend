import React from 'react';

export const WelcomeSlide = ({ period }) => {
  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-1 fw-bold mb-4" style={{animation: 'fadeInUp 1s ease'}}>
        My {period} Wrapped
      </h1>
      <p className="fs-3 text-white-50 mb-5" style={{animation: 'fadeInUp 1s ease 0.2s both'}}>
        Let's dive into my musical journey
      </p>
      <div className="display-1 spotify-logo">🎵</div>
    </div>
  );
};
