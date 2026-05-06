import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "lg" | "default";
  href?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ variant = "primary", size, href, icon, children, className, onClick }: ButtonProps) {
  const cls = [
    "btn",
    `btn-${variant}`,
    size === "lg" ? "btn-lg" : "",
    className ?? "",
  ].filter(Boolean).join(" ");

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
          {icon}{children}
        </a>
      );
    }
    return <Link className={cls} href={href}>{icon}{children}</Link>;
  }

  return (
    <button className={cls} onClick={onClick}>
      {icon}{children}
    </button>
  );
}
