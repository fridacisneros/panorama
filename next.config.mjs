/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint no está configurado en este proyecto; se omite en el build.
    // Para activarlo: configurar ESLint (next lint) y poner esto en false.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // La verificación de tipos SÍ se aplica en el build (los tipos están limpios).
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
