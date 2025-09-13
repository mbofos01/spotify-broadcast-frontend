import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [track, setTrack] = useState(null);
  const [user, setUser] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

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
    const fetchTopTracks = async () => {
      try {
        const res = await axios.get("https://wmpofos.pythonanywhere.com/top-five");
        setTopTracks(res.data.items || []);
      } catch {
        setTopTracks([]);
      }
    };
    fetchTrack();
    fetchUser();
    fetchTopTracks();
    const interval = setInterval(() => {
      fetchTrack();
      fetchUser();
      fetchTopTracks();
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
              <h4 className="mt-2">
                <a href={`https://open.spotify.com/user/${user.uri.split(":").pop()}`} target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", fontWeight: "bold", textDecoration: "none" }}>
                  {user.display_name}
                </a>
              </h4>
              <p>Followers: {user.followers}</p>
            </div>
          )}
          <h2>Awfully quiet around here 🎧</h2>
          {topTracks.length > 0 && (
            <div className="mt-4">
              <h5>Your Top 5 Tracks</h5>
              <ul className="list-unstyled">
                {topTracks.slice(0, 5).map((track) => (
                  <li key={track.id} className="mb-3 d-flex align-items-center">
                    <img src={track.album.images[1]?.url || track.album.images[0]?.url} alt={track.name} style={{ width: 50, height: 50, borderRadius: "8px", marginRight: 12 }} />
                    <div>
                      <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", fontWeight: "bold", textDecoration: "none" }}>{track.name}</a>
                      <div style={{ fontSize: "13px" }}>
                        {track.artists.map((artist, i) => (
                          <span key={artist.id}>
                            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none" }}>{artist.name}</a>
                            {i < track.artists.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
            <h4 className="mt-2">
              <a href={`https://open.spotify.com/user/${user.uri.split(":").pop()}`} target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", fontWeight: "bold", textDecoration: "none" }}>
                {user.display_name}
              </a>
            </h4>
            <p>Followers: {user.followers}</p>
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
