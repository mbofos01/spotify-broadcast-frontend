import React, { useMemo } from "react";

function NothingPlayingCard() {
  const randomMessage = useMemo(() => {
    const messages = [
      "Have you checked out my playlists? 👉🏼👈🏼",
      "Awfully quiet around here... 😶🦗",
      "Enjoying the Sound of Silence 🌙🎵",
      "Every 60 Seconds in Earth a Minute Passes 🌍⏳",
      "Yes, you should pass me the AUX. Always 😎🎶"
  
    ];
    const currentHour = new Date().getHours();

    // Special morning message between 3 AM and 7 AM
    if (currentHour >= 3 && currentHour <= 7) {
      return "Probably I'm asleep and honestly why aren't you? 😪😴";
    }

    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  return (
    <div className="nothing-playing" role="status">
      <span className="nothing-playing-label">
        <span className="nothing-playing-dot" aria-hidden="true" />
        Nothing playing right now
      </span>
      <p className="nothing-playing-message">{randomMessage}</p>
    </div>
  );
}

export default NothingPlayingCard;
