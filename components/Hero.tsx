'use client'

import { openDiscordInvite } from "@/lib/deepLink"
import { cn, chipToneStyles, layoutContainerClass, primaryButtonClass, subtleButtonClass } from "@/lib/utils"

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos"

const HERO_STATS = [
  { value: "+55K", label: "Pedidos" },
  { value: "Minutos", label: "Entrega media" },
  { value: "4.9/5", label: "Satisfacción" },
]

const FEATURED = [
  {
    title: "Robux",
    subtitle: "Carga segura",
    img: "https://images.unsplash.com/photo-1605901309584-818e25960a8b?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Gaming", tone: "green" },
      { label: "Best seller", tone: "gold" },
    ],
  },
  {
    title: "Discord Nitro",
    subtitle: "Mensual y anual",
    img: "https://images.unsplash.com/photo-1611162618071-b39a2ec4d1ef?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Discord", tone: "blue" },
      { label: "Popular", tone: "pink" },
    ],
  },
  {
    title: "Decoraciones",
    subtitle: "Banners, íconos, packs",
    img: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "Estilo", tone: "pink" }],
  },
  {
    title: "Streaming",
    subtitle: "Crunchyroll, Netflix, Disney+",
    img: "https://images.unsplash.com/photo-1598899134739-24b24967b74e?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "HD", tone: "blue" },
      { label: "Oferta", tone: "gold" },
    ],
  },
  {
    title: "VPNs",
    subtitle: "Top providers",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "Privacidad", tone: "green" }],
  },
  {
    title: "Boosts",
    subtitle: "Niveles garantizados",
    img: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Discord", tone: "blue" },
      { label: "Rápido", tone: "gold" },
    ],
  },
]

export default function Hero() {
  return (
    <section className="py-20 lg:py-24">
      <div className={layoutContainerClass}>
        <div
          className={cn(
            "relative rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out",
            "md:p-10 lg:p-12"
          )}
        >
          <div className="absolute -left-[10vw] top-[6vh] h-[38vh] w-[38vw] rounded-full bg-gradient-to-br from-fuchsia-400/25 via-violet-400/10 to-transparent blur-[110px]" />
          <div className="absolute -right-[12vw] bottom-[10vh] h-[36vh] w-[40vw] rounded-full bg-gradient-to-br from-cyan-400/20 via-sky-400/10 to-transparent blur-[120px]" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200/90">
                ✨ Diseño espectacular + microinteracciones
              </span>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Tu hub de {" "}
                <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  suscripciones y gaming
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-200/80 sm:text-lg">
                Robux, Discord Nitro, boosts, decoraciones, streaming, VPNs y más. Una página principal enfocada en animaciones,
                degradados y confianza instantánea.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  className={primaryButtonClass}
                  href={`https://discord.gg/${DISCORD_INVITE}`}
                  onClick={(event) => {
                    event.preventDefault()
                    openDiscordInvite(DISCORD_INVITE)
                  }}
                >
                  Ir al servidor
                </a>
                <a className={subtleButtonClass} href="#catalogo">
                  Ver catálogo
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-200/80">
                  ✔ Garantía & soporte
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-200/80">
                  🤝 Middleman moderno
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-200/80">
                  ⏱️ Trades 24/7
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {HERO_STATS.map((stat) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-[0_12px_28px_rgba(8,8,18,0.4)]"
                    key={stat.label}
                  >
                    <div className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.14em] text-slate-200/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className={cn(
                  "group relative rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150",
                  "sm:p-7"
                )}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-transparent">
                  <div className="absolute inset-[-3%] rounded-[30px] bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {FEATURED.map((item) => (
                    <article
                      className="relative rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_22px_52px_rgba(8,8,18,0.45)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)]"
                      key={item.title}
                    >
                      <div className="flex gap-3">
                        <img
                          alt={item.title}
                          className="h-14 w-14 flex-shrink-0 rounded-xl border border-white/15 object-cover"
                          loading="lazy"
                          src={item.img}
                        />
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                          <div className="text-sm text-slate-200/75">{item.subtitle}</div>
                          <div className="flex flex-wrap gap-2">
                            {item.chips.map((chip) => (
                              <span
                                className={cn(
                                  "inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100",
                                  chipToneStyles[chip.tone] ?? chipToneStyles.blue
                                )}
                                key={chip.label}
                              >
                                {chip.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
