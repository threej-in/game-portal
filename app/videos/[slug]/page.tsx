import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { VideoEmbed } from "@/components/video-embed";
import { getAllGames } from "@/lib/games";
import { getVideoEmbedSrc, getVideoKeywords } from "@/lib/videos";
import { getStoredVideoBySlug, readAllVideos } from "@/lib/video-store";

type VideoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const videos = await readAllVideos();
  return videos.map((video) => ({
    slug: video.slug,
  }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await getStoredVideoBySlug(slug);

  if (!video) {
    return {
      title: "Video Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${video.title} - Full Viral Video Source`,
    description: video.description,
    keywords: getVideoKeywords(video),
    alternates: {
      canonical: `/videos/${video.slug}`,
    },
    openGraph: {
      title: `${video.title} - Full Viral Video Source`,
      description: video.description,
      url: `/videos/${video.slug}`,
      type: "article",
      images: video.thumbnailUrl ? [{ url: video.thumbnailUrl, alt: video.title }] : undefined,
      publishedTime: video.publishedAt,
      tags: video.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${video.title} - Full Viral Video Source`,
      description: video.description,
      images: video.thumbnailUrl ? [video.thumbnailUrl] : undefined,
    },
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = await getStoredVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const videos = await readAllVideos();
  const otherVideos = videos.filter((item) => item.slug !== video.slug).slice(0, 8);
  const gameCount = getAllGames().length;
  const isSocialEmbed = isSocialVideoEmbed(video.embedHtml);
  const embedUrl = getVideoEmbedSrc(video.embedHtml);
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    uploadDate: video.publishedAt,
    thumbnailUrl: video.thumbnailUrl ? [video.thumbnailUrl] : undefined,
    embedUrl,
    contentUrl: video.sourceUrl,
    duration: video.duration,
    keywords: getVideoKeywords(video).join(", "),
    isFamilyFriendly: true,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Videos",
        item: "https://threej.in/videos",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: video.title,
        item: `https://threej.in/videos/${video.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <Link
              href="/videos"
              className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              Back to videos
            </Link>
            <a
              href={video.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="line-clamp-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Source: {video.sourceName}
            </a>
          </div>
          <VideoEmbed
            key={video.slug}
            html={video.embedHtml}
            title={video.title}
            className={
              isSocialEmbed
                ? "grid min-h-[360px] place-items-center overflow-hidden rounded-xl border border-slate-800 bg-black/95 p-3 shadow-xl shadow-black/30 sm:min-h-[420px] [&_iframe]:max-w-full [&_.instagram-media]:mx-auto [&_.tiktok-embed]:mx-auto [&_.twitter-tweet]:mx-auto [&_.twitter-tweet]:my-0"
                : "aspect-video overflow-hidden rounded-xl border border-slate-800 bg-black shadow-xl shadow-black/30 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:max-w-full"
            }
          />
          <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">{video.title}</h1>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">{video.description}</p>
            <p className="mt-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs leading-5 text-slate-500">
              This page is for the full original video source behind a viral clip. Verify the source link before publishing sensitive or news-related videos.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 lg:sticky lg:top-4 lg:self-start">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">More Videos</h2>
            <Link href="/submit-video" className="text-xs font-semibold text-cyan-300 hover:text-cyan-200">
              Submit
            </Link>
          </div>
          <div className="mt-3 grid gap-2">
            {otherVideos.length ? (
              otherVideos.map((item) => (
                <Link key={item.slug} href={`/videos/${item.slug}`} className="block rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 transition hover:border-slate-700 hover:bg-slate-900">
                  <div className="aspect-video overflow-hidden rounded-md bg-black">
                    {item.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-950">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-red-400" aria-hidden="true">
                          <path d="m9 8 7 4-7 4V8Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-white">{item.title}</div>
                </Link>
              ))
            ) : (
              <p className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-500">
                More videos will appear here after you add them to the catalog.
              </p>
            )}
          </div>
        </aside>
      </div>
      <SiteFooter gameCount={gameCount} videoCount={videos.length} />
    </main>
  );
}

function isSocialVideoEmbed(embedHtml: string) {
  const html = embedHtml.toLowerCase();
  return html.includes("twitter-tweet") || html.includes("instagram-media") || html.includes("tiktok-embed");
}
