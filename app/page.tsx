import Link from "next/link";
import { GameCard } from "@/components/game-card";
import { getAllCategories, getFeaturedGames } from "@/lib/games";

export default function Home() {
  const featuredGames = getFeaturedGames();
  const categories = getAllCategories();

  return (
    <main>
      <section className="card overflow-hidden px-6 py-10 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Launch-ready Starter</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Build your Poki-style portal for open-source web games.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          Catalog games, add metadata and licensing, and embed HTML5 titles on fast SEO-friendly pages.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/games" className="btn btn-primary">
            Explore catalog
          </Link>
          <Link href="/admin" className="btn btn-secondary">
            Add a game
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Featured Games</h2>
          <Link href="/games" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
            See all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      <section className="mt-8 card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Popular Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category} href={`/games?category=${encodeURIComponent(category)}`} className="chip">
              {category}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
