"use client";

import Encabezado from "../../componentes/organisms/Encabezado";
import ReservaForm from "../../componentes/organisms/ReservaForm";
import { useSearchParams } from "next/navigation";

export default function PaginaReserva() {
  const searchParams = useSearchParams();
  const defaults = {
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    huespedes: searchParams.get("huespedes") || "",
    habitacionId: searchParams.get("habitacionId") || "",
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
      <Encabezado />
      <main className="mx-auto max-w-4xl px-6 pb-16 pt-6">
        <div className="flex flex-col gap-2 pb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-base">
            Reserva
          </p>
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">
            Completa tus datos para confirmar
          </h1>
        </div>
        <ReservaForm defaults={defaults} />
      </main>
    </div>
  );
}

