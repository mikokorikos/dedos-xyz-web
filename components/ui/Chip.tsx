import { PropsWithChildren } from "react"

export default function Chip({ children, color="default" as any }: PropsWithChildren & { color?: "pink" | "blue" | "green" | "gold" | "default" }) {
  const map: Record<string, string> = {
    pink: "bg-gradient-to-br from-pink-300/30 to-purple-400/30 border border-white/20",
    blue: "bg-gradient-to-br from-blue-300/30 to-cyan-300/30 border border-white/20",
    green:"bg-gradient-to-br from-emerald-400/25 to-teal-600/25 border border-white/20",
    gold: "bg-gradient-to-br from-yellow-400/30 to-rose-500/25 border border-white/20",
    default: "bg-white/10 border border-white/20"
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[color]}`}>{children}</span>
  )
}
