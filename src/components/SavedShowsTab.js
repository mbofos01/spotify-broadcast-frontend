import React from "react";
import { motion } from "framer-motion";
import { truncateName } from "../utils/helpers";

// Spotify returns some text with HTML entities (e.g. "&amp;")
const decodeEntities = (text = "") => {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
};

function SavedShowsTab({ shows }) {
  return (
    <motion.div
      key="shows"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h5 className="text-center mt-3 mb-3">My Saved Shows</h5>
      {!shows.length ? (
        <p className="text-center text-muted">No saved shows available</p>
      ) : (
        <ul className="list-unstyled">
          {shows.map((show) => (
            <li key={show.id} className="mb-3 d-flex align-items-center">
              <img
                src={show.image_url}
                alt={show.name}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "8px",
                  marginRight: 12,
                  objectFit: "cover",
                }}
              />
              <div>
                <a
                  href={show.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={show.name}
                  style={{
                    color: "#1DB954",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  {truncateName(show.name, 30)}
                </a>
                <div style={{ fontSize: "13px" }}>
                  {truncateName(decodeEntities(show.publisher), 35)} •{" "}
                  {show.total_episodes} episodes
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default SavedShowsTab;
