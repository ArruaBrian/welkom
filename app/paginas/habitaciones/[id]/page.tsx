"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Encabezado from "../../../componentes/organisms/Encabezado";
import { Habitacion } from "../../../datos/habitaciones";
import { useRoom } from "../../../../src/hooks/useRoom";
import { useRooms } from "../../../../src/hooks/useRooms";
import { mapRoomToHabitacion } from "../../../lib/mapRoom";

function DetalleHabitacionInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const { rooms: roomsApi, isLoading: roomsLoading } = useRooms({ refetchIntervalMs: 15000 });
  const { room, isLoading, error } = useRoom(id);

  const habitacionApiDesdeLista = useMemo(() => {
    const encontrada = roomsApi.find((r) => r.id === id);
    return encontrada ? mapRoomToHabitacion(encontrada) : null;
  }, [roomsApi, id]);

  const habitacionApi = useMemo(() => {
    return room ? mapRoomToHabitacion(room) : null;
  }, [room]);

  const habitacion: Habitacion | null = habitacionApiDesdeLista || habitacionApi;

  const imagenPrincipal = useMemo(
    () => habitacion?.imagen || "/images/placeholder-room.svg",
    [habitacion?.imagen]
  );
  const [src, setSrc] = useState(imagenPrincipal);
  useEffect(() => {
    setSrc(imagenPrincipal);
  }, [imagenPrincipal]);

  const qs = useMemo(() => {
    const query = new URLSearchParams();
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const huespedes = searchParams.get("huespedes");
    if (checkIn) query.set("checkIn", checkIn);
    if (checkOut) query.set("checkOut", checkOut);
    if (huespedes) query.set("huespedes", huespedes);
    query.set("habitacionId", id || "");
    return query.toString();
  }, [searchParams, id]);

  const disponible = (habitacion?.estado || "").toLowerCase().includes("disponible");
  const cargando = isLoading || roomsLoading;

  if (cargando || error || !habitacion) {
    return (
      <div className="min-h-screen bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
        <Encabezado />
        <main className="mx-auto max-w-5xl space-y-3 px-6 pb-16 pt-6">
          <p>{cargando ? "Cargando habitacion..." : "No se encontro la habitacion."}</p>
          <Link
            href="/paginas/habitaciones"
            className="inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--color-text-sub)] hover:border-primary-base hover:text-primary-base"
          >
            Volver a habitaciones
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
      <Encabezado />
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-6">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative h-80 w-full overflow-hidden rounded-3xl shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
            <Image
              src={src}
              alt={habitacion.nombre}
              fill
              className="object-cover"
              onError={() => setSrc("/images/placeholder-room.svg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  disponible ? "bg-white/85 text-primary-base" : "bg-black/70 text-white"
                }`}
              >
                {habitacion.estado || "Estado no indicado"}
              </span>
              <span className="rounded-full bg-white/85 px-4 py-2 text-xs font-semibold text-[var(--color-text-sub)]">
                Piso {habitacion.piso} | {habitacion.tipo}
              </span>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--color-background-white)] p-6 shadow-[0_12px_50px_rgba(0,0,0,0.08)] dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-primary-base">{habitacion.tipo}</p>
              <h1 className="text-3xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">
                {habitacion.nombre}
              </h1>
              <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                {habitacion.descripcion || "Habitacion del hotel."}
              </p>
              <p className="text-sm font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">
                Capacidad base {habitacion.capacidad} huespedes
              </p>
              {(habitacion.maxAdultos || habitacion.maxNinos || habitacion.maxBebes) && (
                <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                  Limites: {habitacion.maxAdultos ? `Adultos ${habitacion.maxAdultos}` : ""}
                  {habitacion.maxNinos ? ` | Ninos ${habitacion.maxNinos}` : ""}
                  {habitacion.maxBebes ? ` | Bebes ${habitacion.maxBebes}` : ""}
                </p>
              )}
              {(habitacion.cunaDisponible || habitacion.extraCamaDisponible) && (
                <p className="text-xs text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                  {habitacion.cunaDisponible ? "Cuna disponible" : ""}
                  {habitacion.cunaDisponible && habitacion.extraCamaDisponible ? " | " : ""}
                  {habitacion.extraCamaDisponible ? "Cama extra disponible" : ""}
                </p>
              )}
              {habitacion.estadoDescripcion && (
                <p className="text-xs text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                  {habitacion.estadoDescripcion}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
              {habitacion.amenities.length > 0 ? (
                habitacion.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-color-primary-extra-light px-3 py-1 text-primary-base dark:bg-[rgba(213,33,81,0.15)]"
                  >
                    {amenity}
                  </span>
                ))
              ) : (
                <span>Sin amenities registrados</span>
              )}
            </div>
            <div className="grid gap-3 rounded-2xl bg-color-primary-extra-light px-4 py-3 text-[var(--color-text-dark)] dark:bg-[rgba(213,33,81,0.08)] dark:text-[var(--color-dark-text)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Tarifa</p>
                  <p className="text-xl font-bold">${habitacion.precioNoche} / noche</p>
                </div>
                <div className="text-right text-xs text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                  <p>Estado: {habitacion.estado || "-"}</p>
                </div>
              </div>
              <Link
                href={`/paginas/reserva${qs ? "?" + qs : ""}`}
                className="inline-flex items-center justify-center rounded-full bg-primary-base px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Reservar esta habitacion
              </Link>
            </div>
            <div className="flex gap-3 pt-2">
              <Link
                href="/paginas/habitaciones"
                className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--color-text-sub)] transition hover:border-primary-base hover:text-primary-base dark:border-[var(--color-dark-border)] dark:text-[var(--color-dark-text-sub)]"
              >
                Volver a habitaciones
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DetalleHabitacionPage() {
  return (
    <Suspense fallback={<div />}>
      <DetalleHabitacionInner />
    </Suspense>
  );
}

