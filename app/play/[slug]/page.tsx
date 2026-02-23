import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGames, getGameBySlug } from "@/lib/games";

type PlayPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllGames().map((game) => ({ slug: game.slug }));
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <main>
      <section className="card p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{game.title}</h1>
            <p className="text-sm text-slate-600">{game.shortDescription}</p>
          </div>
          <div className="flex items-center gap-2">
            <a className="btn btn-secondary" href={game.embedUrl} target="_blank" rel="noreferrer">
              Open in new tab
            </a>
            <Link className="btn btn-primary" href={`/game/${game.slug}`}>
              Game details
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-blue-100 bg-black">
          <iframe
            src={game.embedUrl}
            title={`${game.title} game player`}
            loading="lazy"
            allowFullScreen
            className="h-[70vh] min-h-[420px] w-full"
          />
        </div>
      </section>
    </main>
  );
}
