import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy policy · Hikari",
  description: "Hikari has no accounts, no analytics, and no tracking. The full policy follows.",
};

interface SummaryRowProps {
  on: boolean;
  label: string;
  sub?: string;
}

function SummaryRow({ on, label, sub }: SummaryRowProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, padding: "14px 0", borderTop: "1px solid var(--hairline)" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: on ? "var(--accent-blue)" : "var(--mute)", fontFamily: "var(--font-mono)", letterSpacing: 0.3 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: on ? "var(--accent-blue)" : "var(--ash)", flexShrink: 0 }} />
        {on ? "Yes" : "No"}
      </span>
      <span>
        <div style={{ fontSize: 15, color: "var(--on-dark)" }}>{label}</div>
        {sub && <div style={{ fontSize: 13, color: "var(--mute)", marginTop: 2 }}>{sub}</div>}
      </span>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav active="legal" />
      <main style={{ flex: 1 }}>
        <section className="subhero" style={{ paddingBottom: 40 }}>
          <div className="glow" />
          <div className="subhero-inner">
            <div className="eyebrow">Legal</div>
            <h1>Privacy policy</h1>
            <p className="lede">
              The short version: Hikari has no accounts, no analytics, and no tracking.
              The long version, with everything that <em>does</em> leave the device, follows.
            </p>
            <p className="updated" style={{ marginTop: 14 }}>Last updated · April 22, 2026</p>
          </div>
        </section>

        <div className="legal-body">
          <div style={{ background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: 12, padding: "8px 24px 16px", marginBottom: 56 }}>
            <div style={{ fontSize: 12, color: "var(--mute)", letterSpacing: 0.4, textTransform: "uppercase", padding: "16px 0 4px" }}>At a glance</div>
            <SummaryRow on={false} label="Personal data collected by Hikari itself" sub="No name, email, IP logs, device IDs, or anything else." />
            <SummaryRow on={false} label="Account or login required" sub="There is no account system." />
            <SummaryRow on={false} label="Analytics or telemetry" sub="No SDKs, no event tracking, no ping-home." />
            <SummaryRow on={false} label="Watch history sent off-device" sub="Resume points stay in app storage." />
            <SummaryRow on={true} label="Outbound calls to AniList" sub="Catalogue metadata only — public API." />
            <SummaryRow on={true} label="Outbound calls to addons you configure" sub="Stream resolution requests to URLs you've explicitly added." />
            <SummaryRow on={true} label="Crash reporting" sub="Opt-in only. Off by default. No PII, only stack traces." />
          </div>

          <nav className="legal-toc">
            <div className="h">On this page</div>
            <a href="#who">1 · Who runs Hikari</a>
            <a href="#what">2 · What Hikari collects</a>
            <a href="#thirdparties">3 · Third-party services</a>
            <a href="#addons">4 · Addons</a>
            <a href="#storage">5 · Data stored on the device</a>
            <a href="#crash">6 · Crash reporting</a>
            <a href="#children">7 · Children&apos;s data</a>
            <a href="#rights">8 · Your rights</a>
            <a href="#contact">9 · Contact</a>
          </nav>

          <h2 id="who">1 · Who runs Hikari</h2>
          <p>Hikari is an open-source project maintained by a small group of volunteer contributors. There is no company behind it, no hosted backend, and no central account database. The App is distributed as an APK from the project&apos;s GitHub repository.</p>

          <h2 id="what">2 · What Hikari collects</h2>
          <p>Hikari, as shipped, collects nothing about you. There is no analytics SDK, no event tracker, no opaque ID, and no IP logging. The maintainers do not operate any server that the App reports to.</p>
          <p>What the App does <strong style={{ color: "var(--on-dark)", fontWeight: 500 }}>exchange</strong> with the outside world is limited to two things: catalogue metadata from AniList, and stream-resolution requests to addons you&apos;ve configured yourself. Both are described below.</p>

          <h2 id="thirdparties">3 · Third-party services</h2>
          <p>Hikari calls the public <a className="inline" href="https://anilist.co" target="_blank" rel="noopener noreferrer">AniList</a> GraphQL API to fetch anime metadata — covers, synonyms, episode counts, accent colors, synopsis. These calls are unauthenticated and contain no information about you. AniList may, like any web service, log the IP address of the request as part of normal server operation; the Hikari project has no access to those logs.</p>
          <p>Hikari does not embed Google Analytics, Firebase Analytics, Crashlytics, AppsFlyer, Adjust, Sentry, or any equivalent third-party SDK by default.</p>

          <h2 id="addons">4 · Addons</h2>
          <p>When you add an addon, you give Hikari a manifest URL. From that point on, the App will make HTTPS requests to that addon&apos;s endpoints whenever you ask it to resolve streams for a show. Hikari has no control over what data those addons collect or what their privacy practices are. Read the privacy policy of each addon you install.</p>
          <p>You can remove an addon at any time from <span className="kbd">Settings → Addons</span>. After removal, the App will no longer contact it.</p>

          <h2 id="storage">5 · Data stored on the device</h2>
          <p>The following data is stored locally on your TV box, in Hikari&apos;s app-private storage. None of it is transmitted off-device.</p>
          <ul>
            <li>Watch progress — which episodes you&apos;ve started, paused, or finished, and how many seconds in.</li>
            <li>&ldquo;My list&rdquo; / favourites — shows you&apos;ve explicitly bookmarked.</li>
            <li>Configured addon manifest URLs.</li>
            <li>UI preferences — playback speed, subtitle language, autoplay-next setting.</li>
            <li>An on-disk cache of recently-fetched AniList responses (cleared when the App is uninstalled or its cache is wiped).</li>
          </ul>
          <p>Uninstalling Hikari removes all of the above. Android does not back this data up to your Google account.</p>

          <h2 id="crash">6 · Crash reporting</h2>
          <p>Crash reporting is <strong style={{ color: "var(--on-dark)", fontWeight: 500 }}>off by default</strong>. If you opt in via <span className="kbd">Settings → About → Send crash reports</span>, the App will, when it crashes, send the stack trace and the App version string to the project&apos;s self-hosted crash collector. No personal data, no device identifier, no addon URLs, and no watch history are included. You can opt back out at any time.</p>

          <h2 id="children">7 · Children&apos;s data</h2>
          <p>Hikari does not knowingly collect any personal data, from anyone, of any age. There is no signup, no profile, no demographic targeting. The App is suitable for use by anyone old enough to operate a TV remote.</p>

          <h2 id="rights">8 · Your rights</h2>
          <p>Because Hikari does not maintain a record of who you are, there is no centralized data the maintainers can access, export, or delete on your behalf. You retain full control over the data on your device — uninstalling the App, or clearing its app storage in Android settings, removes everything.</p>
          <p>If you are in a jurisdiction (such as the EU/EEA, UK, California, or Japan) whose data-protection law gives you specific rights — access, rectification, erasure, portability — those rights apply to whatever data we hold about you, which is, in practice, none.</p>

          <h2 id="contact">9 · Contact</h2>
          <p>Privacy questions, takedown requests, or anything else governed by this policy can be sent to <a className="inline" href="/contact">the addresses on the Contact page</a>. We aim to acknowledge inquiries within seven days; substantive answers usually take longer because the project runs on volunteer time.</p>
        </div>

        <hr className="hairline" />
      </main>
      <Footer />
    </div>
  );
}
