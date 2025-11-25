import Link from "next/link";
import Logo from "../atoms/Logo";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-dark-text)]">{title}</h3>
    {children}
  </div>
);

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-gradient-to-b from-white via-color-primary-extra-light/40 to-white text-[var(--color-text-sub)] dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)] dark:text-[var(--color-dark-text-sub)]">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-primary-base/10 px-4 py-3 text-primary-base shadow-sm dark:bg-primary-base/15">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em]">Guido Hotel</p>
              <p className="text-sm text-primary-base">Estancias hechas a tu medida</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-primary-base">
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">Piscina y spa</span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">Check-in 24/7</span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">Wi-Fi incluido</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex items-start gap-3">
            <Logo size={44} ariaLabel="Logo Guido Hotel" />
            <div className="space-y-1">
              <p className="text-sm text-[var(--color-text-sub)] dark:text-[var(--color-dark-text-sub)]">
                contacto@guidohotel.com | +00 0000-0000
              </p>
            </div>
          </div>

          <Section title="Explora">
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/paginas/habitaciones" className="hover:text-primary-base">
                  Habitaciones
                </Link>
              </li>
              <li>
                <Link href="/paginas/opciones" className="hover:text-primary-base">
                  Opciones guardadas
                </Link>
              </li>
              <li>
                <Link href="/paginas/ayuda" className="hover:text-primary-base">
                  Ayuda
                </Link>
              </li>
            </ul>
          </Section>

          <Section title="Contacto">
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/paginas/contacto" className="hover:text-primary-base">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/paginas/soporte" className="hover:text-primary-base">
                  Soporte 24/7
                </Link>
              </li>
              <li>
                <Link href="/paginas/politica-cancelacion" className="hover:text-primary-base">
                  Politica de cancelacion
                </Link>
              </li>
            </ul>
          </Section>
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--color-background-white)] px-6 py-4 text-center text-xs text-[var(--color-text-sub)] dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)] dark:text-[var(--color-dark-text-sub)]">
        (c) {new Date().getFullYear()} Guido Hotel. Todos los derechos reservados.
      </div>
    </footer>
  );
}
