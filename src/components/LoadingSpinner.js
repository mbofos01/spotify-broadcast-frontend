import React from "react";

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div className="text-center">
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        <div
          style={{
            width: 60,
            height: 60,
            border: "5px solid rgba(29,185,84,0.15)",
            borderTop: "5px solid #1DB954",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 1s linear infinite",
          }}
        />
        <div className="mt-2">Loading…</div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
