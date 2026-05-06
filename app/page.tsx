"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_CARDS = [
  { icon: "tv",       name: "Home",            desc: "A featured-show carousel up top, your Continue Watching rail, and freshly-aired episodes — all surfaced the moment you open the app." },
  { icon: "search",   name: "Search",          desc: "Voice or text search across the AniList catalogue, with filters for season, format, genre, and tags. Find what you want in two presses.", elev: true },
  { icon: "calendar", name: "Airing Schedule", desc: "Today and the next four days, by air time. See exactly when each episode drops, with strikethroughs for shows that have already aired." },
  { icon: "heart",    name: "My List",         desc: "Your personal queue, sortable by recently added, A–Z, or score. Syncs straight to AniList so it's the same on every device.", elev: true },
  { icon: "puzzle",   name: "Addons",          desc: "Install any addon by manifest URL. Bring your own resolvers — debrid, public domain, your own server. No hard-coded providers." },
  { icon: "gear",     name: "Settings",        desc: "Audio & subtitle preferences, auto-skip intro/outro, title language, and one-tap AniList sync via QR code from your phone.", elev: true },
];

const HOW_IT_WORKS = [
  {
    step: "STEP 01", title: "Install the APK",
    desc: <>Sideload Hikari onto any Android TV, Google TV, or Fire TV box. Enable <span className="kbd">Install unknown apps</span> for your sideloader, then open the APK.</>,
  },
  {
    step: "STEP 02", title: "Connect a streaming addon",
    desc: <>In <span className="kbd">Settings → Addons</span>, paste an addon manifest URL (debrid-enabled addons work great). Hikari probes it and surfaces every stream it returns.</>,
  },
  {
    step: "STEP 03", title: "(Optional) Sync AniList",
    desc: <>Scan a QR code from <span className="kbd">Settings → AniList Sync</span> and your list, scores, and progress travel with you across every device.</>,
  },
];

function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<Element>(".hw");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-eyebrow", { opacity: 0, y: 10, duration: 0.45 });

      words.forEach((word, i) => {
        tl.from(word, { y: "120%", duration: 0.30 }, i === 0 ? "-=0.15" : ">");
      });

      tl.from(".h-sub",        { opacity: 0, y: 20, duration: 0.5  }, "-=0.05")
        .from(".h-cta > *",    { opacity: 0, y: 14, duration: 0.45, stagger: 0.07 }, "-=0.35")
        .from(".h-meta",       { opacity: 0, duration: 0.35 }, "-=0.25")
        .from(".h-screenshot", { opacity: 0, scale: 0.97, y: 24, duration: 0.9 }, "-=0.5");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-band" ref={ref}>
      <div className="hero-stripes" />
      <div className="hero-content">
        <div className="hero-eyebrow h-eyebrow">
          <span className="dot" />Open-source · Android TV · AniList + Debrid
        </div>
        <h1 className="hero-title display">
          <span className="hero-line">
            <span className="word-clip"><span className="hw">Discover,</span></span>
            {" "}
            <span className="word-clip"><span className="hw">stream,</span></span>
            {" "}
            <span className="word-clip"><span className="hw">and</span></span>
          </span>
          <span className="hero-line">
            <span className="word-clip"><span className="hw">track anime —</span></span>
            {" "}
            <span className="word-clip"><span className="hw"><span className="hero-title-gradient">all in one place.</span></span></span>
          </span>
        </h1>
        <p className="hero-sub h-sub">
          Hikari is an anime app designed purely for Android TV. Browse the AniList catalogue, follow the airing schedule,
          sync your list, and resolve streams through any addon you point it at — all from your remote.
        </p>
        <div className="hero-cta-row h-cta">
          <Button size="lg" href="/install" icon={<Icon name="download" size={16} />}>
            Download for Android TV
          </Button>
          <Button size="lg" variant="secondary" href="https://github.com" icon={<Icon name="github" size={16} />}>
            View on GitHub
          </Button>
        </div>
        <div className="hero-meta h-meta">
          <span className="keycap">↑</span>
          <span className="keycap">↓</span>
          <span className="keycap">⏎</span>
          <span>D-pad first — every screen is built for the remote</span>
        </div>
        <TiltCard className="shot-frame shot-hero h-screenshot" intensity={4}>
          <Image
            src="/assets/screen-home.png"
            alt="Hikari home screen — Witch Hat Atelier hero"
            width={1180} height={664}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </TiltCard>
      </div>
    </section>
  );
}

function StatStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { num: "22k+",      lab: "Anime in the AniList catalogue" },
    { num: "1080p",     lab: "Native leanback grid" },
    { num: "0",         lab: "Accounts. Trackers. Ads." },
    { num: "Apache 2.0",lab: "Open-source license" },
  ];

  return (
    <div className="stat-strip" ref={ref}>
      {stats.map((s) => (
        <div key={s.num} className="stat stat-item">
          <div className="num">{s.num}</div>
          <div className="lab">{s.lab}</div>
        </div>
      ))}
    </div>
  );
}

function FeatureGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fg-eyebrow, .fg-h, .fg-sub", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".fg-eyebrow", start: "top 82%", once: true },
      });
      gsap.from(".fg-card", {
        opacity: 0, y: 32, scale: 0.98, duration: 0.6, ease: "power3.out",
        stagger: { amount: 0.4, from: "start" },
        scrollTrigger: { trigger: ".fg-card", start: "top 82%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div className="section-eyebrow fg-eyebrow">What&apos;s inside</div>
        <h2 className="section-h fg-h">Every screen the living room needs.</h2>
        <p className="section-sub fg-sub">
          Hikari was designed for one workflow: open the app, find something to watch, watch it,
          and pick up where you left off. Six surfaces — nothing more.
        </p>
        <div className="feature-grid">
          {FEATURE_CARDS.map((fc) => (
            <div key={fc.name} className={`feature-card fg-card${fc.elev ? " elev" : ""}`}>
              <div className="feature-icn"><Icon name={fc.icon} size={20} /></div>
              <div className="feature-h">{fc.name}</div>
              <p className="feature-p">{fc.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <Button variant="secondary" href="/features">
            See every feature <Icon name="chevron" size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}

function DemoVideo() {
  const ref        = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const fillRef    = useRef<HTMLDivElement>(null);
  const thumbRef   = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const controlsRef= useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const applyProgress = (ratio: number) => {
    const pct = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
    if (fillRef.current)  fillRef.current.style.width = pct;
    if (thumbRef.current) thumbRef.current.style.left  = pct;
  };

  const seekFromClient = (clientX: number) => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video || !video.duration) return;
    const r = track.getBoundingClientRect();
    const clamped = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    video.currentTime = clamped * video.duration;
    applyProgress(clamped);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (!isDragging.current && video.duration)
        applyProgress(video.currentTime / video.duration);
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  const onTrackMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    seekFromClient(e.clientX);
    e.preventDefault();
    const onMove = (ev: MouseEvent) => seekFromClient(ev.clientX);
    const onUp   = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".demo-hdr", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.from(".demo-frame", {
        opacity: 0, y: 56, scale: 0.96, duration: 1.1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".demo-frame",
          start: "top 88%",
          once: true,
          onEnter: () => { videoRef.current?.play().catch(() => {}); },
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const showControls = () => { if (controlsRef.current) controlsRef.current.style.opacity = "1"; };
  const hideControls = () => { if (!isDragging.current && controlsRef.current) controlsRef.current.style.opacity = "0"; };

  return (
    <section className="demo-section" ref={ref}>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="section-eyebrow demo-hdr">See it in action</div>
        <h2 className="section-h demo-hdr" style={{ maxWidth: "none" }}>
          The whole app,{" "}
          <span className="hero-title-gradient">in two minutes.</span>
        </h2>
        <p className="section-sub demo-hdr" style={{ margin: "16px auto 0" }}>
          Home screen to playback. No signup, no fuss — just the remote.
        </p>
      </div>
      <div className="demo-outer">
        <div className="demo-glow" />
        <div
          className="demo-frame"
          onMouseEnter={showControls}
          onMouseLeave={hideControls}
          style={{ position: "relative" }}
        >
          <video
            ref={videoRef}
            src="/assets/Hikari_demo_full.mp4"
            muted
            loop
            playsInline
            autoPlay
          />
          <div
            ref={controlsRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "52px 20px 18px",
              background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
              opacity: 0,
              transition: "opacity 0.2s ease",
              borderRadius: "inherit",
            }}
          >
            <div
              ref={trackRef}
              onMouseDown={onTrackMouseDown}
              style={{
                height: 4,
                background: "rgba(255,255,255,0.22)",
                borderRadius: 2,
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                ref={fillRef}
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  height: "100%",
                  width: "0%",
                  background: "rgba(255,255,255,0.88)",
                  borderRadius: 2,
                }}
              />
              <div
                ref={thumbRef}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0%",
                  transform: "translate(-50%, -50%)",
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.55)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hiw-header", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".hiw-header", start: "top 82%", once: true },
      });
      gsap.from(".hiw-card", {
        opacity: 0, y: -20, duration: 0.6, ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".hiw-card", start: "top 85%", once: true },
      });
      gsap.from(".hiw-note", {
        opacity: 0, y: 16, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".hiw-note", start: "top 88%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ paddingTop: 0 }} ref={ref}>
      <div className="container">
        <div className="section-eyebrow hiw-header">How it works</div>
        <h2 className="section-h hiw-header">Three steps, one remote.</h2>
        <p className="section-sub hiw-header">
          Hikari ships as a single APK with no account wall. Sideload, point it at a stream provider,
          and you&apos;re watching.
        </p>
        <div className="tiers" style={{ marginTop: 48 }}>
          {HOW_IT_WORKS.map((s) => (
            <div key={s.step} className="tier hiw-card">
              <div className="step-n">{s.step}</div>
              <div className="tname">{s.title}</div>
              <p className="desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="install-note hiw-note">
          <Icon name="info" size={16} />
          <div>
            <em>Hikari does not host video content.</em> It&apos;s a player and a metadata browser.
            Streams come from the addons you choose to install.
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav active="home" />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <StatStrip />
        <FeatureGrid />
        <DemoVideo />
        <HowItWorks />
        <CTABand
          headline={<>Ready to watch on the <span className="grad">biggest screen in the house</span>?</>}
          sub="One APK. No account. No card. Sideload, connect an addon, and start watching."
          primaryLabel="Download Hikari"
          primaryHref="/install"
          secondaryLabel="See features"
          secondaryHref="/features"
        />
      </main>
      <Footer />
    </div>
  );
}
