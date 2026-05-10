import { NextRequest, NextResponse } from "next/server";
import { savePendingVideo, signPendingVideo } from "@/lib/video-store";

export const runtime = "nodejs";

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function redirectWithStatus(request: NextRequest, status: string) {
  const url = new URL("/submit-video", request.url);
  url.searchParams.set("status", status);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  if (clean(formData.get("company"))) {
    return redirectWithStatus(request, "ok");
  }

  const title = clean(formData.get("title"));
  const description = clean(formData.get("description"));
  const embedHtml = clean(formData.get("embedHtml"));
  const sourceUrl = clean(formData.get("sourceUrl"));
  const tags = clean(formData.get("tags"));
  const sourceName = clean(formData.get("sourceName"));
  const thumbnailUrl = clean(formData.get("thumbnailUrl"));

  if (!title || !description || !embedHtml || !embedHtml.toLowerCase().includes("<iframe")) {
    return redirectWithStatus(request, "invalid");
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return redirectWithStatus(request, "config");
  }

  const pendingVideo = await savePendingVideo({
    title,
    description,
    sourceName: sourceName || "Submitted source",
    sourceUrl: sourceUrl || "",
    embedHtml,
    tags: tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 8),
    thumbnailUrl: thumbnailUrl || undefined,
  });
  const signature = signPendingVideo(pendingVideo.id);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const acceptUrl = `${origin}/api/videos/accept?id=${encodeURIComponent(pendingVideo.id)}&sig=${encodeURIComponent(signature)}`;
  const rejectUrl = `${origin}/api/videos/reject?id=${encodeURIComponent(pendingVideo.id)}&sig=${encodeURIComponent(signature)}`;

  const message = [
    "New video submission for Threej",
    "",
    `Pending ID: ${pendingVideo.id}`,
    `Title: ${title}`,
    `Source name: ${sourceName || "Submitted source"}`,
    `Source URL: ${sourceUrl || "Not provided"}`,
    `Tags: ${tags || "None provided"}`,
    `Thumbnail: ${thumbnailUrl || "Not provided"}`,
    "",
    "Description:",
    description,
    "",
    "Embed iframe:",
    embedHtml,
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message.slice(0, 3900),
      disable_web_page_preview: false,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Accept and publish",
              url: acceptUrl,
            },
            {
              text: "Reject",
              url: rejectUrl,
            },
          ],
        ],
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return redirectWithStatus(request, "error");
  }

  return redirectWithStatus(request, "ok");
}
