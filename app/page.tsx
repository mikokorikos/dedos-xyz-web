import FXBackdrop from "@/components/fx/FXBackdrop";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
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
      <Footer />
    </>
  );
}
