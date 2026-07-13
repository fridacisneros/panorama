// ---------------------------------------------------------------------------
// Ficha detallada de la pesquería (6 secciones: generalidades, indicadores,
// ambiente, normatividad, status y recomendaciones). Toda la información que
// antes vivía en páginas individuales se concentra aquí como fuente única.
// ---------------------------------------------------------------------------

export interface EspecieRef {
  nombre: string
  cientifico: string
}

export interface PuntoCaptura {
  año: number
  captura: number
  valor: number
}

// Serie de captura de un estado a lo largo de los años (puntos posiblemente
// dispersos: la CNP suele citar sólo años clave). Se usa para gráficas
// multi-estado, como la de bagres marinos.
export interface SerieCapturaEstado {
  estado: string
  color?: string
  datos: { año: number; captura: number }[]
}

export interface GraficaCapturaEstados {
  titulo: string
  series: SerieCapturaEstado[]
}

export interface ParticipacionEstado {
  estado: string
  porcentaje: number
  captura: number
}

export interface FilaNormatividad {
  instrumento: string
  aplica: boolean | null // ✓ / ✗ / (sin dato)
  disposicion: string
  sustento: string
}

export interface FilaRecomendacion {
  recomendacion: string
  avance: string
}

export interface StatusCard {
  categoria: string // p. ej. "Aprovechado al máximo sustentable"
  color: string // yellow | green | red | gray
  especie: string
  zona: string
}

export interface FichaPesqueria {
  generalidades?: {
    descripcion?: string[]
    embarcaciones?: string
    artesPesca?: string
    especiesObjetivo?: EspecieRef[]
    especiesAsociadas?: EspecieRef[]
  }
  indicadores?: {
    capturaAnual?: string
    valorProduccion?: string
    empleos?: string
    embarcaciones?: string
    // Oraciones sueltas de la CNP que se muestran como recuadros de "datos importantes".
    datosDestacados?: string[]
    capturaHistorica?: PuntoCaptura[]
    capturaPorEstado?: GraficaCapturaEstados[]
    participacionEstados?: ParticipacionEstado[]
  }
  ambiente?: string[]
  normatividad?: FilaNormatividad[]
  status?: {
    cards?: StatusCard[]
    estrategia?: string
    tacticas?: string[]
  }
  recomendaciones?: FilaRecomendacion[]
}

export interface Especie {
  id: string
  nombre: string
  region: string
  // Los campos siguientes son opcionales: las pesquerías sin ficha ("Próximamente")
  // sólo tienen nombre, región y año de última actualización.
  nombreCientifico?: string
  status?: string | string[]
  statusColor?: string | string[]
  zona?: string
  captura?: string
  descripcion?: string
  ultimaActualizacion?: number // año de la última actualización en la CNP
  ficha?: FichaPesqueria
}

