import React from "react";
import { motion } from "framer-motion";
import { truncateName } from "../utils/helpers";

function RecentlyPlayedTab({ tracks }) {
  return (
    <motion.div
      key="recent"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h5 className="text-center mt-3 mb-3">My Last Played Tracks</h5>
      <ul className="list-unstyled">
        {tracks.map((item) => (
          <li key={item.track_id} className="mb-3 d-flex align-items-center">
            <img
              src={item.image_url}
              alt={item.track}
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
                title={item.name}
                style={{
                  color: "#1DB954",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {truncateName(item.name, 20)}
              </a>
              <div style={{ fontSize: "13px" }}>
                {truncateName(
                  item.artists.map((artist) => artist).join(", "),
                  30
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default RecentlyPlayedTab;
