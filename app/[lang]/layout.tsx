import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../globals.css"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { IdiomaProvider } from "@/components/idioma-provider"
import { IDIOMAS, LOCALE_OG, esIdioma, rutaLocal, type Idioma } from "@/lib/i18n"
import { alternos, siteName, siteUrl } from "@/lib/site"

const inter = Inter({ subsets: ["latin"] })

// Layout raíz por idioma (/es se sirve sin prefijo; ver middleware.ts).
export const dynamicParams = false

export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }))
}

const TEXTOS: Record<Idioma, { titulo: string; descripcion: string; corta: string; keywords: string[] }> = {
  es: {
    titulo: `${siteName} — Vedas, pesquerías y normas de pesca de México`,
    descripcion:
      "Vedas, pesquerías y normas de pesca de México, en un solo lugar: consulta la Carta Nacional Pesquera, las vedas vigentes y las normas oficiales.",
    corta: "Vedas, pesquerías y normas de pesca de México, en un solo lugar.",
    keywords: ["pesca", "pesquerías", "vedas", "normativas", "Carta Nacional Pesquera", "legislación pesquera", "Panorama Pesquero", "México"],
  },
  en: {
    titulo: `${siteName} — Mexico's fishing closures, fisheries and regulations`,
    descripcion:
      "Mexico's fishing closures, fisheries and regulations in one place: explore the National Fisheries Chart, current closures and official standards.",
    corta: "Mexico's fishing closures, fisheries and regulations in one place.",
    keywords: ["fishing", "fisheries", "fishing closures", "regulations", "National Fisheries Chart", "fisheries law", "Panorama Pesquero", "Mexico"],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const idioma: Idioma = esIdioma(lang) ? lang : "es"
  const t = TEXTOS[idioma]
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.titulo, template: `%s · ${siteName}` },
    description: t.descripcion,
    keywords: t.keywords,
    alternates: alternos(idioma, "/"),
    openGraph: {
      title: t.titulo,
      description: t.corta,
      url: `${siteUrl}${rutaLocal(idioma, "/")}`,
      siteName,
      locale: LOCALE_OG[idioma],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: t.titulo, description: t.corta },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!esIdioma(lang)) notFound()

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <IdiomaProvider idioma={lang}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </IdiomaProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
