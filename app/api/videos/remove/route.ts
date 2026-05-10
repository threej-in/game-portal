import { NextRequest, NextResponse } from "next/server";
import { isValidAcceptedVideoSignature, removeAcceptedVideo } from "@/lib/video-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") || "";
  const signature = request.nextUrl.searchParams.get("sig") || "";

  if (!slug || !isValidAcceptedVideoSignature(slug, signature)) {
    return new NextResponse("Invalid or expired remove link.", {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const removedVideo = await removeAcceptedVideo(slug);

  if (!removedVideo) {
    return new NextResponse("This video was already removed or was not found in accepted videos.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new NextResponse(
    [
      "<!doctype html>",
      '<html lang="en">',
      "<head>",
      '<meta charset="utf-8" />',
      '<meta name="viewport" content="width=device-width, initial-scale=1" />',
      '<meta http-equiv="refresh" content="1;url=/videos" />',
      "<title>Video Removed</title>",
      '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#070b14;color:#e5e7eb;font-family:system-ui,sans-serif}.box{max-width:520px;padding:28px;border:1px solid #1e293b;border-radius:18px;background:#0f172a}a{color:#67e8f9}</style>',
      "</head>",
      "<body>",
      '<div class="box">',
      "<h1>Video removed</h1>",
      `<p>${removedVideo.title} has been removed from the accepted video catalog.</p>`,
      '<p><a href="/videos">Back to videos</a></p>',
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

