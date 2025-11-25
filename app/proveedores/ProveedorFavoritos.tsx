"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

 type ConfettiOptions = {
  particleCount?: number;
  startVelocity?: number;
  spread?: number;
  origin?: { x: number; y: number };
  gravity?: number;
  scalar?: number;
  ticks?: number;
  colors?: string[];
};

type FavoritosContexto = {
  favoritos: Set<string>;
  alternarFavorito: (id: string, origenBtn?: DOMRect) => void;
  estaEnFavoritos: (id: string) => boolean;
  registrarObjetivo: (el: HTMLElement | null) => void;
};

const ContextoFavoritos = createContext<FavoritosContexto | undefined>(undefined);

declare global {
  interface Window {
    confetti?: (opts: ConfettiOptions) => void;
  }
}

export function ProveedorFavoritos({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const objetivoEl = useRef<HTMLElement | null>(null);
  const objetivoRect = useRef<DOMRect | null>(null);

  const registrarObjetivo = useCallback((el: HTMLElement | null) => {
    objetivoEl.current = el;
    objetivoRect.current = el ? el.getBoundingClientRect() : null;
  }, []);

  useEffect(() => {
    const actualizar = () => {
      if (objetivoEl.current) {
        objetivoRect.current = objetivoEl.current.getBoundingClientRect();
      }
    };
    window.addEventListener("resize", actualizar);
    window.addEventListener("scroll", actualizar, { passive: true });
    return () => {
      window.removeEventListener("resize", actualizar);
      window.removeEventListener("scroll", actualizar);
    };
  }, []);

  const lanzarConfetti = useCallback((origenBtn?: DOMRect) => {
    if (!window.confetti) return;
    const rectActual =
      origenBtn || objetivoEl.current?.getBoundingClientRect() || objetivoRect.current;
    const x =
      (rectActual?.left ?? window.innerWidth - 40) / window.innerWidth +
      ((rectActual?.width ?? 32) / window.innerWidth) / 2;
    const y =
      (rectActual?.top ?? 20) / window.innerHeight +
      ((rectActual?.height ?? 32) / window.innerHeight) / 2;

    window.confetti({
      particleCount: 36,
      startVelocity: 28,
      spread: 70,
      origin: { x, y },
      gravity: 0.9,
      scalar: 0.8,
      ticks: 120,
      colors: ["#d72459", "#ffb703", "#22c55e", "#3b82f6", "#8b5cf6"],
    });
  }, []);

  const alternarFavorito = useCallback(
    (id: string, origenBtn?: DOMRect) => {
      setFavoritos((prev) => {
        const nuevo = new Set(prev);
        if (nuevo.has(id)) {
          nuevo.delete(id);
        } else {
          nuevo.add(id);
          lanzarConfetti(origenBtn);
        }
        return nuevo;
      });
    },
    [lanzarConfetti]
  );

  const estaEnFavoritos = useCallback(
    (id: string) => favoritos.has(id),
    [favoritos]
  );

  return (
    <ContextoFavoritos.Provider
      value={{ favoritos, alternarFavorito, estaEnFavoritos, registrarObjetivo }}
    >
      {children}
    </ContextoFavoritos.Provider>
  );
}

export function useFavoritos() {
  const ctx = useContext(ContextoFavoritos);
  if (!ctx) throw new Error("useFavoritos debe usarse dentro de ProveedorFavoritos");
  return ctx;
}
