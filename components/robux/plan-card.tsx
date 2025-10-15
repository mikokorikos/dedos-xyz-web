import { PLAN_ICONS, type PlanIconKey } from "@/components/robux/icons";
import type { ChipTone, PlanHighlight } from "@/components/robux/types";

import { chipToneStyles, cn, gradientButtonClass } from "@/lib/utils";

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

const iconToneStyles: Record<ChipTone, string> = {
  pink: "from-pink-400/25 via-fuchsia-400/20 to-violet-500/25",
  blue: "from-sky-400/25 via-cyan-300/20 to-cyan-500/25",
  green: "from-emerald-400/25 via-teal-300/20 to-teal-500/25",
  gold: "from-amber-400/30 via-orange-300/20 to-rose-500/25",
};

const highlightToneStyles: Record<PlanHighlight["tone"], string> = {
  pink: "shadow-[0_0_28px_rgba(244,114,182,0.45)]",
  blue: "shadow-[0_0_28px_rgba(56,189,248,0.45)]",
  green: "shadow-[0_0_28px_rgba(74,222,128,0.45)]",
  gold: "shadow-[0_0_28px_rgba(251,191,36,0.45)]",
};

const highlightHoverGlow: Record<PlanHighlight["tone"], string> = {
  pink: "border-white/25 hover:shadow-[0_0_40px_rgba(244,114,182,0.35)] transition-shadow duration-500",
  blue: "border-white/25 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] transition-shadow duration-500",
  green: "border-white/25 hover:shadow-[0_0_40px_rgba(74,222,128,0.35)] transition-shadow duration-500",
  gold: "border-white/25 hover:shadow-[0_0_40px_rgba(251,191,36,0.35)] transition-shadow duration-500",
};

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <article
      className={cn(
        "group relative mx-auto flex h-full min-h-[620px] max-w-[420px] flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7 lg:p-8",
        plan.highlight ? highlightHoverGlow[plan.highlight.tone] : ""
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10" />
        <div className="absolute -top-[12vh] right-[4vw] h-[28vh] w-[28vh] rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent blur-[140px]" />
      </div>
      {plan.highlight ? (
        <span
          className={cn(
            "absolute right-7 top-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm",
            chipToneStyles[plan.highlight.tone],
            highlightToneStyles[plan.highlight.tone]
          )}
        >
          {plan.highlight.label}
        </span>
      ) : null}
      <div className="relative flex h-full flex-col">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-6">
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className={cn(
                "grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br text-lg text-white shadow-[0_14px_32px_rgba(8,8,18,0.45)]",
                iconToneStyles[plan.tone]
              )}
            >
              {PLAN_ICONS[plan.icon]}
            </span>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-semibold text-white">{plan.title}</h2>
              <p className="text-base text-slate-200/75">{plan.tagline}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 text-left">
            <span className="text-xs uppercase tracking-[0.16em] text-slate-200/60">Total estimado</span>
            <strong className="text-4xl font-extrabold text-white">{plan.priceMXNLabel}</strong>
            <span className="text-sm text-slate-200/70">{plan.priceUSDLabel}</span>
          </div>
        </header>
        <div
          aria-label={`Detalles del plan ${plan.title}`}
          className="mt-5 flex flex-wrap items-center gap-3"
          role="list"
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-100",
              chipToneStyles[plan.tone]
            )}
            role="listitem"
          >
            {plan.amountLabel}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-6 pt-6">
          <p className="text-base leading-relaxed text-slate-200/85">{plan.description}</p>
          <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-200/70">Entrega</h3>
            <p className="text-base text-slate-200/85">{plan.delivery}</p>
          </section>
          <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-200/70">Requisitos</h3>
            <ul className="grid gap-3 text-base text-slate-200/85">
              {plan.requirements.map((item) => (
                <li className="flex items-start gap-3" key={item}>
                  <span aria-hidden="true" className="mt-1 text-cyan-200">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="m5 12 4 4 10-10"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          {plan.extras ? (
            <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-200/70">Extras</h3>
              <ul className="grid gap-3 text-base text-slate-200/85">
                {plan.extras.map((extra) => (
                  <li className="flex items-start gap-3" key={extra}>
                    <span aria-hidden="true" className="mt-1 text-cyan-200">
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="m5 12 4 4 10-10"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
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
        {plan.cta ? (
          <a
            className={cn(
              gradientButtonClass,
              "mt-auto inline-flex w-full justify-center text-sm shadow-[0_16px_32px_rgba(56,189,248,0.25)] transition hover:shadow-[0_24px_44px_rgba(56,189,248,0.35)]"
            )}
            href={plan.cta.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {plan.cta.label}
          </a>
        ) : null}
      </div>
    </article>
  );
}
