# Spotify Broadcast Frontend

A real-time Spotify activity dashboard that displays your currently playing track, listening history, top tracks, top artists, and playlists. Built with React and connected to a Spotify API backend.

> **Backend Repository**: This project requires the [Spotify Broadcast Backend](https://github.com/mbofos01/spotify-broadcast-backend) to function. Make sure to set it up first.

## Features

- 🎵 **Real-time Now Playing** - See what's currently playing with album art and progress bar
- 🔄 **Auto-refresh** - Updates every 5 seconds for live tracking
- 📊 **Top Tracks & Artists** - View your recent top 5 tracks and artists
- 🎧 **Recently Played** - See your last 5 played tracks
- 📋 **Playlists** - Browse all your Spotify playlists
- ⏭️ **Next in Queue** - Preview what's coming up next
- 🎨 **Dynamic Theming** - Progress bar gradient adapts to album artwork colors
- 💾 **Smart Caching** - localStorage caching for faster load times
- 🖼️ **Dynamic Favicon** - Browser tab icon shows your Spotify profile picture

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A running Spotify Broadcast Backend instance

## Environment Setup

Create a `.env` file in the root directory:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

Replace `http://localhost:5000` with your backend URL if deployed elsewhere.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spotify-broadcast-frontend.git
cd spotify-broadcast-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create your `.env` file (see Environment Setup above)

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Caching Strategy

The app uses localStorage to cache data with different expiration times:

- **User Info**: 24 hours
- **Top Tracks**: 1 hour
- **Top Artists**: 1 hour
- **Playlists**: 30 minutes
- **Currently Playing**: Real-time (no cache)
- **Recently Played**: Real-time (no cache)
- **Next in Queue**: Real-time (no cache)

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

The build is optimized for best performance with minified code and hashed filenames.

### `npm run eject`

**Note: this is a one-way operation!**

Ejects from Create React App to give you full control over configuration files.

## Dependencies

- **React** - UI framework
- **Axios** - HTTP client for API calls
- **Framer Motion** - Animation library for smooth transitions
- **Bootstrap** - CSS framework for responsive design
- **fast-average-color** - Extract dominant colors from images

## Backend Requirements

This frontend requires a backend API with the following endpoints:

> **Get the backend**: [Spotify Broadcast Backend Repository](https://spotify-broadcast-backend.vercel.app/redoc)

- `GET /user-info` - User profile information
- `GET /currently-playing-verbose` - Current track details
- `GET /top-five` - Top 5 tracks
- `GET /top-five-artists` - Top 5 artists
- `GET /recently-played?limit=5` - Recently played tracks
- `GET /my-playlists` - User's playlists
- `GET /next-in-queue` - Next track in queue

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Spotify Web API
- All open-source libraries used in this project
