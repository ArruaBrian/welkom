"use client";

export default function BotonTema({ onClick, tema }: { onClick: () => void; tema: string }) {
  return (
    <button
      onClick={onClick}
      className="grid h-11 w-11 aspect-square cursor-pointer place-items-center rounded-full border border-[var(--border)] text-lg font-semibold text-[var(--color-text-sub)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-base hover:text-primary-base hover:shadow-[0_10px_25px_rgba(213,33,81,0.18)] active:scale-95 dark:border-[var(--color-dark-border)] dark:text-[var(--color-dark-text)]"
      aria-label="Alternar tema"
    >
      {tema === "oscuro" ? "🌙" : "☀️"}
    </button>
  );
}
