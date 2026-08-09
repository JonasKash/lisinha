export const PRODUCT = {
  slug: "lisinha",
  name: "Lisinha",
  fullName: "Lisinha — Sérum Pós-Depilatório com Telocapil",
  tagline: "Redutor de pelos corporais com Telocapil",
  description:
    "Sérum de uso diário desenvolvido para cuidar da pele após a depilação, ajudando a reduzir o desconforto e mantendo a pele mais equilibrada com o uso contínuo. Com Telocapil 1%, D-Pantenol, Camomila e Vitamina E, promove sensação imediata de alívio e contribui para uma rotina mais prática e confortável.",
  indicado: ["Axilas", "Virilha (externa)", "Pernas e braços"],
  esperar: [
    "Ajuda a acalmar a pele após a depilação",
    "Sensação de pele mais macia e confortável",
    "Auxilia na manutenção do crescimento dos pelos com uso contínuo",
  ],
  ondeUsar: [
    "Virilha e região íntima externa",
    "Axilas",
    "Rosto e buço*",
    "Pernas e braços",
    "Glúteos",
    "Barriga e linha abdominal",
    "Pescoço e nuca",
  ],
  ondeUsarNota: "*Evite contato com os olhos e aplicação muito próxima ao couro cabeludo.",
  reducaoPercentual: 91,
  reducaoDias: 30,
  anvisaProcesso: "25.351.039069/2026-11",
};

// Preço da venda direta (checkout próprio, Pix) — sempre recalculado no servidor,
// nunca aceito vindo do formulário.
export const PRICE_UNIT = 34.0;
export const FREE_SHIPPING = true;

// Preço e link de referência da Shopee, só para exibição comparativa — não gera Pix.
export const SHOPEE_PRICE = 54.9;
export const SHOPEE_URL = "https://s.shopee.com.br/5ArWBAgqvv";

export function priceForOrder(qty: number): number {
  const safeQty = Math.min(Math.max(Math.round(qty) || 1, 1), 10);
  return Math.round(PRICE_UNIT * safeQty * 100) / 100;
}
