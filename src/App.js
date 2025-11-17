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
// import { truncateName } from "./utils/helpers";

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
      try {
        const res = await axios.get(`${BACKEND_URL}/user-info`);
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    const fetchTopTracks = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/top-five`);
        setTopTracks(res.data.top_tracks || []);
      } catch {
        setTopTracks([]);
      }
    };

    const fetchTopArtists = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/top-five-artists`);
        setTopArtists(res.data || []);
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
      try {
        const res = await axios.get(`${BACKEND_URL}/my-playlists`);
        setPlaylists(res.data || []);
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
