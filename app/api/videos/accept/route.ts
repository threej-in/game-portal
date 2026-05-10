import { NextRequest, NextResponse } from "next/server";
import { acceptPendingVideo, isValidPendingVideoSignature, signAcceptedVideo } from "@/lib/video-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") || "";
  const signature = request.nextUrl.searchParams.get("sig") || "";

  if (!id || !isValidPendingVideoSignature(id, signature)) {
    return new NextResponse("Invalid or expired accept link.", {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const acceptedVideo = await acceptPendingVideo(id);

  if (!acceptedVideo) {
    return new NextResponse("This video was already accepted or the pending submission was not found.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const videoUrl = new URL(`/videos/${acceptedVideo.slug}`, request.url);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const removeSignature = signAcceptedVideo(acceptedVideo.slug);
  const removeUrl = `${origin}/api/videos/remove?slug=${encodeURIComponent(acceptedVideo.slug)}&sig=${encodeURIComponent(removeSignature)}`;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: [`Video published`, "", `Title: ${acceptedVideo.title}`, `URL: ${origin}${videoUrl.pathname}`].join("\n"),
        disable_web_page_preview: false,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open video",
                url: `${origin}${videoUrl.pathname}`,
              },
              {
                text: "Remove video",
                url: removeUrl,
              },
            ],
          ],
        },
      }),
      cache: "no-store",
    });
  }

  return new NextResponse(
    [
      "<!doctype html>",
      '<html lang="en">',
      "<head>",
      '<meta charset="utf-8" />',
      '<meta name="viewport" content="width=device-width, initial-scale=1" />',
      `<meta http-equiv="refresh" content="1;url=${videoUrl.pathname}" />`,
      "<title>Video Published</title>",
      '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#070b14;color:#e5e7eb;font-family:system-ui,sans-serif}.box{max-width:520px;padding:28px;border:1px solid #1e293b;border-radius:18px;background:#0f172a}a{color:#67e8f9}</style>',
      "</head>",
      "<body>",
      '<div class="box">',
      "<h1>Video published</h1>",
      `<p>${acceptedVideo.title} is now live.</p>`,
      `<p><a href="${videoUrl.pathname}">Open video page</a></p>`,
      "</div>",
      "</body>",
      "</html>",
    ].join(""),
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}
