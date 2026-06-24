export type VideoEntry = {
  slug: string;
  title: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  embedHtml: string;
  publishedAt: string;
  tags: string[];
  thumbnailUrl?: string;
  duration?: string;
};

export const videos: VideoEntry[] = [
];

export function getAllVideos() {
  return videos;
}

export function getVideoBySlug(slug: string) {
  return videos.find((video) => video.slug === slug);
}

export function getVideoEmbedSrc(embedHtml: string) {
  const match = embedHtml.match(/\bsrc=["']([^"']+)["']/i);
  return match?.[1] || "";
}

export function getVideoKeywords(video: VideoEntry) {
  return [
    ...video.tags,
    "viral video",
    "full video",
    "original video source",
    "social media clip source",
  ];
}
