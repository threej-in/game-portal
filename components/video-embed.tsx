"use client";

import { useEffect, useRef, useState } from "react";

type VideoEmbedProps = {
  html: string;
  title: string;
  className?: string;
};

function loadScript(src: string, id: string) {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

export function VideoEmbed({ html, title, className }: VideoEmbedProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lowerHtml = html.toLowerCase();
    const root = rootRef.current;
    let fallbackTimer: number | undefined;
    const cleanupLoadListeners: Array<() => void> = [];

    if (lowerHtml.includes("twitter-tweet")) {
      loadScript("https://platform.twitter.com/widgets.js", "twitter-widgets-js");
      window.setTimeout(() => {
        const twitter = (window as unknown as { twttr?: { widgets?: { load: (element?: HTMLElement | null) => void } } }).twttr;
        twitter?.widgets?.load(rootRef.current);
      }, 0);
    }

    if (lowerHtml.includes("instagram-media")) {
      loadScript("https://www.instagram.com/embed.js", "instagram-embed-js");
      window.setTimeout(() => {
        const instagram = (window as unknown as { instgrm?: { Embeds?: { process: () => void } } }).instgrm;
        instagram?.Embeds?.process();
      }, 0);
    }

    if (lowerHtml.includes("tiktok-embed")) {
      loadScript("https://www.tiktok.com/embed.js", "tiktok-embed-js");
    }

    const rafId = window.requestAnimationFrame(() => {
      const frames = Array.from(root?.querySelectorAll("iframe") ?? []);

      if (!frames.length) {
        fallbackTimer = window.setTimeout(() => setIsLoading(false), 1200);
        return;
      }

      let pendingFrames = frames.length;
      const finishFrame = () => {
        pendingFrames -= 1;
        if (pendingFrames <= 0) {
          setIsLoading(false);
        }
      };

      frames.forEach((frame) => {
        frame.addEventListener("load", finishFrame, { once: true });
        cleanupLoadListeners.push(() => frame.removeEventListener("load", finishFrame));
      });

      fallbackTimer = window.setTimeout(() => setIsLoading(false), 4000);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      cleanupLoadListeners.forEach((cleanup) => cleanup());
    };
  }, [html]);

  return (
    <div
      aria-label={title}
      className={`relative ${className ?? ""}`}
    >
      <div
        ref={rootRef}
        className="h-full w-full"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isLoading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="h-12 w-12 rounded-full border-4 border-slate-700 border-t-red-500 animate-spin" />
        </div>
      ) : null}
    </div>
  );
}
