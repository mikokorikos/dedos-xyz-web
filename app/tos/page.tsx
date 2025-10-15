import Footer from "@/components/Footer"
import FXBackdrop from "@/components/fx/FXBackdrop"
import Navbar from "@/components/Navbar"
import { layoutContainerClass } from "@/lib/utils"

export const metadata = { title: "Términos de Servicio — Dedos Store" }

export default function TOSPage() {
  return (
    <>
      <FXBackdrop />
      <Navbar />
      <main className="py-16">
        <div className={layoutContainerClass}>
          <div className="mx-auto max-w-3xl rounded-[26px] border border-white/10 bg-white/5 p-8 shadow-[0_24px_60px_rgba(8,8,18,0.55)] backdrop-blur-xl backdrop-saturate-150">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Términos de Servicio</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-200/80">
              Pasa tu texto legal y lo pegamos aquí (reembolsos, garantías, tiempos, restricciones, contacto, etc.).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
