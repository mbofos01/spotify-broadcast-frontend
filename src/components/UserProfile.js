import React from "react";
import { truncateName } from "../utils/helpers";

function UserProfile({ user, maxNameLength = 20 }) {
  if (!user) return null;

  return (
    <div className="mb-4 text-center" id="not-playing-tab" style={{marginTop:"1rem"}}>
      <img
        src={user.image}
        alt={user.display_name}
        style={{ width: 80, height: 80, borderRadius: "50%" }}
      />
      <h4 className="mt-2">
        <a
          href={`https://open.spotify.com/user/${user.uri.split(":").pop()}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1DB954",
            fontWeight: "bold",
            textDecoration: "none",
          }}
          title={user.display_name}
        >
          {truncateName(user.display_name, maxNameLength)}
        </a>
      </h4>
      <p>Followers: {user.followers}</p>
    </div>
  );
}

export default UserProfile;
