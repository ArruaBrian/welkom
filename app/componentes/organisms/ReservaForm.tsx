"use client";

import { useMemo, useState } from "react";
import { useCreateSimpleBooking } from "../../../src/hooks/useCreateBooking";
import { useDisponibilidad } from "../../hooks/useDisponibilidad";

type Props = {
  defaults?: {
    nombre?: string;
    email?: string;
    telefono?: string;
    checkIn?: string;
    checkOut?: string;
    huespedes?: string;
    habitacionId?: string;
  };
};

export default function ReservaForm({ defaults = {} }: Props) {
  const [nombre, setNombre] = useState(defaults.nombre || "");
  const [email, setEmail] = useState(defaults.email || "");
  const [telefono, setTelefono] = useState(defaults.telefono || "");
  const [checkIn, setCheckIn] = useState(defaults.checkIn || "");
  const [checkOut, setCheckOut] = useState(defaults.checkOut || "");
  const [huespedes, setHuespedes] = useState(defaults.huespedes || "");
  const [habitacionId] = useState(defaults.habitacionId || "");
  const [resultado, setResultado] = useState<string | null>(null);
  const { data, isLoading, error, mutate } = useCreateSimpleBooking();
  const { resultados: habitacionesDisponibles } = useDisponibilidad();

  const habitacionSeleccionada = useMemo(
    () => habitacionesDisponibles.find((h) => h.id === habitacionId),
    [habitacionId, habitacionesDisponibles]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id_room: habitacionId,
      guest_name: nombre,
      guest_email: email,
      guest_phone: telefono,
      start_date: checkIn,
      end_date: checkOut,
      total_price: 0,
      notes: `Huéspedes: ${huespedes || "N/D"}`,
    };
    console.log("[ReservaForm] submit payload simple booking", payload);
    mutate(payload);
    setResultado("Creando reserva...");
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--color-background-white)] p-6 shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]">
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Nombre completo</label>
          <input
            required
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Email</label>
          <input
            required
            type="email"
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Teléfono</label>
          <input
            required
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Huéspedes</label>
          <input
            required
            type="number"
            min={1}
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
            value={huespedes}
            onChange={(e) => setHuespedes(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Check-in</label>
          <input
            required
            type="date"
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Check-out</label>
          <input
            required
            type="date"
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-semibold text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Habitación seleccionada</label>
          <div className="rounded-2xl border border-[var(--border)] bg-color-primary-extra-light px-4 py-3 text-sm text-[var(--color-text-dark)] shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[rgba(213,33,81,0.08)] dark:text-[var(--color-dark-text)]">
            {habitacionSeleccionada ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary-base">{habitacionSeleccionada.nombre}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">{habitacionSeleccionada.tipo}</span>
                </div>
                <div className="text-xs text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                  Piso {habitacionSeleccionada.piso} · Capacidad {habitacionSeleccionada.capacidad} · {habitacionSeleccionada.estado || "Estado no indicado"}
                </div>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>${habitacionSeleccionada.precioNoche} / noche</span>
                  <span className="text-xs text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                    {habitacionSeleccionada.amenities.slice(0, 2).join(" · ")}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-[var(--color-text-sub)]">No se pudo cargar la habitación seleccionada.</span>
            )}
          </div>
          <input type="hidden" name="habitacionId" value={habitacionId} />
        </div>
        <div className="sm:col-span-2 flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-full bg-primary-base px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Confirmar reserva"}
          </button>
          {resultado && (
            <span className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
              {data?.id ? `Reserva creada: ${data.id}` : resultado}
            </span>
          )}
          {error && <span className="text-sm text-[var(--color-error-base)]">Error al crear la reserva. Revisa consola.</span>}
        </div>
      </form>
    </div>
  );
}
