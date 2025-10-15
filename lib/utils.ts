export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export const layoutContainerClass =
  "mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8 xl:max-w-[1480px]";

export const glassPanelClass =
  "relative overflow-hidden rounded-[18px] border border-white/15 bg-white/5 p-6 shadow-[0_18px_40px_rgba(8,8,18,0.45)] backdrop-blur-xl backdrop-saturate-150";

export const buttonBaseClass =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";

export const primaryButtonClass = cn(
  buttonBaseClass,
  "bg-white text-slate-900"
);

export const gradientButtonClass = cn(
  buttonBaseClass,
  "bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 text-slate-900"
);

export const subtleButtonClass = cn(
  buttonBaseClass,
  "border border-white/20 bg-transparent"
);

export const chipToneStyles = {
  pink: "bg-gradient-to-r from-pink-400/25 to-violet-500/25",
  blue: "bg-gradient-to-r from-sky-400/25 to-cyan-400/25",
  green: "bg-gradient-to-r from-emerald-400/25 to-teal-500/25",
  gold: "bg-gradient-to-r from-amber-400/30 to-rose-500/20",
} as const;
