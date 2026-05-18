"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isVideosActive = pathname.startsWith("/videos") || pathname.startsWith("/submit-video");
  const isGamesActive = !isVideosActive;
  const activeClass = "bg-slate-900 text-white ring-1 ring-slate-800";
  const inactiveClass = "text-slate-300 hover:bg-slate-900 hover:text-white";

  return (
    <header className="sticky top-0 z-30 mb-6 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-2 sm:px-8">
        <Link href="/" className="inline-flex" aria-label="3J home">
          <span className="inline-flex h-12 w-12 items-center justify-center bg-red-500 text-xl font-black text-white shadow-lg shadow-red-950/30">
            3J
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Link href="/videos" className={`px-4 py-2 transition hover:bg-slate-800 ${isVideosActive ? activeClass : inactiveClass}`}>
            Watch Videos
          </Link>
          <Link href="/" className={`px-4 py-2 transition hover:bg-slate-800 ${isGamesActive ? activeClass : inactiveClass}`}>
            Play Games
          </Link>
        </nav>
      </div>
    </header>
  );
}
