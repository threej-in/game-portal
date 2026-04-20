const SITE_ORIGIN = "https://threej.in";
const API_URL = `${SITE_ORIGIN}/api/games`;

const statusEl = document.getElementById("status");
const gridEl = document.getElementById("games-grid");
const searchInput = document.getElementById("search-input");
const template = document.getElementById("game-card-template");

let games = [];

async function loadGames() {
  statusEl.textContent = "Loading games...";

  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Catalog request failed with ${response.status}`);
    }

    const payload = await response.json();
    games = Array.isArray(payload.games) ? payload.games : [];
    renderGames(games);
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Could not load games from threej.in.";
  }
}

function renderGames(filteredGames) {
  gridEl.innerHTML = "";

  if (!filteredGames.length) {
    statusEl.textContent = "No games match your search.";
    return;
  }

  statusEl.textContent = `${filteredGames.length} game${filteredGames.length === 1 ? "" : "s"} available`;

  for (const game of filteredGames) {
    const fragment = template.content.cloneNode(true);
    const button = fragment.querySelector(".game-card");
    const image = fragment.querySelector(".game-cover");
    const title = fragment.querySelector(".game-title");

    image.src = `${SITE_ORIGIN}${game.coverImage}`;
    image.alt = game.title;
    title.textContent = game.title;

    button.addEventListener("click", () => {
      chrome.tabs.create({ url: `${SITE_ORIGIN}${game.playUrl}` });
    });

    gridEl.appendChild(fragment);
  }
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderGames(games);
    return;
  }

  const filtered = games.filter((game) => {
    const haystack = `${game.title} ${game.shortDescription} ${game.categories.join(" ")}`.toLowerCase();
    return haystack.includes(query);
  });

  renderGames(filtered);
});

loadGames();
