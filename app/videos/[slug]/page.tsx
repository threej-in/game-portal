import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VideoEmbed } from "@/components/video-embed";
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

  const otherVideos = (await readAllVideos()).filter((item) => item.slug !== video.slug).slice(0, 8);
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
    <main className="mx-auto max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <VideoEmbed
            html={video.embedHtml}
            title={video.title}
            className="grid min-h-[calc(100svh-1rem)] place-items-center overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl shadow-black/40 sm:aspect-video sm:min-h-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:max-w-full [&_.twitter-tweet]:mx-auto"
          />
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{video.title}</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Full source:{" "}
                  <a href={video.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200">
                    {video.sourceName}
                  </a>
                </p>
              </div>
              <Link href="/videos" className="btn btn-secondary">
                Back to Videos
              </Link>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">{video.description}</p>
            <p className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs leading-5 text-slate-500">
              This page is for the full original video source behind a viral clip. Verify the source link before publishing sensitive or news-related videos.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 lg:sticky lg:top-4 lg:self-start">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">More Videos</h2>
            <Link href="/submit-video" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              Submit
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {otherVideos.length ? (
              otherVideos.map((item) => (
                <Link key={item.slug} href={`/videos/${item.slug}`} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 transition hover:border-slate-700 hover:bg-slate-900">
                  <div className="line-clamp-2 text-sm font-bold text-white">{item.title}</div>
                  <div className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.description}</div>
                </Link>
              ))
            ) : (
              <p className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-500">
                More videos will appear here after you add them to the catalog.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
