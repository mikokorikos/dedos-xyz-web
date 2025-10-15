"use client";

import { useEffect, useRef, type PointerEvent } from "react";
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

function clampTilt(value: number) {
  return Math.max(Math.min(value, 10), -10);
}

export default function PlanCard({ plan }: PlanCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number>();
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const updatePreference = () => {
        prefersReducedMotion.current = mediaQuery.matches;
      };

      updatePreference();
      mediaQuery.addEventListener("change", updatePreference);

      return () => {
        mediaQuery.removeEventListener("change", updatePreference);
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const setCardStyles = (props: {
    tiltX?: number;
    tiltY?: number;
    mouseX?: number;
    mouseY?: number;
    hovered?: boolean;
  }) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    if (typeof props.hovered === "boolean") {
      card.classList.toggle("is-hovered", props.hovered);
    }

    if (typeof props.tiltX === "number") {
      card.style.setProperty("--tiltX", `${props.tiltX.toFixed(2)}deg`);
    }

    if (typeof props.tiltY === "number") {
      card.style.setProperty("--tiltY", `${props.tiltY.toFixed(2)}deg`);
    }

    if (typeof props.mouseX === "number") {
      card.style.setProperty("--mouse-x", `${props.mouseX.toFixed(2)}%`);
    }

    if (typeof props.mouseY === "number") {
      card.style.setProperty("--mouse-y", `${props.mouseY.toFixed(2)}%`);
    }
  };

  const resetCard = () => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    card.style.removeProperty("--tiltX");
    card.style.removeProperty("--tiltY");
    card.style.removeProperty("--mouse-x");
    card.style.removeProperty("--mouse-y");
    card.classList.remove("is-hovered");
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || prefersReducedMotion.current) {
      return;
    }

    const card = cardRef.current;
    if (!card) {
      return;
    }

    const run = () => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = clampTilt(((y - rect.height / 2) / rect.height) * -18);
      const rotateY = clampTilt(((x - rect.width / 2) / rect.width) * 18);
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      setCardStyles({
        tiltX: rotateX,
        tiltY: rotateY,
        mouseX: percentX,
        mouseY: percentY,
        hovered: true,
      });
    };

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(run);
  };

  const handlePointerLeave = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }

    resetCard();
  };

  return (
    <article
      ref={cardRef}
      className={`card plan-card ${plan.highlight ? "plan-card-featured" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
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
        <div className="plan-meta">
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
          <div className="plan-price">
            <span className="plan-price-caption">Total estimado</span>
            <strong>{plan.priceMXNLabel}</strong>
            <span className="muted">{plan.priceUSDLabel}</span>
          </div>
        </div>
      </header>

      <div className="plan-body">
        <div className="plan-main">
          <p>{plan.description}</p>
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
