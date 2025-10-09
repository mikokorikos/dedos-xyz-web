"use client"
import { PropsWithChildren, useMemo } from "react"

export default function GradientText({ children }: PropsWithChildren) {
  const nodes = useMemo(() => {
    const chars = String(children).split("")
    return chars.map((ch, i) => (
      <span
        key={i}
        style={{ animationDelay: `${i * 0.06}s` }}
        className="inline-block animate-floatChar"
      >
        {ch}
      </span>
    ))
  }, [children])

  return (
    <span
      className="inline-block bg-gradient-to-r from-[#a78bfa] via-[#60a5fa] via-50% via-[#67e8f9] to-[#ec4899] bg-[length:300%_100%] bg-clip-text text-transparent animate-lettersShift"
      style={{ WebkitBackgroundClip: "text" }}
      aria-label={String(children)}
    >
      {nodes}
    </span>
  )
}
