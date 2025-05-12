import SearchBar, { initSearchBar } from '../components/SearchBar.js';
import TrackCard from '../components/TrackCard.js';
import Loader from '../components/Loader.js';
import { fetchTracks } from '../api/itunes.js';
import TrackPage, { initTrackPage } from '../pages/TrackPage.js';

export function navigateTo(path) {
    window.history.pushState({}, '', path);
    renderPage(path);
  }
  
  export function renderPage(path) {
    const app = document.getElementById('app');
    if (path === '/') {
      app.innerHTML = `
        <h1>Music Explorer</h1>
        ${SearchBar({ onSearch: searchTracks })}
        <div id="track-list" class="track-list"></div>
      `;
      initSearchBar(searchTracks);
    } else if (path.startsWith('/track/')) {
      const trackId = path.split('/track/')[1];
      app.innerHTML = `
        <h1>Track Details</h1>
        ${TrackPage({ trackId })}
      `;
      initTrackPage(trackId);
    }
  }
  
  function searchTracks(query) {
    const trackList = document.getElementById('track-list');
    if (!trackList) return;
    
    trackList.innerHTML = Loader();
    fetchTracks(query).then((tracks) => {
      if (!trackList) return;
      trackList.innerHTML = tracks.map(track => TrackCard({ track })).join('');
    }).catch(error => {
      if (!trackList) return;
      trackList.innerHTML = '<p class="error">Error loading tracks. Please try again.</p>';
      console.error('Error fetching tracks:', error);
    });
  }
  