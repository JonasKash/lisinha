import Link from "next/link";
import { PRICE_UNIT } from "@/lib/products";
import { CheckIcon } from "./Icons";

function formatBRL(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

export default function LojaBuyBox() {
  return (
    <div id="comprar" className="scroll-mt-20 rounded-[var(--radius-md)] border-2 border-[color:var(--brand)] bg-[color:var(--brand-muted)] p-5">
      <p className="text-2xl font-semibold tabular-nums text-[color:var(--text-1)]">R$ {formatBRL(PRICE_UNIT)}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[color:var(--success)]">
        <CheckIcon className="h-3.5 w-3.5" />
        Frete grátis
      </p>
      <Link
        href="/pedido"
        className="mt-4 block rounded-[var(--radius-pill)] bg-[color:var(--brand)] py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[color:var(--brand-hover)]"
      >
        Comprar agora — Pix
      </Link>
      <p className="mt-2 text-center text-xs text-[color:var(--text-3)]">
        Pagamento via Pix, confirmação do pedido pelo WhatsApp.
      </p>
    </div>
  );
}
