import React from 'react';

export const TopArtistsSlide = ({ artists }) => {
  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center text-center py-4">
      <h2 className="mb-4">My Top Artists</h2>
      
      <div className="row row-cols-2 row-cols-md-5 row-cols-lg-5 g-3 w-100" style={{maxHeight: '70vh', overflowY: 'auto', maxWidth: '1200px'}}>
        {artists.map((artist, index) => (
          <div key={artist.id} className="col">
            <div className="card bg-white bg-opacity-10 h-100 text-white border-0 backdrop-blur">
              <div className="card-body d-flex flex-column align-items-center p-3">
                <div className="h4 text-info fw-bold mb-2 rank">#{index + 1}</div>
                <img 
                  src={artist.image_url} 
                  alt={artist.name}
                  className="rounded-circle mb-3"
                  style={{width: '80px', height: '80px', objectFit: 'cover'}}
                />
                <h6 className="card-title text-center mb-2" title={artist.name}>
                  {artist.name}
                </h6>
                <small className="text-white-50">
                  {artist.followers?.toLocaleString() || 0} followers
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
