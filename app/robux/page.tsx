import type { ReactNode } from "react"

import FXBackdrop from "@/components/fx/FXBackdrop"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import PlanCard from "@/components/robux/plan-card"
import type { ChipTone, PlanHighlight } from "@/components/robux/types"
import type { PlanIconKey } from "@/components/robux/icons"
import {
  gradientButtonClass,
  layoutContainerClass,
  primaryButtonClass,
  subtleButtonClass
} from "@/lib/utils"

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos"
const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`
const ROBLOX_GROUP_URL =
  process.env.NEXT_PUBLIC_ROBLOX_GROUP ||
  "https://www.roblox.com/es/communities/12082479/unnamed#!/about"

const MXN_TO_USD_ENDPOINT = "https://open.er-api.com/v6/latest/MXN"
const EXCHANGE_REVALIDATE_SECONDS = 900

const formatter = {
  mxn: new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }),
  usd: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
}

type Plan = {
  id: string
  title: string
  tagline: string
  tone: ChipTone
  priceMXN: number
  icon: PlanIconKey
  highlight?: PlanHighlight
  description: string
  requirements: string[]
  delivery: string
  extras?: string[]
  cta?: { label: string; href: string }
  amountLabel: string
}

type PlanCardData = Plan & {
  priceMXNLabel: string
  priceUSDLabel: string
}

type ValuePoint = {
  id: string
  title: string
  description: string
  icon: ReactNode
}

type PurchaseStep = {
  id: string
  title: string
  description: string
}

const VALUE_ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3 5 6v6c0 4.4 2.8 8.6 7 9 4.2-.4 7-4.6 7-9V6l-7-3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3 1.9 5.7H20l-4.5 3.3 1.8 5.7L12 15.4 6.7 17.7 8.5 12 4 8.7h6.1L12 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5h14a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H12l-4.5 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 9.5h7M8.5 13h4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
} as const

const VALUE_POINTS: ValuePoint[] = [
  {
    id: "fees",
    title: "Comisiones optimizadas",
    description:
      "Aprovechamos los precios regionales de Roblox para que pagues menos sin sacrificar velocidad ni seguridad en la entrega.",
    icon: VALUE_ICONS.shield
  },
  {
    id: "boost",
    title: "Recargas versátiles",
    description:
      "Elige entre grupo oficial, regalo directo o compra de gamepass según la urgencia de tus Robux y el tipo de compra que buscas.",
    icon: VALUE_ICONS.spark
  },
  {
    id: "support",
    title: "Acompañamiento experto",
    description:
      "Nuestro staff te guía 1:1 por Discord con evidencia de pago y seguimiento en vivo para que tengas control total del proceso.",
    icon: VALUE_ICONS.chat
  }
]

const PURCHASE_STEPS: PurchaseStep[] = [
  {
    id: "ticket",
    title: "Abre un ticket en Discord",
    description:
      "Ingresa a nuestro servidor, elige la categoría de Robux y comparte el método que prefieres junto con tu usuario."
  },
  {
    id: "confirma",
    title: "Confirma monto y pago",
    description:
      "Validamos el tipo de cambio, te mostramos las opciones de pago disponibles y recibes instrucciones claras al instante."
  },
  {
    id: "recibe",
    title: "Recibe tus Robux",
    description:
      "Liberamos el pedido apenas Roblox lo procesa. Dependiendo del plan, puede ser inmediato o tras el periodo requerido."
  }
]

const PLANS: Plan[] = [
  {
    id: "group",
    title: "Recarga por grupo oficial",
    tagline: "Ideal para compras recurrentes",
    tone: "pink",
    priceMXN: 125,
    icon: "group",
    highlight: { label: "Recomendado", tone: "gold" },
    amountLabel: "1,000 Robux",
    description:
      "Compra tus Robux directamente desde nuestro grupo de Roblox. Perfecto si planeas recargar con frecuencia y quieres la comisión más baja.",
    requirements: [
      "Unirte al grupo oficial de Dedos.xyz en Roblox.",
      "Esperar 14 días después de haber ingresado al grupo (requisito de Roblox)."
    ],
    delivery:
      "Después de cada compra liberamos el pago y recibes los Robux en cuanto Roblox procesa la venta (generalmente al instante tras el periodo de espera inicial).",
    extras: ["Seguimiento en vivo dentro del ticket de Discord.", "Comisiones mínimas."],
    cta: { label: "Ir al grupo de Roblox", href: ROBLOX_GROUP_URL }
  },
  {
    id: "gift",
    title: "Regalo por juego",
    tagline: "Selecciona tu juego favorito",
    tone: "blue",
    priceMXN: 126,
    icon: "gift",
    highlight: { label: "Alternativa popular", tone: "green" },
    amountLabel: "1,000 Robux",
    description:
      "Compramos el gamepass o artículo que elijas dentro del juego para que recibas el valor en Robux al momento. Ideal si quieres un ítem específico o no quieres esperar los 14 días del grupo.",
    requirements: [
      "Contar con un juego o experiencia donde se puedan regalar artículos o gamepasses.",
      "Enviar el enlace directo al producto dentro del ticket de Discord."
    ],
    delivery: "Te regalamos el artículo seleccionado al instante y Roblox acredita los Robux inmediatamente.",
    extras: ["No requiere antigüedad en grupos.", "Funciona con títulos populares como Blox Fruits, Pet Simulator, Adopt Me!"]
  },
  {
    id: "pass",
    title: "Compra directa de gamepass",
    tagline: "Opción clásica",
    tone: "gold",
    priceMXN: 136.99,
    icon: "pass",
    amountLabel: "1,000 Robux",
    description:
      "Publica un gamepass con el monto que necesites y nosotros lo adquirimos. Es la vía tradicional, útil si ya tienes gamepasses configurados sin precios regionales.",
    requirements: [
      "Gamepasses publicados por 500, 100 o 29 Robux (sin precios regionales).",
      "Compartir el enlace al gamepass en el ticket."
    ],
    delivery:
      "La compra se registra enseguida, pero Roblox libera los fondos en un plazo de 5 a 10 días hábiles.",
    extras: ["Excelente para creadores con catálogo propio.", "Ideal cuando necesitas montos específicos."]
  }
]

type ExchangeResponse = {
  rates?: { USD?: number }
  time_last_update_utc?: string
}

type ExchangeInfo = {
  rate: number | null
  updatedAt: string | null
}

async function getUsdRate(): Promise<ExchangeInfo> {
  try {
    const response = await fetch(MXN_TO_USD_ENDPOINT, {
      next: { revalidate: EXCHANGE_REVALIDATE_SECONDS }
    })

    if (!response.ok) {
      return { rate: null, updatedAt: null }
    }

    const data = (await response.json()) as ExchangeResponse
    const usd = data.rates?.USD
    const updatedAt = data.time_last_update_utc ?? null

    return {
      rate: typeof usd === "number" ? usd : null,
      updatedAt
    }
  } catch (error) {
    console.error("Failed to fetch MXN → USD rate", error)
    return { rate: null, updatedAt: null }
  }
}

function formatUsd(amount: number | null) {
  if (amount === null) {
    return "Consulta en Discord"
  }

  return `≈ ${formatter.usd.format(amount)}`
}

function formatExchangeLabel(rate: number | null, updatedAt: string | null) {
  if (!rate) {
    return "Tipo de cambio no disponible. Nuestro equipo te confirmará el monto final en el ticket."
  }

  const date = updatedAt ? new Date(updatedAt) : null
  const formattedDate = date
    ? new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC"
      }).format(date)
    : null

  return `Tipo de cambio: 1 MXN = ${rate.toFixed(4)} USD${
    formattedDate ? ` · Actualizado ${formattedDate} (UTC)` : ""
  }`
}

const pillClass =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-200/80"

export default async function RobuxPlansPage() {
  const { rate: usdRate, updatedAt } = await getUsdRate()
  const plansWithUsd: PlanCardData[] = PLANS.map((plan) => {
    const priceUSD = usdRate ? plan.priceMXN * usdRate : null

    return {
      ...plan,
      priceMXNLabel: formatter.mxn.format(plan.priceMXN),
      priceUSDLabel: formatUsd(priceUSD)
    }
  })
  const exchangeNotice = formatExchangeLabel(usdRate, updatedAt)

  return (
    <>
      <FXBackdrop />
      <Navbar />
      <main className="pb-20">
        <section className="py-16">
          <div className={layoutContainerClass}>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-10 shadow-[0_26px_60px_rgba(8,8,18,0.55)] backdrop-blur-xl backdrop-saturate-150">
              <span className={pillClass}>Robux al mejor precio</span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Planes Robux Dedos.xyz</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200/80">
                Selecciona el método que se ajusta a tu forma de jugar. Todos los planes incluyen acompañamiento 1:1 en Discord y
                comprobantes de pago para que tengas total tranquilidad.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className={gradientButtonClass} href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  Entrar a Discord
                </a>
                <a className={subtleButtonClass} href="/discord">
                  ¿Problemas para unirte?
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 pt-0">
          <div className={layoutContainerClass}>
            <div className="grid gap-8 lg:grid-cols-3">
              {plansWithUsd.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
            <div className="mt-8 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200/75">
              <p>{exchangeNotice}</p>
              <p>
                Los precios en dólares se recalculan automáticamente con datos de Open ER API y pueden variar ligeramente al
                momento de pagar.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 pt-0">
          <div className={layoutContainerClass}>
            <div className="mb-8 space-y-3 text-center">
              <span className={pillClass}>¿Por qué Dedos.xyz?</span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Beneficios pensados para tu próxima compra</h2>
              <p className="text-slate-200/80">
                No solo recargamos Robux: te acompañamos con procesos claros, soporte inmediato y transparencia en cada paso.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {VALUE_POINTS.map((value) => (
                <article
                  key={value.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_16px_40px_rgba(8,8,18,0.45)]"
                >
                  <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200">
                    {value.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200/80">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 pt-0">
          <div className={layoutContainerClass}>
            <div className="mb-8 space-y-3 text-center">
              <span className={pillClass}>Proceso guiado</span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Así aseguramos una entrega sin estrés</h2>
              <p className="text-slate-200/80">
                Sigue estos pasos cuando abras tu ticket. Nuestro equipo verifica datos, confirma montos y libera la compra con
                evidencia.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {PURCHASE_STEPS.map((step, index) => (
                <article
                  key={step.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_16px_40px_rgba(8,8,18,0.45)]"
                >
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-bold text-cyan-200">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200/80">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 pt-0">
          <div className={layoutContainerClass}>
            <div className="flex flex-col gap-8 rounded-[26px] border border-white/10 bg-white/5 p-8 shadow-[0_26px_60px_rgba(8,8,18,0.55)] backdrop-blur-xl backdrop-saturate-150 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <span className={pillClass}>¿Cómo comprar?</span>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Abre un ticket en nuestro Discord</h2>
                <p className="max-w-xl text-sm leading-relaxed text-slate-200/80">
                  Ingresa al servidor, selecciona la categoría de Robux y comparte los datos de tu pedido. Nuestro staff confirmará
                  el precio, te indicará los métodos de pago disponibles y te acompañará hasta la entrega.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:min-w-[260px]">
                <a
                  className={gradientButtonClass}
                  href={DISCORD_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Entrar a Discord
                </a>
                <a className={primaryButtonClass} href={ROBLOX_GROUP_URL} rel="noopener noreferrer" target="_blank">
                  Ir al grupo oficial
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
