# Guido Hotel – Portal de reservas (Next.js)

Aplicación web para gestionar reservas de un hotel único (Guido Hotel). Incluye búsqueda por fechas/huéspedes, selección de opciones guardadas, detalle de habitación, flujo de reserva y páginas de ayuda/soporte/contacto. Arquitectura basada en componentes atómicos (atoms/molecules/organisms) y hooks reutilizables.

## Tecnologías
- Next.js (App Router) + React
- TypeScript
- Tailwind/utility classes (en `globals.css`)
- Framer Motion (animaciones ligeras)

## Estructura principal
```
app/
  componentes/
    atoms/         # Logo, botones básicos
    molecules/     # BarraBusqueda, Filtros
    organisms/     # Encabezado, Footer, TarjetaHabitacion, ReservaForm
  datos/           # Mock de habitaciones locales
  hooks/           # Hooks de UI (useDisponibilidad, useTema, etc.)
  paginas/         # Rutas: habitaciones, reserva, opciones, ayuda, contacto, soporte, política
  lib/             # Utilidades (formatos, mapRoom)
  layout.tsx       # Proveedores globales (tema, favoritos, perfil) + Footer
src/
  api/             # Cliente REST a la API real (rooms, bookings, etc.)
  hooks/           # Hooks de datos (useRoom, useRooms, useCreateBooking, ...)
```

## Proveedores
- `ProveedorTema`: tema claro/oscuro y overlay de feedback.
- `ProveedorFavoritos`: gestiona “opciones guardadas” con confetti.
- `ProveedorPerfil`: perfil fijo (GuidoHotel) y flag para usar la API.

## Hooks destacados
- `app/hooks/useDisponibilidad`: filtra habitaciones por búsqueda, fechas, huéspedes y tags. Usa API (`src/api/rooms`) con fallback local.
- `src/hooks/useRooms` / `useRoom`: obtienen listado o detalle desde la API, con polling opcional.
- `src/hooks/useCreateBooking`: helpers para crear reservas (incluye `useCreateSimpleBooking`).

## Rutas clave
- `/` y `/paginas/habitaciones`: listado con filtros, tarjetas y opciones guardadas.
- `/paginas/habitaciones/[id]`: detalle de habitación.
- `/paginas/reserva`: formulario de reserva (rellena si viene con `habitacionId` en query).
- `/paginas/opciones`: lista de favoritos (opciones guardadas).
- `/paginas/ayuda`, `/paginas/contacto`, `/paginas/soporte`, `/paginas/politica-cancelacion`: contenido informativo.

## Configuración
1) Instala dependencias en el root del proyecto:
```bash
npm install
```
2) Ejecuta en modo dev:
```bash
npm run dev
```
3) Variables de entorno: define `API_BASE_URL` si personalizas el cliente REST (ver `src/api/client.ts`).

## Estándares y buenas prácticas
- Componentes organizados por atomic design (atoms/molecules/organisms).
- Hooks separados por capa: UI (app/hooks) vs datos/API (src/hooks).
- Textos en español, copy humano y sin referencias al proyecto anterior.
- Imágenes de respaldo en `/public/images/placeholder-room.svg`.
- Sin lógica de múltiples hoteles: todo apunta a un único hotel.

## Próximos pasos sugeridos
- Integrar imágenes reales por habitación desde la API o CMS.
- Añadir validaciones/formato de fechas y máscaras de inputs.
- Consolidar hooks en un único namespace si se prefiere (p.ej. mover todo a `src/hooks`).
- Agregar pruebas básicas de componentes y hooks (Jest/RTL) si se necesita cobertura.
