import React from 'react';

export const TopTracksSlide = ({ tracks }) => {
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="top-tracks-slide">
      <h2>Your Top Tracks</h2>
      <div className="tracks-grid">
        {tracks.map((track, index) => (
          <div key={track.id} className="track-card">
            <div className="rank">#{index + 1}</div>
            <img src={track.album?.images?.[0]?.url || track.album?.images?.[1]?.url || track.image_url} alt={track.album?.name || track.name} />
            <div className="track-info">
              <h3 title={track.name}>{track.name}</h3>
              <p title={track.artists?.map(a => a.name).join(', ') || track.artist}>
                {track.artists?.map(a => a.name).join(', ') || track.artist}
              </p>
              {/* <span className="duration">{formatDuration(track.duration_ms)}</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
