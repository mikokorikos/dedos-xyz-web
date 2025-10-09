export function Catalog() {
  return (
    <section id="catalogo" style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "94%" }}>
        <h2
          style={{
            fontSize: "clamp(26px, 4.5vw, 44px)",
            margin: "0 0 8px",
            fontWeight: 800,
          }}
        >
          Cat\u00E1logo
        </h2>
        <p style={{ color: "rgba(226,232,240,.75)", margin: "0 0 18px" }}>
          Todo en un mismo lugar. Hover para ver la magia \u2728
        </p>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(4, minmax(0,1fr))",
          }}
        >
          {[
            "Robux",
            "Discord Nitro",
            "Decoraciones",
            "Spotify",
            "Streaming",
            "VPNs",
            "Boosts de Servidor",
            "ChatGPT Premium",
          ].map((n) => (
            <Card key={n} title={n} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicios" style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "94%" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
            border: "1px solid rgba(148,163,184,.22)",
            backdropFilter: "blur(18px) saturate(140%)",
            borderRadius: 16,
            padding: 22,
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(2,1fr)",
          }}
        >
          <article style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 6px" }}>
              {"\uD83E\uDD1D Sistema de Middleman moderno"}
            </h3>
            <p style={{ margin: 0, color: "rgba(226,232,240,.75)" }}>
              Escrow seguro, verificaci\u00F3n de ambas partes y liberaci\u00F3n
              de fondos tras confirmaci\u00F3n.
            </p>
          </article>
          <article style={{ padding: 20 }}>
            <h3 style={{ margin: "0 0 6px" }}>{"\u23F1\uFE0F Trades 24/7"}</h3>
            <p style={{ margin: 0, color: "rgba(226,232,240,.75)" }}>
              Cobertura continua con rotaci\u00F3n de staff y
              automatizaciones.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section id="por-que" style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "94%" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <h2
            style={{
              fontSize: "clamp(26px, 4.5vw, 44px)",
              margin: "0 0 6px",
              fontWeight: 800,
            }}
          >
            \u00BFPor qu\u00E9 comprar con{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              dedos
            </span>
            ?
          </h2>
          <p style={{ color: "rgba(226,232,240,.75)", margin: 0 }}>
            Velocidad, seguridad y un dise\u00F1o que enamora.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(4,1fr)",
          }}
        >
          {[
            "Pagos 100% seguros",
            "Entregas r\u00E1pidas",
            "Dise\u00F1o + experiencia",
            "Soporte dedicado",
          ].map((n) => (
            <Card key={n} title={n} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "94%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
            background:
              "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
            border: "1px solid rgba(148,163,184,.22)",
            borderRadius: 16,
            padding: 22,
          }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 4px",
                fontSize: "clamp(20px, 3.5vw, 28px)",
                fontWeight: 800,
              }}
            >
              \u00BFListo para empezar?
            </h3>
            <p style={{ margin: 0, color: "rgba(226,232,240,.75)" }}>
              Entra a nuestro servidor y abre tu primer ticket.
            </p>
          </div>
          <a
            href="/discord"
            style={{
              textDecoration: "none",
              background:
                "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)",
              color: "#fff",
              fontWeight: 700,
              padding: ".75rem 1.25rem",
              borderRadius: 999,
              boxShadow: "0 8px 30px rgba(139,92,246,.25)",
            }}
          >
            Entrar a Discord
          </a>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" style={{ padding: "64px 0" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", width: "94%" }}>
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
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
            border: "1px solid rgba(148,163,184,.22)",
            borderRadius: 16,
            padding: 16,
          }}
        >
          {[
            [
              "\u00BFC\u00F3mo compro?",
              "Haz clic en \"Entrar a Discord\" y abre un ticket. Nuestro bot te gu\u00EDa.",
            ],
            [
              "\u00BFEs legal?",
              "Vendemos servicios y suscripciones leg\u00EDtimas conforme a sus t\u00E9rminos.",
            ],
            [
              "\u00BFTiempo de entrega?",
              "Entre minutos y pocas horas, seg\u00FAn producto y stock.",
            ],
            [
              "\u00BFM\u00E9todos de pago?",
              "Consulta en el servidor; var\u00EDa por pa\u00EDs.",
            ],
          ].map(([q, a]) => (
            <details
              key={q}
              style={{
                borderBottom: "1px solid rgba(255,255,255,.12)",
                padding: "10px 0",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                {q}
              </summary>
              <p style={{ color: "rgba(226,232,240,.75)", marginTop: 6 }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TOSPreview() {
  return (
    <section style={{ padding: "48px 0 64px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", width: "94%" }}>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
            border: "1px solid rgba(148,163,184,.22)",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h2 style={{ margin: "0 0 8px" }}>
            T\u00E9rminos de Servicio (resumen)
          </h2>
          <p style={{ color: "rgba(226,232,240,.75)", margin: 0 }}>
            Placeholder. P\u00E1same tus TOS y los pegamos aqu\u00ED
            (reembolsos, garant\u00EDas, tiempos, etc.).
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({ title, compact }: { title: string; compact?: boolean }) {
  return (
    <article
      style={{
        background:
          "linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45))",
        border: "1px solid rgba(148,163,184,.22)",
        borderRadius: 16,
        padding: 14,
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      {!compact && (
        <p style={{ color: "rgba(226,232,240,.75)", margin: "6px 0 0" }}>
          Consultar
        </p>
      )}
    </article>
  );
}

export default function Sections() {
  return null;
}
