import React, { useMemo } from "react";

function NothingPlayingCard() {
  const randomMessage = useMemo(() => {
    const messages = [
      "Silence is golden — nothing playing right now 🎧✨",
      "The DJ (me) is on a break 🛑🎶",
      "No jams at the moment — stay tuned! 📻",
      "Currently vibing… to silence 😌",
      "Spotify says: taking five 🎵☕",
      "Quiet mode: ON 🤫",
      "My speakers are napping 💤🔊",
      "Waiting for the next banger… ⏳🎶",
      "Music loading… just kidding, nothing here 😅",
      "Shhh… enjoying the quiet 🎶❌",
      "No tracks queued — time for imagination 🎨🎵",
      "Hit play and let's dance! 💃🕺",
      "Air guitar practice in progress 🎸🔥",
      "Silence is my current playlist 🕶️🎵",
      "I'm on a music detox 🍵🎶",
      "Nothing playing… yet your future favorite song awaits 🎼✨",
      "Streaming: pure tranquility 😌🎧",
      "The silence is curated just for you 🎶🪄",
      "No music, no problem 😉",
      "Currently offline from beats 🔌🎵",
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
