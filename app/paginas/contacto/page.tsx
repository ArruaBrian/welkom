"use client";

import Encabezado from "../../componentes/organisms/Encabezado";

export default function PaginaContacto() {
  return (
    <div className="min-h-screen bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
      <Encabezado />
      <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-base">Contacto</p>
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">Estamos para ayudarte</h1>
          <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Envía tus consultas sobre reservas, eventos o soporte. Responderemos a la brevedad.</p>
        </div>

        <div className="grid gap-6 rounded-2xl border border-[var(--border)] bg-[var(--color-background-white)] p-6 shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)] md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">Datos de contacto</h2>
            <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Email: contacto@guidohotel.com</p>
            <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Teléfono: +00 0000-0000</p>
            <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">Soporte 24/7 para huéspedes.</p>
            <div className="rounded-xl bg-color-primary-extra-light px-4 py-3 text-sm text-primary-base dark:bg-[rgba(213,33,81,0.12)]">
              ¿Preferís hablar? Solicita una llamada y te contactaremos.
            </div>
          </div>
          <form className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]" placeholder="Tu nombre" />
              <input className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]" placeholder="Tu email" />
            </div>
            <input className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]" placeholder="Asunto" />
            <textarea className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]" rows={4} placeholder="Escribe tu mensaje"></textarea>
            <button type="submit" className="w-full rounded-full bg-primary-base px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md">Enviar</button>
          </form>
        </div>
      </main>
    </div>
  );
}

