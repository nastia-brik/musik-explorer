import { renderPage, navigateTo } from './router/router.js';
import { fetchTracks } from './api/itunes.js';
import SearchBar from './components/SearchBar.js';
import TrackCard from './components/TrackCard.js';
import Loader from './components/Loader.js';

// Make navigateTo available globally
window.navigateTo = navigateTo;

document.addEventListener('DOMContentLoaded', () => {
  renderPage('/');
});
