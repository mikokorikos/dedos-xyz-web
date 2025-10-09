"use client";

import FXBackdrop from "@/components/fx/FXBackdrop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const ROBLOX_URL =
  process.env.NEXT_PUBLIC_ROBLOX_GROUP ||
  "https://www.roblox.com/es/communities/12082479/unnamed#!/about";

export default function RobloxRedirect() {
  const [second, setSecond] = useState(3);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const appLink = "roblox-mobile://navigation/app";
      try {
        window.location.href = appLink;
      } catch (_) {
        // ignore deep link errors; fallback handles redirect
      }
    }

    const timer = setTimeout(() => {
      window.location.href = ROBLOX_URL;
    }, 1200);

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
            Abriendo Roblox…
          </h1>
          <p className="muted" style={{ marginTop: 12 }}>
            Si no se abre la app, te llevamos al navegador en {second}s.
          </p>
          <div style={{ marginTop: 22 }}>
            <a
              href={ROBLOX_URL}
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
