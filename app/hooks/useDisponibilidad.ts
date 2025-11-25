"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Habitacion, habitaciones as fallbackHabitaciones } from "../datos/habitaciones";
import { normalizarTexto, parseFechaIso } from "../lib/formatos";
import { getRooms, Room } from "../../src/api/rooms";
import { mapRoomToHabitacion } from "../lib/mapRoom";

export type ParametrosBusqueda = {
  preferencia: string;
  checkIn: string;
  checkOut: string;
  huespedes: string;
  tags: string[];
};

type Inicial = Partial<ParametrosBusqueda>;

const filtrosVacios: ParametrosBusqueda = {
  preferencia: "",
  checkIn: "",
  checkOut: "",
  huespedes: "",
  tags: [],
};

export function useDisponibilidad(
  lista: Habitacion[] = fallbackHabitaciones,
  inicial: Inicial = {}
) {
  const [roomsApi, setRoomsApi] = useState<Habitacion[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        console.log("[useDisponibilidad] fetch rooms desde API");
        const apiRooms: Room[] = await getRooms();
        console.log("[useDisponibilidad] rooms API recibidas", apiRooms.length);
        const mapeadas: Habitacion[] = apiRooms.map(mapRoomToHabitacion);
        setRoomsApi(mapeadas);
      } catch (err) {
        console.error("[useDisponibilidad] error al traer rooms API", err);
      }
    };
    fetchRooms();
    const id = setInterval(fetchRooms, 15000);
    return () => clearInterval(id);
  }, []);

  const [filtros, setFiltros] = useState<ParametrosBusqueda>({
    ...filtrosVacios,
    ...inicial,
  });

  const inicialKey = useMemo(
    () =>
      JSON.stringify({
        preferencia: inicial.preferencia || "",
        checkIn: inicial.checkIn || "",
        checkOut: inicial.checkOut || "",
        huespedes: inicial.huespedes || "",
        tags: Array.isArray(inicial.tags) ? inicial.tags : [],
      }),
    [inicial.preferencia, inicial.checkIn, inicial.checkOut, inicial.huespedes, inicial.tags]
  );

  const prevInicialKey = useRef<string | null>(null);
  useEffect(() => {
    if (prevInicialKey.current === inicialKey) return;
    prevInicialKey.current = inicialKey;
    const t = setTimeout(() => {
      setFiltros({
        ...filtrosVacios,
        ...inicial,
      });
    }, 0);
    return () => clearTimeout(t);
  }, [inicialKey, inicial]);

  const resultados = useMemo(() => {
    const fuente = roomsApi.length > 0 ? roomsApi : lista;
    console.log("[useDisponibilidad] fuente", roomsApi.length > 0 ? "API guidoHotel" : "local fallback", "items:", fuente.length);
    const termino = normalizarTexto(filtros.preferencia.trim());
    const checkIn = parseFechaIso(filtros.checkIn);
    const checkOut = parseFechaIso(filtros.checkOut);
    const huespedes = parseInt(filtros.huespedes, 10);
    const tags = filtros.tags?.map((t) => normalizarTexto(t)) || [];

    const filtradas = fuente.filter((habitacion) => {
      const texto = normalizarTexto(
        `${habitacion.nombre} ${habitacion.descripcion} ${habitacion.amenities.join(" ")} ${habitacion.tipo}`
      );
      if (termino && !texto.includes(termino)) return false;

      if (!Number.isNaN(huespedes) && huespedes > habitacion.capacidad) return false;

      if (tags.length) {
        const hayAlgunaCoincidencia = tags.some(
          (tag) =>
            texto.includes(tag) ||
            normalizarTexto(String(habitacion.precioNoche)).includes(tag)
        );
        if (!hayAlgunaCoincidencia) return false;
      }

      const disponibleDesde = parseFechaIso(habitacion.disponibleDesde);
      const disponibleHasta = parseFechaIso(habitacion.disponibleHasta);

      if (checkIn && disponibleDesde && checkIn < disponibleDesde) return false;
      if (checkOut && disponibleHasta && checkOut > disponibleHasta) return false;
      if (checkIn && checkOut && checkOut < checkIn) return false;

      return true;
    });
    // Ordena: disponibles primero, luego el resto
    return filtradas.sort((a, b) => {
      const dispA = a.estado?.toLowerCase().includes("disponible") ? 0 : 1;
      const dispB = b.estado?.toLowerCase().includes("disponible") ? 0 : 1;
      if (dispA !== dispB) return dispA - dispB;
      return a.nombre.localeCompare(b.nombre);
    });
  }, [filtros, lista, roomsApi]);

  return { filtros, resultados, actualizarFiltros: setFiltros };
}
