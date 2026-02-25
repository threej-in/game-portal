import Image from "next/image";
import Link from "next/link";
import { getAllGames } from "@/lib/games";

export default function Home() {
  const games = getAllGames();

  return (
    <main>
      <section>
        <div className="columns-4 gap-3 sm:columns-6 lg:columns-8">
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/play/${game.slug}`}
              className="group relative mb-3 block break-inside-avoid overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-lg shadow-black/30 transition duration-200 hover:shadow-2xl hover:shadow-black/50"
            >
              <Image
                src={game.coverImage}
                alt={game.title}
                width={800}
                height={1000}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-contain object-center"
                priority={game.slug === "diablo-js"}
              />
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
