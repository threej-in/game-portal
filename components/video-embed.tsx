"use client";

import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const lowerHtml = html.toLowerCase();

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
  }, [html]);

  return (
    <div
      ref={rootRef}
      aria-label={title}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

