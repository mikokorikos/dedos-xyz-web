"use client";

import { openDiscordInvite } from "@/lib/deepLink";

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos";
const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          © {new Date().getFullYear()} dedos store. Todos los derechos reservados.
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/tos">Términos</a>
          <a
            href={DISCORD_URL}
            onClick={(event) => {
              event.preventDefault();
              openDiscordInvite(DISCORD_INVITE);
            }}
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
