"use client";

import { openDiscordInvite } from "@/lib/deepLink";
import { cn, layoutContainerClass } from "@/lib/utils";

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos";
const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 text-sm text-slate-200/70">
      <div className={cn(layoutContainerClass, "flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left")}>
        <div>© {new Date().getFullYear()} dedos store. Todos los derechos reservados.</div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a className="transition-colors duration-200 hover:text-white" href="/tos">
            Términos
          </a>
          <a
            className="transition-colors duration-200 hover:text-white"
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
