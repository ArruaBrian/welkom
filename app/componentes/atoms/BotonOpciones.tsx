"use client";

import Link from "next/link";

export default function BotonOpciones({ refObjetivo }: { refObjetivo: (el: HTMLAnchorElement | null) => void }) {
  return (
    <Link
      href="/paginas/opciones"
      ref={refObjetivo}
      className="hidden h-11 min-w-[120px] items-center justify-center gap-2 rounded-full border border-[var(--border)] px-4 text-sm font-medium text-[var(--color-text-sub)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-base hover:text-primary-base hover:shadow-[0_10px_25px_rgba(213,33,81,0.18)] active:scale-95 dark:border-[var(--color-dark-border)] dark:text-[var(--color-dark-text-sub)] md:inline-flex"
    >
      <span className="inline-flex items-center gap-2">📂 Opciones</span>
    </Link>
  );
}
