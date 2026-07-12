import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// URL del sitio en producción (para resolver la imagen al compartir).
// Configura NEXT_PUBLIC_SITE_URL en el hosting; el fallback es solo para local.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Panorama — Legislación pesquera de México",
    template: "%s · Panorama",
  },
  description:
    "Plataforma de consulta para navegar la legislación pesquera mexicana: pesquerías, vedas y normativas de la Carta Nacional Pesquera.",
  keywords: [
    "pesca",
    "pesquerías",
    "vedas",
    "normativas",
    "Carta Nacional Pesquera",
    "legislación pesquera",
    "México",
  ],
  openGraph: {
    title: "Panorama — Legislación pesquera de México",
    description:
      "Consulta pesquerías, vedas y normativas de la Carta Nacional Pesquera en un solo lugar.",
    url: siteUrl,
    siteName: "Panorama",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panorama — Legislación pesquera de México",
    description:
      "Consulta pesquerías, vedas y normativas de la Carta Nacional Pesquera en un solo lugar.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
