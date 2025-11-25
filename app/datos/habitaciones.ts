export type Habitacion = {
  id: string;
  nombre: string;
  descripcion: string;
  capacidad: number;
  amenities: string[];
  precioNoche: number;
  imagen: string;
  disponibleDesde: string;
  disponibleHasta: string;
  tipo: "Suite" | "Deluxe" | "Estandar";
  piso: number;
  estado?: string;
  estadoDescripcion?: string;
  maxAdultos?: number;
  maxNinos?: number;
  maxBebes?: number;
  cunaDisponible?: boolean;
  extraCamaDisponible?: boolean;
  idPiso?: string;
};

export const habitaciones: Habitacion[] = [
  {
    id: "suite-imperial",
    nombre: "Suite Imperial",
    descripcion:
      "Suite amplia con vista al mar, sala de estar independiente y detalles clásicos.",
    capacidad: 4,
    amenities: ["Vista al mar", "Sala de estar", "Servicio de mayordomo", "Desayuno incluido"],
    precioNoche: 950,
    imagen: "/images/suite-imperial.jpg",
    disponibleDesde: "2025-01-01",
    disponibleHasta: "2025-12-31",
    tipo: "Suite",
    piso: 8,
    estado: "Disponible",
    estadoDescripcion: "Habitación disponible para reservar",
    maxAdultos: 4,
    maxNinos: 1,
    maxBebes: 1,
    cunaDisponible: true,
    extraCamaDisponible: true,
    idPiso: "piso-8",
  },
  {
    id: "suite-avenida",
    nombre: "Suite Avenida",
    descripcion: "Suite elegante con balcón a la ciudad, perfecta para escapadas románticas.",
    capacidad: 3,
    amenities: ["Balcón", "Vista ciudad", "Desayuno incluido", "Cafetera premium"],
    precioNoche: 720,
    imagen: "/images/suite-avenida.jpg",
    disponibleDesde: "2025-01-01",
    disponibleHasta: "2025-12-31",
    tipo: "Suite",
    piso: 6,
    estado: "Disponible",
    estadoDescripcion: "Habitación disponible para reservar",
    maxAdultos: 3,
    maxNinos: 1,
    maxBebes: 1,
    cunaDisponible: true,
    extraCamaDisponible: false,
    idPiso: "piso-6",
  },
  {
    id: "deluxe-mar",
    nombre: "Deluxe Vista Mar",
    descripcion: "Habitación amplia con cama king y vista parcial al mar.",
    capacidad: 2,
    amenities: ["Vista parcial al mar", "Wi-Fi", "Desayuno incluido"],
    precioNoche: 520,
    imagen: "/images/deluxe-mar.jpg",
    disponibleDesde: "2025-01-15",
    disponibleHasta: "2025-12-31",
    tipo: "Deluxe",
    piso: 5,
    estado: "Disponible",
    estadoDescripcion: "Habitación disponible para reservar",
    maxAdultos: 2,
    maxNinos: 1,
    maxBebes: 1,
    cunaDisponible: true,
    extraCamaDisponible: false,
    idPiso: "piso-5",
  },
  {
    id: "deluxe-ciudad",
    nombre: "Deluxe Vista Ciudad",
    descripcion: "Confort moderno con vista a la ciudad y acceso a piscina.",
    capacidad: 2,
    amenities: ["Vista ciudad", "Wi-Fi", "Piscina"],
    precioNoche: 430,
    imagen: "/images/deluxe-ciudad.jpg",
    disponibleDesde: "2025-02-01",
    disponibleHasta: "2025-11-30",
    tipo: "Deluxe",
    piso: 4,
    estado: "Mantenimiento",
    estadoDescripcion: "Temporalmente no disponible",
    maxAdultos: 2,
    maxNinos: 0,
    maxBebes: 0,
    cunaDisponible: false,
    extraCamaDisponible: false,
    idPiso: "piso-4",
  },
  {
    id: "estandar-king",
    nombre: "Estandar King",
    descripcion: "Habitación acogedora con cama king y todas las comodidades esenciales.",
    capacidad: 2,
    amenities: ["Cama king", "Wi-Fi", "Room service 24/7"],
    precioNoche: 310,
    imagen: "/images/estandar-king.jpg",
    disponibleDesde: "2025-01-10",
    disponibleHasta: "2025-12-20",
    tipo: "Estandar",
    piso: 3,
    estado: "Disponible",
    estadoDescripcion: "Habitación disponible para reservar",
    maxAdultos: 2,
    maxNinos: 0,
    maxBebes: 0,
    cunaDisponible: false,
    extraCamaDisponible: false,
    idPiso: "piso-3",
  },
  {
    id: "estandar-doble",
    nombre: "Estandar Doble",
    descripcion: "Opción eficiente con dos camas individuales, ideal para amigos o familias.",
    capacidad: 2,
    amenities: ["Dos camas", "Wi-Fi", "Room service 24/7"],
    precioNoche: 280,
    imagen: "/images/estandar-doble.jpg",
    disponibleDesde: "2025-03-01",
    disponibleHasta: "2025-09-30",
    tipo: "Estandar",
    piso: 2,
    estado: "No disponible",
    estadoDescripcion: "Ocupada o en preparación",
    maxAdultos: 2,
    maxNinos: 0,
    maxBebes: 0,
    cunaDisponible: false,
    extraCamaDisponible: false,
    idPiso: "piso-2",
  },
];
