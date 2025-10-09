"use client";

import FXBackdrop from "@/components/fx/FXBackdrop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { openRobloxDestination } from "@/lib/deepLink";
import { useEffect, useState } from "react";

const ROBLOX_URL =
  process.env.NEXT_PUBLIC_ROBLOX_GROUP ||
  "https://www.roblox.com/es/communities/12082479/unnamed#!/about";
const FALLBACK_MS = 2600;

export default function RobloxRedirect() {
  const [second, setSecond] = useState(() => Math.ceil(FALLBACK_MS / 1000));

  useEffect(() => {
    openRobloxDestination(ROBLOX_URL, FALLBACK_MS);

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
