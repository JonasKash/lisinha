import { PRODUCT } from "@/lib/products";
import { CheckIcon } from "./Icons";

export default function HowToUse() {
  return (
    <section id="como-usar" className="scroll-mt-20">
      <h2 className="text-lg font-semibold text-[color:var(--text-1)]">Onde posso usar o Lisinha?</h2>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {PRODUCT.ondeUsar.map((item) => (
          <li key={item} className="flex items-center gap-2.5 rounded-[var(--radius-sm)] bg-[color:var(--surface)] px-3.5 py-2.5 text-sm text-[color:var(--text-1)]">
            <CheckIcon className="h-4 w-4 flex-shrink-0 text-[color:var(--brand)]" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-[color:var(--text-3)]">{PRODUCT.ondeUsarNota}</p>
    </section>
  );
}
