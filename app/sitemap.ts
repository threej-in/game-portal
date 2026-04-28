import type { MetadataRoute } from "next";
import { getAllGames } from "@/lib/games";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://threej.in";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();
  const games = getAllGames();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/suggest-game`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const gameRoutes: MetadataRoute.Sitemap = games.flatMap((game) => [
    {
      url: `${baseUrl}/game/${game.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]);

  return [...staticRoutes, ...gameRoutes];
}
