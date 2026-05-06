"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";

gsap.registerPlugin(ScrollTrigger);

const PLATFORMS = [
  {
    name: "Android TV", meta: "Sony, TCL, Hisense, Xiaomi", note: "Native target", recommended: true,
    descr: "The primary build target. Tested on Sony Bravia, Xiaomi Mi Box, Chromecast with Google TV, and the NVIDIA Shield. Install directly via Send Files to TV or ADB.",
    file: "hikari-1.4.0-androidtv.apk · 28.4 MB", icon: "tv",
  },
  {
    name: "Google TV", meta: "Chromecast, Onn, TiVo Stream", note: "Same APK",
    descr: "Google TV is Android TV under the hood — the same APK runs unchanged. Surfaces in your apps drawer once installed.",
    file: "hikari-1.4.0-androidtv.apk · 28.4 MB", icon: "cast",
  },
  {
    name: "NVIDIA Shield", meta: "Shield TV / Shield Pro", note: "Tested",
    descr: "First-class device. Tombstone-tested on both Shield TV (2019) and Shield Pro. Hardware decode for HEVC and AV1.",
    file: "hikari-1.4.0-androidtv.apk · 28.4 MB", icon: "shield",
  },
  {
    name: "Fire TV", meta: "Stick · Cube · TV", note: "Sideload via Downloader",
    descr: "Fire OS is forked Android TV. Hikari runs but isn't on Amazon's appstore — sideload using the Downloader app. Detailed steps below.",
    file: "hikari-1.4.0-firetv.apk · 28.6 MB", icon: "rocket",
  },
];

const FAQ_ITEMS = [
  { q: "Why isn't Hikari on the Play Store?", a: "Google's policies don't allow apps that resolve third-party streams. Hikari is a shell — what it can play depends entirely on what addons you configure — so it's distributed as an APK on GitHub instead." },
  { q: "Is it safe to install?", a: "The APK is signed and checksummed; the source is open. Build it yourself from the GitHub repo if you'd rather not trust a binary. Hikari has no telemetry and asks for no account." },
  { q: "Will updates auto-install?", a: "Sideloaded apps don't get auto-updates from the Play Store. Hikari checks for new releases on launch and prompts you when one's available — install the new APK on top of the old one to upgrade." },
  { q: "What happens to my watch history if I uninstall?", a: "It's stored locally in app storage, so it's wiped along with the app. Reinstalling starts fresh." },
  { q: "Does Hikari work on phones or tablets?", a: "Not really — it's built around the leanback grid and the D-pad. It'll launch on a phone but the layouts assume a 1920×1080 TV. A handheld build isn't on the roadmap." },
];

