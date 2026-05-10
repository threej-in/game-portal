import Link from "next/link";

export function VideoFab() {
  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5">
      <Link
        href="/submit-video"
        aria-label="Submit a video"
        className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-red-300/30 bg-red-500 text-white shadow-xl shadow-black/40 transition hover:scale-105 hover:bg-red-400"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
          <path d="M19 11H13V5h-2v6H5v2h6v6h2v-6h6z" />
        </svg>
        <span className="pointer-events-none absolute right-16 hidden rounded-full border border-slate-700 bg-slate-950/95 px-3 py-1 text-xs font-medium text-slate-200 shadow-lg group-hover:block">
          Submit video
        </span>
      </Link>
    </div>
  );
}

