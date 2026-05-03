import { talha37Games } from "./talha37-games";

export type Game = {
  slug: string;
  title: string;
  coverImage: string;
  coverFit?: "cover" | "contain";
  shortDescription: string;
  description: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  mobile: boolean;
  license: string;
  sourceUrl: string;
  attribution: string;
  embedUrl: string;
};

const coreGames: Game[] = [
  {
    slug: "diablo-js",
    title: "Diablo JS",
    coverImage: "/covers/diablo-js.jpg",
    shortDescription: "Isometric action RPG built in HTML5 canvas and JavaScript.",
    description:
      "Open-source Diablo-inspired browser game with classic click-to-move combat and dungeon atmosphere. Best experienced on desktop with keyboard and mouse.",
    categories: ["Action", "RPG"],
    tags: ["Isometric", "Hack and Slash", "Classic"],
    featured: false,
    mobile: false,
    license: "MIT",
    sourceUrl: "https://github.com/mitallast/diablo-js",
    attribution: "mitallast and contributors",
    embedUrl: "/games/diablo-js/index.html",
  },
  {
    slug: "hextris",
    title: "Hextris",
    coverImage: "/covers/hextris.png",
    shortDescription: "Fast-paced hexagon puzzle game inspired by Tetris.",
    description:
      "Rotate the hexagon to catch falling blocks and clear sides before they overflow. Great for quick sessions and high-score loops.",
    categories: ["Puzzle", "Arcade"],
    tags: ["Reflex", "High Score", "Minimal"],
    featured: true,
    mobile: true,
    license: "MIT",
    sourceUrl: "https://github.com/Hextris/hextris",
    attribution: "Hextris contributors",
    embedUrl: "/games/hextris/index.html",
  },
  {
    slug: "2048",
    title: "2048",
    coverImage: "/covers/2048.gif",
    shortDescription: "Merge tiles until you hit 2048 and beyond.",
    description:
      "Slide numbered tiles across a 4x4 board to combine values strategically. Easy to learn, hard to master.",
    categories: ["Puzzle", "Strategy"],
    tags: ["Logic", "Single Player", "Keyboard"],
    featured: true,
    mobile: true,
    license: "MIT",
    sourceUrl: "https://github.com/gabrielecirulli/2048",
    attribution: "Gabriele Cirulli and contributors",
    embedUrl: "/games/2048/index.html",
  },
  {
    slug: "tower-building",
    title: "Tower Building",
    coverImage: "/covers/tower-building.jpg",
    shortDescription: "Stack moving blocks to build the tallest tower.",
    description:
      "A timing-based one-button game where each perfect placement keeps your tower stable and growing.",
    categories: ["Arcade"],
    tags: ["Timing", "One Button", "Score Attack"],
    featured: false,
    mobile: true,
    license: "MIT",
    sourceUrl: "https://github.com/iamkun/tower_game",
    attribution: "iamkun and contributors",
    embedUrl: "/games/tower-building/index.html",
  },
  {
    slug: "space-shooter",
    title: "Space Shooter",
    coverImage: "/covers/space-shooter.svg",
    shortDescription: "Classic wave survival shooter in your browser.",
    description:
      "Dodge enemy fire, collect upgrades, and survive escalating waves in a retro-style top-down shooter.",
    categories: ["Shooter", "Action"],
    tags: ["Space", "Waves", "Retro"],
    featured: false,
    mobile: false,
    license: "MIT",
    sourceUrl: "https://github.com/your-org/game-portal",
    attribution: "Threej Games local game",
    embedUrl: "/games/space-shooter/index.html",
  },
  {
    slug: "memory-game",
    title: "Memory Game",
    coverImage: "/covers/memory-game.jpg",
    shortDescription: "Match superhero card pairs in a fast browser memory challenge.",
    description:
      "Completed and hosted from the Ironhack DOM memory game lab starter, this version shuffles the deck, tracks attempts, locks matched pairs, and lets players restart instantly.",
    categories: ["Puzzle", "Arcade"],
    tags: ["Memory", "Cards", "Casual"],
    featured: false,
    mobile: true,
    license: "No license file declared in source repository",
    sourceUrl: "https://github.com/ironhack-labs/lab-javascript-memory-game",
    attribution: "ironhack-labs",
    embedUrl: "/games/memory-game/index.html",
  },
  {
    slug: "tetris",
    title: "Tetris",
    coverImage: "/covers/tetris.svg",
    shortDescription: "Classic falling-block arcade puzzle in plain JavaScript.",
    description:
      "Self-contained HTML5 Tetris implementation by Jake Gordon with responsive canvas scaling, next-piece preview, keyboard controls, scoring, and row tracking.",
    categories: ["Puzzle", "Arcade"],
    tags: ["Blocks", "Retro", "Keyboard"],
    featured: true,
    mobile: false,
    license: "MIT",
    sourceUrl: "https://github.com/jakesgordon/javascript-tetris",
    attribution: "Jake Gordon and contributors",
    embedUrl: "/games/tetris/index.html",
  },
  {
    slug: "racer",
    title: "Javascript Racer",
    coverImage: "/covers/racer.svg",
    shortDescription: "OutRun-style pseudo-3D racing demo in HTML5 canvas.",
    description:
      "Jake Gordon's final javascript-racer build with hills, curves, traffic, lap timing, and resolution controls. Source code is MIT licensed; the repository README notes separate restrictions for included music and placeholder sprite artwork.",
    categories: ["Racing", "Arcade"],
    tags: ["Driving", "Pseudo 3D", "Retro"],
    featured: true,
    mobile: false,
    license: "MIT code, with additional asset restrictions noted by source repository",
    sourceUrl: "https://github.com/jakesgordon/javascript-racer",
    attribution: "Jake Gordon and contributors",
    embedUrl: "/games/racer/play.html",
  },
  {
    slug: "isocity-ocean",
    title: "Ocean",
    coverImage: "/covers/ocean.png",
    shortDescription: "Underwater survival arcade game built with Polymatic and Stage.js.",
    description:
      "Dive through an abstract ocean, manage oxygen, collect bubbles and valuables, avoid hostile sea life, and spend your earnings on upgrades as the run gets harder.",
    categories: ["Arcade", "Survival"],
    tags: ["Underwater", "Upgrades", "Score Attack"],
    featured: false,
    mobile: true,
    license: "MIT",
    sourceUrl: "https://github.com/piqnt/polymatic-example-ocean",
    attribution: "piqnt",
    embedUrl: "/games/isocity-ocean/index.html",
  },
  {
    slug: "pigeon-ascent",
    title: "Pigeon Ascent",
    coverImage: "/covers/pigeon-ascent.png",
    shortDescription: "Godot-made pigeon battler with upgrades, items, and boss fights.",
    description:
      "Fight your way upward as a battle pigeon, buy upgrades, collect items, and survive increasingly chaotic encounters in this self-hosted Godot HTML5 export.",
    categories: ["Arcade", "Action"],
    tags: ["Godot", "Upgrades", "Battles"],
    featured: false,
    mobile: false,
    license: "MIT",
    sourceUrl: "https://github.com/Escada-Games/pigeonAscent",
    attribution: "Escada Games",
    embedUrl: "/games/pigeon-ascent/index.html",
  },
  {
    slug: "hartwig-chess-set",
    title: "3D Hartwig Chess Set",
    coverImage: "/covers/chess.png",
    shortDescription: "Stylized 3D chess experience built with HTML, CSS, and JavaScript.",
    description:
      "Julian Garnier's Hartwig-inspired chess set renders a full 3D board with CSS transforms and built-in move validation. The original project notes WebKit-focused browser support, so it is best treated as a desktop visual demo first and a cross-browser chess game second.",
    categories: ["Puzzle", "Strategy"],
    tags: ["Chess", "3D", "WebKit"],
    featured: false,
    mobile: false,
    license: "MIT",
    sourceUrl: "https://github.com/juliangarnier/3D-Hartwig-chess-set",
    attribution: "Julian Garnier",
    embedUrl: "/games/hartwig-chess-set/index.html",
  },
  {
    slug: "c4",
    title: "C4 Connect Four",
    coverImage: "/covers/c4.svg",
    shortDescription: "Canvas-based Connect Four with local play and AI opponent modes.",
    description:
      "Modern TypeScript Connect Four implementation by Kenrick. This hosted build supports local human vs AI, human vs human, and AI vs AI modes inside the portal. The original online multiplayer mode is intentionally disabled here because it requires the companion game server.",
    categories: ["Puzzle", "Strategy"],
    tags: ["Connect Four", "Canvas", "AI"],
    featured: false,
    mobile: true,
    license: "MIT",
    sourceUrl: "https://github.com/kenrick95/c4",
    attribution: "Kenrick and contributors",
    embedUrl: "/games/c4/index.html",
  },
  {
    slug: "vaw",
    title: "Vaw",
    coverImage: "/covers/vaw.png",
    shortDescription: "Godot-made demo imported from a local HTML5 export.",
    description:
      "Self-hosted Godot web export provided locally and integrated into the portal. This entry uses the runtime files from the supplied export folder and keeps the game splash image as its catalog cover.",
    categories: ["Adventure", "Puzzle"],
    tags: ["Godot", "Demo", "Local Import"],
    featured: false,
    mobile: false,
    license: "No license file provided with the local export",
    sourceUrl: "/games/vaw/index.html",
    attribution: "Local Godot export provided by user",
    embedUrl: "/games/vaw/index.html",
  },
  {
    slug: "la-ola",
    title: "La Ola",
    coverImage: "/covers/la-ola.png",
    shortDescription: "Godot-made Mexican wave game imported from a local HTML5 export.",
    description:
      "Self-hosted Godot web export provided locally and integrated into the portal. This entry uses the exported runtime files directly and keeps the original splash image as the card cover.",
    categories: ["Arcade", "Casual"],
    tags: ["Godot", "Wave", "Local Import"],
    featured: false,
    mobile: true,
    license: "No license file provided with the local export",
    sourceUrl: "https://github.com/conor-wilson/la-ola",
    attribution: "conor-wilson and contributors; local export provided by user",
    embedUrl: "/games/la-ola/index.html",
  },
  {
    slug: "wavz",
    title: "ooqo",
    coverImage: "/covers/ooqo.png",
    coverFit: "cover",
    shortDescription: "A slick arcade score-chaser where movement becomes rhythm.",
    description:
      "A slick arcade score-chaser where movement becomes rhythm. Glide across fish to survive, chain combos to build momentum, and never step where you shouldn't. Simple rules, deep flow state, plus a hypnotic soundtrack and leaderboard that will steal your time.",
    categories: ["Arcade", "Action"],
    tags: ["Godot", "Score Chaser", "Rhythm"],
    featured: false,
    mobile: false,
    license: "No license file provided with the local export",
    sourceUrl: "https://github.com/aznoqmous/fish-storm",
    attribution: "aznoqmous and contributors; local export provided by user",
    embedUrl: "/games/wavz/index.html",
  },
  {
    slug: "tidal-town",
    title: "Tidal Town",
    coverImage: "/covers/tidaltown.gif",
    shortDescription: "City planning meets divine disaster in a bright tactical score-chaser.",
    description:
      "City planning meets divine disaster. Slide buildings into color groups to score points and calm Poseidon, who is absolutely not calm. This game is easy to learn, surprisingly tactical, and constantly evolving as waves reshape the board. Bright visuals, smooth play, and a playful take on managing chaos one house at a time.",
    categories: ["Strategy", "Puzzle"],
    tags: ["Godot", "City Builder", "Score Chaser"],
    featured: false,
    mobile: false,
    license: "No license file provided with the local export",
    sourceUrl: "https://github.com/Grumelkeks/GO2025-Waves",
    attribution: "Grumelkeks and contributors; local export provided by user",
    embedUrl: "/games/tidal-town/index.html",
  },
  {
    slug: "libreludo",
    title: "LibreLudo",
    coverImage: "/covers/libreludo.jpg",
    shortDescription: "Modern open-source Ludo with local multiplayer and bot opponents.",
    description:
      "A modern, ad-free, open-source Ludo game with a clean UI, local multiplayer, and bot opponents. It is easy to pick up, works well across desktop and mobile screens, and includes guides for setup and gameplay inside the app.",
    categories: ["Board", "Strategy"],
    tags: ["Ludo", "React", "Local Multiplayer"],
    featured: false,
    mobile: true,
    license: "AGPL-3.0-only",
    sourceUrl: "https://github.com/priyanshurav/libreludo",
    attribution: "priyanshurav and contributors",
    embedUrl: "/games/libreludo/",
  },
  {
    slug: "browserquest",
    title: "BrowserQuest",
    coverImage: "/covers/browserquest.jpg",
    shortDescription: "Mozilla's classic multiplayer HTML5 adventure powered by WebSockets.",
    description:
      "BrowserQuest is a multiplayer HTML5 adventure originally created by Little Workshop for Mozilla. Explore a pixel-art world, fight monsters, collect gear, and meet other players. This portal entry uses the community BrowserQuest fork and requires the included BrowserQuest server process to be running.",
    categories: ["RPG", "Adventure"],
    tags: ["Multiplayer", "WebSocket", "Pixel Art"],
    featured: false,
    mobile: false,
    license: "Code MPL-2.0; content CC-BY-SA-3.0",
    sourceUrl: "https://github.com/browserquest/BrowserQuest",
    attribution: "Little Workshop, Mozilla, and BrowserQuest community contributors",
    embedUrl: "/games/browserquest/index.html",
  },
  {
    slug: "twitchdodge",
    title: "DODGE",
    coverImage: "/covers/twitchdodge.png",
    shortDescription: "Fast browser arcade survival game with powerups, coin chains, and chiptune energy.",
    description:
      "Avoid the red and survive as long as possible in this browser-based arcade game. It mixes twitch reflex movement with powerups, coin chains, shields, and a bright retro presentation built for quick replay loops.",
    categories: ["Arcade", "Action"],
    tags: ["Reflex", "High Score", "HTML5"],
    featured: false,
    mobile: true,
    license: "No license file provided in the repository",
    sourceUrl: "https://github.com/twitchdodge/twitchdodge",
    attribution: "twitchdodge and contributors",
    embedUrl: "/games/twitchdodge/index.html",
  },
  {
    slug: "url-dinogame",
    title: "URL Dino Game",
    coverImage: "/covers/url-dinogame.gif",
    shortDescription: "A browser dinosaur runner played entirely inside the address bar.",
    description:
      "A lightweight implementation of the classic dinosaur game, reimagined inside the browser's address bar. Dodge obstacles, collect pickups, and survive as long as possible in a playful desktop-first twist on the endless runner formula.",
    categories: ["Arcade", "Action"],
    tags: ["Runner", "High Score", "Desktop"],
    featured: false,
    mobile: false,
    license: "Apache-2.0",
    sourceUrl: "https://github.com/Neilblaze/URL-Dinogame",
    attribution: "Neilblaze and contributors",
    embedUrl: "/games/url-dinogame/index.html",
  },
];

const games: Game[] = [...coreGames, ...talha37Games];

export function getAllGames(): Game[] {
  return games;
}

export function getNewestGames(limit = 5): Game[] {
  return [...coreGames].slice(-limit).reverse();
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function getFeaturedGames(): Game[] {
  return games.filter((game) => game.featured);
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  games.forEach((game) => game.categories.forEach((category) => categories.add(category)));
  return [...categories].sort();
}

export function searchGames(query?: string, category?: string): Game[] {
  return games.filter((game) => {
    const categoryMatch = category ? game.categories.includes(category) : true;
    if (!query) {
      return categoryMatch;
    }

    const q = query.toLowerCase();
    const text = `${game.title} ${game.shortDescription} ${game.tags.join(" ")}`.toLowerCase();
    return categoryMatch && text.includes(q);
  });
}