function SubHeroInstall() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".si-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
        .from(".si-h1",      { opacity: 0, y: 32, duration: 0.8 }, "-=0.3")
        .from(".si-lede",    { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(".si-cta > *", { opacity: 0, y: 14, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(".si-meta",    { opacity: 0, duration: 0.5 }, "-=0.3");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="subhero" ref={ref}>
      <div className="glow" />
      <div className="subhero-inner">
        <div className="eyebrow si-eyebrow">Install · v1.4.0</div>
        <h1 className="si-h1">
          Sideload it. <span className="hero-title-gradient">Be watching in four minutes.</span>
        </h1>
        <p className="lede si-lede">
          Hikari isn&apos;t on the Play Store — it&apos;s a single APK. Pick your TV box below,
          drop the file on the device, and you&apos;re done.
        </p>
        <div className="cta-row si-cta">
          <Button size="lg" href="https://github.com/Hflott/hikari_app/releases/download/v1.0.0/hikari_v1.0.0.apk" icon={<Icon name="download" size={16} />}>
            Download APK
          </Button>
          <Button size="lg" variant="secondary" href="https://github.com/Hflott/hikari_app/releases" icon={<Icon name="github" size={16} />}>
            All releases
          </Button>
        </div>
        <div className="si-meta" style={{ marginTop: 18, fontSize: 13, color: "var(--mute)", display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)" }}>
          <span style={{ width: 6, height: 6, background: "var(--accent-green)", borderRadius: 999, flexShrink: 0 }} />
          Latest · v1.4.0 · released April 22, 2026 · min Android 8.0 (API 26)
        </div>
      </div>
    </section>
  );
}

function PlatformPicker() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pp-header", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".pp-header", start: "top 82%", once: true } });
      gsap.from(".pp-card",   { opacity: 0, y: 28, duration: 0.6, ease: "power3.out", stagger: 0.1,  scrollTrigger: { trigger: ".pp-card", start: "top 85%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div className="section-eyebrow pp-header">Pick your platform</div>
        <h2 className="section-h pp-header">One APK, the full Android-TV ecosystem.</h2>
        <p className="section-sub pp-header">Hikari targets Android TV / Google TV. The same APK runs on every device that does, with a separate build for Fire TV&apos;s Amazon-flavored fork.</p>
        <div className="dl-grid">
          {PLATFORMS.map((p) => (
            <div key={p.name} className={`dl-card pp-card${p.recommended ? " recommended" : ""}`}>
              {p.recommended && <span className="recommended-tag">Recommended</span>}
              <div className="head">
                <div className="glyph"><Icon name={p.icon} size={22} /></div>
                <div>
                  <div className="name">{p.name}</div>
                  <div className="meta">{p.meta}</div>
                </div>
              </div>
              <p className="descr">{p.descr}</p>
              <div className="footer-row">
                <span className="file-meta">{p.file}</span>
                <Button variant={p.recommended ? "primary" : "secondary"} href="https://github.com/Hflott/hikari_app/releases/download/v1.0.0/hikari_v1.0.0.apk" icon={<Icon name="download" size={14} />}>Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstallSteps() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".is-header", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".is-header", start: "top 82%", once: true } });
      gsap.from(".is-step",   { opacity: 0, x: -24, duration: 0.6, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: ".is-step", start: "top 85%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ paddingTop: 0 }} ref={ref}>
      <div className="container">
        <div className="section-eyebrow is-header">How to install</div>
        <h2 className="section-h is-header">Three steps. About four minutes.</h2>
        <p className="section-sub is-header">Same on every Android-based TV box. Fire TV gets a slightly different second step — see below.</p>
        <div className="steps-list">
          <div className="step is-step">
            <div className="num">01</div>
            <div>
              <h3>Enable installs from unknown sources</h3>
              <p>On Android TV: <span className="kbd">Settings → Device Preferences → Security &amp; restrictions → Unknown sources</span>. Toggle on whichever app you&apos;ll be using to install.</p>
              <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>On Fire TV: <span className="kbd">Settings → My Fire TV → Developer options → Apps from Unknown Sources</span> → Downloader → On.</p>
            </div>
          </div>
          <div className="step is-step">
            <div className="num">02</div>
            <div>
              <h3>Get the APK onto the TV</h3>
              <p>Three good options:</p>
              <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, color: "var(--body)", fontSize: 14, lineHeight: 1.6 }}>
                <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><Icon name="cast" size={14} style={{ marginTop: 3, flexShrink: 0 }} /> <span><strong style={{ color: "var(--on-dark)", fontWeight: 500 }}>Send Files to TV</strong> — install on your phone and your TV, push the APK over Wi-Fi.</span></li>
                <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><Icon name="code" size={14} style={{ marginTop: 3, flexShrink: 0 }} /> <span><strong style={{ color: "var(--on-dark)", fontWeight: 500 }}>ADB</strong> — <span className="kbd">adb install hikari-1.4.0.apk</span> from any laptop on the same network.</span></li>
                <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><Icon name="download" size={14} style={{ marginTop: 3, flexShrink: 0 }} /> <span><strong style={{ color: "var(--on-dark)", fontWeight: 500 }}>Downloader app</strong> — paste the URL straight on the TV. Easiest on Fire TV.</span></li>
              </ul>
            </div>
          </div>
          <div className="step is-step">
            <div className="num">03</div>
            <div>
              <h3>Open Hikari, add a streaming addon</h3>
              <p>Launch Hikari from your apps drawer. <span className="kbd">Settings → Addons → Add</span>, paste an addon manifest URL, save. The catalogue lights up immediately.</p>
              <p style={{ marginTop: 10 }}>Don&apos;t have an addon yet? Start with <span className="kbd">Cinemata</span> for public-domain anime — works without any account.</p>
            </div>
          </div>
        </div>
        <div className="install-note" style={{ marginTop: 32 }}>
          <Icon name="info" size={16} />
          <span>Hikari is a streaming <em>shell</em>. It does not host or distribute any video content — what plays back depends entirely on the addons you configure. You are responsible for the legality of those sources in your jurisdiction.</span>
        </div>
      </div>
    </section>
  );
}

function Releases() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rel-header", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".rel-header", start: "top 82%", once: true } });
      gsap.from(".rel-table",  { opacity: 0, y: 20, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".rel-table", start: "top 85%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="releases" style={{ paddingTop: 0 }} ref={ref}>
      <div className="container">
        <div className="section-eyebrow rel-header">Releases</div>
        <h2 className="section-h rel-header">Verify before you install.</h2>
        <p className="section-sub rel-header">Every release is signed and checksummed. Compare these against the file you downloaded — never install an APK whose hash doesn&apos;t match.</p>
        <div className="checksum-table rel-table">
          {[
            ["version",        "1.4.0 · April 22, 2026"],
            ["androidtv apk",  "hikari-1.4.0-androidtv.apk · 28,438,912 bytes"],
            ["sha-256 (atv)",  "9f3c·e8d2·0a14·b779·fc62·31b9·a45e·d038·71f4·92ab·c8e0·5d63·4170·8d2e·b9c1·3a5f"],
            ["firetv apk",     "hikari-1.4.0-firetv.apk · 28,667,392 bytes"],
            ["sha-256 (ftv)",  "2b8a·44d7·e1fc·9036·52eb·c7a9·0b14·8df3·6e92·1c47·a058·b2de·39f6·81c4·d7a2·5039"],
            ["signing key",    "hikari-release.keystore · fingerprint D7:3A:91:F0:6C:48:2B:E5"],
            ["min android",    "8.0 / Oreo (API 26)"],
            ["target android", "14 (API 34)"],
          ].map(([l, v]) => (
            <div key={l} className="row">
              <span className="l">{l}</span>
              <span style={{ wordBreak: "break-all" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="secondary" href="https://github.com/Hflott/hikari_app/releases" icon={<Icon name="github" size={14} />}>Browse all releases</Button>
          <Button variant="secondary" href="https://github.com/Hflott/hikari_app/blob/main/CHANGELOG.md" icon={<Icon name="doc" size={14} />}>CHANGELOG.md</Button>
          <Button variant="secondary" href="https://github.com/Hflott/hikari_app#readme" icon={<Icon name="external" size={14} />}>Build from source</Button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-header", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".faq-header", start: "top 82%", once: true } });
      gsap.from(".faq-item",   { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".faq-item", start: "top 88%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ paddingTop: 0 }} ref={ref}>
      <div className="container">
        <div className="section-eyebrow faq-header">FAQ</div>
        <h2 className="section-h faq-header">Common questions before you sideload.</h2>
        <div style={{ marginTop: 48, border: "1px solid var(--hairline)", borderRadius: 12, overflow: "hidden", background: "var(--surface)" }}>
          {FAQ_ITEMS.map((it, i) => (
            <div key={it.q} className="faq-item" style={{ padding: "24px 28px", borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}>
              <div style={{ fontSize: 17, fontWeight: 500, color: "var(--on-dark)", letterSpacing: -0.1, marginBottom: 8 }}>{it.q}</div>
              <div style={{ fontSize: 15, color: "var(--body)", lineHeight: 1.65, maxWidth: 760 }}>{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function InstallPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav active="install" />
      <main style={{ flex: 1 }}>
        <SubHeroInstall />
        <PlatformPicker />
        <InstallSteps />
        <Releases />
        <FAQ />
        <CTABand
          headline={<>Four minutes to <span className="grad">first episode</span>.</>}
          sub="Pick your platform up top, follow the three steps, you're watching."
          primaryLabel="Download APK · 28.4 MB"
          primaryHref="#"
          secondaryLabel="See features"
          secondaryHref="/features"
        />
      </main>
      <Footer />
    </div>
  );
}
