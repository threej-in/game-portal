import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGames, getGameBySlug } from "@/lib/games";

type GameDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllGames().map((game) => ({ slug: game.slug }));
}

export default async function GameDetailsPage({ params }: GameDetailsPageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <main>
      <article className="card p-6">
        <div className="flex flex-wrap gap-2">
          {game.categories.map((category) => (
            <span key={category} className="chip">
              {category}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">{game.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-700">{game.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span key={tag} className="chip">
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2">
          <Link href={`/play/${game.slug}`} className="btn btn-primary">
            Play now
          </Link>
          <Link href="/games" className="btn btn-secondary">
            Back to catalog
          </Link>
        </div>
      </article>

      <section className="mt-6 card p-6">
        <h2 className="text-xl font-semibold text-slate-900">License and Attribution</h2>
        <dl className="mt-3 grid gap-3 text-sm text-slate-700">
          <div>
            <dt className="font-semibold">License</dt>
            <dd>{game.license}</dd>
          </div>
          <div>
            <dt className="font-semibold">Attribution</dt>
            <dd>{game.attribution}</dd>
          </div>
          <div>
            <dt className="font-semibold">Source</dt>
            <dd>
              <a className="text-blue-700 hover:text-blue-900" href={game.sourceUrl} target="_blank" rel="noreferrer">
                {game.sourceUrl}
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
