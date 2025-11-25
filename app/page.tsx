"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Encabezado from "./componentes/organisms/Encabezado";
import Filtros from "./componentes/molecules/Filtros";
import TarjetaHabitacion from "./componentes/organisms/TarjetaHabitacion";
import { useDisponibilidad } from "./hooks/useDisponibilidad";

function PaginaPrincipal() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filtrosIniciales = useMemo(() => {
    const preferencia = searchParams.get("preferencia") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    const huespedes = searchParams.get("huespedes") || "";
    const tags = (searchParams.get("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    return { preferencia, checkIn, checkOut, huespedes, tags };
  }, [searchParams]);

  const { resultados, actualizarFiltros, filtros } = useDisponibilidad(undefined, filtrosIniciales);

  const sincronizarQuery = (filtros: typeof filtrosIniciales) => {
    const params = new URLSearchParams();
    if (filtros.preferencia) params.set("preferencia", filtros.preferencia);
    if (filtros.checkIn) params.set("checkIn", filtros.checkIn);
    if (filtros.checkOut) params.set("checkOut", filtros.checkOut);
    if (filtros.huespedes) params.set("huespedes", filtros.huespedes);
    if (filtros.tags.length) params.set("tags", filtros.tags.join(","));
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/");
  };

  const manejarBuscar = (next: typeof filtrosIniciales) => {
    actualizarFiltros(next);
    sincronizarQuery(next);
  };

  const manejarTags = (tags: string[]) => {
    const next = { ...filtros, tags };
    actualizarFiltros(next);
    sincronizarQuery(next);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
      <Encabezado onBuscar={manejarBuscar} />

      <main className="mx-auto max-w-6xl px-6 pb-16">
        <section className="flex flex-col gap-3 py-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary-base">
                Guido Hotel
              </p>
              <h1 className="text-3xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">
                Reserva facil y sin complicaciones
              </h1>
              <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                Ajusta fechas, huespedes y guarda tus opciones favoritas. Todo pensado para un check-in tranquilo.
              </p>
            </div>
            <span className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
              Resultados: {resultados.length}
            </span>
          </div>
        </section>

        <Filtros seleccionados={filtros.tags} onCambiar={manejarTags} />

        <AnimatePresence mode="popLayout">
          {resultados.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {resultados.map((habitacion, indice) => (
                <TarjetaHabitacion key={habitacion.id} habitacion={habitacion} prioridad={indice < 3} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="rounded-2xl border border-[var(--border)] bg-[var(--color-background-white)] p-8 text-center text-[var(--color-text-sub)] shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              No encontramos habitaciones para tu busqueda. Intenta con otras fechas o tipo.
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function PaginaPrincipalWrapper() {
  return (
    <Suspense fallback={<div />}>
      <PaginaPrincipal />
    </Suspense>
  );
}

