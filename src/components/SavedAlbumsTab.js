import React from "react";
import { motion } from "framer-motion";
import { truncateName } from "../utils/helpers";

function SavedAlbumsTab({ albums }) {
  return (
    <motion.div
      key="albums"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h5 className="text-center mt-3 mb-3">My Saved Albums</h5>
      {!albums.length ? (
        <p className="text-center text-muted">No saved albums available</p>
      ) : (
        <ul className="list-unstyled">
          {albums.map((album) => (
            <li key={album.id} className="mb-3 d-flex align-items-center">
              <img
                src={album.image_url}
                alt={album.name}
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
                  href={album.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={album.name}
                  style={{
                    color: "#1DB954",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  {truncateName(album.name, 30)}
                </a>
                <div style={{ fontSize: "13px" }}>
                  {album.artists?.map((artist, index) => (
                    <React.Fragment key={`${artist}-${index}`}>
                      {index > 0 && ", "}
                      {album.artist_urls?.[index] ? (
                        <a
                          href={album.artist_urls[index]}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--broadcast-muted)",
                            textDecoration: "none",
                          }}
                        >
                          {truncateName(artist, 25)}
                        </a>
                      ) : (
                        truncateName(artist, 25)
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div style={{ fontSize: "13px" }}>
                  {album.release_date} • {album.total_tracks} tracks
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default SavedAlbumsTab;
