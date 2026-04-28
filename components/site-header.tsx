import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-slate-100">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-white">
            A
          </span>
          Threej Games
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <Link href="/games" className="btn btn-secondary">
            Browse Games
          </Link>
        </nav>
      </div>
    </header>
  );
}
