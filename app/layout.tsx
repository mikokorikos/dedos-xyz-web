import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dedos Store — Hub Premium de Suscripciones & Gaming",
  description:
    "Robux, Discord Nitro, streaming y más. Diseño futurista con geometría sagrada y efectos visuales."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