export const especies: Especie[] = [
  {
    id: "bagre-bandera",
    nombre: "Bagres marinos",
    nombreCientifico: "Bagre marinus, Ariopsis felis",
    status: "Aprovechado al Máximo Sustentable",
    statusColor: "yellow",
    zona: "Golfo de México y Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "4,921 toneladas",
    descripcion: "Especie de bagre marino de alto valor comercial en el Golfo de México",
    ultimaActualizacion: 2025,
  },
  {
    id: "mero-negrillo",
    nombre: "Mero y Negrillo",
    nombreCientifico: "Epinephelus morio, Mycteroperca bonaci",
    status: "En deterioro",
    statusColor: "red",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "3,700 toneladas",
    descripcion: "Especies de mero de lento crecimiento y alto valor comercial",
    ultimaActualizacion: 2025,
  },
  {
    id: "pepino-mar",
    nombre: "Pepino de Mar",
    nombreCientifico: "Isostichopus badionotus",
    status: "En Deterioro",
    statusColor: "red",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "1,458 toneladas",
    descripcion: "Equinodermo de alto valor comercial en mercados asiáticos",
    ultimaActualizacion: 2025,
  },
  {
    id: "pez-espada",
    nombre: "Pez Espada",
    nombreCientifico: "Xiphias gladius",
    status: "Con Potencial de Desarrollo",
    statusColor: "green",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "31 toneladas",
    descripcion: "Especie altamente migratoria con gran potencial de desarrollo",
    ultimaActualizacion: 2025,
  },
  {
    id: "camaron-cafe",
    nombre: "Camarón Café",
    nombreCientifico: "Penaeus aztecus",
    status: "Aprovechado al máximo sustentable ",
    statusColor: "yellow",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "11,071 toneladas",
    descripcion: "Una de las especies de camarón más importantes comercialmente",
    ultimaActualizacion: 2025,
  },
  {
    id: "camaron-rojo-roca",
    nombre: "Camarón rojo y roca",
    nombreCientifico: "Penaeus brasiliensis, Sicyonia brevirostris",
    status: "En deterioro",
    statusColor: "red",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "336 toneladas",
    descripcion: "Camarón de aguas profundas de alto valor comercial",
    ultimaActualizacion: 2025,
  },
  {
    id: "caracoles",
    nombre: "Caracoles",
    nombreCientifico: "varios",
    status: ["Aprovechado al máximo sustentable", "En deterioro"],
    statusColor: ["yellow", "red"],
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "14,062 toneladas",
    descripcion: "Molusco de lento crecimiento altamente valorado",
    ultimaActualizacion: 2025,
  },
  {
    id: "langostinos",
    nombre: "Langostinos",
    nombreCientifico: "Macrobrachium carcinus, Macrobrachium acanthurus, Macrobrachium heterochirus",
    status: "En deterioro",
    statusColor: "red",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "2,061 toneladas",
    descripcion: "Crustáceo de acuacultura con gran potencial de crecimiento",
    ultimaActualizacion: 2025,
  },
  {
    id: "pulpo",
    nombre: "Pulpo",
    nombreCientifico: "Octopus maya, Octopus americanus",
    status: ["Aprovechado al máximo sustentable", "Con potencial de desarrollo"],
    statusColor: ["yellow", "green"],
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "37,000 toneladas",
    descripcion: "Especie endémica de alto valor comercial y cultural",
    ultimaActualizacion: 2025,
  },
  {
    id: "robalo-chucumite",
    nombre: "Robalo y Chucumite",
    nombreCientifico: "Centropomus undecimalis, Centropomus poeyi, Centropomus parallelus",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "7,956 toneladas",
    descripcion: "Peces eurihalinos de importancia comercial y deportiva",
    ultimaActualizacion: 2025,
  },
  {
    id: "almejas",
    nombre: "Almejas",
    nombreCientifico: "Rangia cuneata, Rangia flexuosa, Mercenaria campechiensis",
    status: ["Aprovechado al máximo sustentable", "Con potencial de desarrollo", "En deterioro", "Indeterminado"],
    statusColor: ["yellow", "green", "red", "gray"],
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "30,211 toneladas",
    descripcion: "Moluscos bivalvos de importancia comercial en sistemas lagunares y estuarinos",
    ultimaActualizacion: 2023,
  },
  // -------------------------------------------------------------------------
  // Pesquerías marinas del catálogo de la Carta Nacional Pesquera sin ficha
  // detallada todavía (se muestran como "Próximamente"). Fuente: historial de
  // actualizaciones de la CNP (litorales del Pacífico y del Golfo/Caribe).
  // -------------------------------------------------------------------------
  { id: "gm-camaron-rosado-del-golfo-de-mexico", nombre: "Camarón rosado del Golfo de México", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2023 },
  { id: "gm-huachinango-y-pargos-del-golfo-de-mexico-y-mar-caribe", nombre: "Huachinango y pargos del Golfo de México y Mar Caribe", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2023 },
  { id: "gm-ostion-del-golfo-de-mexico", nombre: "Ostión del Golfo de México", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2023 },
  { id: "gm-jaiba-del-golfo-de-mexico", nombre: "Jaiba del Golfo de México", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2022 },
  { id: "gm-jurel-y-cojinuda-del-golfo-de-mexico-y-mar-caribe", nombre: "Jurel y cojinuda del Golfo de México y Mar Caribe", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2022 },
  { id: "gm-langosta-del-golfo-de-mexico-y-mar-caribe", nombre: "Langosta del Golfo de México y Mar Caribe", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2022 },
  { id: "gm-lisa-y-liseta-o-lebrancha-del-golfo-de-mexico", nombre: "Lisa y liseta o lebrancha del Golfo de México", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2022 },
  { id: "gm-rayas-del-golfo-de-mexico", nombre: "Rayas del Golfo de México", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2022 },
  { id: "gm-sierra-y-peto-del-golfo-de-mexico", nombre: "Sierra y peto del Golfo de México", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2022 },
  { id: "gm-tiburones-del-golfo-de-mexico-y-mar-caribe", nombre: "Tiburones del Golfo de México y Mar Caribe", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2022 },
  { id: "gm-bandera-y-bagres", nombre: "Bandera y bagres", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2010 },
  { id: "gm-camaron-siete-barbas", nombre: "Camarón siete barbas", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2010 },
  { id: "gm-cangrejos-semiterrestres", nombre: "Cangrejos semiterrestres", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2010 },
  { id: "gm-peces-marinos-escama", nombre: "Peces marinos escama", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2010 },
  { id: "gm-sabalo-pesca-deportiva", nombre: "Sábalo (pesca deportiva)", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2010 },
  { id: "gm-tunidos", nombre: "Túnidos", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2010 },
  { id: "gm-armado-y-xlavita", nombre: "Armado y xlavita", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2006 },
  { id: "gm-burrito", nombre: "Burrito", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2006 },
  { id: "gm-cangrejo-marino", nombre: "Cangrejo marino", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2006 },
  { id: "gm-sardina", nombre: "Sardina", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2006 },
  { id: "gm-trucha-de-mar", nombre: "Trucha de mar", region: "Golfo de México y Mar Caribe", ultimaActualizacion: 2006 },
  {
    id: "pac-abulon",
    nombre: "Abulón",
    nombreCientifico: "Haliotis fulgens, Haliotis corrugata",
    status: "En deterioro",
    statusColor: "red",
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "128 toneladas",
    descripcion: "Gasterópodos de la familia Haliotidae de zonas rocosas y mantos de algas, de gran importancia comercial en la costa occidental de Baja California",
    ultimaActualizacion: 2023,
  },
  { id: "pac-almeja-blanca-o-mantequilla", nombre: "Almeja blanca o mantequilla", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  {
    id: "pac-almeja-catarina",
    nombre: "Almeja catarina",
    nombreCientifico: "Argopecten ventricosus",
    status: ["Aprovechado al máximo sustentable", "En deterioro", "Indeterminado"],
    statusColor: ["yellow", "red", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "1,200 toneladas",
    descripcion: "Molusco bivalvo (pectínido) de fondos arenosos y fangosos del noroeste de México, capturado por buceo",
    ultimaActualizacion: 2023,
  },
  { id: "pac-almeja-chocolata", nombre: "Almeja chocolata", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-almeja-concha-espina", nombre: "Almeja concha espina", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  {
    id: "pac-almeja-generosa",
    nombre: "Almeja generosa",
    nombreCientifico: "Panopea generosa, Panopea globosa",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "2,350 toneladas",
    descripcion: "Almeja de sifón del género Panopea de sustratos blandos, capturada por buceo con remoción hidráulica del sustrato en el noroeste de México",
    ultimaActualizacion: 2023,
  },
  { id: "pac-almeja-pata-de-mula", nombre: "Almeja pata de mula", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  {
    id: "pac-almeja-ronosa",
    nombre: "Almeja roñosa",
    nombreCientifico: "Chione californiensis, Chione undatella, Chionista fluctifraga, Chionopsis gnidia",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "600 toneladas",
    descripcion: "Almejas del género Chione de sustratos arenosos y fangosos del noroeste de México, capturadas por buceo",
    ultimaActualizacion: 2023,
  },
  { id: "pac-botete", nombre: "Botete", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-callo-de-hacha", nombre: "Callo de hacha", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-caracol-chino", nombre: "Caracol chino", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-caracol-panocha", nombre: "Caracol panocha", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-cucaracha-de-mar", nombre: "Cucaracha de mar", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-curvina-golfina", nombre: "Curvina golfina", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-dorado-pesca-deportiva", nombre: "Dorado (Pesca deportiva)", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  {
    id: "pac-erizo-de-mar",
    nombre: "Erizo de mar",
    nombreCientifico: "Strongylocentrotus franciscanus, Strongylocentrotus purpuratus",
    status: ["En deterioro", "Con potencial de desarrollo", "Indeterminado"],
    statusColor: ["red", "green", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "1,400 toneladas",
    descripcion: "Erizos rojo y morado de sustratos rocosos y mantos de macroalgas en la costa occidental de Baja California",
    ultimaActualizacion: 2023,
  },
  { id: "pac-huachinango-y-pargos-del-pacifico", nombre: "Huachinango y pargos del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  {
    id: "pac-jaiba-del-pacifico",
    nombre: "Jaiba del Pacífico",
    nombreCientifico: "Callinectes bellicosus, Callinectes arcuatus, Callinectes toxotes",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    descripcion: "Jaibas del género Callinectes capturadas con trampas y aros en lagunas costeras y el litoral del Pacífico, incluido el Golfo de California",
    ultimaActualizacion: 2023,
  },
  { id: "pac-langostas-espinosas-del-pacifico", nombre: "Langostas espinosas del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-langostino", nombre: "Langostino", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-lisa-del-pacifico", nombre: "Lisa del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-medusa-bola-de-canon", nombre: "Medusa bola de cañón", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-mejillon", nombre: "Mejillón", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-ostion-del-pacifico", nombre: "Ostión del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  {
    id: "pac-pepino-de-mar-del-pacifico",
    nombre: "Pepino de mar del Pacífico",
    nombreCientifico: "Apostichopus parvimensis (sin. Parastichopus parvimensis)",
    status: ["En deterioro", "Indeterminado"],
    statusColor: ["red", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "135 toneladas",
    descripcion: "Equinodermo holoturoideo de la costa occidental de Baja California; pesquería alterna al erizo rojo",
    ultimaActualizacion: 2023,
  },
  { id: "pac-pulpo-del-pacifico", nombre: "Pulpo del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-robalo-del-pacifico", nombre: "Robalo del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-sierra-del-pacifico", nombre: "Sierra del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-tiburones-del-pacifico", nombre: "Tiburones del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  {
    id: "pac-tunidos-del-pacifico",
    nombre: "Túnidos del Pacífico",
    nombreCientifico: "Thunnus albacares, Thunnus orientalis",
    status: ["Aprovechado al máximo sustentable", "En deterioro (fase de recuperación)"],
    statusColor: ["yellow", "red"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "116,500 toneladas",
    descripcion: "Peces pelágicos altamente migratorios capturados con red de cerco y vara en el Pacífico Oriental",
    ultimaActualizacion: 2023,
  },
  { id: "pac-verdillo", nombre: "Verdillo", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-calamar-gigante", nombre: "Calamar gigante", region: "Litoral del Pacífico", ultimaActualizacion: 2022 },
  { id: "pac-marlin-pesca-deportiva", nombre: "Marlin (pesca deportiva)", region: "Litoral del Pacífico", ultimaActualizacion: 2022 },
  { id: "pac-merluza-del-pacifico-norte", nombre: "Merluza del Pacífico norte", region: "Litoral del Pacífico", ultimaActualizacion: 2022 },
  { id: "pac-pelagicos-menores", nombre: "Pelágicos menores", region: "Litoral del Pacífico", ultimaActualizacion: 2022 },
  { id: "pac-calamar-loligo", nombre: "Calamar loligo", region: "Litoral del Pacífico", ultimaActualizacion: 2018 },
  { id: "pac-camaron-del-pacifico", nombre: "Camarón del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2018 },
  { id: "pac-almeja-mano-de-leon", nombre: "Almeja mano de león", region: "Litoral del Pacífico", ultimaActualizacion: 2012 },
  { id: "pac-estrella-de-mar", nombre: "Estrella de Mar", region: "Litoral del Pacífico", ultimaActualizacion: 2012 },
  { id: "pac-macroalgas", nombre: "Macroalgas", region: "Litoral del Pacífico", ultimaActualizacion: 2012 },
  { id: "pac-peces-marinos-bacalao-negro-costa-del-pacifico-de-bc", nombre: "Peces Marinos: Bacalao negro Costa del Pacífico de BC", region: "Litoral del Pacífico", ultimaActualizacion: 2012 },
  { id: "pac-peces-marinos-barrilete-negro-y-bonito", nombre: "Peces Marinos: Barrilete negro y bonito.", region: "Litoral del Pacífico", ultimaActualizacion: 2012 },
  { id: "pac-peces-marinos-rocotes", nombre: "Peces Marinos: Rocotes", region: "Litoral del Pacífico", ultimaActualizacion: 2012 },
  { id: "pac-pez-espada", nombre: "Pez espada", region: "Litoral del Pacífico", ultimaActualizacion: 2012 },
  { id: "pac-pez-vela-pesca-deportivo-recreativa", nombre: "Pez vela (Pesca deportivo-recreativa)", region: "Litoral del Pacífico", ultimaActualizacion: 2012 },
  { id: "pac-almejas", nombre: "Almejas", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-baquetas-cabrillas-y-verdillos", nombre: "Baquetas, cabrillas y verdillos", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-cangrejo-costa-pacifica-de-bc", nombre: "Cangrejo costa pacífica de BC", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-caracoles", nombre: "Caracoles", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-curvinas-y-berrugatas", nombre: "Curvinas y berrugatas", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-jureles-y-medregales", nombre: "Jureles y medregales", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-lenguados", nombre: "Lenguados", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-peces-marinos-escama", nombre: "Peces marinos escama", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-pierna-y-conejo", nombre: "Pierna y conejo", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-rayas-y-mantas", nombre: "Rayas y mantas", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-tiburones-costeros", nombre: "Tiburones costeros", region: "Litoral del Pacífico", ultimaActualizacion: 2010 },
  { id: "pac-langostilla", nombre: "Langostilla", region: "Litoral del Pacífico", ultimaActualizacion: 2002 },
  { id: "pac-sargazo", nombre: "Sargazo", region: "Litoral del Pacífico", ultimaActualizacion: 2002 },
  { id: "pac-tiburones-oceanicos", nombre: "Tiburones océanicos", region: "Litoral del Pacífico", ultimaActualizacion: 2002 },
]

// ---------------------------------------------------------------------------
// Fichas detalladas por especie. Se adjuntan a cada especie más abajo para
// que `especie.ficha` sea la única fuente de la vista de detalle.
// ---------------------------------------------------------------------------

const fichas: Record<string, FichaPesqueria> = {
  "pac-almeja-ronosa": {
    generalidades: {
      descripcion: [
        "Las almejas roñosas poseen una concha caracterizada por una ornamentación de costillas que forman laminillas concéntricas delgadas. Presentan una forma moderadamente comprimida, con tonos blancos, amarillos y cremosos. Al igual que otros bivalvos, se alimentan principalmente de fitoplancton por medio de filtración. En adultos, las tallas oscilan entre 4 y 7 centímetros de longitud de concha.",
        "La distribución varía dependiendo de la especie, pero de manera general se encuentran en la costa occidental de la península de Baja California y en sistemas lagunares dentro del Golfo de California. Habitan en sustratos de arena fina, limos y fango, desde la zona intermareal hasta los 90 metros de profundidad. En México, la captura de almeja roñosa se lleva a cabo en la zona noroeste del país: Baja California, Baja California Sur, Sonora y Sinaloa.",
      ],
      embarcaciones:
        "En la operación de pesca se utilizan embarcaciones menores de fibra de vidrio con motor fuera de borda y un equipo de buceo semiautónomo con compresor tipo «Hooka». En cada embarcación participan hasta tres pescadores (buzo, cabo de vida y motorista). La extracción se realiza de manera manual empleando un gancho y una bolsa de malla denominada «jaba» para la colecta de los organismos. La captura se realiza hasta los 10 metros de profundidad.",
      especiesObjetivo: [
        { nombre: "Almeja roñosa, arrocera o chirla", cientifico: "Chione californiensis" },
        { nombre: "Almeja roñosa", cientifico: "Chione undatella" },
        { nombre: "Almeja roñosa o negra", cientifico: "Chionista fluctifraga" },
        { nombre: "Almeja roñosa o china", cientifico: "Chionopsis gnidia" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "Sinaloa concentra el 60.8% de la captura, Baja California Sur el 32.7%, Baja California el 5.7% y Sonora el 0.8%.",
      ],
      // Tendencia de la captura de almeja roñosa en BC, BCS, Sonora y Sinaloa, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de almeja roñosa por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Sinaloa",
              color: "#8b5cf6",
              datos: [
                { año: 2000, captura: 60 },
                { año: 2001, captura: 50 },
                { año: 2002, captura: 90 },
                { año: 2003, captura: 395 },
                { año: 2004, captura: 520 },
                { año: 2005, captura: 580 },
                { año: 2006, captura: 585 },
                { año: 2007, captura: 950 },
                { año: 2008, captura: 1180 },
                { año: 2009, captura: 1520 },
                { año: 2010, captura: 1290 },
                { año: 2011, captura: 800 },
                { año: 2012, captura: 835 },
                { año: 2013, captura: 880 },
                { año: 2014, captura: 620 },
                { año: 2015, captura: 800 },
                { año: 2016, captura: 1020 },
                { año: 2017, captura: 1585 },
                { año: 2018, captura: 1260 },
                { año: 2019, captura: 1185 },
                { año: 2020, captura: 270 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2004, captura: 35 },
                { año: 2009, captura: 125 },
                { año: 2010, captura: 245 },
                { año: 2011, captura: 640 },
                { año: 2012, captura: 520 },
                { año: 2013, captura: 560 },
                { año: 2015, captura: 670 },
                { año: 2016, captura: 665 },
                { año: 2017, captura: 475 },
                { año: 2018, captura: 520 },
                { año: 2019, captura: 385 },
                { año: 2020, captura: 150 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2000, captura: 440 },
                { año: 2001, captura: 330 },
                { año: 2002, captura: 90 },
                { año: 2003, captura: 200 },
                { año: 2004, captura: 220 },
                { año: 2005, captura: 200 },
                { año: 2006, captura: 280 },
                { año: 2007, captura: 95 },
                { año: 2013, captura: 140 },
                { año: 2014, captura: 185 },
                { año: 2015, captura: 140 },
                { año: 2016, captura: 250 },
                { año: 2017, captura: 245 },
                { año: 2018, captura: 115 },
                { año: 2019, captura: 155 },
                { año: 2020, captura: 150 },
              ],
            },
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2015, captura: 30 },
                { año: 2016, captura: 30 },
                { año: 2017, captura: 35 },
                { año: 2019, captura: 70 },
                { año: 2020, captura: 30 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "La temperatura y la disponibilidad de alimento son los principales factores que controlan diversos procesos biológicos en las especies de almeja roñosa. En la almeja roñosa (Chione californiensis) se ha reportado un crecimiento estacional que se interrumpe en invierno; además, el incremento de la temperatura del mar por efecto de «El Niño» favorece los desoves, mientras que la disminución de la temperatura provocada por «La Niña» reduce la intensidad del desove. El desarrollo de los gametos se presenta cuando hay mayores concentraciones de clorofila a. En la almeja roñosa (Chionista fluctifraga) se ha observado un periodo de desove continuo, con desoves más intensos durante los meses más cálidos (> 28 °C); la actividad reproductiva en invierno se ha asociado a la acumulación de nutrientes a partir del aumento de la biomasa de fitoplancton.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de almeja roñosa.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Para Baja California, Baja California Sur, Sonora y Sinaloa: 45 mm de longitud de concha para Chione californiensis; 57 mm para Chione undatella; 35 mm para Chionista fluctifraga; 65 mm para Chionopsis gnidia.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Extracción manual con gancho y bolsa de malla llamada «jaba», y buceo semiautónomo tipo «Hooka» a bordo de embarcación menor.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion:
          "Cuota de captura bienal (por recurso y zona), previa solicitud del usuario a través de la CONAPESCA. Tasa: hasta un 30% del tamaño de la población mayor a la talla mínima de captura, en función del estatus del recurso.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Fracción XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Baja California: 1 embarcación. Baja California Sur: 5 embarcaciones. Sonora: 13 embarcaciones. Sinaloa: 19 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal y sistemas lagunares de Baja California Sur, Baja California, Sonora y Sinaloa, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja roñosa (Chione spp.)",
          zona: "San Felipe (Baja California)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja roñosa (Chione spp.)",
          zona: "Bahía Magdalena (Baja California Sur)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja roñosa (Chione spp.)",
          zona: "Sinaloa",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Almeja roñosa (Chione spp.)",
          zona: "Resto de Baja California, Baja California Sur y Sonora",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población Aprovechada al Máximo Sustentable.",
      tacticas: [
        "Cuota de captura",
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Rotación de bancos",
        "Veda reproductiva",
        "Zona de refugio pesquero",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en la LGPAS y en los instrumentos normativos aplicables, no incrementar el número de embarcaciones en los sistemas lagunares y zonas de pesca Aprovechadas al Máximo Sustentable en Baja California, Baja California Sur y Sinaloa.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En zonas con estatus Indeterminado, el número de embarcaciones se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En caso de que los estudios del INAPESCA determinen que alguna población se ubique como Deteriorada, el INAPESCA emitirá opinión técnica con las recomendaciones y estrategias para su recuperación.",
        avance: "Sin información",
      },
      {
        recomendacion: "Establecer vedas temporales para proteger el periodo reproductivo en todas las zonas de pesca.",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a la LGPAS y a los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca.",
        avance: "Sin información",
      },
    ],
  },
  "pac-almeja-generosa": {
    generalidades: {
      descripcion: [
        "La almeja generosa en México se distribuye en la costa del Océano Pacífico, desde Playas de Tijuana hasta Bahía Magdalena, Baja California Sur, y en la costa del Golfo de California, desde el Alto Golfo de California hasta el sistema estuarino-lagunar Altata-Ensenada de Pabellón, en Sinaloa. Habita en sustratos blandos arenosos, arcillosos y areno-lodosos, desde la zona intermareal hasta los 110 metros de profundidad.",
        "La captura de almeja generosa se lleva a cabo en la zona noroeste del país, principalmente en Baja California, Baja California Sur, Sonora y Sinaloa. En Baja California se captura en ambos litorales, con mayor registro en la región de San Felipe, en el Golfo de California. En Baja California Sur, la principal zona de captura comercial es Bahía Magdalena. En Sonora se captura de Bahía Lobos al Colorado y de Puerto Lobos a Bahía Adair.",
      ],
      embarcaciones:
        "En la operación de pesca se utilizan embarcaciones menores de fibra de vidrio con motor fuera de borda, un equipo de buceo semiautónomo con compresor tipo «Hooka» y una motobomba para el envío de agua a presión que remueve el sustrato; la extracción es manual, empleando una bolsa de malla denominada «jaba» para la colecta de los organismos. En cada embarcación participan hasta tres pescadores (buzo, cabo de vida y motorista).",
      especiesObjetivo: [
        { nombre: "Almeja generosa, almeja de sifón o almeja chiluda", cientifico: "Panopea generosa" },
        { nombre: "Almeja generosa, globosa, almeja de sifón o almeja chiluda", cientifico: "Panopea globosa" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "La pesquería de almeja generosa inició de manera formal en 2005.",
        "La mayor captura se registra en Baja California (60%), seguida de Sonora (24%) y Baja California Sur (16%).",
      ],
      // Tendencia de la captura de almeja generosa en BC, BCS y Sonora, 2005-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de almeja generosa por estado, 2005–2020 (CONAPESCA)",
          series: [
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2009, captura: 100 },
                { año: 2010, captura: 1000 },
                { año: 2011, captura: 1300 },
                { año: 2012, captura: 1400 },
                { año: 2013, captura: 1650 },
                { año: 2014, captura: 2100 },
                { año: 2015, captura: 1050 },
                { año: 2016, captura: 1080 },
                { año: 2017, captura: 650 },
                { año: 2018, captura: 1000 },
                { año: 2019, captura: 1180 },
                { año: 2020, captura: 1450 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2005, captura: 250 },
                { año: 2006, captura: 100 },
                { año: 2007, captura: 50 },
                { año: 2008, captura: 350 },
                { año: 2009, captura: 100 },
                { año: 2010, captura: 300 },
                { año: 2011, captura: 150 },
                { año: 2012, captura: 500 },
                { año: 2013, captura: 850 },
                { año: 2014, captura: 800 },
                { año: 2015, captura: 600 },
                { año: 2016, captura: 600 },
                { año: 2017, captura: 250 },
                { año: 2018, captura: 250 },
                { año: 2019, captura: 400 },
                { año: 2020, captura: 800 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2005, captura: 250 },
                { año: 2006, captura: 100 },
                { año: 2007, captura: 50 },
                { año: 2008, captura: 350 },
                { año: 2009, captura: 20 },
                { año: 2010, captura: 350 },
                { año: 2011, captura: 250 },
                { año: 2012, captura: 220 },
                { año: 2013, captura: 320 },
                { año: 2014, captura: 520 },
                { año: 2015, captura: 250 },
                { año: 2016, captura: 300 },
                { año: 2017, captura: 220 },
                { año: 2018, captura: 250 },
                { año: 2019, captura: 230 },
                { año: 2020, captura: 100 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Las condiciones ambientales en las que se desarrolla el ciclo de vida de la almeja generosa del género Panopea indican que es un organismo que se adapta y reproduce en un rango de entre 22 y 26 °C; temperaturas de 18 y 30 °C afectan negativamente su crecimiento y desarrollo, y a 14-16 °C el desarrollo embrionario es más corto. En las costas del Pacífico noroeste se ha reportado que Panopea generosa alcanza la madurez sexual en tres años cuando los organismos se encuentran en sitios con alimento y temperatura óptima (12-14 °C). También se reporta que salinidades de 36 ups influyen negativamente en su crecimiento. Modelos de reconstrucción ambiental de Panopea generosa en la península de Baja California señalan que la variación en la temperatura superficial del mar se relaciona directamente con el crecimiento individual del organismo, provocando una disminución de sus atributos biológicos —estructura de tallas, edades y crecimiento—, lo que puede ser evidencia de condiciones de estrés ambiental resultado de la variabilidad ambiental (Oscilación Decadal del Pacífico, El Niño-Oscilación del Sur e Índice del Régimen Climático del Ártico) y de su distribución geográfica.",
    ],
    normatividad: [
      {
        instrumento: "1. Norma Oficial Mexicana",
        aplica: true,
        disposicion:
          "NOM-014-SAG/PESC-2015, Especificaciones para regular el aprovechamiento de almeja generosa (Panopea generosa y Panopea globosa) en aguas de jurisdicción federal del litoral del Océano Pacífico y Golfo de California.",
        sustento: "DOF: 25/06/2015.",
      },
      {
        instrumento: "2. Plan de Manejo Pesquero",
        aplica: true,
        disposicion:
          "Plan de Manejo para la Pesquería de Almeja Generosa (Panopea spp.) en las costas de Baja California. Plan de Manejo para la Pesquería de Almeja Generosa (Panopea globosa) en las costas de Sonora.",
        sustento: "DOF: 23/03/2012 (Baja California) y 07/11/2012 (Sonora).",
      },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de almeja generosa.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Panopea globosa: 130 mm de longitud de concha en el Alto Golfo de California hasta Puertecitos (Baja California), Bahía Magdalena y Punta Eugenia (Baja California Sur) y Sonora; 115 mm en Bahía de Los Ángeles (Baja California). Panopea generosa: 100 mm de longitud de concha en la costa Pacífico de Santa Rosalillita (Baja California) hasta Punta Eugenia (Baja California Sur); 130 mm en el resto de la zona.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Buceo semiautónomo tipo «Hooka» con una motobomba para el envío de agua a presión (remoción del sustrato) y extracción manual empleando una bolsa de malla denominada «jaba» para la colecta de los organismos a bordo.",
        sustento: "Numeral 4.3 de la NOM-014-SAG/PESC-2015 (DOF: 25/06/2015).",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion: "Panopea globosa: veda temporal del 25 de enero al 30 de abril de cada año en Bahía Magdalena, Baja California Sur.",
        sustento:
          "Acuerdo por el que se establece veda temporal para el aprovechamiento de almeja generosa (Panopea globosa) en Bahía Magdalena, Baja California Sur (DOF: 16/04/2021).",
      },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion: "Cuota de captura variable por zona, con base hasta el 1% del tamaño mayor a la talla mínima de captura.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con un motor fuera de borda de potencia nominal de hasta 85.76 kilowatts (equivalentes a 115 caballos de fuerza), un compresor de aire para buceo semiautónomo («Hooka») y una motobomba para el envío de agua a presión que remueve el sustrato para la selección y extracción manual de organismos. En la extracción, hasta tres pescadores (buzo, cabo de vida y motorista) por embarcación.",
        sustento: "Numeral 4.3 de la NOM-014-SAG/PESC-2015 (DOF: 25/06/2015). Artículo 4, Fracción XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 229 embarcaciones. Baja California Sur: 169 embarcaciones. Sonora: 44 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal y sistemas lagunares de Baja California Sur, Baja California, Sonora y Sinaloa, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja generosa (Panopea spp.)",
          zona: "Costa Pacífico y Golfo de California de Baja California",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja generosa (Panopea spp.)",
          zona: "Bahía Magdalena (Baja California Sur)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja generosa (Panopea globosa)",
          zona: "Bahía Lobos al Colorado y de Puerto Lobos a Bahía Adair (Sonora)",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Almeja generosa (Panopea spp.)",
          zona: "Sinaloa y resto de Baja California Sur y Sonora",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población Aprovechada al Máximo Sustentable.",
      tacticas: [
        "Cuota de captura",
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Rotación de bancos",
        "Veda reproductiva",
        "Zona de refugio pesquero",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en la LGPAS y en la NOM-014-SAG/PESC-2015, no incrementar el esfuerzo pesquero en los sistemas lagunares y zonas de pesca Aprovechadas al Máximo Sustentable.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará bajo el siguiente procedimiento: (a) presentar una solicitud de cuota a la CONAPESCA con al menos tres meses de anticipación al inicio de la temporada, tras lo cual el INAPESCA comunicará el programa de trabajo para el estudio de evaluación y el apoyo logístico necesario; y (b) realizada la evaluación, el INAPESCA emitirá el dictamen técnico correspondiente.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En zonas con estatus Indeterminado, el número de embarcaciones se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En caso de que los estudios del INAPESCA determinen que alguna población se ubique como Deteriorada, el INAPESCA emitirá opinión técnica con las recomendaciones y estrategias para su recuperación. Establecer vedas temporales para proteger el periodo reproductivo en todas las zonas de pesca.",
        avance: "Sin información",
      },
      {
        recomendacion: "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en la LGPAS y en la NOM-014-SAG/PESC-2015.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, limitar las actividades de buceo a profundidades menores de 30 metros, con base en la NOM-014-SAG/PESC-2015 (apartado 4.11, inciso e).",
        avance: "Sin información",
      },
    ],
  },
  "pac-almeja-catarina": {
    generalidades: {
      descripcion: [
        "La almeja catarina se distribuye desde Isla de Cedros, Baja California, en el litoral Pacífico, y en todo el Golfo de California hasta Paita, Perú. Presenta una concha dura, oblicua y muy convexa, entre mediana y grande, ligeramente más larga que alta, con una altura máxima de 90 milímetros. Su coloración es variable, con manchas concéntricas que van de tonalidades blanco, gris, naranja, marrón rojizo o violeta. Habita sobre fondos arenosos y fangosos, desde pocos metros de profundidad hasta los 180 metros.",
        "La captura se lleva a cabo en la zona noroeste del país, principalmente en Baja California, Baja California Sur y Sonora. En la costa occidental de Baja California se captura en la Laguna Manuela y el estero San José. En Baja California Sur, las principales zonas de captura comercial son el complejo Bahía Magdalena-Almejas y Puerto Adolfo López Mateos. En Sonora se captura en la zona comprendida de Puerto Lobos a Bahía Adair.",
      ],
      embarcaciones:
        "En la operación de pesca se utilizan embarcaciones menores de fibra de vidrio con motor fuera de borda y un equipo de buceo semiautónomo con compresor tipo «Hooka». En cada embarcación participan hasta tres pescadores (buzo, cabo de vida y motorista). La extracción se realiza de manera manual y se utiliza una bolsa de malla denominada «jaba» para la colecta de los organismos.",
      especiesObjetivo: [{ nombre: "Almeja catarina", cientifico: "Argopecten ventricosus" }],
    },
    indicadores: {
      datosDestacados: [
        "Baja California Sur concentra el 96.91% de la captura, Sonora el 3.08% y Baja California el 0.01%.",
      ],
      // Tendencia de la captura de almeja catarina en BC, BCS y Sonora, 1979-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de almeja catarina por estado, 1979–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 1979, captura: 2500 },
                { año: 1980, captura: 3000 },
                { año: 1981, captura: 6000 },
                { año: 1982, captura: 5500 },
                { año: 1983, captura: 2500 },
                { año: 1984, captura: 4800 },
                { año: 1985, captura: 5000 },
                { año: 1986, captura: 5500 },
                { año: 1987, captura: 10000 },
                { año: 1988, captura: 8500 },
                { año: 1989, captura: 14000 },
                { año: 1990, captura: 22000 },
                { año: 1991, captura: 33000 },
                { año: 1992, captura: 500 },
                { año: 1993, captura: 15000 },
                { año: 1994, captura: 20500 },
                { año: 1995, captura: 10500 },
                { año: 1996, captura: 18500 },
                { año: 1997, captura: 23500 },
                { año: 1998, captura: 10000 },
                { año: 1999, captura: 24000 },
                { año: 2000, captura: 10500 },
                { año: 2001, captura: 29000 },
                { año: 2002, captura: 24500 },
                { año: 2003, captura: 29500 },
                { año: 2004, captura: 6500 },
                { año: 2005, captura: 17000 },
                { año: 2006, captura: 15500 },
                { año: 2007, captura: 17500 },
                { año: 2008, captura: 14500 },
                { año: 2009, captura: 16500 },
                { año: 2010, captura: 3500 },
                { año: 2011, captura: 12000 },
                { año: 2012, captura: 12000 },
                { año: 2013, captura: 6500 },
                { año: 2014, captura: 1500 },
                { año: 2015, captura: 500 },
                { año: 2016, captura: 200 },
                { año: 2017, captura: 100 },
                { año: 2018, captura: 15000 },
                { año: 2019, captura: 6500 },
                { año: 2020, captura: 1000 },
              ],
            },
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2000, captura: 4000 },
                { año: 2001, captura: 500 },
                { año: 2002, captura: 0 },
                { año: 2003, captura: 0 },
                { año: 2004, captura: 1000 },
                { año: 2005, captura: 800 },
                { año: 2006, captura: 700 },
                { año: 2007, captura: 600 },
                { año: 2008, captura: 500 },
                { año: 2009, captura: 600 },
                { año: 2010, captura: 1000 },
                { año: 2011, captura: 500 },
                { año: 2012, captura: 6500 },
                { año: 2013, captura: 1500 },
                { año: 2014, captura: 500 },
                { año: 2015, captura: 300 },
                { año: 2016, captura: 200 },
                { año: 2017, captura: 100 },
                { año: 2018, captura: 100 },
                { año: 2019, captura: 200 },
                { año: 2020, captura: 100 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2003, captura: 300 },
                { año: 2004, captura: 500 },
                { año: 2005, captura: 300 },
                { año: 2006, captura: 250 },
                { año: 2007, captura: 400 },
                { año: 2008, captura: 350 },
                { año: 2009, captura: 500 },
                { año: 2010, captura: 400 },
                { año: 2011, captura: 450 },
                { año: 2012, captura: 300 },
                { año: 2013, captura: 250 },
                { año: 2014, captura: 200 },
                { año: 2015, captura: 150 },
                { año: 2016, captura: 100 },
                { año: 2017, captura: 100 },
                { año: 2018, captura: 100 },
                { año: 2019, captura: 150 },
                { año: 2020, captura: 100 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "La ocurrencia de periodos anormalmente fríos en los centros de actividad biológica de Bahía Magdalena favorece el incremento de las poblaciones de almeja catarina, ya que contribuye al desarrollo de pastizales donde las larvas se fijan. El incremento de la temperatura superficial del mar y el debilitamiento de la Corriente de California registrados en 2015 y 2016 afectaron el reclutamiento, la sobrevivencia y el crecimiento de la almeja catarina en Bahía Magdalena, Baja California Sur.",
    ],
    normatividad: [
      {
        instrumento: "1. Norma Oficial Mexicana",
        aplica: true,
        disposicion:
          "NOM-004-SAG/PESC-2015, Especificaciones para el aprovechamiento de la almeja catarina (Argopecten circularis) en aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
        sustento: "DOF: 06/10/2015.",
      },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de almeja catarina.",
        sustento:
          "Numeral 4.3 de la NOM-004-SAG/PESC-2015 (DOF: 06/10/2015). Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Dentro de las zonas lagunares (lagunas Manuela, Guerrero Negro o Estero San José, Ojo de Liebre, San Ignacio, los canales y esteros de Puerto Adolfo López Mateos y la Ensenada de La Paz): 56 milímetros de longitud del diámetro mayor de la concha. En aguas de jurisdicción federal de Baja California y Baja California Sur, con excepción de las anteriores: 60 milímetros del diámetro mayor de la concha.",
        sustento: "Numerales 4.2.1 y 4.2.2 de la NOM-004-SAG/PESC-2015 (DOF: 06/10/2015).",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Extracción manual con bolsa de malla llamada «jaba» y buceo semiautónomo tipo «Hooka» a bordo de embarcación menor.",
        sustento: "Numeral 4.4.2 de la NOM-004-SAG/PESC-2015 (DOF: 06/10/2015).",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Veda temporal del 15 de diciembre al 31 de marzo de cada año en aguas marinas de jurisdicción federal de Baja California y Baja California Sur.",
        sustento:
          "Aviso por el que se da a conocer el establecimiento de épocas y zonas de veda para la pesca de diferentes especies de la fauna acuática en aguas de jurisdicción federal (DOF: 16/03/1994).",
      },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion: "Cuota de captura variable por zona, con base en un 60% del tamaño mayor a la talla mínima de captura.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista).",
        sustento: "Numeral 4.4.1 de la NOM-004-SAG/PESC-2015 (DOF: 06/10/2015). Artículo 4, Fracción XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 9 embarcaciones. Baja California Sur: 376 embarcaciones. Sonora: 89 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal y sistemas lagunares de Baja California Sur, Baja California y Sonora, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permisos para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "En deterioro",
          color: "red",
          especie: "Almeja catarina (Argopecten ventricosus)",
          zona: "Bahía Concepción, laguna de San Ignacio y laguna Ojo de Liebre (Baja California Sur)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja catarina (Argopecten ventricosus)",
          zona: "Estero San José y Laguna Manuela (Baja California)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja catarina (Argopecten ventricosus)",
          zona: "Bahía Magdalena, Bahía Almejas y esteros adyacentes a López Mateos (Baja California Sur)",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Almeja catarina (Argopecten ventricosus)",
          zona: "Sonora y resto de Baja California y Baja California Sur",
        },
      ],
      estrategia: "Cuota de captura y tasa de aprovechamiento.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Veda reproductiva",
        "Zona de refugio pesquero",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en la LGPAS y en la NOM-004-SAG/PESC-2015, no incrementar el esfuerzo pesquero en los sistemas lagunares y zonas de pesca Aprovechadas al Máximo Sustentable en Baja California y Baja California Sur.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En zonas con estatus Indeterminado, el número de embarcaciones se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará bajo el siguiente procedimiento: (a) presentar una solicitud de cuota a la CONAPESCA, de preferencia tres meses antes del inicio de la temporada, tras lo cual el INAPESCA comunicará el programa de trabajo para el estudio de evaluación y el apoyo logístico necesario; y (b) realizada la evaluación, el INAPESCA emitirá el dictamen técnico correspondiente.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
        avance: "Sin información",
      },
      {
        recomendacion: "En las zonas con estatus Deteriorado, instrumentar estrategias para la recuperación de sus poblaciones.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a la LGPAS y a la NOM-004-SAG/PESC-2015.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en la LGPAS y en la NOM-004-SAG/PESC-2015.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015 (apartado 4.11, inciso e).",
        avance: "Sin información",
      },
    ],
  },
  "pac-pepino-de-mar-del-pacifico": {
    generalidades: {
      descripcion: [
        "El pepino de mar corresponde a un grupo de invertebrados marinos que forman parte de los equinodermos y se encuentran dentro de la clase Holothuroidea. Varias de las especies de holoturoideos que habitan en aguas mexicanas tienen valor económico directo, y se estima un importante potencial de existencia en nuestros litorales. El pepino de mar berrugoso es un recurso de relevancia socioeconómica local y regional que conforma una pesquería alterna al erizo rojo en Baja California.",
        "En el Pacífico mexicano se aprovecha comercialmente la especie Apostichopus parvimensis (sinónimo de Parastichopus parvimensis), la cual habita aguas templadas. Se captura principalmente en la costa occidental de la península de Baja California, desde la frontera con Estados Unidos hasta Punta Abreojos, en Baja California Sur.",
      ],
      embarcaciones:
        "En la captura de pepino de mar se emplea una embarcación menor con motor fuera de borda y equipo de buceo semiautónomo tipo «Hooka». La extracción es manual y se colecta en bolsa de pesca («jaba»). Participan tres pescadores: buzo, cabo de vida y motorista.",
      especiesObjetivo: [
        { nombre: "Pepino de mar berrugoso", cientifico: "Apostichopus parvimensis (sin. Parastichopus parvimensis)" },
        { nombre: "Pepino de mar blanco o aguado", cientifico: "Holothuria inhabilis" },
        { nombre: "Pepino de mar", cientifico: "Holothuria impatiens" },
      ],
      especiesAsociadas: [
        { nombre: "Pepino de mar", cientifico: "Parastichopus californicus" },
        { nombre: "Erizo rojo", cientifico: "Strongylocentrotus franciscanus" },
        { nombre: "Erizo morado", cientifico: "Strongylocentrotus purpuratus" },
        { nombre: "Caracol panocha", cientifico: "Megastraea undosa" },
        { nombre: "Caracol turbante", cientifico: "Megastraea turbanica" },
        { nombre: "Concha lapa", cientifico: "Megathura crenulata" },
        { nombre: "Caracol tornillo", cientifico: "Kelletia kelletii" },
        { nombre: "Caracol turbo o burgado", cientifico: "Turbo fluctuosus" },
        { nombre: "Abulón (azul, amarillo, negro, chino y rojo)", cientifico: "Haliotis spp." },
      ],
    },
    indicadores: {
      datosDestacados: [
        "Baja California concentra el 83% de la captura de pepino de mar y Baja California Sur el 17%.",
      ],
      // Tendencia de la captura de pepino de mar (peso vivo) en BC y BCS, 1991-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de pepino de mar (peso vivo) por estado, 1991–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 1991, captura: 160 },
                { año: 1992, captura: 300 },
                { año: 1993, captura: 80 },
                { año: 1994, captura: 750 },
                { año: 1995, captura: 680 },
                { año: 1996, captura: 620 },
                { año: 1997, captura: 370 },
                { año: 1998, captura: 400 },
                { año: 1999, captura: 270 },
                { año: 2000, captura: 400 },
                { año: 2001, captura: 410 },
                { año: 2002, captura: 260 },
                { año: 2003, captura: 190 },
                { año: 2004, captura: 305 },
                { año: 2005, captura: 280 },
                { año: 2006, captura: 340 },
                { año: 2007, captura: 250 },
                { año: 2008, captura: 180 },
                { año: 2009, captura: 210 },
                { año: 2010, captura: 135 },
                { año: 2011, captura: 135 },
                { año: 2012, captura: 140 },
                { año: 2013, captura: 60 },
                { año: 2014, captura: 90 },
                { año: 2015, captura: 55 },
                { año: 2016, captura: 95 },
                { año: 2017, captura: 145 },
                { año: 2018, captura: 100 },
                { año: 2019, captura: 60 },
                { año: 2020, captura: 120 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2000, captura: 30 },
                { año: 2001, captura: 32 },
                { año: 2002, captura: 32 },
                { año: 2003, captura: 10 },
                { año: 2004, captura: 85 },
                { año: 2005, captura: 135 },
                { año: 2006, captura: 120 },
                { año: 2007, captura: 140 },
                { año: 2008, captura: 185 },
                { año: 2009, captura: 200 },
                { año: 2010, captura: 180 },
                { año: 2011, captura: 160 },
                { año: 2012, captura: 150 },
                { año: 2013, captura: 40 },
                { año: 2014, captura: 45 },
                { año: 2015, captura: 20 },
                { año: 2016, captura: 5 },
                { año: 2017, captura: 3 },
                { año: 2018, captura: 5 },
                { año: 2019, captura: 12 },
                { año: 2020, captura: 15 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "El pepino de mar, de manera similar a muchos organismos bentónicos, es altamente susceptible a la variabilidad ambiental y a los cambios en la temperatura del agua. Entre 2013 y 2015 se originó un fenómeno oceanográfico denominado «La Mancha», entre las Aleutianas y el Golfo de Alaska, favorecido por la combinación de tres variables hidrometeorológicas: altas presiones atmosféricas, alta radiación solar y poca rapidez del viento sobre la superficie marina. Esto provocó que la superficie del mar se calentara con anomalías positivas extremas que, arrastradas posteriormente al sur por la Corriente de California, se unieron al efecto «El Niño» 2015-2016 frente a la península de Baja California, situación que inhibió la liberación de gametos y el transporte de nutrientes en detrimento de la producción primaria.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de pepino de mar.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion: "Extracción manual con bolsa de malla llamada «jaba». Buceo semiautónomo tipo «Hooka».",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion:
          "Cuota de captura anual (por zona y banco), previa solicitud del usuario a través de la CONAPESCA, la cual será ratificada cada año mediante dictamen técnico del INAPESCA.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Fracción XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 178 embarcaciones. Baja California Sur: 88 embarcaciones. Sonora: 6 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal en la costa occidental de la península de Baja California, desde la frontera con Estados Unidos hasta Punta Abreojos (Baja California Sur) e islas adyacentes al macizo peninsular; en el Golfo de California y costa del Pacífico mexicano, previo dictamen técnico del INAPESCA. Restricciones establecidas en las Zonas de Refugio Pesquero del Corredor San Cosme–Punta Coyote e Isla Natividad.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "En deterioro",
          color: "red",
          especie: "Pepino de mar berrugoso (Apostichopus parvimensis)",
          zona: "Baja California",
        },
        {
          categoria: "En deterioro (con tendencia a la recuperación)",
          color: "red",
          especie: "Pepino de mar berrugoso (Apostichopus parvimensis)",
          zona: "Baja California Sur",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Holothuria inhabilis y Holothuria impatiens",
          zona: "Península de Baja California",
        },
      ],
      estrategia:
        "Tasa de aprovechamiento por zona y banco, menor al 10% del tamaño de la población estimado con respecto al peso promedio del tegumento, en función del estatus del recurso.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Veda temporal",
        "Zonas de pesca por cooperativa",
        "Cierre de la pesca ante contingencias ambientales (ENSO, florecimientos algales nocivos, entre otros)",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en la LGPAS y en los instrumentos normativos aplicables, no incrementar el esfuerzo pesquero para el aprovechamiento de Apostichopus parvimensis en las zonas de pesca donde el recurso se encuentra Deteriorado.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Para Holothuria inhabilis y Holothuria impatiens, con estatus Indeterminado, el número de embarcaciones se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración definidos por la autoridad pesquera. En nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará bajo el siguiente procedimiento: (a) presentar una solicitud de cuota a la CONAPESCA, de preferencia tres meses antes del inicio de la temporada, tras lo cual el INAPESCA comunicará el programa de trabajo para el estudio de evaluación y el apoyo logístico necesario; y (b) realizada la evaluación, el INAPESCA emitirá el dictamen técnico correspondiente.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en la LGPAS y en los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015 (apartado 4.11, inciso e).",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar el programa de ordenamiento y manejo por área definida, con énfasis en la región de Baja California, para promover zonas integrales de pesca de recursos bentónicos o semi-sésiles de importancia comercial, de manera que un solo permisionario u organización pueda aprovechar todos los recursos en una misma zona de pesca.",
        avance: "Sin información",
      },
    ],
  },
  "pac-jaiba-del-pacifico": {
    generalidades: {
      descripcion: [
        "Los juveniles y adultos de jaiba (Callinectes bellicosus, Callinectes arcuatus y Callinectes toxotes) son depredadores, omnívoros oportunistas, detritívoros, carnívoros y caníbales. Los juveniles se alimentan por la noche o en la mañana, y los adultos durante el día. Respecto a su biología y ecología reproductiva, las jaibas son de estrategia «r»: especies que se caracterizan por alta fecundidad, crecimiento rápido, madurez sexual temprana y ciclo de vida corto.",
        "Las zonas de captura comprenden lagunas costeras y el litoral del Pacífico mexicano, incluyendo el Golfo de California, en profundidades menores a 30 metros. En algunas localidades la pesquería de jaiba azul (Callinectes arcuatus) se realiza en zonas estuarinas de baja profundidad, como el área lagunar costera del sur de Sonora (bahías Las Guásimas, Lobos, Tóbari, Yavaros y norte de Agiabampo), Sinaloa (laguna de Agua Grande), Marismas Nacionales de Nayarit, Laguna de Cuyutlán (Colima) y lagunas costeras de Oaxaca y Chiapas.",
      ],
      embarcaciones:
        "Para la captura se utilizan embarcaciones menores de fibra de vidrio de 1 a 7 metros de eslora, con y/o sin motor fuera de borda, sin cubierta y con capacidad máxima de carga de una a tres toneladas; en algunos casos las embarcaciones son de madera, de 3 a 4.5 metros de eslora. Las artes de pesca son, en general, trampas rígidas tipo Chesapeake de diferentes tamaños, aros sencillos de diámetro variable construidos de material metálico y/o alambre galvanizado, nasas o aros dobles («chupones») y chinchorros (estos últimos están prohibidos).",
      especiesObjetivo: [
        { nombre: "Jaiba verde, guerrera, café o jaibón", cientifico: "Callinectes bellicosus" },
        { nombre: "Jaiba azul o jaiba cuata", cientifico: "Callinectes arcuatus" },
        { nombre: "Jaiba negra, gigante o guacho", cientifico: "Callinectes toxotes" },
      ],
      especiesAsociadas: [
        { nombre: "Botete", cientifico: "Sphoeroides annulatus" },
        { nombre: "Mojarra", cientifico: "Calamus brachysomus" },
        { nombre: "Pez escorpión", cientifico: "Scorpaena mystes" },
        { nombre: "Cabrilla pinta", cientifico: "Epinephelus analogus" },
        { nombre: "Caracol chino rosa", cientifico: "Hexaplex erythrostomus" },
        { nombre: "Caracol chino negro", cientifico: "Muricanthus nigritus" },
        { nombre: "Langosta azul", cientifico: "Panulirus inflatus" },
        { nombre: "Cangrejo tanque", cientifico: "Hepatus lineatus" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "En los cinco últimos años (2015–2020) la captura se ha incrementado a una tasa de crecimiento anual superior al 10%.",
        "Durante el periodo 2000–2020, Sinaloa y Sonora aportaron el 92.8% de la captura.",
      ],
    },
    ambiente: [
      "Se ha observado una relación inversa entre la biomasa y la tasa instantánea de producción de la jaiba café, y se ha comparado la tasa de producción con la Oscilación Decadal del Pacífico, un índice ambiental regional cuyos valores pueden ser negativos o positivos. La fase positiva de la Oscilación Decadal del Pacífico se asocia con anomalías positivas de la temperatura superficial del mar en el Pacífico oriental tropical. Un análisis preliminar mostró dos fases en la serie de la Oscilación Decadal del Pacífico respecto a la tasa de producción de la jaiba café: 1) de 1986 a 1997 y 2) de 1998 a 2019. En el segundo periodo, el logaritmo de la tasa de producción tiene una correlación directa significativa con la Oscilación Decadal del Pacífico (r² = -0.42, p = 0.001). Esto permite inferir que la biomasa de la jaiba café puede estar siendo beneficiada por el calentamiento global.",
    ],
    normatividad: [
      {
        instrumento: "1. Norma Oficial Mexicana",
        aplica: true,
        disposicion:
          "NOM-039-PESC-2003, Pesca responsable de jaiba en aguas de jurisdicción federal del litoral del Océano Pacífico. Especificaciones para su aprovechamiento.",
        sustento: "DOF: 26/07/2006.",
      },
      {
        instrumento: "2. Plan de Manejo Pesquero",
        aplica: true,
        disposicion: "Plan de Manejo Pesquero de Jaiba (Callinectes spp.) de Sinaloa y Sonora.",
        sustento: "DOF: 15/07/2014.",
      },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de jaiba.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Tallas mínimas de captura autorizadas en el Océano Pacífico, incluido el Golfo de California: 115 mm de ancho de caparazón (Ac) para la jaiba café, guerrera, verde o jaibón (C. bellicosus); 95 mm de Ac para la jaiba azul o cuata (C. arcuatus); 120 mm de Ac para la jaiba gigante, negra o guacho (C. toxotes).",
        sustento: "Numeral 4.8 de la NOM-039-PESC-2003 (DOF: 26/07/2006).",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Se autoriza: trampas con estructura rígida tipo Chesapeake o similar, con dimensiones máximas de 60 cm de largo y ancho por 40 cm de altura, en el litoral Pacífico; aros con paño de red de tamaño de malla igual o superior a 76 mm (3 pulgadas) en todo el litoral; sacadores con tamaño de malla mínimo de 76 mm en todo el litoral; y ganchos metálicos de 1 m de longitud exclusivamente en Nayarit.",
        sustento: "Numeral 4.2 de la NOM-039-PESC-2003 (DOF: 26/07/2006).",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Para organismos de ambos sexos de cada especie, del 1 de mayo al 30 de junio de cada año. Solo para hembras de estas especies, del 1 al 9 de julio de cada año.",
        sustento:
          "Acuerdo por el que se modifica el aviso de épocas y zonas de veda (publicado el 16 de marzo de 1994) para modificar el periodo de veda de jaiba frente al litoral de Sonora y Sinaloa (DOF: 13/06/2014).",
      },
      { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor de menos de 10.5 metros de eslora, sin cubierta, con capacidad máxima de carga de 3.0 toneladas. Se establece un máximo de 80 trampas y/o aros, un sacador o un gancho por embarcación, excepto en los casos en que se especifique una cantidad menor de artes de pesca por estado.",
        sustento:
          "Numeral 4.11 de la NOM-039-PESC-2003 (DOF: 26/07/2006). Artículo 4, Fracción XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Baja California: 59 embarcaciones. Baja California Sur: 179. Sonora: 746. Sinaloa: 1,069. Nayarit: 164. Jalisco: 21. Colima: 24. Michoacán: 18. Guerrero: 15. Oaxaca: 174. Chiapas: 106 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas de jurisdicción federal del Océano Pacífico, incluyendo el Golfo de California, así como aguas protegidas (esteros y sistemas lagunares), respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas, Reservas de la Biosfera y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permisos para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Jaiba (Callinectes spp.)",
          zona: "Baja California Sur, Sonora, Sinaloa, Colima, Oaxaca y Chiapas",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Jaiba (Callinectes spp.)",
          zona: "Baja California, Nayarit, Jalisco y Michoacán",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población Aprovechada al Máximo Sustentable.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Veda reproductiva",
        "Zonas de refugio",
        "Liberación de hembras ovígeras y juveniles",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en la LGPAS y en la NOM-039-PESC-2003, no incrementar el esfuerzo de pesca actual en los sistemas lagunares y zonas de pesca Aprovechadas al Máximo Sustentable en Baja California Sur, Sonora, Sinaloa, Colima, Oaxaca y Chiapas.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En las zonas con estatus Indeterminado, el esfuerzo pesquero se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA.",
        avance: "Sin información",
      },
      {
        recomendacion: "Establecer vedas temporales para proteger el periodo reproductivo en Baja California Sur y Nayarit.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a la LGPAS y a la NOM-039-PESC-2003.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar e instrumentar las regulaciones establecidas para las artes de pesca conforme a las especificaciones de la NOM-039-PESC-2003.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en la LGPAS y en la NOM-039-PESC-2003.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar acciones para el cumplimiento de la NOM-039-PESC-2003, Pesca responsable de jaiba en aguas de jurisdicción federal del litoral del Océano Pacífico.",
        avance: "Sin información",
      },
    ],
  },
  "pac-erizo-de-mar": {
    generalidades: {
      descripcion: [
        "En la pesquería de erizo de mar en la costa occidental de la Península de Baja California se aprovechan dos especies: erizo rojo (Strongylocentrotus franciscanus) y erizo morado (Strongylocentrotus purpuratus). Se distribuyen desde la línea divisoria con Estados Unidos de América hasta Punta Eugenia, Baja California Sur, incluyendo las islas adyacentes al macizo peninsular, en sustratos rocosos y asociados a los mantos de macroalgas, desde la bajamar (erizo morado) hasta los 30 metros de profundidad (erizo rojo). Aunque no se cuenta con información suficiente de aprovechamiento, el erizo de mar (Tripneustes depressus) se encuentra en arrecifes rocosos entre los 3 y los 30 metros de profundidad; se distribuye dentro del Golfo de California (29° N) y es común en la parte sur del Golfo de California y a lo largo de la costa mexicana e islas oceánicas hasta Galápagos, Ecuador.",
        "En Baja California, la pesquería de erizo de mar está delimitada en cuatro zonas administrativas: Zona I, de la frontera con Estados Unidos de América a Punta Banda; Zona II, de Punta Banda a Punta Colonet; Zona III, de Punta Colonet a El Socorro (al sur de Bahía Falsa); y Zona IV, de El Socorro a Punta Blanca.",
      ],
      embarcaciones:
        "En la pesquería de erizo de mar se utilizan embarcaciones menores de 10.5 metros de eslora con motor fuera de borda de capacidad máxima de 115 caballos de fuerza, equipadas con un compresor de aire para suministrar aire al buzo. Participan tres pescadores (buzo, cabo de vida y motorista) y se utiliza equipo de buceo semiautónomo tipo «Hooka». La extracción es manual con gancho metálico o un «arrancador» para desprender a los organismos del sustrato.",
      especiesObjetivo: [
        { nombre: "Erizo rojo", cientifico: "Strongylocentrotus franciscanus" },
        { nombre: "Erizo morado", cientifico: "Strongylocentrotus purpuratus" },
        { nombre: "Erizo de mar", cientifico: "Tripneustes depressus" },
      ],
      especiesAsociadas: [
        { nombre: "Pepino de mar", cientifico: "Parastichopus parvimensis" },
        { nombre: "Caracol panocha", cientifico: "Megastraea undosa" },
        { nombre: "Caracol turbante", cientifico: "Megastraea turbanica" },
        { nombre: "Concha lapa", cientifico: "Megathura crenulata" },
        { nombre: "Caracol tornillo", cientifico: "Kelletia kelletii" },
        { nombre: "Caracol turbo o burgado", cientifico: "Turbo fluctuosus" },
        { nombre: "Abulón (azul, amarillo, negro, chino y rojo)", cientifico: "Haliotis spp." },
      ],
    },
    indicadores: {
      datosDestacados: [
        "En Baja California Sur se tienen escasos registros oficiales entre 2004 y 2007.",
        "En Isla Natividad se cuenta con registros para el erizo rojo, con una captura máxima de 60.5 toneladas en 2005 y 6.8 toneladas en 2007.",
      ],
      // Tendencia de las capturas de erizo rojo y morado en Baja California, 1973-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de erizo rojo y morado en Baja California, 1973–2020 (CONAPESCA)",
          series: [
            {
              estado: "Erizo rojo",
              color: "#dc2626",
              datos: [
                { año: 1973, captura: 300 },
                { año: 1974, captura: 800 },
                { año: 1975, captura: 700 },
                { año: 1976, captura: 1200 },
                { año: 1977, captura: 2500 },
                { año: 1978, captura: 3600 },
                { año: 1979, captura: 4200 },
                { año: 1980, captura: 5700 },
                { año: 1981, captura: 1700 },
                { año: 1982, captura: 1100 },
                { año: 1983, captura: 1100 },
                { año: 1984, captura: 1000 },
                { año: 1985, captura: 2800 },
                { año: 1986, captura: 4500 },
                { año: 1987, captura: 8500 },
                { año: 1988, captura: 4000 },
                { año: 1989, captura: 3900 },
                { año: 1990, captura: 5600 },
                { año: 1991, captura: 3900 },
                { año: 1992, captura: 2600 },
                { año: 1993, captura: 2200 },
                { año: 1994, captura: 2800 },
                { año: 1995, captura: 2800 },
                { año: 1996, captura: 1900 },
                { año: 1997, captura: 2200 },
                { año: 1998, captura: 1300 },
                { año: 1999, captura: 700 },
                { año: 2000, captura: 1900 },
                { año: 2001, captura: 2200 },
                { año: 2002, captura: 1600 },
                { año: 2003, captura: 1000 },
                { año: 2004, captura: 1600 },
                { año: 2005, captura: 1700 },
                { año: 2006, captura: 2400 },
                { año: 2007, captura: 1700 },
                { año: 2008, captura: 1800 },
                { año: 2009, captura: 2200 },
                { año: 2010, captura: 2500 },
                { año: 2011, captura: 3000 },
                { año: 2012, captura: 3000 },
                { año: 2013, captura: 3000 },
                { año: 2014, captura: 3400 },
                { año: 2015, captura: 2900 },
                { año: 2016, captura: 2500 },
                { año: 2017, captura: 1600 },
                { año: 2018, captura: 1900 },
                { año: 2019, captura: 2000 },
                { año: 2020, captura: 1100 },
              ],
            },
            {
              estado: "Erizo morado",
              color: "#8b5cf6",
              datos: [
                { año: 1995, captura: 600 },
                { año: 1996, captura: 750 },
                { año: 1997, captura: 800 },
                { año: 1998, captura: 400 },
                { año: 1999, captura: 300 },
                { año: 2000, captura: 400 },
                { año: 2001, captura: 100 },
                { año: 2002, captura: 450 },
                { año: 2003, captura: 400 },
                { año: 2004, captura: 350 },
                { año: 2005, captura: 200 },
                { año: 2006, captura: 400 },
                { año: 2007, captura: 150 },
                { año: 2008, captura: 100 },
                { año: 2009, captura: 200 },
                { año: 2010, captura: 250 },
                { año: 2011, captura: 200 },
                { año: 2012, captura: 250 },
                { año: 2013, captura: 500 },
                { año: 2014, captura: 200 },
                { año: 2015, captura: 250 },
                { año: 2016, captura: 250 },
                { año: 2017, captura: 400 },
                { año: 2018, captura: 900 },
                { año: 2019, captura: 400 },
                { año: 2020, captura: 300 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Entre 2013 y 2015 se originó un fenómeno oceanográfico denominado «La Mancha», entre las Aleutianas y el Golfo de Alaska, favorecido por la combinación de tres variables hidrometeorológicas: altas presiones atmosféricas, alta radiación solar y poca rapidez del viento sobre la superficie marina. Esto provocó que la superficie del mar se calentara con anomalías positivas extremas que, arrastradas posteriormente al sur por la Corriente de California, se unieron al efecto «El Niño» 2015-2016 frente a la Península de Baja California. Debido a que las poblaciones de erizo dependen de la producción primaria, de 2013 a 2015 el fenómeno inhibió el transporte de nutrientes en detrimento de la producción primaria, disminuyendo la densidad poblacional del erizo.",
    ],
    normatividad: [
      {
        instrumento: "1. Norma Oficial Mexicana",
        aplica: true,
        disposicion:
          "NOM-007-SAG/PESC-2015, para regular el aprovechamiento de las poblaciones de erizo rojo y morado en aguas de jurisdicción federal del Océano Pacífico de la costa oeste de Baja California.",
        sustento: "DOF: 24/06/2015.",
      },
      {
        instrumento: "2. Plan de Manejo Pesquero",
        aplica: true,
        disposicion:
          "Plan de Manejo Pesquero de erizo rojo (Strongylocentrotus franciscanus) y erizo morado (Strongylocentrotus purpuratus) en la Península de Baja California, México.",
        sustento: "DOF: 20/12/2012.",
      },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial o concesión de erizo de mar.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Erizo rojo: 8 centímetros de diámetro de caparazón. Erizo morado: 4.5 centímetros de diámetro de caparazón.",
        sustento: "Numeral 4.2 de la NOM-007-SAG/PESC-2015 (DOF: 24/06/2015).",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "La extracción se realiza mediante buceo semiautónomo con equipo tipo «Hooka». Se podrá auxiliar de un gancho metálico o un «arrancador» para desprender a los organismos del sustrato.",
        sustento: "Numeral 4.6 de la NOM-007-SAG/PESC-2015 (DOF: 24/06/2015).",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Erizo rojo (Strongylocentrotus franciscanus) en las aguas de jurisdicción federal del Océano Pacífico que colindan con la costa oeste de Baja California, delimitadas entre la línea fronteriza con Estados Unidos de América y el paralelo 28° 30' de latitud norte, durante el periodo del 1 de marzo al 30 de junio de cada año.",
        sustento:
          "Aviso por el que se da a conocer el establecimiento de épocas y zonas de veda para la pesca de diferentes especies de la fauna acuática en aguas de jurisdicción federal (DOF: 16/03/1994).",
      },
      { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor, sin cubierta corrida, con motor fuera de borda de potencia nominal máxima de 115 caballos de fuerza y equipada con un compresor de aire para suministrar aire al buzo. La extracción se realiza mediante buceo semiautónomo tipo «Hooka», auxiliándose de un gancho metálico o un «arrancador». La tripulación debe estar compuesta por un buzo, un bombero o motorista y un cabo de vida.",
        sustento:
          "Numerales 4.5, 4.6 y 4.8 de la NOM-007-SAG/PESC-2015 (DOF: 24/06/2015). Artículo 4, Fracción XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 350 embarcaciones. Baja California Sur: 6 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal en la costa Pacífico de Baja California, en zonas definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "En deterioro",
          color: "red",
          especie: "Erizo rojo (Strongylocentrotus franciscanus)",
          zona: "Baja California",
        },
        {
          categoria: "Con potencial de desarrollo",
          color: "green",
          especie: "Erizo morado (Strongylocentrotus purpuratus)",
          zona: "Baja California",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Erizo rojo (Strongylocentrotus franciscanus)",
          zona: "Baja California Sur — sin registro reciente de captura; información insuficiente para determinar su estatus poblacional",
        },
      ],
      estrategia: "Cuota de captura y tasa de aprovechamiento.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Veda reproductiva temporal fija",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en la LGPAS y en la NOM-007-SAG/PESC-2015, no incrementar el esfuerzo pesquero en las cuatro zonas administrativas, con excepción de algunas áreas de pesca sin permisos vigentes y de la parte sur de la zona IV (desde Punta San Carlos hasta el paralelo 28), previo dictamen del INAPESCA.",
        avance: "Sin información",
      },
      {
        recomendacion: "En las zonas con estatus Deteriorado, instrumentar estrategias para la recuperación de sus poblaciones.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Otorgar permiso de pesca de erizo morado (Strongylocentrotus purpuratus) a los permisionarios que lo soliciten y cuenten con permiso de pesca comercial de erizo rojo (Strongylocentrotus franciscanus), en sus mismas áreas de captura.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en la LGPAS y en la NOM-007-SAG/PESC-2015.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar el programa de ordenamiento y manejo por área definida, con énfasis en la región de Baja California, para promover zonas integrales de pesca de recursos bentónicos o semi-sésiles de importancia comercial, de manera que un solo permisionario u organización pueda aprovechar todos los recursos en una misma zona de pesca.",
        avance: "Sin información",
      },
    ],
  },
  "pac-abulon": {
    generalidades: {
      descripcion: [
        "Los abulones son gasterópodos de la familia Haliotidae que habitan en zonas rocosas, asociadas principalmente a mantos de algas y pastos marinos, así como a poblaciones de erizos y otros organismos bentónicos, con los que establecen relaciones tróficas de protección y competencia por sustrato y alimento. Son de hábitos nocturnos y fototropismo negativo, tienen sexos separados (dioicos) y su fertilización es externa. Las especies de abulón en México se distribuyen únicamente en la costa occidental de la península de Baja California y son de gran importancia comercial.",
        "La pesquería de abulón constituye una de las actividades más importantes que se desarrollan en la costa occidental de la península de Baja California, desde la frontera con Estados Unidos de América hasta Isla Margarita en Baja California Sur. La administración pesquera es específica para las zonas de pesca I, II, III y IV, establecidas en la NOM-005-PESC-1993.",
      ],
      embarcaciones:
        "La operación de captura se realiza a bordo de una embarcación menor con motor fuera de borda y equipo de buceo semiautónomo tipo «Hooka». La extracción es manual con arrancador graduado y se colecta en bolsa de pesca («jaba»). Participan tres pescadores: buzo, cabo de vida y motorista.",
      especiesObjetivo: [
        { nombre: "Abulón azul", cientifico: "Haliotis fulgens" },
        { nombre: "Abulón amarillo", cientifico: "Haliotis corrugata" },
        { nombre: "Abulón negro", cientifico: "Haliotis cracherodii" },
        { nombre: "Abulón chino", cientifico: "Haliotis sorenseni" },
        { nombre: "Abulón rojo", cientifico: "Haliotis rufescens" },
      ],
      especiesAsociadas: [
        { nombre: "Caracol panocha", cientifico: "Megastraea undosa" },
        { nombre: "Caracol turbante", cientifico: "Megastraea turbanica" },
        { nombre: "Erizo rojo", cientifico: "Strongylocentrotus franciscanus" },
        { nombre: "Erizo morado", cientifico: "Strongylocentrotus purpuratus" },
        { nombre: "Pepino de mar", cientifico: "Parastichopus parvimensis" },
        { nombre: "Concha lapa", cientifico: "Megathura crenulata" },
        { nombre: "Caracol tornillo", cientifico: "Kelletia kelletii" },
        { nombre: "Caracol turbo o burgado", cientifico: "Turbo fluctuosus" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "En los últimos diez años la captura se distribuye en: 78.4% abulón azul, 21.1% abulón amarillo, 0.5% abulón chino, 0.3% abulón negro y 0.2% abulón rojo.",
      ],
      // Tendencia de la captura de abulón (peso callo) en BC y BCS, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de abulón (peso callo) por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2000, captura: 170 },
                { año: 2001, captura: 120 },
                { año: 2002, captura: 135 },
                { año: 2003, captura: 175 },
                { año: 2004, captura: 172 },
                { año: 2005, captura: 168 },
                { año: 2006, captura: 195 },
                { año: 2007, captura: 175 },
                { año: 2008, captura: 190 },
                { año: 2009, captura: 210 },
                { año: 2010, captura: 155 },
                { año: 2011, captura: 80 },
                { año: 2012, captura: 120 },
                { año: 2013, captura: 68 },
                { año: 2014, captura: 60 },
                { año: 2015, captura: 53 },
                { año: 2016, captura: 55 },
                { año: 2017, captura: 57 },
                { año: 2018, captura: 22 },
                { año: 2019, captura: 22 },
                { año: 2020, captura: 28 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2000, captura: 265 },
                { año: 2001, captura: 265 },
                { año: 2002, captura: 265 },
                { año: 2003, captura: 290 },
                { año: 2004, captura: 305 },
                { año: 2005, captura: 345 },
                { año: 2006, captura: 360 },
                { año: 2007, captura: 395 },
                { año: 2008, captura: 385 },
                { año: 2009, captura: 345 },
                { año: 2010, captura: 290 },
                { año: 2011, captura: 245 },
                { año: 2012, captura: 250 },
                { año: 2013, captura: 248 },
                { año: 2014, captura: 200 },
                { año: 2015, captura: 220 },
                { año: 2016, captura: 195 },
                { año: 2017, captura: 125 },
                { año: 2018, captura: 58 },
                { año: 2019, captura: 62 },
                { año: 2020, captura: 100 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Las anomalías positivas de temperatura del mar asociadas al evento El Niño/Oscilación del Sur tienen efectos negativos en las comunidades de los bancos abuloneros. Se ha observado una alta sensibilidad de los abulones a los cambios de temperatura provocados por fenómenos climáticos como «El Niño», con efecto negativo sobre las larvas de abulón —con menor tolerancia a altas temperaturas—, además de la disminución de los mantos de algas gigantes (kelps, Macrocystis pyrifera), con la consecuente pérdida de alimento y reducción del éxito en el reclutamiento. Los eventos oceanográficos cálidos del norte («La Mancha»), ocurridos por primera vez del 2013 al 2015, afectaron negativamente a las poblaciones de abulón de la península de Baja California al inhibir el transporte de nutrientes y disminuir la producción primaria. En periodos de El Niño/Oscilación del Sur, las condiciones de mal tiempo disminuyen los días efectivos de pesca, desde Alaska (Estados Unidos de América) hasta Baja California Sur.",
    ],
    normatividad: [
      {
        instrumento: "1. Norma Oficial Mexicana",
        aplica: true,
        disposicion:
          "NOM-005-PESC-1993, para regular el aprovechamiento de las poblaciones de las distintas especies de abulón en aguas de jurisdicción federal de la Península de Baja California.",
        sustento: "DOF: 21/12/1993.",
      },
      {
        instrumento: "2. Plan de Manejo Pesquero",
        aplica: false,
        disposicion: "En proceso de actualización.",
        sustento: "",
      },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de abulón.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Zona I: 165 mm abulón rojo; 150 mm abulón azul; 140 mm abulón amarillo y chino; 120 mm abulón negro. Zona II: 145 mm abulón azul; 135 mm abulón amarillo y chino; 120 mm abulón negro. Zona III: 140 mm abulón azul; 130 mm abulón amarillo. Zona IV: 120 mm abulón azul; 110 mm abulón amarillo.",
        sustento: "Numeral 3.4 de la NOM-005-PESC-1993 (DOF: 21/12/1993).",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Buceo semiautónomo tipo «Hooka»; se recolecta manualmente en bolsa de pesca («jaba») con arrancador graduado y certificado por AGRICULTURA.",
        sustento: "NOM-005-PESC-1993 (DOF: 21/12/1993).",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Zona I: del 1 de agosto al 31 de diciembre de cada año. Zona II: del 1 de septiembre al 31 de enero de cada año. Zona III: del 1 de septiembre al 31 de enero de cada año. Zona IV: del 1 de octubre al 28 de febrero de cada año.",
        sustento:
          "Acuerdo por el que se modifica la veda de abulón establecida en el aviso de épocas y zonas de veda publicado el 16 de marzo de 1994 en el DOF (DOF: 07/07/2021).",
      },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion: "Cuota de captura anual variable por especie y zona de pesca.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda y equipo de buceo semiautónomo tipo «Hooka». La extracción es manual con arrancador graduado certificado por AGRICULTURA, con la marca que indica la talla mínima de captura para cada especie. Participan tres pescadores: buzo, cabo de vida y motorista.",
        sustento: "NOM-005-PESC-1993 (DOF: 21/12/1993). Artículo 4, Fracción XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 141 embarcaciones. Baja California Sur: 205 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal del Océano Pacífico de la costa occidental de la península de Baja California: bosques de macroalgas, arrecifes rocosos y zonas definidas en los permisos de pesca.",
        sustento: "Permisos para pesca comercial.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "En deterioro",
          color: "red",
          especie: "Abulón azul (Haliotis fulgens)",
          zona: "Península de Baja California",
        },
        {
          categoria: "En deterioro",
          color: "red",
          especie: "Abulón amarillo (Haliotis corrugata)",
          zona: "Península de Baja California",
        },
      ],
      estrategia:
        "Cuota de captura anual variable por especie y zona de pesca, estimada con base en objetivos de manejo derivados de puntos de referencia límite y objetivo.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Talla mínima de captura por especie y por zona de pesca",
        "Veda reproductiva temporal fija por zona",
        "Regulación en el arte y métodos de pesca",
        "Zonas de refugio pesquero",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en la LGPAS y en la NOM-005-PESC-1993, no incrementar el esfuerzo pesquero en toda la península de Baja California de la costa del Pacífico.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará bajo el siguiente procedimiento: (a) presentar una solicitud de cuota a la CONAPESCA, de preferencia tres meses antes del inicio de la temporada; (b) el INAPESCA comunicará a la CONAPESCA el programa de trabajo para el estudio de evaluación y el apoyo logístico necesario por parte de los usuarios; y (c) realizada la evaluación, el INAPESCA emitirá el dictamen técnico correspondiente.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En caso de que los estudios del INAPESCA determinen que alguna población se ubique como deteriorada, el INAPESCA emitirá opinión técnica con las recomendaciones y estrategias para su recuperación.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo por región y/o áreas definidas conforme a lo previsto en la LGPAS y en la NOM-005-PESC-1993.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015 (apartado 4.11, inciso e).",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Promover zonas integrales de pesca de recursos bentónicos o semi-sésiles de importancia comercial, de manera que un solo permisionario u organización pueda aprovechar todos los recursos en una misma zona de pesca.",
        avance: "Sin información",
      },
    ],
  },
  "pac-tunidos-del-pacifico": {
    generalidades: {
      descripcion: [
        "Los atunes pertenecen a la familia Scombridae, tienen hábitos pelágicos; por lo general se encuentran en la porción epipelágica de la columna de agua y rara vez por debajo de los 200 metros de profundidad. Los atunes del género Thunnus se dividen en una docena de especies de peces oceánicos. Nadan con velocidades de crucero de 3 a 7 kilómetros por hora, pero pueden alcanzar los 70 kilómetros por hora y, excepcionalmente, superar los 110 kilómetros por hora en recorridos cortos. La captura se realiza en la Zona Económica Exclusiva de México y en aguas internacionales del Océano Pacífico Oriental (hasta los 150° Oeste).",
      ],
      embarcaciones:
        "La unidad de pesca está compuesta por barcos cerqueros con capacidad de bodega variable (40 a 1,542 toneladas) y red de cerco de hasta 1,850 metros de longitud, pudiendo alcanzar 28 paños de altura. Asimismo, existe una flota varera y se capturan en la pesca deportiva.",
      especiesObjetivo: [
        { nombre: "Atún aleta amarilla", cientifico: "Thunnus albacares" },
        { nombre: "Atún aleta azul", cientifico: "Thunnus orientalis" },
      ],
      especiesAsociadas: [
        { nombre: "Barrilete", cientifico: "Katsuwonus pelamis" },
        { nombre: "Albacora", cientifico: "Thunnus alalunga" },
        { nombre: "Patudo", cientifico: "Thunnus obesus" },
        { nombre: "Barrilete negro", cientifico: "Euthynnus lineatus" },
        { nombre: "Bonito", cientifico: "Sarda spp." },
      ],
    },
    indicadores: {
      datosDestacados: [
        "En 2003 se registró la captura histórica de 183,000 toneladas.",
        "Mazatlán, Sinaloa es el principal puerto de descargas, seguido de Manzanillo, Colima y Puerto Chiapas, Chiapas.",
        "Estos puertos acumulan el 80% de las descargas de atún en México.",
        "En México existen 61 embarcaciones de cerco y 13 de vara, de acuerdo con la CIAT.",
      ],
      // Tendencia de la captura de atún aleta amarilla, 1983-2018 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de atún aleta amarilla, 1983–2018 (CONAPESCA)",
          series: [
            {
              estado: "Captura (t)",
              color: "#0d9488",
              datos: [
                { año: 1983, captura: 18500 },
                { año: 1984, captura: 81500 },
                { año: 1985, captura: 95500 },
                { año: 1986, captura: 102000 },
                { año: 1987, captura: 113500 },
                { año: 1988, captura: 116500 },
                { año: 1989, captura: 116500 },
                { año: 1990, captura: 114500 },
                { año: 1991, captura: 120000 },
                { año: 1992, captura: 105500 },
                { año: 1993, captura: 107500 },
                { año: 1994, captura: 107500 },
                { año: 1995, captura: 123000 },
                { año: 1996, captura: 137000 },
                { año: 1997, captura: 126000 },
                { año: 1998, captura: 120000 },
                { año: 1999, captura: 110500 },
                { año: 2000, captura: 122500 },
                { año: 2001, captura: 152000 },
                { año: 2002, captura: 163500 },
                { año: 2003, captura: 141000 },
                { año: 2004, captura: 108000 },
                { año: 2005, captura: 100000 },
                { año: 2006, captura: 83000 },
                { año: 2007, captura: 86500 },
                { año: 2008, captura: 93000 },
                { año: 2009, captura: 106500 },
                { año: 2010, captura: 115000 },
                { año: 2011, captura: 107000 },
                { año: 2012, captura: 99500 },
                { año: 2013, captura: 131000 },
                { año: 2014, captura: 158500 },
                { año: 2015, captura: 128500 },
                { año: 2016, captura: 111000 },
                { año: 2017, captura: 95500 },
                { año: 2018, captura: 116500 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Las variaciones en la temperatura del mar generan una serie de cambios en la distribución de los túnidos, por sus fluctuaciones en las poblaciones que constituyen su alimento y, en el caso del atún aleta amarilla, en el reclutamiento.",
    ],
    normatividad: [
      {
        instrumento: "1. Norma Oficial Mexicana",
        aplica: true,
        disposicion:
          "NOM-001-SAG/PESC-2013, Pesca responsable de túnidos: especificaciones para las operaciones de pesca con red de cerco. NOM-022-SAG/PESC-2015, para regular el aprovechamiento de las especies de túnidos con embarcaciones vareras en aguas de jurisdicción federal.",
        sustento: "DOF: 16/01/2014 y 12/06/2015.",
      },
      {
        instrumento: "2. Plan de Manejo Pesquero",
        aplica: true,
        disposicion:
          "Plan de Manejo Pesquero de Atún Aleta Amarilla (Thunnus albacares) del Océano Pacífico Mexicano. Plan de Manejo para la pesquería de Atún Aleta Azul (Thunnus orientalis) en el Pacífico Oriental.",
        sustento: "DOF: 16/07/2014 y 07/04/2021.",
      },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial y concesiones.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Red de cerco (con paño de seguridad para la pesca de aleta amarilla) de hasta 1,850 metros de longitud y hasta 200 metros de altura (12 a 18 paños de profundidad), según el tamaño y capacidad de la embarcación; para capturar el atún se utiliza el método de encierre. Vara de bambú, acrílico o fibra de vidrio de 2.5 a 3 metros de longitud y anzuelos con dimensiones mínimas de 68 mm de largo por 33.5 mm de ancho, máximo 20 varas por embarcación.",
        sustento:
          "Numeral 4.2 de la NOM-001-SAG/PESC-2013 (DOF: 16/01/2014). Numerales 4.7 y 4.8 de la NOM-022-SAG/PESC-2015 (DOF: 12/06/2015). Numeral 4.6 del Plan de Manejo Pesquero de Atún Aleta Amarilla (DOF: 16/07/2014).",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Con el propósito de inducir al aprovechamiento sustentable de las especies de túnidos, la Secretaría establece periodos y zonas de veda mediante el procedimiento de la NOM-009-ESC-1993, y adopta las medidas de manejo acordadas en el marco de la CIAT, dándolas a conocer por Acuerdos publicados en el DOF.",
        sustento:
          "Resolución de la Comisión Interamericana del Atún Tropical (CIAT). Dictamen técnico del INAPESCA. Numerales 4.1.9 y 4.1.10 de la NOM-001-SAG/PESC-2013 (DOF: 16/01/2014).",
      },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion: "Atún aleta azul: cuota de captura bienal basada en los análisis del stock de la CIAT.",
        sustento:
          "Resolución de la Comisión Interamericana del Atún Tropical (CIAT). Dictamen técnico del INAPESCA (DOF: 30/04/2020).",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcaciones mayores cerqueras, vareras y de pesca deportiva. La embarcación varera es una embarcación mayor con eslora máxima de 28 metros, con sistema de conservación de la captura, motor estacionario y capacidad de acarreo entre 50 y 200 toneladas, que utiliza como arte de pesca varas de fibra de vidrio y en ocasiones de bambú provistas de un cordel y un anzuelo sin muerte y con señuelo.",
        sustento: "Permiso para pesca comercial. Numeral 3.7 de la NOM-022-SAG/PESC-2015 (DOF: 12/06/2015).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Embarcaciones mayores: 57 con red de cerco y 7 con vara. Embarcaciones menores: Oaxaca, 215 embarcaciones; Nayarit, 20 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Zona Económica Exclusiva de México y aguas internacionales del Océano Pacífico Oriental (hasta los 150° Oeste), considerando las disposiciones normativas y lineamientos de los programas de manejo de la Reserva de la Biósfera Islas del Pacífico de la Península de Baja California.",
        sustento: "DOF: 07/12/2016.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Atún aleta amarilla (Thunnus albacares)",
          zona: "Océano Pacífico Oriental (CIAT, 2021)",
        },
        {
          categoria: "Deteriorado, en fase de recuperación",
          color: "red",
          especie: "Atún aleta azul (Thunnus orientalis)",
          zona: "Pacífico Oriental",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población en el Aprovechamiento Máximo Sustentable.",
      tacticas: ["Control del esfuerzo pesquero", "Veda temporal", "Cuota de captura"],
    },
    recomendaciones: [
      {
        recomendacion:
          "No incrementar el esfuerzo de pesca en general. No autorizar el ingreso de nuevos buques (no incluidos en el registro de la flota cerquera del Océano Pacífico Oriental), excepto para reemplazar buques eliminados del registro, siempre que la capacidad del buque o buques sustitutos no supere la de los reemplazados.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Para la pesca con vara, no incrementar el número de embarcaciones en el registro regional de buques de la CIAT.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Coadyuvar a la regulación de la pesca con objetos flotantes en el Pacífico Oriental para reducir la mortalidad de atunes de aleta amarilla menores a la talla comercial y permitir incrementar el Aprovechamiento Máximo Sustentable.",
        avance: "Sin información",
      },
      {
        recomendacion: "Mantener baja la captura de organismos menores de dos años de edad o 12 kg para el atún aleta azul.",
        avance: "Sin información",
      },
      {
        recomendacion: "Coadyuvar en la evaluación y manejo de los recursos atuneros en los foros internacionales pertinentes.",
        avance: "Sin información",
      },
    ],
  },
  "camaron-cafe": {
    generalidades: {
      descripcion: [
        "La pesquería de camarón en el noreste de México es la más importante desde el punto de vista social y económico. Esta pesquería es de carácter secuencial, es decir, que el aprovechamiento de esta especie de camarón se realiza en las lagunas costeras, así como en la zona marina o altamar. La especie predominante en las capturas es el camarón café, Penaeus aztecus. Esta especie soporta la pesquería en el noroeste del Golfo de México, principalmente en los estados de Tamaulipas y Veracruz. Ambos estados participan con un 83% respecto a la producción total del Golfo de México, de los cuales Tamaulipas aporta el 71% y Veracruz el 12%.",
      ],
      embarcaciones:
        "Se utilizan embarcaciones tipo florida con capacidad superior a las 10 toneladas de arqueo neto, con cuatro equipos de dos redes de arrastre por banda provistas con dispositivos excluidores de tortugas marinas. La eslora de las embarcaciones fluctúa entre los 19 y 26 metros. La potencia del motor varía entre los 272 y 1,150 caballos de fuerza (HP). La tripulación puede ser hasta de seis pescadores que incluyen: capitán, motorista, winchero, cocinero, pacotillero y marinero. Todos los barcos están dotados con equipo electrónico de navegación y eco detección del fondo, además poseen radios SSB, radios de alta frecuencia o VHF, compás magnético y Sistema de Localización Satelital, este último obligatorio para todas las embarcaciones mayores, especificado en la NOM-062-SAG/PESC-2014.",
      artesPesca:
        "Las características del sistema de captura empleado consisten en redes gemelas de uno de los diseños siguientes: plana, portuguesa, hawaiana y semibalón. El tamaño de la red lo determina la potencia del buque, fluctuando generalmente entre 45 y 70 pies de longitud de relinga superior. Las puertas de arrastre tienen tamaños desde 6' x 32\" hasta 8' x 42\". Obligatoriamente deben traer el excluidor de tortugas marinas de diseño rígido establecido en la NOM-002-SAG/PESC-2016 y sus modificaciones, así como en la NOM-061-SAG-PESC/SEMARNAT-2016. Para la pesca en sistemas lagunares y estuarinos se utiliza la \"charanga\", un sistema de pesca del tipo de las trampas que se instala en zonas someras de lagunas costeras o canales de estuarios por donde circulan corrientes de agua generadas por los cambios de marea.",
      especiesObjetivo: [{ nombre: "Camarón Café", cientifico: "Penaeus aztecus" }],
      especiesAsociadas: [
        { nombre: "Camarón blanco", cientifico: "Penaeus setiferus" },
        { nombre: "Camarón rosado", cientifico: "Penaeus duorarum" },
        { nombre: "Camarón roca", cientifico: "Sicyonia brevirostris" },
        { nombre: "Camarón siete barbas", cientifico: "Xiphopenaeus kroyeri" },
        { nombre: "Chile", cientifico: "Synodus foetens" },
        { nombre: "Chile", cientifico: "Synodus intermedius" },
        { nombre: "Huachinango", cientifico: "Lutjanus campechanus" },
        { nombre: "Lenguado", cientifico: "Cyclopseta chittendeni" },
        { nombre: "Paloma", cientifico: "Prionotus punctatus" },
        { nombre: "Calamar", cientifico: "Loligo pealeii" },
        { nombre: "Jaiba café", cientifico: "Portunus gibbesii" },
        { nombre: "Cangrejo", cientifico: "Calappa sulcata" },
        { nombre: "Tiburón angelito", cientifico: "Squatina mexicana" },
        { nombre: "Gurrubata", cientifico: "Micropogonias undulatus" },
      ],
    },
    indicadores: {
      capturaAnual: "11,071",
      valorProduccion: "$1,420",
      empleos: "8,500",
      embarcaciones: "2,400",
      capturaHistorica: [
        { año: 2000, captura: 15200, valor: 890 },
        { año: 2002, captura: 14800, valor: 920 },
        { año: 2004, captura: 13900, valor: 950 },
        { año: 2006, captura: 13200, valor: 980 },
        { año: 2008, captura: 12800, valor: 1020 },
        { año: 2010, captura: 12200, valor: 1080 },
        { año: 2012, captura: 11800, valor: 1150 },
        { año: 2014, captura: 11400, valor: 1200 },
        { año: 2016, captura: 11100, valor: 1280 },
        { año: 2018, captura: 10900, valor: 1350 },
        { año: 2020, captura: 11071, valor: 1420 },
      ],
      participacionEstados: [
        { estado: "Tamaulipas", porcentaje: 45.2, captura: 5004 },
        { estado: "Veracruz", porcentaje: 28.1, captura: 3111 },
        { estado: "Tabasco", porcentaje: 15.7, captura: 1738 },
        { estado: "Campeche", porcentaje: 11.0, captura: 1218 },
      ],
    },
    ambiente: [
      "Los escenarios mensuales proporcionados por el Instituto Nacional de Ecología y Cambio Climático (INECC) de la SEMARNAT para dos períodos de tiempo —futuro cercano (2015-2039) y futuro lejano (2075-2099)— mencionan que para Tamaulipas la lluvia disminuirá en el futuro cercano de 70 a 90 milímetros por año y en el futuro lejano de 100 a 170 milímetros por año; en la actualidad caen 711 mm de lluvia por año. Las regiones del norte del estado, donde se registran las menores precipitaciones anuales (400-600 milímetros), se verán severamente afectadas con disminuciones máximas del 15% y 28% respectivamente para cada escenario. Esta condición podría repercutir en menor sobrevivencia y crecimiento de las poblaciones de camarón, teniendo como resultado menores capturas.",
    ],
    normatividad: [
      {
        instrumento: "1. Norma Oficial Mexicana",
        aplica: true,
        disposicion:
          "NOM-002-SAG/PESC-2013, para ordenar el aprovechamiento de las especies de camarón en aguas de jurisdicción federal. NOM-062-SAG/PESC-2014, para la utilización del Sistema de Localización y Monitoreo Satelital de Embarcaciones Pesqueras. NOM-061-SAG-PESC/SEMARNAT-2016, especificaciones técnicas de los excluidores de tortugas marinas utilizados por la flota de arrastre camaronera.",
        sustento: "DOF: 11/07/2013 · DOF: 03/07/2015 · DOF: 13/12/2016",
      },
      {
        instrumento: "2. Plan de Manejo Pesquero",
        aplica: true,
        disposicion:
          "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de Camarón Café (Farfantepenaeus aztecus) y Camarón Blanco (Litopenaeus setiferus) en las costas de Tamaulipas y Veracruz.",
        sustento: "DOF: 12/03/2014",
      },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso comercial o concesión de pesca para camarón.",
        sustento: "Dictamen técnico del IMIPAS. Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).",
      },
      { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "En altamar, una embarcación mayor con capacidad superior a las 10 toneladas de arqueo neto, con cuatro redes de arrastre provistas con excluidores de tortugas marinas; hasta con seis pescadores. En el Golfo de México y Mar Caribe, la luz de malla en alas, cielo, cuerpo y ante bolso no podrá ser menor a 44.45 mm (1 ¾\") y en el bolso de 38.1 mm (1 ½\"). En lagunas, una charanga operada por un pescador, autorizada para los sistemas lagunarios estuarinos de Tamaulipas y norte de Veracruz.",
        sustento: "Numerales 4.3.1., 4.3.2.2. y 4.3.2.3 de la NOM-002-SAG/PESC-2013. NOM-061-SAG-PESC/SEMARNAT-2016. DOF: 21/11/1997.",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Veda temporal variable que se emite anualmente o por temporada para proteger los principales eventos biológicos (reproducción y reclutamiento).",
        sustento: "NOM-009-SAG/PESC-2015. Numeral 4.4, NOM-002-SAG/PESC-2013. Dictamen técnico del IMIPAS.",
      },
      { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación mayor: una embarcación con capacidad superior a las 10 toneladas de arqueo neto, con cuatro redes de arrastre provistas con excluidores de tortugas marinas. Sistema de localización satelital y monitoreo de embarcaciones pesqueras. Tamaulipas y norte de Veracruz: extracción manual con el uso de charangas.",
        sustento:
          "Numerales 4.2.1., 4.3.1., 4.3.2.2. y 4.3.2.3. NOM-002-SAG/PESC-2013. Carta Nacional Pesquera (DOF, 25/08/2006). NOM-062-SAG/PESC-2014. DOF: 21/11/1997.",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: false,
        disposicion: "No existen permisos o concesiones específicos de pesca comercial de camarón café.",
        sustento: "",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Queda prohibida la pesca con redes de arrastre, independientemente de la especie, dentro de la franja marina comprendida entre 0 y 9.14 metros de profundidad (0 y 5 brazas).",
        sustento: "DOF: 11/07/2013",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Camarón café",
          zona: "Golfo de México y Mar Caribe",
        },
      ],
      estrategia: "Tasa de aprovechamiento variable que no exceda el rendimiento máximo sostenible.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Veda espacial y temporal variable",
        "Regulación en el arte y método de captura",
      ],
    },
    recomendaciones: [
      { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información de avance." },
      {
        recomendacion: "Reforzar la vigilancia para controlar de manera efectiva el uso de artes de pesca no permitidos.",
        avance: "Sin información de avance.",
      },
      {
        recomendacion:
          "Cumplir los lineamientos de manejo señalados en el Plan de manejo pesquero de este recurso.",
        avance: "Sin información de avance.",
      },
    ],
  },
}

fichas["pulpo"] = {
  generalidades: {
    descripcion: [
      "La pesquería de pulpo en México es una de las más importantes del país; aporta una producción promedio de 37,000 toneladas anuales, registrándose incluso 47,000 toneladas durante 2021, lo que representó el 2.4% de la producción pesquera nacional, con un valor de 3,289 millones de pesos. Su alto valor económico la posiciona como la tercera pesquería más importante del país, solo después del camarón y el atún. A nivel nacional, Yucatán y Campeche son los principales productores, aportando el 94.5% de las capturas (SIAP, 2022); la pesquería de la Península de Yucatán es considerada la más grande del continente americano, con el 30% de la producción continental.",
      "En la región del Golfo de México y Mar Caribe, la pesquería de pulpo está basada principalmente en dos especies: el pulpo maya o rojo (Octopus maya) y el pulpo patón (O. americanus, antes O. vulgaris). O. maya representa aproximadamente el 75% de las capturas totales desde 1998, llegando al 86% durante 2020. Una tercera especie, el pulpo insular (O. insularis), es capturada en Veracruz en menor proporción (0.1%) a nivel regional, pero de gran valor económico local y cultural.",
    ],
    embarcaciones:
      "Participan dos tipos de flota: la menor o artesanal y la de mediana altura. La artesanal es la más numerosa y opera en todo el litoral de Campeche, Yucatán y norte de Quintana Roo (embarcación menor con motor fuera de borda de 115 HP, hasta 2 alijos y 4 pescadores). La pesca se realiza exclusivamente de día mediante el método campechano o \"gareteo\": la embarcación se deja a la deriva arrastrando líneas de monofilamento con carnada (jaiba y cangrejo araña) sujetas a \"jimbas\". En Veracruz (Sistema Arrecifal Veracruzano) se pesca por buceo libre o apnea con el gancho o bastón pulpero. La flota de mediana altura en Yucatán opera casi exclusivamente en Progreso: embarcación mayor a 10 t de arqueo neto que actúa como nodriza llevando hasta 12 alijos, cada uno con un par de jimbas y 5 líneas cebadas.",
    especiesObjetivo: [
      { nombre: "Pulpo Maya o rojo", cientifico: "Octopus maya" },
      { nombre: "Pulpo Patón", cientifico: "Octopus americanus" },
    ],
    especiesAsociadas: [{ nombre: "Pulpo insular de Veracruz", cientifico: "Octopus insularis" }],
  },
  indicadores: {
    capturaAnual: "37,000",
    valorProduccion: "$3,850",
    empleos: "15,500",
    embarcaciones: "3,850",
    capturaHistorica: [
      { año: 2000, captura: 28500, valor: 1850 },
      { año: 2002, captura: 31200, valor: 2050 },
      { año: 2004, captura: 33800, valor: 2250 },
      { año: 2006, captura: 35200, valor: 2450 },
      { año: 2008, captura: 36800, valor: 2650 },
      { año: 2010, captura: 38200, valor: 2850 },
      { año: 2012, captura: 37500, valor: 3050 },
      { año: 2014, captura: 36900, valor: 3250 },
      { año: 2016, captura: 37200, valor: 3450 },
      { año: 2018, captura: 37100, valor: 3650 },
      { año: 2020, captura: 37000, valor: 3850 },
    ],
    participacionEstados: [
      { estado: "Yucatán", porcentaje: 82.5, captura: 30525 },
      { estado: "Campeche", porcentaje: 15.2, captura: 5624 },
      { estado: "Quintana Roo", porcentaje: 2.3, captura: 851 },
    ],
  },
  ambiente: [
    "Con base en evidencia indirecta, se ha planteado la hipótesis de que las poblaciones de pulpos y, en general, de cefalópodos han estado proliferando en todo el mundo y específicamente alrededor de la Península de Yucatán debido a condiciones ambientales más favorables provocadas por el calentamiento global y el agotamiento de pesquerías de peces que podrían ser competidores o depredadores. La incidencia del afloramiento derivado de la Corriente de Lazo, presente durante primavera y verano, enfría el agua del fondo a 20 °C, lo que favorecería los eventos de agregación y reproducción poblacional de O. maya.",
    "De acuerdo con Reyes-Bonilla et al. (2021), sobre dos escenarios de cambio climático (SSP5/SSP585, impulsado por combustibles fósiles, y SSP1/SSP126, de sustentabilidad, para el horizonte 2050), la distribución de O. maya abarca alrededor de 42,000 km². En promedio para los dos escenarios futuros se tendría una disminución del hábitat del 19%, limitando su presencia a las zonas más someras del Banco de Campeche y Yucatán, y reduciendo su área de distribución a 34,000 km².",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-008-SAG/PESC-2015, para ordenar el aprovechamiento de las especies de pulpo en aguas de jurisdicción federal del Golfo de México y Mar Caribe.",
      sustento: "DOF: 13/04/2016",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de pulpo (O. maya y O. vulgaris) del Golfo de México y Mar Caribe.",
      sustento: "DOF: 15/07/2014",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial para pulpo y concesiones de pesca.",
      sustento: "Opinión técnica del IMIPAS. Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "110 mm de longitud de manto para ambos sexos y especies (Octopus maya y O. americanus) en el Golfo de México y Mar Caribe.",
      sustento: "Numeral 4.2, NOM-008-SAG/PESC-2015 (DOF: 13/04/2016).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Embarcación menor con motor fuera de borda de hasta 85.76 kW (115 HP), máximo dos alijos y cuatro pescadores; captura al \"gareteo\". Embarcación mayor con hasta 12 alijos y 12 pescadores. En el PNSAV la pesca deberá realizarse mediante buceo por apnea a profundidades menores a tres metros, pudiendo auxiliarse de un bastón pulpero.",
      sustento: "Numeral 4.3, NOM-008-SAG/PESC-2015 (DOF: 13/04/2016).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Del 16 de diciembre al 31 de julio de cada año en Campeche, Yucatán y Quintana Roo. Del 1 de enero al último día de febrero y del 1 al 30 de agosto de cada año para pulpo rojo en el Parque Nacional Sistema Arrecifal Veracruzano.",
      sustento: "NOM-009-PESC-1993 (DOF: 04/03/1994). Acuerdo modificatorio (DOF: 30/07/2015).",
    },
    {
      instrumento: "7. Cuota",
      aplica: true,
      disposicion: "Varía anualmente de acuerdo con dictamen técnico emitido por IMIPAS.",
      sustento: "Dictamen técnico del IMIPAS.",
    },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Flota artesanal (Península de Yucatán): embarcaciones de fibra de vidrio de 5 a 10.5 m de eslora con motor fuera de borda, hasta dos alijos. Flota artesanal (Veracruz): embarcaciones de fibra de vidrio con buceo libre y bastón pulpero. Flota de mediana altura (Yucatán): embarcación mayor a 10 t de arqueo neto que actúa como nodriza llevando hasta 12 alijos.",
      sustento:
        "Opinión técnica del IMIPAS. Permisos de pesca comercial. NOM-008-SAG/PESC-2015 (DOF: 13/04/2016). Artículo 4, Sección XVII, LGPAS (DOF: 24/04/2018).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "En Yucatán 901 permisos (2,768 embarcaciones menores y 411 mayores). En Campeche 628 permisos (1,178 menores y 1 mayor). Quintana Roo 15 permisos (245 menores). Veracruz 18 permisos (75 menores). Tabasco un permiso (una mayor). Tamaulipas un permiso (dos menores).",
      sustento: "Registros de Permisos y Concesiones de Pesca Comercial vigentes a abril de 2024.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas de jurisdicción federal y sistemas lagunares del Golfo de México y Mar Caribe. Acuerdo por el que se establece una zona de refugio pesquero parcial temporal frente al Municipio de Celestún, Yucatán.",
      sustento: "Permiso de pesca comercial y concesiones. DOF: 02/10/2019.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Pulpo maya (Octopus maya)",
        zona: "Península de Yucatán",
      },
      {
        categoria: "Con potencial de desarrollo",
        color: "green",
        especie: "Pulpo patón (Octopus americanus)",
        zona: "Península de Yucatán",
      },
    ],
    estrategia: "Cuota de captura por temporada de pesca.",
    tacticas: [
      "Control del esfuerzo",
      "Talla mínima de captura",
      "Veda reproductiva y de crecimiento",
      "Regulación en el arte de pesca",
      "Zona de refugio pesquero",
    ],
  },
  recomendaciones: [
    { recomendacion: "Instrumentar las estrategias y acciones establecidas en el Plan de Manejo Pesquero.", avance: "Sin información" },
    { recomendacion: "Mantener el esfuerzo pesquero actual y no incrementarlo.", avance: "Sin información" },
    { recomendacion: "Actualizar el Plan de Manejo Pesquero y la NOM-008-SAG/PESC-2015.", avance: "Sin información" },
    { recomendacion: "Fomentar el comanejo a través del Comité Consultivo de Manejo Pesquero.", avance: "Sin información" },
    {
      recomendacion:
        "Implementar la productividad latente total promedio (PLT) como Punto de Referencia Límite y actualizarlo anualmente con la información pesquera disponible.",
      avance: "Sin información",
    },
    {
      recomendacion: "Regular el número de alijos permitidos por tipo de embarcación y verificar las artes de pesca conforme a la NOM-008-SAG/PESC-2015.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Evitar el uso de grampines en el arte del garete cuando la pesca se realice por debajo y hasta la isóbata de 30 m, zona de mayor abundancia de Octopus maya.",
      avance: "Sin información",
    },
    { recomendacion: "La cuota de pesca no debe sobrepasar el Punto de Referencia Límite.", avance: "Sin información" },
    { recomendacion: "Reforzar las acciones de inspección y vigilancia para evitar la pesca furtiva con buceo y demás artes no permitidas.", avance: "Sin información" },
    {
      recomendacion:
        "Prohibir el uso de especies en categoría de riesgo o bajo protección especial como cebo o carnada para la captura de pulpo.",
      avance: "Sin información",
    },
    { recomendacion: "Desagregar las capturas por especie en los avisos de arribo.", avance: "Sin información" },
  ],
}

