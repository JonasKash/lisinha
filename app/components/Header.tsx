import Link from "next/link";
import { DropletIcon } from "./Icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-white">
      <div className="mx-auto flex h-[72px] max-w-[900px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-[color:var(--text-1)]">
          <DropletIcon className="h-6 w-6 text-[color:var(--brand)]" />
          Lisinha
        </Link>

        <Link
          href="/pedido"
          className="rounded-[var(--radius-pill)] bg-[color:var(--brand)] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[color:var(--brand-hover)]"
        >
          Comprar
        </Link>
      </div>
    </header>
  );
}
