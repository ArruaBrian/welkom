import { Room } from "../../src/api/rooms";
import { Habitacion } from "../datos/habitaciones";

export function mapRoomToHabitacion(room: Room): Habitacion {
  return {
    id: room.id,
    nombre: room.roomWrapper?.name || room.name || "",
    descripcion: room.roomWrapper?.description || room.description || "",
    capacidad: room.roomWrapper?.capacity || room.capacity_people || room.capacity || 0,
    amenities: room.roomWrapper?.amenities || [],
    precioNoche: Number(room.roomWrapper?.price_per_night || room.price_per_night || room.price || 0),
    imagen: "",
    disponibleDesde: "2025-01-01",
    disponibleHasta: "2025-12-31",
    tipo: room.roomWrapper?.name || room.name || "Estandar",
    piso: 1,
    estado: room.roomStatus?.name || room.status,
    estadoDescripcion: room.roomStatus?.description,
    maxAdultos: room.roomWrapper?.max_adults,
    maxNinos: room.roomWrapper?.max_children,
    maxBebes: room.roomWrapper?.max_infants,
    cunaDisponible: room.roomWrapper?.crib_available,
    extraCamaDisponible: room.roomWrapper?.extra_bed_available,
    idPiso: room.roomWrapper?.id_floor,
  };
}
