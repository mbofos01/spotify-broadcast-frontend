import React, { useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { WelcomeSlide } from './slides/WelcomeSlide';
import { TopArtistsSlide } from './slides/TopArtistsSlide';
import { TopTracksSlide } from './slides/TopTracksSlide';
import { TopGenresSlide } from './slides/TopGenresSlide';
import { SavedShowsSlide } from './slides/SavedShowsSlide';
import './SpotifyWrapped.css';

export const SpotifyWrapped = ({ data }) => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = useMemo(() => [
    { id: 'welcome', component: <WelcomeSlide period={data.period} /> },
    { id: 'artists', component: <TopArtistsSlide artists={data.top_artists} /> },
    { id: 'tracks', component: <TopTracksSlide tracks={data.top_tracks} /> },
    { id: 'genres', component: <TopGenresSlide genres={data.top_genres} /> },
    { id: 'shows', component: <SavedShowsSlide shows={data.saved_shows || []} /> },
  ], [data]);

  const handleNext = () => {
    setCurrentSlide((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setCurrentSlide((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="spotify-wrapped">
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          '& .MuiMobileStepper-dot': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
          '& .MuiMobileStepper-dotActive': {
            backgroundColor: '#4299e1',
          },
          '& .MuiButton-root': {
            color: 'white',
            fontWeight: 600,
          },
          '& .MuiButton-root:disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={currentSlide === slides.length - 1}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={currentSlide === 0}>
            {theme.direction === 'rtl' ? (
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
