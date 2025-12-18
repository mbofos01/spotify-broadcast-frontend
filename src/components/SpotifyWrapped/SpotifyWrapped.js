import React, { useState, useMemo, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useSwipeable } from 'react-swipeable';
import { WelcomeSlide } from "./slides/WelcomeSlide";
import { TopArtistsSlide } from "./slides/TopArtistsSlide";
import { TopTracksSlide } from "./slides/TopTracksSlide";
import { TopGenresSlide } from "./slides/TopGenresSlide";
import { SavedShowsSlide } from "./slides/SavedShowsSlide";
import "./SpotifyWrapped.css";

export const SpotifyWrapped = ({ data, onClose }) => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [debugGradient, setDebugGradient] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0); // Add this to force re-render

  // Generate random gradient based on base colors
  const gradientStyle = useMemo(() => {
    // If debug gradient is set, use that instead
    if (debugGradient) {
      return { background: debugGradient };
    }

    const baseColors = [
      { primary: "#822c2c", secondary: "#ce3131", tertiary: "#482d2d" }, // Red
      { primary: "#2c5282", secondary: "#3182ce", tertiary: "#2d3748" }, // Blue
    //   { primary: "#2c8234", secondary: "#31ce45", tertiary: "#2d4830" }, // Green
      { primary: "#822c82", secondary: "#ce31ce", tertiary: "#482d48" }, // Purple
    //   { primary: "#82562c", secondary: "#ce8931", tertiary: "#48372d" }, // Orange
    //   { primary: "#2c8282", secondary: "#31cece", tertiary: "#2d4848" }, // Teal
      { primary: "#6b2c82", secondary: "#9d31ce", tertiary: "#3d2d48" }, // Violet
    ];

    const randomColorSet =
      baseColors[Math.floor(Math.random() * baseColors.length)];

    return {
      background: `linear-gradient(135deg, ${randomColorSet.primary}, ${randomColorSet.secondary}, ${randomColorSet.tertiary})`,
    };
  }, [debugGradient, forceUpdate]); // Add forceUpdate to dependencies

  const slides = useMemo(
    () => [
      { id: "welcome", component: <WelcomeSlide period={data.period} /> },
      {
        id: "artists",
        component: <TopArtistsSlide artists={data.top_artists} />,
      },
      { id: "tracks", component: <TopTracksSlide tracks={data.top_tracks} /> },
      { id: "genres", component: <TopGenresSlide genres={data.top_genres} /> },
      {
        id: "shows",
        component: <SavedShowsSlide shows={data.saved_shows || []} />,
      },
    ],
    [data]
  );

  const handleNext = () => {
    setCurrentSlide((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setCurrentSlide((prevActiveStep) => prevActiveStep - 1);
  };

  // Add swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentSlide < slides.length - 1) {
        handleNext();
      }
    },
    onSwipedRight: () => {
      if (currentSlide > 0) {
        handleBack();
      }
    },
    trackMouse: true, // Also works with mouse drag on desktop
    preventScrollOnSwipe: false, // Allow vertical scrolling
    delta: 50 // Minimum swipe distance
  });

  return (
    <div className="spotify-wrapped" style={gradientStyle} {...swipeHandlers}>
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="btn btn-outline-light position-absolute"
          style={{
            top: "20px",
            left: "20px",
            zIndex: 1000,
            borderRadius: "20px",
            padding: "8px 16px",
          }}
        >
          ← Back
        </button>
      )}

      <div className="slide-container">
        <div
          className="slides-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="slide">
              {slide.component}
            </div>
          ))}
        </div>
      </div>

      <MobileStepper
        variant="dots"
        steps={slides.length}
        position="static"
        activeStep={currentSlide}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          "& .MuiMobileStepper-dot": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
          "& .MuiMobileStepper-dotActive": {
            backgroundColor: "#b9bfc4ff",
          },
          "& .MuiButton-root": {
            color: "white",
            fontWeight: 600,
          },
          "& .MuiButton-root:disabled": {
            color: "rgba(255, 255, 255, 0.5)",
          },
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={currentSlide === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
};
