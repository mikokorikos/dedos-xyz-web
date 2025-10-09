import Footer from "@/components/Footer";
import FXBackdrop from "@/components/fx/FXBackdrop";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Términos de Servicio — Dedos Store" };

export default function TOSPage() {
  return (
    <>
      <FXBackdrop />
      <Navbar />
      <main className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="glass" style={{ padding: 24 }}>
            <h1 style={{ marginTop: 0, fontSize: "clamp(28px, 4vw, 42px)" }}>
              Términos de Servicio
            </h1>
            <p className="muted" style={{ marginTop: 12 }}>
              Pasa tu texto legal y lo pegamos aquí (reembolsos, garantías, tiempos,
              restricciones, contacto, etc.).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
