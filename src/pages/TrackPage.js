export default function TrackPage({ trackId }) {
  return `
    <div class="track-details">
      <button class="back-button" id="back-button">← Back to Search</button>
      <div class="track-info">
        <img src="" alt="Track artwork" class="track-artwork" id="track-artwork">
        <div class="track-details-content">
          <h2 id="track-name"></h2>
          <p id="track-artist"></p>
          <p id="track-album"></p>
          <p id="track-genre"></p>
          <p id="track-release-date"></p>
          <audio id="track-preview" controls></audio>
        </div>
      </div>
    </div>
  `;
}

// Initialize track details after component is rendered
export function initTrackPage(trackId) {
  // Add back button functionality
  document.getElementById('back-button').addEventListener('click', () => {
    window.navigateTo('/');
  });

  fetch(`https://itunes.apple.com/lookup?id=${trackId}`)
    .then(response => response.json())
    .then(data => {
      const track = data.results[0];
      if (!track) return;

      document.getElementById('track-artwork').src = track.artworkUrl100.replace('100x100', '600x600');
      document.getElementById('track-name').textContent = track.trackName;
      document.getElementById('track-artist').textContent = `Artist: ${track.artistName}`;
      document.getElementById('track-album').textContent = `Album: ${track.collectionName}`;
      document.getElementById('track-genre').textContent = `Genre: ${track.primaryGenreName}`;
      document.getElementById('track-release-date').textContent = `Released: ${new Date(track.releaseDate).toLocaleDateString()}`;
      
      const audioElement = document.getElementById('track-preview');
      if (track.previewUrl) {
        audioElement.src = track.previewUrl;
      } else {
        audioElement.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error loading track details:', error);
      document.querySelector('.track-details').innerHTML = '<p class="error">Error loading track details. Please try again.</p>';
    });
} 