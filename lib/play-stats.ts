import fs from "node:fs/promises";
import path from "node:path";
import { getAllGames, type Game } from "@/lib/games";

type PlayStats = Record<string, number>;

const statsDir = path.join(process.cwd(), "data");
const statsPath = path.join(statsDir, "play-stats.json");

async function ensureStatsFile() {
  await fs.mkdir(statsDir, { recursive: true });
  try {
    await fs.access(statsPath);
  } catch {
    await fs.writeFile(statsPath, "{}", "utf8");
  }
}

export async function readPlayStats(): Promise<PlayStats> {
  await ensureStatsFile();
  try {
    const raw = await fs.readFile(statsPath, "utf8");
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

export async function incrementPlayCount(slug: string) {
  const stats = await readPlayStats();
  stats[slug] = (stats[slug] ?? 0) + 1;
  await fs.writeFile(statsPath, JSON.stringify(stats, null, 2), "utf8");
  return stats[slug];
}

export function sortGamesByPopularity(games: Game[], stats: PlayStats) {
  return [...games].sort((a, b) => {
    const aCount = stats[a.slug] ?? 0;
    const bCount = stats[b.slug] ?? 0;
    if (aCount !== bCount) {
      return bCount - aCount;
    }
    return a.title.localeCompare(b.title);
  });
}

export async function getMostPlayedGameSlug() {
  const stats = await readPlayStats();
  const games = getAllGames();
  const ranked = sortGamesByPopularity(games, stats);
  const top = ranked[0];
  if (!top || (stats[top.slug] ?? 0) === 0) {
    return null;
  }
  return top.slug;
}