fichas["pez-espada"] = {
  generalidades: {
    descripcion: [
      "El pez espada (Xiphias gladius) es una especie altamente migratoria y ampliamente distribuida a nivel mundial. Habita aguas tropicales con temperaturas entre 13 °C y 24 °C, a profundidades de hasta 1,000 metros, con distribución latitudinal de 50°N a 50°S. Los organismos juveniles se mantienen en aguas menos profundas y más cálidas, con menor capacidad de migración, por lo que son más susceptibles a la pesca. Es una especie objetivo de la pesca deportiva-recreativa dentro de las 50 millas náuticas a partir de la línea de costa, y se aprovecha comercialmente por embarcaciones mayores en aguas posteriores a esas 50 millas.",
    ],
    artesPesca:
      "Para la captura de pez espada en el Golfo de México se utiliza el palangre de deriva \"tipo americano\": una línea principal de monofilamento de nylon (4.0-4.5 mm) de 55 a 75 km de longitud (\"línea madre\"), sostenida horizontalmente por flotadores con líneas verticales (\"orinques\"). De la línea madre penden \"reinales\", cada uno con anzuelo tipo \"garra de águila o circular\" No. 16/0 (en promedio 658 anzuelos por lance). La carnada principal es viva: ojón (Selar crumenophthalmus), jiníguaro (Haemulon aurolineatum), macarela (Decapterus spp), sardina (Sardinella spp) y calamar (Loligo spp). El equipo incluye radioboyas, banderines, flotadores y luces de señalización.",
    especiesObjetivo: [{ nombre: "Pez Espada", cientifico: "Xiphias gladius" }],
    especiesAsociadas: [
      { nombre: "Peto, wahoo", cientifico: "Acanthocybium solandri" },
      { nombre: "Tiburón zorro", cientifico: "Alopias spp" },
      { nombre: "Lanceta", cientifico: "Alepisaurus spp" },
      { nombre: "Tiburón puntas negras", cientifico: "Carcharhinus limbatus" },
      { nombre: "Tiburón aleta negra", cientifico: "Carcharhinus falciformis" },
      { nombre: "Tiburón puntas blancas", cientifico: "Carcharhinus longimanus" },
      { nombre: "Dorado", cientifico: "Coryphaena hippurus" },
      { nombre: "Tintorera, tigre", cientifico: "Galeocerdo cuvier" },
      { nombre: "Pez vela", cientifico: "Istiophorus albicans" },
      { nombre: "Tiburón mako, alecrín, marrajo", cientifico: "Isurus oxyrinchus" },
      { nombre: "Barrilete, listado", cientifico: "Katsuwonus pelamis" },
      { nombre: "Marlin azul, aguja azul", cientifico: "Makaira nigricans" },
      { nombre: "Aceitoso", cientifico: "Lepidocybium flavobrunneum" },
      { nombre: "Tiburón martillo, cornuda", cientifico: "Sphyrna spp" },
      { nombre: "Marlin blanco, aguja blanca", cientifico: "Tetrapturus albidus" },
      { nombre: "Marlin aguja larga", cientifico: "Tetrapturus pfluegeri" },
      { nombre: "Atún aleta amarilla, rabil", cientifico: "Thunnus albacares" },
      { nombre: "Atún aleta negra", cientifico: "Thunnus atlanticus" },
      { nombre: "Patudo", cientifico: "Thunnus obesus" },
      { nombre: "Atún aleta azul, atún rojo del Atlántico", cientifico: "Thunnus thynnus" },
    ],
  },
  indicadores: {
    capturaAnual: "1,900",
    valorProduccion: "$1,650",
    empleos: "1,200",
    embarcaciones: "450",
    capturaHistorica: [
      { año: 2000, captura: 850, valor: 680 },
      { año: 2002, captura: 920, valor: 750 },
      { año: 2004, captura: 1050, valor: 850 },
      { año: 2006, captura: 1180, valor: 950 },
      { año: 2008, captura: 1320, valor: 1050 },
      { año: 2010, captura: 1450, valor: 1150 },
      { año: 2012, captura: 1580, valor: 1250 },
      { año: 2014, captura: 1680, valor: 1350 },
      { año: 2016, captura: 1750, valor: 1450 },
      { año: 2018, captura: 1820, valor: 1550 },
      { año: 2020, captura: 1900, valor: 1650 },
    ],
    participacionEstados: [
      { estado: "Baja California", porcentaje: 45.2, captura: 859 },
      { estado: "Baja California Sur", porcentaje: 28.5, captura: 542 },
      { estado: "Sinaloa", porcentaje: 15.8, captura: 300 },
      { estado: "Sonora", porcentaje: 10.5, captura: 199 },
    ],
  },
  ambiente: [
    "Los efectos del cambio climático se relacionan directamente con cambios en la temperatura media anual, con un registro continuo de aumento. Dichos efectos han impactado las poblaciones de peces, con cambios en su crecimiento, reproducción, mortalidad, comportamiento y distribución. El calentamiento global puede tener grandes implicaciones en la disminución de capturas de peces pelágicos mayores. La distribución del pez espada depende de la edad y sexo del pez y varía estacionalmente; las larvas se asocian a temperaturas superiores a 24 °C, con distribución continua en aguas subtropicales y tropicales. Las proyecciones futuras estiman una disminución general en la abundancia relativa, sustancial en la mayoría de las áreas tropicales y con un ligero aumento en los límites de su rango de distribución.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-023-SAG/PESC-2014, que regula el aprovechamiento de las especies de túnidos con embarcaciones palangreras en aguas de jurisdicción federal del Golfo de México y Mar Caribe.",
      sustento: "DOF: 16/04/2014",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de pez espada.",
      sustento: "Opinión técnica del IMIPAS. Artículo 36, Fracción III de la LGPAS (DOF: 24/04/2018).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "Talla mínima de captura comercial de 125 cm de longitud de mandíbula inferior a la horquilla (LJFL), equivalente a 25 kg en peso vivo. Los ejemplares con talla inferior deberán liberarse en buenas condiciones de sobrevivencia.",
      sustento: "DOF: 23/05/2019",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Palangre atunero de superficie a la deriva, con longitud máxima de 60,000 metros, uso de 100% anzuelos circulares No. 16/0 y un máximo de 800 anzuelos por palangre.",
      sustento: "Numeral 4.2 de la NOM-023-SAG/PESC-2014 (DOF: 16/04/2014).",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "7. Cuota",
      aplica: true,
      disposicion:
        "Captura total permitida (TAC) de 13,200 t para el pez espada del Atlántico norte para los años 2018 a 2023; de dicho TAC, a México le corresponden 200 t.",
      sustento:
        "Rec. 22-03 de ICCAT, que reemplaza la recomendación 21-02 y enmienda la 17-02 para la conservación del pez espada del Atlántico norte (CICAA).",
    },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "6 embarcaciones mayores palangreras.",
      sustento: "Permisos de pesca comercial para embarcaciones mayores. Numeral 4.2 de la NOM-023-SAG/PESC-2014 (DOF: 16/04/2014).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion: "34 embarcaciones mayores palangreras.",
      sustento: "Registros de Permisos y Concesiones de Pesca Comercial del Sistema de Administración Pesquera.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "Zona Económica Exclusiva del Golfo de México y Mar Caribe. Zonas delimitadas en el Pacífico mexicano. Aguas de jurisdicción federal.",
      sustento: "Permisos de pesca comercial para embarcaciones mayores. DOF: 16/04/2014.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Con potencial de desarrollo",
        color: "green",
        especie: "Pez espada (Xiphias gladius)",
        zona: "Pacífico Mexicano",
      },
    ],
    estrategia:
      "Cuota de captura internacional adoptada en el marco de la CICAA, referida a la cuota de captura asignada a México para el pez espada del Atlántico norte.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Regulación de artes de pesca y método de captura",
      "Zonas de pesca",
      "Talla mínima de captura",
    ],
  },
  recomendaciones: [
    { recomendacion: "Elaborar el Plan de Manejo Pesquero de pez espada del Golfo de México.", avance: "Sin información de avance." },
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información de avance." },
    { recomendacion: "Continuar con el Programa de Observadores a Bordo.", avance: "Sin información de avance." },
  ],
}

