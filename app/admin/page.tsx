export default function AdminPage() {
  return (
    <main>
      <section className="card p-6">
        <h1 className="text-3xl font-bold text-slate-900">Admin: Add Game</h1>
        <p className="mt-2 text-sm text-slate-600">
          This starter includes a form UI. Next step is connecting this form to PostgreSQL and a protected API route.
        </p>

        <form className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm text-slate-700">
            Title
            <input className="rounded-xl border border-blue-100 px-4 py-2" placeholder="e.g. Hextris" />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            Slug
            <input className="rounded-xl border border-blue-100 px-4 py-2" placeholder="e.g. hextris" />
          </label>
          <label className="grid gap-1 text-sm text-slate-700 sm:col-span-2">
            Short Description
            <input
              className="rounded-xl border border-blue-100 px-4 py-2"
              placeholder="One-liner shown in cards and listings"
            />
          </label>
          <label className="grid gap-1 text-sm text-slate-700 sm:col-span-2">
            Embed URL
            <input className="rounded-xl border border-blue-100 px-4 py-2" placeholder="https://..." />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            Source URL
            <input className="rounded-xl border border-blue-100 px-4 py-2" placeholder="https://github.com/..." />
          </label>
          <label className="grid gap-1 text-sm text-slate-700">
            License
            <input className="rounded-xl border border-blue-100 px-4 py-2" placeholder="MIT / Apache-2.0 / ..." />
          </label>
          <label className="grid gap-1 text-sm text-slate-700 sm:col-span-2">
            Attribution
            <input className="rounded-xl border border-blue-100 px-4 py-2" placeholder="Original author credits" />
          </label>
          <button type="button" className="btn btn-primary w-fit">
            Save (wire backend next)
          </button>
        </form>
      </section>
    </main>
  );
}
