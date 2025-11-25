"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Habitacion } from "../../datos/habitaciones";
import { useFavoritos } from "../../proveedores/ProveedorFavoritos";

type Props = { habitacion: Habitacion; prioridad?: boolean };

export default function TarjetaHabitacion({ habitacion, prioridad }: Props) {
  const { alternarFavorito, estaEnFavoritos } = useFavoritos();
  const enSeleccion = estaEnFavoritos(habitacion.id);
  const [src, setSrc] = useState(habitacion.imagen || "/images/placeholder-room.svg");

  const disponible = useMemo(() => {
    const estado = habitacion.estado?.toLowerCase() || "";
    return estado.includes("disponible") || estado === "";
  }, [habitacion.estado]);

  const resumenCapacidad = useMemo(() => {
    return [
      habitacion.maxAdultos ? `Adultos ${habitacion.maxAdultos}` : null,
      habitacion.maxNinos ? `Ninos ${habitacion.maxNinos}` : null,
      habitacion.maxBebes ? `Bebes ${habitacion.maxBebes}` : null,
    ]
      .filter(Boolean)
      .join(" | ");
  }, [habitacion.maxAdultos, habitacion.maxBebes, habitacion.maxNinos]);

  const capacidadLabel = resumenCapacidad || `Capacidad ${habitacion.capacidad || "N/D"}`;

  const cardDisabledClasses = disponible ? "" : "pointer-events-none opacity-55 saturate-50 grayscale";
  const estadoChip = disponible ? "Disponible" : habitacion.estado || "Sin estado";

  return (
    <motion.article
      layout
      whileHover={disponible ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--color-background-white)] shadow-sm transition-colors hover:border-primary-base/60 dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)] ${cardDisabledClasses}`}
    >
      <div className="relative h-60 overflow-hidden bg-[var(--color-background-light)] dark:bg-[rgba(255,255,255,0.04)]">
        <Image
          src={src}
          alt={habitacion.nombre}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={prioridad}
          onError={() => setSrc("/images/placeholder-room.svg")}
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
              disponible ? "bg-white/85 text-primary-base" : "bg-slate-800/80 text-white dark:bg-slate-700/80"
            }`}
          >
            {estadoChip}
          </span>
          <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-sub)]">
            Piso {habitacion.piso}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
            alternarFavorito(habitacion.id, rect);
          }}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/50 backdrop-blur transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(213,33,81,0.22)] active:scale-95 ${
            enSeleccion
              ? "bg-primary-base text-white"
              : "bg-white/90 text-primary-base dark:bg-[rgba(27,31,46,0.9)] dark:text-[var(--color-dark-text)]"
          }`}
          aria-label={enSeleccion ? "Quitar de opciones" : "Guardar como opcion"}
          disabled={!disponible}
        >
          {enSeleccion ? "♥" : "♡"}
        </button>
        {!disponible && <div className="absolute inset-0 bg-[rgba(0,0,0,0.35)] backdrop-brightness-75" />}
      </div>

      <div className="flex flex-col gap-3 p-6 text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary-base">{habitacion.tipo}</p>
            <h3 className="text-xl font-semibold leading-tight">{habitacion.nombre}</h3>
            <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)] line-clamp-2">
              {habitacion.descripcion || "Habitacion del hotel."}
            </p>
          </div>
          <div className="text-right text-sm font-semibold text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
            <p className="text-[11px] uppercase tracking-[0.18em]">Capacidad</p>
            <p>{capacidadLabel}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Tarifa desde</p>
            <p className="text-lg font-bold">${habitacion.precioNoche} / noche</p>
          </div>
          <div className="flex flex-wrap justify-end gap-2 text-[11px] text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
            {habitacion.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-color-primary-extra-light px-3 py-1 text-primary-base dark:bg-[rgba(213,33,81,0.15)]"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] px-4 py-3 text-xs text-[var(--color-text-sub)] dark:border-[var(--color-dark-border)] dark:text-[var(--color-dark-text-sub)]">
          <span>{habitacion.estadoDescripcion || (disponible ? "Lista para reservar" : "No disponible ahora")}</span>
          <span className="text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
            Disponible del {habitacion.disponibleDesde} al {habitacion.disponibleHasta}
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          {disponible ? (
            <>
              <Link
                href={`/paginas/habitaciones/${habitacion.id}`}
                className="flex-1 rounded-full border border-[var(--border)] px-4 py-2 text-center text-sm font-semibold text-[var(--color-text-sub)] transition-colors hover:border-primary-base hover:text-primary-base dark:border-[var(--color-dark-border)] dark:text-[var(--color-dark-text-sub)]"
              >
                Ver detalles
              </Link>
              <Link
                href={`/paginas/reserva?habitacionId=${habitacion.id}`}
                className="flex-1 rounded-full bg-primary-base px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
              >
                Reservar
              </Link>
            </>
          ) : (
            <span className="w-full rounded-full bg-[var(--color-background-light)] px-4 py-2 text-center text-sm font-semibold text-[var(--color-text-sub)] dark:bg-[rgba(255,255,255,0.05)]">
              No disponible por ahora
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