fichas["bagre-bandera"] = {
  generalidades: {
    descripcion: [
      "La pesquería artesanal de bagre bandera es muy importante, principalmente en las costas de Campeche y Tabasco, y la de bagre o curuco en Veracruz. Esta importancia se debe a la abundancia y al valor comercial de ambas especies.",
      "El bagre bandera destaca por los altos volúmenes que se capturan en el Golfo de México. Sostiene una pesquería artesanal que representa una valiosa fuente de empleo para las comunidades ribereñas. La flota ribereña opera de acuerdo con las abundancias estacionales; la captura es homogénea durante todo el año, con la mayor producción de mayo a septiembre.",
    ],
    embarcaciones:
      "Para la pesquería de bagres marinos se utilizan embarcaciones de 7.0 a 8.8 metros de eslora, con motor fuera de borda de 48 a 115 caballos de fuerza (HP) de dos y cuatro tiempos, y entre dos y cinco pescadores.",
    artesPesca:
      "El principal arte de pesca es el palangre de fondo de 300 a 3,000 anzuelos de tipo noruego del número 5 y 6, y garra de águila o japonés del número 10 al 12; además se utiliza línea de mano con anzuelos del 6 al 9 tipo circular. Se usan como carnada peces pequeños (liseta, cojinuda, topota, chivito, sardina, bonito y cintilla) y calamar. También se utilizan redes de enmalle de 11.4 centímetros de tamaño de malla.",
    especiesObjetivo: [
      { nombre: "Bagre Bandera, bosh", cientifico: "Bagre marinus" },
      { nombre: "Bagre, bosh, curuco", cientifico: "Ariopsis felis" },
    ],
    especiesAsociadas: [
      { nombre: "Trucha, corvina blanca", cientifico: "Cynoscion arenarius" },
      { nombre: "Cherna, mero guasa", cientifico: "Epinephelus itajara" },
      { nombre: "Huachinango", cientifico: "Lutjanus campechanus" },
      { nombre: "Raya látigo, blanca o balá", cientifico: "Hypanus americanus" },
      { nombre: "Cornuda, tiburón martillo", cientifico: "Sphyrna lewini" },
      { nombre: "Chucho, raya pinta", cientifico: "Aetobatus narinari" },
      { nombre: "Serrano arenero, bolo", cientifico: "Diplectrum formosum" },
      { nombre: "Guabina, serrano", cientifico: "Diplectrum bivittatum" },
      { nombre: "Guabina", cientifico: "Gobiomorus dormitor" },
      { nombre: "Villajaiba, rubia", cientifico: "Lutjanus synagris" },
      { nombre: "Raya tigre, raya del Golfo", cientifico: "Rostroraja texana" },
      { nombre: "Guitarra, raya diablo", cientifico: "Pseudobatos lentiginosus" },
      { nombre: "Lenguado arenoso", cientifico: "Syacium gunteri" },
      { nombre: "Chile, tolete", cientifico: "Synodus foetens" },
      { nombre: "Cobia, bacalao, esmedregal", cientifico: "Rachycentron canadum" },
      { nombre: "Lenguado", cientifico: "Bothus ocellatus, Bothus robinsi" },
    ],
  },
  indicadores: {
    // Promedio regional de bagre bandera 2016-2020 (suma de promedios estatales, CNP 2025).
    capturaAnual: "5,631",
    // Capturas históricas por estado (CNP 2025). La Carta Nacional cita sólo años
    // clave, por lo que las series son de puntos dispersos.
    capturaPorEstado: [
      {
        titulo: "Bagre bandera (Bagre marinus) — captura por estado",
        series: [
          {
            estado: "Tabasco",
            color: "#0d9488",
            datos: [
              { año: 2009, captura: 1631 }, // mínimo del periodo decreciente
              { año: 2017, captura: 4921 }, // máximo histórico
            ],
          },
          {
            estado: "Campeche",
            color: "#0891b2",
            datos: [
              { año: 1994, captura: 600 }, // estabilidad relativa 1990-1998 (aprox.)
              { año: 2001, captura: 1956 }, // máximo histórico
              { año: 2013, captura: 1311 }, // fin de la tendencia a la baja
            ],
          },
          {
            estado: "Veracruz",
            color: "#f59e0b",
            datos: [
              { año: 1998, captura: 1089 }, // máximo histórico
            ],
          },
        ],
      },
      {
        titulo: "Curuco (Ariopsis felis) — captura en Veracruz",
        series: [
          {
            estado: "Veracruz",
            color: "#8b5cf6",
            datos: [
              { año: 1996, captura: 1000 }, // periodo de mayor producción 1993-1999 (aprox.)
              { año: 2013, captura: 228 }, // mínimo
              { año: 2020, captura: 166 }, // último valor
            ],
          },
        ],
      },
    ],
    // Participación de bagre bandera por estado, promedio 2016-2020 (CNP 2025).
    participacionEstados: [
      { estado: "Tabasco", porcentaje: 54.8, captura: 3083 },
      { estado: "Campeche", porcentaje: 29.5, captura: 1663 },
      { estado: "Yucatán", porcentaje: 7.6, captura: 430 },
      { estado: "Veracruz", porcentaje: 6.3, captura: 356 },
      { estado: "Tamaulipas", porcentaje: 1.8, captura: 99 },
    ],
  },
  ambiente: [
    "El cambio climático ha afectado los recursos pesqueros: el calentamiento global ha causado trastornos en la estacionalidad de algunos procesos biológicos, como en las redes tróficas marinas y de agua dulce. Además, ha ocasionado acontecimientos extremos —inundaciones, sequías y tormentas— que alteran la estacionalidad de los recursos, con consecuencias imprevisibles para la producción pesquera. Se ha registrado un desplazamiento hacia los polos de las especies de aguas templadas, con cambios en el tamaño y productividad de sus hábitats y efectos tanto positivos como negativos según las regiones y latitudes.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos de pesca comercial para embarcaciones menores para la pesquería de escama marina.",
      sustento: "Dictamen técnico del IMIPAS. Artículo 36, Fracción III de la LGPAS (DOF, 04/12/2023).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "En proceso de elaboración.", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion: "Palangre de fondo, línea de mano con carnada y redes de enmalle de 11.4 centímetros de tamaño de malla.",
      sustento: "Permisos de pesca comercial para embarcaciones menores para la pesquería de escama marina.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcaciones menores.",
      sustento: "Permisos de pesca comercial para embarcaciones menores para la pesquería de escama marina.",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion:
        "No existen permisos o concesiones específicos de pesca comercial de bagres marinos (amparado por el permiso de pesca comercial de escama marina en la región).",
      sustento: "",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "Aguas marinas de jurisdicción federal y sistemas lagunares del Golfo de México y Mar Caribe.",
      sustento: "Permisos de pesca comercial para embarcaciones menores para la pesquería de escama marina.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Bagre bandera (Bagre marinus)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Curuco (Ariopsis felis)",
        zona: "Golfo de México y Mar Caribe",
      },
    ],
    estrategia: "Tasa de aprovechamiento variable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Regulación en el arte y método de captura",
      "Zona de pesca",
      "Zonas de refugio pesquero",
    ],
  },
  recomendaciones: [
    {
      recomendacion: "Formular un Plan de Manejo Pesquero para el recurso y grupo de especies asociadas a la pesquería.",
      avance: "Sin información de avance.",
    },
    {
      recomendacion:
        "Implementar medidas regulatorias para proteger el periodo de reproducción (de junio a agosto de cada año) y el cuidado parental.",
      avance: "Sin información de avance.",
    },
    { recomendacion: "Prohibir el uso de redes de enmalle en épocas y zonas de desove.", avance: "Sin información de avance." },
    { recomendacion: "No incrementar el esfuerzo de pesca.", avance: "Sin información de avance." },
  ],
}

