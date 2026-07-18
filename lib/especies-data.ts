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
  {
    id: "gm-camaron-rosado-del-golfo-de-mexico",
    nombre: "Camarón rosado del Golfo de México",
    nombreCientifico: "Farfantepenaeus duorarum",
    status: "En deterioro",
    statusColor: "red",
    zona: "Sonda de Campeche (Golfo de México)",
    region: "Golfo de México y Mar Caribe",
    captura: "1,500 toneladas",
    descripcion: "Recurso base de la flota camaronera de mediana altura de Campeche y Ciudad del Carmen, con sus mayores concentraciones en la Sonda de Campeche",
    ultimaActualizacion: 2023,
  },
  {
    id: "gm-huachinango-y-pargos-del-golfo-de-mexico-y-mar-caribe",
    nombre: "Huachinango y pargos del Golfo de México y Mar Caribe",
    nombreCientifico: "Lutjanus campechanus, Lutjanus vivanus, Lutjanus buccanella",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "7,550 toneladas",
    descripcion: "Pesquería de escama de gran valor económico del Golfo de México, capturada con palangre y línea de mano; el Banco de Campeche es su zona de mayor abundancia",
    ultimaActualizacion: 2023,
  },
  {
    id: "gm-ostion-del-golfo-de-mexico",
    nombre: "Ostión del Golfo de México",
    nombreCientifico: "Crassostrea virginica",
    status: ["En deterioro", "Aprovechado al máximo sustentable"],
    statusColor: ["red", "yellow"],
    zona: "Golfo de México",
    region: "Golfo de México y Mar Caribe",
    captura: "39,593 toneladas",
    descripcion: "Ostión del este, segundo producto pesquero del Golfo de México por volumen; se captura en los sistemas lagunares desde Tamaulipas hasta Campeche",
    ultimaActualizacion: 2023,
  },
  {
    id: "gm-jaiba-del-golfo-de-mexico",
    nombre: "Jaiba del Golfo de México",
    nombreCientifico: "Callinectes sapidus, Callinectes rathbunae",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "12,700 toneladas",
    descripcion: "Jaibas azul y prieta (Callinectes) capturadas con aros jaiberos y trampas tipo Chesapeake en lagunas y aguas costeras de Tamaulipas a Campeche",
    ultimaActualizacion: 2022,
  },
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
  {
    id: "pac-almeja-blanca-o-mantequilla",
    nombre: "Almeja blanca o mantequilla",
    nombreCientifico: "Dosinia ponderosa",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "290 toneladas",
    descripcion: "Almeja de fondos de arena fina y areno-limosa del noroeste de México, capturada por buceo semiautónomo",
    ultimaActualizacion: 2023,
  },
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
  {
    id: "pac-almeja-chocolata",
    nombre: "Almeja chocolata",
    nombreCientifico: "Megapitaria squalida, Megapitaria aurantiaca",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "910 toneladas",
    descripcion: "Almejas del género Megapitaria de fondos arenosos y lodosos del noroeste de México, capturadas por buceo semiautónomo",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-almeja-concha-espina",
    nombre: "Almeja concha espina",
    nombreCientifico: "Spondylus crassisquama",
    status: ["Con potencial de desarrollo", "Indeterminado"],
    statusColor: ["green", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "87 toneladas",
    descripcion: "Bivalvo de concha espinosa de bancos arenosos y rocosos de Baja California Sur, capturado por buceo semiautónomo como pesquería alterna",
    ultimaActualizacion: 2023,
  },
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
  {
    id: "pac-almeja-pata-de-mula",
    nombre: "Almeja pata de mula",
    nombreCientifico: "Anadara tuberculosa, Larkinia grandis, Larkinia multicostata",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "725 toneladas",
    descripcion: "Almejas arqueras (Anadara, Larkinia) de zonas de manglar y llanuras intermareales del noroeste de México, capturadas manualmente y por buceo semiautónomo",
    ultimaActualizacion: 2023,
  },
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
  {
    id: "pac-botete",
    nombre: "Botete",
    nombreCientifico: "Sphoeroides annulatus",
    status: ["Aprovechado al máximo sustentable"],
    statusColor: ["yellow"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "1,380 toneladas",
    descripcion: "Pez de la familia Tetraodontidae de zonas costeras arenosas y rocosas del Pacífico, capturado con anzuelo, robador y chinchorro botetero",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-callo-de-hacha",
    nombre: "Callo de hacha",
    nombreCientifico: "Atrina maura, Pinna rugosa, Atrina tuberculosa, Atrina oldroydii",
    status: ["Aprovechado al máximo sustentable"],
    statusColor: ["yellow"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "390 toneladas",
    descripcion: "Bivalvos de gran músculo abductor (Pinna, Atrina) de fondos blandos de bahías y lagunas del noroeste de México, capturados por buceo semiautónomo",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-caracol-chino",
    nombre: "Caracol chino",
    nombreCientifico: "Muricanthus nigritus, Phyllonotus erythrostomus",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "2,702 toneladas",
    descripcion: "Gasterópodos (Muricanthus, Phyllonotus) de sustratos arenosos y rocosos del noroeste de México, capturados por buceo y con trampas",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-caracol-panocha",
    nombre: "Caracol panocha",
    nombreCientifico: "Megastraea undosa, Megastraea turbanica",
    status: ["Aprovechado al máximo sustentable", "En deterioro"],
    statusColor: ["yellow", "red"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "470 toneladas",
    descripcion: "Caracoles herbívoros (Megastraea) de zonas rocosas de la costa occidental de la península de Baja California, capturados por buceo",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-cucaracha-de-mar",
    nombre: "Cucaracha de mar",
    nombreCientifico: "Chiton articulatus",
    status: ["Indeterminado"],
    statusColor: ["gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    descripcion: "Quitón de costas rocosas del Pacífico central y sur de México, extraído manualmente como pesquería de subsistencia",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-curvina-golfina",
    nombre: "Curvina golfina",
    nombreCientifico: "Cynoscion othonopterus",
    status: ["Aprovechado al máximo sustentable"],
    statusColor: ["yellow"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "4,250 toneladas",
    descripcion: "Pez demersal endémico del Alto Golfo de California, capturado con sistema de pesca de encierro durante su agregación reproductiva",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-dorado-pesca-deportiva",
    nombre: "Dorado (Pesca deportiva)",
    nombreCientifico: "Coryphaena hippurus",
    status: "Indeterminado",
    statusColor: "gray",
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    descripcion: "Especie epipelágica migratoria reservada a la pesca deportivo-recreativa dentro de una franja de 50 millas náuticas, capturada con caña y carrete desde Baja California Sur hasta Chiapas",
    ultimaActualizacion: 2023,
  },
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
  {
    id: "pac-huachinango-y-pargos-del-pacifico",
    nombre: "Huachinango y pargos del Pacífico",
    nombreCientifico: "Lutjanus peru y otras 8 especies de la familia Lutjanidae",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "6,980 toneladas",
    descripcion: "Diez especies de huachinangos y pargos (familia Lutjanidae) capturadas con línea de mano, red agallera de fondo y palangre escamero desde Baja California hasta Chiapas",
    ultimaActualizacion: 2023,
  },
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
  {
    id: "pac-langostas-espinosas-del-pacifico",
    nombre: "Langostas espinosas del Pacífico",
    nombreCientifico: "Panulirus inflatus, Panulirus gracilis",
    status: ["Aprovechado al máximo sustentable", "Con potencial de desarrollo"],
    statusColor: ["yellow", "green"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "158 toneladas",
    descripcion: "Langostas azul y verde (género Panulirus) capturadas con trampa langostera y buceo desde Sonora hasta Chiapas",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-langostino",
    nombre: "Langostino",
    nombreCientifico: "Macrobrachium tenellum, Macrobrachium americanum",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "130 toneladas",
    descripcion: "Langostinos de río (Macrobrachium) de aguas continentales de la vertiente del Pacífico, capturados con trampas, atarrayas y tapo-bolso",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-lisa-del-pacifico",
    nombre: "Lisa del Pacífico",
    nombreCientifico: "Mugil cephalus, Mugil setosus, Mugil hospes",
    status: ["Aprovechado al máximo sustentable", "En deterioro"],
    statusColor: ["yellow", "red"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "10,520 toneladas",
    descripcion: "Lisas y lebranchas (familia Mugilidae) capturadas con redes agalleras y atarrayas en bahías y lagunas costeras de todo el Pacífico mexicano",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-medusa-bola-de-canon",
    nombre: "Medusa bola de cañón",
    nombreCientifico: "Stomolophus sp.",
    status: ["Aprovechado al máximo sustentable"],
    statusColor: ["yellow"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "13,000 toneladas",
    descripcion: "Medusa (Stomolophus sp.) del Golfo de California que forma grandes agregaciones, capturada con red de cuchara; pesquería alterna de primavera",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-mejillon",
    nombre: "Mejillón",
    nombreCientifico: "Mytilus californianus, Modiolus capax, Mytella guyanensis",
    status: ["Indeterminado"],
    statusColor: ["gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "130 toneladas",
    descripcion: "Bivalvos de la familia Mytilidae de zonas rocosas y fangosas del Pacífico y Golfo de California, colectados manualmente y por buceo como recurso de subsistencia",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-ostion-del-pacifico",
    nombre: "Ostión del Pacífico",
    nombreCientifico: "Crassostrea iridescens, Crassostrea corteziensis",
    status: ["Aprovechado al máximo sustentable", "Con potencial de desarrollo", "Indeterminado"],
    statusColor: ["yellow", "green", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "6,225 toneladas",
    descripcion: "Ostión de roca y de placer (Crassostrea) colectados por buceo con barra de acero en rocas intermareales y sistemas lagunares del Pacífico",
    ultimaActualizacion: 2023,
  },
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
  {
    id: "pac-pulpo-del-pacifico",
    nombre: "Pulpo del Pacífico",
    nombreCientifico: "Octopus hubbsorum, Octopus bimaculatus, Octopus bimaculoides",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    descripcion:
      "Cefalópodos bentónicos de zonas rocosas del Pacífico mexicano (pulpo verde, café y ocelado enano), capturados con trampas y por buceo semiautónomo desde Baja California hasta Oaxaca",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-robalo-del-pacifico",
    nombre: "Robalo del Pacífico",
    nombreCientifico: "Centropomus viridis, Centropomus nigrescens, Centropomus robalito, Centropomus medius, Centropomus armatus",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "1,340 toneladas",
    descripcion: "Robalos (familia Centropomidae) capturados con redes de enmalle en lagunas costeras, esteros y desembocaduras de ríos del Pacífico mexicano",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-sierra-del-pacifico",
    nombre: "Sierra del Pacífico",
    nombreCientifico: "Scomberomorus sierra, Scomberomorus concolor",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "8,250 toneladas",
    descripcion: "Sierras del Pacífico y del Golfo (Scomberomorus) capturadas con red de enmalle, curricán y encierro a lo largo de todo el litoral del Pacífico mexicano",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-tiburones-del-pacifico",
    nombre: "Tiburones del Pacífico",
    nombreCientifico: "Prionace glauca, Isurus oxyrinchus, Alopias spp., Sphyrna spp., Carcharhinus spp., Mustelus spp., entre otras",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "38,500 toneladas",
    descripcion: "Complejo de tiburones y cazones capturados por flotas de altura, mediana altura y ribereñas en la Zona Económica Exclusiva del Pacífico, incluido el Golfo de California",
    ultimaActualizacion: 2023,
  },
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
  {
    id: "pac-verdillo",
    nombre: "Verdillo",
    nombreCientifico: "Paralabrax nebulifer",
    status: ["Aprovechado al máximo sustentable"],
    statusColor: ["yellow"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "4,180 toneladas",
    descripcion: "Pez marino de la familia Serranidae de arrecifes, lechos de algas y bancos de arena de la costa occidental de la península de Baja California, capturado principalmente con trampa",
    ultimaActualizacion: 2023,
  },
  {
    id: "pac-calamar-gigante",
    nombre: "Calamar gigante",
    nombreCientifico: "Dosidicus gigas",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    descripcion: "Cefalópodo nectónico de ciclo de vida corto capturado con poteras e iluminación en el Golfo de California y la costa occidental de Baja California",
    ultimaActualizacion: 2022,
  },
  {
    id: "pac-marlin-pesca-deportiva",
    nombre: "Marlin (pesca deportiva)",
    nombreCientifico: "Kajikia audax, Makaira mazara, Istiompax indica, Tetrapturus angustirostris",
    status: "Indeterminado",
    statusColor: "gray",
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    descripcion: "Marlines (picudos) reservados a la pesca deportivo-recreativa dentro de las 50 millas náuticas, capturados con caña individual desde Baja California Sur hasta Chiapas",
    ultimaActualizacion: 2022,
  },
  {
    id: "pac-merluza-del-pacifico-norte",
    nombre: "Merluza del Pacífico norte",
    nombreCientifico: "Merluccius productus",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "3,800 toneladas",
    descripcion: "Pez demersal capturado con red de arrastre escamera por embarcaciones mayores en el Golfo de California y la costa occidental de Baja California",
    ultimaActualizacion: 2022,
  },
  {
    id: "pac-pelagicos-menores",
    nombre: "Pelágicos menores",
    nombreCientifico: "Sardinops sagax, Engraulis mordax, Opisthonema spp., Scomber japonicus, entre otras",
    status: ["Aprovechado al máximo sustentable", "Indeterminado"],
    statusColor: ["yellow", "gray"],
    zona: "Litoral del Pacífico",
    region: "Litoral del Pacífico",
    captura: "810,000 toneladas",
    descripcion: "Complejo de sardinas, anchoveta, macarela y afines capturado con red de cerco por embarcaciones mayores en el noroeste de México",
    ultimaActualizacion: 2022,
  },
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
  "pac-curvina-golfina": {
    generalidades: {
      descripcion: [
        "La curvina golfina es una especie endémica del Golfo de California, con hábitos demersales y un amplio espectro trófico. Alcanza una longitud máxima de 80 centímetros y puede vivir hasta 9 años. La pesca se realiza en aguas marinas de jurisdicción federal del Alto Golfo de California y Delta del Río Colorado.",
      ],
      embarcaciones:
        "La unidad de pesca consiste en embarcaciones tipo panga de fibra de vidrio, menores a 10 metros de eslora, equipadas con motor fuera de borda de 60 a 120 caballos de fuerza. Participan tres pescadores y se opera el arte de pesca «Sistema de Pesca de Encierro», que consiste en rodear el cardumen con la red simulando un encierro.",
      especiesObjetivo: [{ nombre: "Curvina golfina", cientifico: "Cynoscion othonopterus" }],
      especiesAsociadas: [
        { nombre: "Chano norteño", cientifico: "Micropogonias megalops" },
        { nombre: "Corvina enana", cientifico: "Cynoscion nannus" },
        { nombre: "Corvina blanca, cabicucho", cientifico: "Atractoscion nobilis" },
        { nombre: "Corvina rayada", cientifico: "Cynoscion reticulatus" },
        { nombre: "Sierra del Pacífico", cientifico: "Scomberomorus sierra" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "El 95% de las capturas se registran en los meses de enero a abril.",
        "Se captura en tres localidades del Alto Golfo de California: Golfo de Santa Clara (Sonora), que aporta el 55%, y El Zanjón y San Felipe (Baja California), que aportan el 45%.",
      ],
      // Tendencia de la captura de curvina golfina en Sonora y BC, 1987-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de curvina golfina por estado, 1987–2020 (CONAPESCA)",
          series: [
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 1987, captura: 20 },
                { año: 1988, captura: 20 },
                { año: 1989, captura: 20 },
                { año: 1990, captura: 20 },
                { año: 1991, captura: 30 },
                { año: 1992, captura: 30 },
                { año: 1993, captura: 50 },
                { año: 1994, captura: 250 },
                { año: 1995, captura: 950 },
                { año: 1996, captura: 1450 },
                { año: 1997, captura: 1900 },
                { año: 1998, captura: 2350 },
                { año: 1999, captura: 3400 },
                { año: 2000, captura: 2650 },
                { año: 2001, captura: 2650 },
                { año: 2002, captura: 5041 },
                { año: 2003, captura: 1600 },
                { año: 2004, captura: 1645 },
                { año: 2005, captura: 1750 },
                { año: 2006, captura: 2450 },
                { año: 2007, captura: 3050 },
                { año: 2008, captura: 3050 },
                { año: 2009, captura: 3650 },
                { año: 2010, captura: 2000 },
                { año: 2011, captura: 3650 },
                { año: 2012, captura: 1850 },
                { año: 2013, captura: 2100 },
                { año: 2014, captura: 2200 },
                { año: 2015, captura: 2100 },
                { año: 2016, captura: 2050 },
                { año: 2017, captura: 650 },
                { año: 2018, captura: 2050 },
                { año: 2019, captura: 2350 },
                { año: 2020, captura: 2650 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 1993, captura: 50 },
                { año: 1994, captura: 100 },
                { año: 1995, captura: 350 },
                { año: 1996, captura: 150 },
                { año: 1997, captura: 200 },
                { año: 1998, captura: 200 },
                { año: 1999, captura: 250 },
                { año: 2000, captura: 500 },
                { año: 2001, captura: 650 },
                { año: 2002, captura: 250 },
                { año: 2003, captura: 200 },
                { año: 2004, captura: 300 },
                { año: 2005, captura: 450 },
                { año: 2006, captura: 650 },
                { año: 2007, captura: 1100 },
                { año: 2008, captura: 1050 },
                { año: 2009, captura: 1000 },
                { año: 2010, captura: 1100 },
                { año: 2011, captura: 350 },
                { año: 2012, captura: 650 },
                { año: 2013, captura: 750 },
                { año: 2014, captura: 950 },
                { año: 2015, captura: 1550 },
                { año: 2016, captura: 2050 },
                { año: 2017, captura: 3400 },
                { año: 2018, captura: 2100 },
                { año: 2019, captura: 1750 },
                { año: 2020, captura: 1600 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Con base en la información analizada, no se ha encontrado relación entre las anomalías de la temperatura superficial del mar y el reclutamiento en la población de la curvina golfina (Cynoscion othonopterus) en el Alto Golfo de California durante el periodo de 2002 a 2020.",
    ],
    normatividad: [
      {
        instrumento: "1. Norma Oficial Mexicana",
        aplica: true,
        disposicion:
          "NOM-063-PESC-2005, Pesca responsable de curvina golfina (Cynoscion othonopterus) en aguas de jurisdicción federal del Alto Golfo de California y Delta del Río Colorado. Especificaciones para su aprovechamiento.",
        sustento: "DOF: 16/08/2007.",
      },
      {
        instrumento: "2. Plan de Manejo Pesquero",
        aplica: true,
        disposicion:
          "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de curvina golfina (Cynoscion othonopterus) del norte del Golfo de California.",
        sustento: "DOF: 06/11/2012.",
      },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de curvina golfina.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Talla mínima de captura de 65 cm de longitud total, con una tolerancia del 35% del número de ejemplares por debajo de dicha talla.",
        sustento: "Numeral 4.6 de la NOM-063-PESC-2005 (DOF: 16/08/2007).",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Red agallera de monofilamento de 14.6 cm (5¾ pulgadas) de luz de malla y un máximo de 293 metros (160 brazas) de paño relingado (una sola red por embarcación) y línea de mano por pescador, exceptuando el uso en la zona de restricción del Acuerdo que regula artes, sistemas, métodos, técnicas y horarios de pesca en el norte del Golfo de California (DOF: 24/09/2020).",
        sustento:
          "Numerales 4.2 y 4.4 de la NOM-063-PESC-2005, Pesca responsable de curvina golfina en aguas de jurisdicción federal del Alto Golfo de California y Delta del Río Colorado (DOF: 16/08/2007).",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Veda temporal para la captura de curvina golfina (Cynoscion othonopterus) en las aguas marinas y estuarinas de jurisdicción federal de la Reserva de la Biosfera Alto Golfo de California y Delta del Río Colorado, del 1 de mayo al 31 de agosto de cada año.",
        sustento: "DOF: 25/08/2005.",
      },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion: "Cuota anual variable.",
        sustento: "Dictamen técnico del INAPESCA. Numeral 4.10 de la NOM-063-PESC-2005 (DOF: 16/08/2007).",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcaciones tipo panga de fibra de vidrio, con motores fuera de borda de 60 a 120 caballos de fuerza y entre 3 y 4 pescadores, utilizando un sistema de pesca de encierro.",
        sustento:
          "Numeral 4.6 del Plan de Manejo Pesquero de curvina golfina (Cynoscion othonopterus) del norte del Golfo de California (DOF: 06/11/2012).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 302 embarcaciones. Sonora: 435 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal del Alto Golfo de California y Delta del Río Colorado, considerando los lineamientos del Programa de Manejo de la Reserva de la Biosfera Alto Golfo de California y Delta del Río Colorado, de acuerdo con las coordenadas límite establecidas en su Decreto de creación del 10 de junio de 1993.",
        sustento: "NOM-063-PESC-2005 (DOF: 25/09/2009).",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Curvina golfina (Cynoscion othonopterus)",
          zona: "Alto Golfo de California",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población Aprovechada al Máximo Sustentable.",
      tacticas: [
        "Cuota de captura",
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Veda temporal fija",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y en la NOM-063-PESC-2005, no incrementar el esfuerzo pesquero en San Felipe (Baja California), Golfo de Santa Clara y comunidades Cucapá.",
        avance: "Sin información",
      },
      {
        recomendacion: "Instrumentar el programa de ordenamiento y manejo conforme a lo previsto en la LGPAS.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Actualizar la NOM-063-PESC-2005 para dar cumplimiento al Acuerdo que regula artes, sistemas, métodos, técnicas y horarios de pesca con embarcaciones menores y mayores en el norte del Golfo de California y establece sitios de desembarque y sistemas de monitoreo (DOF: 24/09/2020).",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar las acciones conducentes para dar cumplimiento a las medidas de manejo, en particular a las cuotas de captura y el número de embarcaciones autorizadas.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y en la NOM-063-PESC-2005.",
        avance: "Sin información",
      },
    ],
  },
  "pac-langostino": {
    generalidades: {
      descripcion: [
        "En México se conocen varias especies del género Macrobrachium que habitan en los ríos desde Baja California hasta Chiapas. Los langostinos tienen importancia comercial y social para las poblaciones ribereñas, que los aprovechan de manera comercial y para autoconsumo. El langostino (Macrobrachium americanum) se captura en Sinaloa, en forma de acceso abierto, en las comunidades ribereñas de los ríos Fuerte, Sinaloa, Culiacán y Baluarte. El langostino (Macrobrachium tenellum) se captura en Nayarit, en los municipios de Santiago Ixcuintla y Rosamorada.",
      ],
      embarcaciones:
        "Se utilizan embarcaciones menores de fibra de vidrio de 10.5 metros de eslora con motor fuera de borda, sin cubierta y con capacidad máxima de carga de 3 toneladas. Los artes de pesca son «tapo-bolso» y «atarraya», así como trampas cilíndricas fabricadas con malla tipo sardinera y estructura de madera. En los ríos, los langostinos se capturan con trampas de forma manual.",
      especiesObjetivo: [
        { nombre: "Langostino, camarón moya", cientifico: "Macrobrachium tenellum" },
        { nombre: "Langostino o cauque", cientifico: "Macrobrachium americanum" },
      ],
      especiesAsociadas: [
        { nombre: "Pinto", cientifico: "Macrobrachium acanthochirus" },
        { nombre: "Zurdito, cauque", cientifico: "Macrobrachium occidentale" },
        { nombre: "Cauque", cientifico: "Macrobrachium digueti" },
        { nombre: "Langosta australiana", cientifico: "Cherax quadricarinatus" },
      ],
    },
    indicadores: {
      // Tendencia de la captura de langostino en Nayarit (M. tenellum) y Sinaloa (M. americanum), 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de langostino por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Nayarit",
              color: "#0d9488",
              datos: [
                { año: 2000, captura: 44 },
                { año: 2001, captura: 43 },
                { año: 2002, captura: 3 },
                { año: 2003, captura: 78 },
                { año: 2004, captura: 60 },
                { año: 2005, captura: 30 },
                { año: 2006, captura: 30 },
                { año: 2007, captura: 3 },
                { año: 2008, captura: 105 },
                { año: 2009, captura: 40 },
                { año: 2010, captura: 25 },
                { año: 2011, captura: 22 },
                { año: 2012, captura: 60 },
                { año: 2013, captura: 37 },
                { año: 2014, captura: 95 },
                { año: 2015, captura: 82 },
                { año: 2016, captura: 170 },
                { año: 2017, captura: 168 },
                { año: 2018, captura: 160 },
                { año: 2019, captura: 57 },
                { año: 2020, captura: 124 },
              ],
            },
            {
              estado: "Sinaloa",
              color: "#8b5cf6",
              datos: [
                { año: 2000, captura: 6 },
                { año: 2001, captura: 3 },
                { año: 2002, captura: 2 },
                { año: 2003, captura: 3 },
                { año: 2004, captura: 3 },
                { año: 2005, captura: 3 },
                { año: 2006, captura: 3 },
                { año: 2007, captura: 2 },
                { año: 2008, captura: 3 },
                { año: 2009, captura: 3 },
                { año: 2010, captura: 3 },
                { año: 2011, captura: 8 },
                { año: 2012, captura: 5 },
                { año: 2013, captura: 4 },
                { año: 2014, captura: 4 },
                { año: 2015, captura: 3 },
                { año: 2016, captura: 4 },
                { año: 2017, captura: 6 },
                { año: 2018, captura: 10 },
                { año: 2019, captura: 8 },
                { año: 2020, captura: 6 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Se tienen estimaciones de la tasa de producción anual de langostino (Macrobrachium tenellum) en Nayarit, en las que se observa una tendencia descendente de la tasa de producción de la población, posiblemente como efecto de índices ambientales o biológicos.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de langostino.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Trampas, atarrayas y acachales (nasas artesanales), que se operan en los cursos de las corrientes de los ríos y arroyos, en profundidades inferiores a 2 metros.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Veda para la pesca de «langostino» (Macrobrachium americanum) y «chacal» (Macrobrachium tenellum) en aguas continentales de jurisdicción federal de la vertiente del océano Pacífico, del 1 de agosto al 31 de octubre de cada año.",
        sustento:
          "Acuerdo por el que se establecen épocas y zonas de veda para la pesca de diferentes especies de la fauna acuática en aguas continentales de jurisdicción federal de los Estados Unidos Mexicanos (DOF: 31/03/2010).",
      },
      { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "En Nayarit, embarcaciones menores con motor fuera de borda y artes de pesca «tapo-bolso» y «atarraya». En Sinaloa, solo trampas cilíndricas fabricadas con malla tipo sardinera y estructura de madera.",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Sinaloa: 29 embarcaciones. Nayarit: 57 embarcaciones. Jalisco: 7 embarcaciones. Colima: 70 embarcaciones. Michoacán: 33 embarcaciones. Guerrero: 275 embarcaciones. Oaxaca: 10 embarcaciones. Chiapas: 44 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion: "Aguas continentales de jurisdicción federal de la vertiente del océano Pacífico.",
        sustento: "Permiso para pesca comercial.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Langostino (Macrobrachium tenellum)",
          zona: "Nayarit",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Langostino (Macrobrachium americanum)",
          zona: "Sinaloa",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener las poblaciones Aprovechadas al Máximo Sustentable.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Regulación del arte y método de captura",
        "Veda reproductiva temporal",
        "Zona de pesca",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo de pesca actual en los sistemas lagunares y zonas de pesca Aprovechadas al Máximo Sustentable en Nayarit.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En Sinaloa, el esfuerzo de pesca se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
    ],
  },
  "pac-medusa-bola-de-canon": {
    generalidades: {
      descripcion: [
        "La medusa bola de cañón (Stomolophus sp.) forma agregaciones reproductivas que pueden variar de unos metros a decenas de metros de ancho y kilómetros de largo. Las agregaciones varían espacio-temporalmente, pero en general ocurren entre marzo y mayo. La pesquería en el Golfo de California se realiza en localidades específicas de la costa que pueden variar según la temporada; por ejemplo, durante la temporada 2013 se registró la instalación de 19 plantas procesadoras entre Guaymas y Las Guásimas, en un tramo de 40 kilómetros. En Sonora, los principales centros productores han sido Las Guásimas y el Golfo de Santa Clara. Es una importante actividad económica a partir de 2001, alternativa a la de recursos como la sierra (Scomberomorus spp.) u otros que en primavera se encuentran vedados (camarón, jaiba, tiburones y rayas).",
      ],
      embarcaciones:
        "La captura aprovecha la naturaleza gregaria del recurso y se realiza en la franja entre 20 y 1,000 metros de la costa, generalmente cerca de lagunas costeras o bahías con fondos arenosos o lodosos, a profundidades de 2 a 20 metros, en días soleados y con viento en calma. Se realiza a bordo de embarcaciones menores con motor fuera de borda de 25 a 80 caballos de fuerza y capacidad de acarreo de una a cinco toneladas, tripuladas por dos a cuatro pescadores. Se utilizan cucharas de aro metálico de 40 a 50 centímetros de diámetro, con mango de aproximadamente 2 metros, del que va fija una bolsa de paño pesquero (generalmente de 4 a 6 pulgadas de abertura de malla). Ocasionalmente se usa una red de enmalle («rampa») que hace las veces de barrera y, con ayuda de la corriente, sube el recurso a la superficie, donde se captura con la cuchara; su uso es más común en el Alto Golfo de California.",
      especiesObjetivo: [{ nombre: "Medusa bola de cañón o aguamala", cientifico: "Stomolophus sp." }],
    },
    indicadores: {
      // Tendencia de la captura de medusa bola de cañón en Sonora, 2001-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de medusa bola de cañón en Sonora, 2001–2020 (CONAPESCA)",
          series: [
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2001, captura: 2000 },
                { año: 2002, captura: 6000 },
                { año: 2003, captura: 1000 },
                { año: 2004, captura: 4500 },
                { año: 2005, captura: 12500 },
                { año: 2006, captura: 14500 },
                { año: 2007, captura: 4000 },
                { año: 2008, captura: 6500 },
                { año: 2009, captura: 9000 },
                { año: 2010, captura: 19500 },
                { año: 2011, captura: 35500 },
                { año: 2012, captura: 50000 },
                { año: 2013, captura: 16500 },
                { año: 2014, captura: 30500 },
                { año: 2015, captura: 32000 },
                { año: 2016, captura: 6000 },
                { año: 2017, captura: 47000 },
                { año: 2018, captura: 80000 },
                { año: 2019, captura: 54000 },
                { año: 2020, captura: 13000 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "A nivel global, los florecimientos de especies gelatinosas obedecen a causas antropogénicas, entre las cuales el cambio climático es una de las más probables, aunque no se descartan efectos combinados de varios factores como la contaminación y la construcción de estructuras marinas que sirven de sustrato para los pólipos. Se ha concluido que el Golfo de California cambió de régimen climático a partir del evento El Niño 2009-2010, lo que ha repercutido en los recursos pesqueros. Un análisis reciente concluyó que la pesquería de medusa bola de cañón es la única, entre un grupo de 28 especies mexicanas de importancia económica, que resultará beneficiada por efectos del cambio climático, considerando efectos sobre la tasa intrínseca de crecimiento, la abundancia local, la fenología, la calcificación, las enfermedades, el nivel del mar, la accesibilidad del recurso y la gobernanza como factor de adaptación.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de medusa bola de cañón.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion: "110 milímetros de diámetro de campana para Stomolophus sp.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Red de cuchara con aro metálico de 40 a 50 centímetros de diámetro, con mango metálico o de madera de 2 metros de longitud y una bolsa de paño pesquero con luz de malla generalmente de 4 a 6 pulgadas.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, tripulada por dos a cuatro pescadores; su extracción es con cuchara de aro metálico.",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 61 embarcaciones. Sonora: 997 embarcaciones. Sinaloa: 15 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas de jurisdicción federal del Golfo de California, considerando los lineamientos del Programa de Manejo de la Reserva de la Biosfera Alto Golfo de California y Delta del Río Colorado.",
        sustento: "Permiso para pesca comercial.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Medusa bola de cañón (Stomolophus sp.)",
          zona: "Golfo de California",
        },
      ],
      estrategia: "Tasa de aprovechamiento basada en el Aprovechamiento Máximo Sustentable.",
      tacticas: ["Control del esfuerzo pesquero", "Talla mínima de captura", "Cuotas de captura por zona"],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no expedir nuevos permisos de pesca para la zona de Guaymas-Las Guásimas hasta que se compruebe, mediante evaluaciones del INAPESCA, que se ha recuperado la biomasa de medusa bola de cañón.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Expedir nuevos permisos de pesca en el Alto Golfo de California de acuerdo con la disponibilidad anual de medusa bola de cañón, previa opinión del INAPESCA.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Realizar las pausas necesarias durante la temporada de pesca con el fin de permitir que los juveniles crezcan y se recluten a la talla de captura, previa opinión técnica del INAPESCA.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Elaborar y publicar una Norma Oficial Mexicana para regular el inicio de temporada, la talla mínima de captura, la tasa de incidentalidad de organismos menores a la talla mínima, la cuchara de pesca con malla en forma de cuadro y la zonificación de las zonas de pesca.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo por zonas y/o regiones de pesca, conforme a lo previsto en la LGPAS.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Promover la inclusión de Stomolophus sp. en la lista de especies importadas por China y otros países destino del producto de esta pesquería.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Suspender toda actividad de pesca cuando las condiciones del mar sean adversas, especialmente durante el transporte del producto de los sitios de captura a los de recepción.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Permitir el traslado de las embarcaciones de una zona de captura a otra únicamente cuando haya suficiente recurso, con acuerdo previo entre comunidades y autorización de la CONAPESCA.",
        avance: "Sin información",
      },
    ],
  },
  "pac-mejillon": {
    generalidades: {
      descripcion: [
        "El mejillón es un bivalvo de la familia Mytilidae de amplia distribución. En México se localiza a lo largo del litoral del Pacífico y del Golfo de California. Se tienen identificadas las especies: Mytilus californianus, que vive adherida a rocas de áreas expuestas, en niveles superiores de la zona intermareal, formando colonias, y puede encontrarse hasta unos 50 metros de profundidad; Modiolus capax, que habita adherida a diversos sustratos (roca, piedra, fango), desde niveles de baja marea hasta 50 metros de profundidad, en zonas protegidas dentro de las bahías; y Mytella guyanensis, en bancos fangosos o manglares pantanosos, adherida a piedras o semienterrada en arena fangosa, desde la zona intermareal hasta el nivel superior de la zona sublitoral. El mejillón o choro silvestre es un recurso de subsistencia.",
      ],
      embarcaciones:
        "La colecta es manual en periodos de bajamar y por buceo. La captura de mejillón (Mytilus californianus) presenta una tendencia estable, con picos importantes; la captura máxima se registró en 2010, con valores ascendentes de 2018 a 2020.",
      especiesObjetivo: [
        { nombre: "Mejillón o choro", cientifico: "Mytilus californianus" },
        { nombre: "Mejillón", cientifico: "Modiolus capax" },
        { nombre: "Mejillón", cientifico: "Mytella guyanensis" },
        { nombre: "Mejillón", cientifico: "Mytilus galloprovincialis" },
        { nombre: "Mejillón", cientifico: "Mytilus edulis" },
        { nombre: "Mejillón", cientifico: "Mytilus strigata" },
      ],
      especiesAsociadas: [{ nombre: "Percebe", cientifico: "Pollicipes polymerus" }],
    },
    indicadores: {
      // Tendencia de la captura de mejillón (Mytilus californianus) en BC, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de mejillón en Baja California, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2000, captura: 245 },
                { año: 2001, captura: 325 },
                { año: 2002, captura: 100 },
                { año: 2003, captura: 120 },
                { año: 2004, captura: 300 },
                { año: 2005, captura: 170 },
                { año: 2006, captura: 120 },
                { año: 2007, captura: 120 },
                { año: 2008, captura: 215 },
                { año: 2009, captura: 370 },
                { año: 2010, captura: 1051 },
                { año: 2011, captura: 365 },
                { año: 2012, captura: 270 },
                { año: 2013, captura: 730 },
                { año: 2014, captura: 220 },
                { año: 2015, captura: 195 },
                { año: 2016, captura: 290 },
                { año: 2017, captura: 225 },
                { año: 2018, captura: 635 },
                { año: 2019, captura: 345 },
                { año: 2020, captura: 130 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Estudios previos en otras especies de mejillón indican que factores ambientales como la temperatura y la disponibilidad de alimento tienen relación con el crecimiento y la reproducción de los organismos. El mejillón o choro, como muchos organismos bentónicos, es altamente susceptible a la variabilidad ambiental y a los cambios en la temperatura del agua. Los registros de captura se vieron fuertemente afectados en la década de 1980 por los efectos combinados del ENSO 1982-1983, entre otros eventos en los periodos 1991-1992 y 1997-1998. Entre 2013 y 2015 se originó el fenómeno oceanográfico «La Mancha», entre las Aleutianas y el Golfo de Alaska, que inhibió el transporte de nutrientes en detrimento de la producción primaria, dejando escaso alimento en la columna de agua, factor fundamental para organismos filtradores como los mejillones o choros.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso y concesión para pesca comercial de mejillón o choro.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "80 milímetros de longitud de concha para Mytilus californianus en Baja California. El resto de las especies, en función de los estudios del INAPESCA.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion: "Recolección manual con espátula y bolsa de malla llamada «jaba».",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion: "Cuota de captura anual o bienal (por especie, zona y banco).",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista), cuando la zona sea de acantilado o de arrecifes.",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 2 embarcaciones. Sonora: 8 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal y sistemas lagunares del Golfo de California, incluyendo la costa del Pacífico de Baja California, la costa del Golfo de Baja California Sur y Sonora, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Mejillón o choro",
          zona: "Baja California, Baja California Sur y Sonora",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener las poblaciones Aprovechadas al Máximo Sustentable.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Rotación de bancos",
        "Veda reproductiva",
        "Zona de refugio pesquero",
        "Regulación del arte y métodos de pesca",
        "Extracción individual de organismos adultos",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, en zonas con estatus Indeterminado el esfuerzo pesquero se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará mediante solicitud a la CONAPESCA (de preferencia tres meses antes del inicio de la temporada), tras lo cual el INAPESCA definirá el programa de trabajo para la evaluación y emitirá el dictamen técnico correspondiente.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En el caso de solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Como medida precautoria, extraer los organismos de manera individual y evitar colectar racimos completos para no dañar a juveniles y especies asociadas.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Llevar a cabo la pesca mediante rotación de bancos y dejar parches de organismos adultos que sirvan de reproductores.",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
    ],
  },
  "pac-caracol-chino": {
    generalidades: {
      descripcion: [
        "Los caracoles chinos (Muricanthus nigritus y Phyllonotus erythrostomus) son gasterópodos marinos que presentan prolongaciones a manera de picos cortos en sus conchas, con líneas transversales de color rosado o negro según la especie y un opérculo que protege el cuerpo blando del organismo. Es un depredador que se alimenta de bivalvos, principalmente mejillones y almejas pequeñas. Los adultos alcanzan tallas de 85 a 95 milímetros. Habitan principalmente en el litoral del Pacífico mexicano, en profundidades desde unos pocos centímetros hasta 60 metros, sobre sustratos de arena, lodo y grava.",
        "Alcanza la madurez sexual entre los 2 y 3 años de edad, con periodo reproductivo en los meses de mayo a agosto. Forma grandes aglomeraciones reproductivas de miles de organismos donde desova; los embriones son incubados en cápsulas (que asemejan «flores») durante un periodo de 18 a 31 días. Después emergen larvas que se alimentan de fitoplancton y, en alrededor de un año, se convierten en juveniles de aproximadamente 60 milímetros. Estas aglomeraciones facilitan la visualización de los caracoles y es cuando se lleva a cabo la captura comercial.",
      ],
      embarcaciones:
        "La captura de caracol chino negro (Muricanthus nigritus) se realiza mediante buceo, mientras que el caracol chino rosa (Phyllonotus erythrostomus) se captura con trampas. Para el caracol chino rosa, la unidad de pesca consta de una embarcación menor con motor fuera de borda, dos pescadores (marinero y motorista), jaba de plástico y trampas tipo Chesapeake. Para el caracol chino negro se usa una embarcación menor (panga) con motor fuera de borda y equipo de buceo con compresor tipo «Hooka», con dos a cuatro pescadores: motorista («popero» o «bombero»), cabo de vida y buzo.",
      especiesObjetivo: [
        { nombre: "Caracol chino negro", cientifico: "Muricanthus nigritus" },
        { nombre: "Caracol chino rosa", cientifico: "Phyllonotus erythrostomus" },
      ],
      especiesAsociadas: [
        { nombre: "Jaiba verde, café", cientifico: "Callinectes bellicosus" },
        { nombre: "Jaiba azul", cientifico: "Callinectes arcuatus" },
        { nombre: "Cochito", cientifico: "Balistes polylepis" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "Sonora concentra el mayor volumen de captura (91.4%), seguido de Sinaloa (5.9%), Baja California Sur (2.5%) y Baja California (0.1%), en el periodo 2000-2020.",
      ],
      // Tendencia de la captura de caracol chino en BC, BCS, Sonora y Sinaloa, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de caracol chino por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2000, captura: 250 },
                { año: 2001, captura: 600 },
                { año: 2002, captura: 750 },
                { año: 2003, captura: 1350 },
                { año: 2004, captura: 1500 },
                { año: 2005, captura: 1600 },
                { año: 2006, captura: 700 },
                { año: 2007, captura: 650 },
                { año: 2008, captura: 800 },
                { año: 2009, captura: 850 },
                { año: 2010, captura: 600 },
                { año: 2011, captura: 1950 },
                { año: 2012, captura: 5800 },
                { año: 2013, captura: 5207 },
                { año: 2014, captura: 2450 },
                { año: 2015, captura: 2850 },
                { año: 2016, captura: 3400 },
                { año: 2017, captura: 2500 },
                { año: 2018, captura: 2800 },
                { año: 2019, captura: 4500 },
                { año: 2020, captura: 2150 },
              ],
            },
            {
              estado: "Sinaloa",
              color: "#8b5cf6",
              datos: [
                { año: 2014, captura: 100 },
                { año: 2015, captura: 450 },
                { año: 2016, captura: 550 },
                { año: 2017, captura: 350 },
                { año: 2018, captura: 400 },
                { año: 2019, captura: 350 },
                { año: 2020, captura: 300 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2014, captura: 50 },
                { año: 2015, captura: 200 },
                { año: 2016, captura: 250 },
                { año: 2017, captura: 150 },
                { año: 2018, captura: 200 },
                { año: 2019, captura: 599 },
                { año: 2020, captura: 250 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2015, captura: 13 },
                { año: 2016, captura: 3 },
                { año: 2017, captura: 2 },
                { año: 2018, captura: 3 },
                { año: 2019, captura: 2 },
                { año: 2020, captura: 2 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Se ha documentado que, durante el invierno, la mayoría de los caracoles se mantienen inactivos y enterrados cerca de las zonas rocosas, y que muchos regresan al mismo sitio a reproducirse cada año, iniciando la formación de agregaciones reproductivas conocidas como «bultos» por los pescadores. En este tiempo se aparean por fertilización interna y la hembra coloca los huevos en cápsulas sobre la concha de otros caracoles. Algunas de estas aglomeraciones se posicionan entre los 22 y 31 °C de temperatura del agua, con una proporción hembra-macho cercana a 1:1. La temperatura superficial del mar y los intercambios de marea influyen en las poblaciones del caracol chino rosa y negro: de mayo a agosto, la temperatura superficial del mar en la costa occidental de la península de Baja California se incrementa de 16.2 a 21.6 °C, y en el Golfo de California de 24.0 a 29.8 °C, lo que favorece la maduración y el desove en el periodo reproductivo, a finales de la primavera y principios del verano.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de caracol chino.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion: "90 milímetros de longitud de concha para Muricanthus nigritus y Phyllonotus erythrostomus.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Caracol chino negro: extracción manual y buceo semiautónomo tipo «Hooka». Caracol chino rosa: trampas Chesapeake en Sonora y trampas cebadas de dimensiones y material variable en Baja California; en Baja California Sur, extracción manual y buceo semiautónomo tipo «Hooka».",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion: "Cuota anual de captura por zona, con tasa de aprovechamiento variable.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Para caracol chino rosa: embarcación menor con motor fuera de borda, dos pescadores (marinero y motorista), jaba de plástico y trampas tipo Chesapeake. Para caracol chino negro: embarcación menor (panga) con motor fuera de borda y equipo de buceo con compresor tipo «Hooka», con dos a cuatro pescadores (motorista o «popero»/«bombero», cabo de vida y buzo).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Baja California: 13 embarcaciones. Baja California Sur: 13 embarcaciones. Sonora: 441 embarcaciones. Sinaloa: 132 embarcaciones. Guerrero: 8 embarcaciones.",
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
          especie: "Caracol chino",
          zona: "Sonora",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Caracol chino",
          zona: "Canales y esteros de López Mateos (Baja California Sur)",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Caracol chino",
          zona: "Baja California, resto de Baja California Sur y Sinaloa",
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
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el número de embarcaciones en los sistemas lagunares y zonas de pesca Aprovechadas al Máximo Sustentable en Sonora, y en canales y esteros de López Mateos, Baja California Sur.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En zonas con estatus Indeterminado, el número de embarcaciones se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En el caso de solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
        avance: "Sin información",
      },
      {
        recomendacion: "Establecer vedas temporales para proteger el periodo reproductivo en las zonas de pesca.",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo por zona de pesca y/o áreas definidas, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, se recomienda limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015, apartado 4.11, inciso e.",
        avance: "Sin información",
      },
    ],
  },
  "pac-caracol-panocha": {
    generalidades: {
      descripcion: [
        "El caracol panocha (Megastraea undosa) y el caracol turbante (Megastraea turbanica) son herbívoros oportunistas, con altas tasas de crecimiento y fecundidad, lo cual los hace un recurso atractivo para la explotación. Son especies típicas de mares templados y se distribuyen en el hemisferio norte, desde Punta Concepción, California, Estados Unidos, hasta Bahía Magdalena, Baja California Sur, México. La captura se realiza en la costa occidental de la península de Baja California, destacando las áreas comprendidas desde Tijuana, Baja California, hasta Punta Abreojos, Baja California Sur, incluyendo islas adyacentes al macizo peninsular. Habita en zonas rocosas y áreas arenosas contiguas a las rocas.",
      ],
      embarcaciones:
        "El caracol turbante (Megastraea turbanica) es capturado principalmente en Isla Natividad, Baja California Sur, donde constituye hasta un 30% de la captura de caracol de la isla, mientras que Megastraea undosa sostiene la pesquería de manera general en el resto del estado. En Baja California no se reporta la captura por especie, pero se captura indistintamente en todo el estado.",
      especiesObjetivo: [
        { nombre: "Caracol panocha", cientifico: "Megastraea undosa" },
        { nombre: "Caracol turbante", cientifico: "Megastraea turbanica" },
      ],
      especiesAsociadas: [
        { nombre: "Erizo rojo", cientifico: "Strongylocentrotus franciscanus" },
        { nombre: "Erizo morado", cientifico: "Strongylocentrotus purpuratus" },
        { nombre: "Pepino de mar", cientifico: "Parastichopus parvimensis" },
        { nombre: "Concha lapa", cientifico: "Megathura crenulata" },
        { nombre: "Caracol tornillo", cientifico: "Kelletia kelletii" },
        { nombre: "Caracol turbo o burgado", cientifico: "Turbo fluctuosus" },
        { nombre: "Abulón (azul, amarillo, negro, chino y rojo)", cientifico: "Haliotis spp." },
      ],
    },
    indicadores: {
      // Tendencia de la captura de caracol panocha en BC y BCS, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de caracol panocha por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2000, captura: 1100 },
                { año: 2001, captura: 1400 },
                { año: 2002, captura: 1350 },
                { año: 2003, captura: 1100 },
                { año: 2004, captura: 1350 },
                { año: 2005, captura: 1280 },
                { año: 2006, captura: 1450 },
                { año: 2007, captura: 1600 },
                { año: 2008, captura: 1350 },
                { año: 2009, captura: 1630 },
                { año: 2010, captura: 1420 },
                { año: 2011, captura: 1600 },
                { año: 2012, captura: 1550 },
                { año: 2013, captura: 1420 },
                { año: 2014, captura: 1180 },
                { año: 2015, captura: 900 },
                { año: 2016, captura: 600 },
                { año: 2017, captura: 910 },
                { año: 2018, captura: 800 },
                { año: 2019, captura: 350 },
                { año: 2020, captura: 260 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2000, captura: 470 },
                { año: 2001, captura: 400 },
                { año: 2002, captura: 300 },
                { año: 2003, captura: 180 },
                { año: 2004, captura: 460 },
                { año: 2005, captura: 290 },
                { año: 2006, captura: 600 },
                { año: 2007, captura: 460 },
                { año: 2008, captura: 490 },
                { año: 2009, captura: 720 },
                { año: 2010, captura: 380 },
                { año: 2011, captura: 470 },
                { año: 2012, captura: 570 },
                { año: 2013, captura: 660 },
                { año: 2014, captura: 130 },
                { año: 2015, captura: 130 },
                { año: 2016, captura: 100 },
                { año: 2017, captura: 150 },
                { año: 2018, captura: 160 },
                { año: 2019, captura: 130 },
                { año: 2020, captura: 210 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Las diferencias en talla y edad del caracol panocha a lo largo de la península de Baja California muestran un gradiente latitudinal relacionado con la temperatura, ya que ésta afecta el alimento de los organismos. También se ha observado que el aumento de la tasa metabólica, probablemente debido al incremento de las temperaturas, junto con la disponibilidad o la disminución en la calidad del alimento, puede ocasionar efectos negativos sobre el crecimiento en peso. El caracol panocha es altamente susceptible a la variabilidad ambiental y a los cambios en la temperatura del agua. Entre 2013 y 2015 se originó un fenómeno oceanográfico denominado «La Mancha», entre las Aleutianas y el Golfo de Alaska, favorecido por altas presiones atmosféricas, alta radiación solar y poca rapidez del viento sobre la superficie marina, que provocó anomalías positivas extremas de temperatura; arrastradas al sur por la Corriente de California, se unieron al efecto «El Niño» 2015-2016 frente a la península de Baja California.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial o concesión de caracol panocha.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion: "90 milímetros para Megastraea undosa y 100 milímetros para Megastraea turbanica.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion: "Extracción manual con bolsa de malla llamada «jaba».",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion: "Del 1 de noviembre al 28 de febrero de cada año.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion:
          "Cuota de captura anual (por zona y banco), previa solicitud del usuario a través de la CONAPESCA, ratificada cada año mediante dictamen técnico del INAPESCA.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California: 149 embarcaciones. Baja California Sur: 161 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal en la costa del Pacífico de la península de Baja California, en zonas definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Caracol panocha",
          zona: "Baja California Sur",
        },
        {
          categoria: "En deterioro",
          color: "red",
          especie: "Caracol panocha",
          zona: "Baja California",
        },
      ],
      estrategia: "Tasa de aprovechamiento por cuota de captura por zona y banco.",
      tacticas: ["Control del esfuerzo pesquero", "Veda reproductiva", "Talla mínima de captura"],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo pesquero en toda la costa del Pacífico de la península de Baja California.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará mediante solicitud a la CONAPESCA (de preferencia tres meses antes del inicio de la temporada), tras lo cual el INAPESCA definirá el programa de trabajo para la evaluación y emitirá el dictamen técnico correspondiente.",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar el programa de ordenamiento y manejo conforme a lo previsto en la LGPAS, por área definida, con énfasis en la región de Baja California, para promover zonas integrales de pesca de recursos bentónicos o semisésiles de importancia comercial, de manera que un solo permisionario u organización pueda aprovechar todos los recursos en una misma zona de pesca.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, se recomienda limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015, apartado 4.11, inciso e.",
        avance: "Sin información",
      },
    ],
  },
  "pac-cucaracha-de-mar": {
    generalidades: {
      descripcion: [
        "La cucaracha de mar o quitón (Chiton articulatus) se captura principalmente en las costas rocosas de los estados de Sinaloa, Nayarit, Jalisco, Colima, Michoacán, Guerrero y Oaxaca, incluyendo islas e islotes cercanos (Isla Pájaros e Isla Venados, Sinaloa; Las Islitas, Isla Isabel, Islas Marías e Islas Marietas, Nayarit; Islas Revillagigedo, Colima).",
      ],
      embarcaciones:
        "Las maniobras de pesca se realizan de dos maneras: la primera, por acceso a las áreas de captura por vía terrestre y/o en embarcaciones menores de madera o fibra de vidrio, propulsadas por remo o motor fuera de borda, con dos pescadores (pescador y timonero). La extracción es manual, con ayuda de una varilla de acero (de aproximadamente 80 centímetros de longitud, con un extremo afilado y el otro envuelto en tiras de caucho), con el objeto de desprender los organismos de las rocas por punción directa al cuerpo del animal o, si la marea es suficientemente baja, haciendo palanca entre el pie del organismo y el sustrato; se depositan en morrales de plástico.",
      especiesObjetivo: [
        { nombre: "Cucaracha de mar, lengua de perro, cañitas", cientifico: "Chiton articulatus" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "Se captura en las costas de Mazatlán (Sinaloa), Cruz de Huanacaxtle (Nayarit), Acapulco (Guerrero) y Puerto Ángel (Oaxaca).",
        "Es una actividad de subsistencia y complemento alimenticio: el pie del organismo se utiliza como carnada para la pesca artesanal cuando otros recursos son escasos. Existe un patrón consistente en las cantidades, tamaños y pesos de los ejemplares capturados en ciertas fechas o temporadas.",
      ],
    },
    ambiente: [
      "La cucaracha de mar (Chiton articulatus) es un organismo ectotermo que presenta plasticidad en sus rasgos de historia de vida (reproducción y crecimiento). En particular, el crecimiento se acelera durante temporadas climáticas cálidas, y se sabe que presenta un patrón de crecimiento (tamaño de la población, número de grupos de tamaño y de cohortes, tasa de crecimiento y longevidad) divergente entre un año frío y uno cálido.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de cucaracha de mar.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Punzón o varilla de acero (de aproximadamente 80 centímetros de longitud, con un extremo afilado y el otro envuelto en tiras de caucho). La extracción deberá realizarse manualmente.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion: "Embarcación menor con remos o motor fuera de borda.",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Guerrero: 22 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal de Sinaloa, Nayarit, Jalisco, Colima, Michoacán, Guerrero y Oaxaca, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y sus programas de manejo, y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Cucaracha de mar (Chiton articulatus)",
          zona: "Litoral del Pacífico",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población Aprovechada al Máximo Sustentable.",
      tacticas: [
        "Cuota de captura",
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Rotación de bancos",
        "Veda temporal",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "En todas las zonas, el esfuerzo de pesca se determinará en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion: "Asignar permisos exclusivos para la especie cucaracha de mar (Chiton articulatus).",
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
          "Instrumentar programas de ordenamiento y manejo por áreas definidas, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
    ],
  },
  "pac-almeja-pata-de-mula": {
    generalidades: {
      descripcion: [
        "La almeja pata de mula de mangle (Anadara tuberculosa) se distribuye desde Laguna Ballenas, en Baja California, hasta el sur de Tumbes, Perú. Habita en sustratos fangosos y areno-limosos de las zonas de manglar, enterrada específicamente donde crecen las raíces de mangle, generalmente en la zona intermareal de lagunas costeras con aguas someras. Larkinia grandis se distribuye desde Bahía Magdalena (incluyendo el Golfo de California) hasta el sur de Tumbes, Perú, y habita en llanuras intermareales y algunas áreas submareales más allá de los bordes de los manglares. Larkinia multicostata se distribuye desde Bahía de Newport, California (incluyendo el Golfo de California), hasta el sur de Panamá e Isla Galápagos.",
        "En Baja California, las principales zonas de pesca son el Estero San José y la Laguna Manuela. En Baja California Sur, los interiores de Laguna Ojo de Liebre, Estero Los Borrachos, Estero La Bocana y las zonas de manglar del Estero El Coyote, Estero El Cardón, Estero El Delgadito, Estero El Dátil, el complejo lagunar Bahía Almejas-Magdalena y los canales y esteros de López Mateos. En Sinaloa, desde Agiabampo hasta Altata-Ensenada del Pabellón.",
      ],
      embarcaciones:
        "La unidad de pesca consiste en embarcaciones menores con motor fuera de borda y un equipo de buceo semiautónomo con compresor tipo «Hooka», con hasta tres pescadores (motorista, cabo de vida y buzo). El buzo, con ayuda de un rastrillo, escarba en el sedimento marino para localizar los organismos enterrados y colocarlos en una bolsa de malla llamada «jaba». En la zona de manglar se utiliza una embarcación menor con motor fuera de borda y participan un motorista y varios «pateros», personas que se adentran en los manglares y colectan manualmente la almeja.",
      especiesObjetivo: [
        { nombre: "Almeja pata de mula de mangle, almeja negra", cientifico: "Anadara tuberculosa" },
        { nombre: "Almeja pata de mula de banco, ala de ángel", cientifico: "Larkinia multicostata" },
        { nombre: "Almeja pata de mula", cientifico: "Larkinia grandis" },
      ],
    },
    indicadores: {
      datosDestacados: ["La mayor captura se registra en Baja California Sur."],
      // Tendencia de la captura de almeja pata de mula en BC, BCS y Sinaloa, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de almeja pata de mula por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2000, captura: 560 },
                { año: 2001, captura: 400 },
                { año: 2002, captura: 230 },
                { año: 2003, captura: 460 },
                { año: 2004, captura: 42 },
                { año: 2005, captura: 420 },
                { año: 2006, captura: 410 },
                { año: 2007, captura: 470 },
                { año: 2008, captura: 530 },
                { año: 2009, captura: 450 },
                { año: 2010, captura: 565 },
                { año: 2011, captura: 565 },
                { año: 2012, captura: 495 },
                { año: 2013, captura: 813 },
                { año: 2014, captura: 665 },
                { año: 2015, captura: 715 },
                { año: 2016, captura: 650 },
                { año: 2017, captura: 505 },
                { año: 2018, captura: 420 },
                { año: 2019, captura: 320 },
                { año: 2020, captura: 285 },
              ],
            },
            {
              estado: "Sinaloa",
              color: "#8b5cf6",
              datos: [
                { año: 2000, captura: 60 },
                { año: 2001, captura: 80 },
                { año: 2002, captura: 30 },
                { año: 2003, captura: 180 },
                { año: 2004, captura: 170 },
                { año: 2005, captura: 20 },
                { año: 2006, captura: 30 },
                { año: 2007, captura: 90 },
                { año: 2008, captura: 165 },
                { año: 2009, captura: 130 },
                { año: 2010, captura: 75 },
                { año: 2011, captura: 70 },
                { año: 2012, captura: 165 },
                { año: 2013, captura: 140 },
                { año: 2014, captura: 150 },
                { año: 2015, captura: 200 },
                { año: 2016, captura: 270 },
                { año: 2017, captura: 400 },
                { año: 2018, captura: 330 },
                { año: 2019, captura: 83 },
                { año: 2020, captura: 440 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2008, captura: 40 },
                { año: 2009, captura: 30 },
                { año: 2010, captura: 20 },
                { año: 2013, captura: 20 },
                { año: 2014, captura: 20 },
                { año: 2016, captura: 30 },
                { año: 2017, captura: 70 },
                { año: 2018, captura: 169 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Para las poblaciones de Anadara tuberculosa se ha documentado que la disponibilidad de nutrientes condiciona la frecuencia de organismos en fase de desarrollo, y que el incremento de la temperatura favorece la fase de madurez. Asimismo, se ha reportado que es una especie con ambientes salinos entre 24 y 25 ppm; a salinidades bajas presenta problemas de reproducción y desarrollo gonadal, lo que implica poca o nula reproducción. Para una mejor producción, las condiciones de oxígeno son de 3.5 a 4 mg/L y el pH de entre 7.6 y 8. Por su parte, Larkinia multicostata presenta una relación directa de la madurez gonádica con el aumento de la temperatura.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de almeja pata de mula.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Anadara tuberculosa: 60 mm de longitud de concha en todos los estados. Larkinia multicostata: 75 mm de longitud de concha en todos los estados.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Buceo semiautónomo tipo «Hooka», con colecta manual y uso de rastrillos en bahías y lagunas costeras. En manglar, colecta manual.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion:
          "Cuota de captura bienal (por especie y por zona). Tasa de aprovechamiento anual del 20% al 30% por arriba de la talla mínima de captura para cada especie.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda y equipo de buceo semiautónomo con compresor tipo «Hooka», con hasta tres pescadores (motorista, cabo de vida y buzo).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Baja California: 5 embarcaciones. Baja California Sur: 63 embarcaciones. Sonora: 1 embarcación. Sinaloa: 112 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal y sistemas lagunares de Baja California, Baja California Sur, Sonora y Sinaloa, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y sus programas de manejo, y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja pata de mula",
          zona: "Estero San José y Laguna Manuela (Baja California)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja pata de mula",
          zona: "Complejo lagunar Bahía Magdalena, Bahía Almejas, canales y esteros de López Mateos, y Laguna San Ignacio (Baja California Sur)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja pata de mula",
          zona: "Sinaloa",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Almeja pata de mula",
          zona: "Sonora y resto de Baja California",
        },
      ],
      estrategia: "Cuota de captura y tasa de aprovechamiento.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Rotación de bancos",
        "Zonas de refugio",
        "Veda reproductiva temporal",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el número de embarcaciones en los sistemas lagunares y zonas de pesca Aprovechadas al Máximo Sustentable, en Baja California, Baja California Sur y Sinaloa.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En zonas con estatus Indeterminado, el número de embarcaciones se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En el caso de solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En caso de que los estudios del INAPESCA determinen que alguna población se ubique como Deteriorada, el INAPESCA emitirá opinión técnica con las recomendaciones y estrategias para su recuperación.",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, con base en lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
    ],
  },
  "pac-botete": {
    generalidades: {
      descripcion: [
        "El botete (Sphoeroides annulatus) se distribuye a lo largo de la costa del Pacífico, incluyendo el Golfo de California. A lo largo de la costa de Sinaloa, de febrero a junio, se registran grandes agrupaciones de reproductores de botete que desovan en aguas someras cercanas a la costa y a las lagunas costeras, las cuales son aprovechadas por los pescadores de las flotas menor y mayor para dirigir su esfuerzo en esta área. Se captura principalmente en la franja costera de zonas arenosas y rocosas, y en menor cantidad dentro de las lagunas costeras y en mar abierto.",
      ],
      embarcaciones:
        "Se utilizan embarcaciones menores con motor fuera de borda o impulsadas con remo, usando anzuelo y robador del número 17 o 18. También forma parte de la fauna de acompañamiento del camarón de ambas flotas, la menor (artesanal) y la mayor (industrial). En Baja California Sur, en Bahía Magdalena, la maniobra se hace con red de enmalle conocida como «chinchorro botetero», de aproximadamente 320 metros de largo, equipada con una bolsa en un extremo, similar al copo de las redes de arrastre costeras utilizadas en la región para la pesca del camarón.",
      especiesObjetivo: [{ nombre: "Botete, botete diana, tambor y tamborillo", cientifico: "Sphoeroides annulatus" }],
      especiesAsociadas: [
        { nombre: "Botete narizón", cientifico: "Sphoeroides lobatus" },
        { nombre: "Botete peruano", cientifico: "Sphoeroides sechurae" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "Los estados de mayor contribución en capturas son Baja California Sur (43.5%) y Sinaloa (43.8%), seguidos de Sonora (7.5%) y Nayarit (3.8%), en el periodo 2004-2020.",
      ],
      // Tendencia de la captura de botete en BCS, Sonora, Sinaloa y Nayarit, 2004-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de botete por estado, 2004–2020 (CONAPESCA)",
          series: [
            {
              estado: "Sinaloa",
              color: "#8b5cf6",
              datos: [
                { año: 2004, captura: 410 },
                { año: 2005, captura: 300 },
                { año: 2006, captura: 130 },
                { año: 2007, captura: 210 },
                { año: 2008, captura: 190 },
                { año: 2009, captura: 310 },
                { año: 2010, captura: 230 },
                { año: 2011, captura: 150 },
                { año: 2012, captura: 150 },
                { año: 2013, captura: 680 },
                { año: 2014, captura: 370 },
                { año: 2015, captura: 510 },
                { año: 2016, captura: 650 },
                { año: 2017, captura: 715 },
                { año: 2018, captura: 470 },
                { año: 2019, captura: 910 },
                { año: 2020, captura: 530 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2004, captura: 170 },
                { año: 2005, captura: 250 },
                { año: 2006, captura: 180 },
                { año: 2007, captura: 330 },
                { año: 2008, captura: 200 },
                { año: 2009, captura: 440 },
                { año: 2010, captura: 330 },
                { año: 2011, captura: 330 },
                { año: 2012, captura: 390 },
                { año: 2013, captura: 340 },
                { año: 2014, captura: 380 },
                { año: 2015, captura: 300 },
                { año: 2016, captura: 310 },
                { año: 2017, captura: 465 },
                { año: 2018, captura: 465 },
                { año: 2019, captura: 585 },
                { año: 2020, captura: 700 },
              ],
            },
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2004, captura: 60 },
                { año: 2005, captura: 95 },
                { año: 2006, captura: 110 },
                { año: 2007, captura: 85 },
                { año: 2008, captura: 65 },
                { año: 2009, captura: 55 },
                { año: 2010, captura: 50 },
                { año: 2011, captura: 70 },
                { año: 2012, captura: 60 },
                { año: 2013, captura: 75 },
                { año: 2014, captura: 55 },
                { año: 2015, captura: 55 },
                { año: 2016, captura: 55 },
                { año: 2017, captura: 55 },
                { año: 2018, captura: 55 },
                { año: 2019, captura: 55 },
                { año: 2020, captura: 55 },
              ],
            },
            {
              estado: "Nayarit",
              color: "#0d9488",
              datos: [
                { año: 2004, captura: 55 },
                { año: 2005, captura: 60 },
                { año: 2006, captura: 45 },
                { año: 2007, captura: 65 },
                { año: 2008, captura: 50 },
                { año: 2009, captura: 45 },
                { año: 2010, captura: 55 },
                { año: 2011, captura: 60 },
                { año: 2012, captura: 30 },
                { año: 2013, captura: 50 },
                { año: 2014, captura: 40 },
                { año: 2015, captura: 50 },
                { año: 2016, captura: 50 },
                { año: 2017, captura: 90 },
                { año: 2018, captura: 50 },
                { año: 2019, captura: 100 },
                { año: 2020, captura: 95 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: ["En proceso de evaluación."],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de escama marina.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: false,
        disposicion: "En proceso de elaboración.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: false,
        disposicion: "En proceso de elaboración. Robador, anzuelo del 17 o 18, chinchorro botetero y trampas para peces.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion: "Embarcación menor con motor fuera de borda, con dos tripulantes a bordo.",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: false,
        disposicion:
          "No existen permisos o concesiones específicas para pesca comercial de botete (amparado por el permiso de pesca comercial de escama marina en la región).",
        sustento: "",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion: "Aguas marinas de jurisdicción federal del litoral del Pacífico.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Botete (Sphoeroides annulatus)",
          zona: "Litoral del Pacífico",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población Aprovechada al Máximo Sustentable.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Regulación del arte y métodos de pesca (NOM-064-SAG/PESC/SEMARNAT-2013)",
        "Suspensión de actividades de pesca por área y/o tiempo (zonas de refugio pesquero, polígonos de concesión pesquera)",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo pesquero actual.",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar el Plan de Manejo Pesquero del botete.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Proponer una talla y/o peso mínimo para el botete (Sphoeroides annulatus): más de 250 milímetros de longitud total.",
        avance: "Sin información",
      },
      {
        recomendacion: "Establecer una veda temporal.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Respetar lo dispuesto en la Norma Oficial Mexicana NOM-064-SAG/PESC/SEMARNAT-2013, sobre sistemas, métodos y técnicas de captura prohibidos en la pesca en aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Fomentar y promover la creación de herramientas de conservación y protección compatibles con el medio ambiente, como la instalación de arrecifes artificiales de materiales no contaminantes, protección del manglar, zonas de refugio pesquero y concesión pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
    ],
  },
  "pac-callo-de-hacha": {
    generalidades: {
      descripcion: [
        "En la pesquería de callo de hacha del Pacífico mexicano se aprovechan cuatro especies: hacha larga (Pinna rugosa), hacha botijona (Atrina tuberculosa), hacha china (Atrina maura) y hacha lisa (Atrina oldroydii). Estos bivalvos presentan un músculo abductor posterior de gran tamaño, conocido como «callo», que constituye la porción comercializable. Las hachas viven semienterradas en bahías y lagunas costeras, sobre fondos blandos de arena fina y limo-arcilla, a profundidades de entre 0.5 y 15 metros, donde se alimentan por filtración de partículas de fitoplancton. Son moluscos dominantes en la comunidad bentónica de los sitios que habitan, donde forman densos bancos de tamaño y persistencia variable.",
        "La captura se lleva a cabo en la zona noroeste del país, particularmente en Baja California, Baja California Sur y Sonora. En Baja California, en las zonas de San Felipe a Puertecitos, la Laguna Manuela y el Estero San José. En Baja California Sur, en Ensenada de La Paz, Laguna Ojo de Liebre, Laguna de San Ignacio, Bahía Magdalena y Bahía Almejas. En Sonora, en Puerto Peñasco, Desemboque de Caborca, Desemboque de los Seris, Bahía de Kino, Guaymas, Bahía de Lobos, Paredoncito, Yavaros y Agiabampo.",
      ],
      embarcaciones:
        "Para su extracción se utilizan embarcaciones menores de fibra de vidrio con motor fuera de borda y un equipo de buceo semiautónomo con compresor tipo «Hooka». En cada embarcación participan hasta tres pescadores (buzo, cabo de vida y motorista). La recolecta se lleva a cabo de manera manual con ayuda de un gancho y una bolsa de malla denominada «jaba» para la colecta de los organismos.",
      especiesObjetivo: [
        { nombre: "Hacha china, callo media luna", cientifico: "Atrina maura" },
        { nombre: "Hacha larga, callo redondo", cientifico: "Pinna rugosa" },
        { nombre: "Hacha botijona, callo riñón", cientifico: "Atrina tuberculosa" },
        { nombre: "Hacha lisa, hacha negra", cientifico: "Atrina oldroydii" },
      ],
    },
    indicadores: {
      datosDestacados: ["La mayor captura de callo de hacha se registra en Sonora, con el 59% del total."],
      // Tendencia de la captura de callo de hacha en BC, BCS y Sonora, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de callo de hacha por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2000, captura: 100 },
                { año: 2001, captura: 50 },
                { año: 2002, captura: 50 },
                { año: 2003, captura: 230 },
                { año: 2004, captura: 220 },
                { año: 2005, captura: 180 },
                { año: 2006, captura: 260 },
                { año: 2007, captura: 780 },
                { año: 2008, captura: 300 },
                { año: 2009, captura: 320 },
                { año: 2010, captura: 200 },
                { año: 2011, captura: 400 },
                { año: 2012, captura: 1440 },
                { año: 2013, captura: 660 },
                { año: 2014, captura: 330 },
                { año: 2015, captura: 330 },
                { año: 2016, captura: 490 },
                { año: 2017, captura: 660 },
                { año: 2018, captura: 700 },
                { año: 2019, captura: 700 },
                { año: 2020, captura: 240 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2005, captura: 0 },
                { año: 2007, captura: 0 },
                { año: 2010, captura: 0 },
                { año: 2015, captura: 90 },
                { año: 2016, captura: 802 },
                { año: 2017, captura: 410 },
                { año: 2018, captura: 742 },
                { año: 2019, captura: 530 },
                { año: 2020, captura: 90 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2000, captura: 60 },
                { año: 2001, captura: 40 },
                { año: 2002, captura: 50 },
                { año: 2003, captura: 110 },
                { año: 2004, captura: 220 },
                { año: 2005, captura: 150 },
                { año: 2006, captura: 80 },
                { año: 2007, captura: 190 },
                { año: 2008, captura: 260 },
                { año: 2009, captura: 313 },
                { año: 2010, captura: 230 },
                { año: 2011, captura: 90 },
                { año: 2012, captura: 90 },
                { año: 2013, captura: 190 },
                { año: 2014, captura: 90 },
                { año: 2015, captura: 90 },
                { año: 2016, captura: 110 },
                { año: 2017, captura: 90 },
                { año: 2018, captura: 90 },
                { año: 2019, captura: 70 },
                { año: 2020, captura: 60 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "En Atrina maura, la duración e intensidad de las fases del ciclo reproductivo dependen de la variabilidad estacional de la temperatura, mientras que el desove depende de no rebasar un umbral de temperatura (25 °C). El crecimiento gonádico en Pinna rugosa y Atrina tuberculosa está influenciado principalmente por la temperatura del agua, lo que sugiere que la producción de gametos es estimulada por los incrementos estacionales de esa variable ambiental.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso y/o concesión para pesca comercial de callo de hacha.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Atrina maura y Atrina tuberculosa: 140 mm de longitud de concha («ancho de boca»). Pinna rugosa y Atrina oldroydii: 150 mm de longitud de concha («ancho de boca»).",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Extracción manual con gancho de fabricación casera y bolsa de malla llamada «jaba», y buceo semiautónomo tipo «Hooka» a bordo de embarcación menor.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Callo de hacha (Pinna rugosa, Atrina maura, Atrina oldroydii y Atrina tuberculosa): veda temporal del 1 de julio al 30 de noviembre de cada año en la Bahía de Kino y zonas adyacentes, Sonora. Callo de hacha (Pinna rugosa y Atrina maura): veda temporal del 1 de abril al 31 de julio de cada año en aguas marinas de jurisdicción federal de Bahía Magdalena-Almejas, Baja California Sur.",
        sustento:
          "Acuerdo por el que se establece veda temporal para la captura de callo de hacha (Pinna rugosa, Atrina maura, Atrina oldroydii y Atrina tuberculosa) en la Bahía de Kino y zonas adyacentes, Sonora (DOF: 22/05/2018). Acuerdo por el que se establece veda temporal para el aprovechamiento de callo de hacha (Pinna rugosa y Atrina maura) en aguas marinas de jurisdicción federal de Bahía Magdalena-Almejas, Baja California Sur (DOF: 10/02/2021).",
      },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion:
          "Cuota de captura variable por especie y zona, con hasta un 25% del tamaño poblacional mayor a la talla mínima de captura.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Baja California: 131 embarcaciones. Baja California Sur: 210 embarcaciones. Sonora: 194 embarcaciones. Guerrero: 21 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal y sistemas lagunares de Baja California, Baja California Sur y Sonora, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Callo de hacha (Pinna rugosa, Atrina spp.)",
          zona: "Baja California, Baja California Sur y Sonora",
        },
      ],
      estrategia: "Cuota de captura y tasa de aprovechamiento.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Talla mínima de captura",
        "Rotación de bancos",
        "Veda reproductiva",
        "Zonas de refugio pesquero",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo pesquero en Baja California, Baja California Sur y Sonora.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará mediante solicitud a la CONAPESCA (de preferencia tres meses antes del inicio de la temporada), tras lo cual el INAPESCA definirá el programa de trabajo para la evaluación y emitirá el dictamen técnico correspondiente.",
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
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a lo previsto en la LGPAS, con énfasis en el litoral del Golfo de California adyacente a Baja California.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, se recomienda limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015, apartado 4.11, inciso e.",
        avance: "Sin información",
      },
    ],
  },
  "pac-verdillo": {
    generalidades: {
      descripcion: [
        "El verdillo (Paralabrax nebulifer), también conocido como cabrilla verde, es un pez marino carnívoro de la familia Serranidae. Presenta un cuerpo con manchas y barras de tonalidad moderadamente oscura y una aleta dorsal con la tercera espina mayor que la segunda. Se distribuye desde Santa Cruz, California, Estados Unidos, hasta Acapulco, Guerrero, incluyendo la península de Baja California y el sur del Golfo de California (San Evaristo, Baja California Sur). En época no reproductiva, los adultos y subadultos habitan en arrecifes, lechos de algas marinas, bancos de arena o entre rocas, a profundidades entre los 3 y 185 metros, aunque comúnmente se encuentran alrededor de los 30 metros. En época reproductiva, los organismos migran a fondos arenosos someros de aproximadamente 1.5 metros de profundidad.",
        "La mayoría de los individuos se trasladan anualmente al mismo sitio para desovar, formando agregaciones, y posteriormente regresan al área en la que se encontraban antes de la migración reproductiva. Se considera una especie de crecimiento lento y longevidad media a alta (alrededor de 20 años). El verdillo se captura en aguas marinas de jurisdicción federal de la costa occidental de la península de Baja California, desde Ensenada, Baja California, hasta Bahía Magdalena, Baja California Sur.",
      ],
      embarcaciones:
        "Para su captura se utiliza una embarcación menor de fibra de vidrio, de 6.5 a 9 metros de eslora, con motor fuera de borda y una tripulación de 2 a 3 pescadores. El 95% de la captura se obtiene con trampa; el 5% restante, con línea de mano.",
      especiesObjetivo: [{ nombre: "Verdillo, cabrilla verde", cientifico: "Paralabrax nebulifer" }],
      especiesAsociadas: [
        { nombre: "Curricata, cabrilla arenera", cientifico: "Paralabrax maculatofasciatus" },
        { nombre: "Cabrilla sargacera, calico", cientifico: "Paralabrax clathratus" },
        { nombre: "Cabrilla extranjera", cientifico: "Paralabrax auroguttatus" },
        { nombre: "Mero manchado, baqueta ploma", cientifico: "Hyporthodus niphobles" },
        { nombre: "Vieja de California", cientifico: "Semicossyphus pulcher" },
        { nombre: "Pierna", cientifico: "Caulolatilus princeps" },
      ],
    },
    indicadores: {
      datosDestacados: ["La captura de verdillo es 97% en Baja California Sur y 3% en Baja California."],
      // Tendencia de la captura de verdillo en BCS y BC, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de verdillo por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2000, captura: 3700 },
                { año: 2001, captura: 2700 },
                { año: 2002, captura: 3800 },
                { año: 2003, captura: 4100 },
                { año: 2004, captura: 4400 },
                { año: 2005, captura: 3900 },
                { año: 2006, captura: 3000 },
                { año: 2007, captura: 4400 },
                { año: 2008, captura: 4400 },
                { año: 2009, captura: 4700 },
                { año: 2010, captura: 4300 },
                { año: 2011, captura: 5100 },
                { año: 2012, captura: 6000 },
                { año: 2013, captura: 4800 },
                { año: 2014, captura: 3900 },
                { año: 2015, captura: 2900 },
                { año: 2016, captura: 2800 },
                { año: 2017, captura: 3200 },
                { año: 2018, captura: 4200 },
                { año: 2019, captura: 4300 },
                { año: 2020, captura: 3900 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2000, captura: 150 },
                { año: 2001, captura: 120 },
                { año: 2002, captura: 150 },
                { año: 2003, captura: 250 },
                { año: 2004, captura: 150 },
                { año: 2005, captura: 150 },
                { año: 2006, captura: 180 },
                { año: 2007, captura: 120 },
                { año: 2008, captura: 250 },
                { año: 2009, captura: 300 },
                { año: 2010, captura: 250 },
                { año: 2011, captura: 220 },
                { año: 2012, captura: 120 },
                { año: 2013, captura: 130 },
                { año: 2014, captura: 100 },
                { año: 2015, captura: 80 },
                { año: 2016, captura: 80 },
                { año: 2017, captura: 100 },
                { año: 2018, captura: 150 },
                { año: 2019, captura: 220 },
                { año: 2020, captura: 280 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Se ha observado que el periodo reproductivo del verdillo está influenciado por eventos ambientales anómalos como el fenómeno oceanográfico «El Niño». En este sentido, la variabilidad de la temperatura superficial del mar y demás factores fisicoquímicos influyen directamente en la fecundidad, el tiempo del desove y la condición de los huevos desovados de los peces —incluido el verdillo— y, por consiguiente, en la abundancia de larvas y su ciclo de vida.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "2. Plan de Manejo Pesquero",
        aplica: true,
        disposicion:
          "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de verdillo (Paralabrax nebulifer Girard 1854) en la península de Baja California.",
        sustento: "DOF: 01/03/2021.",
      },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso de pesca comercial de escama marina.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Trampa para la captura de verdillo con luz de malla de 5×5 centímetros (2×2 pulgadas). Dependiendo de la localidad, las dimensiones y modelos son variables, con un volumen máximo de 1 m³; puede contener divisiones o mamparos en su interior. Se utilizan de cinco a ocho trampas por embarcación, de tres a cinco lances por trampa, con 20 a 45 minutos de reposo, en profundidades de 20 a 100 metros.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion: "Estudio en proceso.",
        sustento: "",
      },
      { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con cinco a ocho trampas y tripulada por tres pescadores (motorista y uno o dos pescadores).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: false,
        disposicion:
          "No existen permisos o concesiones específicas para pesca comercial de verdillo (amparado por el permiso de pesca comercial de escama marina en la región).",
        sustento: "",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal de Baja California y Baja California Sur, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permisos para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas, Programas de Manejo y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Verdillo (Paralabrax nebulifer)",
          zona: "Costa occidental de la península de Baja California",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población al Aprovechamiento Máximo Sustentable.",
      tacticas: [
        "Control del esfuerzo pesquero",
        "Veda temporal",
        "Regulación del arte y método de pesca",
        "Zona de refugios pesqueros",
      ],
    },
    recomendaciones: [
      {
        recomendacion:
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo de pesca actual.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Instrumentar programas de ordenamiento y manejo para el recurso de verdillo (Paralabrax nebulifer) en la península de Baja California, conforme a lo previsto en la LGPAS.",
        avance: "Sin información",
      },
      {
        recomendacion: "Expedir permisos para pesca comercial específicos para verdillo (Paralabrax nebulifer).",
        avance: "Sin información",
      },
      {
        recomendacion: "Establecer una veda temporal para proteger el periodo reproductivo en todas las zonas de pesca.",
        avance: "Sin información",
      },
      {
        recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
    ],
  },
  "pac-almeja-chocolata": {
    generalidades: {
      descripcion: [
        "La almeja chocolata café (Megapitaria squalida) se distribuye desde Laguna Ojo de Liebre, Baja California Sur (incluyendo el Golfo de California), hasta las costas de Macora, Perú. Presenta una concha de color café, relativamente gruesa y alargada anteroposteriormente. Habita sobre fondos arenosos y lodosos, enterrada en el sedimento, a profundidades de entre 1 y 15 metros cerca de la costa y hasta los 120 metros. La almeja chocolata roja (Megapitaria aurantiaca) se distribuye desde la Laguna de Guerrero Negro (incluyendo el Golfo de California) hasta Isla de Lobos, Perú. Habita fondos blandos de grava y arena, desde la zona intermareal hasta 30 metros de profundidad; presenta una concha gruesa, triangular y alargada anteroposteriormente, con un perióstraco liso de color café-anaranjado.",
        "La captura se lleva a cabo en la zona noroeste del país, principalmente en Baja California, Baja California Sur, Sonora y Sinaloa. En la costa occidental de Baja California se captura en la Laguna Manuela y el estero San José, y en San Luis Gonzaga en la costa oriental. En Baja California Sur destacan seis regiones: en la costa occidental, la Laguna Ojo de Liebre, Laguna San Ignacio y Bahía Magdalena-Almejas; en la costa oriental, Bahía de La Paz, Bahía de Loreto y Santa Rosalía. En Sonora se captura regularmente en Puerto Libertad y en la zona costera de Yavaros, mientras que en Sinaloa en el sistema lagunar Altata-Ensenada del Pabellón.",
      ],
      embarcaciones:
        "En la operación de pesca se utilizan embarcaciones menores de fibra de vidrio con motor fuera de borda y un equipo de buceo semiautónomo con compresor tipo «Hooka». En cada embarcación participan hasta tres pescadores (buzo, cabo de vida y motorista). La extracción se realiza de manera manual empleando un gancho y una bolsa de malla denominada «jaba» para la colecta de los organismos.",
      especiesObjetivo: [
        { nombre: "Almeja chocolata café", cientifico: "Megapitaria squalida" },
        { nombre: "Almeja chocolata roja, almeja reina", cientifico: "Megapitaria aurantiaca" },
      ],
    },
    indicadores: {
      datosDestacados: ["Las mayores capturas se registran en Baja California Sur, que representa el 81% del total."],
      // Tendencia de la captura de almeja chocolata en BCS, BC, Sonora y Sinaloa, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de almeja chocolata por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2000, captura: 900 },
                { año: 2001, captura: 780 },
                { año: 2002, captura: 1050 },
                { año: 2003, captura: 1100 },
                { año: 2004, captura: 950 },
                { año: 2005, captura: 780 },
                { año: 2006, captura: 1020 },
                { año: 2007, captura: 1030 },
                { año: 2008, captura: 950 },
                { año: 2009, captura: 1370 },
                { año: 2010, captura: 1000 },
                { año: 2011, captura: 1100 },
                { año: 2012, captura: 1000 },
                { año: 2013, captura: 1270 },
                { año: 2014, captura: 1160 },
                { año: 2015, captura: 1270 },
                { año: 2016, captura: 1070 },
                { año: 2017, captura: 790 },
                { año: 2018, captura: 680 },
                { año: 2019, captura: 830 },
                { año: 2020, captura: 620 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2000, captura: 230 },
                { año: 2001, captura: 493 },
                { año: 2002, captura: 150 },
                { año: 2003, captura: 230 },
                { año: 2004, captura: 180 },
                { año: 2005, captura: 230 },
                { año: 2006, captura: 150 },
                { año: 2007, captura: 170 },
                { año: 2008, captura: 170 },
                { año: 2009, captura: 90 },
                { año: 2010, captura: 90 },
                { año: 2011, captura: 120 },
                { año: 2012, captura: 70 },
                { año: 2013, captura: 150 },
                { año: 2014, captura: 90 },
                { año: 2015, captura: 70 },
                { año: 2016, captura: 70 },
                { año: 2017, captura: 90 },
                { año: 2018, captura: 110 },
                { año: 2019, captura: 190 },
                { año: 2020, captura: 90 },
              ],
            },
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2000, captura: 10 },
                { año: 2001, captura: 10 },
                { año: 2002, captura: 10 },
                { año: 2003, captura: 50 },
                { año: 2004, captura: 30 },
                { año: 2005, captura: 10 },
                { año: 2006, captura: 50 },
                { año: 2007, captura: 30 },
                { año: 2008, captura: 30 },
                { año: 2009, captura: 130 },
                { año: 2010, captura: 90 },
                { año: 2011, captura: 50 },
                { año: 2012, captura: 60 },
                { año: 2013, captura: 120 },
                { año: 2014, captura: 70 },
                { año: 2015, captura: 60 },
                { año: 2016, captura: 50 },
                { año: 2017, captura: 50 },
                { año: 2018, captura: 60 },
                { año: 2019, captura: 100 },
                { año: 2020, captura: 140 },
              ],
            },
            {
              estado: "Sinaloa",
              color: "#8b5cf6",
              datos: [
                { año: 2000, captura: 200 },
                { año: 2001, captura: 10 },
                { año: 2002, captura: 73 },
                { año: 2003, captura: 150 },
                { año: 2004, captura: 180 },
                { año: 2005, captura: 230 },
                { año: 2006, captura: 150 },
                { año: 2007, captura: 217 },
                { año: 2008, captura: 120 },
                { año: 2009, captura: 100 },
                { año: 2010, captura: 80 },
                { año: 2011, captura: 90 },
                { año: 2012, captura: 60 },
                { año: 2013, captura: 60 },
                { año: 2014, captura: 50 },
                { año: 2015, captura: 50 },
                { año: 2016, captura: 60 },
                { año: 2017, captura: 50 },
                { año: 2018, captura: 60 },
                { año: 2019, captura: 100 },
                { año: 2020, captura: 60 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "La temperatura y la disponibilidad del alimento son los principales factores que controlan diversos procesos biológicos en las especies de almeja chocolata. La actividad reproductiva de la almeja chocolata café se ve afectada por la disminución de la temperatura del mar provocada por el fenómeno de «La Niña», que causa un decremento en la intensidad del desove. La alta disponibilidad de alimento provoca que la almeja chocolata café presente un ciclo reproductivo continuo a lo largo del año; en contraste, se ha reportado que puede presentar un periodo de reposo bien definido asociado a la baja disponibilidad de alimento. En la almeja chocolata roja se ha reportado que el desove se dispara cuando la temperatura superficial del mar incrementa hasta 28 °C.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de almeja chocolata.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion:
          "Golfo de California: 64 mm de longitud de concha para Megapitaria squalida en Baja California Sur y 80 mm en Baja California; 97 mm para Megapitaria aurantiaca. Costa del Pacífico: 80 mm de longitud de concha para Megapitaria squalida en Baja California y Baja California Sur. Sonora y Sinaloa: en función de estudios del INAPESCA.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Extracción manual con gancho y bolsa de malla llamada «jaba», y buceo semiautónomo tipo «Hooka» a bordo de embarcación menor.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "6. Veda",
        aplica: true,
        disposicion:
          "Megapitaria squalida: veda temporal del 1 de mayo de 2020 al 1 de mayo de 2022 en el sistema lagunar Altata-Ensenada del Pabellón, en los municipios de Navolato y Culiacán, Sinaloa. Megapitaria squalida: veda temporal del 1 de septiembre al 31 de diciembre de cada año en aguas marinas de jurisdicción federal de Bahía Magdalena-Almejas, en Baja California Sur.",
        sustento:
          "Acuerdo por el que se establece veda temporal para la captura de almeja chocolata (Megapitaria squalida) en el sistema lagunar Altata-Ensenada del Pabellón, municipios de Navolato y Culiacán, Sinaloa (DOF: 30/04/2020). Acuerdo por el que se establece veda temporal para el aprovechamiento de almeja chocolata (Megapitaria squalida) en Bahía Magdalena-Almejas, Baja California Sur (DOF: 16/04/2021).",
      },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion:
          "Cuota de captura variable por especie y zona, con base en hasta un 15% del tamaño poblacional para Megapitaria aurantiaca y un 20% para Megapitaria squalida mayor a la talla mínima de captura.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Baja California: 26 embarcaciones. Baja California Sur: 191 embarcaciones. Sonora: 60 embarcaciones. Sinaloa: 13 embarcaciones.",
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
          especie: "Almeja chocolata",
          zona: "Estero San José y Laguna Manuela (Baja California)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja chocolata",
          zona: "Bahía de La Paz, Bahía Almejas, Bahía Magdalena, Laguna San Ignacio, Laguna Ojo de Liebre y litoral costero de Loreto (Baja California Sur)",
        },
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja chocolata",
          zona: "Sistema lagunar Altata-Ensenada del Pabellón (Sinaloa)",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Almeja chocolata",
          zona: "Resto de Baja California, Baja California Sur, Sonora y Sinaloa",
        },
      ],
      estrategia: "Cuota de captura y tasa de aprovechamiento.",
      tacticas: [
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
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo pesquero en los sistemas lagunares y zonas de pesca Aprovechadas al Máximo Sustentable en Baja California y Baja California Sur, ni en el sistema lagunar Altata-Ensenada del Pabellón, Sinaloa.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En zonas con estatus Indeterminado, el esfuerzo pesquero se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará mediante solicitud a la CONAPESCA (de preferencia tres meses antes del inicio de la temporada), tras lo cual el INAPESCA definirá el programa de trabajo para la evaluación y emitirá el dictamen técnico correspondiente.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En el caso de solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
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
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, se recomienda limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015, apartado 4.11, inciso e.",
        avance: "Sin información",
      },
    ],
  },
  "pac-almeja-concha-espina": {
    generalidades: {
      descripcion: [
        "La almeja concha espina se caracteriza por presentar una concha robusta con coloraciones que van desde tonos rojizos, blancos y naranjas, con una serie de prolongaciones (espinas o dientes) en ambas valvas. Estos organismos se agregan en bancos con sustratos arenosos y rocosos, a profundidades de entre 11 y 16 metros, y se han observado en una densidad de 2 individuos/m². Los organismos adultos alcanzan tallas por arriba de los 145 milímetros de longitud de concha, son gonocóricos y presentan un desarrollo planctotrófico.",
      ],
      embarcaciones:
        "La captura de almeja concha espina se realiza con embarcaciones menores de fibra de vidrio con motor fuera de borda y un equipo de buceo semiautónomo con compresor tipo «Hooka». En cada embarcación participan hasta tres pescadores (buzo, cabo de vida y motorista). La extracción se lleva a cabo de manera manual con el uso de un gancho y una bolsa de malla denominada «jaba» para la colecta de los organismos.",
      especiesObjetivo: [
        { nombre: "Almeja concha espina, concha burra, almeja burra", cientifico: "Spondylus crassisquama" },
      ],
    },
    indicadores: {
      datosDestacados: [
        "Se captura únicamente en Baja California Sur, en el sistema lagunar Ojo de Liebre y en las islas de Bahía de Loreto.",
        "El aprovechamiento de la almeja concha espina inició en 2013 como una pesquería alterna en Laguna Ojo de Liebre.",
      ],
      // Tendencia de la captura de almeja concha espina (peso entero) en BCS, 2013-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de almeja concha espina en Baja California Sur, 2013–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2013, captura: 105 },
                { año: 2014, captura: 37 },
                { año: 2015, captura: 127 },
                { año: 2016, captura: 118 },
                { año: 2017, captura: 175 },
                { año: 2018, captura: 70 },
                { año: 2019, captura: 87 },
                { año: 2020, captura: 0 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "Se ha reportado que la reproducción de esta especie en la Laguna Ojo de Liebre, Baja California Sur, tiene relación con la temperatura del mar: el principal pico reproductivo se observa en agosto, cuando se presentan las temperaturas más altas. En otras especies de la familia Spondylidae se ha observado que la temperatura también juega un rol importante en la reproducción, pues los desoves se llevan a cabo cuando la temperatura del agua ronda los 29 °C. También se ha reportado que el desove se relaciona con la máxima disponibilidad de alimento, siendo éste el probable detonador para iniciar el desarrollo de la gónada. La pérdida del hábitat es uno de los mayores retos que enfrenta este grupo de bivalvos, lo que en algunos casos ha causado una disminución considerable de las poblaciones.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de almeja concha espina.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion: "110 milímetros de longitud de concha.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Buceo semiautónomo tipo «Hooka» con extracción manual empleando una bolsa de malla llamada «jaba» y un gancho.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion: "Cuota de captura bienal por zona, con tasa de aprovechamiento variable.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion: "Baja California Sur: 63 embarcaciones.",
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
          categoria: "Con potencial de desarrollo",
          color: "green",
          especie: "Almeja concha espina (Spondylus crassisquama)",
          zona: "Laguna Ojo de Liebre e islas de Bahía de Loreto (Baja California Sur)",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Almeja concha espina (Spondylus crassisquama)",
          zona: "Resto de Baja California Sur y otras entidades federativas",
        },
      ],
      estrategia: "Tasa de aprovechamiento para mantener la población Aprovechada al Máximo Sustentable.",
      tacticas: ["Cuota de captura", "Talla mínima de captura", "Rotación de bancos", "Veda reproductiva"],
    },
    recomendaciones: [
      {
        recomendacion:
          "La posibilidad de incremento en el número de embarcaciones en las zonas de pesca de Laguna Ojo de Liebre y zonas insulares de Bahía de Loreto, Baja California Sur, estará en función de la disponibilidad del recurso en esas zonas, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En el caso de solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar; el dictamen técnico con la cuota total se emitirá tras la evaluación poblacional.",
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
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, se recomienda limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015, apartado 4.11, inciso e.",
        avance: "Sin información",
      },
    ],
  },
  "pac-almeja-blanca-o-mantequilla": {
    generalidades: {
      descripcion: [
        "La almeja blanca o mantequilla (Dosinia ponderosa) se distribuye desde Laguna Ojo de Liebre, Baja California Sur, México, hasta las costas de Perú. Presenta valvas aplanadas y comprimidas en forma circular, de color blanco por dentro y por fuera, con franjas concéntricas de tonos diferentes. Es una especie suspensívora facultativa que habita preferencialmente en fondos de arena fina, areno-limoso y limo grueso. En el Pacífico mexicano, la estructura de tallas presenta intervalos de longitud de concha desde 1.8 hasta 13 centímetros. Son organismos primordialmente gonocóricos y se han descrito cinco fases de desarrollo gonádico: indiferenciado/reposo, desarrollo, madurez, desove y posdesove. El periodo de desove varía por zona, pero se ha reportado una reproducción continua con desoves durante todo el año, con mayores intensidades de abril a junio y de septiembre a noviembre.",
        "En México, las zonas de pesca incluyen aguas marinas de jurisdicción federal y sistemas de lagunas del Golfo de California, incluida la costa occidental de la península de Baja California. Se captura principalmente en las costas de Baja California (al sur de San Felipe, Puertecitos y Bahía San Luis Gonzaga), Baja California Sur (Bahía de La Paz y Bahía Magdalena), Sonora (Puerto Peñasco, Desemboque de Caborca, Puerto Libertad, Guaymas, Ciudad Obregón, Yavaros, Huatabampo y Agiabampo) y Sinaloa (Bahía de Altata-Ensenada del Pabellón).",
      ],
      embarcaciones:
        "La unidad de pesca para la captura de almeja blanca se compone de embarcaciones menores de fibra de vidrio con motor fuera de borda y un equipo de buceo semiautónomo con compresor tipo «Hooka». En cada embarcación participan hasta tres pescadores (buzo, cabo de vida y motorista). La extracción se lleva a cabo de manera manual, utilizando ocasionalmente un pequeño gancho para remover la arena y una bolsa de malla denominada «jaba» para la colecta de los organismos.",
      especiesObjetivo: [
        { nombre: "Almeja blanca, mantequilla, plato o talibana", cientifico: "Dosinia ponderosa" },
      ],
    },
    indicadores: {
      datosDestacados: ["En Sonora se extrae el 80% del volumen total."],
      // Tendencia de la captura de almeja blanca en BC, BCS, Sonora y Sinaloa, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de almeja blanca por estado, 2000–2020 (CONAPESCA)",
          series: [
            {
              estado: "Sonora",
              color: "#f59e0b",
              datos: [
                { año: 2000, captura: 250 },
                { año: 2001, captura: 70 },
                { año: 2002, captura: 20 },
                { año: 2003, captura: 20 },
                { año: 2004, captura: 140 },
                { año: 2005, captura: 50 },
                { año: 2006, captura: 20 },
                { año: 2007, captura: 70 },
                { año: 2008, captura: 350 },
                { año: 2009, captura: 480 },
                { año: 2010, captura: 130 },
                { año: 2011, captura: 120 },
                { año: 2012, captura: 400 },
                { año: 2013, captura: 545 },
                { año: 2014, captura: 270 },
                { año: 2015, captura: 110 },
                { año: 2016, captura: 549 },
                { año: 2017, captura: 350 },
                { año: 2018, captura: 180 },
                { año: 2019, captura: 90 },
                { año: 2020, captura: 230 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 2017, captura: 10 },
                { año: 2018, captura: 50 },
                { año: 2019, captura: 81 },
                { año: 2020, captura: 40 },
              ],
            },
            {
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2019, captura: 13 },
                { año: 2020, captura: 10 },
              ],
            },
            {
              estado: "Sinaloa",
              color: "#8b5cf6",
              datos: [
                { año: 2019, captura: 13 },
                { año: 2020, captura: 10 },
              ],
            },
          ],
        },
      ],
    },
    ambiente: [
      "La temperatura y la disponibilidad del alimento son los principales factores que controlan diversos procesos biológicos en la almeja blanca. Particularmente, se ha reportado un aumento en la intensidad del desove en condiciones cálidas de temperatura del mar y una ligera disminución en los meses con las temperaturas más bajas. Otros factores, como la calidad ambiental en términos de contaminación, afectan de manera negativa la condición fisiológica de la almeja blanca.",
    ],
    normatividad: [
      { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
      { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "3. Tipo de acceso",
        aplica: true,
        disposicion: "Permiso para pesca comercial de almeja blanca o mantequilla.",
        sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "4. Talla mínima",
        aplica: true,
        disposicion: "80 milímetros de longitud de concha.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "5. Arte de pesca y método de captura",
        aplica: true,
        disposicion:
          "Extracción manual con gancho, bolsa de malla llamada «jaba» y buceo semiautónomo tipo «Hooka», a bordo de embarcación menor.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
      {
        instrumento: "7. Cuota",
        aplica: true,
        disposicion:
          "Cuota de captura bianual por zona, con hasta un 30% del tamaño poblacional mayor a la talla mínima de captura.",
        sustento: "Dictamen técnico del INAPESCA.",
      },
      {
        instrumento: "8. Unidad de pesca",
        aplica: true,
        disposicion:
          "Embarcación menor con motor fuera de borda y eslora máxima total de 10.5 metros, equipada con compresor de aire y equipo de buceo semiautónomo tipo «Hooka», y hasta tres pescadores (buzo, cabo de vida y motorista).",
        sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
      },
      {
        instrumento: "9. Esfuerzo nominal autorizado",
        aplica: true,
        disposicion:
          "Baja California: 15 embarcaciones. Baja California Sur: 25 embarcaciones. Sonora: 67 embarcaciones. Sinaloa: 2 embarcaciones.",
        sustento:
          "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
      },
      {
        instrumento: "10. Zona de pesca",
        aplica: true,
        disposicion:
          "Aguas marinas de jurisdicción federal y sistemas lagunares de Baja California, Baja California Sur y Sonora, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
        sustento:
          "Permiso para pesca comercial. Decretos de declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
      },
    ],
    status: {
      cards: [
        {
          categoria: "Aprovechado al máximo sustentable",
          color: "yellow",
          especie: "Almeja blanca (Dosinia ponderosa)",
          zona: "Sonora",
        },
        {
          categoria: "Indeterminado",
          color: "gray",
          especie: "Almeja blanca (Dosinia ponderosa)",
          zona: "Baja California y Baja California Sur",
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
          "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo pesquero en Sonora.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En zonas con estatus Indeterminado, el esfuerzo pesquero se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la autoridad pesquera.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "En el caso de solicitudes de permisos para pesca comercial en nuevas zonas con estatus Indeterminado, el INAPESCA —con apoyo de los solicitantes— realizará una prospección para ubicar los bancos y estimar una cuota preliminar. El dictamen técnico con la recomendación de la cuota total se emitirá una vez realizada la evaluación poblacional, usando la información disponible del programa de monitoreo y seguimiento de las pesquerías.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "La asignación de cuotas para los usuarios que ya cuentan con permiso de pesca comercial se realizará mediante solicitud a la CONAPESCA (de preferencia tres meses antes del inicio de la temporada), tras lo cual el INAPESCA definirá el programa de trabajo para la evaluación y emitirá el dictamen técnico correspondiente.",
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
          "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
        avance: "Sin información",
      },
      {
        recomendacion:
          "Con el fin de garantizar la seguridad de los buzos, se recomienda limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015, apartado 4.11, inciso e.",
        avance: "Sin información",
      },
    ],
  },
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
      // Tendencia de la captura de jaiba por estado, 1986-2020. Fuente: CONAPESCA.
      // Se separa en dos gráficas (estados mayores y menores) siguiendo las figuras del documento.
      capturaPorEstado: [
        {
          titulo: "Captura de jaiba en Baja California, Baja California Sur, Sonora y Sinaloa, 1986–2020 (CONAPESCA)",
          series: [
            {
              estado: "Baja California",
              color: "#e11d48",
              datos: [
                { año: 1986, captura: 800 },
                { año: 1990, captura: 2500 },
                { año: 1995, captura: 7000 },
                { año: 2000, captura: 3000 },
                { año: 2005, captura: 3500 },
                { año: 2008, captura: 10000 },
                { año: 2010, captura: 6000 },
                { año: 2015, captura: 9000 },
                { año: 2018, captura: 12500 },
                { año: 2020, captura: 12800 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [
                { año: 1986, captura: 500 },
                { año: 1990, captura: 1500 },
                { año: 1995, captura: 2500 },
                { año: 2000, captura: 6000 },
                { año: 2005, captura: 3500 },
                { año: 2008, captura: 4500 },
                { año: 2010, captura: 4000 },
                { año: 2015, captura: 7000 },
                { año: 2018, captura: 7000 },
                { año: 2020, captura: 8000 },
              ],
            },
            {
              estado: "Sonora",
              color: "#0d9488",
              datos: [
                { año: 1986, captura: 200 },
                { año: 1990, captura: 400 },
                { año: 1995, captura: 300 },
                { año: 2000, captura: 500 },
                { año: 2005, captura: 400 },
                { año: 2008, captura: 600 },
                { año: 2010, captura: 500 },
                { año: 2015, captura: 600 },
                { año: 2018, captura: 800 },
                { año: 2020, captura: 600 },
              ],
            },
            {
              estado: "Sinaloa",
              color: "#f59e0b",
              datos: [
                { año: 1986, captura: 100 },
                { año: 1990, captura: 200 },
                { año: 1995, captura: 400 },
                { año: 2000, captura: 600 },
                { año: 2005, captura: 700 },
                { año: 2008, captura: 900 },
                { año: 2010, captura: 700 },
                { año: 2015, captura: 1000 },
                { año: 2018, captura: 700 },
                { año: 2020, captura: 900 },
              ],
            },
          ],
        },
        {
          titulo: "Captura de jaiba en Oaxaca, Jalisco, Nayarit, Colima, Michoacán, Guerrero y Chiapas, 1986–2020 (CONAPESCA)",
          series: [
            {
              estado: "Oaxaca",
              color: "#e11d48",
              datos: [
                { año: 1986, captura: 50 },
                { año: 1990, captura: 150 },
                { año: 1995, captura: 200 },
                { año: 2000, captura: 100 },
                { año: 2005, captura: 450 },
                { año: 2008, captura: 600 },
                { año: 2010, captura: 100 },
                { año: 2015, captura: 180 },
                { año: 2018, captura: 650 },
                { año: 2020, captura: 250 },
              ],
            },
            {
              estado: "Jalisco",
              color: "#0891b2",
              datos: [
                { año: 1986, captura: 20 },
                { año: 1990, captura: 30 },
                { año: 1995, captura: 220 },
                { año: 2000, captura: 300 },
                { año: 2005, captura: 50 },
                { año: 2008, captura: 40 },
                { año: 2010, captura: 30 },
                { año: 2015, captura: 80 },
                { año: 2018, captura: 250 },
                { año: 2020, captura: 100 },
              ],
            },
            {
              estado: "Nayarit",
              color: "#0d9488",
              datos: [
                { año: 1986, captura: 80 },
                { año: 1990, captura: 250 },
                { año: 1995, captura: 50 },
                { año: 2000, captura: 40 },
                { año: 2005, captura: 20 },
                { año: 2008, captura: 20 },
                { año: 2010, captura: 20 },
                { año: 2015, captura: 20 },
                { año: 2018, captura: 30 },
                { año: 2020, captura: 20 },
              ],
            },
            {
              estado: "Colima",
              color: "#8b5cf6",
              datos: [
                { año: 1986, captura: 40 },
                { año: 1990, captura: 40 },
                { año: 1995, captura: 30 },
                { año: 2000, captura: 20 },
                { año: 2005, captura: 20 },
                { año: 2008, captura: 20 },
                { año: 2010, captura: 15 },
                { año: 2015, captura: 15 },
                { año: 2018, captura: 20 },
                { año: 2020, captura: 15 },
              ],
            },
            {
              estado: "Michoacán",
              color: "#f59e0b",
              datos: [
                { año: 1986, captura: 10 },
                { año: 1990, captura: 20 },
                { año: 1995, captura: 20 },
                { año: 2000, captura: 15 },
                { año: 2005, captura: 15 },
                { año: 2008, captura: 20 },
                { año: 2010, captura: 20 },
                { año: 2015, captura: 20 },
                { año: 2018, captura: 30 },
                { año: 2020, captura: 20 },
              ],
            },
            {
              estado: "Guerrero",
              color: "#64748b",
              datos: [
                { año: 1986, captura: 20 },
                { año: 1990, captura: 30 },
                { año: 1995, captura: 30 },
                { año: 2000, captura: 20 },
                { año: 2005, captura: 30 },
                { año: 2008, captura: 30 },
                { año: 2010, captura: 20 },
                { año: 2015, captura: 30 },
                { año: 2018, captura: 40 },
                { año: 2020, captura: 30 },
              ],
            },
            {
              estado: "Chiapas",
              color: "#db2777",
              datos: [
                { año: 1986, captura: 15 },
                { año: 1990, captura: 15 },
                { año: 1995, captura: 20 },
                { año: 2000, captura: 20 },
                { año: 2005, captura: 20 },
                { año: 2008, captura: 20 },
                { año: 2010, captura: 20 },
                { año: 2015, captura: 25 },
                { año: 2018, captura: 30 },
                { año: 2020, captura: 20 },
              ],
            },
          ],
        },
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
    datosDestacados: [
      "Las almejas están en 12º lugar a nivel nacional por su importancia por volumen y en 11º por su valor comercial (Anuario Estadístico de Acuacultura y Pesca 2018).",
      "El total producido a nivel nacional es de 30,211 toneladas.",
      "Veracruz es el 4º productor con 2,096 toneladas, que representan el 6.94%.",
      "Tamaulipas es el 8º productor con 7 toneladas, con el 0.02%.",
    ],
    // Tendencia de la captura de almeja a nivel nacional, Campeche, Tabasco y Tamaulipas
    // (1987-2019). Fuente: Anuarios Estadísticos de Pesca. Las celdas vacías del documento
    // se omiten (sin dato para ese año).
    capturaPorEstado: [
      {
        titulo: "Captura de almeja: nacional, Campeche, Tabasco y Tamaulipas, 1987–2019 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Nacional",
            color: "#e11d48",
            datos: [
              { año: 1987, captura: 350 },
              { año: 1990, captura: 2300 },
              { año: 1993, captura: 800 },
              { año: 1997, captura: 700 },
              { año: 2000, captura: 1400 },
              { año: 2002, captura: 1000 },
              { año: 2007, captura: 3300 },
              { año: 2009, captura: 2400 },
              { año: 2011, captura: 3300 },
              { año: 2013, captura: 2500 },
              { año: 2015, captura: 3300 },
              { año: 2019, captura: 700 },
            ],
          },
          {
            estado: "Campeche",
            color: "#0891b2",
            datos: [
              { año: 1987, captura: 800 },
              { año: 1990, captura: 650 },
              { año: 1995, captura: 50 },
              { año: 2000, captura: 30 },
              { año: 2002, captura: 30 },
              { año: 2006, captura: 30 },
              { año: 2010, captura: 50 },
              { año: 2015, captura: 10 },
              { año: 2019, captura: 10 },
            ],
          },
          {
            estado: "Tabasco",
            color: "#0d9488",
            datos: [
              { año: 1987, captura: 0 },
              { año: 1990, captura: 0 },
              { año: 1995, captura: 0 },
              { año: 2000, captura: 20 },
              { año: 2002, captura: 380 },
              { año: 2006, captura: 380 },
              { año: 2010, captura: 100 },
              { año: 2015, captura: 10 },
              { año: 2019, captura: 10 },
            ],
          },
          {
            estado: "Tamaulipas",
            color: "#f59e0b",
            datos: [
              { año: 1987, captura: 0 },
              { año: 1990, captura: 50 },
              { año: 1995, captura: 30 },
              { año: 2000, captura: 0 },
              { año: 2002, captura: 0 },
              { año: 2006, captura: 0 },
              { año: 2010, captura: 0 },
              { año: 2015, captura: 0 },
              { año: 2019, captura: 0 },
            ],
          },
        ],
      },
    ],
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
        categoria: "Aprovechado al Máximo Sustentable",
        color: "yellow",
        especie: "Laguna Madre Norte y La Pesca",
        zona: "Tamaulipas",
      },
      {
        categoria: "En Potencial de Desarrollo",
        color: "green",
        especie: "Laguna Madre",
        zona: "Tamaulipas",
      },
      {
        categoria: "Indeterminado",
        color: "gray",
        especie: "Estero el Tordo y Laguna San Andrés",
        zona: "Tamaulipas",
      },
      {
        categoria: "En Deterioro",
        color: "red",
        especie: "Laguna La Mancha, Laguna Mandinga, Sistema Lagunar de Alvarado Norte, Sistema Lagunar de Alvarado Sur y Laguna Mezcalapa",
        zona: "Veracruz, y Tabasco y Campeche",
      },
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

fichas["gm-camaron-rosado-del-golfo-de-mexico"] = {
  generalidades: {
    descripcion: [
      "La pesquería de camarón en México se encuentra posicionada en primer lugar por su valor económico y en segundo lugar por su volumen de captura. La tasa media de crecimiento anual de la producción en los últimos 10 años es de 1.67%. En las exportaciones ocupa el primer lugar de las especies pesqueras, siendo Estados Unidos de América, Vietnam y Francia sus principales destinos. Entre las especies comerciales de camarón en el Golfo de México se encuentran el camarón rosado (Farfantepenaeus duorarum), el café (Farfantepenaeus aztecus), el blanco (Litopenaeus setiferus), el rojo (Farfantepenaeus brasiliensis) y el roca (Sicyonia brevirostris).",
      "El camarón rosado constituye uno de los recursos más importantes para la flota camaronera de mediana altura de Campeche y Ciudad del Carmen. Las mayores concentraciones de esta especie se localizan en el sureste del Golfo de México, en la Sonda de Campeche, donde a partir de 1950 se desarrolló una pesquería que llegó a representar el 70% de la producción del Golfo de México.",
      "El camarón rosado se distribuye desde la Bahía de Chesapeake, Florida, por todo el Golfo de México hasta Isla Mujeres, Quintana Roo. En México, sus principales concentraciones se localizan en aguas someras de la costa en la porción noreste de Laguna de Términos y Sabancuy, hasta Isla Arena y Celestún, extendiéndose hasta el noreste de la Sonda de Campeche. Se localiza desde un metro de profundidad en la costa norte de Campeche hasta los 70 metros en la Sonda de Campeche, pero su captura se realiza principalmente en fondos de 30 a 70 metros. Por razones de seguridad nacional, se limitó el libre acceso en áreas de exclusión y prevención marítima debido a la actividad de extracción de hidrocarburos.",
    ],
    embarcaciones:
      "Se utilizan embarcaciones mayores de tipo Florida, con capacidad superior a las 10 toneladas de arqueo neto, con cuatro redes de arrastre provistas de excluidores de tortugas marinas (DET); la tripulación puede ser de hasta seis pescadores: capitán, motorista, winchero, cocinero, pacotillero y marinero. La eslora fluctúa entre 19.33 y 26.23 metros (el 58% mide de 20 a 22 metros) y la potencia del motor varía entre 272 y 1,150 caballos de fuerza. Todos los barcos cuentan con equipo electrónico de navegación y eco detección del fondo, radios SSB, VHF, compás magnético y Sistema de Localización Satelital, obligatorio conforme a la NOM-062-SAG/PESC-2014.",
    artesPesca:
      "El sistema de captura consiste en redes gemelas de uno de los diseños siguientes: plana, portuguesa, hawaiana y semibalón. El tamaño lo determina la potencia del buque, con longitud de relinga superior de entre 13.7 y 21.3 metros; las puertas de arrastre van desde 6' x 32\" hasta 8' x 42\". Obligatoriamente deben traer el excluidor de tortugas marinas de diseño rígido establecido en la NOM-002-SAG/PESC-2016. El sistema tiene buena eficiencia relativa de captura y baja selectividad, capturando ejemplares en un amplio intervalo de tallas.",
    especiesObjetivo: [{ nombre: "Camarón rosado", cientifico: "Farfantepenaeus duorarum" }],
    especiesAsociadas: [
      { nombre: "Camarón roca", cientifico: "Sicyonia brevirostris" },
      { nombre: "Camarón rojo", cientifico: "Farfantepenaeus brasiliensis" },
      { nombre: "Camarón sintético", cientifico: "Trachypenaeus spp." },
      { nombre: "Huachinango", cientifico: "Lutjanus campechanus" },
      { nombre: "Pargo", cientifico: "Lutjanus griseus" },
      { nombre: "Rubia o villajaiba", cientifico: "Lutjanus synagris" },
      { nombre: "Cochinita", cientifico: "Balistes capriscus" },
      { nombre: "Torito", cientifico: "Acanthostracion quadricornis" },
      { nombre: "Lenguado", cientifico: "Cyclopsetta spp." },
      { nombre: "Canané", cientifico: "Ocyurus chrysurus" },
      { nombre: "Calamar", cientifico: "Doryteuthis (Amerigo) pealeii" },
      { nombre: "Raya blanca o balá", cientifico: "Hypanus americanus" },
      { nombre: "Cazón de ley o tutzún", cientifico: "Rhizoprionodon terraenovae" },
      { nombre: "Cazón cabeza de pala o pech", cientifico: "Sphyrna tiburo" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "El camarón rosado llegó a representar el 70% de la producción de camarón del Golfo de México.",
      "La captura y el esfuerzo pesquero muestran una tendencia decreciente marcada: de un máximo de 17,500 toneladas en 1972 a cerca de 1,500 toneladas en 2020.",
    ],
    capturaPorEstado: [
      {
        titulo: "Captura y esfuerzo pesquero en la Sonda de Campeche, 1950–2020 (INAPESCA)",
        series: [
          {
            estado: "Captura (t)",
            color: "#e11d48",
            datos: [
              { año: 1950, captura: 1500 },
              { año: 1955, captura: 5000 },
              { año: 1960, captura: 9000 },
              { año: 1965, captura: 11500 },
              { año: 1970, captura: 14000 },
              { año: 1972, captura: 17500 },
              { año: 1975, captura: 13000 },
              { año: 1978, captura: 16500 },
              { año: 1980, captura: 11000 },
              { año: 1985, captura: 10500 },
              { año: 1990, captura: 7000 },
              { año: 1995, captura: 5500 },
              { año: 2000, captura: 5000 },
              { año: 2005, captura: 1500 },
              { año: 2010, captura: 2500 },
              { año: 2015, captura: 3000 },
              { año: 2020, captura: 1500 },
            ],
          },
          {
            estado: "Viajes de pesca",
            color: "#0891b2",
            datos: [
              { año: 1975, captura: 12000 },
              { año: 1978, captura: 11500 },
              { año: 1980, captura: 7500 },
              { año: 1985, captura: 4000 },
              { año: 1990, captura: 2500 },
              { año: 1995, captura: 1500 },
              { año: 2000, captura: 1000 },
              { año: 2005, captura: 500 },
              { año: 2010, captura: 500 },
              { año: 2015, captura: 500 },
              { año: 2020, captura: 500 },
            ],
          },
        ],
      },
      {
        titulo: "Rendimiento (kg de camarón entero por viaje) en la Sonda de Campeche, 1975–2020 (INAPESCA)",
        series: [
          {
            estado: "kg / viaje",
            color: "#8b5cf6",
            datos: [
              { año: 1975, captura: 900 },
              { año: 1978, captura: 1350 },
              { año: 1980, captura: 1050 },
              { año: 1985, captura: 2050 },
              { año: 1990, captura: 1550 },
              { año: 1993, captura: 2500 },
              { año: 1995, captura: 1650 },
              { año: 2000, captura: 1300 },
              { año: 2003, captura: 2450 },
              { año: 2005, captura: 1050 },
              { año: 2008, captura: 1650 },
              { año: 2010, captura: 2600 },
              { año: 2012, captura: 2850 },
              { año: 2013, captura: 1500 },
              { año: 2015, captura: 2900 },
              { año: 2018, captura: 2600 },
              { año: 2020, captura: 2700 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Diversos estudios han señalado el efecto de la variación en las condiciones ambientales sobre la historia de vida del camarón rosado. En la Sonda de Campeche, la temperatura superficial del mar presenta una tendencia de largo plazo al aumento, que se relacionó con cambios históricos en el patrón estacional del reclutamiento y con relaciones stock-reclutamiento densodependientes (baja abundancia de adultos y tendencia decreciente del reclutamiento).",
    "De manera específica, se observó una relación negativa con la temperatura superficial y una positiva con la salinidad: aumentos en la temperatura y disminuciones de la salinidad generan una disminución en el reclutamiento. Además, se detectaron tendencias decrecientes de producción primaria asociadas a la caída de la capacidad de carga en la Sonda de Campeche. Estos procesos generan incertidumbre sobre el éxito de las medidas de manejo orientadas a recuperar la captura.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-002-SAG/PESC-2013, para ordenar el aprovechamiento de las especies de camarón en aguas de jurisdicción federal. NOM-062-SAG/PESC-2014, para la utilización del Sistema de Localización y Monitoreo Satelital de Embarcaciones Pesqueras. NOM-061-SAG-PESC/SEMARNAT-2016, sobre los excluidores de tortugas marinas de la flota de arrastre camaronera.",
      sustento: "DOF: 11/07/2013 · DOF: 03/07/2015 · DOF: 13/12/2016",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de camarón rosado (Farfantepenaeus duorarum) de la Sonda de Campeche.",
      sustento: "DOF: 28/03/2014",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos / concesiones para pesca comercial de camarón de altamar.",
      sustento: "Dictamen técnico del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "—", sustento: "—" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Cuatro redes de arrastre con tamaño de malla no menor a 44.45 mm (1 ¾\") en alas, cielo o square, cuerpo y antebolso, y de 38.1 mm (1 ½\") en el bolso, provistas con excluidores de tortugas marinas (DET).",
      sustento: "NOM-002-SAG/PESC-2013 (DOF: 11/07/2013). NOM-061-SAG-PESC/SEMARNAT-2016 (DOF: 13/12/2016).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Veda temporal variable que se emite anualmente o por temporada para proteger la reproducción y el reclutamiento. Veda espacial permanente en Laguna de Términos y sus bocas. Veda permanente en la franja marina de las 0 a las 15 millas náuticas desde Isla Aguada, Campeche, hasta los límites con Belice, incluyendo las lagunas y zonas costeras de la Península de Yucatán, excepto los caladeros de Contoy.",
      sustento: "NOM-009-SAG/PESC-2015 (DOF: 12/02/2016). Dictamen técnico del INAPESCA.",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "—", sustento: "—" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcación con capacidad superior a las 10 toneladas de arqueo neto, con cuatro redes de arrastre provistas de excluidores de tortugas marinas, hasta seis pescadores y sistema de localización satelital.",
      sustento:
        "NOM-002-SAG/PESC-2013 (DOF: 11/07/2013). Carta Nacional Pesquera (DOF: 25/08/2006). NOM-062-SAG/PESC-2014 (DOF: 03/07/2015).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion:
        "No existen permisos o concesiones específicos de pesca comercial de camarón rosado (amparado por el permiso de pesca comercial de camarón de altamar en la región).",
      sustento: "—",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal del Golfo de México y Mar Caribe. Se reitera la veda permanente en la franja marina de las 0 a las 20 millas náuticas desde Isla Aguada, Campeche, hasta los límites con Belice, incluyendo lagunas y zonas costeras de la Península de Yucatán, excepto los caladeros de Contoy, Quintana Roo.",
      sustento:
        "NOM-002-SAG/PESC-2013 (DOF: 11/07/2013). Aviso de veda por tiempo indefinido en la Laguna de Términos y sus bocas (DOF: 04/11/1996). Acuerdo de veda publicado anualmente en el DOF.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "En deterioro",
        color: "red",
        especie: "Camarón rosado (Farfantepenaeus duorarum)",
        zona: "Sonda de Campeche",
      },
    ],
    estrategia: "Tasa de aprovechamiento variable.",
    tacticas: [
      "Control de la zona de operación de pesca",
      "Regulación del arte de pesca",
      "Veda temporal y espacial variable",
      "Veda espacial permanente en la franja costera (0 a 20 millas), de Isla Aguada a los límites con Belice",
    ],
  },
  recomendaciones: [
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información" },
    { recomendacion: "Continuar con el establecimiento de épocas y zonas de veda.", avance: "Sin información" },
    {
      recomendacion: "Implementar mayor inspección y vigilancia en las zonas de crianza y en los periodos de veda en altamar.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Dar seguimiento constante a la implementación del Plan de Manejo Pesquero de camarón rosado (Farfantepenaeus duorarum) de la Sonda de Campeche.",
      avance: "Sin información",
    },
  ],
}

fichas["gm-huachinango-y-pargos-del-golfo-de-mexico-y-mar-caribe"] = {
  generalidades: {
    descripcion: [
      "La pesquería de huachinango, Lutjanus campechanus, es una de las más importantes en la economía del Golfo de México. Una parte de la captura se exporta a los Estados Unidos, generando empleos y una entrada de divisas para el país. El huachinango se distribuye en aguas marinas de jurisdicción federal de Tamaulipas, Veracruz, Tabasco, Campeche y Yucatán, y habita en zonas de fondos arenosos, fangosos y arrecifes coralinos.",
      "El Banco de Campeche es una de las áreas de mayor abundancia de huachinango. La zona con la mayor captura por unidad de esfuerzo (CPUE) se encuentra en la parte oeste de la plataforma, entre los 20°–24° N y 91°–93° O (Cayo Arenas, los Triángulos y Banco Nuevo), seguida de la parte noroeste, entre los 22°–24° N y 88°–91° O (Isla Pérez, Arrecife Alacranes y los Bajos del Norte). En Tabasco y Campeche parte de las capturas se realiza en esa misma zona, pero también en la zona costera, entre seis y 36 millas náuticas de la costa.",
    ],
    embarcaciones:
      "Participan varios tipos de flota: en la plataforma de la península de Yucatán operan la flota mayor mexicana y la artesanal; en Tamaulipas, Veracruz, Campeche, Tabasco y Quintana Roo, la flota artesanal. La flota menor emplea embarcaciones de fibra de vidrio de 7.6 a 8.8 metros de eslora, con capacidad de 1.5 a 3 toneladas y motor fuera de borda de 55 a 115 caballos de fuerza, en su mayoría con equipos de detección y posicionamiento geográfico. En la flota huachinanguera de Yucatán participan de tres a cuatro tripulantes (patrón de pesca, motorista y cocinero) y los viajes duran cerca de 17 días.",
    artesPesca:
      "Se utilizan líneas de mano y palangres huachinangueros de 300 a 5,000 anzuelos rectos, del número 5 al 8, tipo japonés o garra de águila del número 10 al 12. El palangre de fondo consta de una línea madre de nylon monofilamento o multifilamento de polietileno o polipropileno de 3.5 a 6 mm de diámetro y de 400 a 5,000 metros de longitud, con anzuelos colocados a tres metros entre sí, y opera a la deriva unas 12 horas. Como carnada se usan sardina, cojinuda, bonito, ojón, lisa, armado, calamar y pulpo, entre otros. La línea de mano (también llamada cordel, escandallo, cala o rosario) lleva de uno a tres anzuelos y se opera a profundidades variables.",
    especiesObjetivo: [
      { nombre: "Huachinango de castilla", cientifico: "Lutjanus campechanus" },
      { nombre: "Huachinango ojo amarillo", cientifico: "Lutjanus vivanus" },
      { nombre: "Huachinango aleta negra", cientifico: "Lutjanus buccanella" },
    ],
    especiesAsociadas: [
      { nombre: "Pez puerco, peje puerco", cientifico: "Balistes capriscus" },
      { nombre: "Lengua, brótula, rótula", cientifico: "Brotula barbata" },
      { nombre: "Mojarrón", cientifico: "Calamus bajonado" },
      { nombre: "Mojarra tigre", cientifico: "Calamus nodosus" },
      { nombre: "Tigre, pluma, jorobada", cientifico: "Calamus proridens" },
      { nombre: "Jurel amarillo, vaca", cientifico: "Caranx hippos" },
      { nombre: "Jurel blanco, ojón", cientifico: "Caranx latus" },
      { nombre: "Blanquillo ojo amarillo", cientifico: "Caulolatilus chrysops" },
      { nombre: "Blanquillo payaso", cientifico: "Caulolatilus intermedius" },
      { nombre: "Raya grande, balá", cientifico: "Hypanus americanus" },
      { nombre: "Mero rojo", cientifico: "Epinephelus morio" },
      { nombre: "Cabrilla, payaso", cientifico: "Epinephelus adscensionis" },
      { nombre: "Seda, pejerrey", cientifico: "Etelis oculatus" },
      { nombre: "Boquilla, chac-chi", cientifico: "Haemulon plumieri" },
      { nombre: "Cherna prieta", cientifico: "Hyporthodus nigritus" },
      { nombre: "Pargo criollo, lunajero, chacalcay", cientifico: "Lutjanus analis" },
      { nombre: "Pargo", cientifico: "Lutjanus apodus" },
      { nombre: "Cubera, pargo, colmillón", cientifico: "Lutjanus cyanopterus" },
      { nombre: "Pargo mulato, parguete", cientifico: "Lutjanus griseus" },
      { nombre: "Pargo perro, caballera", cientifico: "Lutjanus jocu" },
      { nombre: "Rubia, villajaiba", cientifico: "Lutjanus synagris" },
      { nombre: "Negrillo", cientifico: "Mycteroperca bonaci" },
      { nombre: "Cabrilla", cientifico: "Mycteroperca interstitialis" },
      { nombre: "Abadejo", cientifico: "Mycteroperca microlepis" },
      { nombre: "Abadejo garropa", cientifico: "Mycteroperca phenax" },
      { nombre: "Canané", cientifico: "Ocyurus chrysurus" },
      { nombre: "Cobia", cientifico: "Rachycentron canadum" },
      { nombre: "Cazón tripa, ley", cientifico: "Rhizoprionodon terraenovae" },
      { nombre: "Besugo", cientifico: "Rhomboplites aurorubens" },
      { nombre: "Esmedregal", cientifico: "Seriola dumerili" },
      { nombre: "Esmedregal", cientifico: "Seriola rivoliana" },
      { nombre: "Medregal rayado", cientifico: "Seriola zonata" },
      { nombre: "Barracuda, picuda", cientifico: "Sphyraena barracuda" },
      { nombre: "Cornuda, martillo", cientifico: "Sphyrna lewini" },
      { nombre: "Cornuda cabeza de pala", cientifico: "Sphyrna tiburo" },
      { nombre: "Cazón cubano", cientifico: "Squalus cubensis" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "El promedio histórico de la captura de huachinango ha sido de 690 toneladas para Veracruz, 664 toneladas para Campeche y 36 toneladas para Quintana Roo.",
    ],
    capturaPorEstado: [
      {
        titulo: "Captura de huachinango y pargos en el Golfo de México y Mar Caribe, 1990–2020 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Huachinango",
            color: "#e11d48",
            datos: [
              { año: 1990, captura: 5250 },
              { año: 1992, captura: 6800 },
              { año: 1994, captura: 4900 },
              { año: 1996, captura: 4300 },
              { año: 1998, captura: 3350 },
              { año: 2000, captura: 2750 },
              { año: 2002, captura: 2600 },
              { año: 2004, captura: 2950 },
              { año: 2006, captura: 2600 },
              { año: 2008, captura: 2600 },
              { año: 2010, captura: 3550 },
              { año: 2012, captura: 3150 },
              { año: 2014, captura: 3350 },
              { año: 2016, captura: 5000 },
              { año: 2018, captura: 5600 },
              { año: 2020, captura: 5450 },
            ],
          },
          {
            estado: "Pargos",
            color: "#0891b2",
            datos: [
              { año: 1990, captura: 1650 },
              { año: 1992, captura: 2200 },
              { año: 1994, captura: 1850 },
              { año: 1996, captura: 1650 },
              { año: 1998, captura: 1400 },
              { año: 2000, captura: 1350 },
              { año: 2002, captura: 1450 },
              { año: 2004, captura: 1200 },
              { año: 2006, captura: 1200 },
              { año: 2008, captura: 1450 },
              { año: 2010, captura: 1750 },
              { año: 2012, captura: 1900 },
              { año: 2014, captura: 2100 },
              { año: 2016, captura: 2300 },
              { año: 2018, captura: 2600 },
              { año: 2020, captura: 2100 },
            ],
          },
        ],
      },
      {
        titulo: "Captura de huachinango por estado, 1990–2020 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Tamaulipas",
            color: "#e11d48",
            datos: [
              { año: 1990, captura: 650 },
              { año: 1992, captura: 600 },
              { año: 1994, captura: 750 },
              { año: 1996, captura: 600 },
              { año: 1998, captura: 450 },
              { año: 2000, captura: 350 },
              { año: 2002, captura: 250 },
              { año: 2004, captura: 350 },
              { año: 2006, captura: 450 },
              { año: 2008, captura: 450 },
              { año: 2010, captura: 450 },
              { año: 2012, captura: 550 },
              { año: 2014, captura: 650 },
              { año: 2016, captura: 750 },
              { año: 2018, captura: 850 },
              { año: 2020, captura: 750 },
            ],
          },
          {
            estado: "Veracruz",
            color: "#0891b2",
            datos: [
              { año: 1990, captura: 700 },
              { año: 1992, captura: 700 },
              { año: 1994, captura: 1300 },
              { año: 1996, captura: 1400 },
              { año: 1998, captura: 950 },
              { año: 2000, captura: 500 },
              { año: 2002, captura: 400 },
              { año: 2004, captura: 500 },
              { año: 2006, captura: 600 },
              { año: 2008, captura: 600 },
              { año: 2010, captura: 600 },
              { año: 2012, captura: 600 },
              { año: 2014, captura: 750 },
              { año: 2016, captura: 1150 },
              { año: 2018, captura: 2000 },
              { año: 2020, captura: 1400 },
            ],
          },
          {
            estado: "Tabasco",
            color: "#0d9488",
            datos: [
              { año: 1990, captura: 650 },
              { año: 1992, captura: 800 },
              { año: 1994, captura: 700 },
              { año: 1996, captura: 600 },
              { año: 1998, captura: 900 },
              { año: 2000, captura: 1300 },
              { año: 2002, captura: 1650 },
              { año: 2004, captura: 1650 },
              { año: 2006, captura: 1450 },
              { año: 2008, captura: 1250 },
              { año: 2010, captura: 1350 },
              { año: 2012, captura: 1550 },
              { año: 2014, captura: 1750 },
              { año: 2016, captura: 1550 },
              { año: 2018, captura: 1250 },
              { año: 2020, captura: 1050 },
            ],
          },
          {
            estado: "Campeche",
            color: "#8b5cf6",
            datos: [
              { año: 1990, captura: 950 },
              { año: 1992, captura: 2250 },
              { año: 1994, captura: 1650 },
              { año: 1996, captura: 950 },
              { año: 1998, captura: 350 },
              { año: 2000, captura: 350 },
              { año: 2002, captura: 450 },
              { año: 2004, captura: 550 },
              { año: 2006, captura: 450 },
              { año: 2008, captura: 550 },
              { año: 2010, captura: 650 },
              { año: 2012, captura: 650 },
              { año: 2014, captura: 650 },
              { año: 2016, captura: 750 },
              { año: 2018, captura: 850 },
              { año: 2020, captura: 700 },
            ],
          },
          {
            estado: "Yucatán",
            color: "#f59e0b",
            datos: [
              { año: 1990, captura: 1050 },
              { año: 1992, captura: 1850 },
              { año: 1994, captura: 1950 },
              { año: 1996, captura: 1500 },
              { año: 1998, captura: 1350 },
              { año: 2000, captura: 700 },
              { año: 2002, captura: 550 },
              { año: 2004, captura: 600 },
              { año: 2006, captura: 600 },
              { año: 2008, captura: 600 },
              { año: 2010, captura: 700 },
              { año: 2012, captura: 700 },
              { año: 2014, captura: 700 },
              { año: 2016, captura: 800 },
              { año: 2018, captura: 1000 },
              { año: 2020, captura: 1150 },
            ],
          },
          {
            estado: "Quintana Roo",
            color: "#64748b",
            datos: [
              { año: 1990, captura: 250 },
              { año: 1992, captura: 200 },
              { año: 1994, captura: 150 },
              { año: 1996, captura: 150 },
              { año: 1998, captura: 150 },
              { año: 2000, captura: 150 },
              { año: 2002, captura: 150 },
              { año: 2004, captura: 200 },
              { año: 2006, captura: 250 },
              { año: 2008, captura: 250 },
              { año: 2010, captura: 300 },
              { año: 2012, captura: 300 },
              { año: 2014, captura: 350 },
              { año: 2016, captura: 400 },
              { año: 2018, captura: 450 },
              { año: 2020, captura: 500 },
            ],
          },
        ],
      },
      {
        titulo: "Captura de pargo por estado, 1990–2020 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Tamaulipas",
            color: "#e11d48",
            datos: [
              { año: 1990, captura: 80 },
              { año: 1992, captura: 80 },
              { año: 1994, captura: 100 },
              { año: 1996, captura: 80 },
              { año: 1998, captura: 80 },
              { año: 2000, captura: 80 },
              { año: 2002, captura: 80 },
              { año: 2004, captura: 100 },
              { año: 2006, captura: 100 },
              { año: 2008, captura: 100 },
              { año: 2010, captura: 100 },
              { año: 2012, captura: 150 },
              { año: 2014, captura: 180 },
              { año: 2016, captura: 150 },
              { año: 2018, captura: 250 },
              { año: 2020, captura: 300 },
            ],
          },
          {
            estado: "Veracruz",
            color: "#0891b2",
            datos: [
              { año: 1990, captura: 300 },
              { año: 1992, captura: 650 },
              { año: 1994, captura: 750 },
              { año: 1996, captura: 800 },
              { año: 1998, captura: 350 },
              { año: 2000, captura: 100 },
              { año: 2002, captura: 100 },
              { año: 2004, captura: 100 },
              { año: 2006, captura: 150 },
              { año: 2008, captura: 150 },
              { año: 2010, captura: 150 },
              { año: 2012, captura: 200 },
              { año: 2014, captura: 250 },
              { año: 2016, captura: 750 },
              { año: 2018, captura: 650 },
              { año: 2020, captura: 800 },
            ],
          },
          {
            estado: "Tabasco",
            color: "#0d9488",
            datos: [
              { año: 1990, captura: 300 },
              { año: 1992, captura: 250 },
              { año: 1994, captura: 250 },
              { año: 1996, captura: 200 },
              { año: 1998, captura: 350 },
              { año: 2000, captura: 350 },
              { año: 2002, captura: 250 },
              { año: 2004, captura: 180 },
              { año: 2006, captura: 250 },
              { año: 2008, captura: 250 },
              { año: 2010, captura: 350 },
              { año: 2012, captura: 250 },
              { año: 2014, captura: 250 },
              { año: 2016, captura: 250 },
              { año: 2018, captura: 200 },
              { año: 2020, captura: 200 },
            ],
          },
          {
            estado: "Campeche",
            color: "#8b5cf6",
            datos: [
              { año: 1990, captura: 450 },
              { año: 1992, captura: 1050 },
              { año: 1994, captura: 1000 },
              { año: 1996, captura: 350 },
              { año: 1998, captura: 350 },
              { año: 2000, captura: 500 },
              { año: 2002, captura: 500 },
              { año: 2004, captura: 600 },
              { año: 2006, captura: 700 },
              { año: 2008, captura: 600 },
              { año: 2010, captura: 700 },
              { año: 2012, captura: 700 },
              { año: 2014, captura: 700 },
              { año: 2016, captura: 900 },
              { año: 2018, captura: 750 },
              { año: 2020, captura: 650 },
            ],
          },
          {
            estado: "Yucatán",
            color: "#f59e0b",
            datos: [
              { año: 1990, captura: 550 },
              { año: 1992, captura: 550 },
              { año: 1994, captura: 550 },
              { año: 1996, captura: 450 },
              { año: 1998, captura: 350 },
              { año: 2000, captura: 450 },
              { año: 2002, captura: 450 },
              { año: 2004, captura: 450 },
              { año: 2006, captura: 550 },
              { año: 2008, captura: 550 },
              { año: 2010, captura: 650 },
              { año: 2012, captura: 650 },
              { año: 2014, captura: 650 },
              { año: 2016, captura: 650 },
              { año: 2018, captura: 600 },
              { año: 2020, captura: 500 },
            ],
          },
          {
            estado: "Quintana Roo",
            color: "#64748b",
            datos: [
              { año: 1990, captura: 200 },
              { año: 1992, captura: 200 },
              { año: 1994, captura: 200 },
              { año: 1996, captura: 200 },
              { año: 1998, captura: 200 },
              { año: 2000, captura: 150 },
              { año: 2002, captura: 150 },
              { año: 2004, captura: 150 },
              { año: 2006, captura: 150 },
              { año: 2008, captura: 150 },
              { año: 2010, captura: 150 },
              { año: 2012, captura: 150 },
              { año: 2014, captura: 150 },
              { año: 2016, captura: 150 },
              { año: 2018, captura: 150 },
              { año: 2020, captura: 150 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "La temperatura del mar es uno de los factores estrechamente relacionados con la tasa de desarrollo embrionario y el periodo larval; también influye en el metabolismo de los peces. Los años de El Niño/Oscilación del Sur (ENOS) afectan las capturas de esta especie debido a los sistemas de tormentas provenientes del norte.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "—", sustento: "—" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "—", sustento: "—" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos de pesca comercial para la pesquería de escama marina.",
      sustento: "Dictamen técnico del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "En proceso de elaboración.", sustento: "—" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Palangre o línea de mano; el número de reinales y el tamaño del anzuelo varían por entidad. Tamaulipas, Veracruz y Campeche: línea de mano con 1–15 anzuelos del número 6/0 a 9/0 circular, garra de águila o recto, y palangre huachinanguero con 300–5,000 anzuelos. Veracruz y Tamaulipas: cala huachinanguera con 2–4 anzuelos del número 5/0 a 8/0.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "Investigación en proceso.", sustento: "—" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "—", sustento: "—" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcaciones menores y de mediana altura.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "No existen permisos o concesiones específicos de pesca comercial de huachinango y pargos (amparado por el permiso de pesca comercial de escama marina en la región).",
      sustento: "—",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal de Tamaulipas, Veracruz, Tabasco, Campeche y Yucatán. Se deben considerar las limitaciones a la captura de las Zonas de Refugio Pesquero vigentes en Quintana Roo y Yucatán.",
      sustento: "Permiso para pesca comercial. DOF: 13/04/2015.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Huachinango y pargos (con tendencia a deteriorarse en el futuro)",
        zona: "Golfo de México y Mar Caribe",
      },
    ],
    estrategia: "Tasa de aprovechamiento variable.",
    tacticas: [
      "Permisos de pesca comercial de escama, con zonas y artes de pesca autorizadas",
      "Control del esfuerzo pesquero",
      "Regulación del arte y método de captura",
    ],
  },
  recomendaciones: [
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información" },
    {
      recomendacion: "Elaborar e instrumentar el Plan de Manejo Pesquero para ordenar el aprovechamiento de estas especies.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería que permita evaluar su impacto, bajo la coordinación y supervisión del INAPESCA.",
      avance: "Sin información",
    },
  ],
}

fichas["gm-ostion-del-golfo-de-mexico"] = {
  generalidades: {
    descripcion: [
      "El ostión del este, Crassostrea virginica, es uno de los miembros de la familia Ostreidae de gran importancia comercial. Se distribuye desde el Golfo de San Lorenzo, en Canadá, hasta la Laguna de Términos, Campeche, en el Atlántico norte, y en algunas zonas de Brasil en el Atlántico sur. Habita en fondos firmes y duros de la zona intermareal y submareal. Su facilidad de reproducción y de colecta lo convierten en uno de los organismos con mayor demanda dentro de la acuacultura, desde colectas manuales en sistemas lagunares hasta el desarrollo de bancos ostrícolas artificiales.",
      "Este recurso se captura en lagunas costeras de jurisdicción federal entre los 25° 50′ y 18° 33′ de latitud Norte y los 97° 10′ y 91° 53′ de longitud Oeste, en la línea de costa situada entre Playa Bagdad, en Tamaulipas, y la porción occidental de la Laguna de Términos, Campeche, conocida como laguna Pom-Atasta. Se extrae entre los 0.50 y 2.5 metros de profundidad.",
    ],
    embarcaciones:
      "Se utiliza embarcación de fibra de vidrio o madera de 2 a 6 metros de eslora, con o sin motor (que comúnmente ronda los 15 a 30 caballos de fuerza). Participan de 1 a 3 pescadores.",
    artesPesca: "Pesca a pie o buceo libre, hasta el uso de gafas o rastrillo.",
    especiesObjetivo: [{ nombre: "Ostión del Este", cientifico: "Crassostrea virginica" }],
    especiesAsociadas: [{ nombre: "Ostión de mangle", cientifico: "Crassostrea rhizophora" }],
  },
  indicadores: {
    datosDestacados: [
      "En el Golfo de México, el ostión es considerado el 2° producto pesquero más relevante por su volumen de captura y su representatividad a nivel nacional.",
      "De las 52,790 toneladas de ostión cosechadas a nivel nacional en 2018, el 75% se extrajo del Golfo de México y el 25% restante del Pacífico.",
      "El valor de la captura de ostión en el Golfo de México alcanzó los 94.38 millones de pesos, mientras que la del Pacífico registró 250.27 millones de pesos.",
    ],
    capturaPorEstado: [
      {
        titulo: "Captura de ostión por estado, 1979–2019 (CONAPESCA, Anuarios Estadísticos)",
        series: [
          {
            estado: "Veracruz",
            color: "#0891b2",
            datos: [
              { año: 1979, captura: 22000 },
              { año: 1984, captura: 18000 },
              { año: 1989, captura: 40000 },
              { año: 1994, captura: 8000 },
              { año: 1999, captura: 15000 },
              { año: 2004, captura: 25000 },
              { año: 2009, captura: 20000 },
              { año: 2014, captura: 28000 },
              { año: 2019, captura: 22000 },
            ],
          },
          {
            estado: "Tabasco",
            color: "#0d9488",
            datos: [
              { año: 1979, captura: 10000 },
              { año: 1984, captura: 12000 },
              { año: 1989, captura: 15000 },
              { año: 1994, captura: 7000 },
              { año: 1999, captura: 18000 },
              { año: 2004, captura: 24000 },
              { año: 2009, captura: 18000 },
              { año: 2014, captura: 15000 },
              { año: 2019, captura: 14000 },
            ],
          },
          {
            estado: "Tamaulipas",
            color: "#e11d48",
            datos: [
              { año: 1979, captura: 3800 },
              { año: 1984, captura: 2500 },
              { año: 1989, captura: 3200 },
              { año: 1994, captura: 5500 },
              { año: 1999, captura: 1500 },
              { año: 2004, captura: 1000 },
              { año: 2009, captura: 1500 },
              { año: 2014, captura: 2800 },
              { año: 2019, captura: 1500 },
            ],
          },
          {
            estado: "Campeche",
            color: "#f59e0b",
            datos: [
              { año: 1979, captura: 1200 },
              { año: 1984, captura: 3800 },
              { año: 1989, captura: 1500 },
              { año: 1994, captura: 1200 },
              { año: 1999, captura: 1000 },
              { año: 2004, captura: 800 },
              { año: 2009, captura: 300 },
              { año: 2014, captura: 100 },
              { año: 2019, captura: 100 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Los ostiones son organismos altamente adaptables al medio; dicha adaptabilidad es tan evidente que el ostión es capaz de promover cambios fisiológicos para adaptarse a nuevas condiciones de temperatura, salinidad y, principalmente, pH. Sin embargo, esta última variable está directamente asociada con un cambio climático a gran escala —la acidificación del medio marino—, que provocará un efecto deletéreo en la formación de la concha y, por ende, en la viabilidad de la semilla para crecer.",
    "Por otra parte, proteger la funcionalidad y los servicios ambientales que ofrecen los arrecifes y bancos ostrícolas mantiene sanos y resilientes los ambientes lagunares y estuarinos.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-015-SAG/PESC-2016, para regular el aprovechamiento de ostión (Crassostrea virginica) en los sistemas lagunarios estuarinos del estado de Tabasco.",
      sustento: "DOF: 17/08/2016",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "—", sustento: "—" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial o concesión para ostión.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "Talla de 70 mm (solo para Tabasco). Se ha promovido la adopción de una ventana de tallas de 80 a 110 mm.",
      sustento: "DOF: 17/08/2016",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion: "Gafas o rastrillo; buceo libre.",
      sustento: "DOF: 17/08/2016",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Del 15 de abril al 31 de mayo y del 15 de septiembre al 31 de octubre de cada año (solo para Tabasco).",
      sustento: "DOF: 17/08/2016",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "—", sustento: "—" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcación menor con o sin motor fuera de borda.",
      sustento: "DOF: 17/08/2016",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "Tamaulipas: 291 embarcaciones. Veracruz: 1,347 embarcaciones. Tabasco: 306 embarcaciones. Campeche: 3 embarcaciones.",
      sustento:
        "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "Sistemas lagunares del Golfo de México.",
      sustento: "DOF: 17/08/2016",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Al máximo aprovechamiento sustentable",
        color: "yellow",
        especie:
          "Barra San Vicente, Calabazas, Laguna Brasil y estero del Tordo (Tamaulipas); Canal Chijol y laguna La Mancha (Veracruz); Laguna Machona (Tabasco)",
        zona: "Tamaulipas, Veracruz y Tabasco",
      },
      {
        categoria: "En deterioro",
        color: "red",
        especie:
          "Laguna Madre, Río Soto La Marina y sus lagunas adyacentes, laguna San Andrés (Tamaulipas); Laguna La Costa, laguna Tamiahua, estero Casitas, laguna Grande-Chica, laguna Sontecomapan, laguna Pueblo Viejo, laguna San Agustín y sistema lagunar Alvarado (Veracruz); lagunas Del Carmen, Pajonal, Redonda-Cocal y Mecoacán (Tabasco); Laguna de Atasta (Campeche)",
        zona: "Tamaulipas, Veracruz, Tabasco y Campeche",
      },
    ],
    estrategia: "Aplicación de medidas como el cierre de áreas (vedas espaciales) y el retorno del 100% de la concha.",
    tacticas: [
      "No incrementar el esfuerzo (de ser posible, disminuirlo o migrarlo a la acuacultura de ostión)",
      "Tallas de extracción de 80 a 110 milímetros",
      "Promover tallas mínimas de extracción para Veracruz, Tamaulipas y Campeche",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Diseño de vedas temporales y disminución del esfuerzo mediante la limitación de días de pesca.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementación urgente de un programa de retorno sistemático de concha para promover el acondicionamiento de bancos y el éxito del reclutamiento, disminuyendo paulatinamente la venta de ostión en concha.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Establecer medidas de manejo específicas e inhibir paulatinamente la pesca de ostión de consumo doméstico en áreas de mayor esfuerzo o riesgo sanitario (Pueblo Viejo, Sistema Lagunar de Alvarado, Carmen-Pajonal-Machona y Redonda).",
      avance: "Sin información",
    },
    {
      recomendacion: "Establecer consejos de vigilancia regional para el cumplimiento de las estrategias de manejo.",
      avance: "Sin información",
    },
    {
      recomendacion: "Establecer un programa estratégico de repoblamiento y recuperación de bancos, con control asociado de pastizales marinos.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Fomentar la actividad acuícola con semilla certificada de laboratorio y migrar a estos sistemas toda actividad extractiva denominada «pesquería acuacultural».",
      avance: "Sin información",
    },
    {
      recomendacion: "No permitir el esfuerzo pesquero de las especies de esta ficha en las zonas núcleo de las Áreas Naturales Protegidas.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-pulpo-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "Los pulpos se caracterizan por un ciclo de vida corto, rápido crecimiento y plasticidad del ciclo de vida. Habitan en los bentos, principalmente en zonas rocosas, donde buscan cuevas para refugiarse. El pulpo verde (Octopus hubbsorum) se distribuye desde el paralelo 29°, incluyendo el Golfo de California, hasta las costas de Oaxaca; entre el intermareal y los 30 metros de profundidad y no presenta ocelos. El pulpo café (Octopus bimaculatus) se distribuye de California, Estados Unidos de Norteamérica (EUA), al sur en el Golfo de California, México; entre el intermareal y los 50 metros de profundidad y presenta ocelos evidentes uno debajo de cada ojo, cerca de la base de los brazos del segundo y tercer par. El pulpo ocelado enano (Octopus bimaculoides) se distribuye desde Santa Bárbara, Estados Unidos de América, hasta Bahía de San Quintín, y habita principalmente en fondos arenosos; presenta ocelos bien definidos cerca de los ojos que pueden variar dependiendo de la sombra.",
      "El pulpo verde (Octopus hubbsorum) es el pulpo que más se captura a lo largo de la costa del Pacífico desde Baja California Sur hasta Oaxaca, incluyendo el Golfo de California. El pulpo café (Octopus bimaculatus) se captura principalmente en Baja California y Sonora.",
    ],
    embarcaciones:
      "La unidad de pesca consiste en una embarcación menor con motor fuera de borda equipada con trampas y hasta dos pescadores; o embarcación menor con motor fuera de borda equipada con un compresor de aire, equipo de buceo semiautónomo tipo «hooka» o buceo libre y hasta tres pescadores (buzo, cabo de vida y motorista).",
    especiesObjetivo: [
      { nombre: "Pulpo verde", cientifico: "Octopus hubbsorum" },
      { nombre: "Pulpo café o pulpo de dos manchas", cientifico: "Octopus bimaculatus" },
      { nombre: "Pulpo ocelado enano o pulpo californiano de dos manchas", cientifico: "Octopus bimaculoides" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "El pulpo verde (Octopus hubbsorum) es la especie más capturada a lo largo de la costa del Pacífico, desde Baja California Sur hasta Oaxaca, incluyendo el Golfo de California.",
      "El pulpo café (Octopus bimaculatus) se captura principalmente en Baja California y Sonora.",
      "El esfuerzo nominal autorizado suma 1,167 embarcaciones distribuidas en nueve entidades del Pacífico, con Baja California Sur (458) y Jalisco (215) a la cabeza.",
    ],
    // Figura 1. Tendencia de la captura de pulpo en Baja California (BC), 2000–2020. Fuente: CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Tendencia de la captura de pulpo en Baja California, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Baja California",
            color: "#f59e0b",
            datos: [
              { año: 2000, captura: 90 },
              { año: 2001, captura: 150 },
              { año: 2002, captura: 100 },
              { año: 2003, captura: 120 },
              { año: 2004, captura: 150 },
              { año: 2005, captura: 200 },
              { año: 2006, captura: 230 },
              { año: 2007, captura: 220 },
              { año: 2008, captura: 250 },
              { año: 2009, captura: 280 },
              { año: 2010, captura: 300 },
              { año: 2011, captura: 550 },
              { año: 2012, captura: 560 },
              { año: 2013, captura: 450 },
              { año: 2014, captura: 340 },
              { año: 2015, captura: 330 },
              { año: 2016, captura: 450 },
              { año: 2017, captura: 850 },
              { año: 2018, captura: 996 },
              { año: 2019, captura: 850 },
              { año: 2020, captura: 800 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Los cefalópodos, incluyendo las especies de pulpo verde (Octopus hubbsorum) y pulpo café (Octopus bimaculatus), son altamente susceptibles a las variaciones fisicoquímicas de la columna de agua, sobre todo en su etapa de paralarva (estadio inicial post-eclosión), etapa en la que son dependientes de los efectos de la circulación oceánica. En relación con el cambio climático, se ha observado que debido a las características ecológicas de los cefalópodos (ciclo de vida corto, rápido crecimiento, fuerte plasticidad del ciclo de vida) presentan una rápida adaptación a los cambios ambientales. Durante condiciones oceanográficas La Niña, las poblaciones de pulpo migran, alejándose de las zonas de pesca, lo que ocasiona disminución en las capturas. Durante El Niño, los organismos se aproximan a la línea de costa siendo vulnerables a la pesca, aumentando su captura y afectando incluso los ciclos reproductivos.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de pulpo.",
      sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "Se establecen las siguientes tallas o pesos mínimos de captura para todas las especies de pulpo en Bahía de los Ángeles, Baja California: I. Para los machos: 124.5 milímetros de longitud del manto dorsal o un peso de 757 gramos. II. Para las hembras: 143.5 milímetros de longitud del manto dorsal o un peso de 1,029 gramos.",
      sustento:
        "Artículo Primero, fracciones I y II del Acuerdo por el que se establece la veda temporal y tallas mínimas de captura para la pesca de las especies de pulpo en Bahía de los Ángeles, Baja California (DOF: 01/06/2016).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion: "Trampas. Buceo semiautónomo tipo «hooka» con gancho.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "En el área geográfica de la Reserva de la Biosfera Bahía de los Ángeles, Canales de Ballenas y de Salsipuedes, Baja California: I. Pulpo café (Octopus bimaculatus), del 1 de agosto al 30 de noviembre de cada año. II. Pulpo verde (Octopus hubbsorum), del 1 de septiembre al 30 de noviembre de cada año.",
      sustento:
        "Acuerdo por el que se modifica el similar por el que se establece la veda temporal y tallas mínimas de captura para la pesca de las especies de pulpo en Bahía de los Ángeles, Baja California, publicado el 1 de junio de 2016, para considerar como zona de veda la «Reserva de la Biosfera Bahía de los Ángeles, Canales de Ballenas y de Salsipuedes» (DOF: 07/11/2017).",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcación menor con motor fuera de borda equipada con trampas y hasta dos pescadores. Embarcación menor con motor fuera de borda equipada con un compresor de aire y equipo de buceo semiautónomo tipo «hooka» y hasta tres pescadores (buzo, cabo de vida y motorista). Embarcación menor con motor fuera de borda y hasta dos pescadores (motorista, buzo).",
      sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "Baja California: 206 embarcaciones. Baja California Sur: 458 embarcaciones. Sonora: 139 embarcaciones. Nayarit: 4 embarcaciones. Jalisco: 215 embarcaciones. Colima: 3 embarcaciones. Michoacán: 33 embarcaciones. Guerrero: 64 embarcaciones. Oaxaca: 45 embarcaciones.",
      sustento:
        "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal adyacentes a los estados de Baja California, Baja California Sur, Sonora, Sinaloa, Nayarit, Colima, Jalisco, Guerrero, Oaxaca y Chiapas, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
      sustento:
        "Permiso para pesca comercial, Decretos de Declaración de Áreas Naturales Protegidas, Programas de Manejo y Zonas de Refugio Pesquero.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Pulpo (Octopus spp.)",
        zona: "Costa del Golfo de Baja California y Complejo lagunar Bahía Magdalena–Almejas, Baja California Sur",
      },
      {
        categoria: "Indeterminado",
        color: "gray",
        especie: "Pulpo (Octopus spp.)",
        zona: "Costa Pacífico de Baja California, resto de Baja California Sur y resto de las entidades federativas",
      },
    ],
    estrategia: "Tasa de aprovechamiento para mantener las poblaciones Aprovechadas al Máximo Sustentable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Veda temporal",
      "Talla mínima de captura",
      "Control del arte y método de pesca",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo de pesca en las zonas que se encuentren Aprovechadas al Máximo Sustentable, en Baja California y Baja California Sur.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "En zonas con estatus Indeterminado, el esfuerzo de pesca se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión técnica del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la Autoridad Pesquera.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Establecer vedas temporales para proteger el periodo reproductivo en todas las zonas donde el método de pesca sea el buceo, previa opinión técnica del INAPESCA.",
      avance: "Sin información",
    },
    {
      recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
      avance: "Sin información",
    },
    {
      recomendacion: "Asignar los permisos de pesca otorgando áreas geográficamente delimitadas.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Respetar lo dispuesto en la Norma Oficial Mexicana NOM-064-SAG/PESC/SEMARNAT-2013, sobre sistemas, métodos y técnicas de captura prohibidos en la pesca en aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en lo previsto en la LGPAS y los instrumentos normativos aplicables.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-dorado-pesca-deportiva"] = {
  generalidades: {
    descripcion: [
      "El dorado es una especie epipelágica migratoria que habita mares tropicales y subtropicales de todo el mundo. Es una especie que se agrega alrededor de objetos a la deriva, comportamiento que ha sido aprovechado en las áreas cercanas a la desembocadura de ríos, donde es fácil encontrar una gran diversidad de objetos flotantes. El recurso está reservado para la pesca deportiva dentro de una franja de 50 millas náuticas contadas a partir de la línea de base desde la cual se mide el Mar Territorial. Se captura principalmente desde Baja California Sur y la región central de Sonora hasta Chiapas.",
    ],
    embarcaciones:
      "La pesca deportiva que se practica en la región de la boca del Golfo de California se realiza a bordo de distintos tipos de embarcaciones, generalmente rápidas, desde 6 hasta 18 metros de eslora, que incluyen desde pangas con motor fuera de borda hasta yates con motores de más de 250 caballos de fuerza y más de 12 toneladas de registro bruto. Debido a la autonomía de las embarcaciones utilizadas, las actividades de pesca deportiva se desarrollan mediante excursiones diarias que generalmente se limitan a un rango de acción de 25 a 30 millas náuticas.",
    artesPesca:
      "Para la captura se emplea caña con carrete y como señuelo se utiliza carnada (viva o muerta) o señuelos de distintos materiales. El viaje de pesca dura en promedio 8 horas y generalmente se realiza durante el día.",
    especiesObjetivo: [
      { nombre: "Dorado", cientifico: "Coryphaena hippurus" },
      { nombre: "Marlin rayado", cientifico: "Kajikia audax" },
      { nombre: "Marlin negro", cientifico: "Istiompax indica" },
      { nombre: "Marlin azul", cientifico: "Makaira mazara" },
      { nombre: "Pez vela", cientifico: "Istiophorus platypterus" },
    ],
    especiesAsociadas: [
      { nombre: "Wahoo", cientifico: "Acanthocybium solandri" },
      { nombre: "Barrilete negro", cientifico: "Euthynnus lineatus" },
      { nombre: "Barrilete listado", cientifico: "Katsuwonus pelamis" },
      { nombre: "Bonita o chula", cientifico: "Sarda orientalis" },
      { nombre: "Gallo", cientifico: "Nematistius pectoralis" },
      { nombre: "Macarela", cientifico: "Scomber japonicus" },
      { nombre: "Atún aleta amarilla", cientifico: "Thunnus albacares" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "El recurso está reservado para la pesca deportiva dentro de una franja de 50 millas náuticas contadas a partir de la línea de base desde la cual se mide el Mar Territorial.",
      "La flota deportiva de Los Cabos ha concentrado de manera creciente el esfuerzo, con cerca de 37,500 viajes en 2018, mientras que la de Mazatlán ha disminuido a unos 300 viajes anuales.",
      "El máximo autorizado es de dos ejemplares por pescador por día, equivalentes a cinco organismos de otras especies.",
    ],
    // Figura 1A. Tendencia del número de viajes de las flotas deportivas, 1990–2018. Fuente: CNP.
    capturaPorEstado: [
      {
        titulo: "Número de viajes de la flota deportiva en Los Cabos, Buena Vista y Mazatlán, 1990–2018",
        series: [
          {
            estado: "Los Cabos",
            color: "#e11d48",
            datos: [
              { año: 1990, captura: 13500 },
              { año: 1991, captura: 19500 },
              { año: 1992, captura: 16500 },
              { año: 1993, captura: 14500 },
              { año: 1994, captura: 13500 },
              { año: 1995, captura: 13500 },
              { año: 1996, captura: 16000 },
              { año: 1997, captura: 19000 },
              { año: 1998, captura: 22500 },
              { año: 1999, captura: 28000 },
              { año: 2000, captura: 25000 },
              { año: 2001, captura: 24500 },
              { año: 2002, captura: 30500 },
              { año: 2003, captura: 33500 },
              { año: 2004, captura: 35000 },
              { año: 2005, captura: 38500 },
              { año: 2006, captura: 41000 },
              { año: 2007, captura: 41000 },
              { año: 2008, captura: 36000 },
              { año: 2009, captura: 34000 },
              { año: 2010, captura: 32500 },
              { año: 2011, captura: 32500 },
              { año: 2012, captura: 34500 },
              { año: 2013, captura: 34000 },
              { año: 2014, captura: 33500 },
              { año: 2015, captura: 35500 },
              { año: 2016, captura: 33500 },
              { año: 2017, captura: 34000 },
              { año: 2018, captura: 37500 },
            ],
          },
          {
            estado: "Buena Vista",
            color: "#0891b2",
            datos: [
              { año: 1990, captura: 9500 },
              { año: 1991, captura: 9000 },
              { año: 1992, captura: 8500 },
              { año: 1993, captura: 8000 },
              { año: 1994, captura: 7500 },
              { año: 1995, captura: 7000 },
              { año: 1996, captura: 8000 },
              { año: 1997, captura: 8500 },
              { año: 1998, captura: 9000 },
              { año: 1999, captura: 9500 },
              { año: 2000, captura: 10000 },
              { año: 2001, captura: 9000 },
              { año: 2002, captura: 12000 },
              { año: 2003, captura: 9500 },
              { año: 2004, captura: 11500 },
              { año: 2005, captura: 14500 },
              { año: 2006, captura: 13000 },
              { año: 2007, captura: 11500 },
              { año: 2008, captura: 11000 },
              { año: 2009, captura: 10000 },
              { año: 2010, captura: 7500 },
              { año: 2011, captura: 5500 },
              { año: 2012, captura: 4000 },
              { año: 2013, captura: 3000 },
              { año: 2014, captura: 2500 },
              { año: 2015, captura: 2000 },
              { año: 2016, captura: 2000 },
              { año: 2017, captura: 2000 },
              { año: 2018, captura: 2000 },
            ],
          },
          {
            estado: "Mazatlán",
            color: "#f59e0b",
            datos: [
              { año: 1990, captura: 8500 },
              { año: 1991, captura: 6500 },
              { año: 1992, captura: 5000 },
              { año: 1993, captura: 4500 },
              { año: 1994, captura: 4000 },
              { año: 1995, captura: 3500 },
              { año: 1996, captura: 1500 },
              { año: 1997, captura: 2000 },
              { año: 1998, captura: 2500 },
              { año: 1999, captura: 3000 },
              { año: 2000, captura: 3500 },
              { año: 2001, captura: 4000 },
              { año: 2002, captura: 4000 },
              { año: 2003, captura: 4000 },
              { año: 2004, captura: 4000 },
              { año: 2005, captura: 4500 },
              { año: 2006, captura: 4000 },
              { año: 2007, captura: 4000 },
              { año: 2008, captura: 3500 },
              { año: 2009, captura: 2500 },
              { año: 2010, captura: 1500 },
              { año: 2011, captura: 1000 },
              { año: 2012, captura: 700 },
              { año: 2013, captura: 600 },
              { año: 2014, captura: 500 },
              { año: 2015, captura: 500 },
              { año: 2016, captura: 400 },
              { año: 2017, captura: 400 },
              { año: 2018, captura: 300 },
            ],
          },
        ],
      },
      // Figura 1B. Tendencia de la captura de dorado (número de organismos), 1990–2018. Fuente: CNP.
      {
        titulo: "Captura de dorado (número de organismos) en Los Cabos, Buena Vista y Mazatlán, 1990–2018",
        series: [
          {
            estado: "Los Cabos",
            color: "#e11d48",
            datos: [
              { año: 1990, captura: 17000 },
              { año: 1991, captura: 24000 },
              { año: 1992, captura: 32000 },
              { año: 1993, captura: 24000 },
              { año: 1994, captura: 28000 },
              { año: 1995, captura: 16000 },
              { año: 1996, captura: 22000 },
              { año: 1997, captura: 25000 },
              { año: 1998, captura: 28000 },
              { año: 1999, captura: 26000 },
              { año: 2000, captura: 45000 },
              { año: 2001, captura: 28000 },
              { año: 2002, captura: 26000 },
              { año: 2003, captura: 28000 },
              { año: 2004, captura: 19000 },
              { año: 2005, captura: 33000 },
              { año: 2006, captura: 19000 },
              { año: 2007, captura: 26000 },
              { año: 2008, captura: 40000 },
              { año: 2009, captura: 78000 },
              { año: 2010, captura: 44000 },
              { año: 2011, captura: 39000 },
              { año: 2012, captura: 59000 },
              { año: 2013, captura: 76000 },
              { año: 2014, captura: 48000 },
              { año: 2015, captura: 22000 },
              { año: 2016, captura: 17000 },
              { año: 2017, captura: 24000 },
              { año: 2018, captura: 19000 },
            ],
          },
          {
            estado: "Buena Vista",
            color: "#0891b2",
            datos: [
              { año: 1990, captura: 10000 },
              { año: 1991, captura: 14000 },
              { año: 1992, captura: 17000 },
              { año: 1993, captura: 13000 },
              { año: 1994, captura: 17000 },
              { año: 1995, captura: 10000 },
              { año: 1996, captura: 13000 },
              { año: 1997, captura: 9000 },
              { año: 1998, captura: 11000 },
              { año: 1999, captura: 14000 },
              { año: 2000, captura: 21000 },
              { año: 2001, captura: 14000 },
              { año: 2002, captura: 10000 },
              { año: 2003, captura: 11000 },
              { año: 2004, captura: 7000 },
              { año: 2005, captura: 20000 },
              { año: 2006, captura: 10000 },
              { año: 2007, captura: 7000 },
              { año: 2008, captura: 10000 },
              { año: 2009, captura: 13000 },
              { año: 2010, captura: 13000 },
              { año: 2011, captura: 7000 },
              { año: 2012, captura: 5000 },
              { año: 2013, captura: 4000 },
              { año: 2014, captura: 4000 },
              { año: 2015, captura: 2000 },
              { año: 2016, captura: 2000 },
              { año: 2017, captura: 2000 },
              { año: 2018, captura: 2000 },
            ],
          },
          {
            estado: "Mazatlán",
            color: "#f59e0b",
            datos: [
              { año: 1990, captura: 3000 },
              { año: 1991, captura: 2000 },
              { año: 1992, captura: 2000 },
              { año: 1993, captura: 2000 },
              { año: 1994, captura: 2000 },
              { año: 1995, captura: 1000 },
              { año: 1996, captura: 1000 },
              { año: 1997, captura: 1000 },
              { año: 1998, captura: 1000 },
              { año: 1999, captura: 1000 },
              { año: 2000, captura: 1000 },
              { año: 2001, captura: 1000 },
              { año: 2002, captura: 1000 },
              { año: 2003, captura: 1000 },
              { año: 2004, captura: 1000 },
              { año: 2005, captura: 1500 },
              { año: 2006, captura: 1000 },
              { año: 2007, captura: 1000 },
              { año: 2008, captura: 1500 },
              { año: 2009, captura: 2000 },
              { año: 2010, captura: 1500 },
              { año: 2011, captura: 1000 },
              { año: 2012, captura: 1000 },
              { año: 2013, captura: 1000 },
              { año: 2014, captura: 1000 },
              { año: 2015, captura: 1000 },
              { año: 2016, captura: 1000 },
              { año: 2017, captura: 1000 },
              { año: 2018, captura: 1000 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "El dorado ha mostrado una tendencia positiva con la temperatura superficial del mar, variable que explicó el 57% de la variabilidad de las tasas de captura. Esto sugiere que a temperaturas mayores se presentan condiciones favorables para esta especie, aunque no es la única variable que afecta su abundancia.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "Modificación a la Norma Oficial Mexicana NOM-017-PESC-1994, para regular las actividades de pesca deportivo-recreativa en las aguas de jurisdicción federal de los Estados Unidos Mexicanos, publicada en el Diario Oficial de la Federación el 9 de mayo de 1995.",
      sustento: "DOF: 25/11/2013.",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca deportivo-recreativa (individual o por embarcación).",
      sustento: "Numerales 4.3 y 4.14 (incisos a y b) de la NOM-017-PESC-1994 (DOF: 25/11/2013).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Embarcación con caña, carrete y anzuelo usando carnada o señuelo. Los carretes eléctricos solo podrán ser utilizados por personas con discapacidad.",
      sustento: "Numeral 4.6 (incisos a, e) de la NOM-017-PESC-1994 (DOF: 25/11/2013).",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "7. Cuota",
      aplica: true,
      disposicion:
        "El máximo será de dos ejemplares por pescador por día, los que también serán equivalentes a cinco organismos de otras especies.",
      sustento:
        "Numerales 4.9.1 (inciso b), 4.9.3 y 4.9.5 de la Modificación a la NOM-017-PESC-1994 (DOF: 25/11/2013).",
    },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcación con una sola caña o una sola línea, con un solo anzuelo, con carnada o señuelo por pescador deportivo.",
      sustento: "Numeral 4.6 (incisos a, e) de la NOM-017-PESC-1994 (DOF: 25/11/2013).",
    },
    { instrumento: "9. Esfuerzo nominal autorizado", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas de jurisdicción federal de los Estados Unidos Mexicanos, con zona exclusiva dentro de las 50 millas náuticas contadas a partir de la línea de costa, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
      sustento:
        "NOM-017-PESC-1994, Decretos de Declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Indeterminado",
        color: "gray",
        especie: "Dorado (Coryphaena hippurus)",
        zona: "Litoral del Pacífico mexicano",
      },
    ],
    estrategia:
      "Considerando que el dorado se encuentra reservado a la pesca deportiva (Artículo 68, LGPAS), el objetivo para el uso del recurso es mantener el tamaño de la población lo más cercano posible al valor del parámetro K.",
    tacticas: [
      "Captura y liberación",
      "Cuota de captura por pescador por día conforme a la NOM-017-PESC-1994",
      "Talla mínima de captura",
      "Volumen de la captura incidental",
      "Veda espacial",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Instrumentar acciones para el cumplimiento de la Norma Oficial Mexicana NOM-017-PESC-1994, para regular las actividades de pesca deportivo-recreativa en las aguas de jurisdicción federal de los Estados Unidos Mexicanos (DOF: 25/11/2013).",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en lo establecido en la NOM-017-PESC-1994 (DOF: 25/11/2013).",
      avance: "Sin información",
    },
  ],
}

fichas["pac-huachinango-y-pargos-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "En el Pacífico mexicano se tienen registradas 10 especies de huachinangos y pargos (familia Lutjanidae), de las cuales 9 se presentan en la captura comercial. Todas se aprovechan en mayor o menor proporción, dependiendo de su abundancia poblacional y de la extensión de los caladeros de tipo rocoso donde habitan preferentemente los individuos adultos. Los juveniles y subadultos se crían en sistemas lagunares estuarinos y fondos arenosos.",
      "La pesquería se realiza a lo largo de todo el litoral, desde la costa oriental de Baja California y Sonora hasta Chiapas. Las áreas de pesca se localizan desde la línea costera hasta profundidades máximas promedio de 100 metros, en una franja de aproximadamente 5 a 20 millas náuticas de la costa. La actividad se lleva a cabo durante todo el año, en aproximadamente 200 a 250 días.",
    ],
    embarcaciones:
      "En la actividad pesquera se usan embarcaciones menores de fibra de vidrio con motor fuera de borda de entre 48 y 75 caballos de fuerza, y participan regularmente de 2 a 4 pescadores.",
    artesPesca:
      "Los principales artes de pesca son la línea de mano con anzuelo, la red agallera de fondo y el palangre escamero (cimbra). Las líneas de mano se operan por la noche o al amanecer; las cimbras y redes agalleras se operan en promedio de 10 a 12 horas de reposo en la zona de pesca.",
    especiesObjetivo: [
      { nombre: "Huachinango del Pacífico", cientifico: "Lutjanus peru" },
      { nombre: "Pargo lunarejo, flamenco", cientifico: "Lutjanus guttatus" },
      { nombre: "Pargo amarillo, coyotillo, alazán, clavellino", cientifico: "Lutjanus argentiventris" },
      { nombre: "Pargo colmillón o mulato", cientifico: "Lutjanus novemfasciatus" },
      { nombre: "Pargo colorado, pargo listoncillo", cientifico: "Lutjanus colorado" },
      { nombre: "Pargo rabirrubia", cientifico: "Lutjanus inermis" },
      { nombre: "Pargo azul-dorado, pargo rayado, sol de China", cientifico: "Lutjanus viridis" },
      { nombre: "Pargo coconaco, tecomate", cientifico: "Hoplopagrus guentherii" },
      { nombre: "Pargo raicero, pargo de manglar", cientifico: "Lutjanus aratus" },
    ],
    especiesAsociadas: [
      { nombre: "Cirujano aleta amarilla, barbero", cientifico: "Acanthurus xanthopterus" },
      { nombre: "Guaseta del Pacífico", cientifico: "Alphestes immaculatus" },
      { nombre: "Lija garrapatera, bota trompa", cientifico: "Aluterus scriptus" },
      { nombre: "Burro bacoco", cientifico: "Anisotremus interruptus" },
      { nombre: "Cochi, bota, pejepuerco", cientifico: "Balistes polylepis" },
      { nombre: "Mojarrón, pluma marotilla", cientifico: "Calamus brachysomus" },
      { nombre: "Jurel de hebra, cocinero", cientifico: "Carangoides otrynter" },
      { nombre: "Jurel toro", cientifico: "Caranx caninus" },
      { nombre: "Jurel voraz, ojo de perra", cientifico: "Caranx sexfasciatus" },
      { nombre: "Conejo, salmón, blanquillo", cientifico: "Caulolatilus affinis" },
      { nombre: "Mero guasa, cherna", cientifico: "Epinephelus itajara" },
      { nombre: "Cabrilla piedrera", cientifico: "Epinephelus labriformis" },
      { nombre: "Baqueta ploma", cientifico: "Epinephelus niphobles" },
      { nombre: "Enjambre, mero o pargo de piedra", cientifico: "Cephalopholis panamensis" },
      { nombre: "Cabrilla pinta, boba pinta", cientifico: "Epinephelus analogus" },
      { nombre: "Cabrilla loro", cientifico: "Paralabrax loro" },
      { nombre: "Gallinita", cientifico: "Paranthias colonus" },
      { nombre: "Ronco chano, burro", cientifico: "Haemulon flaviguttatum" },
      { nombre: "Burro rasposo", cientifico: "Haemulon maculicauda" },
      { nombre: "Burro almejero, guzga", cientifico: "Haemulon sexfasciatum" },
      { nombre: "Ronco boca dulce", cientifico: "Haemulon steindachneri" },
      { nombre: "Chopa o salema rayada", cientifico: "Sectator ocyurus" },
      { nombre: "Chopa rayada", cientifico: "Kyphosus analogus" },
      { nombre: "Chopa de Cortés, chopa gris", cientifico: "Kyphosus elegans" },
      { nombre: "Ronco rayado, sarangola", cientifico: "Microlepidotus brevipinnis" },
      { nombre: "Ronco rayadillo", cientifico: "Microlepidotus inornatus" },
      { nombre: "Ronco cocorvado", cientifico: "Pomadasys panamensis" },
      { nombre: "Baya", cientifico: "Mycteroperca jordani" },
      { nombre: "Cabrilla sardinera, mitán", cientifico: "Mycteroperca rosacea" },
      { nombre: "Burrito, ronco rayado", cientifico: "Orthopristis reddingi" },
      { nombre: "Cabrilla extranjera, lucero", cientifico: "Paralabrax auroguttatus" },
      { nombre: "Cabrilla de roca", cientifico: "Paralabrax maculatofasciatus" },
      { nombre: "Manta gavilán", cientifico: "Rhinoptera steindachneri" },
      { nombre: "Lapón, lupón, escorpión", cientifico: "Scorpaena mystes" },
      { nombre: "Medregal limón, medregal almaco", cientifico: "Seriola rivoliana" },
      { nombre: "Botete diana", cientifico: "Sphoeroides annulatus" },
      { nombre: "Cochi naranja, bota pejepuerco", cientifico: "Sufflamen verres" },
      { nombre: "Pámpano fino, pámpano rayado, palmilla", cientifico: "Trachinotus rhodopus" },
      { nombre: "Berrugata roncadora", cientifico: "Umbrina xanti" },
      { nombre: "Chula, jiguagua, salmonete", cientifico: "Xenichthys xanti" },
      { nombre: "Corvina azul, corvina aleta corta", cientifico: "Cynoscion parvipinnis" },
      { nombre: "Zopilote, peluquero, chabelito, chambo", cientifico: "Chaetodipterus zonatus" },
      { nombre: "Baqueta", cientifico: "Epinephelus acanthistius" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "En el Pacífico mexicano se aprovechan 9 de las 10 especies de huachinangos y pargos registradas de la familia Lutjanidae.",
      "La mayor disponibilidad, abundancia y vulnerabilidad del recurso se presenta en el periodo de diciembre a abril.",
      "En 2017 la captura alcanzó su máximo histórico, con Baja California (2,300 t) y Baja California Sur (1,750 t) a la cabeza.",
    ],
    // Figura 1A. Captura de huachinango y pargos en BC, BCS, SON, SIN y NAY, 1983–2020. Fuente: CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de huachinango y pargos en Baja California, BCS, Sonora, Sinaloa y Nayarit, 1983–2020 (CONAPESCA)",
        series: [
          {
            estado: "Baja California",
            color: "#e11d48",
            datos: [
              { año: 1983, captura: 300 },
              { año: 1985, captura: 550 },
              { año: 1987, captura: 350 },
              { año: 1989, captura: 350 },
              { año: 1991, captura: 550 },
              { año: 1993, captura: 800 },
              { año: 1995, captura: 700 },
              { año: 1997, captura: 800 },
              { año: 1999, captura: 1000 },
              { año: 2001, captura: 750 },
              { año: 2003, captura: 800 },
              { año: 2005, captura: 850 },
              { año: 2007, captura: 750 },
              { año: 2009, captura: 800 },
              { año: 2011, captura: 800 },
              { año: 2013, captura: 850 },
              { año: 2015, captura: 1400 },
              { año: 2017, captura: 2300 },
              { año: 2019, captura: 1700 },
              { año: 2020, captura: 1450 },
            ],
          },
          {
            estado: "Baja California Sur",
            color: "#0891b2",
            datos: [
              { año: 1983, captura: 150 },
              { año: 1985, captura: 200 },
              { año: 1987, captura: 150 },
              { año: 1989, captura: 150 },
              { año: 1991, captura: 200 },
              { año: 1993, captura: 250 },
              { año: 1995, captura: 250 },
              { año: 1997, captura: 300 },
              { año: 1999, captura: 300 },
              { año: 2001, captura: 250 },
              { año: 2003, captura: 300 },
              { año: 2005, captura: 350 },
              { año: 2007, captura: 300 },
              { año: 2009, captura: 350 },
              { año: 2011, captura: 350 },
              { año: 2013, captura: 400 },
              { año: 2015, captura: 900 },
              { año: 2017, captura: 1750 },
              { año: 2019, captura: 1350 },
              { año: 2020, captura: 1050 },
            ],
          },
          {
            estado: "Sonora",
            color: "#0d9488",
            datos: [
              { año: 1983, captura: 50 },
              { año: 1985, captura: 50 },
              { año: 1987, captura: 50 },
              { año: 1989, captura: 50 },
              { año: 1991, captura: 50 },
              { año: 1993, captura: 50 },
              { año: 1995, captura: 50 },
              { año: 1997, captura: 50 },
              { año: 1999, captura: 50 },
              { año: 2001, captura: 50 },
              { año: 2003, captura: 50 },
              { año: 2005, captura: 50 },
              { año: 2007, captura: 50 },
              { año: 2009, captura: 50 },
              { año: 2011, captura: 50 },
              { año: 2013, captura: 50 },
              { año: 2015, captura: 100 },
              { año: 2017, captura: 700 },
              { año: 2019, captura: 400 },
              { año: 2020, captura: 380 },
            ],
          },
          {
            estado: "Sinaloa",
            color: "#f59e0b",
            datos: [
              { año: 1983, captura: 150 },
              { año: 1985, captura: 250 },
              { año: 1987, captura: 150 },
              { año: 1989, captura: 150 },
              { año: 1991, captura: 200 },
              { año: 1993, captura: 300 },
              { año: 1995, captura: 250 },
              { año: 1997, captura: 350 },
              { año: 1999, captura: 350 },
              { año: 2001, captura: 300 },
              { año: 2003, captura: 350 },
              { año: 2005, captura: 400 },
              { año: 2007, captura: 350 },
              { año: 2009, captura: 400 },
              { año: 2011, captura: 350 },
              { año: 2013, captura: 400 },
              { año: 2015, captura: 700 },
              { año: 2017, captura: 1600 },
              { año: 2019, captura: 1200 },
              { año: 2020, captura: 1050 },
            ],
          },
          {
            estado: "Nayarit",
            color: "#8b5cf6",
            datos: [
              { año: 1983, captura: 150 },
              { año: 1985, captura: 200 },
              { año: 1987, captura: 150 },
              { año: 1989, captura: 150 },
              { año: 1991, captura: 200 },
              { año: 1993, captura: 300 },
              { año: 1995, captura: 250 },
              { año: 1997, captura: 300 },
              { año: 1999, captura: 300 },
              { año: 2001, captura: 250 },
              { año: 2003, captura: 300 },
              { año: 2005, captura: 350 },
              { año: 2007, captura: 300 },
              { año: 2009, captura: 350 },
              { año: 2011, captura: 300 },
              { año: 2013, captura: 350 },
              { año: 2015, captura: 600 },
              { año: 2017, captura: 1500 },
              { año: 2019, captura: 1050 },
              { año: 2020, captura: 700 },
            ],
          },
        ],
      },
      // Figura 1B. Captura de huachinango y pargos en JAL, COL, MICH, GRO, OAX y CHI, 1983–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de huachinango y pargos en Jalisco, Colima, Michoacán, Guerrero, Oaxaca y Chiapas, 1983–2020 (CONAPESCA)",
        series: [
          {
            estado: "Jalisco",
            color: "#e11d48",
            datos: [
              { año: 1983, captura: 150 },
              { año: 1985, captura: 150 },
              { año: 1987, captura: 200 },
              { año: 1989, captura: 200 },
              { año: 1991, captura: 250 },
              { año: 1993, captura: 250 },
              { año: 1995, captura: 200 },
              { año: 1997, captura: 150 },
              { año: 1999, captura: 150 },
              { año: 2001, captura: 150 },
              { año: 2003, captura: 150 },
              { año: 2005, captura: 150 },
              { año: 2007, captura: 150 },
              { año: 2009, captura: 150 },
              { año: 2011, captura: 150 },
              { año: 2013, captura: 150 },
              { año: 2015, captura: 150 },
              { año: 2017, captura: 200 },
              { año: 2019, captura: 200 },
              { año: 2020, captura: 200 },
            ],
          },
          {
            estado: "Colima",
            color: "#0891b2",
            datos: [
              { año: 1983, captura: 350 },
              { año: 1985, captura: 900 },
              { año: 1987, captura: 250 },
              { año: 1989, captura: 350 },
              { año: 1991, captura: 600 },
              { año: 1993, captura: 450 },
              { año: 1995, captura: 300 },
              { año: 1997, captura: 300 },
              { año: 1999, captura: 150 },
              { año: 2001, captura: 100 },
              { año: 2003, captura: 100 },
              { año: 2005, captura: 150 },
              { año: 2007, captura: 150 },
              { año: 2009, captura: 150 },
              { año: 2011, captura: 150 },
              { año: 2013, captura: 150 },
              { año: 2015, captura: 150 },
              { año: 2017, captura: 200 },
              { año: 2019, captura: 250 },
              { año: 2020, captura: 150 },
            ],
          },
          {
            estado: "Michoacán",
            color: "#0d9488",
            datos: [
              { año: 1983, captura: 150 },
              { año: 1985, captura: 200 },
              { año: 1987, captura: 250 },
              { año: 1989, captura: 300 },
              { año: 1991, captura: 350 },
              { año: 1993, captura: 350 },
              { año: 1995, captura: 300 },
              { año: 1997, captura: 250 },
              { año: 1999, captura: 200 },
              { año: 2001, captura: 200 },
              { año: 2003, captura: 250 },
              { año: 2005, captura: 300 },
              { año: 2007, captura: 300 },
              { año: 2009, captura: 350 },
              { año: 2011, captura: 350 },
              { año: 2013, captura: 350 },
              { año: 2015, captura: 400 },
              { año: 2017, captura: 450 },
              { año: 2019, captura: 450 },
              { año: 2020, captura: 350 },
            ],
          },
          {
            estado: "Guerrero",
            color: "#f59e0b",
            datos: [
              { año: 1983, captura: 400 },
              { año: 1985, captura: 2200 },
              { año: 1987, captura: 600 },
              { año: 1989, captura: 600 },
              { año: 1991, captura: 750 },
              { año: 1993, captura: 1650 },
              { año: 1995, captura: 750 },
              { año: 1997, captura: 950 },
              { año: 1999, captura: 300 },
              { año: 2001, captura: 200 },
              { año: 2003, captura: 250 },
              { año: 2005, captura: 400 },
              { año: 2007, captura: 400 },
              { año: 2009, captura: 400 },
              { año: 2011, captura: 400 },
              { año: 2013, captura: 500 },
              { año: 2015, captura: 550 },
              { año: 2017, captura: 850 },
              { año: 2019, captura: 1000 },
              { año: 2020, captura: 750 },
            ],
          },
          {
            estado: "Oaxaca",
            color: "#8b5cf6",
            datos: [
              { año: 1983, captura: 150 },
              { año: 1985, captura: 200 },
              { año: 1987, captura: 950 },
              { año: 1989, captura: 300 },
              { año: 1991, captura: 350 },
              { año: 1993, captura: 350 },
              { año: 1995, captura: 300 },
              { año: 1997, captura: 250 },
              { año: 1999, captura: 200 },
              { año: 2001, captura: 200 },
              { año: 2003, captura: 250 },
              { año: 2005, captura: 350 },
              { año: 2007, captura: 400 },
              { año: 2009, captura: 550 },
              { año: 2011, captura: 600 },
              { año: 2013, captura: 550 },
              { año: 2015, captura: 600 },
              { año: 2017, captura: 850 },
              { año: 2019, captura: 950 },
              { año: 2020, captura: 650 },
            ],
          },
          {
            estado: "Chiapas",
            color: "#64748b",
            datos: [
              { año: 1983, captura: 100 },
              { año: 1985, captura: 150 },
              { año: 1987, captura: 150 },
              { año: 1989, captura: 150 },
              { año: 1991, captura: 200 },
              { año: 1993, captura: 200 },
              { año: 1995, captura: 150 },
              { año: 1997, captura: 150 },
              { año: 1999, captura: 100 },
              { año: 2001, captura: 100 },
              { año: 2003, captura: 100 },
              { año: 2005, captura: 150 },
              { año: 2007, captura: 150 },
              { año: 2009, captura: 150 },
              { año: 2011, captura: 150 },
              { año: 2013, captura: 150 },
              { año: 2015, captura: 200 },
              { año: 2017, captura: 250 },
              { año: 2019, captura: 300 },
              { año: 2020, captura: 250 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Se ha observado que la temperatura y el alimento son las variables importantes que explican el comportamiento de las poblaciones de peces. La relación entre clorofila y temperatura es inversa: los valores más altos de clorofila a se encuentran en el periodo «frío», lo que indica un mayor enriquecimiento de nutrimentos y, por lo tanto, mayor productividad y disponibilidad de alimento para el huachinango. Por ello, la mayor disponibilidad, abundancia y vulnerabilidad del recurso se presenta en el periodo de diciembre a abril.",
    "Con base en lo anterior, un aumento en la temperatura del mar provocaría una disminución en la disponibilidad y abundancia del recurso, debido a la escasez del alimento, ya que las aguas cálidas son oligotróficas y pobres en nutrimentos. Esto ocasionaría que los organismos emigraran a otras zonas con condiciones más favorables, lo que sugiere que a menor temperatura del agua existen mejores condiciones para estas especies.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de escama marina.",
      sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Red de enmalle con luz de malla mínima de 10.16 centímetros (4 pulgadas) y al menos un encabalgado del 50%. Línea de mano con anzuelos del 7 y 8 (Mustad) o 12 y 13 noruego, 5 y 6 izquierdo, 9 y 10 derecho. Cimbras hasta con 250 anzuelos.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcación de tipo menor de máximo una tonelada (7.6 metros de eslora y 1.8 metros de manga), impulsada por motores fuera de borda de 48 a 75 caballos de fuerza.",
      sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion:
        "No existen permisos o concesiones específicas para pesca comercial de huachinango y pargos (amparado por el permiso de pesca comercial de escama marina en la región).",
      sustento: "",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal adyacentes a los estados de Baja California, Baja California Sur, Sonora, Sinaloa, Nayarit, Colima, Jalisco, Michoacán, Guerrero, Oaxaca y Chiapas, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
      sustento: "Permiso para pesca comercial.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Huachinango y pargos (familia Lutjanidae)",
        zona: "Litoral del Pacífico mexicano",
      },
    ],
    estrategia: "Tasa de aprovechamiento para mantener las poblaciones Aprovechadas al Máximo Sustentable.",
    tacticas: [
      "Control de esfuerzo pesquero",
      "Talla mínima de captura",
      "Regulaciones en las artes y método de pesca",
      "Suspensión de operaciones de pesca por área y/o tiempo",
      "Zonas de refugio pesquero",
      "Concesiones pesqueras",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo de pesca actual.",
      avance: "Sin información",
    },
    {
      recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Instrumentar programas de ordenamiento y manejo por zonas y/o regiones de pesca, conforme a lo previsto en la LGPAS.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Incluir en los permisos para pesca comercial las siguientes tallas mínimas de captura en longitud total: 35 a 39 cm para el huachinango del Pacífico (Lutjanus peru); 29 cm para el pargo flamenco o lunarejo (Lutjanus guttatus) y alazán (Lutjanus argentiventris); 36 cm para el pargo colorado o listoncillo (Lutjanus colorado); 45 cm para el pargo coconaco o tecomate (Hoplopagrus guentherii); 50 cm para el pargo colmillón o mulato (Lutjanus novemfasciatus).",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Respetar lo dispuesto en la Norma Oficial Mexicana NOM-064-SAG/PESC/SEMARNAT-2013, sobre sistemas, métodos y técnicas de captura prohibidos en la pesca en aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en lo previsto en la LGPAS y los instrumentos normativos aplicables.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-langostas-espinosas-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "En México existen cinco especies de langostas espinosas pertenecientes al género Panulirus; cuatro se presentan en el Pacífico: langosta roja (Panulirus interruptus); langosta azul, espinosa, de piedra, negra o pinta (Panulirus inflatus); langosta verde, güera, de playa o caribe (Panulirus gracilis); y langosta espinosa de las islas del Pacífico (Panulirus penicillatus).",
      "A lo largo del litoral, desde Sonora hasta Chiapas, la pesquería de langosta se compone principalmente de dos especies, Panulirus inflatus (langosta azul) y Panulirus gracilis (langosta verde), aunque se ha presentado una proporción insignificante de Panulirus penicillatus (langosta Revillagigedo) mezclada junto con la langosta azul en zonas insulares cercanas al continente que comparten el lecho marino de manera diferencial. Las zonas de captura se dividen en la región II, que comprende desde Sonora a Colima, y la región III, de Michoacán hasta Chiapas.",
    ],
    embarcaciones:
      "Se utilizan embarcaciones menores con motor fuera de borda de 45 a 75 caballos de fuerza. En los litorales de Jalisco, Michoacán y Guerrero se han autorizado permisos para pesca comercial con embarcaciones menores equipadas con un equipo básico de buceo mediante un compresor, del que se desprenden de una a dos mangueras de aproximadamente 100 metros de longitud.",
    artesPesca:
      "El arte de pesca autorizado es la trampa langostera, construida con tiras de madera y malla de alambre galvanizado o plástico. En la pesca por buceo, el arte de pesca consta de un gancho compuesto por una varilla de acero inoxidable de 1.0 a 1.50 metros, adaptado con un anzuelo regularmente entre el número 7 y 8.",
    especiesObjetivo: [
      { nombre: "Langosta azul o negra", cientifico: "Panulirus inflatus" },
      { nombre: "Langosta verde o güera", cientifico: "Panulirus gracilis" },
    ],
    especiesAsociadas: [
      { nombre: "Diablo (pez óseo)", cientifico: "Myripristis leiognathus" },
      { nombre: "Burro (pez óseo)", cientifico: "Orthopristis sp." },
      { nombre: "Tostón, chapeta (pez óseo)", cientifico: "Selene peruviana" },
      { nombre: "Ermitaño (crustáceo)", cientifico: "Paguristes sp." },
      { nombre: "Tractor (crustáceo)", cientifico: "Calappa convexa" },
      { nombre: "Cangrejo arenero (crustáceo)", cientifico: "Arenaeus mexicanus" },
      { nombre: "Caracol chino negro (molusco)", cientifico: "Hexaplex muricanthus" },
      { nombre: "Caracol chino negro (molusco)", cientifico: "Hexaplex nigritus" },
      { nombre: "Caracol chino rosa (molusco)", cientifico: "Hexaplex erythrostomus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "La pesquería del Pacífico se compone principalmente de langosta azul (Panulirus inflatus) y langosta verde (Panulirus gracilis).",
      "El esfuerzo nominal autorizado suma 225 embarcaciones, con Guerrero (65) y Jalisco (50) a la cabeza.",
      "La captura por buceo con gancho se autoriza en los litorales de Jalisco, Michoacán y Guerrero.",
    ],
    // Figura 1A. Captura de langosta en SON, SIN, NAY, JAL y COL, 2000–2020. Fuente: CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de langosta en Sonora, Sinaloa, Nayarit, Jalisco y Colima, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Sonora",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 22 },
              { año: 2001, captura: 20 },
              { año: 2002, captura: 15 },
              { año: 2003, captura: 20 },
              { año: 2004, captura: 40 },
              { año: 2005, captura: 20 },
              { año: 2006, captura: 3 },
              { año: 2007, captura: 10 },
              { año: 2008, captura: 10 },
              { año: 2009, captura: 10 },
              { año: 2010, captura: 8 },
              { año: 2011, captura: 8 },
              { año: 2012, captura: 10 },
              { año: 2013, captura: 28 },
              { año: 2014, captura: 8 },
              { año: 2015, captura: 33 },
              { año: 2016, captura: 33 },
              { año: 2017, captura: 33 },
              { año: 2018, captura: 38.9 },
              { año: 2019, captura: 22 },
              { año: 2020, captura: 15 },
            ],
          },
          {
            estado: "Sinaloa",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 25 },
              { año: 2001, captura: 25 },
              { año: 2002, captura: 20 },
              { año: 2003, captura: 20 },
              { año: 2004, captura: 35 },
              { año: 2005, captura: 40 },
              { año: 2006, captura: 30 },
              { año: 2007, captura: 45 },
              { año: 2008, captura: 20 },
              { año: 2009, captura: 33 },
              { año: 2010, captura: 18 },
              { año: 2011, captura: 33 },
              { año: 2012, captura: 22 },
              { año: 2013, captura: 45 },
              { año: 2014, captura: 22 },
              { año: 2015, captura: 45 },
              { año: 2016, captura: 71 },
              { año: 2017, captura: 65 },
              { año: 2018, captura: 18 },
              { año: 2019, captura: 28 },
              { año: 2020, captura: 28 },
            ],
          },
          {
            estado: "Nayarit",
            color: "#0d9488",
            datos: [
              { año: 2000, captura: 3 },
              { año: 2001, captura: 30 },
              { año: 2002, captura: 45 },
              { año: 2003, captura: 30 },
              { año: 2004, captura: 77 },
              { año: 2005, captura: 33 },
              { año: 2006, captura: 5 },
              { año: 2007, captura: 8 },
              { año: 2008, captura: 8 },
              { año: 2009, captura: 8 },
              { año: 2010, captura: 15 },
              { año: 2011, captura: 10 },
              { año: 2012, captura: 28 },
              { año: 2013, captura: 60 },
              { año: 2014, captura: 12 },
              { año: 2015, captura: 60 },
              { año: 2016, captura: 45 },
              { año: 2017, captura: 40 },
              { año: 2018, captura: 68 },
              { año: 2019, captura: 15 },
              { año: 2020, captura: 15 },
            ],
          },
          {
            estado: "Jalisco",
            color: "#f59e0b",
            datos: [
              { año: 2000, captura: 3 },
              { año: 2001, captura: 3 },
              { año: 2002, captura: 5 },
              { año: 2003, captura: 5 },
              { año: 2004, captura: 10 },
              { año: 2005, captura: 33 },
              { año: 2006, captura: 30 },
              { año: 2007, captura: 60 },
              { año: 2008, captura: 60 },
              { año: 2009, captura: 43 },
              { año: 2010, captura: 55 },
              { año: 2011, captura: 33 },
              { año: 2012, captura: 33 },
              { año: 2013, captura: 33 },
              { año: 2014, captura: 43 },
              { año: 2015, captura: 33 },
              { año: 2016, captura: 33 },
              { año: 2017, captura: 45 },
              { año: 2018, captura: 89.3 },
              { año: 2019, captura: 30 },
              { año: 2020, captura: 37 },
            ],
          },
          {
            estado: "Colima",
            color: "#8b5cf6",
            datos: [
              { año: 2000, captura: 0 },
              { año: 2001, captura: 0 },
              { año: 2002, captura: 0 },
              { año: 2003, captura: 0 },
              { año: 2004, captura: 0 },
              { año: 2005, captura: 0 },
              { año: 2006, captura: 0 },
              { año: 2007, captura: 0 },
              { año: 2008, captura: 0 },
              { año: 2009, captura: 0 },
              { año: 2010, captura: 0 },
              { año: 2011, captura: 0 },
              { año: 2012, captura: 0 },
              { año: 2013, captura: 0 },
              { año: 2014, captura: 0 },
              { año: 2015, captura: 0 },
              { año: 2016, captura: 0 },
              { año: 2017, captura: 0 },
              { año: 2018, captura: 0 },
              { año: 2019, captura: 5 },
              { año: 2020, captura: 5 },
            ],
          },
        ],
      },
      // Figura 1B. Captura de langosta en MICH, GRO y OAX, 2000–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de langosta en Michoacán, Guerrero y Oaxaca, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Michoacán",
            color: "#0d9488",
            datos: [
              { año: 2000, captura: 3 },
              { año: 2001, captura: 3 },
              { año: 2002, captura: 3 },
              { año: 2003, captura: 3 },
              { año: 2004, captura: 3 },
              { año: 2005, captura: 3 },
              { año: 2006, captura: 3 },
              { año: 2007, captura: 3 },
              { año: 2008, captura: 3 },
              { año: 2009, captura: 5 },
              { año: 2010, captura: 3 },
              { año: 2011, captura: 3 },
              { año: 2012, captura: 3 },
              { año: 2013, captura: 18 },
              { año: 2014, captura: 30 },
              { año: 2015, captura: 30 },
              { año: 2016, captura: 60 },
              { año: 2017, captura: 18 },
              { año: 2018, captura: 59.6 },
              { año: 2019, captura: 50 },
              { año: 2020, captura: 25 },
            ],
          },
          {
            estado: "Guerrero",
            color: "#f59e0b",
            datos: [
              { año: 2000, captura: 30 },
              { año: 2001, captura: 30 },
              { año: 2002, captura: 28 },
              { año: 2003, captura: 28 },
              { año: 2004, captura: 25 },
              { año: 2005, captura: 25 },
              { año: 2006, captura: 22 },
              { año: 2007, captura: 30 },
              { año: 2008, captura: 57 },
              { año: 2009, captura: 40 },
              { año: 2010, captura: 55 },
              { año: 2011, captura: 30 },
              { año: 2012, captura: 22 },
              { año: 2013, captura: 20 },
              { año: 2014, captura: 30 },
              { año: 2015, captura: 102.1 },
              { año: 2016, captura: 30 },
              { año: 2017, captura: 20 },
              { año: 2018, captura: 40 },
              { año: 2019, captura: 25 },
              { año: 2020, captura: 25 },
            ],
          },
          {
            estado: "Oaxaca",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 5 },
              { año: 2001, captura: 8 },
              { año: 2002, captura: 15.6 },
              { año: 2003, captura: 5 },
              { año: 2004, captura: 5 },
              { año: 2005, captura: 5 },
              { año: 2006, captura: 3 },
              { año: 2007, captura: 3 },
              { año: 2008, captura: 3 },
              { año: 2009, captura: 5 },
              { año: 2010, captura: 5 },
              { año: 2011, captura: 3 },
              { año: 2012, captura: 3 },
              { año: 2013, captura: 3 },
              { año: 2014, captura: 8 },
              { año: 2015, captura: 8 },
              { año: 2016, captura: 8 },
              { año: 2017, captura: 5 },
              { año: 2018, captura: 10 },
              { año: 2019, captura: 10 },
              { año: 2020, captura: 8 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "En el ámbito general, en la langosta australiana (Jasus edwardsii) se ha observado un efecto negativo en respuesta al incremento de la temperatura marina, al disminuir su tasa de captura, comportamiento observado también en otras especies de langostas marinas.",
    "En el ámbito local, en la langosta roja (Panulirus interruptus) se ha observado sincronización entre el ambiente y la reproducción, principalmente con la temperatura superficial del mar y las surgencias costeras, acortándose la maduración y eclosión con temperaturas cálidas y prolongándose con temperaturas frías. Asimismo, existe una relación inversa entre la temperatura superficial del mar y las surgencias, que afecta la magnitud del asentamiento, el cual tiene una relación directa con la captura comercial en años posteriores. El monitoreo del asentamiento de postlarvas de langosta roja entre 2010 y 2018 refiere que este coincide con el debilitamiento de surgencias costeras y el calentamiento estacional del mar.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-006-SAG/PESC-2016, para regular el aprovechamiento de todas las especies de langosta en las aguas de jurisdicción federal del Golfo de México y Mar Caribe, así como del Océano Pacífico incluyendo el Golfo de California.",
      sustento: "DOF: 07/09/2016.",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de langosta.",
      sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "Océano Pacífico, incluyendo el Golfo de California (Sonora, Sinaloa, Nayarit, Jalisco y Colima): langosta azul (Panulirus inflatus) 82.5 mm de longitud de cefalotórax, equivalente a una longitud abdominal de 175 mm para hembras y 160 mm para machos; langosta insular (Panulirus penicillatus) 82.5 mm de longitud de cefalotórax; langosta verde (Panulirus gracilis) 82.5 mm de longitud de cefalotórax, equivalente a una longitud abdominal de 175 mm para hembras y 160 mm para machos. Para Michoacán, Guerrero, Oaxaca y Chiapas: langosta azul 75.0 mm y langosta verde 75.0 mm de longitud de cefalotórax.",
      sustento: "Numeral 4.2.2 de la NOM-006-SAG/PESC-2016 (DOF: 07/09/2016).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Trampas langosteras con ventana de escape; obligación de revisar las trampas dentro de las 72 horas como máximo, después de su calado.",
      sustento: "Numerales 4.3.2 y 4.5.3 de la NOM-006-SAG/PESC-2016 (DOF: 07/09/2016).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Se mantiene la veda temporal para la captura de langosta azul (Panulirus inflatus), langosta verde (Panulirus gracilis) y langosta insular (Panulirus penicillatus) del 1 de julio al 30 de octubre de cada año, en aguas de jurisdicción federal del Golfo de California, dentro de una franja comprendida entre las cero y las cien brazas de profundidad, a lo largo de los litorales de Sonora y Sinaloa, así como en las aguas de jurisdicción federal del Océano Pacífico, desde Nayarit hasta el estado de Chiapas, en la frontera con la República de Guatemala.",
      sustento:
        "Acuerdo por el que se modifican las épocas y zonas de veda de la langosta azul (Panulirus inflatus), langosta verde (P. gracilis) y langosta roja (P. interruptus) en aguas de jurisdicción federal del Océano Pacífico, incluyendo el Golfo de California (DOF: 31/08/2005).",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcación menor de hasta 10.5 metros de eslora, provista de motor estacionario o fuera de borda con una potencia nominal máxima de 115 caballos de fuerza, transportando de 2 a 3 pescadores.",
      sustento:
        "Numeral 4.3.2.1 de la NOM-006-SAG/PESC-2016 (DOF: 07/09/2016). Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "Sonora: 31 embarcaciones. Sinaloa: 38 embarcaciones. Nayarit: 2 embarcaciones. Jalisco: 50 embarcaciones. Colima: 4 embarcaciones. Michoacán: 35 embarcaciones. Guerrero: 65 embarcaciones.",
      sustento:
        "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "En aguas de jurisdicción federal del Golfo de California y del Océano Pacífico.",
      sustento: "Permiso para pesca comercial.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Langosta azul y verde (Panulirus inflatus, Panulirus gracilis)",
        zona: "Sinaloa, Jalisco, Michoacán, Oaxaca y Guerrero",
      },
      {
        categoria: "Con potencial de desarrollo",
        color: "green",
        especie: "Langosta azul y verde (Panulirus inflatus, Panulirus gracilis)",
        zona: "Sonora, Nayarit y Colima",
      },
    ],
    estrategia: "Tasa de aprovechamiento para mantener la población Aprovechada al Máximo Sustentable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Talla mínima de captura",
      "Protección de hembras ovígeras",
      "Veda reproductiva temporal por región",
      "Regulación del arte y método de pesca",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Con base en lo previsto en la LGPAS y en la NOM-006-SAG/PESC-2016, no incrementar el esfuerzo de pesca actual en las entidades que se encuentran al Máximo Sustentable.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "En las zonas con Potencial de Desarrollo, la autorización de nuevos permisos se resolverá conforme a los resultados de los estudios y opiniones técnicas del INAPESCA.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Instrumentar programas de ordenamiento y manejo por zonas y/o regiones de pesca, conforme a lo previsto en la LGPAS y en la NOM-006-SAG/PESC-2016.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Actualizar la talla mínima de captura de las langostas azul y verde en la NOM-006-SAG/PESC-2016, así como los artes y métodos de pesca, conforme a los estudios y opiniones técnicas que para tal efecto emita el INAPESCA.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en lo previsto en la LGPAS y en la NOM-006-SAG/PESC-2016.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-lisa-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "Las lisas pertenecen a la familia Mugilidae, del orden Mugiliformes. En México reciben los nombres comunes de lisa, liseta, lebrancha, lisa blanca, lisa criolla, lisa cabezuda y lisa macho. Se distribuyen en ambas costas de América y en el Pacífico americano se extienden desde el Golfo de California hasta Chile.",
      "Son especies bentónicas de plataforma que viven sobre fondos fangosos en lagunas salobres y estuarios; a veces penetran en los ríos, pero son típicamente marinas a lo largo de las costas arenosas y en pozas litorales, bahías y lagunas costeras, donde pasan gran parte de su vida. La pesquería de las lisas se sitúa dentro de las lagunas costeras y de la línea costera de todos los estados del Pacífico mexicano. Son especies tropicales y subtropicales.",
    ],
    embarcaciones:
      "En la captura se utilizan embarcaciones menores que permanecen cerca de la línea costera y principalmente dentro de las bahías y lagunas costeras.",
    artesPesca: "Los principales artes de pesca son redes agalleras y atarrayas.",
    especiesObjetivo: [
      { nombre: "Lisa rayada, cabezuda, lisa macho", cientifico: "Mugil cephalus" },
      { nombre: "Lisa blanca, liseta, lebrancha", cientifico: "Mugil setosus (antes curema)" },
      { nombre: "Lisa hospe", cientifico: "Mugil hospes" },
    ],
    especiesAsociadas: [
      { nombre: "Agujón californiano", cientifico: "Strongylura exilis" },
      { nombre: "Anchoveta, anchoa chicotera", cientifico: "Anchoa ischana" },
      { nombre: "Barbudo seis barbas", cientifico: "Polydactylus approximans" },
      { nombre: "Berrugata", cientifico: "Menticirrhus undulatus" },
      { nombre: "Botete diana", cientifico: "Sphoeroides annulatus" },
      { nombre: "Burrito corcovado", cientifico: "Orthopristis chalceus" },
      { nombre: "Burrito rayado", cientifico: "Orthopristis reddingi" },
      { nombre: "Chihuil", cientifico: "Ariopsis guatemalensis" },
      { nombre: "Chivo rayado", cientifico: "Mulloidichthys dentatus" },
      { nombre: "Chivo, chivato, salmonete", cientifico: "Pseudupeneus grandisquamis" },
      { nombre: "Chocho, jurel chumbo", cientifico: "Hemicaranx zelotes" },
      { nombre: "Chula, jiguagua, salmonete", cientifico: "Xenichthys xanti" },
      { nombre: "Cocinero, jurel bonito", cientifico: "Carangoides caballus" },
      { nombre: "Corvina azul", cientifico: "Cynoscion parvipinnis" },
      { nombre: "Corvineta bizca", cientifico: "Ophioscion strabo" },
      { nombre: "Gualajo", cientifico: "Centropomus armatus" },
      { nombre: "Jorobado escamoso, tostón", cientifico: "Selene brevoortii" },
      { nombre: "Jurel", cientifico: "Carangoides vinctus" },
      { nombre: "Jurel de castilla, casabe", cientifico: "Chloroscombrus orqueta" },
      { nombre: "Machete del Pacífico", cientifico: "Elops affinis" },
      { nombre: "Mojarra aletas amarillas, mojarra china, malacapa", cientifico: "Diapterus brevirostris" },
      { nombre: "Mojarra bandera, mojarra rayada", cientifico: "Gerres simillimus" },
      { nombre: "Mojarra charrita", cientifico: "Eucinostomus currani" },
      { nombre: "Mojarra palometa", cientifico: "Diapterus aureolus" },
      { nombre: "Mojarra tricolor", cientifico: "Eucinostomus gracilis" },
      { nombre: "Piña bocona", cientifico: "Oligoplites altus" },
      { nombre: "Quijo, macabí, chile, banana", cientifico: "Albula nemoptera" },
      { nombre: "Robalo aleta amarilla, constantino, robalito", cientifico: "Centropomus robalito" },
      { nombre: "Robalo prieto", cientifico: "Centropomus nigrescens" },
      { nombre: "Ronco mapache", cientifico: "Pomadasys panamensis" },
      { nombre: "Ronco roncacho", cientifico: "Haemulopsis leuciscus" },
      { nombre: "Sabalote", cientifico: "Chanos chanos" },
      { nombre: "Sardina bocona, boquerón", cientifico: "Cetengraulis mysticetus" },
      { nombre: "Sardina crinuda", cientifico: "Opisthonema libertate" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "La pesquería de lisa se desarrolla dentro de las lagunas costeras y a lo largo de la línea costera de todos los estados del Pacífico mexicano.",
      "Sinaloa es el estado con la mayor captura de lisa, con cerca de 3,150 toneladas en 2020.",
      "El esfuerzo nominal autorizado suma 78 embarcaciones, concentradas en Baja California Sur (30), Sonora (18), Baja California (16) y Colima (12).",
    ],
    // Figura 1A. Captura de lisa en BC, BCS y SON, 1980–2020. Fuente: CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de lisa en Baja California, Baja California Sur y Sonora, 1980–2020 (CONAPESCA)",
        series: [
          {
            estado: "Baja California Sur",
            color: "#e11d48",
            datos: [
              { año: 1980, captura: 0 },
              { año: 1985, captura: 0 },
              { año: 1988, captura: 1080 },
              { año: 1990, captura: 650 },
              { año: 1995, captura: 600 },
              { año: 2000, captura: 350 },
              { año: 2005, captura: 550 },
              { año: 2010, captura: 500 },
              { año: 2015, captura: 650 },
              { año: 2018, captura: 500 },
              { año: 2020, captura: 500 },
            ],
          },
          {
            estado: "Sonora",
            color: "#0891b2",
            datos: [
              { año: 1980, captura: 0 },
              { año: 1985, captura: 0 },
              { año: 1988, captura: 350 },
              { año: 1990, captura: 350 },
              { año: 1995, captura: 300 },
              { año: 2000, captura: 200 },
              { año: 2005, captura: 250 },
              { año: 2010, captura: 200 },
              { año: 2015, captura: 150 },
              { año: 2018, captura: 100 },
              { año: 2020, captura: 150 },
            ],
          },
          {
            estado: "Baja California",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 0 },
              { año: 1985, captura: 0 },
              { año: 1988, captura: 50 },
              { año: 1990, captura: 50 },
              { año: 1995, captura: 50 },
              { año: 2000, captura: 50 },
              { año: 2005, captura: 50 },
              { año: 2010, captura: 50 },
              { año: 2015, captura: 50 },
              { año: 2018, captura: 50 },
              { año: 2020, captura: 50 },
            ],
          },
        ],
      },
      // Figura 1B. Captura de lisa en SIN y NAY, 1980–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de lisa en Sinaloa y Nayarit, 1980–2020 (CONAPESCA)",
        series: [
          {
            estado: "Sinaloa",
            color: "#e11d48",
            datos: [
              { año: 1980, captura: 600 },
              { año: 1985, captura: 650 },
              { año: 1988, captura: 2900 },
              { año: 1990, captura: 950 },
              { año: 1995, captura: 1350 },
              { año: 2000, captura: 1700 },
              { año: 2005, captura: 2100 },
              { año: 2010, captura: 2450 },
              { año: 2015, captura: 2650 },
              { año: 2018, captura: 3100 },
              { año: 2020, captura: 3150 },
            ],
          },
          {
            estado: "Nayarit",
            color: "#0891b2",
            datos: [
              { año: 1980, captura: 450 },
              { año: 1985, captura: 400 },
              { año: 1988, captura: 450 },
              { año: 1990, captura: 450 },
              { año: 1995, captura: 450 },
              { año: 2000, captura: 400 },
              { año: 2005, captura: 350 },
              { año: 2010, captura: 300 },
              { año: 2015, captura: 300 },
              { año: 2018, captura: 250 },
              { año: 2020, captura: 250 },
            ],
          },
        ],
      },
      // Figura 1C. Captura de lisa en JAL, COL y MICH, 1980–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de lisa en Jalisco, Colima y Michoacán, 1980–2020 (CONAPESCA)",
        series: [
          {
            estado: "Jalisco",
            color: "#e11d48",
            datos: [
              { año: 1980, captura: 150 },
              { año: 1985, captura: 850 },
              { año: 1988, captura: 150 },
              { año: 1990, captura: 600 },
              { año: 1995, captura: 200 },
              { año: 2000, captura: 150 },
              { año: 2005, captura: 150 },
              { año: 2010, captura: 150 },
              { año: 2015, captura: 100 },
              { año: 2018, captura: 200 },
              { año: 2020, captura: 350 },
            ],
          },
          {
            estado: "Colima",
            color: "#0891b2",
            datos: [
              { año: 1980, captura: 80 },
              { año: 1985, captura: 100 },
              { año: 1988, captura: 100 },
              { año: 1990, captura: 120 },
              { año: 1995, captura: 850 },
              { año: 2000, captura: 100 },
              { año: 2005, captura: 80 },
              { año: 2010, captura: 80 },
              { año: 2015, captura: 80 },
              { año: 2018, captura: 100 },
              { año: 2020, captura: 120 },
            ],
          },
          {
            estado: "Michoacán",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 40 },
              { año: 1985, captura: 40 },
              { año: 1988, captura: 40 },
              { año: 1990, captura: 50 },
              { año: 1995, captura: 50 },
              { año: 2000, captura: 50 },
              { año: 2005, captura: 40 },
              { año: 2010, captura: 40 },
              { año: 2015, captura: 40 },
              { año: 2018, captura: 50 },
              { año: 2020, captura: 50 },
            ],
          },
        ],
      },
      // Figura 1D. Captura de lisa en GRO, OAX y CHI, 1980–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de lisa en Guerrero, Oaxaca y Chiapas, 1980–2020 (CONAPESCA)",
        series: [
          {
            estado: "Guerrero",
            color: "#f59e0b",
            datos: [
              { año: 1980, captura: 100 },
              { año: 1985, captura: 200 },
              { año: 1988, captura: 300 },
              { año: 1990, captura: 300 },
              { año: 1995, captura: 300 },
              { año: 2000, captura: 300 },
              { año: 2005, captura: 350 },
              { año: 2010, captura: 400 },
              { año: 2015, captura: 600 },
              { año: 2018, captura: 2000 },
              { año: 2020, captura: 4950 },
            ],
          },
          {
            estado: "Oaxaca",
            color: "#8b5cf6",
            datos: [
              { año: 1980, captura: 100 },
              { año: 1985, captura: 300 },
              { año: 1988, captura: 2150 },
              { año: 1990, captura: 900 },
              { año: 1995, captura: 500 },
              { año: 2000, captura: 400 },
              { año: 2005, captura: 350 },
              { año: 2010, captura: 300 },
              { año: 2015, captura: 350 },
              { año: 2018, captura: 500 },
              { año: 2020, captura: 600 },
            ],
          },
          {
            estado: "Chiapas",
            color: "#64748b",
            datos: [
              { año: 1980, captura: 100 },
              { año: 1985, captura: 150 },
              { año: 1988, captura: 200 },
              { año: 1990, captura: 200 },
              { año: 1995, captura: 200 },
              { año: 2000, captura: 200 },
              { año: 2005, captura: 200 },
              { año: 2010, captura: 200 },
              { año: 2015, captura: 250 },
              { año: 2018, captura: 300 },
              { año: 2020, captura: 350 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "A nivel general, la temperatura es una de las variables que afectan la distribución, abundancia, crecimiento y reproducción de los peces, aunque no es la única, ya que el alimento es otra variable importante. Se conoce que un aumento en la temperatura del mar favorece condiciones de disminución en la disponibilidad y abundancia del recurso, debido a la escasez del alimento, ya que las aguas cálidas son oligotróficas y pobres en nutrimentos, lo que ocasionaría que los organismos emigraran a otras zonas con condiciones más favorables.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-016-SAG/PESC-2014, para regular la pesca de lisa y liseta o lebrancha en aguas de jurisdicción federal del Golfo de México y Mar Caribe, así como del Océano Pacífico, incluyendo el Golfo de California.",
      sustento: "DOF: 29/07/2015.",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de lisa.",
      sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "30 centímetros de longitud total para la lisa. 28 centímetros de longitud total para la liseta o lebrancha.",
      sustento: "Numeral 4.2.1 de la NOM-016-SAG/PESC-2014 (DOF: 29/07/2015).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Redes agalleras. En las aguas de jurisdicción federal del litoral del Océano Pacífico, incluyendo el Golfo de California, la luz de malla será de 80 milímetros (3 1/2 pulgadas) como mínimo para la captura de lisa, y de 71 milímetros (2 3/4 pulgadas) como mínimo para la captura de liseta o lebrancha.",
      sustento: "Numerales 4.3, 4.3.1 y 4.4 de la NOM-016-SAG/PESC-2014 (DOF: 29/07/2015).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Lebrancha o liseta (Mugil curema): del 1 de abril al 30 de junio en Baja California, Baja California Sur, Sonora, Sinaloa, Nayarit y Jalisco; del 15 de mayo al 15 de julio en Colima, Michoacán, Guerrero, Oaxaca y Chiapas. Lisa (Mugil cephalus): del 1 de diciembre al 31 de enero en Baja California, Baja California Sur, Sonora, Sinaloa, Nayarit y Jalisco; del 1 de noviembre al 31 de diciembre en Colima, Michoacán, Guerrero, Oaxaca y Chiapas.",
      sustento:
        "Aviso por el que se da a conocer el establecimiento de épocas y zonas de veda para la pesca de diferentes especies de la fauna acuática en aguas de jurisdicción federal de los Estados Unidos Mexicanos (DOF: 16/03/1994).",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores equipadas con un motor fuera de borda con potencia de hasta 55.95 kilowatts (equivalente a 75 caballos de fuerza).",
      sustento:
        "Numeral 4.4 de la NOM-016-SAG/PESC-2014 (DOF: 29/07/2015). Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "Baja California: 16 embarcaciones. Baja California Sur: 30 embarcaciones. Sonora: 18 embarcaciones. Sinaloa: 2 embarcaciones. Colima: 12 embarcaciones.",
      sustento:
        "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal y lagunas costeras del litoral del Océano Pacífico mexicano definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
      sustento: "Permiso para pesca comercial.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Lisa (Mugilidae)",
        zona: "Baja California Sur, Sinaloa, Nayarit, Jalisco, Colima y Chiapas",
      },
      {
        categoria: "En deterioro",
        color: "red",
        especie: "Lisa (Mugilidae)",
        zona: "Baja California, Sonora, Guerrero y Oaxaca",
      },
    ],
    estrategia: "Tasa de aprovechamiento para mantener las poblaciones Aprovechadas al Máximo Sustentable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Talla mínima de captura",
      "Veda reproductiva temporal fija",
      "Regulación del arte y método de pesca",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Con base en lo previsto en la LGPAS y en la NOM-016-SAG/PESC-2014, no incrementar el esfuerzo de pesca actual.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Instrumentar programas de ordenamiento y manejo por zonas y/o regiones de pesca, conforme a lo previsto en la LGPAS y en la NOM-016-SAG/PESC-2014.",
      avance: "Sin información",
    },
    { recomendacion: "Actualizar la NOM-016-SAG/PESC-2014.", avance: "Sin información" },
    {
      recomendacion: "Actualizar los periodos de veda por región, previa opinión técnica del INAPESCA.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Respetar lo dispuesto en la NOM-064-SAG/PESC/SEMARNAT-2013, sobre sistemas, métodos y técnicas de captura prohibidos en la pesca en aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en lo previsto en la LGPAS y en la NOM-016-SAG/PESC-2014.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-ostion-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "El ostión de roca (Crassostrea iridescens) se caracteriza por presentar una concha pesada, gruesa y escamosa, de color café obscuro a rojizo en el exterior, con el interior de color nácar brillante de lustre metálico; su forma es ovado-alargada longitudinalmente. El ostión de placer (Crassostrea corteziensis) presenta una concha de forma variable, alargada-ovalada y más alta que larga.",
      "Los ostiones son organismos que habitan tanto en el mar como en zonas litorales, sobre rocas expuestas al oleaje en la zona intermareal, y en esteros, desembocaduras de río o lagunas costeras. Es un recurso de importancia comercial regional y nacional, tanto pesquera como acuícola, debido a la demanda para consumo humano, su alto valor nutritivo y su clasificación como producto de primera calidad. La pesquería presenta diversas características de producción, esfuerzo pesquero y grado de especialización, además de factores fisiográficos y climáticos propios de cada región.",
    ],
    embarcaciones:
      "Se utilizan embarcaciones menores de fibra de vidrio con capacidad de 1 a 2 toneladas, propulsadas a remo o con motores fuera de borda de 40 a 75 caballos de fuerza. Participan dos o tres pescadores (un motorista y dos pescantes).",
    artesPesca:
      "Para la colecta se utiliza una barra de acero (de 50 centímetros de longitud terminada en una o dos puntas) para desprenderlos de las rocas y depositarlos en cámaras inflables, costales o arpillas, mediante buceo a pulmón o libre con equipo básico a profundidades de 2 a 8 metros.",
    especiesObjetivo: [
      { nombre: "Ostión de roca", cientifico: "Crassostrea iridescens, o Striostrea prismatica" },
      { nombre: "Ostión de placer o de Cortés", cientifico: "Crassostrea corteziensis" },
    ],
    especiesAsociadas: [
      { nombre: "Langosta azul", cientifico: "Panulirus inflatus" },
      { nombre: "Langosta verde o playera", cientifico: "Panulirus gracilis" },
      { nombre: "Pulpo", cientifico: "Octopus hubbsorum" },
      { nombre: "Callo margarita", cientifico: "Chama buddiana" },
      { nombre: "Almeja burra", cientifico: "Spondylus calcifer" },
      { nombre: "Lapa", cientifico: "Lottia gigantea" },
      { nombre: "Mejillón", cientifico: "Mytella strigata" },
      { nombre: "Lora", cientifico: "Scarus perrico" },
      { nombre: "Pargos", cientifico: "Lutjanus spp." },
    ],
  },
  indicadores: {
    datosDestacados: [
      "Nayarit es, con amplio margen, el principal estado productor de ostión del Pacífico, con picos de 5,150 toneladas en 2017 y 5,250 toneladas en 2020.",
      "El esfuerzo nominal autorizado suma 487 embarcaciones, con Sinaloa (138) y Guerrero (111) a la cabeza.",
      "La captura del ostión de roca se ve favorecida por el fenómeno de La Niña, cuando las aguas translúcidas y el oleaje menor mejoran el rendimiento del buceo.",
    ],
    // Figura 1. Tendencia de la captura de ostión, 2000–2020. Fuente: CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de ostión en el Pacífico por estado, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Nayarit",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 1230 },
              { año: 2001, captura: 1300 },
              { año: 2002, captura: 1100 },
              { año: 2003, captura: 1000 },
              { año: 2004, captura: 1150 },
              { año: 2005, captura: 1000 },
              { año: 2006, captura: 950 },
              { año: 2007, captura: 1350 },
              { año: 2008, captura: 1450 },
              { año: 2009, captura: 1400 },
              { año: 2010, captura: 1150 },
              { año: 2011, captura: 2050 },
              { año: 2012, captura: 3250 },
              { año: 2013, captura: 2600 },
              { año: 2014, captura: 2650 },
              { año: 2015, captura: 2600 },
              { año: 2016, captura: 3200 },
              { año: 2017, captura: 5150 },
              { año: 2018, captura: 1900 },
              { año: 2019, captura: 1300 },
              { año: 2020, captura: 5250 },
            ],
          },
          {
            estado: "Sinaloa",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 1200 },
              { año: 2001, captura: 1150 },
              { año: 2002, captura: 1000 },
              { año: 2003, captura: 700 },
              { año: 2004, captura: 1050 },
              { año: 2005, captura: 950 },
              { año: 2006, captura: 800 },
              { año: 2007, captura: 850 },
              { año: 2008, captura: 750 },
              { año: 2009, captura: 450 },
              { año: 2010, captura: 400 },
              { año: 2011, captura: 350 },
              { año: 2012, captura: 400 },
              { año: 2013, captura: 350 },
              { año: 2014, captura: 400 },
              { año: 2015, captura: 500 },
              { año: 2016, captura: 550 },
              { año: 2017, captura: 500 },
              { año: 2018, captura: 450 },
              { año: 2019, captura: 400 },
              { año: 2020, captura: 500 },
            ],
          },
          {
            estado: "Guerrero",
            color: "#f59e0b",
            datos: [
              { año: 2000, captura: 100 },
              { año: 2001, captura: 150 },
              { año: 2002, captura: 100 },
              { año: 2003, captura: 100 },
              { año: 2004, captura: 150 },
              { año: 2005, captura: 150 },
              { año: 2006, captura: 150 },
              { año: 2007, captura: 200 },
              { año: 2008, captura: 250 },
              { año: 2009, captura: 300 },
              { año: 2010, captura: 450 },
              { año: 2011, captura: 500 },
              { año: 2012, captura: 550 },
              { año: 2013, captura: 600 },
              { año: 2014, captura: 850 },
              { año: 2015, captura: 900 },
              { año: 2016, captura: 2000 },
              { año: 2017, captura: 1050 },
              { año: 2018, captura: 1000 },
              { año: 2019, captura: 700 },
              { año: 2020, captura: 350 },
            ],
          },
          {
            estado: "Baja California Sur",
            color: "#0d9488",
            datos: [
              { año: 2000, captura: 400 },
              { año: 2001, captura: 350 },
              { año: 2002, captura: 300 },
              { año: 2003, captura: 250 },
              { año: 2004, captura: 350 },
              { año: 2005, captura: 300 },
              { año: 2006, captura: 250 },
              { año: 2007, captura: 300 },
              { año: 2008, captura: 350 },
              { año: 2009, captura: 200 },
              { año: 2010, captura: 150 },
              { año: 2011, captura: 100 },
              { año: 2012, captura: 80 },
              { año: 2013, captura: 60 },
              { año: 2014, captura: 50 },
              { año: 2015, captura: 40 },
              { año: 2016, captura: 30 },
              { año: 2017, captura: 25 },
              { año: 2018, captura: 20 },
              { año: 2019, captura: 15 },
              { año: 2020, captura: 20 },
            ],
          },
          {
            estado: "Jalisco",
            color: "#8b5cf6",
            datos: [
              { año: 2000, captura: 40 },
              { año: 2001, captura: 40 },
              { año: 2002, captura: 40 },
              { año: 2003, captura: 40 },
              { año: 2004, captura: 40 },
              { año: 2005, captura: 40 },
              { año: 2006, captura: 40 },
              { año: 2007, captura: 40 },
              { año: 2008, captura: 40 },
              { año: 2009, captura: 40 },
              { año: 2010, captura: 40 },
              { año: 2011, captura: 40 },
              { año: 2012, captura: 40 },
              { año: 2013, captura: 40 },
              { año: 2014, captura: 40 },
              { año: 2015, captura: 40 },
              { año: 2016, captura: 40 },
              { año: 2017, captura: 40 },
              { año: 2018, captura: 40 },
              { año: 2019, captura: 40 },
              { año: 2020, captura: 40 },
            ],
          },
          {
            estado: "Michoacán",
            color: "#64748b",
            datos: [
              { año: 2000, captura: 60 },
              { año: 2001, captura: 60 },
              { año: 2002, captura: 55 },
              { año: 2003, captura: 55 },
              { año: 2004, captura: 55 },
              { año: 2005, captura: 50 },
              { año: 2006, captura: 50 },
              { año: 2007, captura: 50 },
              { año: 2008, captura: 50 },
              { año: 2009, captura: 45 },
              { año: 2010, captura: 45 },
              { año: 2011, captura: 45 },
              { año: 2012, captura: 40 },
              { año: 2013, captura: 40 },
              { año: 2014, captura: 40 },
              { año: 2015, captura: 40 },
              { año: 2016, captura: 35 },
              { año: 2017, captura: 35 },
              { año: 2018, captura: 35 },
              { año: 2019, captura: 35 },
              { año: 2020, captura: 35 },
            ],
          },
          {
            estado: "Oaxaca",
            color: "#a16207",
            datos: [
              { año: 2000, captura: 30 },
              { año: 2001, captura: 30 },
              { año: 2002, captura: 30 },
              { año: 2003, captura: 30 },
              { año: 2004, captura: 30 },
              { año: 2005, captura: 30 },
              { año: 2006, captura: 30 },
              { año: 2007, captura: 30 },
              { año: 2008, captura: 30 },
              { año: 2009, captura: 30 },
              { año: 2010, captura: 30 },
              { año: 2011, captura: 30 },
              { año: 2012, captura: 30 },
              { año: 2013, captura: 30 },
              { año: 2014, captura: 30 },
              { año: 2015, captura: 30 },
              { año: 2016, captura: 30 },
              { año: 2017, captura: 30 },
              { año: 2018, captura: 30 },
              { año: 2019, captura: 30 },
              { año: 2020, captura: 30 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "La captura del ostión de roca en las costas de Nayarit, Jalisco, Michoacán y Guerrero se ha visto favorecida por el fenómeno de La Niña, dado que la temperatura del mar se mantiene en condiciones estables, propiciando mayor supervivencia y fijación de larvas en el sustrato rocoso. Las anomalías positivas de temperatura favorecen la madurez anticipada en las hembras, con mayor disponibilidad de alimento, mientras que las anomalías negativas tienden a retrasar el proceso de desarrollo.",
    "Existen mayores probabilidades de obtener capturas superiores a la tasa promedio cuando las condiciones marinas son favorables para la pesca, debido a que el oleaje es menor y se presentan aguas translúcidas, condición que el buzo busca para tener mejores rendimientos. Por el contrario, en años El Niño predominan las inclemencias climáticas por tormentas tropicales y/o huracanes, factores que reducen los días de pesca y la actividad pesquera.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de ostión.",
      sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Buceo a pulmón o libre con equipo básico (aleta, visor) y colecta manual con barra de acero, a profundidad de 2 a 8 metros, utilizando arpilla o cámaras inflables donde se depositan las capturas, con capacidad de 20 a 40 kilogramos.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Ostión de placer (Crassostrea corteziensis): del 15 de julio al 15 de noviembre en el Golfo de California y el Océano Pacífico, exceptuando las aguas al sur de Teacapán, Sinaloa (ecosistema lagunar Teacapán-Agua Brava), donde va del 15 de julio al 15 de febrero del año siguiente. Ostión de piedra (Crassostrea iridescens): del 1 de junio al 31 de agosto desde Sinaloa hasta Chiapas, con periodos y zonas específicas en Guerrero (Pie de la Cuesta a Playa Revolcadero, Bahía de Acapulco y Puerto Marqués).",
      sustento:
        "Acuerdos que modifican el aviso del 16/03/1994 sobre épocas y zonas de veda: ostión de placer (DOF: 29/11/2013) y ostión de piedra (DOF: 29/09/2015).",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcación menor de 7 a 8.5 metros de eslora, con motor fuera de borda de 40 a 75 caballos de fuerza. En cada embarcación operan dos o tres pescadores (un motorista y dos pescantes). Para la colecta se utiliza una barra de acero (50 centímetros de longitud terminada en una o dos puntas) para desprenderlos de las rocas y depositarlos en cámaras inflables, costales o arpillas.",
      sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "Baja California Sur: 25 embarcaciones. Sinaloa: 138 embarcaciones. Nayarit: 89 embarcaciones. Jalisco: 45 embarcaciones. Colima: 9 embarcaciones. Michoacán: 38 embarcaciones. Guerrero: 111 embarcaciones. Oaxaca: 32 embarcaciones.",
      sustento:
        "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal y sistemas lagunares de las entidades federativas del Pacífico mexicano, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
      sustento:
        "Permiso para pesca comercial, Decretos de Declaración de Áreas Naturales Protegidas y Zonas de Refugio Pesquero.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Ostión (Crassostrea spp.)",
        zona: "Nayarit, Michoacán y Guerrero",
      },
      {
        categoria: "Con potencial de desarrollo",
        color: "green",
        especie: "Ostión (Crassostrea spp.)",
        zona: "Isla Magdalena (Baja California Sur) y Jalisco",
      },
      {
        categoria: "Indeterminado",
        color: "gray",
        especie: "Ostión (Crassostrea spp.)",
        zona: "Baja California, resto de Baja California Sur, Sinaloa y Colima",
      },
    ],
    estrategia: "Tasa de aprovechamiento para mantener las poblaciones Aprovechadas al Máximo Sustentable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Talla mínima de captura",
      "Veda reproductiva",
      "Zona de refugio pesquero",
      "Cuota de captura",
      "Rotación de bancos",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo de pesca que ya se aplica en las poblaciones de ostión Aprovechadas al Máximo Sustentable en Nayarit, Michoacán y Guerrero.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "En las zonas con estatus Indeterminado, el número de embarcaciones se definirá en función de la disponibilidad del recurso por zona, previa evaluación y opinión del INAPESCA, considerando criterios de rentabilidad y administración del recurso definidos por la Autoridad Pesquera.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "En las zonas con estatus Con Potencial de Desarrollo, la autorización de nuevos permisos se resolverá conforme a los resultados de los estudios y opiniones técnicas del INAPESCA.",
      avance: "Sin información",
    },
    {
      recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Instrumentar programas de ordenamiento y manejo por sistema lagunar y/o áreas definidas, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
      avance: "Sin información",
    },
    { recomendacion: "Establecer un programa de rotación de bancos.", avance: "Sin información" },
    {
      recomendacion:
        "Establecer cuotas de captura por día por pescador y días de pesca a la semana, bajo un esquema de co-manejo y corresponsabilidad con las organizaciones y pescadores de cada zona, región o banco.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en lo previsto en la LGPAS y los instrumentos normativos aplicables.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Con el fin de garantizar la seguridad de los buzos, limitar las actividades de buceo a profundidades menores de 30 metros, análogo a lo establecido en la NOM-014-SAG/PESC-2015, apartado 4.11, inciso e.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-robalo-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "Los robalos pertenecen a la familia Centropomidae y están distribuidos a lo largo de las aguas costeras tropicales de América. Son habitantes de ecosistemas estuarinos y costeros, con gran tolerancia a las fluctuaciones de salinidad, por lo que se consideran eurihalinos. Habitan sobre fondos de arena, fango y grava en bahías, esteros, lagunas costeras y partes inferiores de ríos y quebradas de aguas dulces con manglares de las zonas tropicales del continente americano.",
      "Las estadísticas de captura sitúan al robalo en la costa de todos los estados del Pacífico mexicano; sin embargo, las especies de la familia Centropomidae son tropicales y, cuando la temperatura ambiental aumenta, la distribución de los robalos se presenta en Baja California, Baja California Sur y Sonora. Las principales zonas de captura son lagunas costeras, esteros, estuarios, desembocaduras de ríos, bahías y costas.",
    ],
    embarcaciones:
      "La captura del robalo se realiza mediante embarcaciones menores de tipo panga o canoa, construidas de madera o fibra de vidrio, propulsadas por remos y motores fuera de borda, generalmente de baja potencia, menores a 25 caballos de fuerza. La tripulación se compone de 2 a 3 pescadores que dedican en promedio 5 horas a cada viaje de pesca.",
    artesPesca:
      "Las redes de enmalle superficiales de diferentes dimensiones son el arte de pesca más común y, en menor predominancia, la piola.",
    especiesObjetivo: [
      { nombre: "Robalo espina larga", cientifico: "Centropomus armatus" },
      { nombre: "Robalo aleta prieta, carapanda, huite o paleta", cientifico: "Centropomus medius" },
      { nombre: "Robalo prieto, piedra o neto", cientifico: "Centropomus nigrescens" },
      { nombre: "Robalo aleta amarilla, constantino, sireque, chucumite o huela", cientifico: "Centropomus robalito" },
      { nombre: "Robalo plateado, robalo blanco, hocicudo o garabato", cientifico: "Centropomus viridis" },
    ],
    especiesAsociadas: [
      { nombre: "Agujón californiano", cientifico: "Strongylura exilis" },
      { nombre: "Bagre chihuil, tacazonte", cientifico: "Bagre panamensis" },
      { nombre: "Bagre tete o cuatete", cientifico: "Ariopsis seemanni" },
      { nombre: "Barbilla amarilla", cientifico: "Polydactylus opercularis" },
      { nombre: "Barbilla blanca", cientifico: "Polydactylus approximans" },
      { nombre: "Barracuda mexicana o buzo", cientifico: "Sphyraena ensis" },
      { nombre: "Berrugata", cientifico: "Micropogonias ectenes" },
      { nombre: "Berrugata roncadora", cientifico: "Umbrina xanti" },
      { nombre: "Burrito corcovado", cientifico: "Orthopristis chalceus" },
      { nombre: "Burro almejero, guzga", cientifico: "Haemulon sexfasciatum" },
      { nombre: "Burro bacoco", cientifico: "Anisotremus interruptus" },
      { nombre: "Burro labio morado, bocadulce", cientifico: "Haemulopsis elongatus" },
      { nombre: "Burro rasposo", cientifico: "Haemulon maculicauda" },
      { nombre: "Cabrilla pinta", cientifico: "Epinephelus analogus" },
      { nombre: "Chile", cientifico: "Elops affinis" },
      { nombre: "Chivo", cientifico: "Pseudupeneus grandisquamis" },
      { nombre: "Chocho, jurel chumbo", cientifico: "Hemicaranx zelotes" },
      { nombre: "Chula, jiguagua, salmonete", cientifico: "Xenichthys xanti" },
      { nombre: "Cirujano aleta amarilla, barbero", cientifico: "Acanthurus xanthopterus" },
      { nombre: "Cocinero, jurel bonito", cientifico: "Caranx caballus" },
      { nombre: "Corvineta bizca", cientifico: "Ophioscion strabo" },
      { nombre: "Jorobado mexicano, tostón", cientifico: "Selene brevoortii" },
      { nombre: "Jurel de castilla, casabe", cientifico: "Chloroscombrus orqueta" },
      { nombre: "Jurel toro", cientifico: "Caranx caninus" },
      { nombre: "Jurel voraz, ojo de perra", cientifico: "Caranx sexfasciatus" },
      { nombre: "Lisa o liseta", cientifico: "Mugil setosus (curema)" },
      { nombre: "Lisa cabezuda o lisa macho", cientifico: "Mugil cephalus" },
      { nombre: "Macabí", cientifico: "Albula vulpes" },
      { nombre: "Malacapa", cientifico: "Diapterus brevirostris" },
      { nombre: "Mojarra bandera o rayada", cientifico: "Gerres simillimus" },
      { nombre: "Mojarra cantileña o blanca", cientifico: "Eucinostomus dowii" },
      { nombre: "Mojarrón, mojarra de altura", cientifico: "Calamus brachysomus" },
      { nombre: "Pámpano fino, rayado o palmilla", cientifico: "Trachinotus rhodopus" },
      { nombre: "Pargo coconaco, tecomate", cientifico: "Hoplopagrus guentherii" },
      { nombre: "Pargo mulato", cientifico: "Lutjanus novemfasciatus" },
      { nombre: "Piña delgada", cientifico: "Oligoplites saurus" },
      { nombre: "Sábalo", cientifico: "Chanos chanos" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "Cuando la temperatura ambiental aumenta, la distribución de los robalos se extiende hacia Baja California, Baja California Sur y Sonora.",
      "Nayarit ha sido históricamente el principal productor, con un pico de 1,250 toneladas en 2017.",
      "La temperatura superficial del mar explicó el 48% de la variabilidad de la captura por unidad de esfuerzo, con una tendencia negativa.",
    ],
    // Figura 1A. Captura de robalo en BC, BCS y SON, 2000–2020. Fuente: CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de robalo en Baja California, Baja California Sur y Sonora, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Sonora",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 10 },
              { año: 2005, captura: 10 },
              { año: 2010, captura: 15 },
              { año: 2015, captura: 15 },
              { año: 2018, captura: 15 },
              { año: 2019, captura: 15 },
              { año: 2020, captura: 196 },
            ],
          },
          {
            estado: "Baja California",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 5 },
              { año: 2005, captura: 5 },
              { año: 2010, captura: 10 },
              { año: 2015, captura: 10 },
              { año: 2018, captura: 10 },
              { año: 2019, captura: 10 },
              { año: 2020, captura: 10 },
            ],
          },
          {
            estado: "Baja California Sur",
            color: "#0d9488",
            datos: [
              { año: 2000, captura: 5 },
              { año: 2005, captura: 10 },
              { año: 2010, captura: 15 },
              { año: 2015, captura: 15 },
              { año: 2018, captura: 15 },
              { año: 2019, captura: 15 },
              { año: 2020, captura: 15 },
            ],
          },
        ],
      },
      // Figura 1B. Captura de robalo en SIN y NAY, 2000–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de robalo en Sinaloa y Nayarit, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Nayarit",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 350 },
              { año: 2002, captura: 350 },
              { año: 2004, captura: 350 },
              { año: 2006, captura: 300 },
              { año: 2008, captura: 350 },
              { año: 2010, captura: 400 },
              { año: 2012, captura: 650 },
              { año: 2014, captura: 850 },
              { año: 2016, captura: 1100 },
              { año: 2017, captura: 1250 },
              { año: 2018, captura: 1200 },
              { año: 2019, captura: 700 },
              { año: 2020, captura: 150 },
            ],
          },
          {
            estado: "Sinaloa",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 150 },
              { año: 2002, captura: 150 },
              { año: 2004, captura: 150 },
              { año: 2006, captura: 150 },
              { año: 2008, captura: 170 },
              { año: 2010, captura: 200 },
              { año: 2012, captura: 250 },
              { año: 2014, captura: 300 },
              { año: 2016, captura: 400 },
              { año: 2017, captura: 450 },
              { año: 2018, captura: 500 },
              { año: 2019, captura: 606 },
              { año: 2020, captura: 180 },
            ],
          },
        ],
      },
      // Figura 1C. Captura de robalo en JAL, COL y MICH, 2000–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de robalo en Jalisco, Colima y Michoacán, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Jalisco",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 20 },
              { año: 2002, captura: 25 },
              { año: 2004, captura: 30 },
              { año: 2006, captura: 35 },
              { año: 2008, captura: 40 },
              { año: 2010, captura: 50 },
              { año: 2012, captura: 60 },
              { año: 2014, captura: 80 },
              { año: 2016, captura: 100 },
              { año: 2018, captura: 171 },
              { año: 2019, captura: 120 },
              { año: 2020, captura: 90 },
            ],
          },
          {
            estado: "Colima",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 15 },
              { año: 2002, captura: 20 },
              { año: 2004, captura: 25 },
              { año: 2006, captura: 30 },
              { año: 2008, captura: 40 },
              { año: 2010, captura: 50 },
              { año: 2012, captura: 70 },
              { año: 2014, captura: 105 },
              { año: 2016, captura: 90 },
              { año: 2018, captura: 100 },
              { año: 2019, captura: 80 },
              { año: 2020, captura: 60 },
            ],
          },
          {
            estado: "Michoacán",
            color: "#0d9488",
            datos: [
              { año: 2000, captura: 15 },
              { año: 2002, captura: 18 },
              { año: 2004, captura: 20 },
              { año: 2006, captura: 22 },
              { año: 2008, captura: 25 },
              { año: 2010, captura: 30 },
              { año: 2012, captura: 40 },
              { año: 2014, captura: 50 },
              { año: 2016, captura: 80 },
              { año: 2018, captura: 100 },
              { año: 2019, captura: 150 },
              { año: 2020, captura: 637 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Los aumentos y disminuciones en las capturas de robalos (Centropomus spp.) reflejan cambios ambientales estacionales y por efecto de El Niño y La Niña. Los años de poca lluvia también afectan la reproducción, ya que en las lagunas costeras que se cierran se necesitan lluvias fuertes para que se abran las bocas y los machos puedan salir de las lagunas para reunirse con las hembras que viven en el mar. Se ha analizado la correlación de la temperatura superficial del mar con la captura por unidad de esfuerzo del robalo, encontrando una tendencia negativa, donde la temperatura superficial del mar explicó el 48% de la variabilidad.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-060-SAG/PESC-2016, pesca responsable en cuerpos de aguas continentales dulceacuícolas de jurisdicción de los Estados Unidos Mexicanos. NOM-064-SAG/PESC/SEMARNAT-2013, sobre sistemas, métodos y técnicas de captura prohibidos en la pesca en aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
      sustento: "DOF: 19/09/2016 y DOF: 21/01/2015.",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Acuerdo por el que se expide el Plan de Manejo Pesquero de robalo garabato (Centropomus viridis), pargo colorado (Lutjanus colorado) y curvinas en Marismas Nacionales, Nayarit y sur de Sinaloa.",
      sustento: "DOF: 12/04/2021.",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de escama marina.",
      sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Para las especies de la familia Centropomidae (robalos y chucumite): redes de enmalle de hilo monofilamento o multifilamento de nylon u otra poliamida, con diámetro mínimo de 0.3 milímetros, luz de malla mínima de 127.0 milímetros (5 pulgadas), longitud máxima de 50 metros, caída máxima de 5 metros (50 mallas) y un encabalgado mínimo del 50%. La operación no podrá exceder las doce horas continuas durante un día, y los artes deberán revisarse al menos una vez cada doce horas.",
      sustento: "Numerales 4.2.2.1 y 4.2.9, Fracción I (inciso f) de la NOM-060-SAG/PESC-2016 (DOF: 19/09/2016).",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores con eslora máxima total de 10.5 metros sin cubierta corrida y con motor fuera de borda de hasta 55.95 kilovatios (75 caballos de fuerza), o sin motor. Redes de enmalle con las especificaciones señaladas para el arte de pesca autorizado.",
      sustento:
        "Numerales 4.2.1 y 4.2.2.1, Fracción I (inciso f) de la NOM-060-SAG/PESC-2016 (DOF: 19/09/2016). Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion:
        "No existen permisos o concesiones específicas para pesca comercial de robalo (amparado por el permiso de pesca comercial de escama marina o estuarina en la región).",
      sustento: "",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal adyacentes a los estados de Baja California, Baja California Sur, Sonora, Sinaloa, Nayarit, Colima, Jalisco, Michoacán, Guerrero, Oaxaca y Chiapas, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
      sustento: "Permiso para pesca comercial.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Robalo (Centropomus spp.)",
        zona: "Litoral del Pacífico mexicano",
      },
    ],
    estrategia: "Tasa de aprovechamiento para mantener las poblaciones Aprovechadas al Máximo Sustentable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Talla mínima de captura",
      "Regulación del arte de pesca",
      "Veda reproductiva temporal",
      "Zonas de refugio pesquero",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Con base en lo previsto en la LGPAS y en la NOM-060-SAG/PESC-2016, no incrementar el esfuerzo de pesca actual.",
      avance: "Sin información",
    },
    {
      recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento pesquero del recurso.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Instrumentar programas de ordenamiento y manejo para el robalo en el Pacífico mexicano, conforme a lo previsto en la LGPAS y en la NOM-060-SAG/PESC-2016.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en lo previsto en la LGPAS y en la NOM-060-SAG/PESC-2016.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Respetar lo dispuesto en la NOM-064-SAG/PESC/SEMARNAT-2013, sobre sistemas, métodos y técnicas de captura prohibidos en la pesca en aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
      avance: "Sin información",
    },
    { recomendacion: "Realizar estudios para regular el arte de pesca.", avance: "Sin información" },
  ],
}

fichas["pac-sierra-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "La sierra (Scomberomorus sierra) presenta una distribución tropical y subtropical, desde el sur de California hasta Chile, incluyendo las islas Galápagos. En cambio, la sierra del Golfo (Scomberomorus concolor) es una especie endémica del norte del Golfo de California. La sierra forma cardúmenes y se reproduce muy cerca de la costa a lo largo de su intervalo de distribución, habitando en las zonas costeras cercanas a la superficie.",
    ],
    embarcaciones: "Para su captura se utilizan embarcaciones menores con motor fuera de borda, con dos tripulantes a bordo.",
    artesPesca:
      "Los artes de pesca utilizados son la red de enmalle (chinchorro agallero) de diferentes longitudes y tamaños de malla, con hilo de nylon monofilamento que varía entre 0.30 y 0.55 milímetros; también se utiliza el curricán, la piola y el anzuelo. El recurso se pesca a lo largo de todo el litoral del Pacífico mexicano.",
    especiesObjetivo: [
      { nombre: "Sierra del Pacífico", cientifico: "Scomberomorus sierra" },
      { nombre: "Sierra del Golfo", cientifico: "Scomberomorus concolor" },
    ],
    especiesAsociadas: [
      { nombre: "Chopa salema o zulema", cientifico: "Sectator ocyurus" },
      { nombre: "Papagayo", cientifico: "Nematistius pectoralis" },
      { nombre: "Medregal limón o almaco", cientifico: "Seriola rivoliana" },
      { nombre: "Medregal fortuno", cientifico: "Seriola peruana" },
      { nombre: "Pámpano paloma", cientifico: "Trachinotus paitensis" },
      { nombre: "Pámpano fino o rayado", cientifico: "Trachinotus rhodopus" },
      { nombre: "Pámpano toro", cientifico: "Trachinotus kennedyi" },
      { nombre: "Charrito", cientifico: "Trachurus symmetricus" },
      { nombre: "Chavela", cientifico: "Peprilus snyderi" },
      { nombre: "Barracuda mexicana", cientifico: "Sphyraena ensis" },
      { nombre: "Barracuda", cientifico: "Sphyraena lucasana" },
      { nombre: "Macarela, jurel mexicano, plátano", cientifico: "Oligoplites altus" },
      { nombre: "Cocinero, jurel bonito", cientifico: "Carangoides caballus" },
      { nombre: "Medregal cola amarilla", cientifico: "Seriola lalandi" },
      { nombre: "Mojarra pollo", cientifico: "Eucinostomus dowii" },
      { nombre: "Barrilete negro", cientifico: "Euthynnus lineatus" },
      { nombre: "Barrilete listado", cientifico: "Katsuwonus pelamis" },
      { nombre: "Bonito del Pacífico oriental", cientifico: "Sarda chiliensis" },
      { nombre: "Chula, bonita", cientifico: "Sarda orientalis" },
      { nombre: "Curvina blanca", cientifico: "Atractoscion nobilis" },
      { nombre: "Curvina azul, aleta corta", cientifico: "Cynoscion parvipinnis" },
      { nombre: "Curvina golfina", cientifico: "Cynoscion othonopterus" },
      { nombre: "Curvina rayada", cientifico: "Cynoscion reticulatus" },
      { nombre: "Curvina plateada", cientifico: "Isopisthus remifer" },
      { nombre: "Lisa rayada o cabezona", cientifico: "Mugil cephalus" },
      { nombre: "Mojarrón, pluma marotilla, mojarra mueluda", cientifico: "Calamus brachysomus" },
      { nombre: "Curvina berrugata", cientifico: "Micropogonias altipinnis" },
      { nombre: "Berrugata", cientifico: "Umbrina xanti" },
      { nombre: "Rayadillo", cientifico: "Orthopristis chalceus" },
      { nombre: "Burrito rayado", cientifico: "Orthopristis reddingi" },
      { nombre: "Ronco blanco", cientifico: "Haemulon flaviguttatum" },
      { nombre: "Pargo lunarejo", cientifico: "Lutjanus guttatus" },
      { nombre: "Melva, bonito", cientifico: "Auxis thazard" },
      { nombre: "Melvera", cientifico: "Auxis rochei" },
      { nombre: "Chano norteño", cientifico: "Micropogonias megalops" },
      { nombre: "Macarela estornino", cientifico: "Scomber japonicus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "La sierra se pesca a lo largo de todo el litoral del Pacífico mexicano, con Baja California y Sonora como principales productores.",
      "En 2017 Baja California alcanzó un pico de 3,520 toneladas.",
      "La mayor disponibilidad, abundancia y vulnerabilidad del recurso se presenta en el periodo de noviembre a abril.",
    ],
    // Figura 1A. Captura de sierra en BC y BCS, 2000–2020. Fuente: CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de sierra en Baja California y Baja California Sur, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Baja California",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 400 },
              { año: 2002, captura: 250 },
              { año: 2004, captura: 300 },
              { año: 2006, captura: 700 },
              { año: 2007, captura: 1900 },
              { año: 2008, captura: 2000 },
              { año: 2009, captura: 2200 },
              { año: 2010, captura: 2400 },
              { año: 2011, captura: 2700 },
              { año: 2012, captura: 2050 },
              { año: 2013, captura: 2100 },
              { año: 2014, captura: 2050 },
              { año: 2015, captura: 2050 },
              { año: 2016, captura: 2500 },
              { año: 2017, captura: 3520 },
              { año: 2018, captura: 900 },
              { año: 2019, captura: 2600 },
              { año: 2020, captura: 2800 },
            ],
          },
          {
            estado: "Baja California Sur",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 90 },
              { año: 2002, captura: 150 },
              { año: 2004, captura: 200 },
              { año: 2006, captura: 500 },
              { año: 2007, captura: 750 },
              { año: 2008, captura: 800 },
              { año: 2009, captura: 850 },
              { año: 2010, captura: 900 },
              { año: 2011, captura: 950 },
              { año: 2012, captura: 1000 },
              { año: 2013, captura: 700 },
              { año: 2014, captura: 650 },
              { año: 2015, captura: 600 },
              { año: 2016, captura: 600 },
              { año: 2017, captura: 1350 },
              { año: 2018, captura: 500 },
              { año: 2019, captura: 1000 },
              { año: 2020, captura: 1300 },
            ],
          },
        ],
      },
      // Figura 1B. Captura de sierra en SON y SIN/NAY, 2000–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de sierra en Sonora y Sinaloa/Nayarit, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Sonora",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 2100 },
              { año: 2002, captura: 2300 },
              { año: 2004, captura: 3000 },
              { año: 2006, captura: 3300 },
              { año: 2008, captura: 3300 },
              { año: 2010, captura: 3600 },
              { año: 2012, captura: 2000 },
              { año: 2014, captura: 2600 },
              { año: 2016, captura: 3300 },
              { año: 2018, captura: 1900 },
              { año: 2020, captura: 2700 },
            ],
          },
          {
            estado: "Sinaloa/Nayarit",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 950 },
              { año: 2002, captura: 700 },
              { año: 2004, captura: 750 },
              { año: 2006, captura: 850 },
              { año: 2008, captura: 700 },
              { año: 2010, captura: 1000 },
              { año: 2012, captura: 550 },
              { año: 2014, captura: 750 },
              { año: 2016, captura: 900 },
              { año: 2018, captura: 650 },
              { año: 2020, captura: 850 },
            ],
          },
        ],
      },
      // Figura 1D. Captura de sierra en GRO, OAX y CHI, 2000–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de sierra en Guerrero, Oaxaca y Chiapas, 2000–2020 (CONAPESCA)",
        series: [
          {
            estado: "Guerrero",
            color: "#e11d48",
            datos: [
              { año: 2000, captura: 5 },
              { año: 2003, captura: 10 },
              { año: 2005, captura: 150 },
              { año: 2007, captura: 190 },
              { año: 2009, captura: 180 },
              { año: 2011, captura: 220 },
              { año: 2013, captura: 200 },
              { año: 2015, captura: 260 },
              { año: 2017, captura: 230 },
              { año: 2019, captura: 20 },
              { año: 2020, captura: 200 },
            ],
          },
          {
            estado: "Oaxaca",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 5 },
              { año: 2003, captura: 60 },
              { año: 2005, captura: 100 },
              { año: 2007, captura: 130 },
              { año: 2009, captura: 100 },
              { año: 2011, captura: 150 },
              { año: 2013, captura: 170 },
              { año: 2015, captura: 200 },
              { año: 2017, captura: 150 },
              { año: 2019, captura: 100 },
              { año: 2020, captura: 180 },
            ],
          },
          {
            estado: "Chiapas",
            color: "#0d9488",
            datos: [
              { año: 2000, captura: 0.5 },
              { año: 2003, captura: 10 },
              { año: 2005, captura: 50 },
              { año: 2007, captura: 90 },
              { año: 2009, captura: 100 },
              { año: 2011, captura: 130 },
              { año: 2013, captura: 150 },
              { año: 2015, captura: 170 },
              { año: 2017, captura: 100 },
              { año: 2019, captura: 200 },
              { año: 2020, captura: 220 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Se ha observado que la temperatura y el alimento son las variables importantes que explican el comportamiento de las poblaciones de peces. La relación entre clorofila y temperatura es inversa: los valores más altos de clorofila a se encuentran en el periodo «frío», lo que indica un mayor enriquecimiento de nutrimentos y, por lo tanto, mayor productividad y disponibilidad de alimento para la sierra. Por ello, la mayor disponibilidad, abundancia y vulnerabilidad se presenta en el periodo de noviembre a abril. Un aumento en la temperatura del mar provocaría una disminución en la disponibilidad y abundancia del recurso, ya que las aguas cálidas son oligotróficas y pobres en nutrimentos, lo que sugiere que las temperaturas menores presentan condiciones favorables para la especie.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso para pesca comercial de escama marina.",
      sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "Sierra del Pacífico (Scomberomorus sierra): 50 centímetros de longitud total, excepto en Sonora, donde es de 40 centímetros de longitud total.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Red de enmalle con apertura de malla de 3 1/2 pulgadas (88.9 milímetros), excepto en Sonora, con 3 pulgadas de apertura de malla (75 milímetros). Encierro y curricán.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcación menor con motor fuera de borda, con dos tripulantes a bordo.",
      sustento: "Dictamen técnico del INAPESCA. Artículo 4, Sección XVII de la LGPAS (DOF: 19/01/2023).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: false,
      disposicion:
        "No existen permisos o concesiones específicas para pesca comercial de sierra (amparado por el permiso de pesca comercial de escama marina en la región).",
      sustento: "",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal adyacentes a los estados de Baja California, Baja California Sur, Sonora, Sinaloa, Nayarit, Colima, Jalisco, Michoacán, Guerrero, Oaxaca y Chiapas, definidas en los permisos de pesca comercial, respetando los lineamientos de los Programas de Manejo de las Áreas Naturales Protegidas y Zonas de Refugio Pesquero publicadas en el DOF.",
      sustento: "Permiso para pesca comercial.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Sierra (Scomberomorus spp.)",
        zona: "Litoral del Pacífico mexicano",
      },
    ],
    estrategia: "Tasa de aprovechamiento para mantener la población al Aprovechamiento Máximo Sustentable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Talla mínima legal",
      "Regulación del arte y método de pesca",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Con base en lo previsto en la LGPAS y los instrumentos normativos aplicables, no incrementar el esfuerzo de pesca que ya se aplica a la población de sierra en el Pacífico mexicano.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Publicar mediante Acuerdo regulatorio la talla mínima de sierra (Scomberomorus sierra) de 50 centímetros de longitud total y, para Sonora, de 40 centímetros de longitud total.",
      avance: "Sin información",
    },
    {
      recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.",
      avance: "Sin información",
    },
    {
      recomendacion: "Realizar estudios para regular el arte de pesca y la protección del periodo reproductivo.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Instrumentar programas de ordenamiento y manejo para la sierra en el Pacífico mexicano, conforme a lo previsto en la LGPAS y los instrumentos normativos aplicables.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de bitácoras de pesca, con base en lo previsto en la LGPAS y los instrumentos normativos aplicables.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-tiburones-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "La pesca de tiburones es una de las actividades de mayor importancia social y económica en México, no solo por la generación de alimento y empleos para el sector pesquero involucrado directamente en su captura, sino también por las actividades conexas como el comercio y distribución de los productos y subproductos pesqueros, y las reparaciones y venta de embarcaciones, motores y materiales para la pesca. La pesca se realiza en la Zona Económica Exclusiva de México en el Océano Pacífico, incluyendo el Golfo de California, y en ocasiones en zonas aledañas a la Zona Económica Exclusiva.",
    ],
    embarcaciones:
      "La pesquería de tiburón en el Pacífico mexicano presenta actualmente tres unidades de pesca con artes de características distintas: embarcaciones de altura, embarcaciones de mediana altura y embarcaciones menores. Para las embarcaciones de mediana altura la captura se permite fuera de una franja de 15–20 millas náuticas, y para las embarcaciones menores está permitida fuera de una franja costera de 10 millas náuticas.",
    especiesObjetivo: [
      { nombre: "Tiburón azul", cientifico: "Prionace glauca" },
      { nombre: "Tiburón mako de aletas cortas o alecrín", cientifico: "Isurus oxyrinchus" },
      { nombre: "Tiburón zorro pelágico", cientifico: "Alopias pelagicus" },
      { nombre: "Tiburón zorro, coludo", cientifico: "Alopias vulpinus" },
      { nombre: "Tiburón zorro ojón, zorro de anteojos", cientifico: "Alopias superciliosus" },
      { nombre: "Cornuda o tiburón martillo común", cientifico: "Sphyrna lewini" },
      { nombre: "Cornuda prieta", cientifico: "Sphyrna zygaena" },
      { nombre: "Tiburón sedoso o tunero", cientifico: "Carcharhinus falciformis" },
      { nombre: "Tiburón zarco", cientifico: "Carcharhinus galapagensis" },
      { nombre: "Tiburón vitamínico", cientifico: "Galeorhinus galeus" },
      { nombre: "Tiburón volador", cientifico: "Carcharhinus limbatus" },
      { nombre: "Cazón bironche o coyotillo", cientifico: "Rhizoprionodon longurio" },
      { nombre: "Tiburón cueroduro", cientifico: "Carcharhinus porosus" },
      { nombre: "Tiburón gata", cientifico: "Ginglymostoma unami" },
      { nombre: "Tiburón tigre", cientifico: "Galeocerdo cuvier" },
      { nombre: "Cornuda gigante", cientifico: "Sphyrna mokarran" },
      { nombre: "Tiburón chato o toro", cientifico: "Carcharhinus leucas" },
      { nombre: "Cazón mamón", cientifico: "Mustelus henlei" },
      { nombre: "Cazón mamón", cientifico: "Mustelus albipinnis" },
      { nombre: "Cazón mamón", cientifico: "Mustelus lunulatus" },
      { nombre: "Cazón mamón", cientifico: "Mustelus californicus" },
      { nombre: "Tiburón colorado o cobrizo", cientifico: "Carcharhinus brachyurus" },
      { nombre: "Tiburón colorado", cientifico: "Carcharhinus altimus" },
      { nombre: "Tiburón puntas blancas oceánico", cientifico: "Carcharhinus longimanus" },
      { nombre: "Tiburón oscuro o zarco", cientifico: "Carcharhinus obscurus" },
      { nombre: "Tiburón limón", cientifico: "Negaprion brevirostris" },
      { nombre: "Tiburón puntas blancas de arrecife", cientifico: "Triaenodon obesus" },
      { nombre: "Cazón cara blanca, trompa larga o coyotillo", cientifico: "Nasolamia velox" },
    ],
    especiesAsociadas: [
      { nombre: "Raya látigo", cientifico: "Hypanus dipterurus" },
      { nombre: "Raya látigo", cientifico: "Hypanus longus" },
      { nombre: "Raya guitarra pinta o payaso", cientifico: "Pseudobatos glaucostigma" },
      { nombre: "Raya mariposa", cientifico: "Gymnura marmorata" },
      { nombre: "Raya eléctrica o torpedo", cientifico: "Narcine entemedor" },
      { nombre: "Raya tecolote", cientifico: "Rhinoptera steindachneri" },
      { nombre: "Raya águila", cientifico: "Aetobatus laticeps" },
      { nombre: "Raya látigo violácea", cientifico: "Pteroplatytrygon violacea" },
      { nombre: "Dorado", cientifico: "Coryphaena hippurus" },
      { nombre: "Dorado", cientifico: "Coryphaena equiselis" },
      { nombre: "Pez vela", cientifico: "Istiophorus platypterus" },
      { nombre: "Marlin rayado", cientifico: "Kajikia audax" },
      { nombre: "Marlin azul", cientifico: "Makaira nigricans" },
      { nombre: "Pez espada", cientifico: "Xiphias gladius" },
      { nombre: "Atún aleta amarilla", cientifico: "Thunnus albacares" },
      { nombre: "Atún aleta azul", cientifico: "Thunnus orientalis" },
      { nombre: "Wahoo", cientifico: "Acanthocybium solandri" },
      { nombre: "Barrilete", cientifico: "Katsuwonus pelamis" },
      { nombre: "Opah", cientifico: "Lampris guttatus" },
      { nombre: "Pez luna", cientifico: "Mola mola" },
      { nombre: "Listón", cientifico: "Trachipterus spp." },
      { nombre: "Escolar clavo", cientifico: "Ruvettus pretiosus" },
      { nombre: "Escolar negro", cientifico: "Lepidocybium flavobrunneum" },
      { nombre: "Medregal", cientifico: "Seriola dumerili" },
      { nombre: "Sierra", cientifico: "Scomberomorus sierra" },
      { nombre: "Huachinango del Pacífico", cientifico: "Lutjanus peru" },
      { nombre: "Pargo lunarejo, flamenco", cientifico: "Lutjanus guttatus" },
      { nombre: "Pargo amarillo, coyotillo, alazán", cientifico: "Lutjanus argentiventris" },
      { nombre: "Pargo coconaco, tecomate", cientifico: "Hoplopagrus guentherii" },
      { nombre: "Pargo colorado, pargo listoncillo", cientifico: "Lutjanus colorado" },
      { nombre: "Pargo rojo, pargo colmillón", cientifico: "Lutjanus jordani" },
      { nombre: "Pargo mulato, pargo prieto", cientifico: "Lutjanus novemfasciatus" },
      { nombre: "Robalo", cientifico: "Centropomus nigrescens" },
      { nombre: "Cirujano aleta amarilla, barbero", cientifico: "Acanthurus xanthopterus" },
      { nombre: "Burro bacoco", cientifico: "Anisotremus interruptus" },
      { nombre: "Cochi, bota", cientifico: "Balistes polylepis" },
      { nombre: "Jurel de hebra, cocinero", cientifico: "Carangoides otrynter" },
      { nombre: "Jurel toro", cientifico: "Caranx caninus" },
      { nombre: "Jurel voraz, ojo de perra", cientifico: "Caranx sexfasciatus" },
      { nombre: "Curvina", cientifico: "Cynoscion reticulatus" },
      { nombre: "Baqueta", cientifico: "Epinephelus acanthistius" },
      { nombre: "Cabrilla pinta", cientifico: "Epinephelus analogus" },
      { nombre: "Mero, cherna", cientifico: "Epinephelus itajara" },
      { nombre: "Cabrilla piedrera", cientifico: "Epinephelus labriformis" },
      { nombre: "Baqueta ploma", cientifico: "Epinephelus niphobles" },
      { nombre: "Ronco chano, burro", cientifico: "Haemulon flaviguttatum" },
      { nombre: "Burro rasposo", cientifico: "Haemulon maculicauda" },
      { nombre: "Ronco rayado", cientifico: "Microlepidotus brevipinnis" },
      { nombre: "Ronco rayadillo", cientifico: "Microlepidotus inornatus" },
      { nombre: "Cabrilla sardinera, mitán", cientifico: "Mycteroperca rosacea" },
      { nombre: "Burrito, ronco rayado", cientifico: "Orthopristis reddingi" },
      { nombre: "Chula o bonito", cientifico: "Sarda sarda" },
      { nombre: "Salema", cientifico: "Sectator ocyurus" },
      { nombre: "Botete diana", cientifico: "Sphoeroides annulatus" },
      { nombre: "Pámpano, pámpano rayado", cientifico: "Trachinotus rhodopus" },
      { nombre: "Chula, salmonete", cientifico: "Xenichthys xanti" },
      { nombre: "Calamar gigante", cientifico: "Dosidicus gigas" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "A nivel nacional la pesquería de tiburón (tiburón-cazón) ha ocupado en los últimos años los lugares décimo y onceavo por su volumen de captura y el noveno lugar por su valor económico.",
      "El esfuerzo nominal autorizado suma 6 barcos de altura, 182 de mediana altura y 2,317 embarcaciones menores.",
      "En 2018 la captura conjunta de tiburón y cazón alcanzó cerca de 38,500 toneladas.",
      "Numerosas especies objetivo están incluidas en el Apéndice II de la CITES, por lo que su comercio internacional está regulado.",
    ],
    // Figura 1. Tendencia de las capturas de tiburón, cazón y rayas del Pacífico mexicano, 1976–2018. Fuente: CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de tiburón y cazón en el Pacífico mexicano, 1976–2018 (CONAPESCA)",
        series: [
          {
            estado: "Tiburón",
            color: "#e11d48",
            datos: [
              { año: 1976, captura: 9500 },
              { año: 1977, captura: 8500 },
              { año: 1978, captura: 10000 },
              { año: 1979, captura: 11000 },
              { año: 1980, captura: 13000 },
              { año: 1981, captura: 14500 },
              { año: 1982, captura: 11500 },
              { año: 1983, captura: 11000 },
              { año: 1984, captura: 10500 },
              { año: 1985, captura: 11500 },
              { año: 1986, captura: 12000 },
              { año: 1987, captura: 13000 },
              { año: 1988, captura: 13500 },
              { año: 1989, captura: 13000 },
              { año: 1990, captura: 13500 },
              { año: 1991, captura: 14500 },
              { año: 1992, captura: 15000 },
              { año: 1993, captura: 15500 },
              { año: 1994, captura: 16000 },
              { año: 1995, captura: 16000 },
              { año: 1996, captura: 14000 },
              { año: 1997, captura: 13500 },
              { año: 1998, captura: 15000 },
              { año: 1999, captura: 15500 },
              { año: 2000, captura: 16000 },
              { año: 2001, captura: 16500 },
              { año: 2002, captura: 17000 },
              { año: 2003, captura: 18000 },
              { año: 2004, captura: 25000 },
              { año: 2005, captura: 17000 },
              { año: 2006, captura: 17500 },
              { año: 2007, captura: 17500 },
              { año: 2008, captura: 18000 },
              { año: 2009, captura: 17500 },
              { año: 2010, captura: 17000 },
              { año: 2011, captura: 18500 },
              { año: 2012, captura: 17500 },
              { año: 2013, captura: 18000 },
              { año: 2014, captura: 19500 },
              { año: 2015, captura: 21500 },
              { año: 2016, captura: 24000 },
              { año: 2017, captura: 27000 },
              { año: 2018, captura: 31500 },
            ],
          },
          {
            estado: "Cazón",
            color: "#0891b2",
            datos: [
              { año: 1976, captura: 4500 },
              { año: 1977, captura: 4000 },
              { año: 1978, captura: 6500 },
              { año: 1979, captura: 6500 },
              { año: 1980, captura: 9000 },
              { año: 1981, captura: 10500 },
              { año: 1982, captura: 4500 },
              { año: 1983, captura: 6500 },
              { año: 1984, captura: 6000 },
              { año: 1985, captura: 6000 },
              { año: 1986, captura: 6000 },
              { año: 1987, captura: 6000 },
              { año: 1988, captura: 6000 },
              { año: 1989, captura: 7500 },
              { año: 1990, captura: 8500 },
              { año: 1991, captura: 5000 },
              { año: 1992, captura: 5000 },
              { año: 1993, captura: 4500 },
              { año: 1994, captura: 4500 },
              { año: 1995, captura: 4000 },
              { año: 1996, captura: 3500 },
              { año: 1997, captura: 3000 },
              { año: 1998, captura: 3500 },
              { año: 1999, captura: 3500 },
              { año: 2000, captura: 4000 },
              { año: 2001, captura: 3500 },
              { año: 2002, captura: 3500 },
              { año: 2003, captura: 3500 },
              { año: 2004, captura: 4000 },
              { año: 2005, captura: 3500 },
              { año: 2006, captura: 3500 },
              { año: 2007, captura: 3000 },
              { año: 2008, captura: 3500 },
              { año: 2009, captura: 3500 },
              { año: 2010, captura: 3000 },
              { año: 2011, captura: 3500 },
              { año: 2012, captura: 3000 },
              { año: 2013, captura: 4000 },
              { año: 2014, captura: 5000 },
              { año: 2015, captura: 6000 },
              { año: 2016, captura: 6500 },
              { año: 2017, captura: 10500 },
              { año: 2018, captura: 7500 },
            ],
          },
          {
            estado: "Tiburón + cazón (total)",
            color: "#64748b",
            datos: [
              { año: 1976, captura: 14000 },
              { año: 1977, captura: 13000 },
              { año: 1978, captura: 18000 },
              { año: 1979, captura: 19000 },
              { año: 1980, captura: 26000 },
              { año: 1981, captura: 25500 },
              { año: 1982, captura: 17000 },
              { año: 1983, captura: 18500 },
              { año: 1984, captura: 17500 },
              { año: 1985, captura: 18000 },
              { año: 1986, captura: 19000 },
              { año: 1987, captura: 19500 },
              { año: 1988, captura: 20000 },
              { año: 1989, captura: 23000 },
              { año: 1990, captura: 24500 },
              { año: 1991, captura: 20000 },
              { año: 1992, captura: 19000 },
              { año: 1993, captura: 18500 },
              { año: 1994, captura: 19500 },
              { año: 1995, captura: 19500 },
              { año: 1996, captura: 16000 },
              { año: 1997, captura: 14500 },
              { año: 1998, captura: 16000 },
              { año: 1999, captura: 17000 },
              { año: 2000, captura: 18000 },
              { año: 2001, captura: 19000 },
              { año: 2002, captura: 19500 },
              { año: 2003, captura: 21000 },
              { año: 2004, captura: 27500 },
              { año: 2005, captura: 20000 },
              { año: 2006, captura: 19500 },
              { año: 2007, captura: 19000 },
              { año: 2008, captura: 21000 },
              { año: 2009, captura: 19500 },
              { año: 2010, captura: 18500 },
              { año: 2011, captura: 20000 },
              { año: 2012, captura: 19500 },
              { año: 2013, captura: 22000 },
              { año: 2014, captura: 24000 },
              { año: 2015, captura: 26500 },
              { año: 2016, captura: 29000 },
              { año: 2017, captura: 33500 },
              { año: 2018, captura: 38500 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "La vulnerabilidad al cambio climático, con base en escenarios de emisiones de gases de efecto invernadero (bajas, medias y altas) proyectadas hasta el año 2100, demostró que Alopias pelagicus e Isurus paucus tienen alto riesgo, mientras que el resto de las especies presentan riesgo medio. La captura de tiburones en el Pacífico central mexicano se ha correlacionado con la temperatura superficial del mar, encontrando que la captura de ciertas especies tropicales aumenta con ella y cuando se presenta un evento El Niño. Sin embargo, esta anomalía climática en sinergia con «El Blob» produjo un sobrecalentamiento del agua superficial en 2015–2016 no visto con anterioridad, influyendo de manera negativa en la abundancia y distribución de especies de aguas frío-templadas, como Prionace glauca.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion: "NOM-029-PESC-2006, pesca responsable de tiburones y rayas. Especificaciones para su aprovechamiento.",
      sustento: "DOF: 14/02/2007.",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos para pesca comercial de tiburón.",
      sustento: "Opinión técnica del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Las artes y métodos de pesca permitidos para cada unidad pesquera y sus especificaciones se establecen en la NOM-029-PESC-2006 (disposiciones aplicables a las pesquerías ribereñas artesanales, de mediana altura y de altura). Las redes o los palangres no podrán unirse para su utilización en serie.",
      sustento: "Numerales 4.3.14, 4.4, 4.6, 4.7 y 4.8 de la NOM-029-PESC-2006 (DOF: 14/02/2007).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Veda de tiburones y rayas en el Océano Pacífico del 1 de mayo al 31 de julio de cada año. Veda permanente para la pesca de tiburón blanco (Carcharodon carcharias) en aguas de jurisdicción federal.",
      sustento:
        "Acuerdo que modifica el aviso de épocas y zonas de veda (DOF: 23/07/2013); Acuerdo de veda permanente de tiburón blanco (DOF: 27/01/2014); Modificación al Anexo Normativo III de la NOM-059-SEMARNAT-2010 (DOF: 14/11/2019).",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Las embarcaciones que componen cada unidad pesquera (ribereña artesanal, de mediana altura y de altura) y sus especificaciones se establecen en la NOM-029-PESC-2006.",
      sustento: "Numerales 4.4, 4.6, 4.7 y 4.8 de la NOM-029-PESC-2006 (DOF: 14/02/2007).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "Embarcaciones mayores: altura, 6 barcos; mediana altura, 182 barcos. Embarcaciones menores: 2,317 embarcaciones.",
      sustento:
        "Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera en diciembre de 2021.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas de jurisdicción federal de los Estados Unidos Mexicanos, a excepción de las Áreas Naturales Protegidas, las zonas de no pesca para el Pacífico mexicano establecidas en la NOM-029-PESC-2006 y las Zonas de Refugio Pesquero.",
      sustento:
        "NOM-029-PESC-2006 y diversos decretos de Áreas Naturales Protegidas y Zonas de Refugio Pesquero (Islas del Pacífico de la Península de Baja California, Revillagigedo, Pacífico Mexicano Profundo, San Pedro Nolasco, Puerto Libertad, San Cosme a Punta Coyote, Isla Natividad, entre otras).",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Complejo de tiburones",
        zona: "Pacífico mexicano",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Tiburón azul (Prionace glauca)",
        zona: "Pacífico norte",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Tiburón mako de aletas cortas (Isurus oxyrinchus)",
        zona: "Pacífico mexicano",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Tiburón zorro común (Alopias vulpinus)",
        zona: "Pacífico mexicano",
      },
    ],
    estrategia:
      "Mantener la biomasa reproductora por arriba del valor de la biomasa al Aprovechamiento Máximo Sustentable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Regulación en el arte y métodos de captura",
      "Veda temporal",
      "Zona de pesca",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Con base en lo previsto en la LGPAS y en la NOM-029-PESC-2006, no incrementar el esfuerzo pesquero en toda la costa del Pacífico.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Asegurar el cumplimiento de las medidas de manejo y protección establecidas en los diversos instrumentos (Plan de Acción Nacional para el Manejo y Conservación de los Tiburones en México, CNP, NOM-029-PESC-2006 y acuerdos de veda).",
      avance: "Sin información",
    },
    {
      recomendacion: "Actualizar los instrumentos de manejo, incluyendo el PANMCT y la NOM-029-PESC-2006.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Mejorar el registro de capturas y esfuerzo pesquero, incluyendo el llenado correcto de bitácoras de pesca y la capacitación al sector en la correcta identificación de las especies de tiburones.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Promover la detección de áreas de reproducción y crianza de especies de tiburón e incorporarlas como zonas protegidas o de refugio en la NOM-029-PESC-2006 para reducir la captura de neonatos y juveniles.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Explorar escenarios para el establecimiento de tallas límite de captura (mínima o máxima) para reducir la captura de neonatos, juveniles y hembras reproductoras, conforme a los estudios y opiniones técnicas del INAPESCA.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Revisar la selectividad de las artes de pesca y las condiciones que permitirían reducir la captura incidental de tiburones en las pesquerías de escama marina, camarón y otros recursos, conforme a los estudios y opiniones técnicas del INAPESCA.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Instrumentar programas de ordenamiento y manejo por zonas y/o regiones de pesca, conforme a lo previsto en la LGPAS y en la NOM-029-PESC-2006.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Evaluar la conveniencia de establecer medidas de manejo dinámicas considerando la variación ambiental (por ejemplo, anomalías como El Niño, La Niña y El Blob) y sus efectos en la distribución y reproducción de las especies, conforme a los estudios y opiniones técnicas del INAPESCA.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-calamar-gigante"] = {
  generalidades: {
    descripcion: [
      "El calamar gigante (Dosidicus gigas) posee hábitos nectónicos y forma cardúmenes de tallas uniformes compuestos por decenas de individuos cercanos a la costa; es un organismo iteróparo y alcanza hasta dos años de edad.",
      "Se distribuye a lo largo de todo el Pacífico mexicano. Las principales zonas de captura se localizan en un área limitada por los 22 y 28° N y los 109 y 114° O, a lo largo de todo el año, concentrándose frente a Baja California Sur en primavera y verano, y frente a Sonora en otoño e invierno.",
    ],
    embarcaciones:
      "La pesquería se realiza en aguas marinas de jurisdicción federal del noroeste de México, incluyendo el Golfo de California y la costa occidental de la Península de Baja California. Se utilizan embarcaciones mayores, superiores a 10 toneladas de registro bruto: los barcos con pesca manual tienen un máximo de 10 poteras y, si cuentan con máquinas calamareras automáticas, pueden tener un máximo de seis máquinas con un límite superior de 24 poteras por línea. También se utilizan embarcaciones menores con motor fuera de borda, con hasta tres pescadores y una potera por pescador operando simultáneamente. Ambos tipos de embarcación cuentan con sistema de iluminación adaptado para atraer a los calamares. No existe una pesquería recreativa.",
    especiesObjetivo: [{ nombre: "Calamar gigante", cientifico: "Dosidicus gigas" }],
  },
  indicadores: {
    datosDestacados: [
      "La abundancia del calamar gigante es altamente variable y responde fuertemente a fenómenos de gran escala como El Niño y La Niña.",
      "En su máximo esfuerzo (1995–2014) la pesquería generó alrededor de 8,500 empleos directos mensuales en captura, más 3,000–3,500 en procesamiento.",
      "La capacidad industrial de proceso llegó a rondar las 300,000 toneladas anuales de materia prima en peso fresco entre BCS, Sonora, Baja California y Sinaloa.",
      "El manto es la porción principal de uso industrial; el mayor valor agregado se generaba en los países importadores, principalmente Japón, Corea y España.",
      "En años recientes se ha observado que el calamar tiende a no atacar la potera y que la población se conforma por individuos de tallas pequeñas que se reproducen a tallas menores.",
    ],
    // Figura 1. Captura total anual de calamar gigante y desglose por estado, 1974–2020 (miles de toneladas). Fuente: CNP.
    capturaPorEstado: [
      {
        titulo: "Captura de calamar gigante por estado, 1974–2020 (miles de toneladas)",
        series: [
          {
            estado: "Total",
            color: "#64748b",
            datos: [
              { año: 1978, captura: 2 },
              { año: 1979, captura: 15 },
              { año: 1980, captura: 23 },
              { año: 1981, captura: 10 },
              { año: 1982, captura: 1 },
              { año: 1988, captura: 3 },
              { año: 1989, captura: 7 },
              { año: 1990, captura: 5 },
              { año: 1991, captura: 1 },
              { año: 1993, captura: 1 },
              { año: 1994, captura: 15 },
              { año: 1995, captura: 70 },
              { año: 1996, captura: 105 },
              { año: 1997, captura: 117 },
              { año: 1998, captura: 25 },
              { año: 1999, captura: 45 },
              { año: 2000, captura: 55 },
              { año: 2001, captura: 65 },
              { año: 2002, captura: 107 },
              { año: 2003, captura: 80 },
              { año: 2004, captura: 94 },
              { año: 2005, captura: 55 },
              { año: 2006, captura: 50 },
              { año: 2007, captura: 60 },
              { año: 2008, captura: 78 },
              { año: 2009, captura: 45 },
              { año: 2010, captura: 57 },
              { año: 2011, captura: 30 },
              { año: 2012, captura: 5 },
              { año: 2013, captura: 2 },
              { año: 2014, captura: 21 },
              { año: 2015, captura: 16 },
              { año: 2016, captura: 3 },
              { año: 2017, captura: 2 },
              { año: 2018, captura: 1 },
              { año: 2019, captura: 1 },
              { año: 2020, captura: 0 },
            ],
          },
          {
            estado: "Baja California Sur",
            color: "#e11d48",
            datos: [
              { año: 1980, captura: 3 },
              { año: 1981, captura: 1 },
              { año: 1989, captura: 1 },
              { año: 1990, captura: 1 },
              { año: 1994, captura: 5 },
              { año: 1995, captura: 55 },
              { año: 1996, captura: 80 },
              { año: 1997, captura: 75 },
              { año: 1998, captura: 13 },
              { año: 1999, captura: 20 },
              { año: 2000, captura: 28 },
              { año: 2001, captura: 35 },
              { año: 2002, captura: 64 },
              { año: 2003, captura: 45 },
              { año: 2004, captura: 63 },
              { año: 2005, captura: 35 },
              { año: 2006, captura: 30 },
              { año: 2007, captura: 38 },
              { año: 2008, captura: 50 },
              { año: 2009, captura: 28 },
              { año: 2010, captura: 40 },
              { año: 2011, captura: 15 },
              { año: 2012, captura: 3 },
              { año: 2013, captura: 1 },
              { año: 2014, captura: 13 },
              { año: 2015, captura: 10 },
              { año: 2016, captura: 2 },
              { año: 2017, captura: 1 },
              { año: 2018, captura: 1 },
            ],
          },
          {
            estado: "Sonora",
            color: "#0891b2",
            datos: [
              { año: 1979, captura: 5 },
              { año: 1980, captura: 13 },
              { año: 1981, captura: 5 },
              { año: 1988, captura: 1 },
              { año: 1989, captura: 2 },
              { año: 1990, captura: 1 },
              { año: 1994, captura: 2 },
              { año: 1995, captura: 15 },
              { año: 1996, captura: 35 },
              { año: 1997, captura: 30 },
              { año: 1998, captura: 3 },
              { año: 1999, captura: 5 },
              { año: 2000, captura: 8 },
              { año: 2001, captura: 12 },
              { año: 2002, captura: 40 },
              { año: 2003, captura: 22 },
              { año: 2004, captura: 28 },
              { año: 2005, captura: 15 },
              { año: 2006, captura: 13 },
              { año: 2007, captura: 13 },
              { año: 2008, captura: 15 },
              { año: 2009, captura: 10 },
              { año: 2010, captura: 22 },
              { año: 2011, captura: 10 },
              { año: 2012, captura: 2 },
              { año: 2013, captura: 1 },
              { año: 2014, captura: 5 },
              { año: 2015, captura: 4 },
              { año: 2016, captura: 1 },
            ],
          },
          {
            estado: "Sinaloa",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 2 },
              { año: 1981, captura: 1 },
              { año: 1994, captura: 1 },
              { año: 1995, captura: 3 },
              { año: 1996, captura: 8 },
              { año: 1997, captura: 5 },
              { año: 1998, captura: 2 },
              { año: 1999, captura: 3 },
              { año: 2000, captura: 3 },
              { año: 2001, captura: 3 },
              { año: 2002, captura: 4 },
              { año: 2003, captura: 3 },
              { año: 2004, captura: 4 },
              { año: 2005, captura: 3 },
              { año: 2006, captura: 3 },
              { año: 2007, captura: 4 },
              { año: 2008, captura: 5 },
              { año: 2009, captura: 4 },
              { año: 2010, captura: 4 },
              { año: 2011, captura: 3 },
              { año: 2012, captura: 1 },
              { año: 2014, captura: 2 },
              { año: 2015, captura: 1 },
            ],
          },
          {
            estado: "Baja California",
            color: "#f59e0b",
            datos: [
              { año: 1980, captura: 2 },
              { año: 1981, captura: 1 },
              { año: 1994, captura: 1 },
              { año: 1995, captura: 2 },
              { año: 1996, captura: 3 },
              { año: 1997, captura: 3 },
              { año: 1998, captura: 2 },
              { año: 1999, captura: 3 },
              { año: 2000, captura: 3 },
              { año: 2001, captura: 3 },
              { año: 2002, captura: 4 },
              { año: 2003, captura: 3 },
              { año: 2004, captura: 4 },
              { año: 2005, captura: 3 },
              { año: 2006, captura: 3 },
              { año: 2007, captura: 4 },
              { año: 2008, captura: 5 },
              { año: 2009, captura: 4 },
              { año: 2010, captura: 4 },
              { año: 2011, captura: 3 },
              { año: 2012, captura: 1 },
              { año: 2014, captura: 2 },
              { año: 2015, captura: 1 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "El calamar gigante es un recurso migratorio y altamente variable, cuya abundancia, distribución y disponibilidad responden fuertemente a la variabilidad ambiental de gran escala del tipo El Niño y La Niña. Ante esta variabilidad, el recurso puede modificar sus tácticas de vida: en los últimos años se ha observado que el calamar tiende a no atacar la potera, por lo que el arte y método de pesca tradicional deja de ser eficiente aun cuando hay recurso. Asimismo, ha habido un cambio en la estructura de tallas, con una población conformada por individuos de tallas pequeñas que se están reproduciendo a tallas menores.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion: "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de Calamar Gigante (Dosidicus gigas).",
      sustento: "DOF: 14/07/2014.",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial para calamar gigante.",
      sustento: "Opinión técnica del INAPESCA.",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Sistemas de iluminación; poteras (entre 10 y 24 unidades para embarcaciones mayores y máximo 3 para embarcaciones menores), cobradas con máquina calamarera o a mano.",
      sustento: "Numeral 4.6 del Plan de Manejo Pesquero de Calamar Gigante (DOF: 14/07/2014).",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "No aplica.", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcación mayor superior a 10 toneladas de registro bruto; los barcos con pesca manual tienen un máximo de 10 poteras y, con máquinas calamareras automáticas, un máximo de seis máquinas con un límite superior de 24 poteras por línea. Embarcación menor con motor fuera de borda, con hasta tres pescadores y una potera por pescador operando simultáneamente.",
      sustento: "Numeral 4.6 del Plan de Manejo Pesquero de Calamar Gigante (DOF: 14/07/2014).",
    },
    {
      instrumento: "9. Esfuerzo nominal autorizado",
      aplica: true,
      disposicion:
        "250 embarcaciones mayores y 2,000 embarcaciones menores. Fuera del Golfo de California, el esfuerzo podrá incrementarse en función de la disponibilidad y abundancia en esas zonas.",
      sustento: "Opinión técnica del INAPESCA.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal de la parte central del Golfo de California y de la costa occidental de la Península de Baja California. La flota deberá considerar las disposiciones y lineamientos de los programas de manejo de las Reservas de la Biosfera Islas del Pacífico de la Península de Baja California, El Vizcaíno y Bahía de los Ángeles, canales de Ballenas y de Salsipuedes, y del Parque Nacional Zona Marina del Archipiélago de San Lorenzo.",
      sustento: "Numeral 4.11, incisos C y E, de la NOM-014-SAG/PESC-2015 (DOF: 07/12/2016).",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Calamar gigante (Dosidicus gigas)",
        zona: "Golfo de California",
      },
      {
        categoria: "Indeterminado",
        color: "gray",
        especie: "Calamar gigante (Dosidicus gigas)",
        zona: "Costa occidental de la Península de Baja California",
      },
    ],
    estrategia: "Escape proporcional del 40%.",
    tacticas: ["Control de esfuerzo (permisos de pesca comercial)"],
  },
  recomendaciones: [
    {
      recomendacion:
        "No incrementar el esfuerzo de pesca en el Golfo de California; solo es factible prorrogar los permisos existentes conforme a lo previsto en la Ley General de Pesca y Acuacultura Sustentables.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Aprovechar el recurso en función de la disponibilidad y abundancia en las zonas fuera del Golfo de California, siempre sustentado con opinión técnica del INAPESCA sobre la disponibilidad biológica y la factibilidad técnica de otorgar (o no) nuevos permisos de pesca.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Establecer un sistema de captación de información que permita al INAPESCA disponer de datos oportunos de los productores para el manejo pesquero.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Instrumentar las propuestas de manejo e investigación contenidas en el Plan de Manejo Pesquero de Calamar Gigante (DOF: 14/07/2014).",
      avance: "Sin información",
    },
  ],
}

fichas["pac-marlin-pesca-deportiva"] = {
  generalidades: {
    descripcion: [
      "El marlin es un recurso reservado para la pesca deportiva dentro de una franja de 50 millas náuticas (mn) contadas a partir de la línea de base desde la cual se mide el Mar Territorial. Los marlines son especies pelágicas tropicales y subtropicales, depredadores tope que habitan amplias regiones oceánicas dentro de las cuales realizan extensas migraciones. Su vigor y tamaño desafían las habilidades de los pescadores más avezados, por lo que se trata de especies muy apreciadas para la pesca deportiva en todo el mundo.",
    ],
    embarcaciones:
      "Se captura principalmente desde Baja California Sur y la región central de Sonora hasta Chiapas. La actividad se realiza con embarcaciones de pesca deportiva, con cañas individuales, bajo un esquema de operación diaria. En embarcaciones menores de 10 toneladas de acarreo participan hasta cuatro pescadores, y en embarcaciones de más de 10 toneladas de acarreo, hasta 25 pescadores.",
    especiesObjetivo: [
      { nombre: "Marlin rayado", cientifico: "Kajikia audax" },
      { nombre: "Marlin azul", cientifico: "Makaira mazara" },
      { nombre: "Marlin negro", cientifico: "Istiompax indica" },
      { nombre: "Aguja corta", cientifico: "Tetrapturus angustirostris" },
    ],
    especiesAsociadas: [
      { nombre: "Pez vela", cientifico: "Istiophorus platypterus" },
      { nombre: "Pez espada", cientifico: "Xiphias gladius" },
      { nombre: "Dorado", cientifico: "Coryphaena hippurus" },
      { nombre: "Atún aleta amarilla", cientifico: "Thunnus albacares" },
      { nombre: "Pez gallo", cientifico: "Nematistius pectoralis" },
      { nombre: "Barrilete", cientifico: "Katsuwonus pelamis, Euthynnus lineatus" },
      { nombre: "Bonita", cientifico: "Sarda chiliensis" },
      { nombre: "Wahoo", cientifico: "Acanthocybium solandri" },
      { nombre: "Sierra", cientifico: "Scomberomorus sierra, S. concolor" },
      { nombre: "Jurel", cientifico: "Seriola lalandi" },
      { nombre: "Pez fuerte", cientifico: "Seriola rivoliana" },
      { nombre: "Pargo", cientifico: "Lutjanus argentiventris, L. colorado, L. novemfasciatus" },
      { nombre: "Cabrilla", cientifico: "Mycteroperca rosacea, Epinephelus labriformis" },
      { nombre: "Tiburón mako", cientifico: "Isurus oxyrinchus" },
      { nombre: "Tiburón zorro", cientifico: "Alopias vulpinus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "En México se tienen registrados más de 160 sitios donde se practica la pesca deportiva, tanto en el mar como en aguas interiores.",
      "Baja California Sur es el estado con la mayor flota de pesca deportiva (1,817 embarcaciones), el mayor número de permisos (27,069 individuales y 826 por embarcación) y el mayor ingreso por venta de permisos (5.1 millones de pesos).",
      "El marlin rayado representa cerca del 17% de la captura total; el marlin azul aporta el 1%, y el marlin negro y la aguja corta suman alrededor del 0.3%.",
    ],
    // Figura 1. Tendencia histórica (1990–2019) de las capturas de las flotas deportivas. Fuente: CNP.
    capturaPorEstado: [
      {
        titulo: "Captura de marlin (número de organismos) de las flotas deportivas de Los Cabos, Buenavista y Mazatlán, 1990–2019",
        series: [
          {
            estado: "Los Cabos",
            color: "#e11d48",
            datos: [
              { año: 1990, captura: 45 },
              { año: 1991, captura: 50 },
              { año: 1992, captura: 48 },
              { año: 1993, captura: 60 },
              { año: 1994, captura: 65 },
              { año: 1995, captura: 45 },
              { año: 1996, captura: 75 },
              { año: 1997, captura: 80 },
              { año: 1998, captura: 130 },
              { año: 1999, captura: 145 },
              { año: 2000, captura: 170 },
              { año: 2001, captura: 100 },
              { año: 2002, captura: 95 },
              { año: 2003, captura: 120 },
              { año: 2004, captura: 110 },
              { año: 2005, captura: 105 },
              { año: 2006, captura: 120 },
              { año: 2007, captura: 150 },
              { año: 2008, captura: 180 },
              { año: 2009, captura: 165 },
              { año: 2010, captura: 130 },
              { año: 2011, captura: 105 },
              { año: 2012, captura: 105 },
              { año: 2013, captura: 178 },
              { año: 2014, captura: 60 },
              { año: 2015, captura: 55 },
              { año: 2016, captura: 55 },
              { año: 2017, captura: 65 },
              { año: 2018, captura: 60 },
              { año: 2019, captura: 55 },
            ],
          },
          {
            estado: "Buenavista",
            color: "#0891b2",
            datos: [
              { año: 1990, captura: 20 },
              { año: 1991, captura: 22 },
              { año: 1992, captura: 22 },
              { año: 1993, captura: 20 },
              { año: 1994, captura: 20 },
              { año: 1995, captura: 15 },
              { año: 1996, captura: 25 },
              { año: 1997, captura: 20 },
              { año: 1998, captura: 20 },
              { año: 1999, captura: 25 },
              { año: 2000, captura: 33 },
              { año: 2001, captura: 35 },
              { año: 2002, captura: 40 },
              { año: 2003, captura: 45 },
              { año: 2004, captura: 62 },
              { año: 2005, captura: 40 },
              { año: 2006, captura: 40 },
              { año: 2007, captura: 45 },
              { año: 2008, captura: 50 },
              { año: 2009, captura: 35 },
              { año: 2010, captura: 25 },
              { año: 2011, captura: 20 },
              { año: 2012, captura: 15 },
              { año: 2013, captura: 35 },
              { año: 2014, captura: 10 },
              { año: 2015, captura: 10 },
              { año: 2016, captura: 5 },
              { año: 2017, captura: 10 },
              { año: 2018, captura: 5 },
              { año: 2019, captura: 5 },
            ],
          },
          {
            estado: "Mazatlán",
            color: "#f59e0b",
            datos: [
              { año: 1990, captura: 10 },
              { año: 1991, captura: 10 },
              { año: 1992, captura: 10 },
              { año: 1993, captura: 8 },
              { año: 1994, captura: 5 },
              { año: 1995, captura: 5 },
              { año: 1996, captura: 5 },
              { año: 1997, captura: 5 },
              { año: 1998, captura: 15 },
              { año: 1999, captura: 20 },
              { año: 2000, captura: 20 },
              { año: 2001, captura: 15 },
              { año: 2002, captura: 10 },
              { año: 2003, captura: 15 },
              { año: 2004, captura: 15 },
              { año: 2005, captura: 10 },
              { año: 2006, captura: 5 },
              { año: 2007, captura: 8 },
              { año: 2008, captura: 5 },
              { año: 2009, captura: 5 },
              { año: 2010, captura: 4 },
              { año: 2011, captura: 3 },
              { año: 2012, captura: 2 },
              { año: 2013, captura: 2 },
              { año: 2014, captura: 2 },
              { año: 2015, captura: 2 },
              { año: 2016, captura: 2 },
              { año: 2017, captura: 3 },
              { año: 2018, captura: 2 },
              { año: 2019, captura: 2 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "El índice gonádico (IG) muestra una relación directamente proporcional con el estadio de madurez sexual y con la talla individual, por lo que se considera un buen indicador de la actividad reproductiva en las tres especies de marlin. El IG muestra un comportamiento estacional correlacionado con la temperatura superficial del mar (TSM), con diferencias entre especies asociadas a su afinidad ambiental. En el marlin rayado, el IG alcanza sus valores más altos de julio a septiembre, cuando la TSM es más alta. En el marlin azul, los IG de febrero a abril son significativamente mayores que el resto del año, asociados a las temperaturas más bajas registradas en Cabo San Lucas. Para el marlin negro, la información disponible sugiere un comportamiento similar al del marlin azul, con actividad reproductiva relacionada con los registros de temperaturas más bajas del año.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "Modificación a la Norma Oficial Mexicana NOM-017-PESC-1994, para regular las actividades de pesca deportivo-recreativa en las aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
      sustento: "DOF: 25/11/2013.",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca deportivo-recreativa (individual o por embarcación).",
      sustento: "Numerales 4.3 y 4.14 (incisos a y b) de la Modificación a la NOM-017-PESC-1994 (DOF: 25/11/2013).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Embarcación con caña, carrete y anzuelo usando carnada o señuelo. Los carretes eléctricos solo podrán ser utilizados por personas con discapacidad.",
      sustento: "Numeral 4.6 (incisos a, e) de la Modificación a la NOM-017-PESC-1994 (DOF: 25/11/2013).",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "7. Cuota",
      aplica: true,
      disposicion:
        "Un individuo por pescador y día. Si el viaje dura más de tres días, el máximo acumulable por pescador será el equivalente a tres días de pesca. Los organismos que se pesquen en exceso deberán ser devueltos a su medio natural («captura y liberación»).",
      sustento: "Numerales 4.9.1 (inciso b), 4.9.3 y 4.9.5 de la Modificación a la NOM-017-PESC-1994 (DOF: 25/11/2013).",
    },
    { instrumento: "8. Unidad de pesca", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "9. Esfuerzo actual autorizado", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "La pesca deportiva de marlines es exclusiva dentro de una franja de 50 millas náuticas adyacentes a la costa establecida en la NOM-017-PESC-1994. Existen además dos zonas de exclusión de pesca comercial de picudos: frente a la península de Baja California (incluyendo la boca del Golfo de California) y frente al Golfo de Tehuantepec. En la Reserva de la Biosfera Islas del Pacífico de la Península de Baja California existen disposiciones específicas para la pesca deportiva en la zona de amortiguamiento marina de las islas Cedros y San Benito.",
      sustento: "NOM-017-PESC-1994 (DOF: 28/08/1987; DOF: 16/03/1994; DOF: 07/12/2016).",
    },
    {
      instrumento: "11. Interacción con otras pesquerías",
      aplica: true,
      disposicion:
        "Acuerdo mediante el cual se establece el volumen de captura incidental permitido en las operaciones de pesca de tiburón y rayas en aguas de jurisdicción federal del Océano Pacífico.",
      sustento: "DOF: 12/09/2008.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Indeterminado",
        color: "gray",
        especie: "Marlin (Kajikia audax, Makaira mazara, Istiompax indica)",
        zona: "Litoral del Pacífico",
      },
    ],
    estrategia: "Cuota de captura por pescador y día.",
    tacticas: [
      "Regulación en el arte y método de captura",
      "Talla mínima de captura",
      "Zona de exclusión a la pesca comercial",
    ],
  },
  recomendaciones: [
    { recomendacion: "Valorar la factibilidad de establecer talla mínima de captura por especie.", avance: "Sin información" },
    { recomendacion: "Elaborar e implementar el plan de manejo pesquero.", avance: "Sin información" },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería mediante el llenado veraz y fidedigno de las bitácoras de pesca.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-merluza-del-pacifico-norte"] = {
  generalidades: {
    descripcion: [
      "La merluza es un pez carnívoro que se alimenta de peces pelágicos e invertebrados, con distribución batimétrica desde la plataforma continental (12 metros) hasta el talud (500 metros). En el Golfo de California se han reportado organismos de 112 centímetros de longitud total. Su población se duplica en un tiempo de 4.5 a 14 años. La pesca se realiza en aguas marinas de jurisdicción federal del Golfo de California y de la costa occidental de la Península de Baja California.",
    ],
    embarcaciones:
      "La unidad de pesca consiste en embarcaciones mayores con capacidad superior a 10 toneladas de arqueo neto, equipadas con red de arrastre escamera, pudiendo ser de doble aparejo y/o arrastre por popa. Los viajes de pesca pueden variar entre 1 y 7 días.",
    especiesObjetivo: [{ nombre: "Merluza del Pacífico norte", cientifico: "Merluccius productus" }],
    especiesAsociadas: [
      { nombre: "Argentina del Pacífico", cientifico: "Argentina sialis" },
      { nombre: "Brótula negra", cientifico: "Cherublemma emmelas" },
      { nombre: "Barracuda", cientifico: "Sphyraena spp." },
      { nombre: "Lenguado cuatrojos", cientifico: "Hippoglossina tetrophthalma" },
      { nombre: "Cabrilla extranjera", cientifico: "Paralabrax auroguttatus" },
      { nombre: "Lenguado manchado o bocón", cientifico: "Hippoglossina stomata" },
      { nombre: "Palometa plateada", cientifico: "Carangoides otrynter" },
      { nombre: "Platija cornuda", cientifico: "Pleuronichthys verticalis" },
      { nombre: "Chabela o palometa", cientifico: "Peprilus medius" },
      { nombre: "Macarela", cientifico: "Scomber japonicus" },
      { nombre: "Chano o berrugata aleta amarilla", cientifico: "Umbrina roncador" },
      { nombre: "Mojarra rosada", cientifico: "Zalembius rosaceus" },
      { nombre: "Chano", cientifico: "Micropogonias sp." },
      { nombre: "Mueluda o pluma marotilla", cientifico: "Calamus brachysomus" },
      { nombre: "Curvina golfina", cientifico: "Cynoscion othonopterus" },
      { nombre: "Murciélago", cientifico: "Zalieutes elater" },
      { nombre: "Bombache", cientifico: "Larimus acclivis" },
      { nombre: "Pargo lunarejo", cientifico: "Lutjanus guttatus" },
      { nombre: "Mojarra prieta o corvinata negra", cientifico: "Cheilotrema saturnum" },
      { nombre: "Periquito", cientifico: "Decodon melasma" },
      { nombre: "Chile o lagarto picudo", cientifico: "Synodus scituliceps" },
      { nombre: "Pez escorpión de California", cientifico: "Scorpaena guttata" },
      { nombre: "Chupalodo o pez fraile mimético", cientifico: "Porichthys mimeticus" },
      { nombre: "Rocote chancharro", cientifico: "Sebastes sp." },
      { nombre: "Cinto", cientifico: "Trichiurus lepturus" },
      { nombre: "Lupón", cientifico: "Scorpaena sp." },
      { nombre: "Cochito", cientifico: "Balistes polylepis" },
      { nombre: "Rubio gallineta", cientifico: "Prionotus ruscarius" },
      { nombre: "Conejo", cientifico: "Caulolatilus affinis" },
      { nombre: "Rubio rey", cientifico: "Prionotus albirostris" },
      { nombre: "Ronco blanco", cientifico: "Pomadasys panamensis" },
      { nombre: "Triglido cabro volador", cientifico: "Prionotus stephanophrys" },
      { nombre: "Lengua o congriperla cornuda", cientifico: "Lepophidium prorates" },
      { nombre: "Serrano cabaicucho", cientifico: "Diplectrum pacificum" },
      { nombre: "Triglido cabrilla enana", cientifico: "Bellator gymnostethus" },
      { nombre: "Sapo cornudo", cientifico: "Batrachoididae" },
      { nombre: "Salmoncito", cientifico: "Diplectrum labarum" },
      { nombre: "Biajaiba", cientifico: "Hemanthias peruanus" },
      { nombre: "Sol", cientifico: "Pristigenys serrula" },
      { nombre: "Guabina", cientifico: "Brotula clarkae" },
      { nombre: "Perro", cientifico: "Squatina californica" },
      { nombre: "Baqueta", cientifico: "Epinephelus acanthistius" },
      { nombre: "Ratón o quimera", cientifico: "Callorhinchus scaphiopus" },
      { nombre: "Agujones", cientifico: "Hyporhamphus sp." },
      { nombre: "Gavilán o tecolote", cientifico: "Rhinoptera steindachneri" },
      { nombre: "Sardina japonesa", cientifico: "Etrumeus teres" },
      { nombre: "Manta coreana", cientifico: "Raja velezi" },
      { nombre: "Guabina", cientifico: "Bythitidae" },
      { nombre: "Raya bruja", cientifico: "Raja sp." },
      { nombre: "Anchoa", cientifico: "Anchoa sp." },
      { nombre: "Mariposa", cientifico: "Gymnura marmorata" },
      { nombre: "Pámpano", cientifico: "Trachinotus paitensis" },
      { nombre: "Raya cola de látigo", cientifico: "Dasyatis sp." },
      { nombre: "Cangrejo araña", cientifico: "Stenocionops ovata" },
      { nombre: "Raya redonda", cientifico: "Urobatis halleri" },
      { nombre: "Cangrejo de roca", cientifico: "Cancer antennarius" },
      { nombre: "Payaso o guitarra", cientifico: "Pseudobatos productus" },
      { nombre: "Cangrejo medusa", cientifico: "Ethusa ciliatifrons" },
      { nombre: "Quimera", cientifico: "Hydrolagus colliei" },
      { nombre: "Cangrejo de piedra", cientifico: "Menippe frontalis" },
      { nombre: "Tiburón cazón hilacho", cientifico: "Mustelus henlei" },
      { nombre: "Jaiba", cientifico: "Portunidae" },
      { nombre: "Tiburón mamón", cientifico: "Mustelus sp." },
      { nombre: "Erizo", cientifico: "Echinometridae" },
      { nombre: "Tiburón gata", cientifico: "Heterodontus sp." },
      { nombre: "Pepino verde", cientifico: "Holothuriidae" },
      { nombre: "Tiburón pimienta", cientifico: "Galeus piperatus" },
      { nombre: "Pepino rojo o blanco", cientifico: "Holothuriidae" },
      { nombre: "Tiburón aguado", cientifico: "Parmaturus xaniurus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "La temporada de captura inicia en diciembre y termina en mayo, con los mayores volúmenes entre enero y marzo.",
      "Con base en el histórico de capturas, Sonora ha aportado el 83% de la captura total anual.",
      "La actividad genera una derrama importante en Sonora y Baja California, con más de 1,800 empleos directos e indirectos y 24 plantas procesadoras (12 en Sonora y 12 en Baja California).",
      "La CPUE alcanzó su máximo en 2014 (27.45 t/viaje), coincidiendo con el pico histórico de captura (10,871 toneladas).",
    ],
    // Figura 1. Capturas y CPUE de merluza, 2006–2020. Fuente: Anuario Estadístico de Pesca.
    capturaPorEstado: [
      {
        titulo: "Captura de merluza por estado, 2006–2020 (Anuario Estadístico de Pesca)",
        series: [
          {
            estado: "Total",
            color: "#64748b",
            datos: [
              { año: 2006, captura: 1850 },
              { año: 2007, captura: 1050 },
              { año: 2008, captura: 1550 },
              { año: 2009, captura: 1750 },
              { año: 2010, captura: 1200 },
              { año: 2011, captura: 2000 },
              { año: 2012, captura: 2600 },
              { año: 2013, captura: 10800 },
              { año: 2014, captura: 10871 },
              { año: 2015, captura: 7600 },
              { año: 2016, captura: 9400 },
              { año: 2017, captura: 7200 },
              { año: 2018, captura: 4400 },
              { año: 2019, captura: 2701 },
              { año: 2020, captura: 3800 },
            ],
          },
          {
            estado: "Sonora",
            color: "#e11d48",
            datos: [
              { año: 2006, captura: 1250 },
              { año: 2007, captura: 750 },
              { año: 2008, captura: 850 },
              { año: 2009, captura: 1250 },
              { año: 2010, captura: 900 },
              { año: 2011, captura: 1400 },
              { año: 2012, captura: 1300 },
              { año: 2013, captura: 5200 },
              { año: 2014, captura: 9300 },
              { año: 2015, captura: 6700 },
              { año: 2016, captura: 8100 },
              { año: 2017, captura: 6100 },
              { año: 2018, captura: 3700 },
              { año: 2019, captura: 2500 },
              { año: 2020, captura: 3200 },
            ],
          },
          {
            estado: "Baja California",
            color: "#0891b2",
            datos: [
              { año: 2006, captura: 600 },
              { año: 2007, captura: 300 },
              { año: 2008, captura: 700 },
              { año: 2009, captura: 500 },
              { año: 2010, captura: 300 },
              { año: 2011, captura: 600 },
              { año: 2012, captura: 1300 },
              { año: 2013, captura: 5600 },
              { año: 2014, captura: 1571 },
              { año: 2015, captura: 900 },
              { año: 2016, captura: 1300 },
              { año: 2017, captura: 1100 },
              { año: 2018, captura: 700 },
              { año: 2019, captura: 201 },
              { año: 2020, captura: 600 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Se ha documentado un desfase en la disponibilidad del recurso, posiblemente asociado a cambios temporales en la formación de las agregaciones y probablemente relacionado con el fenómeno La Niña durante 2018. También se ha reportado que las hembras de tallas mayores, con mayor actividad reproductiva y más fecundas, están asociadas con áreas de alta productividad (1.51 a 3.30 mg m⁻³ de clorofila a).",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: false,
      disposicion:
        "En proceso de elaboración. Proyecto de NOM-020-SAG/PESC-2019, especificaciones para regular el aprovechamiento de merluza (Merluccius productus) en aguas de jurisdicción federal del litoral del Océano Pacífico y el Golfo de California.",
      sustento: "DOF: 27/11/2019.",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: false,
      disposicion: "En proceso de elaboración.",
      sustento: "Se publicará en 2022.",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial de merluza.",
      sustento: "Opinión técnica del INAPESCA.",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Embarcación mayor con red de arrastre escamera, pudiendo ser de doble aparejo hasta de 30 metros de longitud (malla de 152 mm en alas, 127 mm en cuerpo y 101.6 mm en el copo) y/o arrastre por popa con red de hasta 35 metros de longitud (malla de 152 mm en alas, 127 mm en cuerpo y 101.6 mm en el copo).",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "Variable.", sustento: "Opinión técnica del INAPESCA, Aviso del DOF." },
    {
      instrumento: "7. Cuota",
      aplica: true,
      disposicion: "Captura Biológicamente Aceptable.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcación mayor con red de arrastre escamera, pudiendo ser de doble aparejo y/o arrastre por popa.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion: "Esfuerzo máximo de 80 embarcaciones para el Golfo de California.",
      sustento: "DOF: 11/06/2018.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "Aguas marinas de jurisdicción federal del Golfo de California y de la costa occidental de Baja California.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Merluza del Pacífico norte (Merluccius productus)",
        zona: "Golfo de California",
      },
    ],
    estrategia: "Tasa de aprovechamiento y cuota de captura.",
    tacticas: [
      "Control de esfuerzo",
      "Regulación en el arte y método de captura",
      "Zona de pesca",
      "Co-manejo a través del Comité Consultivo de Manejo Pesquero del Recurso Merluza (instalado el 12/11/2015)",
    ],
  },
  recomendaciones: [
    { recomendacion: "Elaborar la Norma Oficial Mexicana para regular el aprovechamiento del recurso.", avance: "Sin información" },
    { recomendacion: "Elaborar el Plan de Manejo Pesquero.", avance: "Sin información" },
    {
      recomendacion: "Fomentar el co-manejo a través del Comité Consultivo de Manejo Pesquero de Merluza.",
      avance: "Sin información",
    },
    {
      recomendacion: "No incrementar el esfuerzo de pesca (80 embarcaciones por temporada en el Golfo de California).",
      avance: "Sin información",
    },
    { recomendacion: "Realizar estudios para reducir la fauna de acompañamiento en las capturas.", avance: "Sin información" },
    {
      recomendacion:
        "Realizar evaluaciones en Baja California Sur para conocer la disponibilidad y el estatus del recurso.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-pelagicos-menores"] = {
  generalidades: {
    descripcion: [
      "Las zonas de captura se encuentran en aguas marinas de jurisdicción federal del noroeste de México, incluyendo el Golfo de California y la costa occidental de la Península de Baja California. De acuerdo con la región donde operan y el puerto de desembarco se identifican las flotas de Ensenada (Baja California); San Carlos y Adolfo López Mateos, en Bahía Magdalena (Baja California Sur); Guaymas y Yavaros (Sonora); y Mazatlán (Sinaloa-Nayarit).",
      "Las costas de la península occidental de Baja California conforman la región de pesca A. Las costas del Golfo de California, Sinaloa, Nayarit y Jalisco (hasta el paralelo 20° N) conforman la región de pesca B. La zona marina delimitada por el paralelo 20°00' Latitud Norte hasta los límites con la República de Guatemala (del norte de Jalisco hasta Chiapas) conforma la región C.",
    ],
    embarcaciones:
      "La captura comercial se realiza en embarcaciones mayores (>50 toneladas) equipadas con red de cerco con jareta, pangón y un máximo de nueve o diez tripulantes. Actualmente los barcos más comunes son de 25–28 metros de eslora y 141–180 toneladas de capacidad de bodega (37.9%), seguidos de los mayores a 180 toneladas (33.6%) y, al final, los de 23–25 metros de eslora y 101–140 toneladas de capacidad de bodega (28.5%).",
    especiesObjetivo: [
      { nombre: "Sardina monterrey", cientifico: "Sardinops sagax" },
      { nombre: "Anchoveta", cientifico: "Engraulis mordax" },
      { nombre: "Sardina crinuda", cientifico: "Opisthonema libertate" },
      { nombre: "Sardina crinuda azul", cientifico: "Opisthonema bulleri" },
      { nombre: "Sardina crinuda machete", cientifico: "Opisthonema medirastre" },
      { nombre: "Macarela", cientifico: "Scomber japonicus" },
      { nombre: "Sardina bocona", cientifico: "Cetengraulis mysticetus" },
      { nombre: "Sardina japonesa", cientifico: "Etrumeus teres" },
      { nombre: "Charrito", cientifico: "Trachurus symmetricus" },
      { nombre: "Sardina piña", cientifico: "Oligoplites refulgens, O. altus, O. saurus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "El peso desembarcado de los pelágicos menores representa hasta el 50% de la captura nacional y poco menos del 10% del valor económico.",
      "El mayor aporte lo hace Sonora con el 65.0%, seguido de Sinaloa (13.2%), Baja California (12.1%) y Baja California Sur (9.7%).",
      "Existen permisos vigentes para 94 embarcaciones mayores: 48 en Sonora, 12 en Sinaloa, 28 en Baja California y 6 en Baja California Sur.",
      "La captura se destina a harina y aceite de pescado (75–80%), conservas para consumo humano directo (15%) y fresco congelado (5–10%).",
    ],
    // Figura 1. Volumen de captura, 1970–2020 (miles de toneladas). Fuente: Avisos de arribo de CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de pelágicos menores por flota, 1970–2020 (miles de toneladas)",
        series: [
          {
            estado: "Total",
            color: "#64748b",
            datos: [
              { año: 1970, captura: 60 },
              { año: 1973, captura: 130 },
              { año: 1976, captura: 220 },
              { año: 1979, captura: 400 },
              { año: 1982, captura: 450 },
              { año: 1985, captura: 460 },
              { año: 1988, captura: 430 },
              { año: 1991, captura: 250 },
              { año: 1994, captura: 300 },
              { año: 1997, captura: 300 },
              { año: 2000, captura: 400 },
              { año: 2003, captura: 450 },
              { año: 2006, captura: 570 },
              { año: 2009, captura: 700 },
              { año: 2012, captura: 650 },
              { año: 2015, captura: 400 },
              { año: 2018, captura: 650 },
              { año: 2020, captura: 810 },
            ],
          },
          {
            estado: "Sonora",
            color: "#e11d48",
            datos: [
              { año: 1970, captura: 20 },
              { año: 1973, captura: 40 },
              { año: 1976, captura: 60 },
              { año: 1979, captura: 110 },
              { año: 1982, captura: 220 },
              { año: 1985, captura: 300 },
              { año: 1988, captura: 300 },
              { año: 1991, captura: 220 },
              { año: 1994, captura: 145 },
              { año: 1997, captura: 130 },
              { año: 2000, captura: 200 },
              { año: 2003, captura: 280 },
              { año: 2006, captura: 350 },
              { año: 2009, captura: 530 },
              { año: 2012, captura: 460 },
              { año: 2015, captura: 220 },
              { año: 2018, captura: 410 },
              { año: 2020, captura: 490 },
            ],
          },
          {
            estado: "Ensenada",
            color: "#0891b2",
            datos: [
              { año: 1970, captura: 10 },
              { año: 1973, captura: 30 },
              { año: 1976, captura: 100 },
              { año: 1979, captura: 250 },
              { año: 1982, captura: 150 },
              { año: 1985, captura: 110 },
              { año: 1988, captura: 100 },
              { año: 1991, captura: 60 },
              { año: 1994, captura: 40 },
              { año: 1997, captura: 60 },
              { año: 2000, captura: 80 },
              { año: 2003, captura: 50 },
              { año: 2006, captura: 60 },
              { año: 2009, captura: 60 },
              { año: 2012, captura: 100 },
              { año: 2015, captura: 40 },
              { año: 2018, captura: 100 },
              { año: 2020, captura: 150 },
            ],
          },
          {
            estado: "Mazatlán",
            color: "#0d9488",
            datos: [
              { año: 1970, captura: 5 },
              { año: 1973, captura: 10 },
              { año: 1976, captura: 15 },
              { año: 1979, captura: 15 },
              { año: 1982, captura: 20 },
              { año: 1985, captura: 20 },
              { año: 1988, captura: 20 },
              { año: 1991, captura: 20 },
              { año: 1994, captura: 30 },
              { año: 1997, captura: 30 },
              { año: 2000, captura: 50 },
              { año: 2003, captura: 50 },
              { año: 2006, captura: 80 },
              { año: 2009, captura: 100 },
              { año: 2012, captura: 110 },
              { año: 2015, captura: 60 },
              { año: 2018, captura: 60 },
              { año: 2020, captura: 80 },
            ],
          },
          {
            estado: "Bahía Magdalena",
            color: "#f59e0b",
            datos: [
              { año: 1970, captura: 5 },
              { año: 1973, captura: 10 },
              { año: 1976, captura: 10 },
              { año: 1979, captura: 15 },
              { año: 1982, captura: 15 },
              { año: 1985, captura: 20 },
              { año: 1988, captura: 20 },
              { año: 1991, captura: 15 },
              { año: 1994, captura: 20 },
              { año: 1997, captura: 30 },
              { año: 2000, captura: 40 },
              { año: 2003, captura: 40 },
              { año: 2006, captura: 45 },
              { año: 2009, captura: 50 },
              { año: 2012, captura: 50 },
              { año: 2015, captura: 30 },
              { año: 2018, captura: 60 },
              { año: 2020, captura: 90 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Las especies que componen este recurso son altamente variables; su abundancia y disponibilidad responden fuertemente a la variabilidad ambiental (fenómenos de tipo El Niño y La Niña). Adicionalmente, las poblaciones de pelágicos menores sufren importantes cambios de baja frecuencia (de 20 a 60 años).",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "NOM-003-SAG/PESC-2018, para regular el aprovechamiento de las especies de peces pelágicos menores con embarcaciones de cerco, en aguas de jurisdicción federal del Océano Pacífico, incluyendo el Golfo de California.",
      sustento: "DOF: 12/03/2019.",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Acuerdo por el que se da a conocer el Plan de Manejo Pesquero para la Pesquería de Pelágicos Menores (sardinas, anchovetas, macarela y afines) del Noroeste de México.",
      sustento: "DOF: 08/11/2012.",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso (o concesión) de pesca comercial de pelágicos menores.",
      sustento: "Opinión técnica del INAPESCA.",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "Sardina monterrey (Sardinops sagax): 150 mm de longitud patrón. Sardina crinuda (Opisthonema spp.): 160 mm de longitud patrón (140 mm en la región sur del Golfo de California). Anchoveta (Engraulis mordax): 100 mm de longitud patrón. Porcentajes máximos permitidos por debajo de la talla mínima: 33% para sardina monterrey, 38% para sardina crinuda y 46% para anchoveta.",
      sustento:
        "Numerales 4.2, 4.2.1, 4.2.2 y 4.2.3 de la NOM-003-SAG/PESC-2018 (DOF: 12/03/2019); Acuerdo regulatorio (DOF: 08/10/2019).",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Embarcaciones mayores equipadas con red de cerco con jareta, pangón y un máximo de 10 tripulantes. Longitud de las redes entre 360 y 650 metros; altura entre 40 y 100 metros; luz de malla entre 13 y 25 milímetros. Lances durante el oscuro lunar (22 a 26 días centrados en la luna nueva).",
      sustento: "NOM-003-SAG/PESC-2018 (DOF: 12/03/2019); Plan de Manejo Pesquero (DOF: 08/11/2012).",
    },
    {
      instrumento: "6. Veda",
      aplica: false,
      disposicion:
        "El INAPESCA podrá recomendar periodo y zona de veda para las diferentes especies en función de las evaluaciones biológico-pesqueras, que se darán a conocer mediante Acuerdos regulatorios publicados en el DOF.",
      sustento: "Numeral 4.6 de la NOM-003-SAG/PESC-2018 (DOF: 12/03/2019).",
    },
    {
      instrumento: "7. Cuota",
      aplica: false,
      disposicion:
        "Aplicará solo en función de lo que dictan el Plan de Manejo para la Pesquería de Pelágicos Menores y la NOM-003-SAG/PESC-2018.",
      sustento: "Opinión técnica del INAPESCA; se dará a conocer mediante Acuerdo regulatorio publicado en el DOF.",
    },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones mayores (>50 toneladas) equipadas con red de cerco con jareta, pangón y un máximo de 10 tripulantes.",
      sustento: "NOM-003-SAG/PESC-2018 (DOF: 12/03/2019).",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion:
        "48 embarcaciones con puerto base en Sonora (Guaymas y Yavaros), 12 en Sinaloa (Mazatlán), 28 en Baja California (Ensenada) y 6 en Baja California Sur (Bahía Magdalena). Padrón cerrado en Sonora y Sinaloa.",
      sustento: "Numeral 4.14 de la NOM-003-SAG/PESC-2018 (DOF: 12/03/2019). Opinión técnica del INAPESCA.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal del noroeste de México (Golfo de California, costa occidental de Baja California y Baja California Sur, incluido el interior de Bahía Magdalena), respetando los programas de manejo de las Reservas de la Biosfera y áreas de no pesca (bocas de bahía, lagunas costeras y esteros).",
      sustento: "NOM-003-SAG/PESC-2018 (DOF: 12/03/2019) y diversos decretos de Áreas Naturales Protegidas.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Sardina monterrey, sardina crinuda, macarela, bocona y anchoveta",
        zona: "Golfo de California (Sonora y Sinaloa)",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Sardina monterrey (Sardinops sagax)",
        zona: "Ensenada, Baja California",
      },
      {
        categoria: "Indeterminado",
        color: "gray",
        especie: "Anchoveta (Engraulis mordax)",
        zona: "Ensenada, Baja California",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Pelágicos menores",
        zona: "Bahía Magdalena, Baja California Sur",
      },
    ],
    estrategia:
      "Para sardina monterrey, sardina crinuda y macarela se establece un Volumen Permisible de Captura Anual, que no puede ser mayor que la captura biológicamente aceptable, estimada con una regla de control del Rendimiento Máximo Sustentable. Para las demás especies, el Volumen Permisible de Captura Anual será igual al promedio de la captura de los últimos tres años.",
    tacticas: [
      "Control del esfuerzo pesquero (número de embarcaciones de pesca comercial)",
      "Talla mínima legal con porcentaje máximo de captura incidental por debajo de esa talla",
      "Regulaciones en las artes y método de pesca",
      "Suspensión de actividades de pesca por área y/o tiempo",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "No incrementar el número de permisos de pesca en las zonas donde el aprovechamiento está al Rendimiento Máximo Sustentable.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Que el Volumen Permisible de Captura Anual, asociado a la captura biológicamente aceptable, para los diferentes stocks de pelágicos menores sea el estimado para cada stock.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Dar seguimiento al comportamiento de las capturas a lo largo de la temporada para monitorear si algún stock está próximo a alcanzar el Volumen Permisible de Captura Anual o los porcentajes por debajo de la talla mínima legal y, en su caso, generar un aviso en el DOF para suspender la pesca.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "En la región con potencial de desarrollo, aprovechar ese potencial mediante nuevos permisos siempre sustentado por una Opinión Técnica del INAPESCA sobre la disponibilidad biológica y la factibilidad técnica.",
      avance: "Sin información",
    },
    { recomendacion: "Formalizar y hacer operativos los Subcomités de Pesca.", avance: "Sin información" },
    {
      recomendacion: "Realizar exploración de nuevas áreas con potencial de pesca al sur del paralelo 20° Norte.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Promover un programa de observadores científicos a bordo para evaluar el impacto de la pesquería sobre las especies asociadas.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "No permitir el movimiento de las flotas entre las regiones de la Península de Baja California y las del Golfo de California (Sonora-Sinaloa), salvo autorización expresa y temporal de la autoridad pesquera por razones operacionales y de mantenimiento.",
      avance: "Sin información",
    },
    {
      recomendacion: "Instrumentar las líneas de investigación establecidas en el Plan de Manejo Pesquero.",
      avance: "Sin información",
    },
  ],
}

fichas["gm-jaiba-del-golfo-de-mexico"] = {
  generalidades: {
    descripcion: [
      "La captura de jaiba en Tamaulipas, Veracruz, Tabasco y Campeche constituye una de las principales pesquerías ribereñas del Golfo de México. Es una pesquería de tipo artesanal, con una operación de captura relativamente simple y equipo de pesca de bajo costo relativo. Tiene un papel importante en la economía municipal, regional y nacional, pues representa una valiosa fuente de alimento y de empleo, especialmente para las comunidades ribereñas.",
      "En México existen diez especies de jaiba del género Callinectes, y cuatro de ellas soportan la pesquería en el Golfo de México (Callinectes sapidus, Callinectes rathbunae, Callinectes similis y Callinectes bocourti). En Tamaulipas y Veracruz la pesquería se sostiene principalmente por la jaiba azul (C. sapidus) y la jaiba prieta (C. rathbunae), que comparten un mismo nicho ecológico. La jaiba azul se distribuye desde Tamaulipas hasta Chetumal, Quintana Roo; la jaiba prieta, desde el río Bravo en Tamaulipas hasta la laguna de Términos en Campeche.",
    ],
    embarcaciones:
      "Las unidades de pesca son embarcaciones menores de madera o fibra de vidrio, con motor fuera de borda o propulsadas por remos o varas de madera. Participan uno o dos pescadores.",
    artesPesca:
      "Se emplean aros jaiberos (también llamados nasas) y/o trampas tipo Chesapeake (trampas jaiberas). Ambas artes son de tipo pasivo: los ejemplares deben nadar hacia el arte para ser atrapados. Los aros están hechos de varilla corrugada o alambrón acerado con una red encabalgada; se ceban con desperdicio de pescado o patas de pollo y llevan una boya vistosa para su localización. Las trampas son estructuras rígidas de alambrón forradas de tela de gallinero o malla de nylon, con una o varias entradas, un comedero y una puerta de liberación.",
    especiesObjetivo: [
      { nombre: "Jaiba azul", cientifico: "Callinectes sapidus" },
      { nombre: "Jaiba prieta", cientifico: "Callinectes rathbunae" },
    ],
    especiesAsociadas: [
      { nombre: "Jaiba pequeña azul", cientifico: "Callinectes similis" },
      { nombre: "Jaiba roma", cientifico: "Callinectes bocourti" },
      { nombre: "Jaiba sari", cientifico: "Callinectes danae" },
      { nombre: "Jaiba", cientifico: "Callinectes ornatus" },
      { nombre: "Jaiba roja", cientifico: "Arenaeus spp." },
      { nombre: "Cangrejo moro", cientifico: "Menippe mercenaria" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "En el Golfo de México y Mar Caribe se observan tres niveles de captura: promedio de 12,288 t/año (1993–1999), 9,662 t/año (2000–2013) y un repunte a 15,372 t/año (2014–2019).",
      "Tamaulipas y, sobre todo, Campeche han determinado la tendencia regional al alza a partir de 2013; la producción de Tabasco se mantiene por debajo del promedio desde 2007.",
      "El esfuerzo nominal registra en el SAP (2016–2021): Tamaulipas 81 permisionarios y 990 embarcaciones; Veracruz 136 permisionarios y 2,190 embarcaciones; Tabasco 33 permisionarios y 208 embarcaciones; Campeche 49 permisionarios y 236 embarcaciones; Yucatán 11 permisionarios y 40 embarcaciones.",
    ],
    // Figura 1. Producción anual de jaiba en el Golfo de México y Mar Caribe, 1991–2019. Fuente: Anuarios Estadísticos.
    capturaPorEstado: [
      {
        titulo: "Producción anual de jaiba en el Golfo de México y Mar Caribe, 1991–2019 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Captura total",
            color: "#64748b",
            datos: [
              { año: 1991, captura: 8000 },
              { año: 1992, captura: 9500 },
              { año: 1993, captura: 11000 },
              { año: 1994, captura: 10800 },
              { año: 1995, captura: 10500 },
              { año: 1996, captura: 11500 },
              { año: 1997, captura: 14300 },
              { año: 1998, captura: 13000 },
              { año: 1999, captura: 12500 },
              { año: 2000, captura: 10000 },
              { año: 2001, captura: 8300 },
              { año: 2002, captura: 7300 },
              { año: 2003, captura: 9000 },
              { año: 2004, captura: 11700 },
              { año: 2005, captura: 10800 },
              { año: 2006, captura: 10300 },
              { año: 2007, captura: 10000 },
              { año: 2008, captura: 9700 },
              { año: 2009, captura: 9500 },
              { año: 2010, captura: 7900 },
              { año: 2011, captura: 11600 },
              { año: 2012, captura: 9800 },
              { año: 2013, captura: 9500 },
              { año: 2014, captura: 11000 },
              { año: 2015, captura: 15000 },
              { año: 2016, captura: 17800 },
              { año: 2017, captura: 17000 },
              { año: 2018, captura: 16700 },
              { año: 2019, captura: 12700 },
            ],
          },
        ],
      },
      // Figura 2. Producción anual de jaiba por estado, 1991–2019. Fuente: Anuarios Estadísticos.
      {
        titulo: "Producción anual de jaiba por estado, 1991–2019 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Tamaulipas",
            color: "#e11d48",
            datos: [
              { año: 1991, captura: 3600 },
              { año: 1993, captura: 3600 },
              { año: 1995, captura: 4000 },
              { año: 1997, captura: 3200 },
              { año: 1999, captura: 1500 },
              { año: 2001, captura: 2000 },
              { año: 2003, captura: 2900 },
              { año: 2005, captura: 2600 },
              { año: 2007, captura: 2600 },
              { año: 2009, captura: 4500 },
              { año: 2011, captura: 2600 },
              { año: 2013, captura: 3000 },
              { año: 2015, captura: 6500 },
              { año: 2017, captura: 5800 },
              { año: 2019, captura: 4700 },
            ],
          },
          {
            estado: "Veracruz",
            color: "#0891b2",
            datos: [
              { año: 1991, captura: 2000 },
              { año: 1993, captura: 4800 },
              { año: 1995, captura: 5300 },
              { año: 1997, captura: 6000 },
              { año: 1999, captura: 5000 },
              { año: 2001, captura: 2800 },
              { año: 2003, captura: 3000 },
              { año: 2005, captura: 3300 },
              { año: 2007, captura: 3700 },
              { año: 2009, captura: 3500 },
              { año: 2011, captura: 3000 },
              { año: 2013, captura: 3700 },
              { año: 2015, captura: 3000 },
              { año: 2017, captura: 5100 },
              { año: 2019, captura: 1700 },
            ],
          },
          {
            estado: "Tabasco",
            color: "#0d9488",
            datos: [
              { año: 1991, captura: 1300 },
              { año: 1993, captura: 1200 },
              { año: 1995, captura: 1100 },
              { año: 1997, captura: 1300 },
              { año: 1999, captura: 1500 },
              { año: 2001, captura: 1400 },
              { año: 2003, captura: 1500 },
              { año: 2005, captura: 1900 },
              { año: 2007, captura: 1500 },
              { año: 2009, captura: 1300 },
              { año: 2011, captura: 1500 },
              { año: 2013, captura: 1400 },
              { año: 2015, captura: 1300 },
              { año: 2017, captura: 900 },
              { año: 2019, captura: 700 },
            ],
          },
          {
            estado: "Campeche",
            color: "#f59e0b",
            datos: [
              { año: 1991, captura: 900 },
              { año: 1993, captura: 2000 },
              { año: 1995, captura: 3200 },
              { año: 1997, captura: 2800 },
              { año: 1999, captura: 2000 },
              { año: 2001, captura: 3200 },
              { año: 2003, captura: 3600 },
              { año: 2005, captura: 2600 },
              { año: 2007, captura: 2900 },
              { año: 2009, captura: 1800 },
              { año: 2011, captura: 2000 },
              { año: 2013, captura: 3500 },
              { año: 2015, captura: 6800 },
              { año: 2017, captura: 7300 },
              { año: 2019, captura: 4800 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "La reproducción ocurre cerca de la costa durante la primavera y el verano, coincidiendo con el aumento de vientos y de surgencias topográficas. La época de lluvia favorece el crecimiento debido al aporte de nutrientes vía afluentes de ríos. La especie tiene un vínculo asociativo con las mareas y la fase lunar, que generan turbulencia capaz de funcionar como agente mecánico de traslación, provocando su resuspensión y el reciclado de nutrientes para su alimentación.",
    "Respecto al cambio climático, en Estados Unidos se ha observado el desplazamiento de poblaciones de C. sapidus unos 500 kilómetros hacia el Golfo de Maine, debido al incremento de la temperatura media del agua. Los efectos de estos movimientos sobre el ecosistema son difusos, ya que como especie invasora puede afectar negativamente a otras poblaciones de recursos marinos.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial.",
      sustento: "Opinión técnica del INAPESCA.",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion: "110 mm de ancho de caparazón, de espina a espina.",
      sustento: "DOF: 18/04/1974.",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Aros jaiberos (nasas jaiberas) y trampas jaiberas, sin características obligatorias. Artes de tipo pasivo, con carnada, con una boya vistosa para su localización; se calan en zonas someras, se dejan reposar y se izan para retirar los organismos capturados.",
      sustento: "Permiso de pesca comercial para jaiba.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcaciones menores.",
      sustento: "Permiso de pesca comercial.",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion:
        "Tamaulipas: 81 permisionarios, 990 embarcaciones, 6,785 aros y 62,715 trampas. Veracruz: 136 permisionarios, 2,190 embarcaciones, 105,878 aros y 88,878 trampas. Tabasco: 33 permisionarios, 208 embarcaciones y 16,013 trampas. Campeche: 49 permisionarios, 236 embarcaciones, 2,569 aros y 30,783 trampas. Yucatán: 11 permisionarios, 40 embarcaciones y 540 trampas.",
      sustento: "Información del SAP 2016 a 2021, permisos actuales.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas y costeras de jurisdicción federal, sistemas lagunares y estuarinos del Golfo de México.",
      sustento: "Permiso de pesca comercial.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Jaiba (Callinectes spp.)",
        zona: "Golfo de México",
      },
    ],
    estrategia: "Tasa de aprovechamiento variable.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Talla mínima de captura",
      "Liberación de hembras ovígeras",
      "Zonas de refugio pesquero",
    ],
  },
  recomendaciones: [
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información" },
    {
      recomendacion: "Regular las artes de pesca (número máximo de aros o trampas jaiberas).",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Elaborar Planes de Manejo Pesquero de jaiba que consideren, entre otras medidas, la talla mínima de pesca por especie, áreas restringidas a la pesca de hembras ovígeras y juveniles, la liberación de hembras con esponja (hueva externa) y la innovación y/o actualización de las artes de pesca.",
      avance: "Sin información",
    },
  ],
}

// Adjunta cada ficha a su especie: `especie.ficha` es la fuente única del detalle.
for (const especie of especies) {
  especie.ficha = fichas[especie.id]
}
