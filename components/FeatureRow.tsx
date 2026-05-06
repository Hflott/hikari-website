"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icon";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

interface FeatureRowProps {
  reverse?: boolean;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  visual: ReactNode;
}

export default function FeatureRow({ reverse, eyebrow, title, body, bullets, visual }: FeatureRowProps) {
  const rowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const copy = el.querySelector(".fr-copy") as HTMLElement;
    const vis = el.querySelector(".fr-visual") as HTMLElement;
    const bulletItems = el.querySelectorAll(".fr-bullet");

    const copyFrom = reverse ? { x: 48 } : { x: -48 };
    const visFrom = reverse ? { x: -48 } : { x: 48 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(copy, { ...copyFrom, opacity: 0, duration: 0.8 })
        .from(vis, { ...visFrom, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(bulletItems, { opacity: 0, y: 12, duration: 0.4, stagger: 0.07 }, "-=0.4");
    }, rowRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <section
      ref={rowRef}
      className={`feature-detail${reverse ? " reverse" : ""}`}
    >
      <div className="copy fr-copy">
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        <p>{body}</p>
        {bullets && (
          <ul>
            {bullets.map((b) => (
              <li key={b} className="fr-bullet">
                <Icon name="check" size={16} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="visual fr-visual">
        <TiltCard intensity={7}>{visual}</TiltCard>
      </div>
    </section>
  );
}
