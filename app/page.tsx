import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HomeFab } from "@/components/home-fab";
import { getAllGames, getNewestGames } from "@/lib/games";
import { getMostPlayedGameSlug, readPlayStats, sortGamesByPopularity } from "@/lib/play-stats";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Free Browser Games",
  description:
    "Play free browser games on Threej Games. Discover open-source arcade, puzzle, racing, strategy, and board games that launch instantly in your browser.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [stats, mostPlayedSlug] = await Promise.all([readPlayStats(), getMostPlayedGameSlug()]);
  const newestGames = getNewestGames(5);
  const newestSlugs = new Set(newestGames.map((game) => game.slug));
  const remainingGames = sortGamesByPopularity(
    getAllGames().filter((game) => !newestSlugs.has(game.slug)),
    stats,
  );
  const games = [...newestGames, ...remainingGames];

  return (
    <main>
      <section aria-label="Game catalog">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6">
          {games.map((game) => (
            <article
              key={game.slug}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-lg shadow-black/30 transition duration-200 hover:shadow-2xl hover:shadow-black/50"
            >
              <Link href={`/play/${game.slug}`} className="absolute inset-0 z-10" aria-label={`Play ${game.title}`} />
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={
                  game.coverFit === "contain"
                    ? "object-contain object-center p-4"
                    : "object-fill"
                }
                priority={game.slug === "diablo-js"}
              />
              <div className="absolute left-2 top-2 z-10">
                <div className="flex flex-col gap-2">
                  {game.slug === mostPlayedSlug ? (
                    <span className="rounded-full border border-fuchsia-300/70 bg-fuchsia-950/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-fuchsia-50 backdrop-blur">
                      Most Played
                    </span>
                  ) : null}
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
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 px-3 pb-3 text-base font-semibold text-white opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                {game.title}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section aria-label="Game index" className="mt-6 border-t border-slate-800/70 px-3 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Game index</h2>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
          {games.map((game) => (
            <Link key={game.slug} href={`/game/${game.slug}`} className="hover:text-cyan-200">
              {game.title}
            </Link>
          ))}
        </div>
      </section>
      <footer className="mt-8 border-t border-slate-800/70 px-3 py-8">
        <div className="grid gap-6 rounded-2xl border border-slate-800/70 bg-slate-950/55 p-5 shadow-2xl shadow-black/25 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-base font-black tracking-tight text-white">Threej Games</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              A fast browser game catalog focused on open-source and web-playable games hosted from our own server.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Catalog</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                <div className="text-2xl font-black text-white">{games.length}</div>
                <div className="text-xs text-slate-500">Games</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                <div className="text-2xl font-black text-white">Free</div>
                <div className="text-xs text-slate-500">To play</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Explore</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
              <Link href="/" className="hover:text-cyan-200">Home catalog</Link>
              <Link href="/suggest-game" className="hover:text-cyan-200">Suggest a game</Link>
              <Link href="/sitemap.xml" className="hover:text-cyan-200">Sitemap</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Source</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Each game info page links to the original project or source where available.
            </p>
            <a
              href="https://github.com/threej-in/game-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-900 hover:text-white"
              aria-label="Open Threej Games GitHub repository"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M12 .5A12 12 0 0 0 8.21 23.9c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>
      <HomeFab />
    </main>
  );
}
