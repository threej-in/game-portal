import Link from "next/link";
import { GameCard } from "@/components/game-card";
import { getAllCategories, searchGames } from "@/lib/games";

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
        <h1 className="text-3xl font-bold text-slate-900">Browse Games</h1>
        <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            className="rounded-xl border border-blue-100 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search title, tags, description..."
          />
          <select
            className="rounded-xl border border-blue-100 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500"
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
            <p className="text-slate-700">No games found for the current filters.</p>
            <Link href="/games" className="mt-3 inline-flex text-sm font-semibold text-blue-700">
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
