"use client";

import { createContext, useContext, ReactNode } from "react";

type Perfil = "GuidoHotel";
type ContextoPerfil = {
  perfil: Perfil;
  usarApi: boolean;
};

const PerfilContexto = createContext<ContextoPerfil | undefined>(undefined);
const valorPerfil: ContextoPerfil = {
  perfil: "GuidoHotel",
  usarApi: true,
};

export function ProveedorPerfil({ children }: { children: ReactNode }) {
  return <PerfilContexto.Provider value={valorPerfil}>{children}</PerfilContexto.Provider>;
}

export function usePerfil() {
  const ctx = useContext(PerfilContexto);
  if (!ctx) throw new Error("usePerfil debe usarse dentro de ProveedorPerfil");
  return ctx;
}
