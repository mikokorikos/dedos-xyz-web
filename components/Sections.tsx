"use client";

import { useState, type MouseEvent } from "react";

import { openDiscordInvite } from "@/lib/deepLink";

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos";
const DISCORD_URL = `https://discord.gg/${DISCORD_INVITE}`;

function handleDiscordClick(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  openDiscordInvite(DISCORD_INVITE);
}

type ChipTone = "pink" | "blue" | "green" | "gold";

type CatalogItem = {
  title: string;
  subtitle: string;
  image: string;
  chips: { label: string; tone: ChipTone }[];
};

const CATALOG_ITEMS: CatalogItem[] = [
  {
    title: "Robux",
    subtitle: "Carga segura",
    image:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8b?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Gaming", tone: "green" },
      { label: "Best seller", tone: "gold" },
    ],
  },
  {
    title: "Discord Nitro",
    subtitle: "Mensual y anual",
    image:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec4d1ef?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Discord", tone: "blue" },
      { label: "Popular", tone: "pink" },
    ],
  },
  {
    title: "Decoraciones Discord",
    subtitle: "Banners, íconos, packs",
    image:
      "https://images.unsplash.com/photo-1563986768817-257bf91c5753?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "Estilo", tone: "pink" }],
  },
  {
    title: "Spotify",
    subtitle: "Planes individuales",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "Música", tone: "green" }],
  },
  {
    title: "Streaming",
    subtitle: "Crunchyroll, Netflix, Disney+",
    image:
      "https://images.unsplash.com/photo-1598899134739-24b24967b74e?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "HD", tone: "blue" },
      { label: "Oferta", tone: "gold" },
    ],
  },
  {
    title: "VPNs",
    subtitle: "Top providers",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "Privacidad", tone: "green" }],
  },
  {
    title: "Boosts de Servidor",
    subtitle: "Niveles garantizados",
    image:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop",
    chips: [
      { label: "Discord", tone: "blue" },
      { label: "Rápido", tone: "gold" },
    ],
  },
  {
    title: "ChatGPT Premium",
    subtitle: "Planes disponibles",
    image:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop",
    chips: [{ label: "IA", tone: "pink" }],
  },
];

const SERVICES = [
  {
    title: "🤝 Sistema de Middleman moderno",
    copy:
      "Escrow seguro, verificación de ambas partes y liberación de fondos tras confirmación. Logs y auditoría interna.",
  },
  {
    title: "⏱️ Trades 24/7",
    copy:
      "Cobertura continua con rotación de staff y automatizaciones. Soporte express en Discord.",
  },
];

const WHY_POINTS = [
  {
    title: "Pagos 100% seguros",
    copy: "Protección y verificación en cada pedido.",
  },
  {
    title: "Entregas rápidas",
    copy: "Automatizadas o asistidas por nuestro staff.",
  },
  {
    title: "Diseño + experiencia",
    copy: "UI de alto impacto con animaciones y glassmorphism.",
  },
  {
    title: "Soporte dedicado",
    copy: "Estamos en Discord para ayudarte 24/7.",
  },
];

const FAQS = [
  {
    q: "¿Cómo compro?",
    a: "Haz clic en “Entrar a Discord” y abre un ticket. Nuestro bot te guiará paso a paso.",
  },
  {
    q: "¿Es legal?",
    a: "Solo vendemos suscripciones y servicios legítimos conforme a sus términos. Nada robado ni ilícito.",
  },
  {
    q: "¿En cuánto tiempo entregan?",
    a: "La mayoría de pedidos se entregan entre minutos y pocas horas, según el producto y stock.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Consulta en el servidor: aceptamos múltiples opciones según tu país.",
  },
];

export function Catalog() {
  return (
    <section id="catalogo" className="section">
      <div className="container">
        <h2
          style={{
            fontSize: "clamp(26px, 4.5vw, 44px)",
            margin: "0 0 8px",
            fontWeight: 800,
          }}
        >
          Catálogo
        </h2>
        <p className="muted" style={{ margin: "0 0 18px" }}>
          Todo en un mismo lugar. Hover para ver la magia ✨
        </p>
        <div className="grid cols-4">
          {CATALOG_ITEMS.map((item) => (
            <article className="card" key={item.title}>
              <div className="glow" aria-hidden="true" />
              <div className="product">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div style={{ flex: 1 }}>
                  <header
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0 }}>{item.title}</h3>
                      <small className="muted">{item.subtitle}</small>
                    </div>
                    <span aria-hidden="true">★</span>
                  </header>
                  <div className="chips">
                    {item.chips.map((chip) => (
                      <span className={`chip ${chip.tone}`} key={chip.label}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                      fontSize: 14,
                    }}
                  >
                    <span className="muted">Desde</span>
                    <strong>Consultar</strong>
                  </div>
                  <a
                    href={DISCORD_URL}
                    onClick={handleDiscordClick}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 10,
                      color: "#67e8f9",
                      textDecoration: "none",
                    }}
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
  );
}

export function Services() {
  return (
    <section id="servicios" className="section">
      <div className="container">
        <div
          className="glass"
          style={{
            padding: 22,
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {SERVICES.map((service) => (
            <article className="card" key={service.title} style={{ padding: 20 }}>
              <div className="glow" aria-hidden="true" />
              <h3 style={{ margin: "0 0 6px" }}>{service.title}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {service.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section id="por-que" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <h2
            style={{
              fontSize: "clamp(26px, 4.5vw, 44px)",
              margin: "0 0 6px",
              fontWeight: 800,
            }}
          >
            ¿Por qué comprar con{" "}
            <span
              style={{
                background: "var(--grad)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              dedos
            </span>
            ?
          </h2>
          <p className="muted" style={{ margin: 0 }}>
            Velocidad, seguridad y un diseño que enamora.
          </p>
        </div>
        <div className="grid why">
          {WHY_POINTS.map((point) => (
            <article className="card" key={point.title}>
              <div className="glow" aria-hidden="true" />
              <h3 style={{ margin: "0 0 6px" }}>{point.title}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {point.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="section">
      <div className="container">
        <div className="glass cta">
          <div>
            <h3
              style={{
                margin: "0 0 4px",
                fontSize: "clamp(20px, 3.5vw, 28px)",
                fontWeight: 800,
              }}
            >
              ¿Listo para empezar?
            </h3>
            <p className="muted" style={{ margin: 0 }}>
              Entra a nuestro servidor y abre tu primer ticket.
            </p>
          </div>
          <a
            href={DISCORD_URL}
            onClick={handleDiscordClick}
            className="btn btn-gradient"
          >
            Entrar a Discord
          </a>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(26px, 4.5vw, 44px)",
            margin: "0 0 16px",
            fontWeight: 800,
          }}
        >
          Preguntas frecuentes
        </h2>
        <div className="glass">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.q}
                className={`faq-item${isOpen ? " open" : ""}`}
              >
                <button
                  className="faq-q"
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span>{item.q}</span>
                  <svg
                    className="chev"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
                <div className="faq-a">{item.a}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TOSPreview() {
  return (
    <section id="tos" className="section" style={{ paddingTop: 0 }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="glass" style={{ padding: 20 }}>
          <h2 style={{ margin: "0 0 8px" }}>Términos de Servicio (resumen)</h2>
          <p className="muted" style={{ margin: 0 }}>
            Este es un placeholder. Pásame tus TOS y los pego aquí. Ejemplos:
            políticas de reembolso, tiempos de entrega, garantías, restricciones
            de uso, contacto de soporte.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Sections() {
  return null;
}
