export type Game = {
  slug: string;
  title: string;
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
    slug: "hextris",
    title: "Hextris",
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
    embedUrl: "https://hextris.github.io/hextris/",
  },
  {
    slug: "2048",
    title: "2048",
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
    embedUrl: "https://play2048.co/",
  },
  {
    slug: "tower-building",
    title: "Tower Building",
    shortDescription: "Stack moving blocks to build the tallest tower.",
    description:
      "A timing-based one-button game where each perfect placement keeps your tower stable and growing.",
    categories: ["Arcade"],
    tags: ["Timing", "One Button", "Score Attack"],
    featured: false,
    mobile: true,
    license: "Open Source Demo",
    sourceUrl: "https://github.com/cocos-creator/example-projects",
    attribution: "Community demo content",
    embedUrl: "https://games.construct.net/351/latest",
  },
  {
    slug: "space-shooter",
    title: "Space Shooter",
    shortDescription: "Classic wave survival shooter in your browser.",
    description:
      "Dodge enemy fire, collect upgrades, and survive escalating waves in a retro-style top-down shooter.",
    categories: ["Shooter", "Action"],
    tags: ["Space", "Waves", "Retro"],
    featured: false,
    mobile: false,
    license: "Open Source Demo",
    sourceUrl: "https://github.com/photonstorm/phaser-examples",
    attribution: "Phaser examples community",
    embedUrl: "https://phaser.io/examples/v3.85.0/games/invaders/view/invaders",
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
