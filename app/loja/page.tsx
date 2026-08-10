import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import ProductGallery from "../components/ProductGallery";
import LojaBuyBox from "../components/LojaBuyBox";
import HowToUse from "../components/HowToUse";
import TrustBadges from "../components/TrustBadges";
import { CheckIcon } from "../components/Icons";
import { PRODUCT } from "@/lib/products";

export const metadata: Metadata = {
  title: "Lisinha — Loja Direta",
};

export default function LojaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[900px] px-5 py-10 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2">
          <ProductGallery />

          <div>
            <h1 className="text-[1.75rem] font-semibold leading-tight text-[color:var(--text-1)] sm:text-[2rem]">
              {PRODUCT.fullName}
            </h1>
            <p className="mt-2 text-[color:var(--text-2)]">{PRODUCT.tagline}</p>
            <p className="mt-1 text-sm font-medium text-[color:var(--brand)]">
              Pele mais confortável depois da depilação, do jeito que deveria ser.
            </p>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-[color:var(--text-2)]">{PRODUCT.description}</p>

            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--text-3)]">Indicado para</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {PRODUCT.indicado.map((item) => (
                  <li key={item} className="rounded-[var(--radius-pill)] bg-[color:var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[color:var(--text-1)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--text-3)]">O que você pode esperar</h2>
              <ul className="mt-3 space-y-2">
                {PRODUCT.esperar.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[color:var(--text-2)]">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--success)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <LojaBuyBox />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <TrustBadges />
        </div>

        <div className="mt-14">
          <HowToUse />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
