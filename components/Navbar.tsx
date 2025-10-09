"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "94%" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
            border: "1px solid rgba(148,163,184,.22)",
            backdropFilter: "blur(18px) saturate(140%)",
            borderRadius: 16,
            padding: "10px 14px",
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontWeight: 900,
              letterSpacing: "-.02em",
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: 8,
                background:
                  "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)",
                boxShadow: "0 0 24px rgba(139,92,246,.45)",
                display: "inline-block",
              }}
            />
            <span>
              dedos <span style={{ opacity: 0.7 }}>store</span>
            </span>
          </div>

          <nav
            style={{
              display: open ? "flex" : "none",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap",
            }}
            className="nav-links"
            aria-label="Principal"
          >
            <a href="#catalogo">Cat\u00E1logo</a>
            <a href="#por-que">\u00BFPor qu\u00E9?</a>
            <a href="#servicios">Servicios</a>
            <a href="#faq">FAQ</a>
            <Link href="/tos">TOS</Link>
            <Link href="/roblox">Grupo de Roblox</Link>
          </nav>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              aria-label="Abrir men\u00FA"
              onClick={() => setOpen(!open)}
              style={{
                background: "transparent",
                border: 0,
                color: "#fff",
                fontSize: 22,
                display: "inline-flex",
              }}
            >
              {"\u2630"}
            </button>

            <Link
              href="/discord"
              style={{
                textDecoration: "none",
                background:
                  "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)",
                color: "#fff",
                fontWeight: 700,
                padding: ".6rem 1rem",
                borderRadius: 999,
                boxShadow: "0 8px 30px rgba(139,92,246,.25)",
              }}
            >
              Entrar a Discord {"\u2192"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
