import { talha37Games } from "./talha37-games";

export type Game = {
  slug: string;
  title: string;
  coverImage: string;
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
    coverImage: "/covers/2048.svg",
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
    attribution: "Arcadia Portal local game",
    embedUrl: "/games/space-shooter/index.html",
  },
  {
    slug: "super-tux",
    title: "Super Tux",
    coverImage: "/covers/super-tux.png",
    shortDescription: "Snowy side-scrolling platformer starring Tux.",
    description:
      "Browser-based Super Tux fan implementation with a classic icy platformer layout, intro screen, music, enemies, and collectible-driven gameplay.",
    categories: ["Platformer", "Arcade"],
    tags: ["Sidescroller", "Retro", "Keyboard"],
    featured: false,
    mobile: false,
    license: "No license file declared in source repository",
    sourceUrl: "https://github.com/drmmegahed/super-tux",
    attribution: "drmmegahed",
    embedUrl: "/games/super-tux/index.html",
  },
  {
    slug: "super-tux-html5",
    title: "Super Tux HTML5",
    coverImage: "/covers/super-tux-html5.svg",
    shortDescription: "Phaser-powered Super Tux platformer with icy stages.",
    description:
      "Standalone Super Tux HTML5 fan project built with Phaser, featuring an icy side-scrolling level, coin collection, jump audio, fullscreen toggle, and keyboard or gamepad support.",
    categories: ["Platformer", "Arcade"],
    tags: ["Phaser", "Sidescroller", "Gamepad"],
    featured: false,
    mobile: false,
    license: "GPL-3.0",
    sourceUrl: "https://github.com/metalx1000/Super-Tux-HTML5",
    attribution: "Kris Occhipinti (metalx1000)",
    embedUrl: "/games/super-tux-html5/index.html",
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
];

const games: Game[] = [...coreGames, ...talha37Games];

export function getAllGames(): Game[] {
  return games;
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
