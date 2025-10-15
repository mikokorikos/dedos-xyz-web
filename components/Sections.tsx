"use client"

import { useState, type MouseEvent } from "react"

import { openDiscordInvite } from "@/lib/deepLink"
import {
  chipToneStyles,
  cn,
  gradientButtonClass,
  layoutContainerClass
} from "@/lib/utils"

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos"
const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`

function handleDiscordClick(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  openDiscordInvite(DISCORD_INVITE)
}

type ChipTone = keyof typeof chipToneStyles

type CatalogItem = {
  title: string
  subtitle: string
  image: string
  chips: { label: string; tone: ChipTone }[]
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    title: "Robux",
    subtitle: "Carga segura",
    image:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8b?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Gaming", tone: "green" },
      { label: "Best seller", tone: "gold" }
    ]
  },
  {
    title: "Discord Nitro",
    subtitle: "Mensual y anual",
    image:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec4d1ef?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Discord", tone: "blue" },
      { label: "Popular", tone: "pink" }
    ]
  },
  {
    title: "Decoraciones Discord",
    subtitle: "Banners, íconos, packs",
    image:
      "https://images.unsplash.com/photo-1563986768817-257bf91c5753?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "Estilo", tone: "pink" }]
  },
  {
    title: "Spotify",
    subtitle: "Planes individuales",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "Música", tone: "green" }]
  },
  {
    title: "Streaming",
    subtitle: "Crunchyroll, Netflix, Disney+",
    image:
      "https://images.unsplash.com/photo-1598899134739-24b24967b74e?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "HD", tone: "blue" },
      { label: "Oferta", tone: "gold" }
    ]
  },
  {
    title: "VPNs",
    subtitle: "Top providers",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "Privacidad", tone: "green" }]
  },
  {
    title: "Boosts de Servidor",
    subtitle: "Niveles garantizados",
    image:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Discord", tone: "blue" },
      { label: "Rápido", tone: "gold" }
    ]
  },
  {
    title: "ChatGPT Premium",
    subtitle: "Planes disponibles",
    image:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "IA", tone: "pink" }]
  }
]

const SERVICES = [
  {
    title: "🤝 Sistema de Middleman moderno",
    copy:
      "Escrow seguro, verificación de ambas partes y liberación de fondos tras confirmación. Logs y auditoría interna."
  },
  {
    title: "⏱️ Trades 24/7",
    copy:
      "Cobertura continua con rotación de staff y automatizaciones. Soporte express en Discord."
  }
]

const WHY_POINTS = [
  {
    title: "Pagos 100% seguros",
    copy: "Protección y verificación en cada pedido."
  },
  {
    title: "Entregas rápidas",
    copy: "Automatizadas o asistidas por nuestro staff."
  },
  {
    title: "Diseño + experiencia",
    copy: "UI de alto impacto con animaciones y glassmorphism."
  },
  {
    title: "Soporte dedicado",
    copy: "Estamos en Discord para ayudarte 24/7."
  }
]

const FAQS = [
  {
    q: "¿Cómo compro?",
    a: "Haz clic en “Entrar a Discord” y abre un ticket. Nuestro bot te guiará paso a paso."
  },
  {
    q: "¿Es legal?",
    a: "Solo vendemos suscripciones y servicios legítimos conforme a sus términos. Nada robado ni ilícito."
  },
  {
    q: "¿En cuánto tiempo entregan?",
    a: "La mayoría de pedidos se entregan entre minutos y pocas horas, según el producto y stock."
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Consulta en el servidor: aceptamos múltiples opciones según tu país."
  }
]

export function Catalog() {
  return (
    <section className="py-16" id="catalogo">
      <div className={cn(layoutContainerClass, "space-y-8")}>
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Catálogo</h2>
          <p className="text-slate-200/80">Todo en un mismo lugar. Hover para ver la magia ✨</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CATALOG_ITEMS.map((item) => (
            <article
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(8,8,18,0.35)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(8,8,18,0.55)]"
              key={item.title}
            >
              <div className="flex gap-4">
                <img
                  alt={item.title}
                  className="h-16 w-16 flex-shrink-0 rounded-xl border border-white/15 object-cover"
                  loading="lazy"
                  src={item.image}
                />
                <div className="flex-1 space-y-4">
                  <header className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <small className="text-sm text-slate-200/70">{item.subtitle}</small>
                    </div>
                    <span aria-hidden="true" className="text-lg text-cyan-200">
                      ★
                    </span>
                  </header>
                  <div className="flex flex-wrap gap-2">
                    {item.chips.map((chip) => (
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100",
                          chipToneStyles[chip.tone]
                        )}
                        key={chip.label}
                      >
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-200/70">Desde</span>
                    <strong className="text-white">Consultar</strong>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
                    href={DISCORD_URL}
                    onClick={handleDiscordClick}
                  >
                    Comprar en Discord →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section className="py-16" id="servicios">
      <div className={layoutContainerClass}>
        <div className="grid gap-5 rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(8,8,18,0.45)] backdrop-blur-xl backdrop-saturate-150 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(8,8,18,0.35)]"
              key={service.title}
            >
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="text-sm text-slate-200/80">{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Why() {
  return (
    <section className="py-16" id="por-que">
      <div className={cn(layoutContainerClass, "space-y-8")}>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            ¿Por qué comprar con {" "}
            <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              dedos
            </span>
            ?
          </h2>
          <p className="text-slate-200/80">Velocidad, seguridad y un diseño que enamora.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_POINTS.map((point) => (
            <article
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(8,8,18,0.35)]"
              key={point.title}
            >
              <h3 className="text-lg font-semibold text-white">{point.title}</h3>
              <p className="text-sm text-slate-200/80">{point.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="py-16">
      <div className={layoutContainerClass}>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[26px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_45px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">¿Listo para empezar?</h3>
            <p className="text-slate-200/80">Entra a nuestro servidor y abre tu primer ticket.</p>
          </div>
          <a className={gradientButtonClass} href={DISCORD_URL} onClick={handleDiscordClick}>
            Entrar a Discord
          </a>
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-16" id="faq">
      <div className={cn(layoutContainerClass, "max-w-3xl")}>
        <h2 className="mb-6 text-center text-3xl font-extrabold sm:text-4xl">Preguntas frecuentes</h2>
        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(8,8,18,0.45)] backdrop-blur-xl backdrop-saturate-150">
          {FAQS.map((item, index) => {
            const isOpen = open === index
            return (
              <div key={item.q} className="border-b border-white/10 last:border-0">
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white transition hover:text-cyan-200"
                  onClick={() => setOpen(isOpen ? null : index)}
                  type="button"
                >
                  <span>{item.q}</span>
                  <svg
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 transform text-slate-200/80 transition",
                      isOpen ? "rotate-90 text-cyan-200" : ""
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
                <div className={cn("px-5 pb-5 text-sm text-slate-200/80", isOpen ? "block" : "hidden")}>{item.a}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function TOSPreview() {
  return (
    <section className="pb-16" id="tos">
      <div className={cn(layoutContainerClass, "max-w-4xl")}>
        <div className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(8,8,18,0.45)] backdrop-blur-xl backdrop-saturate-150">
          <h2 className="text-2xl font-semibold text-white">Términos de Servicio (resumen)</h2>
          <p className="text-sm text-slate-200/80">
            Este es un placeholder. Pásame tus TOS y los pego aquí. Ejemplos: políticas de reembolso, tiempos de entrega,
            garantías, restricciones de uso, contacto de soporte.
          </p>
        </div>
      </div>
    </section>
  )
}
