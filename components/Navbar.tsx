"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "¿Por qué?", href: "#por-que" },
  { label: "Servicios", href: "#servicios" },
  { label: "FAQ", href: "#faq" },
  { label: "TOS", href: "/tos" },
  { label: "Grupo de Roblox", href: "/roblox" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  return (
    <header className="nav">
      <div className="container">
        <div className="glass nav-inner" style={{ position: "relative" }}>
          <div className="brand">
            <span className="dot" aria-hidden="true" />
            <span>
              dedos <span style={{ opacity: 0.7 }}>store</span>
            </span>
          </div>

          <nav
            className="nav-links"
            aria-label="Principal"
            data-open={open}
            id="primary-navigation"
          >
            {NAV_ITEMS.map((item) => {
              const href = item.href.startsWith("#")
                ? isHome
                  ? item.href
                  : `/${item.href}`
                : item.href;

              if (href.startsWith("http")) {
                return (
                  <a
                    key={item.href}
                    href={href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link key={item.href} href={href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              );
            })}
            <a
              href="https://discord.gg/dedos"
              target="_blank"
              rel="noopener"
              className="btn btn-gradient nav-cta"
            >
              Entrar a Discord →
            </a>
          </nav>

          <div className="navbar-actions">
            <button
              aria-label="Abrir menú"
              className="nav-toggle"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-controls="primary-navigation"
              type="button"
            >
              ☰
            </button>
            <a
              href="https://discord.gg/dedos"
              target="_blank"
              rel="noopener"
              className="btn btn-gradient"
            >
              Entrar a Discord →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
