import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Viral Video Source",
  description:
    "Submit the full original source video behind a viral social media clip for review.",
  keywords: [
    "submit viral video",
    "full video source",
    "viral clip source",
    "original video submission",
  ],
  alternates: {
    canonical: "/submit-video",
  },
};

type SubmitVideoPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

function StatusMessage({ status }: { status?: string }) {
  if (status === "ok") {
    return (
      <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
        Video submission sent successfully.
      </p>
    );
  }

  if (status === "invalid") {
    return (
      <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
        Title, description, and supported embed code are required.
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
        Video submission could not be sent. Try again later.
      </p>
    );
  }

  return null;
}

export default async function SubmitVideoPage({ searchParams }: SubmitVideoPageProps) {
  const { status } = await searchParams;

  return (
    <main>
      <section className="card mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-300">Submit Video</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-100">Add a viral video source</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
              Paste iframe or social embed code from the video host, plus the title and description. YouTube, Vimeo, X/Twitter, Instagram, TikTok, and Reddit embeds are supported.
            </p>
          </div>
          <Link href="/videos" className="btn btn-secondary">
            Back to Videos
          </Link>
        </div>

        <div className="mt-6">
          <StatusMessage status={status} />
        </div>

        <form action="/api/submit-video" method="post" className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Video title</span>
            <input
              name="title"
              type="text"
              required
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="Full source video title behind the viral clip"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Description</span>
            <textarea
              name="description"
              rows={5}
              required
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="Explain what clip this is related to, where it appeared, and why this is the full source."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Embed code</span>
            <textarea
              name="embedHtml"
              rows={6}
              required
              className="font-mono rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs text-slate-100 outline-none focus:border-cyan-400"
              placeholder={'<iframe src="https://..."></iframe> or <blockquote class="twitter-tweet">...</blockquote>'}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Original source URL</span>
            <input
              name="sourceUrl"
              type="url"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="https://video-host.example/watch/..."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Source name</span>
            <input
              name="sourceName"
              type="text"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="YouTube, Vimeo, Dailymotion, original uploader..."
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Thumbnail URL</span>
            <input
              name="thumbnailUrl"
              type="url"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="Optional image URL for SEO/social preview"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">Tags</span>
            <input
              name="tags"
              type="text"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400"
              placeholder="viral, news, sports, interview"
            />
          </label>

          <input name="company" type="text" tabIndex={-1} autoComplete="off" className="hidden" />

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-primary">
              Send Video
            </button>
            <p className="text-xs text-slate-500">Required: title, description, and supported embed code.</p>
          </div>
        </form>
      </section>
    </main>
  );
}
