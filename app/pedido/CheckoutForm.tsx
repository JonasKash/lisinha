"use client";

import { useEffect, useMemo, useState } from "react";
import { PRICE_UNIT, PRODUCT } from "@/lib/products";
import { sanitizeText, sanitizePhone, sanitizeCep } from "@/lib/security";
import { maskCep, maskPhone } from "@/lib/masks";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CheckIcon } from "../components/Icons";
import { generatePixOrder, type GeneratePixResult } from "./actions";

type Step = "entrega" | "pagamento";

type Endereco = {
  nome: string;
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

const EMPTY_ENDERECO: Endereco = {
  nome: "",
  telefone: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
};

function formatBRL(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

export default function CheckoutForm() {
  const [step, setStep] = useState<Step>("entrega");
  const [endereco, setEndereco] = useState<Endereco>(EMPTY_ENDERECO);
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "ok" | "erro">("idle");
  const [pix, setPix] = useState<GeneratePixResult | null>(null);
  const [pixLoading, setPixLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const pendenciasEntrega = useMemo(() => {
    const faltando: string[] = [];
    if (endereco.nome.trim().length <= 1) faltando.push("nome completo");
    if (!sanitizePhone(endereco.telefone)) faltando.push("telefone com DDD");
    if (!sanitizeCep(endereco.cep)) faltando.push("CEP (8 dígitos)");
    if (endereco.rua.trim().length <= 1) faltando.push("rua");
    if (endereco.numero.trim().length === 0) faltando.push("número");
    if (endereco.bairro.trim().length <= 1) faltando.push("bairro");
    if (endereco.cidade.trim().length <= 1) faltando.push("cidade");
    if (endereco.uf.trim().length !== 2) faltando.push("UF");
    return faltando;
  }, [endereco]);

  const podeAvancarEntrega = pendenciasEntrega.length === 0;

  async function handleCepBlur() {
    const cep = sanitizeCep(endereco.cep);
    if (!cep) return;
    setCepStatus("loading");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepStatus("erro");
        return;
      }
      setEndereco((prev) => ({
        ...prev,
        rua: data.logradouro || prev.rua,
        bairro: data.bairro || prev.bairro,
        cidade: data.localidade || prev.cidade,
        uf: data.uf || prev.uf,
      }));
      setCepStatus("ok");
    } catch {
      setCepStatus("erro");
    }
  }

  useEffect(() => {
    if (step !== "pagamento" || pix) return;
    setPixLoading(true);
    generatePixOrder()
      .then((result) => setPix(result))
      .finally(() => setPixLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const whatsappMessage = useMemo(() => {
    if (!pix) return "";
    const linha = (label: string, value: string) => `${label}: ${value}`;
    return [
      `Pedido ${pix.orderId} — Lisinha`,
      linha("Produto", PRODUCT.name),
      linha("Total pago", `R$ ${formatBRL(pix.amount)}`),
      linha("Frete", "Grátis"),
      linha("Nome", sanitizeText(endereco.nome)),
      linha("Telefone", sanitizePhone(endereco.telefone) ?? ""),
      linha(
        "Endereço",
        `${sanitizeText(endereco.rua)}, ${sanitizeText(endereco.numero)}${endereco.complemento ? ` - ${sanitizeText(endereco.complemento)}` : ""}`
      ),
      linha("Bairro", sanitizeText(endereco.bairro)),
      linha("Cidade/UF", `${sanitizeText(endereco.cidade)} - ${sanitizeText(endereco.uf).toUpperCase()}`),
      linha("CEP", sanitizeCep(endereco.cep) ?? ""),
      "",
      "Já fiz o pagamento via Pix. Segue meu pedido para envio.",
    ].join("\n");
  }, [pix, endereco]);

  return (
    <div className="mx-auto max-w-[560px] px-5 py-10 sm:px-8">
      <ol className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-3)]">
        {(["entrega", "pagamento"] as Step[]).map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.7rem] ${
                step === s ? "bg-[color:var(--brand)] text-white" : "bg-[color:var(--surface)] text-[color:var(--text-3)]"
              }`}
            >
              {i + 1}
            </span>
            <span className={step === s ? "text-[color:var(--text-1)]" : ""}>
              {s === "entrega" ? "Entrega" : "Pagamento"}
            </span>
            {i < 1 && <span className="mx-1 text-[color:var(--border-strong)]">—</span>}
          </li>
        ))}
      </ol>

      {step === "entrega" && (
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--text-1)]">Dados de entrega</h1>
          <p className="mt-1 text-sm text-[color:var(--text-2)]">
            {PRODUCT.name} — R$ {formatBRL(PRICE_UNIT)} + frete grátis
          </p>

          <div className="mt-6 grid gap-4">
            <Field label="Nome completo" value={endereco.nome} onChange={(v) => setEndereco({ ...endereco, nome: v })} />
            <Field
              label="Telefone / WhatsApp"
              value={endereco.telefone}
              onChange={(v) => setEndereco({ ...endereco, telefone: maskPhone(v) })}
              placeholder="(34) 99999-9999"
              inputMode="numeric"
            />
            <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
              <Field
                label="CEP"
                value={endereco.cep}
                onChange={(v) => setEndereco({ ...endereco, cep: maskCep(v) })}
                onBlur={handleCepBlur}
                placeholder="00000-000"
                inputMode="numeric"
              />
              <span className="pb-3 text-xs text-[color:var(--text-3)]">
                {cepStatus === "loading" && "Buscando..."}
                {cepStatus === "ok" && "Endereço encontrado"}
                {cepStatus === "erro" && "CEP não encontrado"}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_120px] gap-3">
              <Field label="Rua" value={endereco.rua} onChange={(v) => setEndereco({ ...endereco, rua: v })} />
              <Field label="Número" value={endereco.numero} onChange={(v) => setEndereco({ ...endereco, numero: v })} />
            </div>
            <Field
              label="Complemento (opcional)"
              value={endereco.complemento}
              onChange={(v) => setEndereco({ ...endereco, complemento: v })}
            />
            <Field label="Bairro" value={endereco.bairro} onChange={(v) => setEndereco({ ...endereco, bairro: v })} />
            <div className="grid grid-cols-[1fr_80px] gap-3">
              <Field label="Cidade" value={endereco.cidade} onChange={(v) => setEndereco({ ...endereco, cidade: v })} />
              <Field label="UF" value={endereco.uf} onChange={(v) => setEndereco({ ...endereco, uf: v.toUpperCase() })} maxLength={2} />
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setStep("pagamento")}
              disabled={!podeAvancarEntrega}
              className="w-full rounded-[var(--radius-pill)] bg-[color:var(--brand)] py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[color:var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuar para pagamento
            </button>
            {!podeAvancarEntrega && (
              <p className="mt-2 text-xs text-[color:var(--text-3)]">Falta preencher: {pendenciasEntrega.join(", ")}</p>
            )}
          </div>
        </div>
      )}

      {step === "pagamento" && (
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--text-1)]">Pagamento via Pix</h1>

          <div className="mt-6 rounded-[var(--radius-md)] border border-[color:var(--border)] p-5">
            <p className="text-sm text-[color:var(--text-2)]">Resumo do pedido</p>
            <p className="mt-1 text-sm font-medium text-[color:var(--text-1)]">{PRODUCT.name}</p>
            <p className="mt-1 text-sm text-[color:var(--text-2)]">
              Entrega para {sanitizeText(endereco.nome)} — {sanitizeText(endereco.rua)}, {sanitizeText(endereco.numero)},{" "}
              {sanitizeText(endereco.cidade)}/{endereco.uf.toUpperCase()}
            </p>
            <p className="mt-3 flex justify-between border-t border-[color:var(--border)] pt-3 text-sm text-[color:var(--text-2)]">
              <span>Frete</span>
              <span className="font-medium text-[color:var(--success)]">Grátis</span>
            </p>
            <p className="mt-3 flex justify-between text-2xl font-semibold tabular-nums text-[color:var(--text-1)]">
              <span className="text-sm font-normal text-[color:var(--text-2)]">Total</span>
              {pix ? `R$ ${formatBRL(pix.amount)}` : "—"}
            </p>
          </div>

          {pixLoading && <p className="mt-6 text-sm text-[color:var(--text-2)]">Gerando QR Code Pix...</p>}

          {pix && !pixLoading && (
            <>
              <div className="mt-6 flex flex-col items-center rounded-[var(--radius-md)] border border-[color:var(--border)] p-6">
                <img src={pix.qrDataUrl} alt="QR Code Pix para pagamento" width={220} height={220} />
                <p className="mt-3 text-center text-xs text-[color:var(--text-3)]">
                  Escaneie com o app do seu banco ou copie o código abaixo
                </p>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-3)]">
                  Pix Copia e Cola
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    readOnly
                    value={pix.payload}
                    className="flex-1 truncate rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-3 py-2.5 text-xs text-[color:var(--text-2)]"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(pix.payload);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="rounded-[var(--radius-sm)] bg-[color:var(--brand)] px-4 text-xs font-bold uppercase tracking-wide text-white"
                  >
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {["Abra o app do seu banco", "Escolha pagar com Pix", "Cole o código ou escaneie o QR", "Confirme o pagamento"].map(
                  (t, i) => (
                    <p key={t} className="flex items-center gap-2.5 text-sm text-[color:var(--text-2)]">
                      <CheckIcon className="h-4 w-4 text-[color:var(--success)]" />
                      {i + 1}. {t}
                    </p>
                  )
                )}
              </div>

              {!confirmado ? (
                <a
                  href={buildWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setConfirmado(true)}
                  className="mt-8 block rounded-[var(--radius-pill)] bg-[color:var(--brand)] py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[color:var(--brand-hover)]"
                >
                  Já paguei — enviar confirmação
                </a>
              ) : (
                <p className="mt-8 rounded-[var(--radius-md)] bg-[color:var(--success-muted)] p-4 text-center text-sm font-medium text-[color:var(--success)]">
                  Confirmação enviada. Assim que o pagamento cair, seu pedido {pix.orderId} entra na fila de envio.
                </p>
              )}
            </>
          )}

          <button
            onClick={() => setStep("entrega")}
            className="mt-4 w-full rounded-[var(--radius-pill)] border border-[color:var(--border-strong)] py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--text-1)]"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  maxLength?: number;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-3)]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        className="mt-1.5 w-full rounded-[var(--radius-sm)] border border-[color:var(--border-strong)] px-3 py-2.5 text-sm text-[color:var(--text-1)] outline-none focus:border-[color:var(--brand)]"
      />
    </label>
  );
}
