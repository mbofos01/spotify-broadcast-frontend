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

  // Force refresh - clear cache and return null to trigger fresh fetch
  forceRefresh: (key) => {
    try {
      localStorage.removeItem(key);
      return null;
    } catch (e) {
      console.error("Cache force refresh error:", e);
      return null;
    }
  },

  // Clear all Spotify-related cache
  clearSpotifyCache: () => {
    try {
      Object.values(CACHE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (e) {
      console.error("Cache clear Spotify error:", e);
    }
  },

  // Check if cache exists and when it expires
  getCacheInfo: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      return {
        exists: true,
        expiresAt: new Date(parsed.expiry),
        isExpired: Date.now() > parsed.expiry,
        timeToExpiry: Math.max(0, parsed.expiry - Date.now())
      };
    } catch (e) {
      return null;
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

// Expose cache functions to console for debugging
if (typeof window !== 'undefined') {
  window.spotifyCache = {
    // Get cache info
    info: (key) => cache.getCacheInfo(key),
    
    // Clear specific cache
    clear: (key) => cache.remove(key),
    
    // Clear all Spotify cache
    clearAll: () => cache.clearSpotifyCache(),
    
    // Force refresh specific cache
    refresh: (key) => cache.forceRefresh(key),
    
    // Get cache data without expiry check
    peek: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        return null;
      }
    },
    
    // List all Spotify cache keys
    list: () => Object.values(CACHE_KEYS),
    
    // Get all cache info
    status: () => {
      return Object.entries(CACHE_KEYS).reduce((acc, [name, key]) => {
        acc[name.toLowerCase()] = cache.getCacheInfo(key);
        return acc;
      }, {});
    }
  };
}
