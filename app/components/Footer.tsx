import { buildWhatsAppUrl, WHATSAPP_PHONE } from "@/lib/whatsapp";
import { DropletIcon } from "./Icons";

export default function Footer() {
  const phoneLabel = `(${WHATSAPP_PHONE.slice(2, 4)}) ${WHATSAPP_PHONE.slice(4, 9)}-${WHATSAPP_PHONE.slice(9)}`;

  return (
    <footer className="bg-[color:var(--brand)] text-white">
      <div className="mx-auto max-w-[900px] px-5 py-10 sm:px-8">
        <p className="flex items-center gap-2 text-lg font-bold">
          <DropletIcon className="h-5 w-5" />
          Lisinha
        </p>
        <p className="mt-2 max-w-[48ch] text-sm text-white/80">
          Sérum pós-depilatório de uso diário, com Telocapil, D-Pantenol, Camomila e Vitamina E.
        </p>
        <p className="mt-4 text-sm text-white/90">
          <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:underline">
            WhatsApp {phoneLabel}
          </a>
        </p>

        <div className="mt-8 flex flex-wrap justify-between gap-2 border-t border-white/20 pt-6 text-xs text-white/70">
          <span>© 2026 Lisinha. Todos os direitos reservados.</span>
          <span>Este site não substitui orientação médica ou dermatológica.</span>
        </div>
      </div>
    </footer>
  );
}
