// Avales de sustentabilidad de cada pesquería: certificación MSC,
// proyectos de mejora pesquera (FIP) y recomendaciones de Seafood Watch.
//
// Curado a mano a partir de las fuentes primarias (ver FUENTES_SUSTENTABILIDAD).
// Sólo se registra lo que coincide con las especies y la zona de la ficha; los FIP
// inactivos y las certificaciones retiradas no se listan. Estos estados cambian:
// al actualizar, revisar cada fuente y cambiar FECHA_CONSULTA.

export const FECHA_CONSULTA = "2026-11-16"

export const FUENTES_SUSTENTABILIDAD = {
  msc: { nombre: "MSC – Track a Fishery", url: "https://fisheries.msc.org/en/fisheries/" },
  fip: { nombre: "FisheryProgress.org – FIP Directory", url: "https://fisheryprogress.org/fip-directory" },
  seafoodWatch: {
    nombre: "Seafood Watch – Complete Recommendation List (febrero de 2024)",
    url: "https://www.seafoodwatch.org/globalassets/sfw/pdf/whats-new/seafood-watch-complete-recommendation-list.pdf",
  },
}

export interface AvalMSC {
  nombre: string // nombre de la pesquería en el MSC
  estado: "Certificada" | "En evaluación" | "Programa de mejora"
  // Especies que cubre, cuando no coinciden del todo con las de la ficha (se muestra en el resumen).
  alcance?: string
  detalle?: string
  url: string
}

export interface FIP {
  nombre: string // nombre del FIP en FisheryProgress
  // Calificación de avance de FisheryProgress (A = avance alto … E = sin avance); null si aún no tiene.
  calificacion: "A" | "B" | "C" | "D" | "E" | null
  tipo: "Básico" | "Integral" | "Prospectivo"
  estado: "Activo" | "En evaluación MSC"
  // Aclaración sobre el alcance del FIP respecto de la ficha.
  nota?: string
  url: string
}

export interface RecomendacionSFW {
  especie: string
  cientifico: string
  zona: string
  arte: string
  recomendacion: "Mejor opción" | "Buena alternativa" | "Evitar"
  puntuacion: number
}

export interface Sustentabilidad {
  msc?: AvalMSC[]
  fips?: FIP[]
  seafoodWatch?: RecomendacionSFW[]
  nota?: string
}

const fip = (
  nid: number,
  nombre: string,
  calificacion: FIP["calificacion"],
  tipo: FIP["tipo"],
  estado: FIP["estado"] = "Activo",
  nota?: string,
): FIP => ({
  nombre,
  calificacion,
  tipo,
  estado,
  nota,
  url: `https://fisheryprogress.org/node/${nid}`,
})

// Zona de las evaluaciones de Seafood Watch que abarcan a todas las flotas del
// Pacífico oriental (sin país), y por lo tanto a la mexicana.
const POE = "Pacífico oriental (todas las flotas)"

const sfw = (
  especie: string,
  cientifico: string,
  zona: string,
  arte: string,
  puntuacion: number,
  color: "verde" | "amarillo" | "rojo",
): RecomendacionSFW => ({
  especie,
  cientifico,
  zona,
  arte,
  puntuacion,
  recomendacion: color === "verde" ? "Mejor opción" : color === "amarillo" ? "Buena alternativa" : "Evitar",
})

