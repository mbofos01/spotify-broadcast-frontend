import React from "react";
import { motion } from "framer-motion";
import { truncateName } from "../utils/helpers";

function TopArtistsTab({ artists }) {
  return (
    <motion.div
      key="artists"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h5 className="text-center mt-3 mb-3">My recent Top 5 Artists</h5>
      <ul className="list-unstyled">
        {artists.map((artist) => (
          <li key={artist.id} className="mb-3 d-flex align-items-center">
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
                title={artist.name}
                style={{
                  color: "#1DB954",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {truncateName(artist.name, 25)}
              </a>
              <div style={{ fontSize: "13px" }}>
                Followers: {artist.followers.toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default TopArtistsTab;
