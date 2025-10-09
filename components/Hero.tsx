'use client'

import { openDiscordInvite } from "@/lib/deepLink"

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos"

const HERO_STATS = [
  { value: "+55K", label: "Pedidos" },
  { value: "Minutos", label: "Entrega media" },
  { value: "4.9/5", label: "Satisfacción" },
];

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
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="glass" style={{ padding: 26 }}>
          <div className="hero-grid">
            <div>
              <span className="pill">✨ Diseño espectacular + microinteracciones</span>
              <h1
                style={{
                  fontSize: "clamp(32px, 6vw, 56px)",
                  lineHeight: 1.05,
                  margin: "12px 0 6px",
                  fontWeight: 800,
                  letterSpacing: "-.02em",
                }}
              >
                Tu hub de{" "}
                <span
                  style={{
                    background: "var(--grad)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  suscripciones y gaming
                </span>
              </h1>
              <p
                className="muted"
                style={{ fontSize: "clamp(14px, 2.2vw, 18px)", margin: "10px 0 18px" }}
              >
                Robux, Discord Nitro, boosts, decoraciones, streaming, VPNs y más. Una página
                principal enfocada en animaciones, degradados y confianza instantánea.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <a
                  className="btn btn-primary"
                  href={`https://discord.gg/${DISCORD_INVITE}`}
                  onClick={(event) => {
                    event.preventDefault()
                    openDiscordInvite(DISCORD_INVITE)
                  }}
                >
                  Ir al servidor
                </a>
                <a
                  className="btn"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,.2)",
                    color: "#fff",
                  }}
                  href="#catalogo"
                >
                  Ver catálogo
                </a>
                <span className="pill">✔ Garantía & soporte</span>
                <span className="pill">🤝 Middleman moderno</span>
                <span className="pill">⏱️ Trades 24/7</span>
              </div>
              <div className="stats">
                {HERO_STATS.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <div style={{ fontWeight: 800, fontSize: 22 }}>{stat.value}</div>
                    <div className="muted" style={{ fontSize: 12 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="glass" style={{ padding: 16, position: "relative" }}>
                <div className="glow" />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: 12,
                  }}
                >
                  {FEATURED.map((item) => (
                    <article className="card" key={item.title}>
                      <div className="glow" aria-hidden="true" />
                      <div className="product">
                        <img src={item.img} alt={item.title} loading="lazy" />
                        <div>
                          <h3 style={{ margin: "0 0 4px" }}>{item.title}</h3>
                          <div className="muted" style={{ fontSize: 13 }}>
                            {item.subtitle}
                          </div>
                          <div className="chips">
                            {item.chips.map((chip) => (
                              <span className={`chip ${chip.tone}`} key={chip.label}>
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
  );
}
