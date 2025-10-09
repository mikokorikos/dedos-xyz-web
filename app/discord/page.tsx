"use client";

import FXBackdrop from "@/components/fx/FXBackdrop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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

    const t = setInterval(() => setSecond((s) => (s > 0 ? s - 1 : 0)), 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(t);
    };
  }, []);

  return (
    <>
      <FXBackdrop />
      <Navbar />
      <main className="redirect-shell">
        <div className="redirect-card glass">
          <h1 style={{ margin: 0, fontSize: "clamp(24px,5vw,36px)" }}>
            Abriendo Discord…
          </h1>
          <p className="muted" style={{ marginTop: 12 }}>
            Si no se abre automáticamente, te redirigiremos al navegador en {second}s.
          </p>
          <div style={{ marginTop: 22 }}>
            <a
              href={`https://discord.gg/${INVITE}`}
              target="_blank"
              rel="noopener"
              className="btn btn-gradient"
            >
              Abrir en el navegador
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
