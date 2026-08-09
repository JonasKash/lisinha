import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lisinha — Sérum Pós-Depilatório com Telocapil",
  description:
    "Sérum de uso diário para cuidar da pele após a depilação. Com Telocapil 1%, D-Pantenol, Camomila e Vitamina E.",
  openGraph: {
    title: "Lisinha — Sérum Pós-Depilatório",
    description:
      "Pele mais confortável depois da depilação. Sérum com Telocapil, D-Pantenol, Camomila e Vitamina E.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
