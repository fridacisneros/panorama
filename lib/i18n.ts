// Idiomas del sitio. El español es el predeterminado y vive en las rutas sin
// prefijo (/especies, /vedas…); el inglés, bajo /en (/en/especies…). Por dentro
// todas las páginas están en app/[lang]/ y middleware.ts reescribe las rutas sin
// prefijo a /es/….
//
// Sólo se traduce la interfaz: los contenidos (fichas de la CNP, vedas, normas)
// se muestran en el español de sus fuentes oficiales. Los valores cortos que
// vienen de los datos y funcionan como etiquetas (regiones, tipos de veda,
// estado de aprovechamiento…) sí se traducen con las funciones de abajo.

export const IDIOMAS = ["es", "en"] as const
export type Idioma = (typeof IDIOMAS)[number]
export const IDIOMA_PREDETERMINADO: Idioma = "es"

export const esIdioma = (valor: unknown): valor is Idioma => IDIOMAS.includes(valor as Idioma)

// Ruta pública de `path` ("/vedas", "/") en el idioma dado.
export function rutaLocal(idioma: Idioma, path: string): string {
  if (idioma === IDIOMA_PREDETERMINADO) return path
  return path === "/" ? `/${idioma}` : `/${idioma}${path}`
}

// Quita el prefijo de idioma de una ruta ("/en/vedas" → "/vedas"). También quita
// "/es", porque al prerenderizar una página reescrita la ruta puede llegar con él.
export function sinPrefijo(pathname: string): string {
  const m = pathname.match(/^\/(es|en)(?=\/|$)/)
  if (!m) return pathname || "/"
  return pathname.slice(m[0].length) || "/"
}

export const LOCALE_OG: Record<Idioma, string> = { es: "es_MX", en: "en_US" }
// Locale para Intl (fechas y números).
export const LOCALE_INTL: Record<Idioma, string> = { es: "es-MX", en: "en-US" }

// ---------------------------------------------------------------------------
// Fechas (a mano y no con Intl: el servidor y el navegador deben generar el
// mismo texto al hidratar).
// ---------------------------------------------------------------------------

export const MESES: Record<Idioma, string[]> = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
}

export const MESES_CORTOS: Record<Idioma, string[]> = {
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
}

// "MM-DD" → "DD/MM" en español y "MM/DD" en inglés.
export function fechaDiaMes(idioma: Idioma, mmdd: string): string {
  const m = mmdd?.match(/^(\d{2})-(\d{2})$/)
  if (!m) return mmdd
  return idioma === "en" ? `${m[1]}/${m[2]}` : `${m[2]}/${m[1]}`
}

// "AAAA-MM-DD" → "DD/MM/AAAA" o "MM/DD/AAAA".
export function fechaISO(idioma: Idioma, iso: string): string {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return iso
  return idioma === "en" ? `${m[2]}/${m[3]}/${m[1]}` : `${m[3]}/${m[2]}/${m[1]}`
}

// "a, b y c" / "a, b and c".
export function unirLista(idioma: Idioma, valores: string[]): string {
  if (valores.length <= 1) return valores.join("")
  const y = idioma === "en" ? "and" : "y"
  return `${valores.slice(0, -1).join(", ")} ${y} ${valores[valores.length - 1]}`
}

// ---------------------------------------------------------------------------
// Etiquetas que vienen de los datos. Si un valor no está en la tabla se muestra
// tal cual, así un dato nuevo nunca se pierde.
// ---------------------------------------------------------------------------

const traductor =
  (tabla: Record<string, string>, normalizar = (s: string) => s) =>
  (idioma: Idioma, valor: string): string =>
    idioma === "es" ? valor : (tabla[normalizar(valor)] ?? valor)

// Región de una pesquería (litoral de la CNP).
export const etiquetaRegion = traductor({
  "Litoral del Pacífico": "Pacific coast",
  "Golfo de México y Mar Caribe": "Gulf of Mexico and Caribbean Sea",
})

// Zona de una veda.
export const etiquetaZona = traductor({
  "Océano Pacífico": "Pacific Ocean",
  "Golfo de México y Mar Caribe": "Gulf of Mexico and Caribbean Sea",
  "Aguas continentales": "Inland waters",
  Nacional: "Nationwide",
})

export const etiquetaTipoVeda = traductor({
  Permanente: "Permanent",
  "Temporal Fija": "Fixed seasonal",
  "Temporal Variable": "Variable seasonal",
})

// Estado de aprovechamiento de la CNP (los datos varían en mayúsculas y espacios).
export const etiquetaEstatus = traductor(
  {
    "aprovechado al máximo sustentable": "Maximally sustainably fished",
    "al máximo aprovechamiento sustentable": "Maximally sustainably fished",
    "aprovechado al máximo sustentable (en riesgo de deterioro)": "Maximally sustainably fished (at risk of becoming overfished)",
    "con potencial de desarrollo": "Underfished",
    "en potencial de desarrollo": "Underfished",
    "con signos de sobreexplotación": "Showing signs of overfishing",
    "en deterioro": "Overfished",
    "en deterioro (fase de recuperación)": "Overfished (recovery phase)",
    "en deterioro (con tendencia a la recuperación)": "Overfished (trending toward recovery)",
    "deteriorado, en fase de recuperación": "Overfished, in recovery phase",
    indeterminado: "Undetermined",
  },
  (s) => s.trim().toLowerCase(),
)

// Sustentabilidad (MSC, FIP, Seafood Watch).
export const etiquetaAval = traductor({
  Certificada: "Certified",
  "En evaluación": "In assessment",
  "Programa de mejora": "Improvement program",
  Activo: "Active",
  "En evaluación MSC": "In MSC assessment",
  Básico: "Basic",
  Integral: "Comprehensive",
  Prospectivo: "Prospective",
  "Mejor opción": "Best choice",
  "Buena alternativa": "Good alternative",
  Evitar: "Avoid",
})

// Categorías de la biblioteca normativa.
export const CATEGORIAS_EN: Record<string, { short: string; full: string }> = {
  leyes: { short: "Laws", full: "Laws and regulations" },
  noms: { short: "NOM", full: "Official Mexican Standards (NOM)" },
  planes: { short: "Plan", full: "Fishery management plans" },
  zrp: { short: "ZRP", full: "Fishery refuge zones (ZRP)" },
  cnp: { short: "CNP", full: "National Fisheries Chart (CNP)" },
  vedas: { short: "Closure", full: "Fishing closures" },
}
