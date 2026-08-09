import Image from "next/image";
import { DropletIcon } from "./Icons";

// Sem fotos reais confirmadas ainda — troque por public/images/products/*.webp
// assim que os arquivos chegarem (ver 02-produtos/ na pasta do cliente).
const PHOTOS: string[] = [];

export default function ProductGallery() {
  if (PHOTOS.length === 0) {
    return (
      <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface)]">
        <DropletIcon className="h-16 w-16 text-[color:var(--brand)]" />
        <p className="text-xs text-[color:var(--text-3)]">ilustração — fotos reais em breve</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface)]">
      <Image src={PHOTOS[0]} alt="Lisinha — sérum pós-depilatório" fill className="object-contain p-6" priority />
    </div>
  );
}
