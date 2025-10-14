import FXBackdrop from "@/components/fx/FXBackdrop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/robux/plan-card";
import type { ChipTone, PlanHighlight } from "@/components/robux/types";
import type { PlanIconKey } from "@/components/robux/icons";

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos";
const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`;
const ROBLOX_GROUP_URL =
  process.env.NEXT_PUBLIC_ROBLOX_GROUP ||
  "https://www.roblox.com/es/communities/12082479/unnamed#!/about";

const MXN_TO_USD_ENDPOINT = "https://open.er-api.com/v6/latest/MXN";
const EXCHANGE_REVALIDATE_SECONDS = 900;

const formatter = {
  mxn: new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }),
  usd: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
};

type Plan = {
  id: string;
  title: string;
  tagline: string;
  tone: ChipTone;
  priceMXN: number;
  icon: PlanIconKey;
  highlight?: PlanHighlight;
  description: string;
  requirements: string[];
  delivery: string;
  extras?: string[];
  cta?: { label: string; href: string };
};

type PlanCardData = Plan & {
  priceMXNLabel: string;
  priceUSDLabel: string;
};

const PLANS: Plan[] = [
  {
    id: "group",
    title: "Recarga por grupo oficial",
    tagline: "Ideal para compras recurrentes",
    tone: "pink",
    priceMXN: 125,
    icon: "group",
    highlight: { label: "Recomendado", tone: "gold" },
    description:
      "Compra tus Robux directamente desde nuestro grupo de Roblox. Perfecto si planeas recargar con frecuencia y quieres la comisión más baja.",
    requirements: [
      "Unirte al grupo oficial de Dedos.xyz en Roblox.",
      "Esperar 14 días después de haber ingresado al grupo (requisito de Roblox).",
    ],
    delivery:
      "Después de cada compra liberamos el pago y recibes los Robux en cuanto Roblox procesa la venta (generalmente al instante tras el periodo de espera inicial).",
    extras: ["Seguimiento en vivo dentro del ticket de Discord.", "Comisiones mínimas."],
    cta: { label: "Ir al grupo de Roblox", href: ROBLOX_GROUP_URL },
  },
  {
    id: "gift",
    title: "Regalo por juego",
    tagline: "Selecciona tu juego favorito",
    tone: "blue",
    priceMXN: 126,
    icon: "gift",
    highlight: { label: "Alternativa popular", tone: "green" },
    description:
      "Compramos el gamepass o artículo que elijas dentro del juego para que recibas el valor en Robux al momento. Ideal si quieres un ítem específico o no quieres esperar los 14 días del grupo.",
    requirements: [
      "Contar con un juego o experiencia donde se puedan regalar artículos o gamepasses.",
      "Enviar el enlace directo al producto dentro del ticket de Discord.",
    ],
    delivery:
      "Te regalamos el artículo seleccionado al instante y Roblox acredita los Robux inmediatamente.",
    extras: ["No requiere antigüedad en grupos.", "Funciona con títulos populares como Blox Fruits, Pet Simulator, Adopt Me!"],
  },
  {
    id: "pass",
    title: "Compra directa de gamepass",
    tagline: "Opción clásica",
    tone: "gold",
    priceMXN: 136.99,
    icon: "pass",
    description:
      "Publica un gamepass con el monto que necesites y nosotros lo adquirimos. Es la vía tradicional, útil si ya tienes gamepasses configurados sin precios regionales.",
    requirements: [
      "Gamepasses publicados por 500, 100 o 29 Robux (sin precios regionales).",
      "Compartir el enlace al gamepass en el ticket.",
    ],
    delivery:
      "La compra se registra enseguida, pero Roblox libera los fondos en un plazo de 5 a 10 días hábiles.",
    extras: ["Excelente para creadores con catálogo propio.", "Ideal cuando necesitas montos específicos."],
  },
];

type ExchangeResponse = {
  rates?: { USD?: number };
  time_last_update_utc?: string;
};

type ExchangeInfo = {
  rate: number | null;
  updatedAt: string | null;
};

async function getUsdRate(): Promise<ExchangeInfo> {
  try {
    const response = await fetch(MXN_TO_USD_ENDPOINT, {
      next: { revalidate: EXCHANGE_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return { rate: null, updatedAt: null };
    }

    const data = (await response.json()) as ExchangeResponse;
    const usd = data.rates?.USD;
    const updatedAt = data.time_last_update_utc ?? null;

    return {
      rate: typeof usd === "number" ? usd : null,
      updatedAt,
    };
  } catch (error) {
    console.error("Failed to fetch MXN → USD rate", error);
    return { rate: null, updatedAt: null };
  }
}

function formatUsd(amount: number | null) {
  if (amount === null) {
    return "Consulta en Discord";
  }

  return `≈ ${formatter.usd.format(amount)}`;
}

function formatExchangeLabel(rate: number | null, updatedAt: string | null) {
  if (!rate) {
    return "Tipo de cambio no disponible. Nuestro equipo te confirmará el monto final en el ticket.";
  }

  const date = updatedAt ? new Date(updatedAt) : null;
  const formattedDate = date
    ? new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      }).format(date)
    : null;

  return `Tipo de cambio: 1 MXN = ${rate.toFixed(4)} USD${
    formattedDate ? ` · Actualizado ${formattedDate} (UTC)` : ""
  }`;
}

export default async function RobuxPlansPage() {
  const { rate: usdRate, updatedAt } = await getUsdRate();
  const plansWithUsd: PlanCardData[] = PLANS.map((plan) => {
    const priceUSD = usdRate ? plan.priceMXN * usdRate : null;

    return {
      ...plan,
      priceMXNLabel: formatter.mxn.format(plan.priceMXN),
      priceUSDLabel: formatUsd(priceUSD),
    };
  });
  const exchangeNotice = formatExchangeLabel(usdRate, updatedAt);

  return (
    <>
      <FXBackdrop />
      <Navbar />
      <main>
        <section className="section">
          <div className="container">
            <div className="hero-card glass">
              <div className="glow" aria-hidden="true" />
              <span className="pill">Robux al mejor precio</span>
              <h1 className="page-title">Planes Robux Dedos.xyz</h1>
              <p className="muted" style={{ maxWidth: 560 }}>
                Selecciona el método que se ajusta a tu forma de jugar. Todos los planes incluyen
                acompañamiento 1:1 en Discord y comprobantes de pago para que tengas total
                tranquilidad.
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="plan-grid">
              {plansWithUsd.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
            <div className="exchange-note">
              <p className="muted">{exchangeNotice}</p>
              <p className="muted">
                Los precios en dólares se recalculan automáticamente con datos de Open ER API y
                pueden variar ligeramente al momento de pagar.
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="cta-card glass">
              <div className="glow" aria-hidden="true" />
              <div>
                <span className="pill">¿Cómo comprar?</span>
                <h2>Abre un ticket en nuestro Discord</h2>
                <p className="muted">
                  Ingresa al servidor, selecciona la categoría de Robux y comparte los datos de tu
                  pedido. Nuestro staff confirmará el precio, te indicará los métodos de pago
                  disponibles y te acompañará hasta la entrega.
                </p>
              </div>
              <div className="cta-actions">
                <a
                  className="btn btn-gradient"
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Entrar a Discord
                </a>
                <a className="btn btn-primary" href="/discord">
                  ¿Problemas para unirte?
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
