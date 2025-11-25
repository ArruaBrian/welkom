"use client";

import Encabezado from "../../componentes/organisms/Encabezado";
import Link from "next/link";

const faqs = [
  {
    pregunta: "¿Cómo modifico o cancelo una reserva?",
    respuesta: "Entra a tu correo de confirmación y sigue el enlace de gestionar reserva, o contáctanos por soporte 24/7.",
  },
  {
    pregunta: "¿Cuáles son los horarios de check-in y check-out?",
    respuesta: "Check-in desde las 15:00 y check-out hasta las 11:00. Pregunta por early check-in sujeto a disponibilidad.",
  },
  {
    pregunta: "¿Qué servicios incluye la tarifa?",
    respuesta: "Wi‑Fi, piscina, gimnasio y desayuno continental. Spa y room service se facturan aparte.",
  },
];

export default function PaginaAyuda() {
  return (
    <div className="min-h-screen bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
      <Encabezado />
      <main className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-base">Ayuda</p>
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">
            Centro de ayuda y preguntas frecuentes
          </h1>
          <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
            Resolvemos dudas comunes sobre reservas, servicios y políticas. Si necesitas algo más, ve a la sección de Soporte 24/7.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.pregunta}
              className="flex h-full flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--color-background-white)] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]"
            >
              <h3 className="text-sm font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">{item.pregunta}</h3>
              <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">{item.respuesta}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-color-primary-extra-light p-5 text-sm shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[rgba(213,33,81,0.08)]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">¿Necesitas más ayuda?</h2>
              <p className="text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Escríbenos y uno de nuestros anfitriones te ayudará en minutos.</p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/paginas/soporte"
                className="rounded-full bg-primary-base px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md"
              >
                Ir a soporte 24/7
              </Link>
              <Link
                href="/paginas/contacto"
                className="rounded-full border border-primary-base px-4 py-2 text-sm font-semibold text-primary-base hover:bg-primary-base/10"
              >
                Contacto
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

