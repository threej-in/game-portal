import Image from "next/image";
import Link from "next/link";
import { getFeaturedGames } from "@/lib/games";

export default function NotFound() {
  const suggestions = getFeaturedGames().slice(0, 6);

  return (
    <main>
      <section className="card px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">404</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-100 sm:text-4xl">Page not found</h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            The page you requested does not exist or the link is outdated.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
            <Link href="/games" className="btn btn-secondary">
              Browse Games
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">Suggested Games</h2>
          <Link href="/games" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {suggestions.map((game) => (
            <article
              key={game.slug}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-lg shadow-black/30 transition duration-200 hover:shadow-2xl hover:shadow-black/50"
            >
              <Link href={`/play/${game.slug}`} className="absolute inset-0 z-0" aria-label={`Play ${game.title}`} />
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center"
              />
              <div className="absolute left-2 top-2 z-10">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur ${
                    game.mobile
                      ? "border border-cyan-300/70 bg-cyan-950/90 text-cyan-50"
                      : "border border-amber-500/30 bg-amber-500/15 text-amber-100"
                  }`}
                >
                  {game.mobile ? "Mobile" : "Desktop"}
                </span>
              </div>
              <Link
                href={`/game/${game.slug}`}
                aria-label={`View info for ${game.title}`}
                className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/15 bg-slate-950/70 text-white backdrop-blur transition hover:bg-slate-900"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 4.75a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 12 6.75Zm1.5 10.5h-3v-1.5h.75V11.5h-1V10h2.5v5.75h.75Z" />
                </svg>
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-3 pb-3 text-sm font-semibold text-white sm:text-base">
                {game.title}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