export const sustentabilidad: Record<string, Sustentabilidad> = {
  // ---------------------------------------------------------------------------
  // Golfo de México y Mar Caribe
  // ---------------------------------------------------------------------------
  "mero-negrillo": {
    fips: [fip(338, "Mexico Yucatan red and black grouper - longline", "C", "Básico")],
    seafoodWatch: [
      sfw("Mero rojo", "Epinephelus morio", "Golfo de México", "Palangre de fondo", 1.25, "rojo"),
      sfw("Negrillo", "Mycteroperca bonaci", "Golfo de México", "Palangre de fondo", 1.435, "rojo"),
    ],
  },
  pulpo: {
    msc: [
      {
        nombre: "Red octopus fishery, Yucatan Peninsula, Mexico",
        estado: "En evaluación",
        detalle: "Octopus maya y O. americanus, pesca con gareteo.",
        url: "https://fisheries.msc.org/en/fisheries/red-octopus-fishery-yucatan-peninsula-mexico/",
      },
    ],
    fips: [
      fip(
        10470,
        "Mexico Yucatan octopus - drift rod and line (Alianza por el Pulpo en Yucatán, A. C.)",
        null,
        "Integral",
        "En evaluación MSC",
      ),
    ],
    seafoodWatch: [
      sfw("Pulpo maya", "Octopus maya", "Golfo de México", "Gareteo", 2.068, "rojo"),
      sfw("Pulpo común", "Octopus vulgaris (O. americanus)", "Golfo de México", "Gareteo", 2.068, "rojo"),
    ],
    nota: "Seafood Watch publicó en 2025 una nueva evaluación del pulpo de México; la calificación mostrada es la de la lista de febrero de 2024.",
  },
  "gm-jaiba-del-golfo-de-mexico": {
    fips: [fip(1356, "Mexico Yucatan Peninsula blue crab - dipnet/pot/trap", "D", "Básico")],
    seafoodWatch: [sfw("Jaiba azul", "Callinectes sapidus", "Campeche", "Aros jaiberos", 2.981, "amarillo")],
  },
  "camaron-cafe": {
    fips: [fip(24491, "Mexico Gulf of Mexico brown shrimp - bottom trawl", null, "Integral")],
    seafoodWatch: [
      sfw("Camarón café", "Penaeus aztecus", "Golfo de México", "Atarraya", 2.984, "amarillo"),
      sfw("Camarón café", "Penaeus aztecus", "Golfo de México", "Trampas", 2.289, "rojo"),
      sfw("Camarón café", "Penaeus aztecus", "Golfo de México", "Red de arrastre de fondo", 1.765, "rojo"),
    ],
  },
  "gm-camaron-rosado-del-golfo-de-mexico": {
    seafoodWatch: [
      sfw("Camarón rosado", "Penaeus duorarum", "Golfo de México", "Trampas", 2.289, "rojo"),
      sfw("Camarón rosado", "Penaeus duorarum", "Golfo de México", "Red de arrastre de fondo", 1.588, "rojo"),
    ],
  },
  "gm-huachinango-y-pargos-del-golfo-de-mexico-y-mar-caribe": {
    fips: [fip(12449, "Mexico Gulf of Mexico finfish - vertical and bottom longline", "D", "Integral")],
    seafoodWatch: [sfw("Huachinango", "Lutjanus campechanus", "Golfo de México", "Líneas verticales", 1.297, "rojo")],
  },
  "gm-langosta-del-golfo-de-mexico-y-mar-caribe": {
    fips: [fip(84538, "PROSPECTIVE Mexico Sian Ka'an Caribbean spiny lobster - free diving casitas", null, "Prospectivo")],
    seafoodWatch: [
      sfw("Langosta del Caribe", "Panulirus argus", "Quintana Roo sur", "Buceo", 2.61, "amarillo"),
      sfw("Langosta del Caribe", "Panulirus argus", "Yucatán y Quintana Roo norte", "Buceo", 2.359, "rojo"),
      sfw("Langosta del Caribe", "Panulirus argus", "Yucatán", "Trampas", 1.986, "rojo"),
    ],
    nota: "La pesquería de langosta de Sian Ka'an y Banco Chinchorro obtuvo la certificación MSC en 2012, pero ya no aparece en el registro actual del MSC.",
  },

  // ---------------------------------------------------------------------------
  // Litoral del Pacífico
  // ---------------------------------------------------------------------------
  "pac-langostas-espinosas-del-pacifico": {
    msc: [
      {
        nombre: "Mexico Baja California red rock lobster",
        estado: "Certificada",
        alcance: "Sólo langosta roja (Panulirus interruptus)",
        detalle:
          "Langosta roja con trampas en la costa del Pacífico de Baja California y Baja California Sur. Certificada desde 2004; vigente hasta el 29/06/2027. No incluye a la langosta azul ni a la verde, objeto de esta ficha.",
        url: "https://fisheries.msc.org/en/fisheries/mexico-baja-california-red-rock-lobster/",
      },
    ],
  },
  "pac-curvina-golfina": {
    fips: [
      fip(
        26339,
        "Mexico upper Gulf of California corvina - hooks & lines",
        "C",
        "Básico",
        "Activo",
        "Cubre otras corvinas del Alto Golfo pescadas con línea y anzuelo (Cynoscion parvipinnis, C. xanthulus y Micropogonias megalops), no a la curvina golfina (C. othonopterus).",
      ),
    ],
  },
  "pac-dorado-pesca-deportiva": {
    seafoodWatch: [
      sfw("Dorado", "Coryphaena hippurus", POE, "Red de cerco sobre cardúmenes libres", 2.354, "amarillo"),
      sfw("Dorado", "Coryphaena hippurus", POE, "Palangre a la deriva", 1.789, "rojo"),
      sfw("Dorado", "Coryphaena hippurus", POE, "Red de cerco con plantados (FAD)", 1.7, "rojo"),
    ],
    nota: "Seafood Watch evalúa la captura comercial de dorado en el Pacífico oriental; en México el dorado está reservado a la pesca deportivo-recreativa dentro de las 50 millas náuticas.",
  },
  "pac-almeja-catarina": {
    seafoodWatch: [sfw("Almeja catarina", "Argopecten ventricosus", "Bahía Magdalena", "Buceo", 3.093, "amarillo")],
  },
  "pac-almeja-chocolata": {
    fips: [
      fip(10672, "Mexico Gulf of California Sinaloa chocolate clam and chirla clam - diving & hand gathered", "D", "Básico"),
    ],
  },
  "pac-almeja-ronosa": {
    fips: [
      fip(10672, "Mexico Gulf of California Sinaloa chocolate clam and chirla clam - diving & hand gathered", "D", "Básico"),
      fip(25728, "PROSPECTIVE Mexico Northern Gulf of California chionista clam - hand gathered", null, "Prospectivo"),
    ],
  },
  "pac-callo-de-hacha": {
    fips: [fip(24211, "PROSPECTIVE Mexico Baja California & Baja California Sur pen shell – hookah", null, "Prospectivo")],
  },
  "pac-jaiba-del-pacifico": {
    fips: [
      fip(6086, "Mexico Gulf of California swimming crab - pot/trap/ring net", "A", "Integral"),
      fip(10491, "Mexico Northern Gulf of California swimming crab - pot/trap", "B", "Básico"),
    ],
    seafoodWatch: [
      sfw("Jaiba café", "Callinectes bellicosus", "Sonora", "Trampas", 3.177, "amarillo"),
      sfw("Jaiba café", "Callinectes bellicosus", "Sinaloa", "Trampas", 3.155, "amarillo"),
      sfw("Jaiba café", "Callinectes bellicosus", "Sinaloa", "Aros jaiberos", 3.155, "amarillo"),
      sfw("Jaiba azul", "Callinectes arcuatus", "Sinaloa", "Trampas", 3.155, "amarillo"),
    ],
  },
  "pac-pulpo-del-pacifico": {
    fips: [fip(26130, "PROSPECTIVE Mexico Baja California Peninsula octopus spp – trap", null, "Prospectivo")],
  },
  "pac-verdillo": {
    msc: [
      {
        nombre: "Mexico North Pacific barred sand bass - pot/trap",
        estado: "Programa de mejora",
        url: "https://fisheries.msc.org/en/fisheries/mexico-north-pacific-barred-sand-bass-pot-trap/",
      },
    ],
    fips: [fip(8040, "Mexico North Pacific barred sand bass - pot/trap", "A", "Integral")],
  },
  "pac-merluza-del-pacifico-norte": {
    msc: [
      {
        nombre: "Mexico Gulf of California hake bottom & midwater trawl fishery",
        estado: "Programa de mejora",
        url: "https://fisheries.msc.org/en/fisheries/mexico-gulf-of-california-hake-bottom-midwater-trawl-fishery/",
      },
    ],
    fips: [fip(11926, "Mexico Gulf of California hake - bottom & midwater trawl", "A", "Integral")],
  },
  "pac-pelagicos-menores": {
    msc: [
      {
        nombre: "Southern Gulf of California Thread Herring",
        estado: "Certificada",
        detalle: "Sardina crinuda (Opisthonema spp.) con red de cerco, Sinaloa y Nayarit. Certificada desde 2016; vigente hasta el 14/04/2027.",
        url: "https://fisheries.msc.org/en/fisheries/southern-gulf-of-california-thread-herring/",
      },
    ],
    nota: "La certificación MSC de la sardina crinuda del Golfo de California (Opisthonema libertate) fue retirada; la de pelágicos menores de Sonora no aparece en el registro actual del MSC.",
  },
  "pac-tunidos-del-pacifico": {
    msc: [
      {
        nombre: "Northeastern Tropical Pacific Purse Seine yellowfin and skipjack tuna fishery (PAST)",
        estado: "Programa de mejora",
        detalle: "Certificada en 2017; hoy el atún aleta amarilla con lances sobre delfín está en programa de mejora y las demás unidades fueron retiradas.",
        url: "https://fisheries.msc.org/en/fisheries/northeastern-tropical-pacific-purse-seine-yellowfin-and-skipjack-tuna-fishery/",
      },
    ],
    fips: [
      fip(82665, "Mexico Eastern Pacific yellowfin tuna - purse seine", "C", "Integral"),
      fip(82614, "Mexico Western Baja California Peninsula Pacific bluefin tuna - purse seine", "C", "Integral"),
      fip(83461, "PROSPECTIVE Eastern Pacific Ocean yellowfin tuna – purse seine (Pesca Azteca)", null, "Prospectivo"),
    ],
    seafoodWatch: [
      sfw("Atún aleta amarilla", "Thunnus albacares", POE, "Red de cerco con lances sobre delfín", 2.656, "amarillo"),
      sfw("Atún aleta amarilla", "Thunnus albacares", POE, "Red de cerco sobre cardúmenes libres", 2.656, "amarillo"),
      sfw("Atún aleta amarilla", "Thunnus albacares", POE, "Palangre a la deriva", 2.018, "rojo"),
      sfw("Atún aleta amarilla", "Thunnus albacares", POE, "Red de cerco con plantados (FAD)", 1.918, "rojo"),
      sfw("Atún aleta azul", "Thunnus orientalis", "México", "Engorda en encierros marinos", 2.87, "rojo"),
    ],
  },
  "pac-huachinango-y-pargos-del-pacifico": {
    fips: [
      fip(11665, "Mexico Gulf of California grouper, snapper, triggerfish & yellowtail - hook & line", "A", "Básico"),
      fip(8093, "Mexico Marismas Nacionales finfish - hook & line/gillnet", "C", "Básico"),
    ],
  },
  "pac-robalo-del-pacifico": {
    fips: [fip(8093, "Mexico Marismas Nacionales finfish - hook & line/gillnet", "C", "Básico")],
  },
  "pac-camaron-del-pacifico": {
    fips: [
      fip(20818, "Mexico Gulf of California brown shrimp - trawl", "A", "Integral"),
      fip(7142, "Mexico Baja California Sur blue and brown shrimp – bottom trawl/cast net", "B", "Básico"),
      fip(22651, "Mexico Sinaloa-Sonora blue shrimp - driftnet/cast net/bottom trawl (Direct Source Seafood)", "B", "Básico"),
      fip(18740, "Mexico Marismas Nacionales artisanal whiteleg shrimp - trap/cast-nets", "B", "Básico"),
      fip(19953, "Mexico La Encrucijada Biosphere Reserve artisanal white shrimp - cast-nets", "B", "Básico"),
      fip(7091, "Mexico Sinaloa artisanal blue shrimp – drift/cast nets", "C", "Integral"),
    ],
    seafoodWatch: [
      sfw("Camarón azul", "Litopenaeus stylirostris", "Sinaloa norte-centro", "Suripera", 2.354, "amarillo"),
      sfw("Camarón azul", "Litopenaeus stylirostris", "Baja California", "Red de arrastre de fondo", 2.241, "amarillo"),
      sfw("Camarón azul", "Litopenaeus stylirostris", "Sonora", "Redes agalleras", 2.196, "rojo"),
      sfw("Camarón azul", "Litopenaeus stylirostris", "Golfo de California", "Red de arrastre de fondo", 2.016, "rojo"),
      sfw("Camarón azul", "Litopenaeus stylirostris", "Sinaloa norte-centro", "Redes agalleras", 1.914, "rojo"),
      sfw("Camarón azul", "Litopenaeus stylirostris", "Nayarit", "Red de arrastre de fondo", 1.758, "rojo"),
      sfw("Camarón azul", "Litopenaeus stylirostris", "Sinaloa norte-centro", "Red de arrastre de fondo", 1.758, "rojo"),
      sfw("Camarón azul", "Litopenaeus stylirostris", "Sinaloa sur", "Red de arrastre de fondo", 1.758, "rojo"),
      sfw("Camarón azul", "Litopenaeus stylirostris", "Sonora", "Red de arrastre de fondo", 1.758, "rojo"),
      sfw("Camarón blanco", "Litopenaeus vannamei", "Sinaloa sur", "Atarraya", 2.984, "amarillo"),
      sfw("Camarón blanco", "Litopenaeus vannamei", "Golfo de Tehuantepec", "Red de arrastre de fondo", 2.241, "amarillo"),
      sfw("Camarón blanco", "Litopenaeus vannamei", "Nayarit", "Red de arrastre de fondo", 1.954, "rojo"),
      sfw("Camarón blanco", "Litopenaeus vannamei", "Sinaloa norte-centro", "Red de arrastre de fondo", 1.954, "rojo"),
      sfw("Camarón blanco", "Litopenaeus vannamei", "Sinaloa sur", "Red de arrastre de fondo", 1.954, "rojo"),
      sfw("Camarón café", "Farfantepenaeus californiensis", "Golfo de California", "Red de arrastre de fondo", 2.241, "amarillo"),
      sfw("Camarón café", "Farfantepenaeus californiensis", "Golfo de Tehuantepec", "Red de arrastre de fondo", 2.241, "amarillo"),
      sfw("Camarón café", "Farfantepenaeus californiensis", "Baja California", "Red de arrastre de fondo", 2.241, "amarillo"),
      sfw("Camarón café", "Farfantepenaeus californiensis", "Nayarit", "Red de arrastre de fondo", 1.954, "rojo"),
      sfw("Camarón café", "Farfantepenaeus californiensis", "Sinaloa norte-centro", "Red de arrastre de fondo", 1.954, "rojo"),
      sfw("Camarón café", "Farfantepenaeus californiensis", "Sinaloa sur", "Red de arrastre de fondo", 1.954, "rojo"),
      sfw("Camarón café", "Farfantepenaeus californiensis", "Sonora", "Red de arrastre de fondo", 1.758, "rojo"),
    ],
  },
}

export const sustentabilidadDe = (especieId: string): Sustentabilidad => sustentabilidad[especieId] ?? {}
