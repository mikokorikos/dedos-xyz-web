import FXBackdrop from "@/components/fx/FXBackdrop";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {
  Catalog,
  Services,
  Why,
  CTA,
  FAQ,
  TOSPreview,
} from "@/components/Sections";

export default function HomePage() {
  return (
    <>
      <FXBackdrop />
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <Services />
        <Why />
        <CTA />
        <FAQ />
        <TOSPreview />
      </main>
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,.12)",
          padding: "28px 0",
          color: "rgba(226,232,240,.75)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            width: "94%",
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            {"\u00A9"} {new Date().getFullYear()} dedos store. Todos los
            derechos reservados.
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="/tos">T\u00E9rminos</a>
            <a href="https://discord.gg/dedos" target="_blank" rel="noopener">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
