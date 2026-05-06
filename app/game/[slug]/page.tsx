import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGames, getGameBySlug } from "@/lib/games";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://threej.in";

type GameDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: GameDetailsPageProps): Promise<Metadata> {
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

  const description = `${game.shortDescription} ${game.mobile ? "Mobile-friendly browser game." : "Best played on desktop."} Source available at ${game.sourceUrl}.`;

  return {
    title: `${game.title} Game Guide`,
    description,
    alternates: {
      canonical: `/game/${game.slug}`,
    },
    openGraph: {
      title: `${game.title} | Threej Games`,
      description,
      url: `/game/${game.slug}`,
      images: [
        {
          url: game.coverImage,
          alt: `${game.title} cover art`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} | Threej Games`,
      description,
      images: [game.coverImage],
    },
  };
}

export default async function GameDetailsPage({ params }: GameDetailsPageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const hasExternalSource = /^https?:\/\//i.test(game.sourceUrl);
  const sourceLabel = hasExternalSource ? "Source Repo" : "Project Link";
  const relatedGames = getAllGames()
    .filter(
      (item) =>
        item.slug !== game.slug &&
        item.categories.some((category) => game.categories.includes(category)),
    )
    .slice(0, 8);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    image: new URL(game.coverImage, siteUrl).toString(),
    url: new URL(`/game/${game.slug}`, siteUrl).toString(),
    applicationCategory: "Game",
    gamePlatform: "Web browser",
    genre: game.categories,
    keywords: game.tags.join(", "),
    license: game.license,
    author: {
      "@type": "Organization",
      name: game.attribution,
      url: hasExternalSource ? game.sourceUrl : undefined,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="card p-6">
        <div className="flex flex-wrap gap-2">
          {game.categories.map((category) => (
            <span key={category} className="chip">
              {category}
            </span>
          ))}
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              game.mobile
                ? "border border-cyan-300/70 bg-cyan-950/90 text-cyan-50"
                : "border border-amber-500/30 bg-amber-500/15 text-amber-200"
            }`}
          >
            {game.mobile ? "Mobile Ready" : "Desktop Best"}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-100">{game.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-300">{game.description}</p>
        <p className="mt-3 max-w-3xl text-sm text-slate-400">
          {game.mobile
            ? "This game is expected to work well on smaller screens and touch devices."
            : "This game is better on larger screens and may rely on keyboard, mouse, or a fixed desktop-style layout."}
        </p>
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
          <a href={game.sourceUrl} className="btn btn-secondary" target="_blank" rel="noreferrer">
            {sourceLabel}
          </a>
          <Link href="/" className="btn btn-secondary">
            Back to catalog
          </Link>
        </div>
      </article>

      <section className="mt-6 card p-6">
        <h2 className="text-xl font-semibold text-slate-100">License and Attribution</h2>
        <dl className="mt-3 grid gap-3 text-sm text-slate-300">
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
              <a className="text-blue-400 hover:text-blue-300" href={game.sourceUrl} target="_blank" rel="noreferrer">
                {game.sourceUrl}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {relatedGames.length > 0 ? (
        <section className="mt-6 card p-6">
          <h2 className="text-xl font-semibold text-slate-100">Related Games</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {relatedGames.map((item) => (
              <Link key={item.slug} href={`/game/${item.slug}`} className="chip hover:text-cyan-200">
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
