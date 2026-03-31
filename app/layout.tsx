import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcadia Portal",
  description: "Open-source HTML5 games portal starter built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
