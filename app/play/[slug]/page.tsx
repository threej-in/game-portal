import { notFound, redirect } from "next/navigation";
import { getGameBySlug } from "@/lib/games";
import { incrementPlayCount } from "@/lib/play-stats";

type PlayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function PlayPage({ params }: PlayPageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  await incrementPlayCount(slug);
  redirect(game.embedUrl);
}
