"use client";

import Encabezado from "../../componentes/organisms/Encabezado";

export default function PaginaSoporte() {
  return (
    <div className="min-h-screen bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
      <Encabezado />
      <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-base">Soporte 24/7</p>
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">Resolvemos tus dudas en minutos</h1>
          <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Asistencia para reservas, pagos o servicios adicionales durante tu estancia.</p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--color-background-white)] p-5 shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)] sm:grid-cols-2">
          <div className="space-y-2 text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
            <h2 className="text-lg font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">Canales activos</h2>
            <p>Chat en vivo: disponible desde tu panel de reserva.</p>
            <p>Email: soporte@guidohotel.com</p>
            <p>Teléfono: +00 0000-0000</p>
          </div>
          <div className="space-y-2 text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
            <h2 className="text-lg font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">Temas frecuentes</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Confirmación y cambios de fechas</li>
              <li>Métodos de pago y recibos</li>
              <li>Solicitar amenities extra (cuna, cama adicional)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

