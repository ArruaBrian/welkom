"use client";

import Encabezado from "../../componentes/organisms/Encabezado";

export default function PaginaPoliticaCancelacion() {
  return (
    <div className="min-h-screen bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
      <Encabezado />
      <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-base">Política</p>
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">Política de cancelación</h1>
          <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Condiciones para cambios, reembolsos y fechas flexibles.</p>
        </div>

        <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--color-background-white)] p-6 text-sm text-[var(--color-text-sub)] shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)] dark:text-[var(--color-dark-text-sub)]">
          <p>• Cancelaciones sin cargo hasta 48h antes del check-in.</p>
          <p>• Dentro de las 48h previas, se cobra la primera noche.</p>
          <p>• Tarifas no reembolsables no permiten cambios ni devoluciones.</p>
          <p>• Para modificar fechas, contáctanos a soporte@guidohotel.com.</p>
          <p>• Cambios de nombre sin costo hasta 24h antes de la llegada.</p>
        </div>
      </main>
    </div>
  );
}

