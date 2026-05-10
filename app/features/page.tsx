import Image from "next/image";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubHero from "@/components/SubHero";
import FeatureRow from "@/components/FeatureRow";
import ScreenshotSection from "@/components/ScreenshotSection";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Features · Hikari",
  description: "Six surfaces, zero friction. Every screen in Hikari was designed for the leanback grid.",
};

const FEATURES = [
  {
    eyebrow: "Home",
    title: "Open the app, see what to watch.",
    body: "The home screen leads with a featured-show carousel, then surfaces the things that matter most — the show you were halfway through, and the episodes that aired today.",
    bullets: [
      "Hero carousel with title, synopsis, score, format, and genres",
      "Continue Watching rail with progress per episode",
      "Recent episodes — fresh airings, in order",
      "Focus rings that adapt to each show's AniList accent colour",
    ],
    image: "/assets/screen-continue.png",
    alt: "Continue Watching",
    reverse: false,
  },
  {
    eyebrow: "Search",
    title: "Two presses to anything in the catalogue.",
    body: "Voice or text search across AniList. Filters for season, format, genre, and tags. Hikari respects the IME you're using — voice on Google TV, on-screen keyboard everywhere else.",
    bullets: [
      "Voice search via Google TV / Fire TV remotes",
      "Text search with focus-aware suggestions",
      "Filters for season, format, genre, score, and year",
      "Results page-load progressively at TV bitrates",
    ],
    image: "/assets/screen-search.png",
    alt: "Search",
    reverse: true,
  },
  {
    eyebrow: "Airing Schedule",
    title: "Today, tomorrow, the rest of the week.",
    body: "See exactly when each show drops, from earliest to latest. Episodes that have already aired are struck through; the next one up is highlighted so you can't miss it.",
    bullets: [
      "Today and the next four days, grouped by air time",
      "Strikethrough for episodes that have already aired",
      "Times shown in your local timezone",
    ],
    image: "/assets/screen-schedule.png",
    alt: "Airing Schedule",
    reverse: false,
  },
  {
    eyebrow: "My List",
    title: "Your queue, in one place.",
    body: "Add shows from anywhere — search, schedule, recommendations — and they all land in My List. Sortable by recently added, A–Z, or AniList score. Syncs both ways with AniList so it's the same on every device.",
    bullets: [
      "Sort by Recently added, A–Z, or Score",
      "Two-way AniList sync — your list stays in step",
      "Long-press to remove, no account required for local-only mode",
      "Clean grid, large posters, no clutter",
    ],
    image: "/assets/screen-mylist.png",
    alt: "My List",
    reverse: true,
  },
  {
    eyebrow: "Addons",
    title: "Bring your own streams.",
    body: "Hikari uses an open addon protocol. Paste a manifest URL, and any sources that addon returns become available — debrid, public-domain archives, your own self-hosted media. Hikari ships with zero hard-coded providers.",
    bullets: [
      "Compatible with debrid-supported addon providers",
      "Multiple addons can run side-by-side",
      "Each stream tagged with quality, language, and source",
      "Only direct HTTP(S) streams play — debrid-friendly",
    ],
    image: "/assets/screen-addons.png",
    alt: "Addons",
    reverse: false,
  },
  {
    eyebrow: "Settings & AniList Sync",
    title: "Tune playback, then walk away.",
    body: "Pick your preferred audio and subtitle languages, decide whether intros and outros auto-skip, and set your title language. Connect AniList by scanning a QR code from your phone — no typing email addresses with a remote.",
    bullets: [
      "Preferred audio: Japanese → English fallback",
      "Preferred subtitles, with auto-track selection",
      "Auto-skip intro / outro markers",
      "AniList QR code login — phone-side, no typing",
    ],
    image: "/assets/screen-settings.png",
    alt: "Settings",
    reverse: true,
  },
];

export default function FeaturesPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav active="features" />
      <main style={{ flex: 1 }}>
        <SubHero />
        <div className="container">
          {FEATURES.map((f) => (
            <FeatureRow
              key={f.eyebrow}
              eyebrow={f.eyebrow}
              title={f.title}
              body={f.body}
              bullets={f.bullets}
              reverse={f.reverse}
              visual={
                <div className="shot-card">
                  <Image
                    src={f.image}
                    alt={f.alt}
                    width={960}
                    height={540}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              }
            />
          ))}
        </div>
        <ScreenshotSection />
        <CTABand
          headline={<>Sound like the app you&apos;ve been <span className="grad">cobbling together</span>?</>}
        />
      </main>
      <Footer />
    </div>
  );
}
