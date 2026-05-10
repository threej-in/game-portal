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
  {
    slug: "sample-viral-clip-source",
    title: "Sample viral clip source",
    description:
      "Replace this sample with the full source video you research. Add the iframe from YouTube, Vimeo, or another video host.",
    sourceName: "Sample source",
    sourceUrl: "https://www.youtube.com/",
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    embedHtml:
      '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Sample video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    publishedAt: "2026-05-10",
    tags: ["sample", "source"],
  },
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
