import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Dedos Store — Hub Premium de Suscripciones & Gaming",
  description:
    "Robux, Discord Nitro, streaming y más. Diseño futurista con geometría sagrada y efectos visuales."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-[#080812] text-white antialiased")}>
        {children}
      </body>
    </html>
  )
}
