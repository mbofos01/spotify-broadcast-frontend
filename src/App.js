import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { FastAverageColor } from "fast-average-color";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [track, setTrack] = useState(null);
  const [user, setUser] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradient, setGradient] = useState(
    "linear-gradient(90deg, #1DB954, #1ed760)"
  );
  const [activeTab, setActiveTab] = useState("tracks");

  const fac = useMemo(() => new FastAverageColor(), []);

  const extractColors = useCallback(
    async (url) => {
      try {
        const color = await fac.getColorAsync(url, { algorithm: "dominant" });
        const darkened = color.rgb.replace("rgb", "rgba").replace(")", ",0.8)");
        return `linear-gradient(90deg, ${color.hex}, ${darkened})`;
      } catch (err) {
        console.error("Color extraction error:", err);
        return "linear-gradient(90deg, #1DB954, #1ed760)";
      }
    },
    [fac]
  );

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await axios.get(
          "https://spotify-broadcast-backend.vercel.app/currently-playing-verbose"
        );
        const trackData = res.data;
        setTrack(trackData);

        if (trackData?.image_url) {
          const grad = await extractColors(trackData.image_url);
          setGradient(grad);
        }
      } catch {
        setTrack(null);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://spotify-broadcast-backend.vercel.app/user-info"
        );
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    const fetchTopTracks = async () => {
      try {
        const res = await axios.get(
          "https://spotify-broadcast-backend.vercel.app/top-five"
        );
        setTopTracks(res.data.top_tracks || []);
      } catch {
        setTopTracks([]);
      }
    };

    const fetchTopArtists = async () => {
      try {
        const res = await axios.get(
          "https://spotify-broadcast-backend.vercel.app/top-five-artists"
        );
        setTopArtists(res.data || []);
      } catch {
        setTopArtists([]);
      }
    };

    const init = async () => {
      await Promise.all([
        fetchUser(),
        fetchTrack(),
        fetchTopTracks(),
        fetchTopArtists(),
      ]);
      setLoading(false);
    };
    init();

    const interval = setInterval(fetchTrack, 5000);
    return () => clearInterval(interval);
  }, [extractColors]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
        <div className="text-center">
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <div
            style={{
              width: 60,
              height: 60,
              border: "5px solid rgba(29,185,84,0.15)",
              borderTop: "5px solid #1DB954",
              borderRadius: "50%",
              margin: "0 auto",
              animation: "spin 1s linear infinite",
            }}
          />
          <div className="mt-2">Loading…</div>
        </div>
      </div>
    );
  }

  if (!track || !track.track_id) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
        <div>
          {user && (
            <div className="mb-4 text-center">
              <img
                src={user.image}
                alt={user.display_name}
                style={{ width: 80, height: 80, borderRadius: "50%" }}
              />
              <h4 className="mt-2">
                <a
                  href={`https://open.spotify.com/user/${user.uri
                    .split(":")
                    .pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#1DB954",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  {user.display_name}
                </a>
              </h4>
              <p>Followers: {user.followers}</p>
            </div>
          )}
          {/* <h4>Awfully quiet around here...</h4> */}

          {/* Tab buttons */}
          <div className="d-flex justify-content-center my-3">
            <button
              onClick={() => setActiveTab("tracks")}
              className={`btn me-2 ${
                activeTab === "tracks" ? "btn-success" : "btn-outline-light"
              }`}
            >
              Tracks
            </button>
            <button
              onClick={() => setActiveTab("artists")}
              className={`btn ${
                activeTab === "artists" ? "btn-success" : "btn-outline-light"
              }`}
            >
              Artists
            </button>
          </div>

          {/* Animated Top Tracks / Artists */}
          <AnimatePresence mode="wait">
            {activeTab === "tracks" && (
              <motion.div
                key="tracks"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <h5 className="text-center">My recent Top 5 Tracks</h5>
                <ul className="list-unstyled">
                  {topTracks.map((track) => (
                    <li
                      key={track.id}
                      className="mb-3 d-flex align-items-center"
                    >
                      <img
                        src={
                          track.album.images[1]?.url ||
                          track.album.images[0]?.url
                        }
                        alt={track.name}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "8px",
                          marginRight: 12,
                        }}
                      />
                      <div>
                        <a
                          href={track.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#1DB954",
                            fontWeight: "bold",
                            textDecoration: "none",
                          }}
                        >
                          {track.name}
                        </a>
                        <div style={{ fontSize: "13px" }}>
                          {track.artists.map((artist, i) => (
                            <span key={artist.id}>
                              <a
                                href={artist.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#fff",
                                  textDecoration: "none",
                                }}
                              >
                                {artist.name}
                              </a>
                              {i < track.artists.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "artists" && (
              <motion.div
                key="artists"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h5 className="text-center">My recent Top 5 Artists</h5>
                <ul className="list-unstyled">
                  {topArtists.map((artist) => (
                    <li
                      key={artist.id}
                      className="mb-3 d-flex align-items-center"
                    >
                      <img
                        src={artist.image_url}
                        alt={artist.name}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          marginRight: 12,
                        }}
                      />
                      <div>
                        <a
                          href={artist.spotify_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#1DB954",
                            fontWeight: "bold",
                            textDecoration: "none",
                          }}
                        >
                          {artist.name}
                        </a>

                        <div style={{ fontSize: "13px" }}>
                          Followers: {artist.followers.toLocaleString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Currently playing track view
  const progress_ms = track.progress_ms || 0;
  const duration_ms = track.duration_ms || 1;
  const formatTime = (ms) =>
    `${Math.floor(ms / 60000)}:${String(
      Math.floor((ms % 60000) / 1000)
    ).padStart(2, "0")}`;
  const elapsedTime = formatTime(progress_ms);
  const totalTime = formatTime(duration_ms);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div className="mb-2">
        {user && (
          <div className="mb-4 mt-2 text-center">
            <img
              src={user.image}
              alt={user.display_name}
              style={{ width: 80, height: 80, borderRadius: "50%" }}
            />
            <h4 className="mt-2">
              <a
                href={`https://open.spotify.com/user/${user.uri
                  .split(":")
                  .pop()}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#1DB954",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {user.display_name}
              </a>
            </h4>
            <p>Followers: {user.followers}</p>
          </div>
        )}

        <div
          className="card text-center bg-secondary"
          style={{ width: "20rem" }}
        >
          <img src={track.image_url} className="card-img-top" alt="Track Art" />
          <div className="card-body">
            <h5 className="card-title">{track.track}</h5>
            <p className="card-text mb-1">{track.artist}</p>
            <p className="card-text text-muted">{track.album}</p>

            {/* Progress bar with vibrant gradient */}
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

            {/* Spotify Button */}
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
      </div>
    </div>
  );
}

export default App;
