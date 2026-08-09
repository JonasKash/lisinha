import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting simples em memória. Para tráfego maior, trocar por Upstash Redis.
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20; // gerar QR Pix é mais custoso que uma leitura normal

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  entry.count++;
  return entry.count <= MAX_REQUESTS;
}

export function middleware(request: NextRequest) {
  // Server Actions (geração do Pix) chegam como POST na própria página /pedido.
  if (request.method === "POST") {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return new NextResponse("Muitas requisições. Tente novamente em instantes.", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pedido"],
};
