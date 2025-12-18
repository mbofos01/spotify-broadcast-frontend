import React from 'react';

export const SavedShowsSlide = ({ shows }) => {
  const getBestImage = (show) => {
    // Debug: log the show data to see what we're working with
    console.log('Show images:', show.images, 'image_url:', show.image_url);
    
    // Try multiple approaches to get the best image
    if (show.images && show.images.length > 0) {
      // Method 1: Get the first (usually highest res) image
      const firstImage = show.images[0];
      if (firstImage && firstImage.url) {
        return firstImage.url;
      }
      
      // Method 2: Find the largest image by dimensions
      const largestImage = show.images.reduce((largest, current) => {
        const currentSize = (current.width || 0) * (current.height || 0);
        const largestSize = (largest.width || 0) * (largest.height || 0);
        return currentSize > largestSize ? current : largest;
      }, show.images[0]);
      
      if (largestImage && largestImage.url) {
        return largestImage.url;
      }
    }
    
    // Fallback to image_url
    return show.image_url || 'https://via.placeholder.com/300x300?text=No+Image';
  };

  return (
    <div className="saved-shows-slide">
      <h2>Your Podcast Collection</h2>
      <p className="shows-subtitle">The shows that captured your attention</p>
      
      <div className="shows-grid">
        {shows.map((show, index) => (
          <div key={show.id} className="show-tab">
            <div className="tab-header">
              <span className="rank">#{index + 1}</span>
              <div className="tab-type">PODCAST</div>
            </div>
            
            <div className="tab-content">
              <div className="show-artwork">
                <img 
                  src={getBestImage(show)} 
                  alt={show.name}
                  onError={(e) => {
                    console.log('Image failed to load:', e.target.src);
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
              </div>
              
              <div className="show-details">
                <h3 className="show-title">{show.name}</h3>
                <p className="show-publisher">by {show.publisher}</p>
                
                {show.description && (
                  <div className="show-description">
                    <p>{show.description.length > 200 
                      ? `${show.description.substring(0, 200)}...` 
                      : show.description}
                    </p>
                  </div>
                )}
                
                <div className="show-meta">
                  {show.total_episodes && (
                    <span className="meta-item">
                      <span className="meta-icon">📺</span>
                      {show.total_episodes} episodes
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {shows.length === 0 && (
        <div className="no-shows">
          <span className="no-shows-icon">🎙️</span>
          <p>No saved podcasts found</p>
          <span className="no-shows-subtitle">Start exploring podcasts to see them here!</span>
        </div>
      )}
    </div>
  );
};
