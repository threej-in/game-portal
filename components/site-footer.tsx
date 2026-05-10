import Link from "next/link";

type SiteFooterProps = {
  gameCount?: number;
  videoCount?: number;
};

export function SiteFooter({ gameCount, videoCount }: SiteFooterProps) {
  return (
    <footer className="mt-8 border-t border-slate-800/70 px-3 py-8">
      <div className="grid gap-6 rounded-2xl border border-slate-800/70 bg-slate-950/55 p-5 shadow-2xl shadow-black/25 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-base font-black tracking-tight text-white">Threej</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            Browser games and full source videos behind viral clips, organized for fast viewing.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Catalog</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-2xl font-black text-white">{gameCount ?? "-"}</div>
              <div className="text-xs text-slate-500">Games</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-2xl font-black text-white">{videoCount ?? "-"}</div>
              <div className="text-xs text-slate-500">Videos</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Explore</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-cyan-200">Games</Link>
            <Link href="/videos" className="hover:text-cyan-200">Video sources</Link>
            <Link href="/suggest-game" className="hover:text-cyan-200">Suggest a game</Link>
            <Link href="/submit-video" className="hover:text-cyan-200">Submit a video</Link>
            <Link href="/sitemap.xml" className="hover:text-cyan-200">Sitemap</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Source</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Game pages link to original projects where available. Video pages link back to the researched source.
          </p>
          <a
            href="https://github.com/threej-in/game-portal"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-900 hover:text-white"
            aria-label="Open Threej GitHub repository"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12 .5A12 12 0 0 0 8.21 23.9c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

