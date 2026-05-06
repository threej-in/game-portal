import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/games/")) {
    return NextResponse.next();
  }

  if (pathname.includes(".html/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\.html\/+$/, ".html");
    return NextResponse.redirect(url, 308);
  }

  if (pathname.endsWith(".html")) {
    return NextResponse.rewrite(new URL(`/game-html-shell${pathname}`, request.url));
  }

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 2) {
    return NextResponse.rewrite(new URL(`/game-html-shell${pathname}/index.html`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/games/:path*"],
};
