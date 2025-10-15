"use client"

import { useEffect, useState } from "react"

import FXBackdrop from "@/components/fx/FXBackdrop"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { openRobloxDestination } from "@/lib/deepLink"
import { gradientButtonClass, layoutContainerClass } from "@/lib/utils"

const ROBLOX_URL =
  process.env.NEXT_PUBLIC_ROBLOX_GROUP ||
  "https://www.roblox.com/es/communities/12082479/unnamed#!/about"
const FALLBACK_MS = 2600

export default function RobloxRedirect() {
  const [second, setSecond] = useState(() => Math.ceil(FALLBACK_MS / 1000))

  useEffect(() => {
    openRobloxDestination(ROBLOX_URL, FALLBACK_MS)

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
          <div className="mx-auto max-w-xl rounded-[26px] border border-white/10 bg-white/5 p-6 text-center shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150 md:p-7 lg:p-8">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Abriendo Roblox…</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-200/80">
              Si no se abre la app, te llevamos al navegador en {second}s.
            </p>
            <div className="mt-6 flex justify-center">
              <a className={gradientButtonClass} href={ROBLOX_URL} rel="noopener" target="_blank">
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
