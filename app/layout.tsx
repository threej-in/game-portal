import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://threej.in";
const siteName = "Threej Games";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | Free Browser Games`,
    template: `%s | ${siteName}`,
  },
  description:
    "Play free browser games on Threej Games. Discover open-source arcade, puzzle, racing, board, and strategy games playable directly in your browser.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} | Free Browser Games`,
    description:
      "Play free browser games on Threej Games. Discover open-source arcade, puzzle, racing, board, and strategy games playable directly in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Free Browser Games`,
    description:
      "Play free browser games on Threej Games. Discover open-source arcade, puzzle, racing, board, and strategy games playable directly in your browser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader />
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
