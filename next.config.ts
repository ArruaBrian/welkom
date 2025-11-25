import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que el lint corte el build en CI; seguimos pudiendo correrlo manualmente.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Genera un bundle standalone en lugar de lambdas por ruta.
  output: "standalone",
};

export default nextConfig;
