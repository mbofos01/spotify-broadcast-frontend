import React from "react";
import { motion } from "framer-motion";
import { truncateName } from "../utils/helpers";

function RecentlyPlayedTab({ tracks }) {
  // If used in sidebar (no motion), render simple list
  if (!tracks?.length) {
    return (
      <div className="recently-played">
        <h5 className="text-center mt-3 mb-3">My Last Played Tracks</h5>
        <p className="text-center text-muted">No recent tracks available</p>
      </div>
    );
  }

  // Check if this should be animated (used in tabs) or static (used in sidebar)
  const isTabView = tracks.length > 2; // Heuristic to detect tab vs sidebar usage

  const trackList = (
    <>
      <h5 className="recent-title">Recently played</h5>
      <ul className="list-unstyled recent-list">
        {tracks.map((item, index) => (
          <li
            key={item.track_id || `recent-${index}`}
            className="recent-track"
          >
            <img
              src={item.image_url}
              alt={item.track || item.name}
              style={{
                width: 50,
                height: 50,
                borderRadius: "8px",
                marginRight: 12,
              }}
            />
            <div>
              <a
                href={item.spotify_url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name || item.track}
                style={{
                  color: "#1DB954",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {truncateName(item.name || item.track, 20)}
              </a>
              <div style={{ fontSize: "13px" }}>
                {truncateName(
                  item.artists?.map((artist) => artist).join(", ") || "",
                  30
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );

  // Return animated version for tab view
  if (isTabView) {
    return (
      <motion.div
        key="recent"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        {trackList}
      </motion.div>
    );
  }

  // Return static version for sidebar
  return <div className="recently-played">{trackList}</div>;
}

export default RecentlyPlayedTab;
