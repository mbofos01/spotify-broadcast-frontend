import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { FastAverageColor } from "fast-average-color";
import { AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Widget.css";

// Components
import LoadingSpinner from "./components/LoadingSpinner";
import UserProfile from "./components/UserProfile";
import NothingPlayingCard from "./components/NothingPlayingCard";
import NowPlayingCard from "./components/NowPlayingCard";
import TabNavigation from "./components/TabNavigation";
import TopTracksTab from "./components/TopTracksTab";
import TopArtistsTab from "./components/TopArtistsTab";
import RecentlyPlayedTab from "./components/RecentlyPlayedTab";
import PlaylistsTab from "./components/PlaylistsTab";
import NextInQueue from "./components/NextInQueue";
import { cache, CACHE_KEYS, CACHE_DURATIONS } from "./utils/cache";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [track, setTrack] = useState(null);
  const [user, setUser] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [nextInQueue, setNextInQueue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gradient, setGradient] = useState(
    "linear-gradient(90deg, #1DB954, #1ed760)"
  );
  const [activeTab, setActiveTab] = useState("tracks");

  const fac = useMemo(() => new FastAverageColor(), []);

  // Function to create rounded favicon
  const createRoundedFavicon = useCallback((imageUrl) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 64;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      // Draw circle clip path
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      // Draw image
      ctx.drawImage(img, 0, 0, size, size);
      
      // Update favicon
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = canvas.toDataURL();
    };
    img.src = imageUrl;
  }, []);

  const extractColors = useCallback(
    async (url) => {
      try {
        const color = await fac.getColorAsync(url, { algorithm: "dominant" });
        const darkened = color.rgb.replace("rgb", "rgba").replace(")", ",0.8)");
        return `linear-gradient(90deg, ${color.hex}, ${darkened})`;
      } catch (err) {
        console.error("Color extraction error:", err);
        return "linear-gradient(90deg, #1DB954, #1ed760)";
      }
    },
    [fac]
  );

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/currently-playing-verbose`);
        const trackData = res.data;
        setTrack(trackData);

        if (trackData?.image_url) {
          const grad = await extractColors(trackData.image_url);
          setGradient(grad);
        }
      } catch {
        setTrack(null);
      }
    };

    const fetchUser = async () => {
      const cached = cache.get(CACHE_KEYS.USER);
      if (cached) {
        setUser(cached);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/user-info`);
        setUser(res.data);
        cache.set(CACHE_KEYS.USER, res.data, CACHE_DURATIONS.user);
      } catch {
        setUser(null);
      }
    };

    const fetchTopTracks = async () => {
      const cached = cache.get(CACHE_KEYS.TOP_TRACKS);
      if (cached) {
        setTopTracks(cached);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/top-five`);
        const tracks = res.data.top_tracks || [];
        setTopTracks(tracks);
        cache.set(CACHE_KEYS.TOP_TRACKS, tracks, CACHE_DURATIONS.topTracks);
      } catch {
        setTopTracks([]);
      }
    };

    const fetchTopArtists = async () => {
      const cached = cache.get(CACHE_KEYS.TOP_ARTISTS);
      if (cached) {
        setTopArtists(cached);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/top-five-artists`);
        const artists = res.data || [];
        setTopArtists(artists);
        cache.set(CACHE_KEYS.TOP_ARTISTS, artists, CACHE_DURATIONS.topArtists);
      } catch {
        setTopArtists([]);
      }
    };

    const fetchRecentlyPlayed = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/recently-played?limit=5`);
        setRecentlyPlayed(res.data || []);
      } catch {
        setRecentlyPlayed([]);
      }
    };

    const fetchPlaylists = async () => {
      const cached = cache.get(CACHE_KEYS.PLAYLISTS);
      if (cached) {
        setPlaylists(cached);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/my-playlists`);
        const playlists = res.data || [];
        setPlaylists(playlists);
        cache.set(CACHE_KEYS.PLAYLISTS, playlists, CACHE_DURATIONS.playlists);
      } catch {
        setPlaylists([]);
      }
    };

    const fetchNextInQueue = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/next-in-queue`);
        setNextInQueue(res.data || null);
      } catch {
        setNextInQueue(null);
      }
    };

    const init = async () => {
      await Promise.all([
        fetchUser(),
        fetchTrack(),
        fetchTopTracks(),
        fetchTopArtists(),
        fetchRecentlyPlayed(),
        fetchPlaylists(),
        fetchNextInQueue(),
      ]);
      setLoading(false);
    };
    init();

    const interval = setInterval(() => {
      fetchTrack();
      fetchRecentlyPlayed();
      fetchNextInQueue();
    }, 5000);
    return () => clearInterval(interval);
  }, [extractColors]);

  // Update document title with username
  useEffect(() => {
    if (user?.display_name) {
      document.title = `${user.display_name}'s Spotify`;
    } else {
      document.title = "Spotify Broadcast";
    }

    // Update favicon with rounded user profile picture
    if (user?.image) {
      createRoundedFavicon(user.image);
    }
  }, [user, createRoundedFavicon]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!track || !track.track_id) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
        <div
          className="container"
          style={{ maxWidth: "1200px", padding: "0 1rem" }}
        >
          <UserProfile user={user} />

          <div className="row g-4">
            {/* Nothing Playing Card */}
            <div className="col-12 col-lg-12">
              <div style={{ maxWidth: "24rem", margin: "0 auto" }}>
                <NothingPlayingCard />
              </div>
            </div>

            {/* Info Tab with Tabs */}
            <div className="col-12 col-lg-12" id="info-tab">
              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

              <AnimatePresence mode="wait">
                {activeTab === "tracks" && <TopTracksTab tracks={topTracks} />}
                {activeTab === "artists" && <TopArtistsTab artists={topArtists} />}
                {activeTab === "recent" && <RecentlyPlayedTab tracks={recentlyPlayed} />}
                {activeTab === "playlists" && <PlaylistsTab playlists={playlists} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Currently playing track view
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <div
        className="container"
        style={{ maxWidth: "1200px", padding: "0 1rem" }}
      >
        <UserProfile user={user} maxNameLength={100} />

        <div className="row g-4">
          {/* Now Playing Tab */}
          <div className="col-12 col-lg-8">
            <NowPlayingCard track={track} gradient={gradient} />
          </div>

          {/* Info Tab */}
          <div className="col-12 col-lg-4" id="info-tab">
              <NextInQueue track={nextInQueue} />
              <RecentlyPlayedTab tracks={recentlyPlayed} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
