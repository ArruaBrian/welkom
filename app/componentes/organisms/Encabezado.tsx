"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ParametrosBusqueda } from "../../hooks/useDisponibilidad";
import { useFavoritos } from "../../proveedores/ProveedorFavoritos";
import { useTema } from "../../proveedores/ProveedorTema";
import BarraBusqueda from "../molecules/BarraBusqueda";
import BotonOpciones from "../atoms/BotonOpciones";
import BotonTema from "../atoms/BotonTema";
import Logo from "../atoms/Logo";

const Slogan = ({ mostrar, texto }: { mostrar: boolean; texto: string }) => (
  <div className="relative h-6 overflow-hidden">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={mostrar ? "slogan" : "nombre"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="block text-base font-semibold text-primary-base"
      >
        {mostrar ? texto : "Guido Hotel"}
      </motion.span>
    </AnimatePresence>
  </div>
);

type Props = { onBuscar?: (params: ParametrosBusqueda) => void };

export default function Encabezado({ onBuscar }: Props) {
  const { tema, alternarTema } = useTema();
  const { registrarObjetivo } = useFavoritos();
  const [mostrarSlogan, setMostrarSlogan] = useState(false);
  const slogan = "Un hogar, cerca de ti";

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-white/90 backdrop-blur-md transition-colors duration-500 dark:border-[var(--color-dark-border)] dark:bg-[rgba(16,17,24,0.92)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            onMouseEnter={() => setMostrarSlogan(true)}
            onMouseLeave={() => setMostrarSlogan(false)}
          >
            <Logo size={36} ariaLabel="Logo Guido Hotel" />
            <Slogan mostrar={mostrarSlogan} texto={slogan} />
          </Link>

          <div className="flex items-center gap-3">
            <BotonOpciones refObjetivo={registrarObjetivo} />
            <BotonTema onClick={alternarTema} tema={tema} />
          </div>
        </div>

        <div className="w-full">
          <BarraBusqueda onBuscar={onBuscar} />
        </div>
      </div>
    </header>
  );
}

