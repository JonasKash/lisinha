"use server";

import QRCode from "qrcode";
import { buildPixPayload } from "@/lib/pix";
import { priceForOrder } from "@/lib/products";

export type GeneratePixResult = {
  amount: number;
  payload: string;
  qrDataUrl: string;
  orderId: string;
};

export async function generatePixOrder(): Promise<GeneratePixResult> {
  // Preço nunca vem do cliente — sempre recalculado aqui a partir do catálogo.
  // Frete é sempre grátis para esse produto, não há regra de região.
  const amount = priceForOrder(1);

  const orderId = `LSN${Date.now().toString(36).toUpperCase()}`;
  const payload = buildPixPayload({ amount, txid: orderId });
  const qrDataUrl = await QRCode.toDataURL(payload, { margin: 1, width: 320 });

  return { amount, payload, qrDataUrl, orderId };
}
