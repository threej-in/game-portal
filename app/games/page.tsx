import Link from "next/link";
import type { Metadata } from "next";
import { GameCard } from "@/components/game-card";
import { getAllCategories, searchGames } from "@/lib/games";

export const metadata: Metadata = {
  title: "Browse Games",
  description:
    "Browse the full Threej Games catalog by title and category. Find free browser puzzle, racing, arcade, strategy, and board games.",
  alternates: {
    canonical: "/games",
  },
};

type GamesPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const { q, category } = await searchParams;
  const games = searchGames(q, category);
  const categories = getAllCategories();

  return (
    <main>
      <section className="card p-6">
        <h1 className="text-3xl font-bold text-slate-100">Browse Games</h1>
        <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search title, tags, description..."
          />
          <select
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 outline-none focus:border-blue-500"
            name="category"
            defaultValue={category ?? ""}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" type="submit">
            Filter
          </button>
        </form>
      </section>

      <section className="mt-6">
        {games.length === 0 ? (
          <div className="card p-6">
            <p className="text-slate-300">No games found for the current filters.</p>
            <Link href="/games" className="mt-3 inline-flex text-sm font-semibold text-blue-400">
              Reset filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
