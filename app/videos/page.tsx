import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { VideoFab } from "@/components/video-fab";
import { getVideoEmbedSrc } from "@/lib/videos";
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
    <main className="mx-auto max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <h1 className="sr-only">Viral videos and full original video sources</h1>

      <section className="grid snap-y snap-mandatory gap-4 sm:snap-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => {
          const embedSrc = getVideoEmbedSrc(video.embedHtml);

          return (
            <article
              key={video.slug}
              className="group flex min-h-[calc(100svh-1rem)] snap-start flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 shadow-xl shadow-black/25 transition hover:border-slate-700 sm:min-h-0 sm:hover:-translate-y-1"
            >
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black sm:aspect-video sm:flex-none">
                {embedSrc ? (
                  <iframe
                    src={embedSrc}
                    title={video.title}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">
                    No preview
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="line-clamp-2 text-lg font-black text-white sm:text-base">{video.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400 sm:line-clamp-2">{video.description}</p>
                  </div>
                  <Link
                    href={`/videos/${video.slug}`}
                    className="shrink-0 rounded-full border border-red-400/30 bg-red-500 px-3 py-2 text-xs font-black text-white shadow-lg shadow-black/30 transition hover:bg-red-400"
                  >
                    Watch
                  </Link>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {video.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <SiteFooter videoCount={videos.length} />
      <VideoFab />
    </main>
  );
}
