import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { VideoFab } from "@/components/video-fab";
import { getAllGames } from "@/lib/games";
import { readAllVideos } from "@/lib/video-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Viral Videos - Full Original Video Sources",
  description:
    "Watch full original videos behind viral clips from Instagram, TikTok, YouTube Shorts, Facebook, X, and other social media platforms.",
  keywords: [
    "viral videos",
    "full viral video",
    "original video source",
    "social media clips",
    "watch full video",
    "viral clip source",
  ],
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "Viral Videos - Full Original Video Sources",
    description:
      "Find and watch full original source videos behind viral social media clips.",
    url: "/videos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Videos - Full Original Video Sources",
    description:
      "Find and watch full original source videos behind viral social media clips.",
  },
};

export default async function VideosPage() {
  const videos = await readAllVideos();
  const gameCount = getAllGames().length;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Viral video sources",
    description: "Full source videos behind viral clips and social media posts.",
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://threej.in/videos/${video.slug}`,
      name: video.title,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="mb-5 flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-red-300">Video Sources</div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Viral videos
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Full original video sources behind viral clips, organized for quick viewing.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300">
              {videos.length} videos
            </span>
            <Link
              href="/submit-video"
              className="rounded-full bg-red-500 px-3 py-2 text-xs font-black text-white shadow-lg shadow-red-950/30 transition hover:bg-red-400"
            >
              Submit
            </Link>
          </div>
        </div>

        <section className="grid snap-y snap-mandatory gap-4 sm:snap-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => {
            const embedType = getEmbedType(video.embedHtml);

            return (
              <Link
                key={video.slug}
                href={`/videos/${video.slug}`}
                className="group flex min-h-[calc(100svh-7rem)] snap-start flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-black/25 transition hover:border-slate-700 sm:min-h-0 sm:hover:-translate-y-1"
              >
                <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black sm:aspect-video sm:flex-none">
                  {video.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(248,113,113,.28),transparent_34%),linear-gradient(135deg,#020617,#111827)] px-6 text-center">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-2xl shadow-red-950/60">
                        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
                          <path d="m9 8 7 4-7 4V8Z" />
                        </svg>
                      </div>
                      <div className="mt-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-red-100">
                        {embedType}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                </div>
                <div className="p-4">
                  <h2 className="line-clamp-2 text-lg font-black text-white sm:text-base">{video.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400 sm:line-clamp-2">{video.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {video.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
        <SiteFooter gameCount={gameCount} videoCount={videos.length} />
      </div>
      <VideoFab />
    </main>
  );
}

function getEmbedType(embedHtml: string) {
  const html = embedHtml.toLowerCase();
  if (html.includes("twitter-tweet")) return "X / Twitter";
  if (html.includes("instagram-media")) return "Instagram";
  if (html.includes("tiktok-embed")) return "TikTok";
  if (html.includes("youtube.com") || html.includes("youtu.be")) return "YouTube";
  if (html.includes("vimeo.com")) return "Vimeo";
  if (html.includes("reddit")) return "Reddit";
  return "Video";
}
