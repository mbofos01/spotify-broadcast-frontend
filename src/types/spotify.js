// TypeScript interfaces converted to JSDoc for JavaScript

/**
 * @typedef {Object} SpotifyArtist
 * @property {string} id
 * @property {string} name
 * @property {string} uri
 * @property {string} spotify_url
 * @property {string} image_url
 * @property {number} followers
 */

/**
 * @typedef {Object} SpotifyTrackArtist
 * @property {string} name
 * @property {string} id
 */

/**
 * @typedef {Object} SpotifyAlbumImage
 * @property {number} height
 * @property {string} url
 * @property {number} width
 */

/**
 * @typedef {Object} SpotifyAlbum
 * @property {string} name
 * @property {string} id
 * @property {SpotifyAlbumImage[]} images
 */

/**
 * @typedef {Object} SpotifyTrack
 * @property {string} id
 * @property {string} name
 * @property {SpotifyTrackArtist[]} artists
 * @property {SpotifyAlbum} album
 * @property {number} duration_ms
 * @property {boolean} explicit
 * @property {Object} external_urls
 * @property {string} external_urls.spotify
 * @property {number} popularity
 * @property {string|null} preview_url
 * @property {string} uri
 */

/**
 * @typedef {Object} SpotifyShow
 * @property {string} id
 * @property {string} name
 * @property {string} publisher
 * @property {string} description
 * @property {SpotifyAlbumImage[]} images
 * @property {string} image_url
 */

/**
 * @typedef {Object} SpotifyWrappedData
 * @property {string} period
 * @property {SpotifyArtist[]} top_artists
 * @property {SpotifyTrack[]} top_tracks
 * @property {string[]} top_genres
 * @property {SpotifyShow[]} saved_shows
 */

export {};
