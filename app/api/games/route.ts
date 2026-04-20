import { NextResponse } from "next/server";
import { getAllGames } from "@/lib/games";

export function GET() {
  const games = getAllGames().map((game) => ({
    slug: game.slug,
    title: game.title,
    coverImage: game.coverImage,
    shortDescription: game.shortDescription,
    categories: game.categories,
    mobile: game.mobile,
    playUrl: `/play/${game.slug}`,
  }));

  return NextResponse.json({ games });
}