fichas["pepino-mar"] = {
  generalidades: {
    descripcion: [
      "De acuerdo con las estadísticas oficiales, la producción pesquera de pepinos de mar en México de 2012 a 2018 fue de entre 762 y 2,762 toneladas anuales, de las cuales el 88% proviene del Golfo de México y Mar Caribe y el 12% restante del Pacífico mexicano. El 94% de la captura en el Golfo de México se sostiene por la extracción proveniente de Yucatán, donde la especie predominante es el pepino de mar café (Isostichopus badionotus), seguida de Holothuria floridana. Con excepción del pepino de mar café, para el cual se han abierto ventanas de aprovechamiento con cuotas de captura definidas, todas las demás especies con valor comercial se han mantenido en veda permanente en el Golfo de México desde 2013.",
    ],
    artesPesca:
      "El método de pesca para el pepino de mar café es el buceo semiautónomo tipo hookah. El buzo lleva uno o dos plomos fijos al cinturón, del que se amarra la manguera unida al tanque que acumula el aire del compresor. Durante la faena participan dos buzos, un manguerero y el capitán (a veces un quinto integrante para la evisceración). El buzo es arrastrado hasta topar con un parche de pepino de mar, que recolecta en una bolsa conocida como \"buxaca\". El equipo incluye aletas, visor, snorkel, reguladores, plomos, filtro, compresora (5.5 HP, 60-100 lb/pulg²), pulmones (tanques receptores), manguera de alta presión y buxaca.",
    especiesObjetivo: [{ nombre: "Pepino de Mar", cientifico: "Isostichopus badionotus" }],
    especiesAsociadas: [
      { nombre: "Pepino de mar lápiz", cientifico: "Holothuria floridana" },
      { nombre: "Pepino de mar peluche", cientifico: "Astichopus multifidus" },
      { nombre: "Pepino de mar, Michelin pepino", cientifico: "Holothuria mexicana" },
      { nombre: "Pepino de mar gris", cientifico: "Holothuria grisea" },
    ],
  },
  indicadores: {
    capturaAnual: "285",
    valorProduccion: "$890",
    empleos: "1,850",
    embarcaciones: "650",
    capturaHistorica: [
      { año: 2000, captura: 1200, valor: 450 },
      { año: 2002, captura: 850, valor: 480 },
      { año: 2004, captura: 600, valor: 520 },
      { año: 2006, captura: 450, valor: 580 },
      { año: 2008, captura: 380, valor: 650 },
      { año: 2010, captura: 320, valor: 720 },
      { año: 2012, captura: 300, valor: 780 },
      { año: 2014, captura: 290, valor: 820 },
      { año: 2016, captura: 285, valor: 860 },
      { año: 2018, captura: 285, valor: 880 },
      { año: 2020, captura: 285, valor: 890 },
    ],
    participacionEstados: [
      { estado: "Yucatán", porcentaje: 65.3, captura: 186 },
      { estado: "Campeche", porcentaje: 25.7, captura: 73 },
      { estado: "Quintana Roo", porcentaje: 9.0, captura: 26 },
    ],
  },
  ambiente: [
    "La temperatura global promedio ± EE en la zona de distribución del pepino de mar lápiz (H. floridana), frente a las costas de Campeche, durante 2010-2023 ha sido de 29 ± 0.05 °C, con un mínimo de 24-25 °C en 2013 y un máximo de 33 °C en 2016. No se determinó relación entre la temperatura y la densidad registrada por año, por lo que la variación anual de la temperatura no ha mostrado ser determinante para un cambio en la densidad de este recurso.",
    "La temperatura global promedio ± EE en la zona de distribución del pepino de mar café (I. badionotus) es de 25 ± 0.04 °C. Las biomasas más altas in situ se registraron en 2010 y 2013; en 2013 la temperatura estuvo dos grados por debajo del promedio, lo cual puede estar relacionado con el reclutamiento en los sitios más someros de las zonas I y II, donde se ubicó el parche de mayor tamaño a lo largo de la costa de Yucatán ese año.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de pepino de mar café (Isostichopus badionotus) y lápiz (Holothuria floridana) en la península de Yucatán.",
      sustento: "DOF: 12/05/2015",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial para pepino de mar café Isostichopus badionotus.",
      sustento: "Opinión técnica del IMIPAS.",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "23 cm de longitud dorsal para pepino de mar café (I. badionotus). 13 cm de longitud dorsal para pepino de mar lápiz (H. floridana).",
      sustento: "Plan de Manejo Pesquero (DOF: 12/05/2015).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion: "Buceo semiautónomo empleando el equipo denominado \"hookah\" para la captura de I. badionotus.",
      sustento: "Plan de Manejo Pesquero (DOF: 12/05/2015).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "NOM-009-PESC-1993. Veda permanente. Acuerdo que modifica el aviso de épocas y zonas de veda (publicado el 16/03/1994) para establecer la cuota de aprovechamiento de pepino de mar café (Isostichopus badionotus) frente al Estado de Yucatán en 2018.",
      sustento: "DOF: 25/04/2013. DOF: 06/04/2018.",
    },
    {
      instrumento: "7. Cuota",
      aplica: true,
      disposicion: "Variable de acuerdo con la disponibilidad del recurso.",
      sustento: "Dictamen técnico del IMIPAS.",
    },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores de fibra de vidrio de 20 a 22 pies de eslora, equipadas con motor fuera de borda de capacidad variable (40 a 115 HP).",
      sustento: "Plan de Manejo Pesquero (DOF: 12/05/2015). Permisos de pesca comercial para pepino de mar.",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion:
        "No existen permisos o concesiones para la pesca comercial de pepino de mar H. floridana. Para I. badionotus se tiene un registro de 189 permisos de pesca comercial que amparan 561 embarcaciones.",
      sustento: "DOF: 06/04/2018. Base de datos de la CONAPESCA.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Veda permanente para todas las especies de pepino de mar desde el 7 de abril de 2018 en aguas marinas de jurisdicción federal frente a la Península de Yucatán, desde la frontera entre Tabasco y Campeche hasta la frontera con Belice. Acuerdo por el que se establece una zona de refugio pesquero parcial temporal frente al Municipio de Celestún, Yucatán.",
      sustento: "DOF: 06/04/2018. DOF: 02/10/2019.",
    },
  ],
  status: {
    cards: [
      { categoria: "En deterioro", color: "red", especie: "Pepino de mar café (Isostichopus badionotus)", zona: "Golfo de México y Mar Caribe" },
      { categoria: "En deterioro", color: "red", especie: "Pepino lápiz (Holothuria floridana)", zona: "Golfo de México y Mar Caribe" },
      { categoria: "En deterioro", color: "red", especie: "Pepino de mar (Isostichopus badionotus)", zona: "Golfo de México y Mar Caribe" },
    ],
    estrategia: "Cuota de captura de acuerdo con la abundancia y biomasa determinada por dictamen técnico emitido por el IMIPAS.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Regulación en el arte y método de captura",
      "Talla mínima de captura",
      "Veda temporal y espacial",
      "Zona de pesca",
      "Zonas de refugio pesquero",
      "Cierre de zonas con altos niveles de reclutamiento o bajas densidades",
      "Rotación de banco de aprovechamiento",
    ],
  },
  recomendaciones: [
    { recomendacion: "Promover la formulación de un ordenamiento pesquero en la península de Yucatán.", avance: "Sin información de avance." },
    { recomendacion: "Actualizar el Plan de Manejo Pesquero.", avance: "Sin información de avance." },
    { recomendacion: "Elaborar una Norma Oficial Mexicana para el aprovechamiento de pepino de mar.", avance: "Sin información de avance." },
    {
      recomendacion: "Promover la erradicación de la práctica del buceo con compresores y manguera tipo hookah para la captura de pepino de mar lápiz (H. floridana).",
      avance: "Sin información de avance.",
    },
    {
      recomendacion: "Establecer sitios para traslocación y zonas de refugio pesquero para la recuperación de las poblaciones de pepino de mar.",
      avance: "Sin información de avance.",
    },
    { recomendacion: "Fomentar el comanejo a través del Comité Consultivo de Manejo Pesquero del recurso pepino de mar.", avance: "Sin información de avance." },
    {
      recomendacion: "No permitir la captura de otras especies de pepinos de mar diferentes a I. badionotus en ninguna región del Golfo de México y Mar Caribe.",
      avance: "Sin información de avance.",
    },
    { recomendacion: "Fortalecer la inspección y vigilancia para erradicar la pesca ilegal.", avance: "Sin información de avance." },
  ],
}

