import React from 'react';

export const TopArtistsSlide = ({ artists }) => {
  return (
    <div className="top-artists-slide">
      <h2>Your Top Artists</h2>
      <div className="artists-grid">
        {artists.map((artist, index) => (
          <div key={artist.id} className="artist-card">
            <div className="rank">#{index + 1}</div>
            <img src={artist.image_url} alt={artist.name} />
            <h3 title={artist.name}>{artist.name}</h3>
            {/* <p>{artist.followers?.toLocaleString() || 0} followers</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};
