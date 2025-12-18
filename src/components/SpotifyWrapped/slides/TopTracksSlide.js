import React from "react";

export const TopTracksSlide = ({ tracks }) => {
  // const formatDuration = (ms) => {
  //   const minutes = Math.floor(ms / 60000);
  //   const seconds = Math.floor((ms % 60000) / 1000);
  //   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  // };

  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center text-center py-4">
      <h2 className="mb-4">My Top Tracks</h2>

      <div
        className="row row-cols-2 row-cols-md-5 row-cols-lg-5 g-3 w-100"
        style={{ maxHeight: "70vh", overflowY: "auto", maxWidth: "1200px" }}
      >
        {tracks.map((track, index) => (
          <div key={track.id} className="col">
            <div className="card bg-white bg-opacity-10 h-100 text-white border-0">
              <div className="card-body d-flex flex-column align-items-center p-3">
                <div className="h4 text-info fw-bold mb-2 rank">#{index + 1}</div>
                <img
                  src={
                    track.album?.images?.[0]?.url ||
                    track.album?.images?.[1]?.url ||
                    track.image_url
                  }
                  alt={track.album?.name || track.name}
                  className="rounded mb-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <h6 className="card-title text-center mb-2" title={track.name}>
                  {track.name}
                </h6>
                <small
                  className="text-white-50 text-center"
                  title={
                    track.artists?.map((a) => a.name).join(", ") || track.artist
                  }
                >
                  {track.artists?.map((a) => a.name).join(", ") || track.artist}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
