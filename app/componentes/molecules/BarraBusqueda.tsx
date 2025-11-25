"use client";

import { FormEvent, useRef, useState } from "react";
import { ParametrosBusqueda } from "../../hooks/useDisponibilidad";
import { formatearFechaCorta } from "../../lib/formatos";

type Props = { onBuscar?: (params: ParametrosBusqueda) => void };

export default function BarraBusqueda({ onBuscar }: Props) {
  const [preferencia, setPreferencia] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [huespedes, setHuespedes] = useState("");
  const refCheckIn = useRef<HTMLInputElement>(null);
  const refCheckOut = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const manejarSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onBuscar?.({ preferencia, checkIn, checkOut, huespedes, tags: [] });
  };

  const triggerBusqueda = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onBuscar?.({ preferencia, checkIn, checkOut, huespedes, tags: [] });
    }, 500);
  };

  return (
    <form
      onSubmit={manejarSubmit}
      className="grid w-full grid-cols-[1.5fr_1.1fr_1.1fr_1fr_auto] items-center gap-1 rounded-full border border-[var(--border)] bg-white px-3 py-2 text-[var(--color-text-dark)] shadow-sm transition hover:shadow-md dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)] dark:text-[var(--color-dark-text)]"
    >
      <div className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-[var(--color-background-light)] dark:hover:bg-[rgba(255,255,255,0.04)]">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-primary-base">Habitacion</span>
        <input
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-text-sub)] dark:placeholder:text-[var(--color-dark-text-sub)]"
          placeholder="Nombre, tipo, amenidad"
          value={preferencia}
          onChange={(e) => {
            setPreferencia(e.target.value);
            triggerBusqueda();
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          if (refCheckIn.current?.showPicker) refCheckIn.current.showPicker();
          else refCheckIn.current?.focus();
        }}
        className="relative flex min-w-[130px] items-center justify-center rounded-full px-3 py-2 text-sm hover:bg-[var(--color-background-light)] dark:hover:bg-[rgba(255,255,255,0.04)]"
      >
        <span className="text-[12px] font-semibold uppercase tracking-wide text-primary-base">
          {formatearFechaCorta(checkIn) || "Check-in"}
        </span>
        <input
          type="date"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          value={checkIn}
          onChange={(e) => {
            setCheckIn(e.target.value);
            triggerBusqueda();
          }}
          aria-label="Seleccionar fecha de check-in"
          style={{ WebkitAppearance: "none" }}
          ref={refCheckIn}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          if (refCheckOut.current?.showPicker) refCheckOut.current.showPicker();
          else refCheckOut.current?.focus();
        }}
        className="relative flex min-w-[130px] items-center justify-center rounded-full px-3 py-2 text-sm hover:bg-[var(--color-background-light)] dark:hover:bg-[rgba(255,255,255,0.04)]"
      >
        <span className="text-[12px] font-semibold uppercase tracking-wide text-primary-base">
          {formatearFechaCorta(checkOut) || "Check-out"}
        </span>
        <input
          type="date"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          value={checkOut}
          onChange={(e) => {
            setCheckOut(e.target.value);
            triggerBusqueda();
          }}
          aria-label="Seleccionar fecha de check-out"
          style={{ WebkitAppearance: "none" }}
          ref={refCheckOut}
        />
      </button>
      <div className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-[var(--color-background-light)] dark:hover:bg-[rgba(255,255,255,0.04)]">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-primary-base">Huespedes</span>
        <input
          type="number"
          min={1}
          className="w-16 bg-transparent text-sm outline-none placeholder:text-[var(--color-text-sub)] dark:placeholder:text-[var(--color-dark-text-sub)]"
          placeholder="2"
          value={huespedes}
          onChange={(e) => {
            setHuespedes(e.target.value);
            triggerBusqueda();
          }}
        />
      </div>
      <button
        type="submit"
        className="mx-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary-base px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg active:scale-95"
      >
        Buscar
      </button>
    </form>
  );
}

