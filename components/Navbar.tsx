"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { openDiscordInvite } from "@/lib/deepLink";
import {
  cn,
  gradientButtonClass,
  layoutContainerClass,
  subtleButtonClass,
} from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "¿Por qué?", href: "#por-que" },
  { label: "Servicios", href: "#servicios" },
  { label: "FAQ", href: "#faq" },
  { label: "TOS", href: "/tos" },
  { label: "Grupo de Roblox", href: "/roblox" },
];

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos";
const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  return (
    <header className="sticky top-0 z-50 bg-[#080812]/70 backdrop-blur-xl">
      <div className={cn(layoutContainerClass, "py-4")}>
        <div
          className={cn(
            "relative flex items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/5 px-5 py-3 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150"
          )}
        >
          <div className="flex items-center gap-3 font-extrabold uppercase tracking-tight">
            <span
              aria-hidden="true"
              className="inline-flex h-5 w-5 animate-spinSlow rounded-full bg-gradient-to-br from-fuchsia-400 via-violet-400 to-cyan-300"
            />
            <span className="text-sm sm:text-base">
              dedos <span className="opacity-70">store</span>
            </span>
          </div>

          <nav
            className={cn(
              "absolute left-0 right-0 top-full mt-3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#080812]/95 p-5 shadow-[0_22px_52px_rgba(8,8,18,0.55)] backdrop-blur-xl md:static md:mt-0 md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none",
              open ? "flex" : "hidden",
              "md:flex"
            )}
            aria-label="Principal"
            id="primary-navigation"
          >
            <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
              {NAV_ITEMS.map((item) => {
                const href = item.href.startsWith("#")
                  ? isHome
                    ? item.href
                    : `/${item.href}`
                  : item.href;

                const linkClass = "text-sm font-medium text-slate-200/80 transition-colors duration-200 hover:text-white";

                if (href.startsWith("http")) {
                  return (
                    <li key={item.href}>
                      <a
                        className={linkClass}
                        href={href}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link className={linkClass} href={href} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <a
              className={cn(gradientButtonClass, "justify-center text-sm md:hidden")}
              href={DISCORD_URL}
              onClick={(event) => {
                event.preventDefault();
                openDiscordInvite(DISCORD_INVITE);
                setOpen(false);
              }}
            >
              Entrar a Discord →
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-controls="primary-navigation"
              aria-expanded={open}
              aria-label="Abrir menú"
              className={cn(subtleButtonClass, "px-3 py-2 text-base md:hidden")}
              onClick={() => setOpen((prev) => !prev)}
              type="button"
            >
              ☰
            </button>
            <a
              className={cn(gradientButtonClass, "hidden text-sm md:inline-flex")}
              href={DISCORD_URL}
              onClick={(event) => {
                event.preventDefault();
                openDiscordInvite(DISCORD_INVITE);
              }}
            >
              Entrar a Discord →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
