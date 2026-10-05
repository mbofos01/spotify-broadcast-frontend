import React from "react";

function LoadingSpinner() {
  return (
    <div className="broadcast-page loading-screen" role="status" aria-live="polite">
      <div className="loading-equalizer" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
      <p className="loading-label">Tuning in…</p>
    </div>
  );
}

export default LoadingSpinner;
