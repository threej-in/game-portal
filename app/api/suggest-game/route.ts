import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function redirectWithStatus(request: NextRequest, status: string) {
  const url = new URL("/suggest-game", request.url);
  url.searchParams.set("status", status);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  if (clean(formData.get("company"))) {
    return redirectWithStatus(request, "ok");
  }

  const gameName = clean(formData.get("gameName"));
  const gameUrl = clean(formData.get("gameUrl"));
  const notes = clean(formData.get("notes"));
  const sender = clean(formData.get("sender"));

  if (!gameName || !gameUrl) {
    return redirectWithStatus(request, "invalid");
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return redirectWithStatus(request, "config");
  }

  const message = [
    "New game suggestion from Arcadia Portal",
    "",
    `Game: ${gameName}`,
    `Link: ${gameUrl}`,
    `Suggested by: ${sender || "Anonymous"}`,
    "",
    "Notes:",
    notes || "None provided",
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: false,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return redirectWithStatus(request, "error");
  }

  return redirectWithStatus(request, "ok");
}
