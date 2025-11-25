import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProveedorTema } from "./proveedores/ProveedorTema";
import { ProveedorFavoritos } from "./proveedores/ProveedorFavoritos";
import { ProveedorPerfil } from "./proveedores/ProveedorPerfil";
import Script from "next/script";
import Footer from "./componentes/organisms/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guido Hotel",
  description: "Portal de reservas y autogestión de Guido Hotel.",
  applicationName: "Guido Hotel",
  keywords: ["hotel", "reservas", "habitaciones", "autogestion"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Guido Hotel",
    description: "Portal de reservas y autogestión de Guido Hotel.",
    url: "/",
    siteName: "Guido Hotel",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guido Hotel",
    description: "Portal de reservas y autogestión de Guido Hotel.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"
          strategy="afterInteractive"
        />
        <ProveedorTema>
          <ProveedorPerfil>
            <ProveedorFavoritos>
              <div className="flex min-h-screen flex-col bg-[var(--color-background-white)] text-foreground dark:bg-[var(--color-dark-background)]">
                <div className="flex-1">{children}</div>
                <Footer />
              </div>
            </ProveedorFavoritos>
          </ProveedorPerfil>
        </ProveedorTema>
      </body>
    </html>
  );
}