fichas["camaron-rojo-roca"] = {
  generalidades: {
    descripcion: [
      "En Quintana Roo, la pesquería de camarón de altamar representa la tercera pesquería en importancia por las capturas (431 toneladas de peso vivo) después de mero y langosta, y la segunda por el valor económico que genera ($25,373,000.00 pesos) solo después de la langosta. La captura se realiza en el área conocida como \"Caladeros de Contoy\", tanto por embarcaciones de Quintana Roo como por las provenientes de otros estados del Golfo de México, principalmente de Campeche.",
      "La flota local en activo se ha reducido considerablemente, teniendo como puerto base Puerto Juárez, al norte de Cancún. Sin embargo, esta pesquería es la única que opera con barcos tecnificados en la zona. Se estima que la actividad beneficia directamente a 60 familias e indirectamente influye en 1,600 personas en la zona norte de Quintana Roo, considerando la derrama económica en materiales y equipo que demanda el sector, así como en las plantas procesadoras y comercializadoras.",
    ],
    embarcaciones:
      "La unidad de pesca consiste en una embarcación mayor camaronera tipo Florida, con capacidad superior a 10 toneladas de arqueo neto, una eslora entre 19.5 y 23 metros y una potencia variable entre 350 y 850 caballos de fuerza (HP). Presenta dispositivos de navegación como compás magnético, GPS digital de alta precisión, ecosonda de fondo y en algunos casos radar, además de radios VHF y UHF en banda marina. Es operada por una tripulación de hasta seis integrantes: capitán, motorista, winchero, cocinero y generalmente dos pacotilleros.",
    artesPesca:
      "El arte de pesca consiste en un sistema de cuatro redes de arrastre. Durante los lances se disponen dos redes gemelas por banda (babor y estribor), introducidas al mar con cable de acero inoxidable montado en un cabrestante electromecánico o \"wincher\". Las redes presentan una luz de malla no menor a 44.45 mm (1 ¾\") en alas, cielo o \"square\", cuerpo y antebolso, y de 38.1 mm (1 ½\") en el bolso. Están provistas de dispositivos excluidores de tortugas marinas (DET's), obligatorios durante su funcionamiento.",
    especiesObjetivo: [
      { nombre: "Camarón rojo o rosado del Caribe", cientifico: "Penaeus brasiliensis" },
      { nombre: "Camarón roca", cientifico: "Sicyonia brevirostris" },
    ],
    especiesAsociadas: [
      { nombre: "Camarón rosado", cientifico: "Penaeus duorarum" },
      { nombre: "Camarón sintético", cientifico: "Trachipenaeus spp." },
      { nombre: "Torito", cientifico: "Acanthostracion quadricornis" },
      { nombre: "Lenguado", cientifico: "Syacium papillosum, Gastropsetta frontalis, Citharichthys macrops, Gymnachirus melas, Bothus robinsi, Bothus ocellatus" },
      { nombre: "Agustín Lara", cientifico: "Aluterus scriptus" },
      { nombre: "Pez lija", cientifico: "Aluterus monoceros" },
      { nombre: "Pez león", cientifico: "Pterois volitans" },
      { nombre: "Pez rojo", cientifico: "Scorpaena agassizii, Neomerinthe hemingwayi" },
      { nombre: "Chile", cientifico: "Synodus foetens, Trachinocephalus myops, Diplectrum formosum, Centropristis ocyurus, Synodus intermedius" },
      { nombre: "Pez sapo", cientifico: "Antennarius scaber" },
      { nombre: "Pez murciélago", cientifico: "Ogcocephalus nasutus, Ogcocephalus radiatus" },
      { nombre: "Guitarra", cientifico: "Pseudobatos lentiginosus" },
      { nombre: "Raya blanca o balá", cientifico: "Hypanus americanus" },
      { nombre: "Raya tejana", cientifico: "Rostroraja texana" },
      { nombre: "Raya ackleyi", cientifico: "Rostroraja ackleyi" },
      { nombre: "Torpedo", cientifico: "Narcine brasiliensis" },
      { nombre: "Raya mariposa", cientifico: "Gymnura spp" },
      { nombre: "Calamar", cientifico: "Doryteuthis pealeii, D. plei" },
      { nombre: "Pulpo", cientifico: "Octopus sp." },
      { nombre: "Jaiba", cientifico: "Achelous spinimanus, Achelous spinicarpus" },
      { nombre: "Cangrejo", cientifico: "Calappa sp." },
      { nombre: "Caballito de mar", cientifico: "Hippocampus erectus" },
    ],
  },
  indicadores: {
    capturaAnual: "6,650",
    valorProduccion: "$720",
    empleos: "4,200",
    embarcaciones: "1,600",
    capturaHistorica: [
      { año: 2000, captura: 8200, valor: 520 },
      { año: 2002, captura: 8100, valor: 540 },
      { año: 2004, captura: 7900, valor: 560 },
      { año: 2006, captura: 7700, valor: 580 },
      { año: 2008, captura: 7500, valor: 600 },
      { año: 2010, captura: 7300, valor: 620 },
      { año: 2012, captura: 7100, valor: 640 },
      { año: 2014, captura: 6900, valor: 660 },
      { año: 2016, captura: 6800, valor: 680 },
      { año: 2018, captura: 6700, valor: 700 },
      { año: 2020, captura: 6650, valor: 720 },
    ],
    participacionEstados: [
      { estado: "Sonora", porcentaje: 52.0, captura: 3458 },
      { estado: "Sinaloa", porcentaje: 38.0, captura: 2527 },
      { estado: "Nayarit", porcentaje: 10.0, captura: 665 },
    ],
  },
  ambiente: [
    "En el Atlántico, la captura de camarón —en especial del camarón roca— se ve afectada por eventos climáticos adversos como los \"nortes\" y huracanes, que impiden la navegación de la flota camaronera, con más frecuencia en los meses en que el camarón roca es más abundante. En los últimos 12 años el camarón roca presenta picos de alta productividad cada 2 a 3 años de forma cíclica, lo que sugiere una posible relación con factores ambientales.",
    "La vulnerabilidad del hábitat se evidencia porque los juveniles se capturan en lagunas costeras y los adultos en zonas marinas y costeras. Aunque son euritermales y eurihalinos, su crecimiento es óptimo entre 24-28 °C y salinidades entre 23 y 36 ups. La temperatura del agua es un inductor importante de la reproducción y favorece el crecimiento y reclutamiento; se han observado variaciones interanuales más evidentes en años El Niño y La Niña, con profunda influencia en la biomasa del camarón.",
    "Un ejemplo de cambios potenciales derivados del cambio climático es el camarón rosado (P. duorarum): simulaciones con diversas variables oceanográficas sugieren que para 2050 su presencia disminuiría a 32% y las poblaciones se limitarían a Tabasco y Campeche; bajo un segundo escenario su área casi desaparecería. Por ello es necesario incorporar aspectos ambientales en la evaluación y manejo de la pesquería de camarón en los Caladeros de Contoy.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-002-SAG/PESC-2013, para ordenar el aprovechamiento de las especies de camarón. NOM-062-SAG/PESC-2014, para la utilización del Sistema de Localización y Monitoreo Satelital de Embarcaciones Pesqueras. NOM-061-SAG-PESC/SEMARNAT-2016, especificaciones técnicas de los excluidores de tortugas marinas.",
      sustento: "DOF: 11/07/2013 · DOF: 03/07/2015 · DOF: 13/12/2016",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero para las especies de camarón rojo (Farfantepenaeus brasiliensis) y de roca (Sicyonia brevirostris) de los Caladeros de Contoy, Quintana Roo.",
      sustento: "DOF: 25/03/2014",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos de pesca comercial para camarón de altamar.",
      sustento: "Dictamen técnico del IMIPAS. Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Cuatro redes de arrastre con luz de malla no menor a 44.45 mm (1 ¾\") en alas, cielo \"square\", cuerpo y antebolso, y de 38.1 mm (1 ½\") en el bolso. Provistas con dispositivos excluidores de tortugas marinas (DET's).",
      sustento: "Numerales 4.3.1., 4.3.2.2. y 4.3.2.3. de la NOM-002-SAG/PESC-2013 (DOF, 11/07/2013). NOM-061-SAG-PESC/SEMARNAT-2016 (DOF, 13/12/2016).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Veda temporal variable emitida anualmente o por temporada para proteger la reproducción y el reclutamiento. Veda permanente en la franja marina costera de las 0 a las 15 millas náuticas desde Isla Aguada, Campeche, hasta los límites con Belice, exceptuando los caladeros de Contoy.",
      sustento: "NOM-009-SAG/PESC-2015 (DOF, 12/02/2016). Dictamen técnico del IMIPAS.",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcación mayor con capacidad superior a las 10 t de arqueo neto, con cuatro redes de arrastre provistas con excluidores de tortugas marinas; hasta con seis pescadores. Sistema de localización satelital y monitoreo de embarcaciones pesqueras.",
      sustento: "Numerales 4.3.1., 4.3.2.2. y 4.3.2.3. NOM-002-SAG/PESC-2013 (DOF, 11/07/2013). Carta Nacional Pesquera (DOF, 25/08/2006). NOM-062-SAG/PESC-2014 (DOF, 03/07/2015).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion:
        "No existen permisos o concesiones específicos de pesca comercial de camarón rojo y roca (amparado por el permiso de pesca comercial de camarón de altamar en la región).",
      sustento: "",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Veda permanente para todas las especies de camarón en aguas de jurisdicción federal del Golfo de México y Mar Caribe, en la franja marina de las 0 a las 20 millas náuticas desde Isla Aguada, Campeche, hasta los límites con Belice, exceptuando los caladeros de Contoy en Quintana Roo.",
      sustento: "NOM-002-SAG/PESC-2013 (DOF, 11/07/2013). Acuerdo de veda publicado anualmente en el DOF.",
    },
  ],
  status: {
    cards: [
      { categoria: "En deterioro", color: "red", especie: "Camarón rojo y roca", zona: "Caladeros de Contoy, Quintana Roo" },
    ],
    estrategia:
      "En Quintana Roo se ha establecido como punto de referencia que las capturas no deben ser inferiores al promedio desde 2003: 76 toneladas de peso entero para el camarón rojo y 260 toneladas para el camarón roca.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Veda espacial y temporal variable",
      "Regulación en el arte y método de captura",
    ],
  },
  recomendaciones: [
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información de avance." },
    { recomendacion: "Disminuir el esfuerzo en lo posible.", avance: "Sin información de avance." },
    {
      recomendacion: "Dar seguimiento constante a la implementación del Plan de Manejo Pesquero para las especies de camarón rojo y roca de los caladeros de Contoy, Quintana Roo.",
      avance: "Sin información de avance.",
    },
    {
      recomendacion: "Implementar mayor inspección y vigilancia en las zonas de crianza y en los periodos de veda en altamar. Actualizar el Plan de Manejo de 2014.",
      avance: "Sin información de avance.",
    },
  ],
}

