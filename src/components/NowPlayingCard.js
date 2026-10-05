import React from "react";

function NowPlayingCard({ track, gradient }) {
  const progress_ms = track.progress_ms || 0;
  const duration_ms = track.duration_ms || 1;
  
  const formatTime = (ms) =>
    `${Math.floor(ms / 60000)}:${String(
      Math.floor((ms % 60000) / 1000)
    ).padStart(2, "0")}`;
  
  const elapsedTime = formatTime(progress_ms);
  const totalTime = formatTime(duration_ms);

  return (
    <div
      id="now-playing-tab"
      className="card player-card"
    >
      <img
        src={track.image_url}
        className="player-artwork"
        alt="Track Art"
      />
      <div className="card-body player-details">
        <p className="player-eyebrow">Now playing</p>
        <h1 className="card-title player-title">{track.track}</h1>
        <p className="player-artists">
          {track.artists.map((artist) => artist).join(", ")}
        </p>
        <p className="player-album">{track.album}</p>

        {/* Progress bar */}
        <div className="player-progress">
          <div
            className="player-progress-track"
            title={`${elapsedTime} / ${totalTime}`}
          >
            <div
              className="player-progress-fill"
              style={{
                width: `${(progress_ms / duration_ms) * 100}%`,
                background: gradient,
              }}
            />
          </div>
          <div className="player-times">
            <span>{elapsedTime}</span>
            <span>{totalTime}</span>
          </div>
        </div>

        {track.spotify_uri && (
          <a
            href={track.spotify_uri}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="spotify-listen-link"
          >
            <img
              src="/spotify.png"
              alt="Spotify"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            Listen on Spotify
          </a>
        )}
      </div>
    </div>
  );
}

export default NowPlayingCard;
