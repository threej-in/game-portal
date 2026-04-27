import Image from "next/image";
import Link from "next/link";
import { HomeFab } from "@/components/home-fab";
import { getAllGames } from "@/lib/games";
import { getMostPlayedGameSlug, readPlayStats, sortGamesByPopularity } from "@/lib/play-stats";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [stats, mostPlayedSlug] = await Promise.all([readPlayStats(), getMostPlayedGameSlug()]);
  const games = sortGamesByPopularity(getAllGames(), stats);

  return (
    <main>
      <section>
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
      <HomeFab />
    </main>
  );
}
