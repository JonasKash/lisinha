import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      title="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_16px_rgba(37,211,102,0.4)] transition-transform duration-150 ease-out hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7 text-white" />
    </a>
  );
}
