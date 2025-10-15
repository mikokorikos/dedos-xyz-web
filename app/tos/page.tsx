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
      <main className="py-20">
        <div className={layoutContainerClass}>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150 md:p-10">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Términos de Servicio</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-200/80 sm:text-lg">
              Pasa tu texto legal y lo pegamos aquí (reembolsos, garantías, tiempos, restricciones, contacto, etc.).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
