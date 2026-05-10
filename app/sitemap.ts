import type { MetadataRoute } from "next";
import { getAllGames } from "@/lib/games";
import { readAllVideos } from "@/lib/video-store";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://threej.in";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();
  const games = getAllGames();
  const videos = await readAllVideos();

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
    {
      url: `${baseUrl}/videos`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit-video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
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

  const videoRoutes: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${baseUrl}/videos/${video.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...gameRoutes, ...videoRoutes];
}
