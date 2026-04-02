import Link from "next/link";
import type { Game } from "@/lib/games";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="card p-5">
      <div className="mb-3 flex flex-wrap gap-2">
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
      <h3 className="text-xl font-semibold text-slate-100">{game.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{game.shortDescription}</p>
      <div className="mt-4 flex items-center gap-2">
        <Link className="btn btn-primary" href={`/play/${game.slug}`}>
          Play
        </Link>
        <Link className="btn btn-secondary" href={`/game/${game.slug}`}>
          Details
        </Link>
      </div>
    </article>
  );
}
