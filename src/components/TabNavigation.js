import React from "react";

function TabNavigation({ activeTab, setActiveTab, onWrappedClick, showWrappedTab = false }) {
  const baseTabs = [
    { id: "tracks", label: "Tracks" },
    { id: "artists", label: "Artists" },
    { id: "recent", label: "Recently Played" },
    { id: "playlists", label: "Playlists" },
  ];

  const tabs = showWrappedTab 
    ? [...baseTabs, { id: "wrapped", label: "Wrapped" }]
    : baseTabs;

  const handleTabClick = (tabId) => {
    if (tabId === "wrapped" && onWrappedClick) {
      onWrappedClick();
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <>
      <style>
        {`
          .circling-border-btn {
            position: relative;
            background: transparent !important;
            border: none !important;
            border-radius: 6px;
            overflow: hidden; 
          }
          
          .circling-border-btn::before {
            content: '';
            position: absolute;
            width: 180px;
            height: 180px;
            left: -20px;
            top: -65px;
            background: conic-gradient(
              from 0deg,
              #00e5ff,
              #b400fb,
              #ff6b6b,
              #ffd700,
              #00e5ff
            );
            animation: rotateGradient 3s linear infinite;
            z-index: 0;
          }

          .circling-border-btn::after {
            content: '';
            position: absolute;
            inset: 2px;
            border-radius: 4px;
            background: #212529;
            z-index: 1;
          }

          .circling-border-btn span {
            position: relative;
            z-index: 2;
            color: white !important;
          }
          
          @keyframes rotateGradient {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          .circling-border-btn:hover::before {
            animation-duration: 1s;
          }
        `}
      </style>
      <div className="d-flex flex-column flex-sm-row justify-content-center my-3 mb-3 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`btn ${
              activeTab === tab.id ? "btn-success" : "btn-outline-light"
            } ${tab.id === "wrapped" ? "circling-border-btn" : ""}`}
            style={{ minWidth: "140px" }}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default TabNavigation;
