import React from "react";

function NowPlayingButton({ showNothingPlaying, setShowNothingPlaying }) {
  return (
    <div className="text-center mb-3">
      <button
        onClick={() => setShowNothingPlaying(!showNothingPlaying)}
        className={`btn ${
          showNothingPlaying
            ? "btn-success soundwave-btn"
            : "btn-outline-success"
        }`}
        style={{ borderRadius: "20px", padding: "8px 16px" }}
      >
        {"Now Playing"}
      </button>
    </div>
  );
}

export default NowPlayingButton;
