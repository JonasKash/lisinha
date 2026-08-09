/** Remove tags HTML e caracteres perigosos antes de usar um texto vindo do formulário */
export function sanitizeText(input: unknown, maxLength = 200): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .slice(0, maxLength);
}

/** Valida e limpa telefone brasileiro (DDD + número, 10 ou 11 dígitos) */
export function sanitizePhone(phone: unknown): string | null {
  if (typeof phone !== "string") return null;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 10 || cleaned.length > 11) return null;
  return cleaned;
}

/** Valida CEP brasileiro (8 dígitos) */
export function sanitizeCep(cep: unknown): string | null {
  if (typeof cep !== "string") return null;
  const cleaned = cep.replace(/\D/g, "");
  return cleaned.length === 8 ? cleaned : null;
}
