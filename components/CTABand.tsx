"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import Icon from "./Icon";

gsap.registerPlugin(ScrollTrigger);

interface CTABandProps {
  headline?: ReactNode;
  sub?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABand({
  headline = <><span className="grad">cobbling together</span>?</>,
  sub = "Hikari ships as a single APK. Install it on any Android TV, Google TV, or Fire TV box.",
  primaryLabel = "Get the APK",
  primaryHref = "/install",
  secondaryLabel = "Read the source",
  secondaryHref = "https://github.com",
}: CTABandProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(".cta-h2",  { opacity: 0, y: 32, duration: 0.8 })
        .from(".cta-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".cta-btns > *", { opacity: 0, y: 16, duration: 0.5, stagger: 0.1 }, "-=0.3");
    }, ref);
    return () => ctx.revert();
  }, []);

  const secondaryIsExternal = secondaryHref?.startsWith("http");

  return (
    <section className="cta-band" ref={ref}>
      <div className="glow" />
      <div className="inner">
        <h2 className="display cta-h2">{headline}</h2>
        <p className="cta-sub">{sub}</p>
        <div className="row cta-btns">
          <Button size="lg" href={primaryHref} icon={<Icon name="download" size={16} />}>
            {primaryLabel}
          </Button>
          {secondaryIsExternal ? (
            <Button size="lg" variant="secondary" href={secondaryHref} icon={<Icon name="github" size={16} />}>
              {secondaryLabel}
            </Button>
          ) : (
            <Button size="lg" variant="secondary" href={secondaryHref}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
