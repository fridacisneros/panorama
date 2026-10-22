import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { siteName, siteUrl } from "@/lib/site"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Vedas, pesquerías y normas de pesca de México`,
    template: `%s · ${siteName}`,
  },
  description:
    "Vedas, pesquerías y normas de pesca de México, en un solo lugar: consulta la Carta Nacional Pesquera, las vedas vigentes y las normas oficiales.",
  keywords: [
    "pesca",
    "pesquerías",
    "vedas",
    "normativas",
    "Carta Nacional Pesquera",
    "legislación pesquera",
    "Panorama Pesquero",
    "México",
  ],
  openGraph: {
    title: `${siteName} — Vedas, pesquerías y normas de pesca de México`,
    description:
      "Vedas, pesquerías y normas de pesca de México, en un solo lugar.",
    url: siteUrl,
    siteName,
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Vedas, pesquerías y normas de pesca de México`,
    description:
      "Vedas, pesquerías y normas de pesca de México, en un solo lugar.",
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
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