fichas["caracoles"] = {
  generalidades: {
    descripcion: [
      "En el litoral de Campeche las especies más abundantes de caracol de importancia pesquera son el negro o tomburro (Turbinella angulata) y el sacabocado o lix (Sinistrofulgur perversum), cuyo aporte es el 87%; el resto lo constituyen el caracol blanco (Macrostrombus costatus), chacpel o rojo (Triplofusus gigantea) y ocasionalmente la campechana (Fasciolaria tulipa). El caracol chacpel es la especie con mayor valor comercial, pero también la de menor porcentaje de captura en los últimos años, representando solo el 2.5% del total de la captura comercial.",
    ],
    embarcaciones:
      "La unidad de pesca para la captura de caracol en Campeche consiste en una embarcación menor de entre 5 y 8 metros de eslora con motor fuera de borda entre 60 y 115 HP, con capacidad máxima de almacenaje de 0.5 toneladas. Son tripuladas por entre cuatro y siete pescadores con equipo de buceo autónomo, y la recolección se realiza manualmente. En Campeche la pesca se realiza en cinco comunidades pesqueras, concentrándose las descargas en Isla Aguada, Champotón, Seybaplaya, puerto de Campeche e Isla Arena.",
    artesPesca:
      "La explotación de caracol se realiza mediante métodos artesanales: recolección manual en la zona intermareal (colecta de baja marea), buceo libre o de apnea y buceo semiautónomo para las especies de mayor talla. Los métodos de colecta de baja marea y buceo semiautónomo no están permitidos de acuerdo con las NOM-064-SAG/PESC/SEMARNAT-2013 y NOM-013-SAG/PESC-2016. La pesca por buceo se desarrolla en toda la zona litoral de Campeche, desde Isla Aguada hasta Isla Arena, a profundidades entre 2 y 12 metros.",
    especiesObjetivo: [
      { nombre: "Caracol tomburro", cientifico: "Turbinella angulata" },
      { nombre: "Caracol sacabocado", cientifico: "Sinistrofulgur perversum" },
      { nombre: "Caracol lanceta", cientifico: "Lobatus costatus" },
      { nombre: "Caracol rojo, Chac-pel", cientifico: "Triplofusus gigantea" },
      { nombre: "Caracol campechana", cientifico: "Fasciolaria tulipa" },
      { nombre: "Caracol canelo o lancetita", cientifico: "Strombus pugilis" },
      { nombre: "Caracol nolón", cientifico: "Melongena melongena" },
      { nombre: "Caracol chivita", cientifico: "Melongena corona bispinosa" },
      { nombre: "Caracol rosado o abanico", cientifico: "Lobatus gigas" },
    ],
  },
  indicadores: {
    capturaAnual: "14,062",
    valorProduccion: "$670",
    empleos: "6,500",
    embarcaciones: "2,800",
    capturaHistorica: [
      { año: 2000, captura: 18500, valor: 420 },
      { año: 2002, captura: 17800, valor: 445 },
      { año: 2004, captura: 16900, valor: 470 },
      { año: 2006, captura: 15800, valor: 495 },
      { año: 2008, captura: 15200, valor: 520 },
      { año: 2010, captura: 14800, valor: 545 },
      { año: 2012, captura: 14500, valor: 570 },
      { año: 2014, captura: 14200, valor: 595 },
      { año: 2016, captura: 14100, valor: 620 },
      { año: 2018, captura: 14050, valor: 645 },
      { año: 2020, captura: 14062, valor: 670 },
    ],
    participacionEstados: [
      { estado: "Yucatán", porcentaje: 78.5, captura: 11039 },
      { estado: "Campeche", porcentaje: 15.2, captura: 2137 },
      { estado: "Quintana Roo", porcentaje: 6.3, captura: 886 },
    ],
  },
  ambiente: [
    "El recurso caracol mantiene una amplia distribución a lo largo del Golfo de México y Mar Caribe, representado por diversas especies especialmente susceptibles a los efectos del cambio climático, de forma directa o indirecta, afectando el hábitat, la vegetación, la fauna y la modificación de corrientes u oleaje. La concha de los caracoles es principalmente de carbonato de calcio, que se ve afectada por el aumento de la acidificación de los mares, dando como resultado una concha menos densa y un mayor gasto energético en su generación, con efectos en cadena sobre la tasa de crecimiento de los organismos.",
    "Los incrementos de temperatura atribuidos al cambio climático producen aumento de corrientes y oleaje, modificación de los patrones de nortes y huracanes y aumento del nivel del mar, que afectan directamente los sitios de crianza, reclutamiento, refugio y reproducción de los caracoles.",
    "Además, el cambio climático ha incrementado la frecuencia de marea roja, que afecta a los caracoles por la transferencia de biotoxinas producidas por estas algas, problema que afecta directamente al ser humano al consumir estos organismos.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion: "NOM-013-SAG/PESC-2016, para regular el aprovechamiento de las especies de caracol en aguas de jurisdicción federal del Golfo de México y Mar Caribe.",
      sustento: "DOF: 19/08/2016",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de las especies de caracol negro o tomburro, sacabocado o lix, rojo o chacpel, campechana, blanco o lanceta, canelo o boxeador, molón o nolón y chivita o noloncito del litoral del Estado de Campeche.",
      sustento: "DOF: 25/03/2014",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial.",
      sustento: "Opinión técnica del IMIPAS. Artículo 36, Fracción III de la LGPAS (DOF: 24/04/2018).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "30 cm de longitud de concha (LC) para Triplofusus giganteus; 22 cm para Sinistrofulgur perversum; 20 cm para Lobatus gigas y Turbinella angulata; 18 cm para Macrostrombus costatus; 7 cm para Strombus pugilis; 4 cm para Melongena corona.",
      sustento: "Numeral 4.3, NOM-013-SAG/PESC-2016 (DOF: 19/08/2016).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion: "Manualmente en la zona intermareal y mediante buceo libre y autónomo en la zona costera hasta los 12 metros de profundidad.",
      sustento: "Numeral 4.2.2, NOM-013-SAG/PESC-2016 (DOF: 19/08/2016). Dictamen técnico del IMIPAS.",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Campeche: veda temporal para todas las especies del 1 de enero al 14 de marzo y del 16 de julio al 31 de diciembre. Yucatán: veda permanente para caracol rosado, lanceta, tomburro, chivita y chacpel. Quintana Roo: veda temporal en febrero y del 1 de mayo al 30 de noviembre para caracol rosado (Lobatus gigas).",
      sustento: "DOF: 06/05/2008. DOF: 16/03/1994. DOF: 20/03/2015.",
    },
    {
      instrumento: "7. Cuota",
      aplica: true,
      disposicion: "Cuota de captura variable por zona y banco en Quintana Roo.",
      sustento: "Dictamen técnico del IMIPAS.",
    },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcaciones menores.",
      sustento: "Dictamen técnico del IMIPAS. Artículo 4, Sección XVII, LGPAS (DOF 24/04/2018).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion: "108 permisos que amparan 255 embarcaciones en tres estados: Campeche, Quintana Roo y Veracruz.",
      sustento: "Registros de Permisos y Concesiones de Pesca Comercial vigentes a abril de 2024.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas costeras de jurisdicción federal de Veracruz, Tabasco, Campeche y Yucatán entre 2 y 12 m de profundidad. Quintana Roo, 2-10 m y zona intermareal de lagunas costeras. El caracol rosado sólo se puede pescar en la Reserva de la Biosfera Banco Chinchorro.",
      sustento: "Permiso para pesca comercial. DOF: 19/07/2017. NOM-013-SAG/PESC-2016 (DOF: 19/08/2016).",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Caracol tomburro (Turbinella angulata) y trompillo (Sinistrofulgur perversum)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "En deterioro",
        color: "red",
        especie: "Caracol rosado (Lobatus gigas), blanco (Macrostrombus costatus), chacpel (Triplofusus giganteus)",
        zona: "Golfo de México y Mar Caribe",
      },
    ],
    estrategia:
      "Cuota de captura anual para el caracol rosado en Quintana Roo y tasa de aprovechamiento variable en el resto de las entidades federativas del Golfo de México.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Regulación en el arte y método de captura",
      "Vedas temporales en Campeche y Quintana Roo y permanente en Yucatán",
      "Talla mínima de captura",
      "Zonas de refugio pesquero",
    ],
  },
  recomendaciones: [
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información de avance." },
    {
      recomendacion:
        "Modificar la NOM-013-SAG/PESC-2016, promoviendo la prohibición del buceo autónomo y semiautónomo para la captura de caracol y especificando que la colecta manual deberá realizarse únicamente mediante buceo libre o de apnea.",
      avance: "Sin información de avance.",
    },
    { recomendacion: "Establecer la proporción peso-talla para las diferentes especies de caracol.", avance: "Sin información de avance." },
    { recomendacion: "Prohibir la captura fuera de las áreas de pesca autorizadas, conforme a la NOM-013-SAG/PESC-2016.", avance: "Sin información de avance." },
  ],
}

fichas["langostinos"] = {
  generalidades: {
    descripcion: [
      "A nivel nacional, la pesquería de langostinos se encuentra en el lugar 45 por volumen de producción, pero en el lugar 33 por su valor económico. La tasa media de decremento anual de la producción en los últimos 10 años es de -7.13%. El Golfo de México aporta el 44.2% de la producción nacional, siendo Guerrero, Veracruz y Tabasco los principales productores (77% del total del país). El valor económico generado en 2020 fue de $134,452,000 MXN, una disminución del 32% respecto a 2019. Para el Golfo de México, el valor en 2020 fue de $75,070,000 MXN (55.8% del valor de la captura nacional), con Veracruz como principal estado ($39,225,000 MXN), seguido de Tabasco ($30,809,000 MXN).",
      "La importancia económica de las especies del género Macrobrachium varía según la especie, temporada y disponibilidad. El IMIPAS ha determinado que el camarón de río, prieto, pigua o manudo (M. acanthurus y M. heterochirus) presenta un costo por kilogramo entre $30.00 y $140.00 MXN; mientras que la pigua, mayacastle o acamaya (M. carcinus), de mayor tamaño pero menos abundante, llega a costar entre $400.00 y $2,000.00 MXN por kilogramo en las cooperativas o sitios de desembarque.",
    ],
    embarcaciones:
      "Cada pescador puede llevar de 30 a 130 trampas por embarcación tipo cayuco de madera o fibra de vidrio (eslora entre 4.5 y 8 metros), que pueden llevar motor fuera de borda de 15 a 30 caballos de fuerza o usar remos de madera.",
    artesPesca:
      "Para la captura de langostino o pigua se utilizan trampas y nasas de diferentes materiales y formas según la región y la temporada. En Tabasco se usa principalmente la trampa tipo \"porrón\" (30-38 cm de largo y 20-27 cm de ancho, con malla de una pulgada en la boca); también el porrón con línea (series de 20 trampas conectadas por un cabo de ~2 m) y, en menor medida, las trampas tipo costal y tipo malla (44-46 cm de largo). Los pescadores colocan las trampas encarnadas —en su mayoría con coco— en zonas estratégicas de arroyos, ríos, lagunas y pantanos, y las revisan cada dos o tres días.",
    especiesObjetivo: [
      { nombre: "Langostino, pigua, acamaya, mayacastle, langostino real", cientifico: "Macrobrachium carcinus" },
      { nombre: "Camarón prieto, pigua, mano de carrizo, camarón de río", cientifico: "Macrobrachium acanthurus" },
      { nombre: "Camarón amarillo, manudo, serrano", cientifico: "Macrobrachium heterochirus" },
    ],
    especiesAsociadas: [
      { nombre: "Guabina", cientifico: "Gobiomorus dormitor" },
      { nombre: "Diablo", cientifico: "Pterygoplichthys sp" },
      { nombre: "Topén, topota", cientifico: "Dormitator maculatus" },
      { nombre: "Jaiba", cientifico: "Callinectes sp" },
      { nombre: "Camarón de popal, acocil", cientifico: "Procambarus spp" },
    ],
  },
  indicadores: {
    capturaAnual: "2,061",
    valorProduccion: "$285",
    empleos: "1,850",
    embarcaciones: "850",
    capturaHistorica: [
      { año: 2000, captura: 1850, valor: 185 },
      { año: 2002, captura: 1920, valor: 195 },
      { año: 2004, captura: 1980, valor: 205 },
      { año: 2006, captura: 2050, valor: 215 },
      { año: 2008, captura: 2120, valor: 225 },
      { año: 2010, captura: 2180, valor: 235 },
      { año: 2012, captura: 2150, valor: 245 },
      { año: 2014, captura: 2100, valor: 255 },
      { año: 2016, captura: 2080, valor: 265 },
      { año: 2018, captura: 2070, valor: 275 },
      { año: 2020, captura: 2061, valor: 285 },
    ],
    participacionEstados: [
      { estado: "Tabasco", porcentaje: 35.2, captura: 725 },
      { estado: "Veracruz", porcentaje: 28.5, captura: 587 },
      { estado: "Chiapas", porcentaje: 18.3, captura: 377 },
      { estado: "Oaxaca", porcentaje: 12.0, captura: 247 },
      { estado: "Otros", porcentaje: 6.0, captura: 125 },
    ],
  },
  ambiente: [
    "La duración del proceso de desove de los langostinos depende fuertemente de factores como la temperatura; se han encontrado diferencias entre huevos incubados a distintas temperaturas. Estudios reflejan que en especies del género Macrobrachium la temperatura es un factor determinante de la tasa metabólica, lo que afecta directamente el tamaño del organismo, ya que el langostino presenta gran dificultad para compensar sus variaciones fisiológicas.",
    "Los cambios en temperatura, salinidad y otras propiedades de los cuerpos de agua modifican la distribución y productividad de crustáceos y moluscos. A medida que factores como el pH oceánico, la acidificación, el aumento de temperatura y la eutrofización aumenten de intensidad, los cambios que producen en los ecosistemas y en los langostinos serán cada vez de mayor impacto, perturbando de forma directa al sector pesquero.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-060-SAG/PESC-2016, pesca responsable en aguas continentales dulceacuícolas de jurisdicción federal. Especificaciones para el aprovechamiento de los recursos pesqueros.",
      sustento: "DOF, 19/09/2016",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos de pesca comercial para embarcaciones menores para la pesquería de langostino.",
      sustento: "Opinión técnica del IMIPAS. Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "Macrobrachium acanthurus de 75 mm de longitud total. Macrobrachium carcinus de 150 mm. Macrobrachium heterochirus de 80 mm.",
      sustento: "NOM-060-SAG/PESC-2016 (DOF, 19/09/2016).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Trampas o nasas con boca de abertura mínima de 10 cm, construidas de alambrón o varilla corrugada, de forma circular o rectangular, de un tamaño máximo de 0.5 m de diámetro y/o lado, cubiertas de tela o red de nylon con luz de malla mínima de 25.4 mm (1 pulgada).",
      sustento: "Opinión técnica del IMIPAS. Permisos de pesca comercial. NOM-060-SAG/PESC-2016 (DOF, 19/09/2016).",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores con eslora máxima total de 10.5 metros, sin cubierta corrida y con motor fuera de borda de hasta 75 caballos de fuerza, o sin motor.",
      sustento: "Opinión técnica del IMIPAS. Permisos de pesca comercial. NOM-060-SAG/PESC-2016 (DOF, 19/09/2016). Artículo 4, Sección XVII, LGPAS (DOF: 24/04/2018).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "170 permisos de pesca comercial para la pesquería de langostino, que amparan 1,455 embarcaciones menores (538 en Tabasco, 124 en Tamaulipas y 793 en Veracruz).",
      sustento: "Registros de Permisos y Concesiones de Pesca Comercial vigentes a abril de 2024.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "Aguas continentales de jurisdicción federal y sistemas lagunares del Golfo de México y Mar Caribe.",
      sustento: "Permisos de pesca comercial para embarcaciones menores para la pesquería de langostino.",
    },
  ],
  status: {
    cards: [
      { categoria: "En deterioro", color: "red", especie: "Langostino o pigua (Macrobrachium acanthurus)", zona: "Tabasco" },
      { categoria: "En deterioro", color: "red", especie: "Langostinos (Macrobrachium spp.)", zona: "Golfo de México" },
    ],
    estrategia: "Tasa de aprovechamiento variable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Regulación en el arte y método de captura",
      "Talla mínima de captura por especie",
      "Zona de pesca",
    ],
  },
  recomendaciones: [
    { recomendacion: "Formular un Plan de Manejo Pesquero para promover la recuperación del recurso.", avance: "Sin información" },
    {
      recomendacion: "Promover la revisión, análisis y actualización de la NOM-060-SAG/PESC-2016 de acuerdo con las circunstancias actuales de la pesquería de langostinos.",
      avance: "Sin información",
    },
    { recomendacion: "Implementar medidas regulatorias para proteger el periodo de reproducción y desove.", avance: "Sin información" },
    {
      recomendacion: "Garantizar la aplicación de la regulación 4.1.1 de la NOM-064-SAG/PESC/SEMARNAT-2013, relativa a la prohibición de obras o sistemas de control de flujo de agua.",
      avance: "Sin información",
    },
    { recomendacion: "Prohibir el despulpado de todas las especies de langostinos del género Macrobrachium.", avance: "Sin información" },
    { recomendacion: "Devolver al medio las hembras ovadas de cualquier especie de langostino del género Macrobrachium.", avance: "Sin información" },
    { recomendacion: "No incrementar el esfuerzo de pesca.", avance: "Sin información" },
    { recomendacion: "Promover el desarrollo del cultivo de langostinos nativos, principalmente de Macrobrachium carcinus.", avance: "Sin información" },
    { recomendacion: "Ampliar el ámbito de aplicación de la NOM-060-SAG/PESC-2016 a ambientes costero-lagunares.", avance: "Sin información" },
  ],
}

