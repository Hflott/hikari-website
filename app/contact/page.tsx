"use client";

import { useState, useEffect, useRef } from "react";
import type { Metadata } from "next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

gsap.registerPlugin(ScrollTrigger);

interface ContactCardProps {
  icon: string;
  title: string;
  descr: string;
  link: string;
  linkLabel: string;
}

function ContactCard({ icon, title, descr, link, linkLabel }: ContactCardProps) {
  return (
    <div className="contact-card">
      <div className="glyph"><Icon name={icon} size={18} /></div>
      <h3>{title}</h3>
      <p>{descr}</p>
      <a className="link" href={link}>{linkLabel} →</a>
    </div>
  );
}

function SubHeroContact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".contact-eyebrow", { opacity: 0, y: 14, duration: 0.5 })
        .from(".contact-h1",      { opacity: 0, y: 32, duration: 0.8 }, "-=0.3")
        .from(".contact-lede",    { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="subhero" style={{ paddingBottom: 48 }} ref={ref}>
      <div className="glow" />
      <div className="subhero-inner">
        <div className="eyebrow contact-eyebrow">Contact</div>
        <h1 className="contact-h1">Get in touch.</h1>
        <p className="lede contact-lede">
          Hikari runs on volunteer time. The fastest path to a fix is GitHub Issues;
          the friendliest path to a hello is Discord. Pick whichever fits.
        </p>
      </div>
    </section>
  );
}

function ContactCards() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-card", {
        opacity: 0, y: 28, scale: 0.98, duration: 0.6, ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-grid" ref={ref}>
      <ContactCard
        icon="github"
        title="Bug reports & feature requests"
        descr="The maintainers live on GitHub. File issues with logs and reproduction steps; include your Android TV device and version. Every release ships from this repo."
        link="https://github.com"
        linkLabel="github.com/hikari-tv/hikari"
      />
      <ContactCard
        icon="discord"
        title="Community chat"
        descr="Discord for casual questions, addon recommendations, screenshots, and watch-along nights. Maintainers hang out in #dev. Be patient with #help."
        link="https://discord.gg"
        linkLabel="discord.gg/hikari-tv"
      />
      <ContactCard
        icon="mail"
        title="Privacy & legal"
        descr="DMCA-adjacent notices, trademark questions, GDPR/CCPA rights requests, and anything covered by the privacy policy or terms. PGP key on the GitHub README."
        link="mailto:legal@hikari.tv"
        linkLabel="legal@hikari.tv"
      />
      <ContactCard
        icon="shield"
        title="Security disclosures"
        descr="Found a vulnerability? Disclose privately first. We aim to acknowledge within 72 hours and patch within 14 days for high-severity issues. Hall of fame in the repo."
        link="mailto:security@hikari.tv"
        linkLabel="security@hikari.tv"
      />
    </div>
  );
}

function ContactForm() {
  const [reason, setReason] = useState("bug");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-section > *", {
        opacity: 0, y: 24, duration: 0.6, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      ref={ref}
      style={{
        marginTop: 80,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "start",
      }}
    >
      <div className="form-section">
        <div className="section-eyebrow">Send a message</div>
        <h2 className="section-h" style={{ fontSize: 36 }}>Or, just write.</h2>
        <p className="section-sub">
          If your question doesn&apos;t fit any of the channels above, drop a note here and
          someone will get back to you. Average response time is 2–4 days.
        </p>
        <ul style={{ listStyle: "none", padding: 0, marginTop: 28, display: "flex", flexDirection: "column", gap: 14, color: "var(--body)", fontSize: 14, lineHeight: 1.55 }}>
          <li>
            <Icon name="check" size={14} style={{ verticalAlign: "middle", marginRight: 10, color: "var(--hikari-sky)" }} />
            Read by maintainers, not bots
          </li>
          <li>
            <Icon name="check" size={14} style={{ verticalAlign: "middle", marginRight: 10, color: "var(--hikari-sky)" }} />
            No mailing list — your address is only used to reply
          </li>
          <li>
            <Icon name="check" size={14} style={{ verticalAlign: "middle", marginRight: 10, color: "var(--hikari-sky)" }} />
            Use GitHub for anything you&apos;d like tracked publicly
          </li>
        </ul>
      </div>

      {submitted ? (
        <div
          className="contact-form"
          style={{ alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 360 }}
        >
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--surface-card)", border: "1px solid var(--hairline-strong)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)" }}>
            <Icon name="check" size={26} />
          </div>
          <h3 style={{ margin: 0, fontSize: 20, color: "var(--on-dark)", fontWeight: 500 }}>Message received.</h3>
          <p style={{ margin: 0, fontSize: 14, color: "var(--mute)", maxWidth: 320 }}>
            Thanks for the note. Someone will reply within a few days, usually faster.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ marginTop: 8 }}>
            Send another
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="reason">What&apos;s this about?</label>
            <select id="reason" value={reason} onChange={(e) => setReason(e.target.value)}>
              <option value="bug">Bug or playback issue</option>
              <option value="feature">Feature request</option>
              <option value="addon">Addon question</option>
              <option value="legal">Legal / trademark</option>
              <option value="security">Security disclosure</option>
              <option value="other">Something else</option>
            </select>
          </div>
          {reason === "bug" && (
            <div className="field">
              <label htmlFor="device">TV device &amp; Android version</label>
              <input id="device" type="text" placeholder="e.g. NVIDIA Shield Pro · Android 11" />
            </div>
          )}
          <div className="field">
            <label htmlFor="msg">Message</label>
            <textarea id="msg" placeholder="Tell us what's going on…" required />
          </div>
          <div className="submit-row">
            <span className="privacy-note">
              Your address is used only to reply.{" "}
              <a className="inline" href="/privacy">Privacy policy</a>
            </span>
            <Button>Send message</Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav active="contact" />
      <main style={{ flex: 1 }}>
        <SubHeroContact />
        <div className="container" style={{ paddingBottom: 96 }}>
          <ContactCards />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
