import React from "react";
import { motion } from "framer-motion";
import { truncateName } from "../utils/helpers";

function PlaylistsTab({ playlists }) {
  return (
    <motion.div
      key="playlists"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h5 className="text-center mt-3 mb-3">My Playlists</h5>
      <ul className="list-unstyled">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="mb-3 d-flex align-items-center">
            <img
              src={playlist.image_url}
              alt={playlist.name}
              style={{
                width: 50,
                height: 50,
                borderRadius: "8px",
                marginRight: 12,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <a
                  href={playlist.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={playlist.name}
                  style={{
                    color: "#1DB954",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  {truncateName(playlist.name, 25)}
                </a>
                {playlist.collaborative && (
                  <span
                    title="Collaborative Playlist"
                    style={{
                      fontSize: "18px",
                      background: "rgba(29, 185, 84, 0.2)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    👥
                  </span>
                )}
              </div>
              {/* {playlist.description && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#999",
                    marginTop: "2px",
                  }}
                >
                  {truncateName(playlist.description, 40)}
                </div>
              )} */}
              <div style={{ fontSize: "13px", marginTop: "2px" }}>
                {playlist.tracks_total.toLocaleString()} tracks • {playlist.owner}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default PlaylistsTab;
