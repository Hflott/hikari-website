"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import Button from "./Button";
import Icon from "./Icon";

interface NavProps {
  active?: "home" | "features" | "install" | "contact" | "legal";
}

const LINKS = [
  { href: "/",         label: "Home",     key: "home"     },
  { href: "/features", label: "Features", key: "features" },
  { href: "/install",  label: "Install",  key: "install"  },
  { href: "/contact",  label: "Contact",  key: "contact"  },
];

export default function Nav({ active }: NavProps) {
  const navRef    = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div className="nav-wrap" ref={navRef}>
      <nav className="nav">
        <Link className="brand nav-brand" href="/">
          <Image className="kanji" src="/assets/kanji_hikari.png" alt="光" width={22} height={22} />
          <span className="wordmark">Hikari</span>
        </Link>

        <div className="nav-links">
          {LINKS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`nav-link-item${active === item.key ? " active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/Hflott/hikari_app"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-item"
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            GitHub <Icon name="external" size={12} />
          </a>
        </div>

        <div className="nav-right nav-cta">
          <div className="nav-desktop-btn">
            <Button href="/install" icon={<Icon name="download" size={14} />}>
              Download APK
            </Button>
          </div>
          <button
            className="nav-hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`ham-bar${open ? " open" : ""}`} data-pos="top" />
            <span className={`ham-bar${open ? " open" : ""}`} data-pos="mid" />
            <span className={`ham-bar${open ? " open" : ""}`} data-pos="bot" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`nav-mobile${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="nav-mobile-inner">
          {LINKS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`nav-mobile-link${active === item.key ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/Hflott/hikari_app"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-mobile-link"
            onClick={() => setOpen(false)}
          >
            GitHub <Icon name="external" size={12} />
          </a>
          <div className="nav-mobile-cta">
            <Button href="/install" icon={<Icon name="download" size={14} />}>
              Download APK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
