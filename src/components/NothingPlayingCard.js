import React, { useMemo } from "react";

function NothingPlayingCard() {
  const randomMessage = useMemo(() => {
    const messages = [
      "Have you checked out my playlists?",
      "Awfully quiet around here...",
      "Probably I'm asleep and honestly why aren't you?",
      "Enjoying the sound of silence",
      "Every 60 Seconds in Earth a Minute Passes",
      "Yes you should pass me the AUX. Always"
  
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  return (
    <div className="now-playing-glass center">
      <h4 className="status-title">Nothing Playing</h4>
      <p className="status-message">{randomMessage}</p>
    </div>
  );
}

export default NothingPlayingCard;
