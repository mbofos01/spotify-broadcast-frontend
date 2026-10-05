import React from "react";
import { truncateName } from "../utils/helpers";

function NextInQueue({ track }) {
  if (!track) return null;

  return (
    <section className="queue-section">
      <h5>Up next</h5>
      <div className="queue-item">
        <img
          src={track.image_url}
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
            href={track.spotify_url}
            target="_blank"
            rel="noopener noreferrer"
            title={track.name}
            style={{
              color: "#1DB954",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            {truncateName(track.name, 20)}
          </a>
          <div style={{ fontSize: "13px" }}>
            {truncateName(
              track.artists.map((artist) => artist).join(", "),
              30
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NextInQueue;
