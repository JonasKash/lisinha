import { PRODUCT } from "@/lib/products";
import { ShieldIcon } from "./Icons";

export default function TrustBadges() {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--gold-muted)] p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--text-3)]">Resultados comprovados</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-4xl font-bold tabular-nums text-[color:var(--brand)]">{PRODUCT.reducaoPercentual}%</span>
          <span className="text-sm font-medium text-[color:var(--text-1)]">de redução no crescimento dos pelos</span>
        </p>
        <p className="mt-2 text-xs text-[color:var(--text-3)]">
          Estudo com uso diário demonstrou redução significativa do crescimento dos pelos em {PRODUCT.reducaoDias} dias.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[color:var(--border)] p-5">
        <ShieldIcon className="mt-0.5 h-8 w-8 flex-shrink-0 text-[color:var(--brand)]" />
        <p className="text-sm text-[color:var(--text-2)]">
          Cosmético devidamente regularizado junto à Anvisa sob número de processo{" "}
          <strong className="text-[color:var(--text-1)]">{PRODUCT.anvisaProcesso}</strong>.
        </p>
      </div>
    </section>
  );
}
