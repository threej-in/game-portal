import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suggest a Game",
  description:
    "Suggest an open-source browser game for Threej Games. Send a repository or playable link for review.",
  alternates: {
    canonical: "/suggest-game",
  },
};

type SuggestGamePageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

function StatusMessage({ status }: { status?: string }) {
  if (status === "ok") {
    return (
      <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
        Suggestion sent successfully.
      </p>
    );
  }

  if (status === "invalid") {
    return (
      <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
        Game name and link are required.
      </p>
    );
  }

  if (status === "config") {
    return (
      <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
        Telegram delivery is not configured yet. Add your bot token and chat ID on the server first.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
        Suggestion could not be sent. Try again later.
      </p>
    );
  }

  return null;
}

export default async function SuggestGamePage({ searchParams }: SuggestGamePageProps) {
  const { status } = await searchParams;

  return (
    <main>
      <section className="card mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Suggest a Game</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-100">Know a game we should add?</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
              Send the game name, source repository, or playable link. We will review it for licensing, browser support,
              and fit with the portal.
            </p>
          </div>
          <Link href="/" className="btn btn-secondary">
            Back Home
          </Link>
        </div>

        <div className="mt-6">
          <StatusMessage status={status} />
        </div>

        <form action="/api/suggest-game" method="post" className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Game name</span>
            <input
              name="gameName"
              type="text"
              required
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="SuperTux, OpenLieroX, Browser Quake..."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Repo or game link</span>
            <input
              name="gameUrl"
              type="url"
              required
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="https://github.com/..."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Why should we add it?</span>
            <textarea
              name="notes"
              rows={5}
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="Browser-ready, open source, good touch controls, strong multiplayer, etc."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Your name or handle</span>
            <input
              name="sender"
              type="text"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="Optional"
            />
          </label>

          <input name="company" type="text" tabIndex={-1} autoComplete="off" className="hidden" />

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-primary">
              Send Suggestion
            </button>
            <p className="text-xs text-slate-500">Required: game name and link.</p>
          </div>
        </form>
      </section>
    </main>
  );
}
