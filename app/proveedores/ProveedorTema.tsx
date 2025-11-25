"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTemaState, Tema } from "../hooks/useTema";

type ContextoTema = { tema: Tema; alternarTema: () => void };

const TemaContexto = createContext<ContextoTema | undefined>(undefined);

export function ProveedorTema({ children }: { children: ReactNode }) {
  const { tema, alternarTema, overlay } = useTemaState();

  return (
    <TemaContexto.Provider value={{ tema, alternarTema }}>
      {overlay}
      {children}
    </TemaContexto.Provider>
  );
}

export function useTema() {
  const ctx = useContext(TemaContexto);
  if (!ctx) throw new Error("useTema debe usarse dentro de ProveedorTema");
  return ctx;
}
