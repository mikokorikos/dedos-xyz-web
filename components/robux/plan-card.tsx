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
  pink: "bg-gradient-to-br from-pink-400/20 to-violet-500/20",
  blue: "bg-gradient-to-br from-sky-400/20 to-cyan-400/20",
  green: "bg-gradient-to-br from-emerald-400/20 to-teal-500/20",
  gold: "bg-gradient-to-br from-amber-400/25 to-rose-500/20"
};

const highlightToneStyles: Record<PlanHighlight["tone"], string> = {
  pink: "ring-2 ring-pink-300/40",
  blue: "ring-2 ring-cyan-300/40",
  green: "ring-2 ring-emerald-300/40",
  gold: "ring-2 ring-amber-300/40"
};

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(8,8,18,0.45)] backdrop-blur-xl backdrop-saturate-150 transition hover:-translate-y-1",
        plan.highlight ? "border-cyan-200/40 shadow-[0_28px_60px_rgba(8,8,18,0.6)]" : ""
      )}
    >
      <header className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl border border-white/10 text-lg text-white",
              iconToneStyles[plan.tone]
            )}
          >
            {PLAN_ICONS[plan.icon]}
          </span>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-white">{plan.title}</h2>
            <p className="text-sm text-slate-200/75">{plan.tagline}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 text-left lg:items-end">
          <span className="text-xs uppercase tracking-[0.12em] text-slate-200/60">Total estimado</span>
          <strong className="text-3xl font-extrabold text-white">{plan.priceMXNLabel}</strong>
          <span className="text-sm text-slate-200/70">{plan.priceUSDLabel}</span>
        </div>
      </header>
      <div className="mt-5 flex flex-wrap items-center gap-3" role="list" aria-label={`Detalles del plan ${plan.title}`}>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100",
            chipToneStyles[plan.tone]
          )}
          role="listitem"
        >
          {plan.amountLabel}
        </span>
        {plan.highlight ? (
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100",
              chipToneStyles[plan.highlight.tone],
              highlightToneStyles[plan.highlight.tone]
            )}
            role="listitem"
          >
            {plan.highlight.label}
          </span>
        ) : null}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-slate-200/85">{plan.description}</p>
          <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200/70">Entrega</h3>
            <p className="text-sm text-slate-200/85">{plan.delivery}</p>
          </section>
          {plan.cta ? (
            <a
              className={cn(gradientButtonClass, "inline-flex w-full justify-center text-sm")}
              href={plan.cta.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {plan.cta.label}
            </a>
          ) : null}
        </div>
        <div className="space-y-5">
          <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200/70">Requisitos</h3>
            <ul className="grid gap-3 text-sm text-slate-200/85">
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
            <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-200/70">Extras</h3>
              <ul className="grid gap-3 text-sm text-slate-200/85">
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
      </div>
    </article>
  );
}
