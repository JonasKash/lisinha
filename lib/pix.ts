// Gerador de payload Pix "Copia e Cola" (BR Code) — padrão EMV do Banco Central.
// Referência: Manual de Padrões para Iniciação do Pix (BCB).
// Mesma chave (CNPJ) já usada no projeto avestra-tag-nfc — é a mesma pessoa jurídica.

const PIX_KEY = "66309977000101"; // CNPJ, somente dígitos
const MERCHANT_NAME = "AVESTRA"; // máx. 25 caracteres, sem acento — nome cadastrado no banco para essa chave
const MERCHANT_CITY = "ARAXA"; // máx. 15 caracteres, sem acento

function tlv(id: string, value: string): string {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) !== 0 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function buildPixPayload({ amount, txid }: { amount: number; txid: string }): string {
  const merchantAccount = tlv("00", "BR.GOV.BCB.PIX") + tlv("01", PIX_KEY);
  const additionalData = tlv("05", txid.slice(0, 25) || "***");

  const withoutCrc =
    tlv("00", "01") +
    tlv("26", merchantAccount) +
    tlv("52", "0000") +
    tlv("53", "986") +
    tlv("54", amount.toFixed(2)) +
    tlv("58", "BR") +
    tlv("59", MERCHANT_NAME.slice(0, 25)) +
    tlv("60", MERCHANT_CITY.slice(0, 15)) +
    tlv("62", additionalData) +
    "6304";

  return withoutCrc + crc16(withoutCrc);
}
