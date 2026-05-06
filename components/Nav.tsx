"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import Button from "./Button";
import Icon from "./Icon";

interface NavProps {
  active?: "home" | "features" | "install" | "contact" | "legal";
}

export default function Nav({ active }: NavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-brand", { opacity: 0, x: -16, duration: 0.6, ease: "power2.out", delay: 0.1 });
      gsap.from(".nav-link-item", {
        opacity: 0, y: -8, duration: 0.5, ease: "power2.out",
        stagger: 0.06, delay: 0.2,
      });
      gsap.from(".nav-cta", { opacity: 0, x: 16, duration: 0.5, ease: "power2.out", delay: 0.4 });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="nav-wrap" ref={navRef}>
      <nav className="nav">
        <Link className="brand nav-brand" href="/">
          <Image className="kanji" src="/assets/kanji_hikari.png" alt="光" width={22} height={22} />
          <span className="wordmark">Hikari</span>
        </Link>

        <div className="nav-links">
          {[
            { href: "/", label: "Home", key: "home" },
            { href: "/features", label: "Features", key: "features" },
            { href: "/install", label: "Install", key: "install" },
            { href: "/contact", label: "Contact", key: "contact" },
          ].map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`nav-link-item ${active === item.key ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-item"
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            GitHub <Icon name="external" size={12} />
          </a>
        </div>

        <div className="nav-right nav-cta">
          <Button href="/install" icon={<Icon name="download" size={14} />}>
            Download APK
          </Button>
        </div>
      </nav>
    </div>
  );
}
