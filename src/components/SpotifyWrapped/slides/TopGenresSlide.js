import React from 'react';

export const TopGenresSlide = ({ genres }) => {
  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center text-center py-4">
      <h2 className="mb-2">Your Musical Taste</h2>
      <p className="text-white-50 fst-italic mb-4">The genres that shaped your year</p>
      
      <div className="w-100" style={{maxHeight: '60vh', overflowY: 'auto', maxWidth: '800px'}}>
        {genres.map((genre, index) => (
          <div key={genre} className="d-flex align-items-center bg-white bg-opacity-10 rounded mb-2 p-3">
            <div className="h5 text-info fw-bold me-3 mb-0" style={{minWidth: '40px'}}>
              #{index + 1}
            </div>
            <div className="h6 text-capitalize mb-0 flex-grow-1 text-start">
              {genre}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
