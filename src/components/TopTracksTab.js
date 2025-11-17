import React from "react";
import { motion } from "framer-motion";
import { truncateName } from "../utils/helpers";

function TopTracksTab({ tracks }) {
  return (
    <motion.div
      key="tracks"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h5 className="text-center mt-3 mb-3">My recent Top 5 Tracks</h5>
      <ul className="list-unstyled">
        {tracks.map((track) => (
          <li key={track.id} className="mb-3 d-flex align-items-center">
            <img
              src={track.album.images[1]?.url || track.album.images[0]?.url}
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
                title={track.name}
                style={{
                  color: "#1DB954",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {truncateName(track.name, 30)}
              </a>
              <div style={{ fontSize: "13px" }}>
                {track.artists.map((artist, i) => (
                  <span key={artist.id}>
                    <a
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={artist.name}
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                      }}
                    >
                      {truncateName(artist.name, 25)}
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
  );
}

export default TopTracksTab;
