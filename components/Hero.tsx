export default function Hero() {
  return (
    <section style={{ padding: "52px 0 56px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "94%" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
            border: "1px solid rgba(148,163,184,.22)",
            backdropFilter: "blur(18px) saturate(140%)",
            borderRadius: 16,
            padding: 26,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 28,
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.12)",
                  border: "1px solid rgba(255,255,255,.16)",
                  fontSize: 13,
                  color: "rgba(255,255,255,.92)",
                }}
              >
                {"\u2728 Dise\u00F1o espectacular + microinteracciones"}
              </span>

              <h1
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
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
                    background:
                      "linear-gradient(90deg,#a78bfa,#60a5fa,#67e8f9,#ec4899,#a78bfa)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    animation: "lettersShift 8s linear infinite",
                  } as any}
                >
                  suscripciones y gaming
                </span>
              </h1>

              <p
                style={{
                  color: "rgba(226,232,240,.75)",
                  fontSize: "clamp(14px, 2.2vw, 18px)",
                  margin: "10px 0 18px",
                }}
              >
                Robux, Discord Nitro, boosts, decoraciones, streaming, VPNs y
                m\u00E1s. Fondo algor\u00EDtmico con geometr\u00EDa sagrada y
                galaxias vivas.
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
                  href="https://discord.gg/dedos"
                  target="_blank"
                  rel="noopener"
                  style={{
                    textDecoration: "none",
                    background: "#fff",
                    color: "#0b1224",
                    fontWeight: 700,
                    padding: ".75rem 1.25rem",
                    borderRadius: 999,
                  }}
                >
                  Ir al servidor
                </a>
                <a
                  href="#catalogo"
                  style={{
                    textDecoration: "none",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,.2)",
                    color: "#fff",
                    padding: ".75rem 1.25rem",
                    borderRadius: 999,
                  }}
                >
                  Ver cat\u00E1logo
                </a>
                <span className="pill">{"\u2714 Garant\u00EDa & soporte"}</span>
                <span className="pill">{"\uD83E\uDD1D Middleman moderno"}</span>
                <span className="pill">{"\u23F1\uFE0F Trades 24/7"}</span>
              </div>
            </div>

            <div>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
                  border: "1px solid rgba(148,163,184,.22)",
                  backdropFilter: "blur(18px) saturate(140%)",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: 12,
                  }}
                >
                  <MiniCard title="Robux" subtitle="Carga segura" />
                  <MiniCard title="Discord Nitro" subtitle="Mensual y anual" />
                  <MiniCard title="Decoraciones" subtitle="Banners, \u00EDconos" />
                  <MiniCard
                    title="Streaming"
                    subtitle="Crunchyroll, Netflix, Disney+"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <article
      style={{
        background:
          "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
        border: "1px solid rgba(148,163,184,.22)",
        borderRadius: 16,
        padding: 12,
      }}
    >
      <h3 style={{ margin: "0 0 4px" }}>{title}</h3>
      <small style={{ color: "rgba(226,232,240,.75)" }}>{subtitle}</small>
    </article>
  );
}
