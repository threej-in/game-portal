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
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{game.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{game.shortDescription}</p>
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
