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
      className="card text-center bg-secondary mx-auto"
      style={{ maxWidth: "24rem" , marginBottom: "2rem"}}
    >
      <img
        src={track.image_url}
        className="card-img-top"
        alt="Track Art"
      />
      <div className="card-body">
        <h5 className="card-title">{track.track}</h5>
        <p className="card-text mb-1">
          {track.artists.map((artist) => artist).join(", ")}
        </p>
        <p className="card-text text-muted">{track.album}</p>

        {/* Progress bar */}
        <div style={{ margin: "1rem 0" }}>
          <div
            style={{
              height: 10,
              width: "100%",
              background: "rgba(164, 169, 174, 1)",
              borderRadius: 20,
              overflow: "hidden",
            }}
            title={`${elapsedTime} / ${totalTime}`}
          >
            <div
              style={{
                height: "100%",
                width: `${(progress_ms / duration_ms) * 100}%`,
                background: gradient,
                borderRadius: 20,
                transition: "width 400ms ease",
                boxShadow: "0 0 8px rgba(29,185,84,0.3)",
              }}
            />
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
              backgroundColor: "#1DB954",
              color: "white",
              padding: "10px 16px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
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
