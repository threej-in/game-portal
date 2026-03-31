import Image from "next/image";
import Link from "next/link";
import { getAllGames } from "@/lib/games";

export default function Home() {
  const games = getAllGames();

  return (
    <main>
      <section>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6">
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/play/${game.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-lg shadow-black/30 transition duration-200 hover:shadow-2xl hover:shadow-black/50"
            >
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center"
                priority={game.slug === "diablo-js"}
              />
              <div className="absolute left-2 top-2 z-10">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur ${
                    game.mobile
                      ? "border border-cyan-500/30 bg-cyan-500/15 text-cyan-100"
                      : "border border-amber-500/30 bg-amber-500/15 text-amber-100"
                  }`}
                >
                  {game.mobile ? "Mobile" : "Desktop"}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 px-3 pb-3 text-base font-semibold text-white opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                {game.title}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
