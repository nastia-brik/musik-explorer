export default function SearchBar({ onSearch }) {
  return `
    <div class="search-bar">
      <input type="text" placeholder="Search for music..." />
    </div>
  `;
}

// Initialize search functionality after component is rendered
export function initSearchBar(onSearch) {
  const input = document.querySelector('.search-bar input');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value);
    }
  });
}
  