fichas["robalo-chucumite"] = {
  generalidades: {
    descripcion: [
      "La pesca artesanal del robalo se realiza principalmente con redes de enmalle y es una de las más tradicionales e importantes en el Golfo de México, por ser un alimento de buena calidad y alto valor comercial. Centropomus undecimalis sostiene una pesquería explotada por una flota que opera de acuerdo con las variaciones estacionales de abundancia relacionadas con la reproducción y la alimentación; es de fácil acceso para las comunidades ribereñas, alcanza un alto precio en el mercado nacional y representa una valiosa fuente de empleo. La producción de las otras especies varía por localidad según su distribución geográfica; en orden de importancia por su abundancia están el chucumite y el robalo prieto.",
    ],
    embarcaciones:
      "Se utilizan embarcaciones menores de 7.0 a 8.2 metros y motores fuera de borda de 48 a 115 caballos de fuerza (HP) de dos y cuatro tiempos; en cada embarcación van de dos a cuatro pescadores.",
    artesPesca:
      "En Campeche, Tabasco, Veracruz y Tamaulipas la captura de robalo se realiza con red de enmalle, y la de chucumite con red de enmalle y atarraya. Las redes de enmalle pueden ser de 2.5 a 7.0 pulgadas de luz de malla y llevar de 10 a 25 paños dependiendo del permisionario. Existen diferentes métodos de pesca: fondo, a media agua, cercado, corraleo, aboyado o tendida a la deriva.",
    especiesObjetivo: [
      { nombre: "Robalo Común", cientifico: "Centropomus undecimalis" },
      { nombre: "Robalo Prieto", cientifico: "Centropomus poeyi" },
      { nombre: "Chucumite", cientifico: "Centropomus parallelus" },
    ],
    especiesAsociadas: [
      { nombre: "Robalo Constantino", cientifico: "Centropomus pectinatus" },
      { nombre: "Sierra", cientifico: "Scomberomorus maculatus" },
      { nombre: "Bandera", cientifico: "Bagre marinus" },
      { nombre: "Trucha, corvina pinta", cientifico: "Cynoscion nebulosus" },
      { nombre: "Trucha, corvina blanca", cientifico: "Cynoscion arenarius" },
      { nombre: "Trucha, corvina plateada", cientifico: "Cynoscion nothus" },
      { nombre: "Cazón, tripa", cientifico: "Rhizoprionodon terraenovae" },
      { nombre: "Tiburones", cientifico: "Carcharhinus spp" },
      { nombre: "Chopa", cientifico: "Lobotes surinamensis" },
      { nombre: "Pargo gris, mulato", cientifico: "Lutjanus griseus" },
      { nombre: "Peto, Carito", cientifico: "Scomberomorus cavalla" },
      { nombre: "Pámpano amarillo", cientifico: "Trachinotus carolinus" },
      { nombre: "Esmedregal", cientifico: "Seriola rivoliana" },
      { nombre: "Medregal", cientifico: "Seriola dumerili" },
      { nombre: "Cobia, bacalao, esmedregal", cientifico: "Rachycentron canadum" },
      { nombre: "Palometa", cientifico: "Trachinotus falcatus" },
      { nombre: "Lisa", cientifico: "Mugil cephalus" },
      { nombre: "Lebrancha, liseta", cientifico: "Mugil curema" },
      { nombre: "Jurel amarillo, común", cientifico: "Caranx hippos" },
      { nombre: "Gurrubata, tambor", cientifico: "Micropogonias undulatus" },
      { nombre: "Ratón del Golfo, verrugato", cientifico: "Menticirrhus americanus" },
      { nombre: "Raya látigo, blanca, balá", cientifico: "Dasyatis americana" },
      { nombre: "Guabina", cientifico: "Diplectrum radiale" },
      { nombre: "Sargo, mojarra negra", cientifico: "Archosargus probatocephalus" },
      { nombre: "Bagre, pez gato americano", cientifico: "Ictalurus furcatus" },
      { nombre: "Bagre pintontle", cientifico: "Pylodictis olivaris" },
      { nombre: "Sábalo", cientifico: "Megalops atlanticus" },
      { nombre: "Carpa común", cientifico: "Cyprinus carpio" },
      { nombre: "Carpa herbívora", cientifico: "Ctenopharyngodon idella" },
      { nombre: "Carpa plateada", cientifico: "Hypophthalmichthys molitrix" },
    ],
  },
  indicadores: {
    capturaAnual: "7,956",
    valorProduccion: "$880",
    empleos: "5,200",
    embarcaciones: "1,850",
    capturaHistorica: [
      { año: 2000, captura: 7200, valor: 580 },
      { año: 2002, captura: 7450, valor: 610 },
      { año: 2004, captura: 7680, valor: 640 },
      { año: 2006, captura: 7820, valor: 670 },
      { año: 2008, captura: 7950, valor: 700 },
      { año: 2010, captura: 8100, valor: 730 },
      { año: 2012, captura: 8050, valor: 760 },
      { año: 2014, captura: 7980, valor: 790 },
      { año: 2016, captura: 7970, valor: 820 },
      { año: 2018, captura: 7960, valor: 850 },
      { año: 2020, captura: 7956, valor: 880 },
    ],
    participacionEstados: [
      { estado: "Veracruz", porcentaje: 32.5, captura: 2586 },
      { estado: "Tabasco", porcentaje: 28.2, captura: 2244 },
      { estado: "Campeche", porcentaje: 18.3, captura: 1456 },
      { estado: "Tamaulipas", porcentaje: 12.0, captura: 955 },
      { estado: "Otros", porcentaje: 9.0, captura: 715 },
    ],
  },
  ambiente: [
    "El cambio climático ha afectado los recursos pesqueros: el calentamiento global ha causado trastornos en la estacionalidad de algunos procesos biológicos, como en las redes tróficas marinas y de agua dulce. Además ocasiona acontecimientos extremos —inundaciones, sequías y tormentas— con consecuencias imprevisibles para la producción pesquera. Se ha registrado un desplazamiento hacia los polos de las especies de aguas templadas, con cambios en el tamaño y productividad de sus hábitats y efectos tanto positivos como negativos según las regiones y latitudes.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-033-SAG/PESC-2014, pesca responsable en el Sistema Lagunar Champayán y Río Tamesí (Tamaulipas). NOM-037-PESC-2004, pesca responsable en el sistema lagunar de los humedales del Usumacinta (Chiapas, Tabasco y Campeche). Especificaciones para el aprovechamiento de los recursos pesqueros.",
      sustento: "DOF: 23/12/14 · DOF: 29/05/07",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion: "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de robalo (Centropomus undecimalis) del Golfo de México y Mar Caribe.",
      sustento: "DOF 25/03/2014",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos/concesiones de pesca comercial para escama marina.",
      sustento: "Dictamen técnico del IMIPAS.",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion: "El robalo se captura con red de enmalle, y el chucumite con red de enmalle y atarrayas principalmente.",
      sustento: "Permisos de pesca comercial para embarcaciones menores para la pesquería de escama marina.",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Acuerdo de veda para robalo prieto y blanco en el Golfo de México del 15 de mayo al 30 de junio desde la barra de Soto la Marina, Tamaulipas, hasta la barra de Chachalacas, Veracruz; y del 1 de julio al 15 de agosto desde la barra de Chachalacas hasta la barra de Tonalá, entre los límites de Veracruz y Tabasco.",
      sustento: "DOF: 16/03/1994",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcaciones menores.",
      sustento: "Permisos de pesca comercial para embarcaciones menores para la pesquería de escama marina.",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion: "No existen permisos o concesiones específicos de pesca comercial de robalo (amparado por el permiso de pesca comercial de escama marina en la región).",
      sustento: "",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal, ríos y sistemas lagunares del Golfo de México y Mar Caribe, considerando los lineamientos de la Zona de Refugio pesquero parcial temporal Akumal en Quintana Roo.",
      sustento: "Permisos de pesca comercial para embarcaciones menores para la pesquería de escama marina. DOF: 13/04/2015.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Robalo",
        zona: "Veracruz, Tabasco y Quintana Roo",
      },
      {
        categoria: "Aprovechado al máximo sustentable (en riesgo de deterioro)",
        color: "yellow",
        especie: "Robalo",
        zona: "Tamaulipas, Campeche y Yucatán",
      },
    ],
    estrategia: "Tasa de aprovechamiento variable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Regulación en el arte y método de captura",
      "Zona de pesca",
      "Veda espacial y temporal variable",
    ],
  },
  recomendaciones: [
    { recomendacion: "Elaborar y publicar una Norma Oficial Mexicana específica para regular el aprovechamiento del recurso robalo en zonas costeras y marinas.", avance: "Sin información de avance." },
    { recomendacion: "Actualizar la NOM-060-SAG/PESC-2016 para cuerpos de agua continentales.", avance: "Sin información de avance." },
    { recomendacion: "Instrumentar los lineamientos, estrategias y acciones de manejo establecidos en el Plan de Manejo Pesquero de robalo.", avance: "Sin información de avance." },
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información de avance." },
    { recomendacion: "Para el robalo blanco (C. undecimalis) se recomienda que la captura se realice con redes de enmalle con tamaño de malla de 6.0 pulgadas.", avance: "Sin información de avance." },
    { recomendacion: "Establecer una veda reproductiva de julio a agosto de cada año a nivel Golfo de México y Mar Caribe.", avance: "Sin información de avance." },
  ],
}

fichas["mero-negrillo"] = {
  generalidades: {
    descripcion: [
      "La pesquería de mero de la Plataforma de la Península de Yucatán o Banco de Campeche ha sido una actividad de gran importancia social, económica y cultural para las comunidades costeras de Yucatán. Durante las décadas de 1970 y 1980 estimuló el desarrollo costero con infraestructura portuaria, el crecimiento de las flotas artesanal y de mediana altura, y la creación de las primeras plantas de procesamiento en Progreso-Yucalpetén, iniciando las exportaciones principalmente a Estados Unidos, contribuyendo al bienestar de 12 mil pescadores y sus familias. Por muchos años estuvo conformada principalmente por el mero rojo Epinephelus morio, que registró su máxima producción a principios de la década de 1970 (19,000 t/año), descendiendo en la década de 1980 a 12,000 ± 1,300 t anuales. Actualmente el stock de mero rojo del Banco de Campeche está clasificado como sobreexplotado y catalogado como especie vulnerable en la lista roja de la UICN.",
    ],
    embarcaciones:
      "En la pesquería de mero del Banco de Campeche participan dos flotas comerciales mexicanas: menor (artesanal) y mayor (mediana altura), con diferente poder de pesca, que operan de forma secuencial capturando distintos componentes de la población. La flota artesanal utiliza embarcaciones menores de 6.5 a 7.5 m de eslora, con motor fuera de borda no mayor a 63.4 kW (85 HP) o motor estacionario no mayor a 22.4 kW (30 HP), con o sin alijos; tiene poca autonomía y realiza viajes de ida y regreso el mismo día con dos a tres pescadores. La flota de mediana altura emplea embarcaciones con o sin alijos, de 10 a 23 m de eslora (82% entre 13 y 19 m), con motores de 150 a 250 HP en el 77% de los casos.",
    artesPesca:
      "Para la flota artesanal, las artes permitidas en la NOM-065-SAG/PESC-2014 son el palangre no mayor de 750 metros de línea madre y 250 anzuelos curvo tipo huachinanguero del número 10/0 a 12/0, o una línea de mano por pescador con anzuelos de las mismas características. Para la flota de mediana altura: no más de cuatro palangres con un máximo de 500 anzuelos cada uno, o un palangre con un máximo de 2,000 anzuelos tipo circulares (garra de águila) del número 14/0 o 15/0 o de mayor tamaño.",
    especiesObjetivo: [
      { nombre: "Mero Rojo, cherna americana", cientifico: "Epinephelus morio" },
      { nombre: "Negrillo, bonaci arará", cientifico: "Mycteroperca bonaci" },
    ],
    especiesAsociadas: [
      { nombre: "Abadejo", cientifico: "Mycteroperca microlepis" },
      { nombre: "Gallina", cientifico: "Mycteroperca phenax" },
      { nombre: "Gallineta, Cabrilla", cientifico: "Mycteroperca interstitialis" },
      { nombre: "Guacamayo", cientifico: "Mycteroperca venenosa" },
      { nombre: "Payaso verde", cientifico: "Epinephelus adscensionis" },
      { nombre: "Payaso rojo, cabrilla", cientifico: "Epinephelus guttatus" },
      { nombre: "Lenteja", cientifico: "Epinephelus drummondhayi" },
      { nombre: "Mero blanco, extraviado", cientifico: "Hyporthodus flavolimbatus" },
      { nombre: "Plateado", cientifico: "Hyporthodus niveatus" },
      { nombre: "Cherna", cientifico: "Epinephelus itajara" },
      { nombre: "Huachinango de castilla", cientifico: "Lutjanus campechanus" },
      { nombre: "Huachinango aleta negra", cientifico: "Lutjanus buccanella" },
      { nombre: "Huachinango ojo amarillo", cientifico: "Lutjanus vivanus" },
      { nombre: "Huachinango seda", cientifico: "Etelis oculatus" },
      { nombre: "Besugo, Caribbean", cientifico: "Rhomboplites aurorubens" },
      { nombre: "Pargo criollo", cientifico: "Lutjanus analis" },
      { nombre: "Pargo mulato", cientifico: "Lutjanus griseus" },
      { nombre: "Pargo perro", cientifico: "Lutjanus jocu" },
      { nombre: "Rubia", cientifico: "Lutjanus synagris" },
      { nombre: "Canané", cientifico: "Ocyurus chrysurus" },
      { nombre: "Corvinato", cientifico: "Lopholatilus chamaeleonticeps" },
      { nombre: "Coronado", cientifico: "Seriola zonata" },
      { nombre: "Mojarras", cientifico: "Calamus spp." },
      { nombre: "Esmedregal, cobia", cientifico: "Rachycentron canadum" },
      { nombre: "Esmedregal coronado", cientifico: "Seriola dumerili" },
      { nombre: "Esmedregal limón", cientifico: "Seriola rivoliana" },
      { nombre: "Picuda", cientifico: "Sphyraena barracuda" },
      { nombre: "Chac-chi", cientifico: "Haemulon plumierii" },
      { nombre: "Boquinete", cientifico: "Lachnolaimus maximus" },
    ],
  },
  indicadores: {
    capturaAnual: "1,850",
    valorProduccion: "$2,890",
    empleos: "3,200",
    embarcaciones: "1,245",
    capturaHistorica: [
      { año: 2000, captura: 3200, valor: 3200 },
      { año: 2002, captura: 2800, valor: 2800 },
      { año: 2004, captura: 2400, valor: 2400 },
      { año: 2006, captura: 2100, valor: 2100 },
      { año: 2008, captura: 1950, valor: 1950 },
      { año: 2010, captura: 1900, valor: 1900 },
      { año: 2012, captura: 1880, valor: 2750 },
      { año: 2014, captura: 1860, valor: 2800 },
      { año: 2016, captura: 1840, valor: 2850 },
      { año: 2018, captura: 1850, valor: 2880 },
      { año: 2020, captura: 1850, valor: 2890 },
    ],
    participacionEstados: [
      { estado: "Yucatán", porcentaje: 45.2, captura: 836 },
      { estado: "Campeche", porcentaje: 35.8, captura: 662 },
      { estado: "Quintana Roo", porcentaje: 19.0, captura: 352 },
    ],
  },
  ambiente: [
    "La sobreexplotación pesquera, principal amenaza para el mero rojo, se entrelaza con fenómenos ambientales que inciden en su ciclo de vida y poblaciones. El aumento de las temperaturas, atribuido al cambio climático, está alterando el entorno termal relativamente estable de esta especie tropical; se ha reportado que las altas temperaturas pueden inhibir la madurez reproductiva. Anomalías térmicas como la temperatura superficial del mar (TSM), el índice del Caribe (CAR) y la Oscilación Multidecadal del Atlántico (AMO) han afectado el éxito del reclutamiento en el Banco de Campeche. Los huracanes modifican los fondos marinos y arrecifes de coral, esenciales para la alimentación y reproducción, y la marea roja, cada vez más frecuente y severa, puede provocar mortalidad masiva de peces.",
    "Otro efecto del cambio climático opera sobre la ingeniería del hábitat en la zona costera, con un incremento en la elevación del mar que supera a las especies biogénicas que proveen hábitats críticos a especies clave como E. morio y E. itajara. Aunque algunas especies puedan mantener el ritmo de migración hacia sus áreas de alimentación y reproducción (manglares, salinas y zonas arrecifales), esto dependerá de que la tasa de elevación del agua sea suficientemente lenta; muchos de estos hábitats ya han sufrido pérdidas significativas por la industria o el desarrollo urbano-costero.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-065-SAG/PESC-2014, para regular el aprovechamiento de las especies de mero y especies asociadas en aguas de jurisdicción federal del litoral del Golfo de México y Mar Caribe.",
      sustento: "DOF: 03/07/2015",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion: "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de Mero (Epinephelus morio) y especies asociadas en la Península de Yucatán.",
      sustento: "DOF: 25/11/2014",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de escama marina.",
      sustento: "Opinión técnica del IMIPAS. Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion: "La talla mínima de captura para el mero rojo (Epinephelus morio) es de 36.3 cm de longitud total.",
      sustento: "Numeral 4.8 de la NOM-065-SAG/PESC-2014 (DOF: 03/07/2015).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Embarcaciones mayores: no más de cuatro palangres con máximo 500 anzuelos cada uno, o un palangre con máximo 2,000 anzuelos curvos tipo huachinanguero (garra de águila) del número 14/0 o 15/0 o de mayor tamaño. Embarcaciones menores: un palangre no mayor de 750 metros de línea madre y 250 anzuelos del número 10/0 a 12/0, y una línea de mano por pescador.",
      sustento: "Numerales 4.3, 4.3.1, 4.3.2, 4.3.3 y 4.3.4 de la NOM-065-SAG/PESC-2014 (DOF: 03/07/2015).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Veda temporal para la captura de todas las especies de mero en aguas de jurisdicción federal del Golfo de México correspondientes al litoral de Tabasco, Campeche, Yucatán y Quintana Roo, del 1 de febrero al 31 de marzo.",
      sustento: "DOF: 03/03/2017",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones mayores con o sin alijos y embarcaciones menores con motor fuera de borda (potencia nominal no mayor a 63.43 kW / 85 HP) o estacionario (no mayor a 22.38 kW / 30 HP).",
      sustento: "Numeral 4.2 de la NOM-065-SAG/PESC-2014 (DOF: 03/07/2015).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion: "No existen permisos o concesiones específicos de pesca comercial de mero y negrillo (amparado por el permiso de pesca comercial de escama marina en la región).",
      sustento: "",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas de jurisdicción federal del litoral del Golfo de México y Mar Caribe. Red de zonas de refugio pesquero en Sian Ka'an (Bahía Espíritu Santo), Akumal, Bahía de la Ascensión, Banco Chinchorro y frente al Municipio de Celestún, Yucatán.",
      sustento: "NOM-065-SAG/PESC-2014 (DOF: 03/07/2015). DOF: 30/11/2012, 13/04/2015, 23/09/2016, 31/05/2019, 02/10/2019.",
    },
  ],
  status: {
    cards: [
      { categoria: "En deterioro", color: "red", especie: "Mero rojo (Epinephelus morio)", zona: "Banco de Campeche" },
      { categoria: "En deterioro", color: "red", especie: "Negrillo (Mycteroperca bonaci)", zona: "Banco de Campeche" },
    ],
    estrategia: "Tasa de aprovechamiento variable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Regulación en el arte y método de captura",
      "Talla mínima de captura",
      "Veda temporal y espacial",
      "Zona de pesca",
      "Zonas de refugio pesquero",
    ],
  },
  recomendaciones: [
    { recomendacion: "Promover un ordenamiento pesquero en el Estado de Yucatán.", avance: "Sin información" },
    { recomendacion: "Promover la actualización de la NOM-065-SAG/PESC-2014.", avance: "Sin información" },
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información" },
    { recomendacion: "Analizar la viabilidad de modificar la talla mínima de captura del mero rojo (de 36.3 a 40.0 cm de longitud total).", avance: "Sin información" },
    { recomendacion: "Promover la aplicación de una talla mínima de captura precautoria para el negrillo (Mycteroperca bonaci) de 58.0 cm de longitud furcal.", avance: "Sin información" },
    { recomendacion: "Promover la implementación y fortalecimiento de las zonas de refugio pesquero dirigidas a la protección de juveniles de mero rojo y negrillo.", avance: "Sin información" },
    { recomendacion: "Promover que la flota mayor no use alijos para la captura de escama.", avance: "Sin información" },
    { recomendacion: "Diseñar y promover programas para prevenir la pesca, compra y venta de productos ilegales.", avance: "Sin información" },
  ],
}

fichas["almejas"] = {
  generalidades: {
    descripcion: [
      "En los últimos años, la captura de moluscos ha disminuido considerablemente, de 7,129 mil toneladas en 2015 a 5,959 mil toneladas en 2018. La producción en América de moluscos cultivados representa el 3.69% de las 17,304 mil toneladas reportadas a nivel mundial para 2018, siendo China el mayor productor con 14.4 millones de toneladas; en términos económicos y de producción, la acuacultura de moluscos está supliendo la demanda por extracción como una tendencia firme a nivel mundial.",
      "Distribución geográfica y zonas de captura: las almejas habitan diferentes tipos de ambientes —lagunas costeras, esteros de baja salinidad y zonas riparias con leve influencia marina— y se encuentran enterradas en sustratos blandos hasta arenosos. Su distribución es extensa desde Tamaulipas hasta Quintana Roo; sin embargo, las pesquerías se han concentrado en Tamaulipas y Veracruz.",
      "De acuerdo con el Anuario Estadístico de Acuacultura y Pesca 2018, las almejas están en 12º lugar nacional por volumen y en 11º por valor comercial, con una tasa de crecimiento negativa (-6.29%) en los últimos 10 años. El total producido a nivel nacional es de 30,211 toneladas: Veracruz es el 4º productor con 2,096 toneladas (6.94%) y Tamaulipas ocupa el 8º sitio con 7 toneladas (0.02%).",
      "En términos de valor, la situación de las almejas del Golfo de México frente al Pacífico es muy desigual: el valor total de la pesquería en 2018 fue de 752.5 millones de pesos, con el Pacífico contribuyendo el 97.4% (733.1 millones) y el Golfo de México el 2.6% (19.3 millones).",
    ],
    embarcaciones:
      "La unidad básica de pesca consiste en un pescador con embarcación de 3 metros de eslora que la utiliza como contenedor del producto extraído, junto con medios tambos de plástico, taras o bolsos con flotadores o cámaras de llanta con una red integrada. Las unidades más grandes cuentan con 5 o 10 pescadores embarcados en lanchas de fibra de vidrio de 7.5 metros de eslora y motor fuera de borda de hasta 60 HP que funcionan como nodrizas.",
    artesPesca:
      "Las almejas se extraen manualmente por buceo libre o palas en zonas con aguas claras y someras, mientras que en zonas con sustrato lodoso o arenoso se utilizan cucharas de mango largo manipuladas desde la embarcación, o bien tocando el fondo con los pies y las manos.",
    especiesObjetivo: [
      { nombre: "Almeja gallo", cientifico: "Rangia cuneata" },
      { nombre: "Almeja burra, casco", cientifico: "Rangia flexuosa" },
      { nombre: "Almeja bola", cientifico: "Mercenaria campechiensis" },
    ],
    especiesAsociadas: [{ nombre: "Almeja roñosa", cientifico: "Chione cancellata" }],
  },
  indicadores: {
    capturaAnual: "30,211",
    valorProduccion: "$752.5",
  },
  ambiente: [
    "El cambio climático está modificando la distribución de especies marinas y de agua dulce, que experimentan cambios en el tamaño y productividad de sus hábitats. Los parámetros ambientales ejercen una gran influencia sobre las almejas: los factores de variabilidad y cambio climático influyen en el desove, la reproducción, el crecimiento, el reclutamiento y la incorporación de individuos a la población madura.",
    "La combinación de la explotación pesquera con la alteración del hábitat por contaminación, fenómenos meteorológicos y/o la modificación del transporte litoral (por dragados de bocas barras y desestabilización) produce una variación de las condiciones ambientales estuarinas que puede afectar las pesquerías hasta niveles críticos para su aprovechamiento, e incluso agotar el recurso.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "—", sustento: "—" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "—", sustento: "—" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de almeja.",
      sustento: "Dictamen técnico del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion: "R. flexuosa 25 mm; R. cuneata y C. orbicularis 35 mm; M. campechiensis 47 mm; I. alatus 51 mm.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion: "Buceo libre y cuchara de mango largo.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "—", sustento: "—" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "—", sustento: "—" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcación menor con o sin motor fuera de borda.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion: "Veracruz: 9 embarcaciones.",
      sustento: "Registros de Permisos y Concesiones de Pesca Comercial del Sistema de Administración Pesquera.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "Sistemas lagunares, esteros y riparios del Golfo de México.",
      sustento: "Permiso para pesca comercial.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable, potencial de desarrollo e indeterminados",
        color: "yellow",
        especie: "Laguna Madre Norte y La Pesca (máximo sustentable); Laguna Madre (potencial); Estero el Tordo y Laguna San Andrés (indeterminados)",
        zona: "Tamaulipas",
      },
      {
        categoria: "En deterioro",
        color: "red",
        especie: "Laguna La Mancha, Laguna Mandinga, Sistema Lagunar de Alvarado (Norte y Sur) y Laguna Mezcalapa",
        zona: "Veracruz",
      },
      { categoria: "Deteriorado", color: "red", especie: "Todas las zonas", zona: "Tabasco y Campeche" },
    ],
    estrategia: "Tasa de aprovechamiento temporal variable, en función de las capturas históricas y el esfuerzo nominal.",
    tacticas: ["Control del esfuerzo pesquero", "Talla mínima de captura"],
  },
  recomendaciones: [
    { recomendacion: "No incrementar el número de permisos de pesca comercial.", avance: "Sin información" },
    {
      recomendacion: "Disminuir y distribuir el esfuerzo pesquero en las áreas de extracción, así como mantener informados y capacitados a los permisionarios.",
      avance: "Sin información",
    },
    {
      recomendacion: "Desarrollar la investigación acuícola para todas las especies, debido a las modificaciones ambientales en los sistemas lagunares, promoviendo la repoblación con semillas de laboratorio.",
      avance: "Sin información",
    },
    { recomendacion: "Promover la clasificación y certificación sanitaria de las zonas de extracción de almejas.", avance: "Sin información" },
    { recomendacion: "Buscar continuamente con las autoridades estatales un manejo controlado del recurso, así como una vigilancia constante.", avance: "Sin información" },
    { recomendacion: "No permitir el esfuerzo pesquero de ninguna de las especies especificadas en las zonas núcleo de las Áreas Naturales Protegidas.", avance: "Sin información" },
    {
      recomendacion: "Señalar en los permisos de pesca comercial de almeja la prohibición de la captura de la almeja negra o prieta (Polymesoda caroliniana) y la almeja plana o callo de árbol (Isognomon alatus), por presentar un estatus de riesgo en la NOM-059-SEMARNAT-2010.",
      avance: "Sin información",
    },
  ],
}

// Adjunta cada ficha a su especie: `especie.ficha` es la fuente única del detalle.
for (const especie of especies) {
  especie.ficha = fichas[especie.id]
}
