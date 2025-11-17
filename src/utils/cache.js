const CACHE_DURATIONS = {
  topTracks: 60 * 60 * 1000, // 1 hour
  topArtists: 60 * 60 * 1000, // 1 hour
  playlists: 30 * 60 * 1000, // 30 minutes
  user: 24 * 60 * 60 * 1000, // 24 hours
};

export const cache = {
  set: (key, data, duration) => {
    const item = {
      data,
      expiry: Date.now() + duration,
    };
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error("Cache set error:", e);
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      if (Date.now() > parsed.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (e) {
      console.error("Cache get error:", e);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Cache remove error:", e);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Cache clear error:", e);
    }
  },
};

export const CACHE_KEYS = {
  TOP_TRACKS: "spotify_top_tracks",
  TOP_ARTISTS: "spotify_top_artists",
  PLAYLISTS: "spotify_playlists",
  USER: "spotify_user",
};

export { CACHE_DURATIONS };
