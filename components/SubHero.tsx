"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";
import Icon from "./Icon";

export default function SubHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".subhero-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
        .from(".subhero-h1", { opacity: 0, y: 32, duration: 0.8 }, "-=0.3")
        .from(".subhero-lede", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(".subhero-cta > *", { opacity: 0, y: 16, duration: 0.5, stagger: 0.1 }, "-=0.4");
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="subhero" ref={ref}>
      <div className="glow" />
      <div className="subhero-inner">
        <div className="eyebrow subhero-eyebrow">Features</div>
        <h1 className="subhero-h1">
          Six surfaces,{" "}
          <span className="hero-title-gradient">zero friction.</span>
        </h1>
        <p className="lede subhero-lede">
          Every screen in Hikari was designed for the leanback grid: the focus model, the typography,
          the way the catalogue loads. Here&apos;s what&apos;s inside.
        </p>
        <div className="cta-row subhero-cta">
          <Button size="lg" href="/install" icon={<Icon name="download" size={16} />}>
            Download for Android TV
          </Button>
          <Button size="lg" variant="secondary" href="https://github.com/Hflott/hikari_app" icon={<Icon name="github" size={16} />}>
            Source on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
