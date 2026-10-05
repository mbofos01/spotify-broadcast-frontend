import React, { useEffect, useRef } from "react";

const formatTime = (ms) =>
  `${Math.floor(ms / 60000)}:${String(
    Math.floor((ms % 60000) / 1000)
  ).padStart(2, "0")}`;

function NowPlayingCard({ track, gradient }) {
  const progress_ms = track.progress_ms || 0;
  const duration_ms = track.duration_ms || 1;

  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const elapsedRef = useRef(null);
  const anchor = useRef({ id: null, progress: 0, at: 0, playing: true });

  // The local clock drives the bar. The server only resets it on a new track,
  // a pause/resume, or a large jump (seek), so lag never moves it backwards.
  useEffect(() => {
    const prev = anchor.current;
    const now = performance.now();
    const server = track.progress_ms || 0;
    const playing = track.is_playing !== false;
    const estimate = prev.playing ? prev.progress + (now - prev.at) : prev.progress;

    if (
      prev.id !== track.track_id ||
      prev.playing !== playing ||
      Math.abs(server - estimate) > 5000
    ) {
      anchor.current = { id: track.track_id, progress: server, at: now, playing };
    }
  }, [track]);

  useEffect(() => {
    let frame;
    const tick = () => {
      const { progress, at, playing } = anchor.current;
      const current = Math.min(
        duration_ms,
        progress + (playing ? performance.now() - at : 0)
      );
      if (fillRef.current) {
        fillRef.current.style.width = `${(current / duration_ms) * 100}%`;
      }
      if (elapsedRef.current) {
        elapsedRef.current.textContent = formatTime(current);
      }
      if (trackRef.current) {
        trackRef.current.title = `${formatTime(current)} / ${formatTime(duration_ms)}`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration_ms, track.track_id]);

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
          <div className="player-progress-track" ref={trackRef}>
            <div
              className="player-progress-fill"
              ref={fillRef}
              style={{
                width: `${(progress_ms / duration_ms) * 100}%`,
                background: gradient,
              }}
            />
          </div>
          <div className="player-times">
            <span ref={elapsedRef}>{formatTime(progress_ms)}</span>
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
