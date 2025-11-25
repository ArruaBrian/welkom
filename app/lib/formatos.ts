export const normalizarTexto = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const parseFechaIso = (valor: string) => {
  const fecha = new Date(valor);
  return isNaN(fecha.getTime()) ? null : fecha;
};

export const formatearFechaCorta = (iso: string) => {
  if (!iso) return "";
  const fecha = parseFechaIso(iso);
  if (!fecha) return "";
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  });
};
