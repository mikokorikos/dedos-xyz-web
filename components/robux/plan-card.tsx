import { PLAN_ICONS, type PlanIconKey } from "@/components/robux/icons";
import type { ChipTone, PlanHighlight } from "@/components/robux/types";

type PlanCardProps = {
  plan: {
    id: string;
    title: string;
    tagline: string;
    tone: ChipTone;
    priceMXNLabel: string;
    priceUSDLabel: string;
    icon: PlanIconKey;
    highlight?: PlanHighlight;
    description: string;
    requirements: string[];
    delivery: string;
    extras?: string[];
    cta?: { label: string; href: string };
    amountLabel: string;
  };
};

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <article className={`card plan-card${plan.highlight ? " plan-card-featured" : ""}`}>
      <div className="glow" aria-hidden="true" />
      <header className="plan-header">
        <div className="plan-identity">
          <span className={`plan-icon ${plan.tone}`} aria-hidden="true">
            {PLAN_ICONS[plan.icon]}
          </span>
          <div className="plan-title">
            <h2>{plan.title}</h2>
            <p className="plan-tagline muted">{plan.tagline}</p>
          </div>
        </div>
        <div className="plan-price">
          <span className="plan-price-caption">Total estimado</span>
          <strong>{plan.priceMXNLabel}</strong>
          <span className="muted">{plan.priceUSDLabel}</span>
        </div>
      </header>
      <div className="plan-chips" role="list" aria-label={`Detalles del plan ${plan.title}`}>
        <span className={`chip ${plan.tone}`} role="listitem">
          {plan.amountLabel}
        </span>
        {plan.highlight ? (
          <span className={`chip plan-highlight ${plan.highlight.tone}`} role="listitem">
            {plan.highlight.label}
          </span>
        ) : null}
      </div>
      <div className="plan-body">
        <div className="plan-main">
          <p className="plan-description">{plan.description}</p>
          <section className="plan-section">
            <h3>Entrega</h3>
            <p className="muted">{plan.delivery}</p>
          </section>
          {plan.cta ? (
            <a
              className="btn btn-gradient plan-cta"
              href={plan.cta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {plan.cta.label}
            </a>
          ) : null}
        </div>
        <div className="plan-info">
          <section className="plan-section">
            <h3>Requisitos</h3>
            <ul className="plan-list">
              {plan.requirements.map((item) => (
                <li key={item}>
                  <span className="list-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="m5 12 4 4 10-10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          {plan.extras ? (
            <section className="plan-section">
              <h3>Extras</h3>
              <ul className="plan-list">
                {plan.extras.map((extra) => (
                  <li key={extra}>
                    <span className="list-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="m5 12 4 4 10-10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{extra}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
