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

const games: Game[] = [
  {
    slug: "diablo-js",
    title: "Diablo JS",
    coverImage: "/covers/diablo-js.svg",
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
    coverImage: "/covers/hextris.svg",
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
    coverImage: "/covers/tower-building.svg",
    shortDescription: "Stack moving blocks to build the tallest tower.",
    description:
      "A timing-based one-button game where each perfect placement keeps your tower stable and growing.",
    categories: ["Arcade"],
    tags: ["Timing", "One Button", "Score Attack"],
    featured: false,
    mobile: true,
    license: "MIT",
    sourceUrl: "https://github.com/your-org/game-portal",
    attribution: "Arcadia Portal local game",
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
];

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
