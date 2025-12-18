import React from "react";

function TabNavigation({ activeTab, setActiveTab, onWrappedClick }) {
  const tabs = [
    { id: "tracks", label: "Tracks" },
    { id: "artists", label: "Artists" },
    { id: "recent", label: "Recently Played" },
    { id: "playlists", label: "Playlists" },
    { id: "wrapped", label: "Wrapped" }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === "wrapped" && onWrappedClick) {
      onWrappedClick();
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-center my-3 mb-3 gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`btn ${
            activeTab === tab.id ? "btn-success" : "btn-outline-light"
          }`}
          style={{ minWidth: "140px" }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;
