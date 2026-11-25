import type { Config } from "tailwindcss"
import colores from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

/*
 * Modo nocturno por variables CSS.
 *
 * Los componentes usan clases de la paleta de Tailwind (bg-white, text-gray-600,
 * bg-teal-50, border-teal-200…). En vez de añadir `dark:` a cada una, esas
 * paletas leen variables CSS que cambian bajo `.dark`, con dos escalas:
 *
 * - Superficies (fondos, bordes, degradados, anillos): los tonos claros
 *   (white y 50–300) pasan a tintes oscuros; los tonos saturados (400+) se
 *   quedan igual, así los botones bg-teal-600 con texto blanco no cambian.
 * - Texto (text, fill, stroke, placeholder): la escala se invierte
 *   (700 → 300, 900 → 100…), así text-teal-700 se lee sobre fondo oscuro.
 *
 * Las zonas que siempre son oscuras (hero, footer, encabezados con degradado)
 * llevan la clase `tema-fijo`, que restaura la escala de texto clara.
 */
const PALETAS = ["gray", "teal", "cyan", "blue", "sky", "red", "green", "amber", "yellow", "orange", "lime"] as const
const TONOS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const
type Tono = (typeof TONOS)[number]

// Tono que ocupa cada tono en modo nocturno.
const TEXTO_OSCURO: Record<Tono, Tono> = {
  "50": "950", "100": "900", "200": "800", "300": "700", "400": "500", "500": "400",
  "600": "400", "700": "300", "800": "200", "900": "100", "950": "50",
}
const SUPERFICIE_OSCURA: Partial<Record<Tono, Tono>> = { "50": "950", "100": "900", "200": "800", "300": "700" }
// Los grises claros se usan como fondos de sección y bordes: escalones propios.
const GRIS_SUPERFICIE_OSCURA: Partial<Record<Tono, string>> = {
  "50": "#0d1321", "100": colores.gray[800], "200": colores.gray[800], "300": colores.gray[700],
}
const BLANCO_OSCURO = colores.gray[900]

const canales = (hex: string) => {
  let h = hex.replace("#", "")
  if (h.length === 3) h = h.replace(/./g, (c) => c + c) // colores.white es "#fff"
  const n = parseInt(h, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}
const hexDe = (paleta: string, tono: string): string =>
  (colores as unknown as Record<string, Record<string, string>>)[paleta][tono]

const escala = (prefijo: string) => {
  const resultado: Record<string, string | Record<string, string>> = {
    white: `rgb(var(--${prefijo}-white) / <alpha-value>)`,
  }
  for (const paleta of PALETAS) {
    resultado[paleta] = Object.fromEntries(
      TONOS.map((t) => [t, `rgb(var(--${prefijo}-${paleta}-${t}) / <alpha-value>)`]),
    )
  }
  return resultado
}
const superficie = escala("sup")
const texto = escala("txt")

const variablesTextoClaras = () => {
  const v: Record<string, string> = { "--txt-white": canales(colores.white) }
  for (const p of PALETAS) for (const t of TONOS) v[`--txt-${p}-${t}`] = canales(hexDe(p, t))
  return v
}

const variablesTema = plugin(({ addBase }) => {
  const claro: Record<string, string> = { ...variablesTextoClaras(), "--sup-white": canales(colores.white) }
  const oscuro: Record<string, string> = { "--sup-white": canales(BLANCO_OSCURO) }
  for (const p of PALETAS) {
    for (const t of TONOS) {
      claro[`--sup-${p}-${t}`] = canales(hexDe(p, t))
      oscuro[`--txt-${p}-${t}`] = canales(hexDe(p, TEXTO_OSCURO[t]))
      const sup = p === "gray" ? GRIS_SUPERFICIE_OSCURA[t] : SUPERFICIE_OSCURA[t] && hexDe(p, SUPERFICIE_OSCURA[t]!)
      if (sup) oscuro[`--sup-${p}-${t}`] = canales(sup)
    }
  }
  addBase({
    ":root": claro,
    ".dark": oscuro,
    ".dark .tema-fijo": variablesTextoClaras(),
  })
})

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}", // clases de CATEGORY_META y otras tablas de datos
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundColor: superficie,
      borderColor: superficie,
      gradientColorStops: superficie,
      ringColor: superficie,
      ringOffsetColor: superficie,
      textColor: texto,
      fill: texto,
      stroke: texto,
      placeholderColor: texto,
      textDecorationColor: texto,
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), variablesTema],
} satisfies Config

export default config
