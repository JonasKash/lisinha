export const WHATSAPP_PHONE = "5534991615988";

export function buildWhatsAppUrl(message?: string, phone: string = WHATSAPP_PHONE): string {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  const text = message ?? "Olá! Quero saber mais sobre o Lisinha.";
  return `${base}?text=${encodeURIComponent(text)}`;
}
