const API_URL = 'https://itunes.apple.com/search?term=';

export async function fetchTracks(query) {
  const response = await fetch(`${API_URL}${query}&entity=song&limit=10`);
  const data = await response.json();
  return data.results;
}
