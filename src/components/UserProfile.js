import React, { useEffect, useRef, useState } from "react";
import { truncateName } from "../utils/helpers";

function UserProfile({ user, maxNameLength = 20, isLive = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div className="user-profile" id="not-playing-tab" ref={ref}>
      <button
        type="button"
        className={`user-avatar-btn${isLive ? " is-live" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Profile details"
        title={user.display_name}
      >
        <img src={user.image} alt={user.display_name} className="user-avatar" />
      </button>
      {open && (
        <div className="user-menu">
          <h4 className="user-name">
            <a
              href={`https://open.spotify.com/user/${user.uri.split(":").pop()}`}
              target="_blank"
              rel="noopener noreferrer"
              title={user.display_name}
            >
              {truncateName(user.display_name, maxNameLength)}
            </a>
          </h4>
          <p className="user-followers">{user.followers} followers</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
