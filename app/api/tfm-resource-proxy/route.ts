import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TRANSFORMICE_ORIGIN = "https://www.transformice.com";

const contentTypes: Record<string, string> = {
  ".swf": "application/x-shockwave-flash",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const transformicePath =
    request.headers.get("transformice-url") ||
    request.headers.get("Transformice-Url") ||
    requestUrl.searchParams.get("path") ||
    "/TransformiceChargeur.swf";

  const targetUrl = buildTransformiceUrl(transformicePath);

  if (!targetUrl) {
    return new Response("Invalid Transformice resource path", {
      status: 400,
      headers: corsHeaders("text/plain; charset=utf-8"),
    });
  }

  const upstream = await fetch(targetUrl, {
    cache: "no-store",
    headers: {
      "user-agent": "Threej TFM resource proxy",
    },
  });

  const headers = corsHeaders(upstream.headers.get("content-type") || inferContentType(targetUrl.pathname));
  const cacheControl = upstream.ok ? "public, max-age=3600, stale-while-revalidate=86400" : "no-store";
  headers.set("cache-control", cacheControl);

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

function buildTransformiceUrl(resourcePath: string) {
  if (!resourcePath || resourcePath.includes("\0")) {
    return null;
  }

  try {
    const targetUrl = new URL(resourcePath, TRANSFORMICE_ORIGIN);

    if (targetUrl.origin !== TRANSFORMICE_ORIGIN) {
      return null;
    }

    return targetUrl;
  } catch {
    return null;
  }
}

function inferContentType(pathname: string) {
  const match = pathname.toLowerCase().match(/\.[a-z0-9]+$/);
  return match ? contentTypes[match[0]] || "application/octet-stream" : "application/octet-stream";
}

function corsHeaders(contentType?: string) {
  const headers = new Headers({
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "Transformice-Url, transformice-url, Content-Type",
  });

  if (contentType) {
    headers.set("content-type", contentType);
  }

  return headers;
}
