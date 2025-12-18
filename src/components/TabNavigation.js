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
      // Don't set activeTab for wrapped since it's not a regular tab
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
            transition: transform 0.2s ease, opacity 0.2s ease;
          }
          
          .circling-border-btn:hover {
            transform: scale(1.02);
          }
          
          .circling-border-btn:active {
            transform: scale(0.98);
            opacity: 0.8;
          }
          
          .circling-border-btn::before {
            content: '';
            position: absolute;
            width: calc(100% + 40px);
            // height: calc(100% + 40px);
            aspect-ratio: 1;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
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
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          
          .circling-border-btn:focus,
          .circling-border-btn:active {
            outline: none !important;
            box-shadow: none !important;
          }
          
          .circling-border-btn:disabled {
            pointer-events: none;
            opacity: 0.6;
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
            type="button"
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default TabNavigation;
