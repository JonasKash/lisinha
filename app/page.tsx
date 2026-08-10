import BuyGate from "./components/BuyGate";
import { DropletIcon } from "./components/Icons";
import { PRODUCT } from "@/lib/products";

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-10 sm:px-8">
      <div className="w-full max-w-[560px]">
        <div className="flex flex-col items-center text-center">
          <DropletIcon className="h-10 w-10 text-[color:var(--brand)]" />
          <h1 className="mt-3 text-2xl font-bold text-[color:var(--text-1)]">{PRODUCT.name}</h1>
          <p className="mt-1 text-sm text-[color:var(--text-2)]">{PRODUCT.tagline}</p>
        </div>

        <p className="mt-8 text-center text-xs font-bold uppercase tracking-wide text-[color:var(--text-3)]">
          Onde você quer comprar?
        </p>

        <div className="mt-4">
          <BuyGate />
        </div>
      </div>
    </main>
  );
}
