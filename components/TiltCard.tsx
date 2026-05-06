"use client";

import { useRef, useEffect, ReactNode, CSSProperties } from "react";
import gsap from "gsap";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number;
}

export default function TiltCard({ children, className, style, intensity = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    let entryTimer: ReturnType<typeof setTimeout>;
    const onEnter = () => {
      // Ease into the tilt on entry, then cut to direct tracking
      card.style.transition = "transform 0.18s ease-out";
      if (glow) gsap.to(glow, { opacity: 1, duration: 0.35, ease: "power2.out" });
      entryTimer = setTimeout(() => { card.style.transition = "none"; }, 200);
    };

    const onMove = (e: MouseEvent) => {
      const r  = card.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width  - 0.5) * 2; // −1 → 1
      const ny = ((e.clientY - r.top)  / r.height - 0.5) * 2; // −1 → 1
      const ry =  nx * intensity;
      const rx = -ny * intensity;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

      if (glow) {
        const gx = ((e.clientX - r.left) / r.width)  * 100;
        const gy = ((e.clientY - r.top)  / r.height) * 100;
        glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(180,229,255,0.30) 0%, rgba(255,242,180,0.08) 45%, transparent 70%)`;
      }
    };

    const onLeave = () => {
      // Spring back with a nice ease
      card.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform   = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      if (glow) gsap.to(glow, { opacity: 0, duration: 0.55, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mousemove",  onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(entryTimer);
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mousemove",  onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [intensity]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-22%",
          background: "radial-gradient(circle at 50% 50%, rgba(180,229,255,0.22) 0%, transparent 70%)",
          filter: "blur(48px)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        ref={cardRef}
        className={className}
        style={{ ...style, willChange: "transform", position: "relative", zIndex: 1 }}
      >
        {children}
      </div>
    </div>
  );
}
