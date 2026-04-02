"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function HomeFab() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!open || !panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <>
      {open ? (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-4 z-40 w-[min(360px,calc(100vw-1rem))] rounded-2xl border border-slate-700 bg-slate-950/95 p-3 shadow-2xl shadow-black/50 backdrop-blur sm:right-5"
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Search</p>
              <p className="mt-1 text-xs text-slate-400">Find games by title, tag, or genre.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:bg-slate-800"
              aria-label="Close search"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.41 4.29 19.7 2.88 18.29 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.29-6.29z" />
              </svg>
            </button>
          </div>
          <form action="/games" method="get" className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              autoFocus
              type="text"
              name="q"
              placeholder="Search games..."
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      ) : null}

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-5 sm:right-5">
        <Link
          href="/suggest-game"
          aria-label="Suggest a game"
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-500 text-white shadow-xl shadow-black/40 transition hover:scale-105 hover:bg-emerald-400"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            <path d="M19 11H13V5h-2v6H5v2h6v6h2v-6h6z" />
          </svg>
          <span className="pointer-events-none absolute right-16 hidden rounded-full border border-slate-700 bg-slate-950/95 px-3 py-1 text-xs font-medium text-slate-200 shadow-lg group-hover:block">
            Suggest a game
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open game search"
          aria-expanded={open}
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-500 text-slate-950 shadow-xl shadow-black/40 transition hover:scale-105 hover:bg-cyan-400"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            <path d="M10 2a8 8 0 1 0 4.9 14.32l5.39 5.38 1.41-1.41-5.38-5.39A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" />
          </svg>
          <span className="pointer-events-none absolute right-16 hidden rounded-full border border-slate-700 bg-slate-950/95 px-3 py-1 text-xs font-medium text-slate-200 shadow-lg group-hover:block">
            Search games
          </span>
        </button>
      </div>
    </>
  );
}
