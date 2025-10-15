"use client"

import { useEffect, useState } from "react"

import FXBackdrop from "@/components/fx/FXBackdrop"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { openDiscordInvite } from "@/lib/deepLink"
import { gradientButtonClass, layoutContainerClass } from "@/lib/utils"

const INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || "dedos"
const WEB_URL = `https://discord.gg/${INVITE}`
const FALLBACK_MS = 2400

export default function DiscordRedirect() {
  const [second, setSecond] = useState(() => Math.ceil(FALLBACK_MS / 1000))

  useEffect(() => {
    openDiscordInvite(INVITE, FALLBACK_MS)

    const t = window.setInterval(() => {
      setSecond((s) => (s > 0 ? s - 1 : 0))
    }, 1000)

    return () => {
      window.clearInterval(t)
    }
  }, [])

  return (
    <>
      <FXBackdrop />
      <Navbar />
      <main className="flex min-h-[70vh] items-center py-20">
        <div className={layoutContainerClass}>
          <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150 md:p-10">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Abriendo Discord…</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-200/80 sm:text-lg">
              Si no se abre automáticamente, te redirigiremos al navegador en {second}s.
            </p>
            <div className="mt-6 flex justify-center">
              <a className={gradientButtonClass} href={WEB_URL}>
                Abrir en el navegador
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
