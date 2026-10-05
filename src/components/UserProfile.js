import React from "react";
import { truncateName } from "../utils/helpers";

function UserProfile({ user, maxNameLength = 20 }) {
  if (!user) return null;

  return (
    <div className="user-profile" id="not-playing-tab">
      <img
        src={user.image}
        alt={user.display_name}
        className="user-avatar"
      />
      <div className="user-profile-copy">
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
    </div>
  );
}

export default UserProfile;
