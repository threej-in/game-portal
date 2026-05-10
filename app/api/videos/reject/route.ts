import { NextRequest, NextResponse } from "next/server";
import { isValidPendingVideoSignature, rejectPendingVideo } from "@/lib/video-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") || "";
  const signature = request.nextUrl.searchParams.get("sig") || "";

  if (!id || !isValidPendingVideoSignature(id, signature)) {
    return new NextResponse("Invalid or expired reject link.", {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const rejectedVideo = await rejectPendingVideo(id);

  if (!rejectedVideo) {
    return new NextResponse("This submission was already accepted/rejected or was not found.", {
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
      "<title>Video Rejected</title>",
      '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#070b14;color:#e5e7eb;font-family:system-ui,sans-serif}.box{max-width:520px;padding:28px;border:1px solid #1e293b;border-radius:18px;background:#0f172a}</style>',
      "</head>",
      "<body>",
      '<div class="box">',
      "<h1>Submission rejected</h1>",
      `<p>${rejectedVideo.title} has been removed from pending submissions.</p>`,
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

