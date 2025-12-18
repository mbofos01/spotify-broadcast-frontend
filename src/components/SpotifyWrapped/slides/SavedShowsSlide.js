import React from 'react';

export const SavedShowsSlide = ({ shows }) => {
  const getBestImage = (show) => {
    if (show.images && show.images.length > 0) {
      const firstImage = show.images[0];
      if (firstImage && firstImage.url) {
        return firstImage.url;
      }
    }
    return show.image_url || 'https://via.placeholder.com/300x300?text=No+Image';
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center text-center py-4">
      <h2 className="mb-2">My Podcast Collection</h2>
      <p className="text-white-50 fst-italic mb-4">The shows that captured my attention</p>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 w-100" style={{maxHeight: '65vh', overflowY: 'auto', maxWidth: '1200px'}}>
        {shows.map((show, index) => (
          <div key={show.id} className="col d-flex">
            <div className="card bg-white bg-opacity-10 text-white border-0 flex-fill">
              <div className="card-header bg-info color-override bg-opacity-20 d-flex justify-content-between align-items-center">
                <span className="h6 text-info fw-bold mb-0 rank">#{index + 1}</span>
                <span className="badge bg-dark bg-opacity-80 text-light">PODCAST</span>
              </div>
              <div className="card-body text-center p-2 d-flex flex-column">
                <img 
                  src={getBestImage(show)}
                  alt={show.name}
                  className="rounded mb-2 shadow align-self-center"
                  style={{width: '80px', height: '80px', objectFit: 'cover'}}
                />
                <h6 className="card-title mb-2 text-truncate" title={show.name} style={{maxHeight: '3rem', lineHeight: '1.5rem'}}>
                  {show.name}
                </h6>
                <p className="text-light small mb-2 text-truncate" title={show.publisher}>
                  by {show.publisher}
                </p>
                
                {/* {show.description && (
                  <div className="bg-dark bg-opacity-20 p-2 rounded text-start mb-2 border-start border-light border-3 flex-grow-1 d-flex align-items-start">
                    <small className="text-white-75">
                      {show.description.length > 120 
                        ? `${show.description.substring(0, 120)}...` 
                        : show.description}
                    </small>
                  </div>
                )} */}
                
                {show.total_episodes && (
                  <div className="d-flex justify-content-center mt-auto">
                    <span className="badge bg-white bg-opacity-10 text-white">
                      📺 {show.total_episodes} episodes
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {shows.length === 0 && (
        <div className="text-center py-5">
          <div className="display-1 opacity-50 mb-3">🎙️</div>
          <h4>No saved podcasts found</h4>
          <p className="text-white-50">Start exploring podcasts to see them here!</p>
        </div>
      )}
    </div>
  );
};
