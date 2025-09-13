import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [track, setTrack] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await axios.get(
          "https://wmpofos.pythonanywhere.com/currently-playing-verbose"
        );
        setTrack(res.data);
      } catch {
        setTrack(null);
      }
    };
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://wmpofos.pythonanywhere.com/user-info");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchTrack();
    fetchUser();
    const interval = setInterval(() => {
      fetchTrack();
      fetchUser();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!track || !track.track_id) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
        <div>
          {user && (
            <div className="mb-4 text-center">
              <img src={user.image} alt={user.display_name} style={{ width: 80, height: 80, borderRadius: "50%" }} />
              <h4 className="mt-2">{user.display_name}</h4>
              <p>Followers: {user.followers}</p>
              <a href={`https://open.spotify.com/user/${user.uri.split(":").pop()}`} target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", fontWeight: "bold" }}>Spotify Profile</a>
            </div>
          )}
          <h2>Nothing playing 🎧</h2>
        </div>
      </div>
    );
  }

  const progress_ms = track.progress_ms;
  const duration_ms = track.duration_ms;

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const elapsedTime = formatTime(progress_ms);
  const totalTime = formatTime(duration_ms);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div>
        {user && (
          <div className="mb-4 text-center">
            <img src={user.image} alt={user.display_name} style={{ width: 80, height: 80, borderRadius: "50%" }} />
            <h4 className="mt-2">{user.display_name}</h4>
            <p>Followers: {user.followers}</p>
            <a href={`https://open.spotify.com/user/${user.uri.split(":").pop()}`} target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", fontWeight: "bold" }}>Spotify Profile</a>
          </div>
        )}
        <div className="card text-center bg-secondary" style={{ width: "20rem" }}>
          <img src={track.image_url} className="card-img-top" alt="Track Art" />
          <div className="card-body">
            <h5 className="card-title">{track.track}</h5>
            <p className="card-text mb-1">{track.artist}</p>
            <p className="card-text text-muted">{track.album}</p>
            <div className="progress mb-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${(progress_ms / duration_ms) * 100}%` }}
              >
                {elapsedTime} / {totalTime}
              </div>
            </div>

            {/* 🎧 Listen on Spotify Button */}
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
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "8px",
                  }}
                />
                Listen on Spotify
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
