"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export type Tema = "claro" | "oscuro";

const obtenerTemaInicial = (): Tema => {
  if (typeof window === "undefined") return "claro";
  const guardado = localStorage.getItem("tema");
  if (guardado === "oscuro" || guardado === "claro") return guardado;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "oscuro"
    : "claro";
};

export function useTemaState() {
  const [tema, setTema] = useState<Tema>(() => obtenerTemaInicial());
  const [mostrandoIndicador, setMostrandoIndicador] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Limpia temporizadores si hay desmontaje
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Sincroniza el tema con el DOM/localStorage
  useEffect(() => {
    const raiz = document.documentElement;
    if (tema === "oscuro") raiz.classList.add("dark");
    else raiz.classList.remove("dark");
    localStorage.setItem("tema", tema);
  }, [tema]);

  const alternarTema = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMostrandoIndicador(true);
    setTema((prev) => (prev === "oscuro" ? "claro" : "oscuro"));
    timeoutRef.current = window.setTimeout(
      () => setMostrandoIndicador(false),
      1100
    );
  }, []);

  const overlay: ReactNode = useMemo(() => {
    const icono = tema === "oscuro" ? "🌙" : "☀️";
    const texto = tema === "oscuro" ? "Modo oscuro" : "Modo claro";
    if (typeof document === "undefined") return null;

    return createPortal(
      <AnimatePresence mode="wait">
        {mostrandoIndicador && (
          <motion.div
            key={tema}
            className="pointer-events-none fixed inset-0 z-[9999] grid h-screen w-screen place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -14, y: 20, opacity: 0 }}
              animate={{
                scale: 1,
                rotate: 0,
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: [0.25, 1.1, 0.3, 1] },
              }}
              exit={{
                scale: 0.65,
                rotate: 10,
                y: -16,
                opacity: 0,
                transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              }}
              className="flex items-center gap-4 rounded-full border-2 border-primary-base bg-white/94 px-10 py-5 text-2xl font-bold text-primary-base shadow-[0_26px_70px_rgba(0,0,0,0.22)] ring-2 ring-primary-base/24 backdrop-blur-2xl dark:border-primary-base dark:bg-[rgba(22,25,38,0.94)] dark:text-color-dark-text"
            >
              <motion.span
                key={icono}
                initial={{ rotate: -32, scale: 0.4, opacity: 0 }}
                animate={{ rotate: [0, -16, 14, -8, 0], scale: 1, opacity: 1 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="text-4xl"
              >
                {icono}
              </motion.span>
              <span>{texto}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  }, [mostrandoIndicador, tema]);

  return { tema, alternarTema, overlay };
}
