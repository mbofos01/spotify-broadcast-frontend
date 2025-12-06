import React from "react";

function MoreInfoButton({ setShowNothingPlaying }) {
  return (
    <div className="text-center mb-3">
      <button
        onClick={() => setShowNothingPlaying(true)}
        className="btn btn-outline-success"
        style={{ borderRadius: "20px", padding: "8px 16px" }}
      >
        What's my vibe?
      </button>
    </div>
  );
}

export default MoreInfoButton;
