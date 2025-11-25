"use client";

type Props = {
  seleccionados: string[];
  onCambiar: (tags: string[]) => void;
};

const etiquetas = [
  "Suite",
  "Deluxe",
  "Estandar",
  "Vista al mar",
  "Balcon",
  "Desayuno incluido",
  "Spa",
];

export default function Filtros({ seleccionados, onCambiar }: Props) {
  const alternar = (tag: string) => {
    const existe = seleccionados.includes(tag);
    const nuevo = existe
      ? seleccionados.filter((t) => t !== tag)
      : [...seleccionados, tag];
    onCambiar(nuevo);
  };

  const limpiar = () => onCambiar([]);

  return (
    <section className="flex flex-wrap items-center gap-3 py-4">
      {etiquetas.map((etiqueta) => {
        const activo = seleccionados.includes(etiqueta);
        return (
          <button
            key={etiqueta}
            onClick={() => alternar(etiqueta)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-transform duration-200 ease-out ${
              activo
                ? "border-primary-base bg-color-primary-extra-light text-primary-base shadow-[0_10px_25px_rgba(213,33,81,0.18)]"
                : "border-[var(--border)] text-[var(--color-text-sub)] hover:-translate-y-0.5 hover:border-primary-base hover:text-primary-base hover:shadow-[0_10px_25px_rgba(213,33,81,0.18)] dark:border-[var(--color-dark-border)] dark:text-[var(--color-dark-text-sub)]"
            }`}
          >
            {etiqueta}
          </button>
        );
      })}
      {seleccionados.length > 0 && (
        <button
          onClick={limpiar}
          className="ml-auto cursor-pointer rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--color-text-sub)] transition hover:border-primary-base hover:text-primary-base dark:border-[var(--color-dark-border)] dark:text-[var(--color-dark-text-sub)]"
        >
          Limpiar
        </button>
      )}
    </section>
  );
}
