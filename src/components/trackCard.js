export default function TrackCard({ track }) {
  return `
    <div class="track-card" onclick="window.navigateTo('/track/${track.trackId}')">
      <img src="${track.artworkUrl100}" alt="${track.trackName}" />
      <h3>${track.trackName}</h3>
      <p>${track.artistName}</p>
      <p>${track.collectionName}</p>
    </div>
  `;
}
  