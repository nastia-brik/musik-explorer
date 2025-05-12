(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();function d({onSearch:e}){return`
    <div class="search-bar">
      <input type="text" placeholder="Search for music..." />
    </div>
  `}function l(e){document.querySelector(".search-bar input").addEventListener("keydown",t=>{t.key==="Enter"&&e(t.target.value)})}function u({track:e}){return`
    <div class="track-card" onclick="window.navigateTo('/track/${e.trackId}')">
      <img src="${e.artworkUrl100}" alt="${e.trackName}" />
      <h3>${e.trackName}</h3>
      <p>${e.artistName}</p>
      <p>${e.collectionName}</p>
    </div>
  `}function p(){return`
    <div class="loader">
      <div class="spinner"></div>
    </div>
  `}const m="https://itunes.apple.com/search?term=";async function k(e){return(await(await fetch(`${m}${e}&entity=song&limit=10`)).json()).results}function f({trackId:e}){return`
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
  `}function g(e){document.getElementById("back-button").addEventListener("click",()=>{window.navigateTo("/")}),fetch(`https://itunes.apple.com/lookup?id=${e}`).then(r=>r.json()).then(r=>{const t=r.results[0];if(!t)return;document.getElementById("track-artwork").src=t.artworkUrl100.replace("100x100","600x600"),document.getElementById("track-name").textContent=t.trackName,document.getElementById("track-artist").textContent=`Artist: ${t.artistName}`,document.getElementById("track-album").textContent=`Album: ${t.collectionName}`,document.getElementById("track-genre").textContent=`Genre: ${t.primaryGenreName}`,document.getElementById("track-release-date").textContent=`Released: ${new Date(t.releaseDate).toLocaleDateString()}`;const c=document.getElementById("track-preview");t.previewUrl?c.src=t.previewUrl:c.style.display="none"}).catch(r=>{console.error("Error loading track details:",r),document.querySelector(".track-details").innerHTML='<p class="error">Error loading track details. Please try again.</p>'})}function h(e){window.history.pushState({},"",e),s(e)}function s(e){const r=document.getElementById("app");if(e==="/")r.innerHTML=`
        <h1>Music Explorer</h1>
        ${d({onSearch:o})}
        <div id="track-list" class="track-list"></div>
      `,l(o);else if(e.startsWith("/track/")){const t=e.split("/track/")[1];r.innerHTML=`
        <h1>Track Details</h1>
        ${f({trackId:t})}
      `,g(t)}}function o(e){const r=document.getElementById("track-list");r&&(r.innerHTML=p(),k(e).then(t=>{r&&(r.innerHTML=t.map(c=>u({track:c})).join(""))}).catch(t=>{r&&(r.innerHTML='<p class="error">Error loading tracks. Please try again.</p>',console.error("Error fetching tracks:",t))}))}window.navigateTo=h;document.addEventListener("DOMContentLoaded",()=>{s("/")});
