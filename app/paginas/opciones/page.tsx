"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Encabezado from "../../componentes/organisms/Encabezado";
import TarjetaHabitacion from "../../componentes/organisms/TarjetaHabitacion";
import Filtros from "../../componentes/molecules/Filtros";
import { useFavoritos } from "../../proveedores/ProveedorFavoritos";
import { useDisponibilidad } from "../../hooks/useDisponibilidad";

function PaginaOpcionesInner() {
  const { favoritos } = useFavoritos();
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

  const resultadosFavoritos = useMemo(
    () => resultados.filter((item) => favoritos.has(item.id)),
    [resultados, favoritos]
  );

  const sincronizarQuery = (f: typeof filtrosIniciales) => {
    const params = new URLSearchParams();
    if (f.preferencia) params.set("preferencia", f.preferencia);
    if (f.checkIn) params.set("checkIn", f.checkIn);
    if (f.checkOut) params.set("checkOut", f.checkOut);
    if (f.huespedes) params.set("huespedes", f.huespedes);
    if (f.tags.length) params.set("tags", f.tags.join(","));
    const qs = params.toString();
    router.replace(qs ? `/paginas/opciones?${qs}` : "/paginas/opciones");
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
    <div className="min-h-screen bg-background text-foreground">
      <Encabezado onBuscar={manejarBuscar} />

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-6">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-base">Opciones guardadas</p>
            <h1 className="text-3xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">
              Habitaciones que te interesan
            </h1>
          </div>
          <span className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
            Total: {resultadosFavoritos.length}
          </span>
        </div>

        <Filtros seleccionados={filtros.tags} onCambiar={manejarTags} />

        <AnimatePresence mode="popLayout">
          {resultadosFavoritos.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {resultadosFavoritos.map((habitacion, indice) => (
                <TarjetaHabitacion key={habitacion.id} habitacion={habitacion} prioridad={indice < 3} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--color-background-white)] p-8 text-center text-[var(--color-text-sub)] shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Aun no tienes opciones guardadas. Usa el corazon en las habitaciones para agregarlas.
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function PaginaOpciones() {
  return (
    <Suspense fallback={<div />}>
      <PaginaOpcionesInner />
    </Suspense>
  );
}

