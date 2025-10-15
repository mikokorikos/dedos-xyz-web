"use client";

import { openDiscordInvite } from "@/lib/deepLink";
import { cn, layoutContainerClass } from "@/lib/utils";

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos";
const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-sm text-slate-200/70">
      <div className={cn(layoutContainerClass, "flex flex-wrap items-center justify-between gap-4")}>
        <div>© {new Date().getFullYear()} dedos store. Todos los derechos reservados.</div>
        <div className="flex items-center gap-4">
          <a className="transition hover:text-cyan-200" href="/tos">
            Términos
          </a>
          <a
            className="transition hover:text-cyan-200"
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
