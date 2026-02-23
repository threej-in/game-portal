import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-blue-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-blue-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-white">
            A
          </span>
          Arcadia Portal
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Link href="/games" className="btn btn-secondary">
            Browse Games
          </Link>
          <Link href="/admin" className="btn btn-primary">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
