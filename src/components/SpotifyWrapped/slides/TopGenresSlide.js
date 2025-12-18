import React from 'react';

export const TopGenresSlide = ({ genres }) => {
  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center text-center py-4">
      <h2 className="mb-2">My Musical Taste</h2>
      <p className="text-white-50 fst-italic mb-4">The genres that shaped my year</p>
      
      <div className="row row-cols-1 row-cols-md-2 g-3 w-100" style={{maxHeight: '60vh', overflowY: 'auto', maxWidth: '800px'}}>
        {genres.map((genre, index) => (
          <div key={genre} className="col">
            <div className="card bg-white bg-opacity-10 text-white border-0 h-100">
              <div className="card-body d-flex align-items-center p-3">
                <div className="h4 text-info fw-bold me-3 mb-0 rank" style={{minWidth: '60px'}}>
                  #{index + 1}
                </div>
                <div className="h6 text-capitalize mb-0 flex-grow-1 text-start">
                  {genre}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
