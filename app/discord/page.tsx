"use client";

import { useEffect, useState } from "react";

const INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos";

export default function DiscordRedirect() {
  const [second, setSecond] = useState(3);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const proto = isMobile ? "discord://" : "discord://";
    const urlWeb = `https://discord.gg/${INVITE}`;

    const timer = setTimeout(() => {
      window.location.href = urlWeb;
    }, 1200);

    try {
      window.location.href = `${proto}/invite/${INVITE}`;
    } catch (_) {
      // ignore deep link errors; fallback handles redirect
    }

    const t = setInterval(
      () => setSecond((s) => (s > 0 ? s - 1 : 0)),
      1000
    );

    return () => {
      clearTimeout(timer);
      clearInterval(t);
    };
  }, []);

  return (
    <RedirShell
      title="Abriendo Discord\u2026"
      description={`Si no se abre autom\u00E1ticamente, te redirigiremos al navegador en ${second}s.`}
      primaryHref={`https://discord.gg/${INVITE}`}
      primaryText="Abrir en el navegador"
    />
  );
}

function RedirShell({
  title,
  description,
  primaryHref,
  primaryText,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryText: string;
}) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 640,
          width: "100%",
          padding: 24,
          borderRadius: 20,
          background:
            "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
          border: "1px solid rgba(148,163,184,.22)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(24px,5vw,36px)" }}>
          {title}
        </h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>{description}</p>
        <div style={{ marginTop: 16 }}>
          <a
            href={primaryHref}
            style={{
              textDecoration: "none",
              background:
                "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)",
              color: "#fff",
              fontWeight: 700,
              padding: ".9rem 1.35rem",
              borderRadius: 999,
              boxShadow: "0 8px 30px rgba(139,92,246,.25)",
              display: "inline-block",
            }}
          >
            {primaryText}
          </a>
        </div>
      </div>
    </div>
  );
}
