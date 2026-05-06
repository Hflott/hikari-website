"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

export default function ScreenshotSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ss-eyebrow", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".ss-eyebrow", start: "top 82%", once: true },
      });
      gsap.from(".ss-title", {
        opacity: 0, y: 28, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".ss-title", start: "top 82%", once: true },
        delay: 0.08,
      });
      gsap.from(".ss-sub", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".ss-sub", start: "top 82%", once: true },
        delay: 0.16,
      });
      gsap.from(".ss-frame", {
        opacity: 0, scale: 0.97, y: 32, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ss-frame", start: "top 82%", once: true },
        delay: 0.12,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" style={{ paddingTop: 32 }} ref={ref}>
      <div className="container">
        <div className="section-eyebrow ss-eyebrow">In the app</div>
        <h2 className="section-h ss-title">It looks the way it works.</h2>
        <p className="section-sub ss-sub">
          A glance at Hikari&apos;s home screen — the same browse surface your living room sees.
        </p>
        <TiltCard
          className="shot-frame ss-frame"
          style={{ marginTop: 56, maxWidth: 1080, marginLeft: "auto", marginRight: "auto" }}
          intensity={5}
        >
          <Image
            src="/assets/screen-home.png"
            alt="Hikari home screen"
            width={1080}
            height={607}
            style={{ width: "100%", height: "auto" }}
            priority={false}
          />
        </TiltCard>
      </div>
    </section>
  );
}
