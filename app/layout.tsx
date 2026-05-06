import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hikari — TV-first anime streaming for Android TV",
  description: "Discover, stream, and track anime — all in one place. Built for Android TV with AniList sync and debrid-supported addon streaming.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
