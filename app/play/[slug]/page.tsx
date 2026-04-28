import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getGameBySlug } from "@/lib/games";
import { incrementPlayCount } from "@/lib/play-stats";

type PlayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PlayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    return {
      title: "Game Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `Play ${game.title}`,
    description: `Redirecting to play ${game.title}.`,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/game/${game.slug}`,
    },
  };
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  await incrementPlayCount(slug);
  redirect(game.embedUrl);
}
