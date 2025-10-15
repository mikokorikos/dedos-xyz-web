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
    <section className="py-20" id="catalogo">
      <div className={cn(layoutContainerClass, "space-y-10")}> 
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-4xl font-extrabold sm:text-5xl">Catálogo</h2>
          <p className="text-base leading-relaxed text-slate-200/80 sm:text-lg">
            Todo en un mismo lugar. Hover para ver la magia ✨
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10 justify-center">
          {CATALOG_ITEMS.map((item) => (
            <article
              className="group relative mx-auto flex h-full min-h-[620px] max-w-[420px] flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7 lg:p-8"
              key={item.title}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <img
                    alt={item.title}
                    className="h-16 w-16 flex-shrink-0 rounded-xl border border-white/15 object-cover"
                    loading="lazy"
                    src={item.image}
                  />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-200/75">{item.subtitle}</p>
                  </div>
                </div>
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
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-200/75">
                    <span>Desde</span>
                    <strong className="text-white">Consultar</strong>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-4 pt-6">
                <p className="text-sm leading-relaxed text-slate-200/75">
                  Escríbenos por Discord y cotiza en segundos con nuestro equipo.
                </p>
                <a
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
                  href={DISCORD_URL}
                  onClick={handleDiscordClick}
                >
                  Comprar en Discord →
                </a>
              </div>
              <div className="pointer-events-none absolute -left-[10vw] top-[8vh] h-[40vh] w-[40vw] rounded-full bg-gradient-to-br from-fuchsia-400/30 via-violet-400/10 to-transparent blur-[100px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section className="py-20" id="servicios">
      <div className={layoutContainerClass}>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10 justify-center">
          {SERVICES.map((service) => (
            <article
              className="mx-auto flex h-full max-w-[420px] flex-col gap-4 rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7 lg:p-8"
              key={service.title}
            >
              <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              <p className="text-base leading-relaxed text-slate-200/80">{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Why() {
  return (
    <section className="py-20" id="por-que">
      <div className={cn(layoutContainerClass, "space-y-10 text-center")}> 
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            ¿Por qué comprar con {" "}
            <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              dedos
            </span>
            ?
          </h2>
          <p className="text-base leading-relaxed text-slate-200/80 sm:text-lg">Velocidad, seguridad y un diseño que enamora.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-10 justify-center">
          {WHY_POINTS.map((point) => (
            <article
              className="mx-auto flex h-full max-w-[320px] flex-col gap-4 rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7"
              key={point.title}
            >
              <h3 className="text-xl font-semibold text-white">{point.title}</h3>
              <p className="text-base leading-relaxed text-slate-200/80">{point.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="py-20">
      <div className={layoutContainerClass}>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150 md:p-7 lg:p-8">
          <div className="space-y-3">
            <h3 className="text-3xl font-extrabold text-white sm:text-4xl">¿Listo para empezar?</h3>
            <p className="text-base leading-relaxed text-slate-200/80 sm:text-lg">Entra a nuestro servidor y abre tu primer ticket.</p>
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
    <section className="py-20" id="faq">
      <div className={cn(layoutContainerClass, "max-w-3xl space-y-8 text-center")}> 
        <h2 className="text-4xl font-extrabold sm:text-5xl">Preguntas frecuentes</h2>
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150">
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
                <div className={cn("px-5 pb-5 text-base leading-relaxed text-slate-200/80", isOpen ? "block" : "hidden")}>{item.a}</div>
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
    <section className="py-20 pt-0" id="tos">
      <div className={cn(layoutContainerClass, "max-w-4xl")}> 
        <div className="space-y-4 rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150 md:p-7 lg:p-8">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Términos de Servicio (resumen)</h2>
          <p className="text-base leading-relaxed text-slate-200/80">
            Este es un placeholder. Pásame tus TOS y los pego aquí. Ejemplos: políticas de reembolso, tiempos de entrega,
            garantías, restricciones de uso, contacto de soporte.
          </p>
        </div>
      </div>
    </section>
  )
}
