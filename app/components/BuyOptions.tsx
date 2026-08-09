import Link from "next/link";
import { PRICE_UNIT, SHOPEE_PRICE, SHOPEE_URL } from "@/lib/products";
import { CheckIcon, ExternalLinkIcon } from "./Icons";

function formatBRL(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

export default function BuyOptions() {
  return (
    <div id="comprar" className="scroll-mt-20">
      <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--text-3)]">
        Você será redirecionada para
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <a
          href={SHOPEE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col rounded-[var(--radius-md)] border border-[color:var(--border-strong)] p-5 transition-colors hover:border-[color:var(--brand)]"
        >
          <span className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[color:var(--text-1)]">Shopee</span>
            <ExternalLinkIcon className="h-4 w-4 text-[color:var(--text-3)]" />
          </span>
          <span className="mt-2 text-2xl font-semibold tabular-nums text-[color:var(--text-1)]">
            R$ {formatBRL(SHOPEE_PRICE)}
          </span>
          <span className="mt-1 text-xs text-[color:var(--text-3)]">Compra pelo app/site da Shopee</span>
          <span className="mt-4 block rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] py-2.5 text-center text-xs font-bold uppercase tracking-wide text-[color:var(--text-1)]">
            Comprar na Shopee
          </span>
        </a>

        <Link
          href="/pedido"
          className="flex flex-col rounded-[var(--radius-md)] border-2 border-[color:var(--brand)] bg-[color:var(--brand-muted)] p-5"
        >
          <span className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[color:var(--text-1)]">Loja Direta</span>
            <span className="rounded-[var(--radius-pill)] bg-[color:var(--brand)] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white">
              Melhor preço
            </span>
          </span>
          <span className="mt-2 text-2xl font-semibold tabular-nums text-[color:var(--text-1)]">
            R$ {formatBRL(PRICE_UNIT)}
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[color:var(--success)]">
            <CheckIcon className="h-3.5 w-3.5" />
            Frete grátis
          </span>
          <span className="mt-4 block rounded-[var(--radius-pill)] bg-[color:var(--brand)] py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[color:var(--brand-hover)]">
            Comprar direto — Pix
          </span>
        </Link>
      </div>

      <p className="mt-3 text-xs text-[color:var(--text-3)]">
        Comprando direto, o pagamento é via Pix e a confirmação do pedido é feita pelo WhatsApp.
      </p>
    </div>
  );
}
