"use client";

import FXBackdrop from "@/components/fx/FXBackdrop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { openDiscordInvite } from "@/lib/deepLink";
import { useEffect, useState } from "react";

const INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos";
const WEB_URL = `https://discord.gg/${INVITE}`;
const FALLBACK_MS = 2400;

export default function DiscordRedirect() {
  const [second, setSecond] = useState(() => Math.ceil(FALLBACK_MS / 1000));

  useEffect(() => {
    openDiscordInvite(INVITE, FALLBACK_MS);

    const t = window.setInterval(() => {
      setSecond((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(t);
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
            <a href={WEB_URL} className="btn btn-gradient">
              Abrir en el navegador
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
