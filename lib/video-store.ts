import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { videos as bundledVideos, type VideoEntry } from "@/lib/videos";

export type PendingVideoEntry = Omit<VideoEntry, "slug" | "publishedAt"> & {
  id: string;
  submittedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const acceptedPath = path.join(dataDir, "videos.json");
const pendingPath = path.join(dataDir, "pending-videos.json");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export function slugifyVideoTitle(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || `video-${Date.now()}`;
}

function uniqueSlug(baseSlug: string, existingVideos: VideoEntry[]) {
  const used = new Set(existingVideos.map((video) => video.slug));
  if (!used.has(baseSlug)) return baseSlug;

  let index = 2;
  while (used.has(`${baseSlug}-${index}`)) {
    index += 1;
  }

  return `${baseSlug}-${index}`;
}

function getSigningSecret() {
  return process.env.VIDEO_ACCEPT_SECRET || process.env.TELEGRAM_BOT_TOKEN || "";
}

function signValue(scope: string, value: string) {
  const secret = getSigningSecret();
  if (!secret) return "";

  return crypto.createHmac("sha256", secret).update(`${scope}:${value}`).digest("hex");
}

function isValidSignature(scope: string, value: string, signature: string) {
  const expected = signValue(scope, value);
  if (!expected || !signature) return false;
  if (expected.length !== signature.length) return false;

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export function signPendingVideo(id: string) {
  return signValue("pending-video", id);
}

export function isValidPendingVideoSignature(id: string, signature: string) {
  return isValidSignature("pending-video", id, signature);
}

export function signAcceptedVideo(slug: string) {
  return signValue("accepted-video", slug);
}

export function isValidAcceptedVideoSignature(slug: string, signature: string) {
  return isValidSignature("accepted-video", slug, signature);
}

export async function readAcceptedVideos() {
  return readJsonFile<VideoEntry[]>(acceptedPath, []);
}

export async function readPendingVideos() {
  return readJsonFile<PendingVideoEntry[]>(pendingPath, []);
}

export async function readAllVideos() {
  const acceptedVideos = await readAcceptedVideos();
  const acceptedSlugs = new Set(acceptedVideos.map((video) => video.slug));
  return [
    ...acceptedVideos,
    ...bundledVideos.filter((video) => !acceptedSlugs.has(video.slug)),
  ];
}

export async function getStoredVideoBySlug(slug: string) {
  const videos = await readAllVideos();
  return videos.find((video) => video.slug === slug);
}

export async function savePendingVideo(video: Omit<PendingVideoEntry, "id" | "submittedAt">) {
  const pendingVideos = await readPendingVideos();
  const pendingVideo: PendingVideoEntry = {
    ...video,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  await writeJsonFile(pendingPath, [pendingVideo, ...pendingVideos]);
  return pendingVideo;
}

export async function acceptPendingVideo(id: string) {
  const [pendingVideos, acceptedVideos] = await Promise.all([readPendingVideos(), readAcceptedVideos()]);
  const pendingVideo = pendingVideos.find((video) => video.id === id);

  if (!pendingVideo) {
    return null;
  }

  const acceptedVideo: VideoEntry = {
    slug: uniqueSlug(slugifyVideoTitle(pendingVideo.title), [...acceptedVideos, ...bundledVideos]),
    title: pendingVideo.title,
    description: pendingVideo.description,
    sourceName: pendingVideo.sourceName || "Submitted source",
    sourceUrl: pendingVideo.sourceUrl,
    embedHtml: pendingVideo.embedHtml,
    publishedAt: new Date().toISOString().slice(0, 10),
    tags: pendingVideo.tags,
    thumbnailUrl: pendingVideo.thumbnailUrl,
    duration: pendingVideo.duration,
  };

  await Promise.all([
    writeJsonFile(acceptedPath, [acceptedVideo, ...acceptedVideos]),
    writeJsonFile(pendingPath, pendingVideos.filter((video) => video.id !== id)),
  ]);

  return acceptedVideo;
}

export async function rejectPendingVideo(id: string) {
  const pendingVideos = await readPendingVideos();
  const pendingVideo = pendingVideos.find((video) => video.id === id);

  if (!pendingVideo) {
    return null;
  }

  await writeJsonFile(pendingPath, pendingVideos.filter((video) => video.id !== id));
  return pendingVideo;
}

export async function removeAcceptedVideo(slug: string) {
  const acceptedVideos = await readAcceptedVideos();
  const acceptedVideo = acceptedVideos.find((video) => video.slug === slug);

  if (!acceptedVideo) {
    return null;
  }

  await writeJsonFile(acceptedPath, acceptedVideos.filter((video) => video.slug !== slug));
  return acceptedVideo;
}
