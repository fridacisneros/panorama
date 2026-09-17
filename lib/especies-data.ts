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
  // Serie medida en el eje derecho (para gráficas con dos unidades, como
  // rendimiento en kg/día y esfuerzo en días de pesca).
  eje?: "izquierdo" | "derecho"
  punteada?: boolean
  // Fuerza (o suprime) los puntos de la serie. Por omisión se dibujan sólo en las series
  // cortas; las series largas pero de años dispersos, como las de temperatura, los necesitan.
  marcadores?: boolean
  datos: { año: number; captura: number }[]
}

// Línea horizontal de referencia sobre la serie (p. ej. el rendimiento máximo
// sostenible estimado y sus límites de confianza, como los traza la CNP).
export interface ReferenciaGrafica {
  valor: number
  etiqueta: string
  tipo?: "solida" | "punteada"
}

export interface GraficaCapturaEstados {
  titulo: string
  series: SerieCapturaEstado[]
  referencias?: ReferenciaGrafica[]
  nota?: string
  // Unidades de cada eje; por omisión el izquierdo son toneladas y no hay eje derecho.
  unidadIzquierda?: string
  unidadDerecha?: string
  // Rango del eje izquierdo. Por omisión arranca en cero, lo cual aplana las series que no
  // parten de ahí (temperaturas, por ejemplo).
  dominioIzquierda?: [number, number]
}

export interface ParticipacionEstado {
  estado: string
  porcentaje: number
  captura?: number
}

// Cifra clave de la pesquería que se resalta en un recuadro (talla, rendimiento,
// tasa de explotación…), con el mismo formato que los recuadros de captura.
export interface IndicadorClave {
  etiqueta: string
  valor: string
  unidad: string
  icono?: "talla" | "rendimiento" | "tasa"
  // Color del recuadro (borde, cifra e icono). Por omisión usa el verde azulado de la ficha.
  color?: string
}

// Participación estatal de una especie. Permite fichas con más de una especie
// objetivo, como la de bagres marinos (bagre bandera y curuco).
export interface GraficaParticipacion {
  titulo: string
  nota?: string
  estados: ParticipacionEstado[]
}

// Barra apilada horizontal de parte-de-un-todo: cada renglón es un estado, su largo
// es la participación del estado en el total nacional y los segmentos son la
// composición por especie dentro de ese estado (suman 100 dentro del renglón).
export interface SegmentoEspecie {
  especie: string
  // Porcentaje dentro del estado, no respecto al total nacional.
  porcentaje: number
  color: string
}

export interface GraficaParticipacionApilada {
  titulo: string
  nota?: string
  estados: { estado: string; porcentaje: number; especies: SegmentoEspecie[] }[]
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

// Figura de la CNP reproducida tal cual como imagen, para gráficas que no pueden
// reconstruirse fielmente a partir de los datos (p. ej. el diagrama de fases de Kobe,
// cuya trayectoria anual no es legible punto por punto).
export interface FiguraCNP {
  titulo: string
  src: string
  alt: string
  nota?: string
}

// Rendimiento máximo sostenible estimado por estado, con sus intervalos de confianza.
export interface FilaRMS {
  estado: string
  rms: number
  icMenos: number
  icMas: number
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
    indicadoresClave?: IndicadorClave[]
    valorProduccion?: string
    empleos?: string
    embarcaciones?: string
    // Oraciones sueltas de la CNP que se muestran como recuadros de "datos importantes".
    datosDestacados?: string[]
    capturaHistorica?: PuntoCaptura[]
    capturaPorEstado?: GraficaCapturaEstados[]
    participacionEstados?: ParticipacionEstado[]
    // Recuadros que preceden a la gráfica de participación estatal (p. ej. el reparto de la
    // captura de cada especie entre los estados).
    indicadoresParticipacion?: IndicadorClave[]
    participacionPorEspecie?: GraficaParticipacion[]
    participacionApilada?: GraficaParticipacionApilada
  }
  ambiente?: string[]
  // Gráficas que acompañan a los párrafos de ambiente y clima (p. ej. las series de
  // temperatura de las zonas de distribución).
  ambienteGraficas?: GraficaCapturaEstados[]
  normatividad?: FilaNormatividad[]
  status?: {
    cards?: StatusCard[]
    estrategia?: string
    tacticas?: string[]
    rmsPorEstado?: FilaRMS[]
    rmsNota?: string
    figuras?: FiguraCNP[]
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
    id: "gm-sargazo-holopelagico-del-caribe",
    nombre: "Sargazo holopelágico del Caribe",
    nombreCientifico: "Sargassum natans, Sargassum fluitans",
    status: "Con potencial de desarrollo",
    statusColor: "green",
    zona: "Caribe mexicano",
    region: "Golfo de México y Mar Caribe",
    captura: "945,000 toneladas (aprovechamiento anual propuesto)",
    descripcion: "Macroalga parda flotante que arriba masivamente al Caribe mexicano; recurso con potencial de aprovechamiento para fertilizantes, biocombustibles, bioplásticos y biomateriales",
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
  {
    id: "gm-jurel-y-cojinuda-del-golfo-de-mexico-y-mar-caribe",
    nombre: "Jurel y cojinuda del Golfo de México y Mar Caribe",
    nombreCientifico: "Caranx hippos, Caranx latus, Caranx crysos",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "17,160 toneladas",
    descripcion: "Carángidos capturados con redes de enmalle, líneas de mano, curricán y palangre por la flota menor del Golfo de México, principalmente en Veracruz",
    ultimaActualizacion: 2022,
  },
  {
    id: "gm-langosta-del-golfo-de-mexico-y-mar-caribe",
    nombre: "Langosta del Golfo de México y Mar Caribe",
    nombreCientifico: "Panulirus argus, Panulirus guttatus",
    status: ["Aprovechado al máximo sustentable", "Con signos de sobreexplotación"],
    statusColor: ["yellow", "red"],
    zona: "Península de Yucatán",
    region: "Golfo de México y Mar Caribe",
    captura: "1,300 toneladas",
    descripcion: "Langosta del Caribe capturada por buceo con hookah, trampas y casitas en nueve zonas de Yucatán y Quintana Roo; producto de exportación de alto valor comercial",
    ultimaActualizacion: 2022,
  },
  {
    id: "gm-lisa-y-liseta-o-lebrancha-del-golfo-de-mexico",
    nombre: "Lisa y liseta o lebrancha del Golfo de México",
    nombreCientifico: "Mugil cephalus, Mugil curema",
    status: ["Aprovechado al máximo sustentable", "En deterioro"],
    statusColor: ["yellow", "red"],
    zona: "Tamaulipas y Veracruz",
    region: "Golfo de México y Mar Caribe",
    captura: "8,872 toneladas",
    descripcion: "Lisa y lebrancha capturadas con redes de enmalle en la Laguna Madre y la laguna de Tamiahua; la «hueva» es el producto de mayor valor en el mercado",
    ultimaActualizacion: 2022,
  },
  {
    id: "gm-rayas-del-golfo-de-mexico",
    nombre: "Rayas del Golfo de México",
    nombreCientifico: "Hypanus americanus, Aetobatus narinari, Rhinoptera bonasus",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "2,880 toneladas",
    descripcion: "Pesquería ribereña artesanal de rayas con palangre, red de enmalle y arpón, concentrada en Campeche, Tabasco y Veracruz",
    ultimaActualizacion: 2022,
  },
  {
    id: "gm-sierra-y-peto-del-golfo-de-mexico",
    nombre: "Sierra y peto del Golfo de México",
    nombreCientifico: "Scomberomorus maculatus, Scomberomorus cavalla",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "8,000 toneladas",
    descripcion: "Pequeños túnidos migratorios capturados con red de enmalle y curricán por la flota ribereña del Golfo de México",
    ultimaActualizacion: 2022,
  },
  {
    id: "gm-tiburones-del-golfo-de-mexico-y-mar-caribe",
    nombre: "Tiburones del Golfo de México y Mar Caribe",
    nombreCientifico: "Rhizoprionodon terraenovae, Sphyrna tiburo, Carcharhinus limbatus",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Golfo de México y Mar Caribe",
    region: "Golfo de México y Mar Caribe",
    captura: "7,300 toneladas",
    descripcion: "Pesquería artesanal multiespecífica de alrededor de 50 especies, con flota ribereña y de mediana altura que opera palangre y red de enmalle",
    ultimaActualizacion: 2022,
  },
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
  {
    id: "pac-calamar-loligo",
    nombre: "Calamar loligo",
    nombreCientifico: "Doryteuthis opalescens",
    status: "Con potencial de desarrollo",
    statusColor: "green",
    zona: "Costa occidental de Baja California",
    region: "Litoral del Pacífico",
    captura: "2,000 toneladas",
    descripcion: "Calamar de ciclo de vida corto y resiliencia alta, capturado con red de cerco frente a Ensenada, Baja California",
    ultimaActualizacion: 2018,
  },
  {
    id: "pac-camaron-del-pacifico",
    nombre: "Camarón del Pacífico",
    nombreCientifico: "Litopenaeus stylirostris, L. vannamei, Farfantepenaeus californiensis",
    status: "Aprovechado al máximo sustentable",
    statusColor: "yellow",
    zona: "Del Golfo de California al Golfo de Tehuantepec",
    region: "Litoral del Pacífico",
    captura: "31,500 toneladas",
    descripcion: "Pesquería de camarón azul, blanco, café y cristal con flota mayor de arrastre y flota menor de atarraya, suripera y chinchorro de línea",
    ultimaActualizacion: 2018,
  },
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
      indicadoresClave: [
        { etiqueta: "Talla de almeja blanca", valor: "1.8–13", unidad: "cm de longitud de concha", icono: "talla" },
        {
          etiqueta: "Participación de Sonora",
          valor: "80%",
          unidad: "del volumen total extraído",
          icono: "tasa",
        },
      ],
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
              estado: "Baja California",
              color: "#0d9488",
              datos: [
                { año: 2017, captura: 10 },
                { año: 2018, captura: 50 },
                { año: 2019, captura: 81 },
                { año: 2020, captura: 40 },
              ],
            },
            {
              estado: "Baja California Sur",
              color: "#0891b2",
              datos: [{ año: 2019, captura: 13 }],
            },
            {
              estado: "Sinaloa",
              color: "#8b5cf6",
              datos: [{ año: 2020, captura: 910 }],
            },
          ],
        },
      ],
      // Participación de cada estado en la captura total de almeja blanca,
      // ordenada de mayor a menor.
      participacionEstados: [
        { estado: "Sonora", porcentaje: 80 },
        { estado: "Sinaloa", porcentaje: 16 },
        { estado: "Baja California", porcentaje: 3 },
        { estado: "Baja California Sur", porcentaje: 1 },
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
      // Reparto de la captura de los últimos diez años por especie, con el color de cada abulón.
      indicadoresClave: [
        { etiqueta: "Abulón azul", valor: "78.4%", unidad: "de la captura de los últimos diez años", color: "#2a78d6" },
        { etiqueta: "Abulón amarillo", valor: "21.1%", unidad: "de la captura de los últimos diez años", color: "#eda100" },
        { etiqueta: "Abulón chino", valor: "0.5%", unidad: "de la captura de los últimos diez años", color: "#e87ba4" },
        { etiqueta: "Abulón negro", valor: "0.3%", unidad: "de la captura de los últimos diez años", color: "#4a3aa7" },
        { etiqueta: "Abulón rojo", valor: "0.2%", unidad: "de la captura de los últimos diez años", color: "#e34948" },
      ],
      // Tendencia de la captura de abulón (peso callo) en BC y BCS, 2000-2020 (Fuente: CONAPESCA).
      capturaPorEstado: [
        {
          titulo: "Captura de abulón (peso callo) por estado, 2000–2020 (CONAPESCA)",
          nota: "Serie leída de la figura 1 de la Carta Nacional Pesquera 2023 (captura de abulón en peso callo de Baja California y Baja California Sur, 2000-2020, CONAPESCA); los valores anuales son aproximados.",
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
                { año: 2010, captura: 154 },
                { año: 2011, captura: 80 },
                { año: 2012, captura: 120 },
                { año: 2013, captura: 68 },
                { año: 2014, captura: 60 },
                { año: 2015, captura: 53 },
                { año: 2016, captura: 55 },
                { año: 2017, captura: 58 },
                { año: 2018, captura: 21 },
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
                { año: 2018, captura: 50 },
                { año: 2019, captura: 63 },
                { año: 2020, captura: 104 },
              ],
            },
          ],
        },
      ],
      participacionApilada: {
        titulo: "Participación estatal y composición por especie",
        nota: "El largo de cada barra es la participación del estado en la captura nacional de abulón (Baja California Sur 65%, Baja California 35%) y los segmentos son la composición por especie dentro de ese estado, que suma 100% en cada renglón. El abulón negro y el rojo representan 0.3% y 0.2% de la captura de Baja California, por lo que sus segmentos son casi imperceptibles; sus cifras exactas están en los recuadros de arriba.",
        estados: [
          {
            estado: "Baja California Sur",
            porcentaje: 65,
            especies: [
              { especie: "Abulón azul", porcentaje: 68.6, color: "#2a78d6" },
              { especie: "Abulón amarillo", porcentaje: 31.4, color: "#eda100" },
            ],
          },
          {
            estado: "Baja California",
            porcentaje: 35,
            especies: [
              { especie: "Abulón azul", porcentaje: 78.4, color: "#2a78d6" },
              { especie: "Abulón amarillo", porcentaje: 21.1, color: "#eda100" },
              { especie: "Abulón negro", porcentaje: 0.3, color: "#4a3aa7" },
              { especie: "Abulón rojo", porcentaje: 0.2, color: "#e34948" },
            ],
          },
        ],
      },
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
      capturaPorEstado: [
        {
          titulo: "Captura de camarón café en Tamaulipas y Veracruz, 1995-2021",
          nota: "Serie leída de la figura 1 de la CNP (captura de Tamaulipas y Veracruz, 1995-2021); los valores son aproximados. El máximo de 2010 (14,595 t) y el mínimo de 2013 (7,561 t) son los que cita el texto de la ficha.",
          series: [
            {
              estado: "Total",
              color: "#0d9488",
              datos: [
                { año: 1995, captura: 12363 },
                { año: 1996, captura: 10963 },
                { año: 1997, captura: 11823 },
                { año: 1998, captura: 13794 },
                { año: 1999, captura: 11250 },
                { año: 2000, captura: 11124 },
                { año: 2001, captura: 11080 },
                { año: 2002, captura: 9551 },
                { año: 2003, captura: 12713 },
                { año: 2004, captura: 11289 },
                { año: 2005, captura: 13941 },
                { año: 2006, captura: 11588 },
                { año: 2007, captura: 11998 },
                { año: 2008, captura: 12506 },
                { año: 2009, captura: 10705 },
                { año: 2010, captura: 14595 },
                { año: 2011, captura: 10299 },
                { año: 2012, captura: 9768 },
                { año: 2013, captura: 7561 },
                { año: 2014, captura: 9013 },
                { año: 2015, captura: 11678 },
                { año: 2016, captura: 12867 },
                { año: 2017, captura: 12361 },
                { año: 2018, captura: 13538 },
                { año: 2019, captura: 12881 },
                { año: 2020, captura: 9393 },
                { año: 2021, captura: 12468 },
              ],
            },
            {
              estado: "Altamar",
              color: "#0891b2",
              punteada: true,
              datos: [
                { año: 1995, captura: 6833 },
                { año: 1996, captura: 6180 },
                { año: 1997, captura: 7499 },
                { año: 1998, captura: 7764 },
                { año: 1999, captura: 6217 },
                { año: 2000, captura: 5578 },
                { año: 2001, captura: 6304 },
                { año: 2002, captura: 5090 },
                { año: 2003, captura: 6370 },
                { año: 2004, captura: 5664 },
                { año: 2005, captura: 6947 },
                { año: 2006, captura: 6504 },
                { año: 2007, captura: 7601 },
                { año: 2008, captura: 8042 },
                { año: 2009, captura: 6951 },
                { año: 2010, captura: 9913 },
                { año: 2011, captura: 6630 },
                { año: 2012, captura: 6504 },
                { año: 2013, captura: 5064 },
                { año: 2014, captura: 5854 },
                { año: 2015, captura: 7096 },
                { año: 2016, captura: 6947 },
                { año: 2017, captura: 7762 },
                { año: 2018, captura: 7683 },
                { año: 2019, captura: 6458 },
                { año: 2020, captura: 5512 },
                { año: 2021, captura: 7762 },
              ],
            },
            {
              estado: "Laguna",
              color: "#94a3b8",
              datos: [
                { año: 1995, captura: 5495 },
                { año: 1996, captura: 4715 },
                { año: 1997, captura: 4274 },
                { año: 1998, captura: 5938 },
                { año: 1999, captura: 4966 },
                { año: 2000, captura: 5546 },
                { año: 2001, captura: 4715 },
                { año: 2002, captura: 4715 },
                { año: 2003, captura: 6343 },
                { año: 2004, captura: 5626 },
                { año: 2005, captura: 6994 },
                { año: 2006, captura: 5043 },
                { año: 2007, captura: 4389 },
                { año: 2008, captura: 4389 },
                { año: 2009, captura: 3671 },
                { año: 2010, captura: 4682 },
                { año: 2011, captura: 3538 },
                { año: 2012, captura: 3214 },
                { año: 2013, captura: 2497 },
                { año: 2014, captura: 3098 },
                { año: 2015, captura: 4601 },
                { año: 2016, captura: 5889 },
                { año: 2017, captura: 4549 },
                { año: 2018, captura: 5856 },
                { año: 2019, captura: 6422 },
                { año: 2020, captura: 3776 },
                { año: 2021, captura: 4680 },
              ],
            },
          ],
        },
        {
          titulo: "Tamaulipas: rendimiento y esfuerzo pesquero, 1995-2021",
          nota: "Serie leída de la figura 2 de la CNP (1995-2021); los valores son aproximados. El rendimiento se mide en el eje izquierdo y el esfuerzo pesquero en el derecho.",
          unidadIzquierda: "kg/día",
          unidadDerecha: "Días de pesca",
          series: [
            {
              estado: "Rendimiento",
              color: "#0d9488",
              datos: [
                { año: 1995, captura: 111 },
                { año: 1996, captura: 98 },
                { año: 1997, captura: 125 },
                { año: 1998, captura: 99 },
                { año: 1999, captura: 90 },
                { año: 2000, captura: 81 },
                { año: 2001, captura: 101 },
                { año: 2002, captura: 97 },
                { año: 2003, captura: 122 },
                { año: 2004, captura: 131 },
                { año: 2005, captura: 175 },
                { año: 2006, captura: 170 },
                { año: 2007, captura: 183 },
                { año: 2008, captura: 217 },
                { año: 2009, captura: 208 },
                { año: 2010, captura: 332 },
                { año: 2011, captura: 236 },
                { año: 2012, captura: 250 },
                { año: 2013, captura: 201 },
                { año: 2014, captura: 193 },
                { año: 2015, captura: 239 },
                { año: 2016, captura: 232 },
                { año: 2017, captura: 286 },
                { año: 2018, captura: 250 },
                { año: 2019, captura: 214 },
                { año: 2020, captura: 228 },
                { año: 2021, captura: 306 },
              ],
            },
            {
              estado: "Esfuerzo",
              color: "#f59e0b",
              eje: "derecho",
              punteada: true,
              datos: [
                { año: 1995, captura: 53967 },
                { año: 1996, captura: 51776 },
                { año: 1997, captura: 55002 },
                { año: 1998, captura: 71439 },
                { año: 1999, captura: 61667 },
                { año: 2000, captura: 62065 },
                { año: 2001, captura: 55029 },
                { año: 2002, captura: 45403 },
                { año: 2003, captura: 44089 },
                { año: 2004, captura: 36415 },
                { año: 2005, captura: 36017 },
                { año: 2006, captura: 34111 },
                { año: 2007, captura: 37026 },
                { año: 2008, captura: 33654 },
                { año: 2009, captura: 30136 },
                { año: 2010, captura: 26432 },
                { año: 2011, captura: 25449 },
                { año: 2012, captura: 22913 },
                { año: 2013, captura: 22249 },
                { año: 2014, captura: 27055 },
                { año: 2015, captura: 26166 },
                { año: 2016, captura: 25954 },
                { año: 2017, captura: 23736 },
                { año: 2018, captura: 27055 },
                { año: 2019, captura: 25197 },
                { año: 2020, captura: 21506 },
                { año: 2021, captura: 22249 },
              ],
            },
          ],
        },
        {
          titulo: "Veracruz: rendimiento y esfuerzo pesquero, 1995-2021",
          nota: "Serie leída de la figura 2 de la CNP (1995-2021); los valores son aproximados. El rendimiento se mide en el eje izquierdo y el esfuerzo pesquero en el derecho.",
          unidadIzquierda: "kg/día",
          unidadDerecha: "Días de pesca",
          series: [
            {
              estado: "Rendimiento",
              color: "#0d9488",
              datos: [
                { año: 1995, captura: 119 },
                { año: 1996, captura: 123 },
                { año: 1997, captura: 93 },
                { año: 1998, captura: 106 },
                { año: 1999, captura: 106 },
                { año: 2000, captura: 92 },
                { año: 2001, captura: 129 },
                { año: 2002, captura: 142 },
                { año: 2003, captura: 137 },
                { año: 2004, captura: 129 },
                { año: 2005, captura: 150 },
                { año: 2006, captura: 173 },
                { año: 2007, captura: 124 },
                { año: 2008, captura: 179 },
                { año: 2009, captura: 143 },
                { año: 2010, captura: 176 },
                { año: 2011, captura: 151 },
                { año: 2012, captura: 203 },
                { año: 2013, captura: 176 },
                { año: 2014, captura: 166 },
                { año: 2015, captura: 217 },
                { año: 2016, captura: 196 },
                { año: 2017, captura: 227 },
                { año: 2018, captura: 199 },
                { año: 2019, captura: 185 },
                { año: 2020, captura: 206 },
                { año: 2021, captura: 227 },
              ],
            },
            {
              estado: "Esfuerzo",
              color: "#f59e0b",
              eje: "derecho",
              punteada: true,
              datos: [
                { año: 1995, captura: 6278 },
                { año: 1996, captura: 8631 },
                { año: 1997, captura: 6955 },
                { año: 1998, captura: 6757 },
                { año: 1999, captura: 6244 },
                { año: 2000, captura: 7296 },
                { año: 2001, captura: 5145 },
                { año: 2002, captura: 4756 },
                { año: 2003, captura: 5474 },
                { año: 2004, captura: 4603 },
                { año: 2005, captura: 4403 },
                { año: 2006, captura: 4173 },
                { año: 2007, captura: 6289 },
                { año: 2008, captura: 3728 },
                { año: 2009, captura: 5223 },
                { año: 2010, captura: 6111 },
                { año: 2011, captura: 4445 },
                { año: 2012, captura: 3663 },
                { año: 2013, captura: 3016 },
                { año: 2014, captura: 3924 },
                { año: 2015, captura: 3726 },
                { año: 2016, captura: 4554 },
                { año: 2017, captura: 4109 },
                { año: 2018, captura: 4401 },
                { año: 2019, captura: 4110 },
                { año: 2020, captura: 2876 },
                { año: 2021, captura: 4109 },
              ],
            },
          ],
        },
      ],
      participacionPorEspecie: [
        {
          titulo: "Participación estatal en la producción del Golfo de México",
          nota: "Porcentajes respecto a la producción total de camarón del Golfo de México: entre ambos estados aportan el 83%.",
          estados: [
            { estado: "Tamaulipas", porcentaje: 71 },
            { estado: "Veracruz", porcentaje: 12 },
          ],
        },
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
      // Figura 3 de la CNP, reproducida como imagen: la trayectoria anual 1956-2021
      // no puede extraerse punto por punto del original.
      figuras: [
        {
          titulo: "Diagrama de Kobe",
          src: "/images/figuras/kobe-camaron-cafe.png",
          alt: "Diagrama de fases de Kobe del camarón café del Golfo de México: trayectoria anual de 1956 a 2021 según B/BRMS y F/FRMS, con los cuatro cuadrantes de estatus, los intervalos de confianza y la probabilidad de cada cuadrante.",
          nota: "Comportamiento histórico del estatus del camarón café (Penaeus aztecus) del Golfo de México mediante un diagrama de fases de Kobe (figura 3 de la CNP).",
        },
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
    // Valor económico de las capturas de 2021 y empleos directos que reporta la ficha (SIAP, 2022).
    valorProduccion: "$3,289",
    empleos: "23,700",
    indicadoresClave: [
      {
        etiqueta: "Aporte nacional",
        valor: "2.4%",
        unidad: "de la producción pesquera nacional",
        icono: "tasa",
      },
      {
        etiqueta: "Población de pescadores",
        valor: "28,616",
        unidad: "pescadores en total",
      },
      {
        etiqueta: "Empleos indirectos",
        valor: "40,000",
        unidad: "aproximadamente",
      },
      {
        etiqueta: "Valor de las exportaciones",
        valor: "89",
        unidad: "millones de dólares (SIAP, 2022)",
      },
      {
        etiqueta: "Principales importadores",
        valor: "Italia",
        unidad: "seguido de Portugal y España",
      },
    ],
    capturaPorEstado: [
      // Figura 1. Captura histórica total de O. maya y O. americanus en el Golfo de México y Mar
      // Caribe, 1998-2023. Fuente: Sistema de Información de Pesca y Acuacultura, CONAPESCA.
      {
        titulo: "Captura histórica de pulpo en el Golfo de México y Mar Caribe, 1998-2023",
        nota:
          "Serie leída de la figura 1 de la Carta Nacional Pesquera (Sistema de Información de Pesca y Acuacultura, CONAPESCA); los valores anuales son aproximados, pero reproducen las cifras que cita el texto: el máximo histórico de 51,173 toneladas en 2018 (37,913 de O. maya y 13,260 de O. americanus), el mínimo de 22,177 toneladas en 2020 y los promedios de 17,953 ± 4,588 toneladas (1998-2010) y 32,775 ± 7,963 toneladas (2011-2023). En la figura original una línea punteada vertical marca el año 2011, después del cual ocurre el incremento en la captura promedio.",
        series: [
          {
            estado: "Total",
            color: "#0d9488",
            datos: [
              { año: 1998, captura: 13800 },
              { año: 1999, captura: 16300 },
              { año: 2000, captura: 20100 },
              { año: 2001, captura: 18000 },
              { año: 2002, captura: 15300 },
              { año: 2003, captura: 15200 },
              { año: 2004, captura: 23400 },
              { año: 2005, captura: 12000 },
              { año: 2006, captura: 24300 },
              { año: 2007, captura: 15800 },
              { año: 2008, captura: 11343 },
              { año: 2009, captura: 25524 },
              { año: 2010, captura: 22300 },
              { año: 2011, captura: 25700 },
              { año: 2012, captura: 27500 },
              { año: 2013, captura: 23000 },
              { año: 2014, captura: 31900 },
              { año: 2015, captura: 32000 },
              { año: 2016, captura: 33800 },
              { año: 2017, captura: 33400 },
              { año: 2018, captura: 51173 },
              { año: 2019, captura: 36600 },
              { año: 2020, captura: 22177 },
              { año: 2021, captura: 43600 },
              { año: 2022, captura: 34400 },
              { año: 2023, captura: 30800 },
            ],
          },
          {
            estado: "Pulpo maya (O. maya)",
            color: "#f59e0b",
            datos: [
              { año: 1998, captura: 9300 },
              { año: 1999, captura: 13700 },
              { año: 2000, captura: 16300 },
              { año: 2001, captura: 13600 },
              { año: 2002, captura: 12200 },
              { año: 2003, captura: 10000 },
              { año: 2004, captura: 16600 },
              { año: 2005, captura: 9900 },
              { año: 2006, captura: 18600 },
              { año: 2007, captura: 11400 },
              { año: 2008, captura: 7900 },
              { año: 2009, captura: 19200 },
              { año: 2010, captura: 15400 },
              { año: 2011, captura: 15700 },
              { año: 2012, captura: 21400 },
              { año: 2013, captura: 17500 },
              { año: 2014, captura: 22500 },
              { año: 2015, captura: 26000 },
              { año: 2016, captura: 28800 },
              { año: 2017, captura: 24100 },
              { año: 2018, captura: 37913 },
              { año: 2019, captura: 25500 },
              { año: 2020, captura: 19077 },
              { año: 2021, captura: 34500 },
              { año: 2022, captura: 24400 },
              { año: 2023, captura: 27400 },
            ],
          },
          {
            estado: "Pulpo patón (O. americanus)",
            color: "#0891b2",
            punteada: true,
            datos: [
              { año: 1998, captura: 4500 },
              { año: 1999, captura: 2600 },
              { año: 2000, captura: 3800 },
              { año: 2001, captura: 4400 },
              { año: 2002, captura: 3100 },
              { año: 2003, captura: 5200 },
              { año: 2004, captura: 6800 },
              { año: 2005, captura: 2100 },
              { año: 2006, captura: 5700 },
              { año: 2007, captura: 4400 },
              { año: 2008, captura: 3443 },
              { año: 2009, captura: 6324 },
              { año: 2010, captura: 6900 },
              { año: 2011, captura: 10000 },
              { año: 2012, captura: 6100 },
              { año: 2013, captura: 5500 },
              { año: 2014, captura: 9400 },
              { año: 2015, captura: 6000 },
              { año: 2016, captura: 5000 },
              { año: 2017, captura: 9300 },
              { año: 2018, captura: 13260 },
              { año: 2019, captura: 11100 },
              { año: 2020, captura: 3100 },
              { año: 2021, captura: 9100 },
              { año: 2022, captura: 10000 },
              { año: 2023, captura: 3400 },
            ],
          },
        ],
      },
      // Figura 2. Captura histórica de O. maya en Yucatán y Campeche, 1998-2023. Después de 2011
      // cambia la proporción de las capturas por estado. Fuente: SIPESCA, CONAPESCA.
      {
        titulo: "Captura histórica del pulpo maya (O. maya) en Yucatán y Campeche, 1998-2023",
        nota:
          "Serie leída de la figura 2 de la Carta Nacional Pesquera (Sistema de Información de Pesca y Acuacultura, CONAPESCA); los valores anuales son aproximados. La proporción de la captura entre ambos estados se mantuvo similar antes de 2011 —53% de Yucatán (7,173 toneladas) y 47% de Campeche (6,008 toneladas)—, mientras que en el periodo 2011-2023 aumentó en Yucatán al 60% (14,807 toneladas) y disminuyó en Campeche al 40% (9,678 toneladas).",
        series: [
          {
            estado: "Total",
            color: "#0d9488",
            datos: [
              { año: 1998, captura: 9300 },
              { año: 1999, captura: 13700 },
              { año: 2000, captura: 16300 },
              { año: 2001, captura: 13600 },
              { año: 2002, captura: 12200 },
              { año: 2003, captura: 10000 },
              { año: 2004, captura: 16600 },
              { año: 2005, captura: 9900 },
              { año: 2006, captura: 18600 },
              { año: 2007, captura: 11400 },
              { año: 2008, captura: 7900 },
              { año: 2009, captura: 19200 },
              { año: 2010, captura: 15400 },
              { año: 2011, captura: 15700 },
              { año: 2012, captura: 21400 },
              { año: 2013, captura: 17500 },
              { año: 2014, captura: 22500 },
              { año: 2015, captura: 26000 },
              { año: 2016, captura: 28800 },
              { año: 2017, captura: 24100 },
              { año: 2018, captura: 37913 },
              { año: 2019, captura: 25500 },
              { año: 2020, captura: 19077 },
              { año: 2021, captura: 34500 },
              { año: 2022, captura: 24400 },
              { año: 2023, captura: 27400 },
            ],
          },
          {
            estado: "Yucatán",
            color: "#f59e0b",
            datos: [
              { año: 1998, captura: 6300 },
              { año: 1999, captura: 8500 },
              { año: 2000, captura: 8900 },
              { año: 2001, captura: 7500 },
              { año: 2002, captura: 5500 },
              { año: 2003, captura: 4700 },
              { año: 2004, captura: 9600 },
              { año: 2005, captura: 4400 },
              { año: 2006, captura: 10400 },
              { año: 2007, captura: 5600 },
              { año: 2008, captura: 5000 },
              { año: 2009, captura: 10200 },
              { año: 2010, captura: 7100 },
              { año: 2011, captura: 9000 },
              { año: 2012, captura: 11200 },
              { año: 2013, captura: 8200 },
              { año: 2014, captura: 14500 },
              { año: 2015, captura: 15700 },
              { año: 2016, captura: 19700 },
              { año: 2017, captura: 14900 },
              { año: 2018, captura: 22000 },
              { año: 2019, captura: 13600 },
              { año: 2020, captura: 10000 },
              { año: 2021, captura: 21900 },
              { año: 2022, captura: 13000 },
              { año: 2023, captura: 21000 },
            ],
          },
          {
            estado: "Campeche",
            color: "#0891b2",
            punteada: true,
            datos: [
              { año: 1998, captura: 3000 },
              { año: 1999, captura: 5200 },
              { año: 2000, captura: 7400 },
              { año: 2001, captura: 6100 },
              { año: 2002, captura: 6700 },
              { año: 2003, captura: 5300 },
              { año: 2004, captura: 7000 },
              { año: 2005, captura: 5500 },
              { año: 2006, captura: 8200 },
              { año: 2007, captura: 5800 },
              { año: 2008, captura: 2900 },
              { año: 2009, captura: 9000 },
              { año: 2010, captura: 8300 },
              { año: 2011, captura: 6700 },
              { año: 2012, captura: 10200 },
              { año: 2013, captura: 9300 },
              { año: 2014, captura: 8000 },
              { año: 2015, captura: 10300 },
              { año: 2016, captura: 9100 },
              { año: 2017, captura: 9200 },
              { año: 2018, captura: 15913 },
              { año: 2019, captura: 11900 },
              { año: 2020, captura: 9077 },
              { año: 2021, captura: 12600 },
              { año: 2022, captura: 11400 },
              { año: 2023, captura: 6400 },
            ],
          },
        ],
      },
      // Figura 3. Capturas históricas de pulpo en Quintana Roo y Veracruz, 1998-2022.
      // Fuente: Anuarios Estadísticos de Acuacultura y Pesca, CONAPESCA.
      {
        titulo: "Captura histórica de pulpo en Quintana Roo y Veracruz, 1998-2022",
        nota:
          "Serie leída de la figura 3 de la Carta Nacional Pesquera (Anuarios Estadísticos de Acuacultura y Pesca, CONAPESCA); los valores anuales son aproximados. La captura promedio de Quintana Roo pasó de 177 ± 146 toneladas anuales en 1998-2009 a 298 ± 196 toneladas entre 2010 y 2022. En Veracruz la captura es relativamente estable, con un promedio de 80 ± 49 toneladas anuales, su máximo histórico de 243 toneladas en 1998 y su mínimo de 20 toneladas en 2019.",
        series: [
          {
            estado: "Quintana Roo",
            color: "#0d9488",
            marcadores: true,
            datos: [
              { año: 1998, captura: 80 },
              { año: 1999, captura: 130 },
              { año: 2000, captura: 85 },
              { año: 2001, captura: 165 },
              { año: 2002, captura: 60 },
              { año: 2003, captura: 125 },
              { año: 2004, captura: 232 },
              { año: 2005, captura: 88 },
              { año: 2006, captura: 205 },
              { año: 2007, captura: 135 },
              { año: 2008, captura: 182 },
              { año: 2009, captura: 648 },
              { año: 2010, captura: 110 },
              { año: 2011, captura: 645 },
              { año: 2012, captura: 307 },
              { año: 2013, captura: 55 },
              { año: 2014, captura: 238 },
              { año: 2015, captura: 610 },
              { año: 2016, captura: 200 },
              { año: 2017, captura: 235 },
              { año: 2018, captura: 570 },
              { año: 2019, captura: 250 },
              { año: 2020, captura: 60 },
              { año: 2021, captura: 358 },
              { año: 2022, captura: 225 },
            ],
          },
          {
            estado: "Veracruz",
            color: "#f59e0b",
            punteada: true,
            marcadores: true,
            datos: [
              { año: 1998, captura: 243 },
              { año: 1999, captura: 90 },
              { año: 2000, captura: 35 },
              { año: 2001, captura: 62 },
              { año: 2002, captura: 62 },
              { año: 2003, captura: 78 },
              { año: 2004, captura: 75 },
              { año: 2005, captura: 62 },
              { año: 2006, captura: 48 },
              { año: 2007, captura: 50 },
              { año: 2008, captura: 115 },
              { año: 2009, captura: 82 },
              { año: 2010, captura: 65 },
              { año: 2011, captura: 115 },
              { año: 2012, captura: 88 },
              { año: 2013, captura: 52 },
              { año: 2014, captura: 62 },
              { año: 2015, captura: 100 },
              { año: 2016, captura: 120 },
              { año: 2017, captura: 158 },
              { año: 2018, captura: 168 },
              { año: 2019, captura: 20 },
              { año: 2020, captura: 25 },
              { año: 2021, captura: 42 },
              { año: 2022, captura: 48 },
            ],
          },
        ],
      },
    ],
    // Reparto de la captura de cada especie entre los estados (texto de la CNP).
    indicadoresParticipacion: [
      {
        etiqueta: "Yucatán — pulpo patón",
        valor: "98%",
        unidad: "de la captura total de la especie",
        icono: "tasa",
      },
      {
        etiqueta: "Quintana Roo — pulpo patón",
        valor: "2%",
        unidad: "de la captura total de la especie",
        icono: "tasa",
      },
      {
        etiqueta: "Yucatán — pulpo maya",
        valor: "60%",
        unidad: "14,807 toneladas anuales (2011-2023)",
        icono: "tasa",
      },
      {
        etiqueta: "Campeche — pulpo maya",
        valor: "40%",
        unidad: "9,678 toneladas anuales (2011-2023)",
        icono: "tasa",
      },
    ],
    // Participación de cada estado en la captura total de pulpo del Golfo de México y Mar Caribe.
    participacionEstados: [
      { estado: "Yucatán", porcentaje: 72.6 },
      { estado: "Campeche", porcentaje: 26.5 },
      { estado: "Quintana Roo", porcentaje: 0.8 },
      { estado: "Veracruz", porcentaje: 0.1 },
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
    figuras: [
      {
        titulo: "Dinámica de la biomasa y tasas de captura del pulpo maya y el pulpo patón en la Península de Yucatán",
        src: "/images/figuras/biomasa-pulpo.png",
        alt: "Dos paneles con la biomasa al inicio de la temporada, en miles de toneladas, de 2000 a 2022. El panel superior corresponde al pulpo maya (Octopus maya) y el inferior al pulpo patón (Octopus americanus). En cada uno, los puntos verdes son la biomasa estimada con CatDyn —su tamaño es proporcional a la precisión de la estimación—, la línea negra es la biomasa del modelo Pella-Tomlinson con sus bandas grises de 2, 4 y 6 desviaciones estándar, las barras azules son la captura anual y la línea roja horizontal es la productividad latente total promedio, con su banda de error estándar en rojo. Una flecha roja señala el año 2011 en ambos paneles.",
        nota: "Figura 4 de la Carta Nacional Pesquera. Dinámica de la biomasa (puntos verdes y líneas negras), tasas de captura realizadas (barras azules) y sostenibles (productividad latente total promedio), del pulpo maya (Octopus maya) y el pulpo patón (Octopus americanus) en la Península de Yucatán. La flecha roja señala el año en el que ocurren cambios en los parámetros de la dinámica de la biomasa: la simetría de la función de producción (p) en O. maya y la capacidad de carga del medio ambiente (K) en O. americanus. La biomasa CatDyn está ponderada por q (1/CV(Biomasa)) /(1/min (CV (Biomasa))), donde q = 0.3 y 0.15 en O. maya y O. americanus, respectivamente, por lo cual las estimaciones más precisas parecen más grandes. Las áreas alrededor de las líneas rojas son bandas de errores estándar.",
      },
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
    // Los recuadros de captura anual, valor de producción, empleos y embarcaciones no tienen
    // respaldo en la Carta Nacional Pesquera (las capturas del Golfo nunca superaron las 64
    // toneladas), por lo que se sustituyen por las cifras que sí cita la ficha.
    indicadoresClave: [
      {
        etiqueta: "Captura máxima histórica (2017)",
        valor: "64",
        unidad: "toneladas",
        icono: "rendimiento",
      },
      {
        etiqueta: "Captura promedio (1993-2021)",
        valor: "31",
        unidad: "toneladas anuales",
        icono: "rendimiento",
      },
      {
        etiqueta: "Participación de Veracruz",
        valor: "100%",
        unidad: "de la captura del Golfo de México",
        icono: "tasa",
      },
      {
        etiqueta: "Cuota asignada a México",
        valor: "200",
        unidad: "toneladas anuales (TAC del Atlántico norte: 13,200)",
      },
      {
        etiqueta: "Esfuerzo autorizado",
        valor: "34",
        unidad: "embarcaciones mayores palangreras",
      },
    ],
    capturaPorEstado: [
      {
        titulo: "Tendencia histórica de la captura de pez espada (Xiphias gladius), 1993-2021",
        nota: "Serie leída de la figura 1 de la Carta Nacional Pesquera (Programa Nacional de Aprovechamiento del Atún y Protección de Delfines, PNAAPD, FIDEMAR); los valores anuales son aproximados, pero reproducen las cifras que cita el texto: el máximo histórico de 64 toneladas en 2017 y un promedio de 31 toneladas anuales en el periodo. Las capturas presentan fluctuaciones anuales, con una marcada disminución de 2017 a 2020 y un ligero incremento en 2021. La línea de la captura total permitida (TAC) corresponde a las 200 toneladas que le asigna la CICAA a México dentro del TAC del pez espada del Atlántico norte.",
        series: [
          {
            estado: "Captura",
            color: "#0d9488",
            marcadores: true,
            datos: [
              { año: 1993, captura: 8 },
              { año: 1994, captura: 17 },
              { año: 1995, captura: 1 },
              { año: 1996, captura: 24 },
              { año: 1997, captura: 17 },
              { año: 1998, captura: 28 },
              { año: 1999, captura: 26 },
              { año: 2000, captura: 39 },
              { año: 2001, captura: 28 },
              { año: 2002, captura: 36 },
              { año: 2003, captura: 32 },
              { año: 2004, captura: 44 },
              { año: 2005, captura: 41 },
              { año: 2006, captura: 33 },
              { año: 2007, captura: 35 },
              { año: 2008, captura: 34 },
              { año: 2009, captura: 32 },
              { año: 2010, captura: 34 },
              { año: 2011, captura: 37 },
              { año: 2012, captura: 38 },
              { año: 2013, captura: 34 },
              { año: 2014, captura: 34 },
              { año: 2015, captura: 32 },
              { año: 2016, captura: 36 },
              { año: 2017, captura: 64 },
              { año: 2018, captura: 45 },
              { año: 2019, captura: 28 },
              { año: 2020, captura: 22 },
              { año: 2021, captura: 26 },
            ],
          },
        ],
        referencias: [
          { valor: 200, etiqueta: "TAC de México", tipo: "solida" },
          { valor: 31, etiqueta: "Captura promedio", tipo: "punteada" },
        ],
      },
      {
        titulo: "Captura por unidad de esfuerzo del pez espada en el Golfo de México, 1993-2021",
        nota: "Serie leída de la figura 3 de la Carta Nacional Pesquera (Programa Nacional de Aprovechamiento del Atún y Protección de Delfines, PNAAPD, FIDEMAR); los valores anuales son aproximados. La CPUE desciende de 0.147 organismos por 100 anzuelos en 1993 a valores cercanos a 0.032 al final del periodo, con un repunte en 2017 que coincide con el máximo histórico de captura.",
        unidadIzquierda: "organismos/100 anzuelos",
        series: [
          {
            estado: "CPUE",
            color: "#f59e0b",
            marcadores: true,
            datos: [
              { año: 1993, captura: 0.147 },
              { año: 1994, captura: 0.114 },
              { año: 1995, captura: 0.102 },
              { año: 1996, captura: 0.109 },
              { año: 1997, captura: 0.07 },
              { año: 1998, captura: 0.064 },
              { año: 1999, captura: 0.031 },
              { año: 2000, captura: 0.066 },
              { año: 2001, captura: 0.062 },
              { año: 2002, captura: 0.067 },
              { año: 2003, captura: 0.06 },
              { año: 2004, captura: 0.053 },
              { año: 2005, captura: 0.055 },
              { año: 2006, captura: 0.05 },
              { año: 2007, captura: 0.045 },
              { año: 2008, captura: 0.044 },
              { año: 2009, captura: 0.04 },
              { año: 2010, captura: 0.042 },
              { año: 2011, captura: 0.045 },
              { año: 2012, captura: 0.037 },
              { año: 2013, captura: 0.035 },
              { año: 2014, captura: 0.033 },
              { año: 2015, captura: 0.034 },
              { año: 2016, captura: 0.037 },
              { año: 2017, captura: 0.075 },
              { año: 2018, captura: 0.051 },
              { año: 2019, captura: 0.04 },
              { año: 2020, captura: 0.032 },
              { año: 2021, captura: 0.032 },
            ],
          },
        ],
      },
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
    figuras: [
      {
        titulo: "Diagrama de Kobe — pez espada del Atlántico norte (Xiphias gladius)",
        src: "/images/figuras/kobe-pez-espada.png",
        alt: "Diagrama de fases de Kobe del stock de pez espada del Atlántico norte: la estimación puntual se ubica en el cuadrante verde, con una biomasa de alrededor de 1.07 veces la del rendimiento máximo sostenible y una mortalidad por pesca de alrededor de 0.8 veces la de referencia. La nube de incertidumbre se extiende hacia el cuadrante rojo por el extremo de baja biomasa y alta mortalidad, y la gráfica de pastel resume la probabilidad de cada cuadrante: 63% verde, 22% amarillo y 15% rojo.",
        nota: "Estatus del stock de pez espada del Atlántico norte, del que México forma parte (tomado de CICAA, 2022). La estimación puntual sitúa al stock en el cuadrante verde —biomasa por encima de la del rendimiento máximo sostenible y mortalidad por pesca por debajo de la de referencia—, con una probabilidad del 63% de encontrarse en esa condición frente al 22% del cuadrante amarillo y el 15% del rojo. Las curvas de los márgenes son las distribuciones de B/BRMS y F/FRMS, y las líneas rojas marcan el valor de referencia de 1 en cada eje.",
      },
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
    // Tallas, rendimientos y tasas de explotación de bagre bandera (CNP 2025).
    indicadoresClave: [
      { etiqueta: "Talla promedio en Tabasco", valor: "42.8", unidad: "cm de longitud furcal (de 18 a 68)", icono: "talla" },
      {
        etiqueta: "Talla promedio en Campeche",
        valor: "40",
        unidad: "cm de longitud furcal, 2003-2018 (de 17 a 64)",
        icono: "talla",
      },
      { etiqueta: "Rendimiento en Tabasco (2017)", valor: "110", unidad: "kg/día en promedio", icono: "rendimiento" },
      {
        etiqueta: "Rendimiento en el sur de Campeche (2017)",
        valor: "37.7-99.5",
        unidad: "kg/viaje/día en promedio",
        icono: "rendimiento",
      },
      { etiqueta: "Mortalidad por pesca (F)", valor: "1.3-1.99", unidad: "rango estimado", icono: "tasa" },
      { etiqueta: "Tasa de explotación (E)", valor: "0.66-0.75", unidad: "rango estimado", icono: "tasa" },
    ],
    // Captura anual del Golfo de México y Mar Caribe, 1986-2020, con el rendimiento
    // máximo sostenible estimado y sus límites de confianza (figura 2 de la CNP 2025).
    capturaPorEstado: [
      {
        titulo: "Bagre bandera (Bagre marinus) — captura anual en el Golfo de México y Mar Caribe",
        nota: "Serie anual leída de la figura 2 de la Carta Nacional Pesquera (CNP 2025); los valores son aproximados. Las líneas horizontales marcan el rendimiento máximo sostenible estimado y sus límites de confianza.",
        referencias: [
          { valor: 5078, etiqueta: "Límite superior", tipo: "punteada" },
          { valor: 4681, etiqueta: "RMS estimado", tipo: "solida" },
          { valor: 4090, etiqueta: "Límite inferior", tipo: "punteada" },
        ],
        series: [
          {
            estado: "Golfo de México y Mar Caribe",
            color: "#0d9488",
            datos: [
              { año: 1986, captura: 2690 },
              { año: 1987, captura: 3980 },
              { año: 1988, captura: 4000 },
              { año: 1989, captura: 3580 },
              { año: 1990, captura: 4270 },
              { año: 1991, captura: 4000 },
              { año: 1992, captura: 4270 },
              { año: 1993, captura: 4520 },
              { año: 1994, captura: 4790 },
              { año: 1995, captura: 5020 },
              { año: 1996, captura: 5120 },
              { año: 1997, captura: 5850 },
              { año: 1998, captura: 6220 },
              { año: 1999, captura: 5360 },
              { año: 2000, captura: 5960 },
              { año: 2001, captura: 6280 },
              { año: 2002, captura: 5830 },
              { año: 2003, captura: 5910 },
              { año: 2004, captura: 4930 },
              { año: 2005, captura: 4740 },
              { año: 2006, captura: 5190 },
              { año: 2007, captura: 4000 },
              { año: 2008, captura: 3740 },
              { año: 2009, captura: 3850 },
              { año: 2010, captura: 4580 },
              { año: 2011, captura: 4230 },
              { año: 2012, captura: 4370 },
              { año: 2013, captura: 5280 },
              { año: 2014, captura: 4750 },
              { año: 2015, captura: 5880 },
              { año: 2016, captura: 5700 },
              { año: 2017, captura: 7150 },
              { año: 2018, captura: 5030 },
              { año: 2019, captura: 5190 },
              { año: 2020, captura: 5130 },
            ],
          },
        ],
      },
      {
        titulo: "Curuco (Ariopsis felis) — captura anual en el Golfo de México y Mar Caribe",
        nota: "Serie anual leída de la figura 2 de la Carta Nacional Pesquera (CNP 2025); los valores son aproximados. Las líneas horizontales marcan el rendimiento máximo sostenible estimado y sus límites de confianza.",
        referencias: [
          { valor: 1090, etiqueta: "Límite superior", tipo: "punteada" },
          { valor: 780, etiqueta: "RMS estimado", tipo: "solida" },
          { valor: 600, etiqueta: "Límite inferior", tipo: "punteada" },
        ],
        series: [
          {
            estado: "Golfo de México y Mar Caribe",
            color: "#8b5cf6",
            datos: [
              { año: 1986, captura: 100 },
              { año: 1987, captura: 100 },
              { año: 1988, captura: 220 },
              { año: 1989, captura: 380 },
              { año: 1990, captura: 750 },
              { año: 1991, captura: 850 },
              { año: 1992, captura: 1230 },
              { año: 1993, captura: 3000 },
              { año: 1994, captura: 2780 },
              { año: 1995, captura: 2270 },
              { año: 1996, captura: 1880 },
              { año: 1997, captura: 1920 },
              { año: 1998, captura: 2030 },
              { año: 1999, captura: 1820 },
              { año: 2000, captura: 840 },
              { año: 2001, captura: 750 },
              { año: 2002, captura: 560 },
              { año: 2003, captura: 620 },
              { año: 2004, captura: 960 },
              { año: 2005, captura: 640 },
              { año: 2006, captura: 750 },
              { año: 2007, captura: 510 },
              { año: 2008, captura: 350 },
              { año: 2009, captura: 430 },
              { año: 2010, captura: 430 },
              { año: 2011, captura: 330 },
              { año: 2012, captura: 400 },
              { año: 2013, captura: 390 },
              { año: 2014, captura: 450 },
              { año: 2015, captura: 490 },
              { año: 2016, captura: 600 },
              { año: 2017, captura: 750 },
              { año: 2018, captura: 440 },
              { año: 2019, captura: 400 },
              { año: 2020, captura: 250 },
            ],
          },
        ],
      },
    ],
    // Participación estatal 2016-2020 de cada especie (figura 1, paneles b y d, CNP 2025).
    participacionPorEspecie: [
      {
        titulo: "Bagre bandera (Bagre marinus) — participación estatal 2016-2020",
        estados: [
          { estado: "Tabasco", porcentaje: 54.7, captura: 3083 },
          { estado: "Campeche", porcentaje: 29.5, captura: 1663 },
          { estado: "Yucatán", porcentaje: 7.6, captura: 430 },
          { estado: "Veracruz", porcentaje: 6.3, captura: 356 },
          { estado: "Tamaulipas", porcentaje: 1.8, captura: 99 },
        ],
      },
      {
        titulo: "Curuco (Ariopsis felis) — participación estatal 2016-2020",
        nota: "Porcentajes tal como aparecen en el panel d) de la figura 1 de la CNP 2025, donde suman 117.5% y no 100%.",
        estados: [
          { estado: "Veracruz", porcentaje: 73.3 },
          { estado: "Tabasco", porcentaje: 24.1 },
          { estado: "Campeche", porcentaje: 14.4 },
          { estado: "Yucatán", porcentaje: 5.7 },
        ],
      },
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
    // Tabla I de la CNP 2025: RMS del bagre bandera por estado, con intervalos de confianza.
    rmsPorEstado: [
      { estado: "Tamaulipas", rms: 44.25, icMenos: 22.17, icMas: 67.29 },
      { estado: "Veracruz", rms: 492.39, icMenos: 401.31, icMas: 601.27 },
      { estado: "Tabasco", rms: 2863.73, icMenos: 2547.84, icMas: 3158.89 },
      { estado: "Campeche", rms: 1231.86, icMenos: 978.72, icMas: 1407.43 },
      { estado: "Yucatán", rms: 204.93, icMenos: 84.0, icMas: 343.83 },
      { estado: "Golfo de México", rms: 4680.69, icMenos: 4090.36, icMas: 5077.52 },
    ],
    rmsNota:
      "Rendimiento máximo sostenible (RMS) del bagre bandera (Bagre marinus) estimado para cada estado del Golfo de México y Mar Caribe, con sus intervalos de confianza (tabla I, CNP 2025).",
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
    empleos: "1,683",
    // La captura de 1,458 toneladas es el promedio de 2010-2018, no la de un solo año, por lo que
    // no se usa capturaAnual: su recuadro rotula "Captura anual".
    indicadoresClave: [
      {
        etiqueta: "Captura de pepino café (2010-2018)",
        valor: "1,458",
        unidad: "toneladas anuales en promedio (peso fresco eviscerado)",
        icono: "rendimiento",
      },
      {
        etiqueta: "Precio a pie de playa (2017-2018)",
        valor: "$90-120",
        unidad: "MXN por kilogramo fresco eviscerado",
        icono: "tasa",
      },
      {
        etiqueta: "Biomasa estimada (2018)",
        valor: "4,306",
        unidad: "toneladas en peso eviscerado (PRL: 1,875)",
      },
      {
        etiqueta: "CPUE (2018)",
        valor: "73",
        unidad: "kg por embarcación por día de pesca",
        icono: "tasa",
      },
    ],
    participacionPorEspecie: [
      {
        titulo: "Importancia estatal en la producción de pepino de mar, 2010-2018",
        nota: "Figura 1a de la Carta Nacional Pesquera. Desde el inicio de la pesquería, la mayor producción del Golfo de México y Mar Caribe la aporta Yucatán.",
        estados: [
          { estado: "Yucatán", porcentaje: 93.6 },
          { estado: "Campeche", porcentaje: 6 },
          { estado: "Veracruz", porcentaje: 0.3 },
          { estado: "Quintana Roo", porcentaje: 0.1 },
        ],
      },
    ],
    capturaPorEstado: [
      {
        titulo: "Producción anual de pepino de mar café (I. badionotus) en Yucatán, 2010-2018",
        nota: "Serie leída de la figura 1b de la Carta Nacional Pesquera (Sistemas de Información de Pesca y Acuacultura, CONAPESCA); los valores anuales son aproximados, pero su promedio reproduce las 1,458 toneladas que cita el texto. De 2010 a 2018 más del 90% de la producción provino de I. badionotus, con el mínimo de 600 toneladas en 2015 y el máximo de 2,486 toneladas en 2013. Antes de este periodo, de 2001 a 2007, la captura fue menor a 200 toneladas anuales y la aportaron varias especies (I. badionotus, H. floridana, H. mexicana y A. multifidus).",
        series: [
          {
            estado: "Captura",
            color: "#0d9488",
            datos: [
              { año: 2010, captura: 1830 },
              { año: 2011, captura: 1140 },
              { año: 2012, captura: 890 },
              { año: 2013, captura: 2486 },
              { año: 2014, captura: 1150 },
              { año: 2015, captura: 600 },
              { año: 2016, captura: 1880 },
              { año: 2017, captura: 1950 },
              { año: 2018, captura: 1200 },
            ],
          },
        ],
        referencias: [{ valor: 1458, etiqueta: "Captura promedio", tipo: "punteada" }],
      },
      {
        titulo: "Biomasa estimada de pepino de mar café (I. badionotus) en la Península de Yucatán, 2010-2019",
        nota: "Serie leída de la figura 1c de la Carta Nacional Pesquera (evaluaciones independientes de la pesquería del IMIPAS en la Península de Yucatán); los valores anuales son aproximados, salvo los tres que cita el texto: 11,058 toneladas en 2010, la biomasa histórica más alta en 2013 (17,442 toneladas) y 4,306 toneladas en 2018. Los tres picos (2010, 2013 y 2016) ocurrieron en zonas de pesca distintas. Hasta 2018 la biomasa se mantuvo siempre por encima del Punto de Referencia Límite, establecido en 2011 en 3,000 toneladas de peso entero (1,875 toneladas en peso eviscerado).",
        series: [
          {
            estado: "Biomasa",
            color: "#0891b2",
            datos: [
              { año: 2010, captura: 11058 },
              { año: 2011, captura: 6000 },
              { año: 2012, captura: 7300 },
              { año: 2013, captura: 17442 },
              { año: 2014, captura: 6800 },
              { año: 2015, captura: 2600 },
              { año: 2016, captura: 4200 },
              { año: 2017, captura: 3950 },
              { año: 2018, captura: 4306 },
              { año: 2019, captura: 2050 },
            ],
          },
        ],
        referencias: [
          { valor: 6571, etiqueta: "Biomasa promedio", tipo: "punteada" },
          { valor: 3000, etiqueta: "PRL (peso entero)", tipo: "punteada" },
        ],
      },
      {
        titulo: "Captura por unidad de esfuerzo del pepino de mar café (I. badionotus), 2010-2018",
        nota: "Serie leída de la figura 1d de la Carta Nacional Pesquera (evaluaciones dependientes de la pesquería); los valores anuales son aproximados, salvo el promedio de 400 kilogramos en 2010 y el de 73 kilogramos en 2018 que cita el texto.",
        unidadIzquierda: "kg/embarcación/día",
        series: [
          {
            estado: "CPUE",
            color: "#f59e0b",
            datos: [
              { año: 2010, captura: 400 },
              { año: 2011, captura: 325 },
              { año: 2012, captura: 222 },
              { año: 2013, captura: 332 },
              { año: 2014, captura: 178 },
              { año: 2015, captura: 163 },
              { año: 2016, captura: 78 },
              { año: 2017, captura: 120 },
              { año: 2018, captura: 73 },
            ],
          },
        ],
        referencias: [{ valor: 210, etiqueta: "CPUE promedio", tipo: "punteada" }],
      },
      {
        titulo: "Captura total reportada de pepino de mar lápiz (H. floridana), 2010-2014",
        nota: "Serie leída de la figura 2a de la Carta Nacional Pesquera. Todos los registros de captura de pepino de mar lápiz corresponden a permisos de pesca de fomento en la Península de Yucatán: 211 toneladas en 2010, el máximo de 449 toneladas en 2011 y 271 toneladas en 2012, la última temporada de pesca de fomento. En 2010 no se asignó cuota; en 2011 y 2012 fue de 300 y 270 toneladas, con un esfuerzo autorizado de 60 embarcaciones menores. Desde 2013 no existen permisos de pesca comercial para el pepino lápiz ni para ninguna otra especie distinta de I. badionotus; sólo se registraron capturas menores a una tonelada en Tamaulipas en 2010 y 2014.",
        series: [
          {
            estado: "Captura",
            color: "#8b5cf6",
            datos: [
              { año: 2010, captura: 211 },
              { año: 2011, captura: 449 },
              { año: 2012, captura: 271 },
              { año: 2013, captura: 0 },
              { año: 2014, captura: 0 },
            ],
          },
        ],
      },
      {
        titulo: "Biomasa estimada de pepino de mar lápiz (H. floridana) en la Península de Yucatán, 2010-2014",
        nota: "Serie leída de la figura 2b de la Carta Nacional Pesquera (biomasa total estimada por el IMIPAS en la Península de Yucatán); los valores de 2010 (6,341 toneladas), 2011 (la más alta, 7,233 toneladas) y 2012 (4,500 toneladas) son los que cita el texto y los de 2013 y 2014 son aproximados. Después de 2012 el recurso mostró una disminución de su densidad del 90% y la biomasa cayó por debajo del PRL de 3,000 toneladas, razón por la cual se estableció una veda permanente.",
        series: [
          {
            estado: "Biomasa",
            color: "#ec4899",
            datos: [
              { año: 2010, captura: 6341 },
              { año: 2011, captura: 7233 },
              { año: 2012, captura: 4500 },
              { año: 2013, captura: 2600 },
              { año: 2014, captura: 2400 },
            ],
          },
        ],
        referencias: [{ valor: 3000, etiqueta: "PRL", tipo: "punteada" }],
      },
    ],
  },
  ambiente: [
    "La temperatura global promedio ± EE en la zona de distribución del pepino de mar lápiz (H. floridana), frente a las costas de Campeche, durante 2010-2023 ha sido de 29 ± 0.05 °C, con un mínimo de 24-25 °C en 2013 y un máximo de 33 °C en 2016. No se determinó relación entre la temperatura y la densidad registrada por año, por lo que la variación anual de la temperatura no ha mostrado ser determinante para un cambio en la densidad de este recurso.",
    "La temperatura global promedio ± EE en la zona de distribución del pepino de mar café (I. badionotus) es de 25 ± 0.04 °C. Las biomasas más altas in situ se registraron en 2010 y 2013; en 2013 la temperatura estuvo dos grados por debajo del promedio, lo cual puede estar relacionado con el reclutamiento en los sitios más someros de las zonas I y II, donde se ubicó el parche de mayor tamaño a lo largo de la costa de Yucatán ese año.",
  ],
  ambienteGraficas: [
    {
      titulo: "Temperatura promedio (± EE) en la zona de distribución del pepino de mar lápiz (H. floridana), Campeche",
      nota: "Serie leída de la figura 5a de la Carta Nacional Pesquera: temperatura promedio por año de muestreo frente a las costas de Campeche, con la línea punteada del promedio global de 29 °C. Los valores anuales son aproximados y los años sin muestreo se dejan sin punto. El mínimo de las medias anuales corresponde a 2013 y el máximo a 2016. La variación anual de la temperatura no ha mostrado ser determinante para un cambio en la densidad de este recurso.",
      unidadIzquierda: "°C",
      dominioIzquierda: [26.5, 31],
      series: [
        {
          estado: "Temperatura media",
          color: "#0891b2",
          punteada: true,
          marcadores: true,
          datos: [
            { año: 2010, captura: 29.2 },
            { año: 2012, captura: 29.77 },
            { año: 2013, captura: 27.07 },
            { año: 2014, captura: 28.57 },
            { año: 2015, captura: 29.58 },
            { año: 2016, captura: 30.67 },
            { año: 2017, captura: 29.42 },
            { año: 2018, captura: 28.62 },
            { año: 2019, captura: 30.37 },
            { año: 2022, captura: 29.76 },
          ],
        },
      ],
      referencias: [{ valor: 29, etiqueta: "Promedio global", tipo: "punteada" }],
    },
    {
      titulo: "Temperatura promedio (± EE) en la zona de distribución del pepino de mar café (I. badionotus), Yucatán",
      nota: "Serie leída de la figura 5b de la Carta Nacional Pesquera: temperatura promedio por año de muestreo frente a las costas de Yucatán, con la línea punteada del promedio global de 25 °C. Los valores anuales son aproximados y los años sin muestreo se dejan sin punto. En 2013, año de la biomasa in situ más alta, la temperatura estuvo dos grados por debajo del promedio.",
      unidadIzquierda: "°C",
      dominioIzquierda: [23.5, 28.5],
      series: [
        {
          estado: "Temperatura media",
          color: "#f59e0b",
          punteada: true,
          marcadores: true,
          datos: [
            { año: 2006, captura: 25.85 },
            { año: 2007, captura: 25.33 },
            { año: 2009, captura: 24.9 },
            { año: 2010, captura: 25.22 },
            { año: 2012, captura: 26.6 },
            { año: 2013, captura: 24.42 },
            { año: 2014, captura: 24.3 },
            { año: 2015, captura: 24.78 },
            { año: 2016, captura: 25.2 },
            { año: 2017, captura: 24.32 },
            { año: 2018, captura: 24.32 },
            { año: 2019, captura: 26.07 },
            { año: 2021, captura: 26.78 },
            { año: 2022, captura: 25.4 },
            { año: 2023, captura: 28.05 },
          ],
        },
      ],
      referencias: [{ valor: 25, etiqueta: "Promedio global", tipo: "punteada" }],
    },
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
    figuras: [
      {
        titulo: "Diagrama de Kobe — pepino de mar café (Isostichopus badionotus)",
        src: "/images/figuras/kobe-pepino-mar-cafe.png",
        alt: "Diagrama de fases de Kobe del pepino de mar café de la Península de Yucatán: trayectoria anual de 2010 a 2019 según Bt/BRMS y Ft/FRMS, con los cuatro cuadrantes de estatus. La serie recorre el cuadrante verde entre 2010 y 2016 con la biomasa cayendo de 3.4 a 1.2 veces la del rendimiento máximo sostenible y la mortalidad por pesca siempre por debajo de 0.5, y a partir de 2017 pasa al cuadrante amarillo izquierdo, con Bt/BRMS cercano a 0.5 y Ft/FRMS de 0.58 en 2017, 0.33 en 2018 y 0.13 en 2019.",
        nota: "Tendencia del estatus del stock de pepino de mar café (Isostichopus badionotus) de la Península de Yucatán, basado en datos dependientes de la pesca (figura 6 de la CNP). Desde 2017 la biomasa se ubica por debajo de la que produciría el rendimiento máximo sostenible, aunque la mortalidad por pesca se mantiene por debajo de la de referencia.",
      },
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
    // Cifras propias de la pesquería de los Caladeros de Contoy (CNP): sustituyen a los
    // recuadros genéricos de captura, valor, empleo y flota del camarón nacional.
    indicadoresClave: [
      {
        etiqueta: "Captura de camarón de altamar en Quintana Roo",
        valor: "431",
        unidad: "toneladas de peso vivo (3ª pesquería del estado)",
      },
      {
        etiqueta: "Valor de la producción",
        valor: "$25.4",
        unidad: "millones de pesos (2ª del estado, solo tras la langosta)",
      },
      { etiqueta: "Familias beneficiadas directamente", valor: "60", unidad: "familias en el norte de Quintana Roo" },
      { etiqueta: "Personas beneficiadas indirectamente", valor: "1,600", unidad: "personas del sector y plantas procesadoras" },
      {
        etiqueta: "Captura promedio de camarón rojo desde 2003",
        valor: "76",
        unidad: "toneladas de peso entero al año (punto de referencia)",
      },
      {
        etiqueta: "Captura promedio de camarón roca desde 2003",
        valor: "260",
        unidad: "toneladas de peso entero al año (punto de referencia)",
      },
      {
        etiqueta: "Esfuerzo pesquero promedio desde 2002",
        valor: "806",
        unidad: "días de pesca al año (4,198 días en 1993)",
        icono: "tasa",
      },
      {
        etiqueta: "Rendimiento máximo del camarón roca",
        valor: "807",
        unidad: "kg/día de pesca en 2011 (571 en 2014 y 506 en 2017)",
        icono: "rendimiento",
      },
    ],
    // Serie histórica 1980-2021 de los Caladeros de Contoy (figura 1 de la CNP):
    // a) captura, b) esfuerzo pesquero y c) rendimiento (CPUE) de ambas especies.
    capturaPorEstado: [
      {
        titulo: "Captura anual de camarón rojo y roca en los Caladeros de Contoy, 1980-2021",
        nota: "Serie leída de la figura 1a de la Carta Nacional Pesquera; los valores son aproximados salvo los que el texto de la CNP cita con cifra exacta: 113.4 t de camarón rojo en 2006, 30 t en 2019 y 5 t en 2020; y 27 t de camarón roca en 2002, 18 t en 2005, 819 t en 2011, 700 t en 2014 y 685 t en 2017. La captura se expresa en toneladas de camarón entero.",
        series: [
          {
            estado: "Camarón rojo (F. brasiliensis)",
            color: "#dc2626",
            punteada: true,
            datos: [
              { año: 1980, captura: 465 },
              { año: 1981, captura: 380 },
              { año: 1982, captura: 280 },
              { año: 1983, captura: 185 },
              { año: 1984, captura: 380 },
              { año: 1985, captura: 755 },
              { año: 1986, captura: 600 },
              { año: 1987, captura: 640 },
              { año: 1988, captura: 250 },
              { año: 1989, captura: 290 },
              { año: 1990, captura: 185 },
              { año: 1991, captura: 300 },
              { año: 1992, captura: 290 },
              { año: 1993, captura: 440 },
              { año: 1994, captura: 385 },
              { año: 1995, captura: 420 },
              { año: 1996, captura: 300 },
              { año: 1997, captura: 155 },
              { año: 1998, captura: 215 },
              { año: 1999, captura: 195 },
              { año: 2000, captura: 245 },
              { año: 2001, captura: 255 },
              { año: 2002, captura: 45 },
              { año: 2003, captura: 95 },
              { año: 2004, captura: 80 },
              { año: 2005, captura: 90 },
              { año: 2006, captura: 113.4 },
              { año: 2007, captura: 95 },
              { año: 2008, captura: 75 },
              { año: 2009, captura: 70 },
              { año: 2010, captura: 105 },
              { año: 2011, captura: 95 },
              { año: 2012, captura: 90 },
              { año: 2013, captura: 60 },
              { año: 2014, captura: 64 },
              { año: 2015, captura: 85 },
              { año: 2016, captura: 70 },
              { año: 2017, captura: 75 },
              { año: 2018, captura: 70 },
              { año: 2019, captura: 30 },
              { año: 2020, captura: 5 },
              { año: 2021, captura: 55 },
            ],
          },
          {
            estado: "Camarón roca (S. brevirostris)",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 470 },
              { año: 1981, captura: 745 },
              { año: 1982, captura: 640 },
              { año: 1983, captura: 150 },
              { año: 1984, captura: 175 },
              { año: 1985, captura: 610 },
              { año: 1986, captura: 600 },
              { año: 1987, captura: 1450 },
              { año: 1988, captura: 330 },
              { año: 1989, captura: 995 },
              { año: 1990, captura: 350 },
              { año: 1991, captura: 400 },
              { año: 1992, captura: 405 },
              { año: 1993, captura: 810 },
              { año: 1994, captura: 770 },
              { año: 1995, captura: 790 },
              { año: 1996, captura: 420 },
              { año: 1997, captura: 120 },
              { año: 1998, captura: 200 },
              { año: 1999, captura: 400 },
              { año: 2000, captura: 150 },
              { año: 2001, captura: 230 },
              { año: 2002, captura: 27 },
              { año: 2003, captura: 240 },
              { año: 2004, captura: 225 },
              { año: 2005, captura: 18 },
              { año: 2006, captura: 400 },
              { año: 2007, captura: 120 },
              { año: 2008, captura: 110 },
              { año: 2009, captura: 225 },
              { año: 2010, captura: 260 },
              { año: 2011, captura: 819 },
              { año: 2012, captura: 120 },
              { año: 2013, captura: 60 },
              { año: 2014, captura: 700 },
              { año: 2015, captura: 90 },
              { año: 2016, captura: 75 },
              { año: 2017, captura: 685 },
              { año: 2018, captura: 60 },
              { año: 2019, captura: 167 },
              { año: 2020, captura: 10 },
              { año: 2021, captura: 140 },
            ],
          },
        ],
      },
      {
        titulo: "Esfuerzo pesquero en los Caladeros de Contoy, 1980-2021",
        nota: "Serie leída de la figura 1b de la Carta Nacional Pesquera; los valores son aproximados salvo los 4,198 días de pesca de 1993 que cita el texto. El esfuerzo corresponde a ambas especies en conjunto: se mantuvo por arriba de los 2,000 días tras las vedas de 1994 y promedia 806 días desde 2002, cuando las vedas se extendieron a cuatro y cinco meses.",
        unidadIzquierda: "Días de pesca",
        series: [
          {
            estado: "Días de pesca",
            color: "#0891b2",
            datos: [
              { año: 1980, captura: 1100 },
              { año: 1981, captura: 1700 },
              { año: 1982, captura: 1690 },
              { año: 1983, captura: 660 },
              { año: 1984, captura: 2000 },
              { año: 1985, captura: 3950 },
              { año: 1986, captura: 2280 },
              { año: 1987, captura: 4020 },
              { año: 1988, captura: 1740 },
              { año: 1989, captura: 2400 },
              { año: 1990, captura: 1880 },
              { año: 1991, captura: 2550 },
              { año: 1992, captura: 3450 },
              { año: 1993, captura: 4198 },
              { año: 1994, captura: 3900 },
              { año: 1995, captura: 4020 },
              { año: 1996, captura: 3300 },
              { año: 1997, captura: 2050 },
              { año: 1998, captura: 2450 },
              { año: 1999, captura: 2950 },
              { año: 2000, captura: 3380 },
              { año: 2001, captura: 2500 },
              { año: 2002, captura: 400 },
              { año: 2003, captura: 1230 },
              { año: 2004, captura: 1050 },
              { año: 2005, captura: 640 },
              { año: 2006, captura: 930 },
              { año: 2007, captura: 700 },
              { año: 2008, captura: 690 },
              { año: 2009, captura: 660 },
              { año: 2010, captura: 700 },
              { año: 2011, captura: 1015 },
              { año: 2012, captura: 700 },
              { año: 2013, captura: 900 },
              { año: 2014, captura: 1225 },
              { año: 2015, captura: 1180 },
              { año: 2016, captura: 640 },
              { año: 2017, captura: 1354 },
              { año: 2018, captura: 1000 },
              { año: 2019, captura: 600 },
              { año: 2020, captura: 110 },
              { año: 2021, captura: 350 },
            ],
          },
        ],
      },
      {
        titulo: "Rendimiento (CPUE) de camarón rojo y roca, 1980-2021",
        nota: "Serie leída de la figura 1c de la Carta Nacional Pesquera; los valores son aproximados salvo los que el texto de la CNP cita con cifra exacta: 67, 52 y 72 kg/día de camarón rojo en 2013, 2014 y 2015; y 415 kg/día de camarón roca en 1989, 807 en 2011, 571 en 2014, 506 en 2017, 279 en 2019 y 370 en 2021. Los promedios del camarón rojo por periodo de veda son 130 kg/día (1990-1993, sin veda), 82 kg/día (1994-2001, vedas de dos meses) y 124 kg/día (2005-2012, vedas de cinco meses).",
        unidadIzquierda: "kg/día de pesca",
        series: [
          {
            estado: "Camarón rojo (F. brasiliensis)",
            color: "#dc2626",
            punteada: true,
            datos: [
              { año: 1980, captura: 410 },
              { año: 1981, captura: 245 },
              { año: 1982, captura: 190 },
              { año: 1983, captura: 275 },
              { año: 1984, captura: 245 },
              { año: 1985, captura: 230 },
              { año: 1986, captura: 290 },
              { año: 1987, captura: 200 },
              { año: 1988, captura: 160 },
              { año: 1989, captura: 155 },
              { año: 1990, captura: 160 },
              { año: 1991, captura: 140 },
              { año: 1992, captura: 110 },
              { año: 1993, captura: 120 },
              { año: 1994, captura: 105 },
              { año: 1995, captura: 100 },
              { año: 1996, captura: 85 },
              { año: 1997, captura: 75 },
              { año: 1998, captura: 70 },
              { año: 1999, captura: 75 },
              { año: 2000, captura: 90 },
              { año: 2001, captura: 80 },
              { año: 2002, captura: 95 },
              { año: 2003, captura: 90 },
              { año: 2004, captura: 85 },
              { año: 2005, captura: 150 },
              { año: 2006, captura: 122 },
              { año: 2007, captura: 140 },
              { año: 2008, captura: 120 },
              { año: 2009, captura: 100 },
              { año: 2010, captura: 150 },
              { año: 2011, captura: 95 },
              { año: 2012, captura: 130 },
              { año: 2013, captura: 67 },
              { año: 2014, captura: 52 },
              { año: 2015, captura: 72 },
              { año: 2016, captura: 109 },
              { año: 2017, captura: 90 },
              { año: 2018, captura: 100 },
              { año: 2019, captura: 50 },
              { año: 2020, captura: 45 },
              { año: 2021, captura: 155 },
            ],
          },
          {
            estado: "Camarón roca (S. brevirostris)",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 410 },
              { año: 1981, captura: 430 },
              { año: 1982, captura: 440 },
              { año: 1983, captura: 230 },
              { año: 1984, captura: 65 },
              { año: 1985, captura: 290 },
              { año: 1986, captura: 360 },
              { año: 1987, captura: 355 },
              { año: 1988, captura: 175 },
              { año: 1989, captura: 415 },
              { año: 1990, captura: 340 },
              { año: 1991, captura: 175 },
              { año: 1992, captura: 120 },
              { año: 1993, captura: 200 },
              { año: 1994, captura: 210 },
              { año: 1995, captura: 195 },
              { año: 1996, captura: 130 },
              { año: 1997, captura: 60 },
              { año: 1998, captura: 32 },
              { año: 1999, captura: 130 },
              { año: 2000, captura: 45 },
              { año: 2001, captura: 90 },
              { año: 2002, captura: 60 },
              { año: 2003, captura: 195 },
              { año: 2004, captura: 255 },
              { año: 2005, captura: 32 },
              { año: 2006, captura: 420 },
              { año: 2007, captura: 170 },
              { año: 2008, captura: 160 },
              { año: 2009, captura: 340 },
              { año: 2010, captura: 370 },
              { año: 2011, captura: 807 },
              { año: 2012, captura: 175 },
              { año: 2013, captura: 85 },
              { año: 2014, captura: 571 },
              { año: 2015, captura: 130 },
              { año: 2016, captura: 115 },
              { año: 2017, captura: 506 },
              { año: 2018, captura: 60 },
              { año: 2019, captura: 279 },
              { año: 2020, captura: 30 },
              { año: 2021, captura: 370 },
            ],
          },
        ],
      },
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
    // Cifras que cita el texto de la CNP para el caracol del Golfo de México y Mar Caribe;
    // sustituyen a los recuadros genéricos de captura, valor, empleo y flota.
    indicadoresClave: [
      {
        etiqueta: "Captura nacional promedio 2016-2020",
        valor: "14,062",
        unidad: "toneladas al año",
      },
      {
        etiqueta: "Abundancia de caracol rosado en Banco Chinchorro",
        valor: "0.062",
        unidad: "ind/m² en promedio 1989-2022 (DE = 0.039)",
        icono: "rendimiento",
      },
      {
        etiqueta: "Abundancia en 2022 respecto a 2017-2021",
        valor: "+15%",
        unidad: "sobre el promedio de 0.065 ind/m² de los cinco años previos",
        icono: "tasa",
      },
    ],
    capturaPorEstado: [
      {
        titulo: "Captura de caracol a nivel nacional y en Campeche, 1980-2020",
        nota: "Serie leída de la figura 1a de la Carta Nacional Pesquera (Anuarios Estadísticos y bases de datos de la CONAPESCA); los valores son aproximados. La tendencia es positiva tanto en Campeche como a nivel nacional, con un promedio en los últimos cinco años (2016-2020) de 6,192 toneladas en Campeche y de 14,062 toneladas a nivel nacional.",
        series: [
          {
            estado: "Nacional",
            color: "#0f172a",
            datos: [
              { año: 1980, captura: 1400 },
              { año: 1981, captura: 3100 },
              { año: 1982, captura: 4550 },
              { año: 1983, captura: 5050 },
              { año: 1984, captura: 5950 },
              { año: 1985, captura: 5400 },
              { año: 1986, captura: 5250 },
              { año: 1987, captura: 5200 },
              { año: 1988, captura: 5200 },
              { año: 1989, captura: 6700 },
              { año: 1990, captura: 5450 },
              { año: 1991, captura: 4550 },
              { año: 1992, captura: 8200 },
              { año: 1993, captura: 7600 },
              { año: 1994, captura: 7500 },
              { año: 1995, captura: 9150 },
              { año: 1996, captura: 5750 },
              { año: 1997, captura: 7750 },
              { año: 1998, captura: 4450 },
              { año: 1999, captura: 8650 },
              { año: 2000, captura: 10400 },
              { año: 2001, captura: 11400 },
              { año: 2002, captura: 9000 },
              { año: 2003, captura: 8950 },
              { año: 2004, captura: 11350 },
              { año: 2005, captura: 10250 },
              { año: 2006, captura: 9800 },
              { año: 2007, captura: 9600 },
              { año: 2008, captura: 6400 },
              { año: 2009, captura: 7750 },
              { año: 2010, captura: 5150 },
              { año: 2011, captura: 7900 },
              { año: 2012, captura: 14350 },
              { año: 2013, captura: 12850 },
              { año: 2014, captura: 10350 },
              { año: 2015, captura: 19750 },
              { año: 2016, captura: 14200 },
              { año: 2017, captura: 11200 },
              { año: 2018, captura: 16500 },
              { año: 2019, captura: 14500 },
              { año: 2020, captura: 13550 },
            ],
          },
          {
            estado: "Campeche",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 100 },
              { año: 1981, captura: 250 },
              { año: 1982, captura: 400 },
              { año: 1983, captura: 700 },
              { año: 1984, captura: 700 },
              { año: 1985, captura: 1500 },
              { año: 1986, captura: 600 },
              { año: 1987, captura: 550 },
              { año: 1988, captura: 550 },
              { año: 1989, captura: 700 },
              { año: 1990, captura: 2050 },
              { año: 1991, captura: 2050 },
              { año: 1992, captura: 2100 },
              { año: 1993, captura: 3200 },
              { año: 1994, captura: 4250 },
              { año: 1995, captura: 4050 },
              { año: 1996, captura: 4450 },
              { año: 1997, captura: 2100 },
              { año: 1998, captura: 2900 },
              { año: 1999, captura: 4900 },
              { año: 2000, captura: 6650 },
              { año: 2001, captura: 7950 },
              { año: 2002, captura: 8200 },
              { año: 2003, captura: 5850 },
              { año: 2004, captura: 5800 },
              { año: 2005, captura: 7100 },
              { año: 2006, captura: 5950 },
              { año: 2007, captura: 5800 },
              { año: 2008, captura: 5750 },
              { año: 2009, captura: 2800 },
              { año: 2010, captura: 3050 },
              { año: 2011, captura: 2850 },
              { año: 2012, captura: 5700 },
              { año: 2013, captura: 4700 },
              { año: 2014, captura: 3250 },
              { año: 2015, captura: 8450 },
              { año: 2016, captura: 5300 },
              { año: 2017, captura: 4200 },
              { año: 2018, captura: 9000 },
              { año: 2019, captura: 6600 },
              { año: 2020, captura: 6550 },
            ],
          },
        ],
      },
      {
        titulo: "Captura de caracol en el resto de las entidades del Golfo de México y Mar Caribe, 1980-2020",
        nota: "Serie leída de la figura 1b de la Carta Nacional Pesquera; los valores son aproximados. A partir de 2010 la tendencia de la captura ha ido disminuyendo en estas entidades, con un promedio en el periodo 2010-2020 de 233 toneladas para Veracruz, 75 toneladas para Quintana Roo, 43 toneladas para Tabasco y 36 toneladas para Yucatán.",
        series: [
          {
            estado: "Veracruz",
            color: "#0f172a",
            datos: [
              { año: 1980, captura: 310 },
              { año: 1981, captura: 480 },
              { año: 1982, captura: 2080 },
              { año: 1983, captura: 480 },
              { año: 1984, captura: 1900 },
              { año: 1985, captura: 540 },
              { año: 1986, captura: 285 },
              { año: 1987, captura: 460 },
              { año: 1988, captura: 505 },
              { año: 1989, captura: 100 },
              { año: 1990, captura: 400 },
              { año: 1991, captura: 410 },
              { año: 1992, captura: 130 },
              { año: 1993, captura: 120 },
              { año: 1994, captura: 105 },
              { año: 1995, captura: 65 },
              { año: 1996, captura: 130 },
              { año: 1997, captura: 210 },
              { año: 1998, captura: 190 },
              { año: 1999, captura: 120 },
              { año: 2000, captura: 100 },
              { año: 2001, captura: 145 },
              { año: 2002, captura: 90 },
              { año: 2003, captura: 250 },
              { año: 2004, captura: 390 },
              { año: 2005, captura: 355 },
              { año: 2006, captura: 400 },
              { año: 2007, captura: 395 },
              { año: 2008, captura: 305 },
              { año: 2009, captura: 390 },
              { año: 2010, captura: 455 },
              { año: 2011, captura: 300 },
              { año: 2012, captura: 100 },
              { año: 2013, captura: 95 },
              { año: 2014, captura: 235 },
              { año: 2015, captura: 205 },
              { año: 2016, captura: 195 },
              { año: 2017, captura: 230 },
              { año: 2018, captura: 390 },
              { año: 2019, captura: 130 },
              { año: 2020, captura: 200 },
            ],
          },
          {
            estado: "Tabasco",
            color: "#38bdf8",
            datos: [
              { año: 1980, captura: 10 },
              { año: 1981, captura: 15 },
              { año: 1982, captura: 830 },
              { año: 1983, captura: 95 },
              { año: 1984, captura: 180 },
              { año: 1985, captura: 345 },
              { año: 1986, captura: 250 },
              { año: 1987, captura: 400 },
              { año: 1988, captura: 415 },
              { año: 1989, captura: 45 },
              { año: 1990, captura: 20 },
              { año: 1991, captura: 30 },
              { año: 1992, captura: 20 },
              { año: 1993, captura: 15 },
              { año: 1994, captura: 10 },
              { año: 1995, captura: 10 },
              { año: 1996, captura: 15 },
              { año: 1997, captura: 20 },
              { año: 1998, captura: 15 },
              { año: 1999, captura: 20 },
              { año: 2000, captura: 15 },
              { año: 2001, captura: 20 },
              { año: 2002, captura: 25 },
              { año: 2003, captura: 60 },
              { año: 2004, captura: 55 },
              { año: 2005, captura: 115 },
              { año: 2006, captura: 60 },
              { año: 2007, captura: 40 },
              { año: 2008, captura: 45 },
              { año: 2009, captura: 65 },
              { año: 2010, captura: 100 },
              { año: 2011, captura: 60 },
              { año: 2012, captura: 25 },
              { año: 2013, captura: 20 },
              { año: 2014, captura: 25 },
              { año: 2015, captura: 30 },
              { año: 2016, captura: 35 },
              { año: 2017, captura: 45 },
              { año: 2018, captura: 40 },
              { año: 2019, captura: 60 },
              { año: 2020, captura: 30 },
            ],
          },
          {
            estado: "Yucatán",
            color: "#1d4ed8",
            datos: [
              { año: 1980, captura: 15 },
              { año: 1981, captura: 20 },
              { año: 1982, captura: 890 },
              { año: 1983, captura: 465 },
              { año: 1984, captura: 105 },
              { año: 1985, captura: 300 },
              { año: 1986, captura: 175 },
              { año: 1987, captura: 100 },
              { año: 1988, captura: 45 },
              { año: 1989, captura: 30 },
              { año: 1990, captura: 25 },
              { año: 1991, captura: 30 },
              { año: 1992, captura: 20 },
              { año: 1993, captura: 25 },
              { año: 1994, captura: 20 },
              { año: 1995, captura: 15 },
              { año: 1996, captura: 25 },
              { año: 1997, captura: 30 },
              { año: 1998, captura: 40 },
              { año: 1999, captura: 35 },
              { año: 2000, captura: 45 },
              { año: 2001, captura: 40 },
              { año: 2002, captura: 50 },
              { año: 2003, captura: 65 },
              { año: 2004, captura: 60 },
              { año: 2005, captura: 100 },
              { año: 2006, captura: 70 },
              { año: 2007, captura: 85 },
              { año: 2008, captura: 95 },
              { año: 2009, captura: 110 },
              { año: 2010, captura: 130 },
              { año: 2011, captura: 90 },
              { año: 2012, captura: 15 },
              { año: 2013, captura: 20 },
              { año: 2014, captura: 25 },
              { año: 2015, captura: 30 },
              { año: 2016, captura: 25 },
              { año: 2017, captura: 20 },
              { año: 2018, captura: 30 },
              { año: 2019, captura: 45 },
              { año: 2020, captura: 55 },
            ],
          },
          {
            estado: "Quintana Roo",
            color: "#94a3b8",
            datos: [
              { año: 1980, captura: 135 },
              { año: 1981, captura: 250 },
              { año: 1982, captura: 75 },
              { año: 1983, captura: 810 },
              { año: 1984, captura: 795 },
              { año: 1985, captura: 690 },
              { año: 1986, captura: 1250 },
              { año: 1987, captura: 965 },
              { año: 1988, captura: 900 },
              { año: 1989, captura: 865 },
              { año: 1990, captura: 430 },
              { año: 1991, captura: 245 },
              { año: 1992, captura: 225 },
              { año: 1993, captura: 405 },
              { año: 1994, captura: 400 },
              { año: 1995, captura: 355 },
              { año: 1996, captura: 430 },
              { año: 1997, captura: 445 },
              { año: 1998, captura: 305 },
              { año: 1999, captura: 320 },
              { año: 2000, captura: 305 },
              { año: 2001, captura: 315 },
              { año: 2002, captura: 265 },
              { año: 2003, captura: 280 },
              { año: 2004, captura: 340 },
              { año: 2005, captura: 230 },
              { año: 2006, captura: 190 },
              { año: 2007, captura: 15 },
              { año: 2008, captura: 145 },
              { año: 2009, captura: 100 },
              { año: 2010, captura: 130 },
              { año: 2011, captura: 105 },
              { año: 2012, captura: 15 },
              { año: 2013, captura: 20 },
              { año: 2014, captura: 25 },
              { año: 2015, captura: 30 },
              { año: 2016, captura: 15 },
              { año: 2017, captura: 20 },
              { año: 2018, captura: 15 },
              { año: 2019, captura: 145 },
              { año: 2020, captura: 60 },
            ],
          },
        ],
      },
      {
        titulo: "Valor económico de la producción pesquera de caracol en Campeche, 2009-2020",
        nota: "Serie leída de la figura 2 de la Carta Nacional Pesquera (Anuarios Estadísticos y bases de datos de la CONAPESCA); los valores son aproximados. En el periodo, Campeche registró una producción promedio de 5,277 toneladas de peso vivo con un valor promedio de $49.34 millones de pesos: 2018 fue el año de mayor valor con $80.329 millones y 2014 el de menor valor con $18.74 millones.",
        unidadIzquierda: "Millones de pesos",
        unidadDerecha: "Toneladas",
        series: [
          {
            estado: "Valor de la producción",
            color: "#0f172a",
            datos: [
              { año: 2009, captura: 19.6 },
              { año: 2010, captura: 24.2 },
              { año: 2011, captura: 21.3 },
              { año: 2012, captura: 42.4 },
              { año: 2013, captura: 59.3 },
              { año: 2014, captura: 18.74 },
              { año: 2015, captura: 74.2 },
              { año: 2016, captura: 46 },
              { año: 2017, captura: 69 },
              { año: 2018, captura: 80.329 },
              { año: 2019, captura: 55.8 },
              { año: 2020, captura: 78.6 },
            ],
          },
          {
            estado: "Peso vivo",
            color: "#0d9488",
            eje: "derecho",
            datos: [
              { año: 2009, captura: 3150 },
              { año: 2010, captura: 4400 },
              { año: 2011, captura: 2900 },
              { año: 2012, captura: 5650 },
              { año: 2013, captura: 4250 },
              { año: 2014, captura: 3350 },
              { año: 2015, captura: 8550 },
              { año: 2016, captura: 5600 },
              { año: 2017, captura: 4300 },
              { año: 2018, captura: 9050 },
              { año: 2019, captura: 6400 },
              { año: 2020, captura: 5200 },
            ],
          },
        ],
      },
      {
        titulo: "Abundancia de caracol rosado (L. gigas) en Banco Chinchorro, Quintana Roo, 1989-2022",
        nota: "Serie leída de la figura 3 de la Carta Nacional Pesquera (monitoreo biológico del Instituto Nacional de Pesca y Acuacultura); los valores son aproximados y faltan los años sin evaluación (1990 y 2000). La abundancia ha oscilado entre 0.005 ind/m² en 1999 y 0.157 ind/m² en 1989, con un promedio de 0.062 ind/m² (DE = 0.039). En 2022, último año de evaluación biológica, la abundancia fue 15% superior al promedio de 0.065 ind/m² de los cinco años anteriores (2017-2021).",
        unidadIzquierda: "ind/m²",
        series: [
          {
            estado: "Abundancia de caracol rosado",
            color: "#0f172a",
            datos: [
              { año: 1989, captura: 0.157 },
              { año: 1991, captura: 0.133 },
              { año: 1992, captura: 0.091 },
              { año: 1993, captura: 0.105 },
              { año: 1994, captura: 0.088 },
              { año: 1995, captura: 0.112 },
              { año: 1996, captura: 0.085 },
              { año: 1997, captura: 0.008 },
              { año: 1998, captura: 0.009 },
              { año: 1999, captura: 0.005 },
              { año: 2001, captura: 0.014 },
              { año: 2002, captura: 0.029 },
              { año: 2003, captura: 0.018 },
              { año: 2004, captura: 0.056 },
              { año: 2005, captura: 0.07 },
              { año: 2006, captura: 0.02 },
              { año: 2007, captura: 0.155 },
              { año: 2008, captura: 0.021 },
              { año: 2009, captura: 0.011 },
              { año: 2010, captura: 0.038 },
              { año: 2011, captura: 0.073 },
              { año: 2012, captura: 0.059 },
              { año: 2013, captura: 0.067 },
              { año: 2014, captura: 0.057 },
              { año: 2015, captura: 0.065 },
              { año: 2016, captura: 0.042 },
              { año: 2017, captura: 0.024 },
              { año: 2018, captura: 0.065 },
              { año: 2019, captura: 0.071 },
              { año: 2020, captura: 0.088 },
              { año: 2021, captura: 0.075 },
              { año: 2022, captura: 0.061 },
            ],
          },
        ],
      },
    ],
    // Participación de cada entidad en la captura de caracol del Golfo de México
    // y Mar Caribe, ordenada de mayor a menor.
    participacionEstados: [
      { estado: "Campeche", porcentaje: 94.9 },
      { estado: "Veracruz", porcentaje: 3.7 },
      { estado: "Quintana Roo", porcentaje: 1.2 },
      { estado: "Tabasco", porcentaje: 0.2 },
      { estado: "Yucatán", porcentaje: 0.01 },
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
    valorProduccion: "$75",
    embarcaciones: "1,455",
    // Tendencia que cita el texto de la CNP para los langostinos del Golfo de México.
    indicadoresClave: [
      {
        etiqueta: "Tendencia de la producción del Golfo",
        valor: "-8.1%",
        unidad: "respecto al promedio de 2010 a 2020",
        icono: "tasa",
      },
    ],
    capturaPorEstado: [
      {
        titulo: "Captura de langostinos por estado y a nivel Golfo de México, 1980-2020",
        nota: "Serie leída de la figura 1a de la Carta Nacional Pesquera (Anuarios Estadísticos de Acuacultura y Pesca, CONAPESCA); los valores anuales son aproximados y la serie del Golfo de México es la suma de los cuatro estados. Los promedios de los últimos cinco años (2016-2020) sí corresponden a las cifras que cita el texto: 958.5 t en Veracruz, 850.1 t en Tabasco, 232.8 t en Tamaulipas y 19.6 t en Campeche. La producción a nivel Golfo de México ha descendido 8.1% respecto al promedio de 2010 a 2020, con una caída abrupta en los últimos tres años (2018-2020), principalmente en Veracruz y Tabasco.",
        series: [
          {
            estado: "Golfo de México",
            color: "#0f172a",
            datos: [
              { año: 1980, captura: 1620 },
              { año: 1981, captura: 2830 },
              { año: 1982, captura: 2570 },
              { año: 1983, captura: 1990 },
              { año: 1984, captura: 3380 },
              { año: 1985, captura: 2670 },
              { año: 1986, captura: 2300 },
              { año: 1987, captura: 2620 },
              { año: 1988, captura: 3130 },
              { año: 1989, captura: 2500 },
              { año: 1990, captura: 1430 },
              { año: 1991, captura: 2000 },
              { año: 1992, captura: 1890 },
              { año: 1993, captura: 1940 },
              { año: 1994, captura: 3030 },
              { año: 1995, captura: 3710 },
              { año: 1996, captura: 3855 },
              { año: 1997, captura: 3160 },
              { año: 1998, captura: 2620 },
              { año: 1999, captura: 3810 },
              { año: 2000, captura: 3795 },
              { año: 2001, captura: 2980 },
              { año: 2002, captura: 2760 },
              { año: 2003, captura: 2880 },
              { año: 2004, captura: 3000 },
              { año: 2005, captura: 3290 },
              { año: 2006, captura: 3230 },
              { año: 2007, captura: 2985 },
              { año: 2008, captura: 2840 },
              { año: 2009, captura: 2655 },
              { año: 2010, captura: 2310 },
              { año: 2011, captura: 1845 },
              { año: 2012, captura: 2650 },
              { año: 2013, captura: 2065 },
              { año: 2014, captura: 2295 },
              { año: 2015, captura: 2655 },
              { año: 2016, captura: 2600 },
              { año: 2017, captura: 2900 },
              { año: 2018, captura: 2742 },
              { año: 2019, captura: 1406 },
              { año: 2020, captura: 654 },
            ],
          },
          {
            estado: "Veracruz",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 750 },
              { año: 1981, captura: 1340 },
              { año: 1982, captura: 1660 },
              { año: 1983, captura: 970 },
              { año: 1984, captura: 1300 },
              { año: 1985, captura: 1030 },
              { año: 1986, captura: 1000 },
              { año: 1987, captura: 1050 },
              { año: 1988, captura: 1170 },
              { año: 1989, captura: 1060 },
              { año: 1990, captura: 780 },
              { año: 1991, captura: 800 },
              { año: 1992, captura: 790 },
              { año: 1993, captura: 800 },
              { año: 1994, captura: 1880 },
              { año: 1995, captura: 2230 },
              { año: 1996, captura: 2290 },
              { año: 1997, captura: 2300 },
              { año: 1998, captura: 1700 },
              { año: 1999, captura: 2270 },
              { año: 2000, captura: 2280 },
              { año: 2001, captura: 1700 },
              { año: 2002, captura: 1690 },
              { año: 2003, captura: 1700 },
              { año: 2004, captura: 1760 },
              { año: 2005, captura: 1830 },
              { año: 2006, captura: 1840 },
              { año: 2007, captura: 1620 },
              { año: 2008, captura: 1580 },
              { año: 2009, captura: 1500 },
              { año: 2010, captura: 1230 },
              { año: 2011, captura: 1200 },
              { año: 2012, captura: 1220 },
              { año: 2013, captura: 1330 },
              { año: 2014, captura: 1310 },
              { año: 2015, captura: 1380 },
              { año: 2016, captura: 1380 },
              { año: 2017, captura: 1430 },
              { año: 2018, captura: 1240 },
              { año: 2019, captura: 480 },
              { año: 2020, captura: 260 },
            ],
          },
          {
            estado: "Tabasco",
            color: "#0891b2",
            datos: [
              { año: 1980, captura: 420 },
              { año: 1981, captura: 650 },
              { año: 1982, captura: 540 },
              { año: 1983, captura: 600 },
              { año: 1984, captura: 920 },
              { año: 1985, captura: 1080 },
              { año: 1986, captura: 700 },
              { año: 1987, captura: 820 },
              { año: 1988, captura: 1180 },
              { año: 1989, captura: 820 },
              { año: 1990, captura: 590 },
              { año: 1991, captura: 1130 },
              { año: 1992, captura: 800 },
              { año: 1993, captura: 780 },
              { año: 1994, captura: 800 },
              { año: 1995, captura: 1210 },
              { año: 1996, captura: 1410 },
              { año: 1997, captura: 620 },
              { año: 1998, captura: 780 },
              { año: 1999, captura: 1430 },
              { año: 2000, captura: 1410 },
              { año: 2001, captura: 1180 },
              { año: 2002, captura: 950 },
              { año: 2003, captura: 1040 },
              { año: 2004, captura: 1100 },
              { año: 2005, captura: 1330 },
              { año: 2006, captura: 1280 },
              { año: 2007, captura: 1270 },
              { año: 2008, captura: 1180 },
              { año: 2009, captura: 1080 },
              { año: 2010, captura: 1000 },
              { año: 2011, captura: 560 },
              { año: 2012, captura: 1310 },
              { año: 2013, captura: 560 },
              { año: 2014, captura: 830 },
              { año: 2015, captura: 1060 },
              { año: 2016, captura: 1000 },
              { año: 2017, captura: 1100 },
              { año: 2018, captura: 1180 },
              { año: 2019, captura: 620 },
              { año: 2020, captura: 350 },
            ],
          },
          {
            estado: "Tamaulipas",
            color: "#f59e0b",
            punteada: true,
            datos: [
              { año: 1980, captura: 450 },
              { año: 1981, captura: 840 },
              { año: 1982, captura: 370 },
              { año: 1983, captura: 420 },
              { año: 1984, captura: 1160 },
              { año: 1985, captura: 560 },
              { año: 1986, captura: 600 },
              { año: 1987, captura: 750 },
              { año: 1988, captura: 780 },
              { año: 1989, captura: 620 },
              { año: 1990, captura: 60 },
              { año: 1991, captura: 70 },
              { año: 1992, captura: 300 },
              { año: 1993, captura: 340 },
              { año: 1994, captura: 330 },
              { año: 1995, captura: 250 },
              { año: 1996, captura: 130 },
              { año: 1997, captura: 120 },
              { año: 1998, captura: 80 },
              { año: 1999, captura: 70 },
              { año: 2000, captura: 70 },
              { año: 2001, captura: 60 },
              { año: 2002, captura: 70 },
              { año: 2003, captura: 80 },
              { año: 2004, captura: 80 },
              { año: 2005, captura: 70 },
              { año: 2006, captura: 60 },
              { año: 2007, captura: 50 },
              { año: 2008, captura: 40 },
              { año: 2009, captura: 40 },
              { año: 2010, captura: 50 },
              { año: 2011, captura: 60 },
              { año: 2012, captura: 90 },
              { año: 2013, captura: 150 },
              { año: 2014, captura: 130 },
              { año: 2015, captura: 190 },
              { año: 2016, captura: 200 },
              { año: 2017, captura: 345 },
              { año: 2018, captura: 300 },
              { año: 2019, captura: 290 },
              { año: 2020, captura: 29 },
            ],
          },
          {
            estado: "Campeche",
            color: "#8b5cf6",
            datos: [
              { año: 1980, captura: 0 },
              { año: 1981, captura: 0 },
              { año: 1982, captura: 0 },
              { año: 1983, captura: 0 },
              { año: 1984, captura: 0 },
              { año: 1985, captura: 0 },
              { año: 1986, captura: 0 },
              { año: 1987, captura: 0 },
              { año: 1988, captura: 0 },
              { año: 1989, captura: 0 },
              { año: 1990, captura: 0 },
              { año: 1991, captura: 0 },
              { año: 1992, captura: 0 },
              { año: 1993, captura: 20 },
              { año: 1994, captura: 20 },
              { año: 1995, captura: 20 },
              { año: 1996, captura: 25 },
              { año: 1997, captura: 120 },
              { año: 1998, captura: 60 },
              { año: 1999, captura: 40 },
              { año: 2000, captura: 35 },
              { año: 2001, captura: 40 },
              { año: 2002, captura: 50 },
              { año: 2003, captura: 60 },
              { año: 2004, captura: 60 },
              { año: 2005, captura: 60 },
              { año: 2006, captura: 50 },
              { año: 2007, captura: 45 },
              { año: 2008, captura: 40 },
              { año: 2009, captura: 35 },
              { año: 2010, captura: 30 },
              { año: 2011, captura: 25 },
              { año: 2012, captura: 30 },
              { año: 2013, captura: 25 },
              { año: 2014, captura: 25 },
              { año: 2015, captura: 25 },
              { año: 2016, captura: 20 },
              { año: 2017, captura: 25 },
              { año: 2018, captura: 22 },
              { año: 2019, captura: 16 },
              { año: 2020, captura: 15 },
            ],
          },
        ],
      },
    ],
    // Figura 1b: contribución porcentual por estado en los últimos cinco años (2016-2020).
    participacionEstados: [
      { estado: "Veracruz", porcentaje: 46.5, captura: 958.5 },
      { estado: "Tabasco", porcentaje: 41.24, captura: 850.1 },
      { estado: "Tamaulipas", porcentaje: 11.29, captura: 232.8 },
      { estado: "Campeche", porcentaje: 0.95, captura: 19.6 },
      { estado: "Quintana Roo", porcentaje: 0.02 },
      { estado: "Yucatán", porcentaje: 0.001 },
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
    // Tabla 1 de la Carta Nacional Pesquera: RMS y sus intervalos de confianza para la
    // pesquería de langostino (Macrobrachium spp) por estado del Golfo de México y Mar Caribe.
    rmsPorEstado: [
      { estado: "Tamaulipas", rms: 329.72, icMenos: 303.58, icMas: 362.59 },
      { estado: "Veracruz", rms: 1428.39, icMenos: 1311.49, icMas: 1574.36 },
      { estado: "Tabasco", rms: 931.25, icMenos: 833.6, icMas: 1005.43 },
      { estado: "Campeche", rms: 42.44, icMenos: 37.2, icMas: 50.41 },
      { estado: "Golfo de México", rms: 2537.71, icMenos: 2375.74, icMas: 2692.6 },
    ],
    rmsNota:
      "Tabla 1 de la Carta Nacional Pesquera: rendimiento máximo sostenible (RMS) y sus intervalos de confianza (IC) para la pesquería de langostino (Macrobrachium spp), estimado para cada estado del Golfo de México y Mar Caribe. El RMS del Golfo de México se estima sobre la serie regional en conjunto, por lo que no equivale a la suma de los estados.",
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
    indicadoresClave: [
      { etiqueta: "Talla de robalo blanco (C. undecimalis)", valor: "21.3–138", unidad: "cm de longitud total", icono: "talla" },
      { etiqueta: "Talla de robalo prieto (C. poeyi)", valor: "39–124", unidad: "cm de longitud total", icono: "talla" },
      { etiqueta: "Talla de chucumite (C. parallelus)", valor: "19.2–52", unidad: "cm de longitud total", icono: "talla" },
      { etiqueta: "Rendimiento en Campeche", valor: "6–102.7", unidad: "kg/viaje/día", icono: "rendimiento" },
      { etiqueta: "Rendimiento en Tabasco", valor: "22.7", unidad: "kg/viaje/día", icono: "rendimiento" },
    ],
    // Figura 1a. Tendencia histórica de la captura de robalo y chucumite, 1978–2020,
    // en Campeche, Veracruz y Tabasco. Fuente: Anuarios Estadísticos y bases de datos
    // de Acuacultura y Pesca, CONAPESCA.
    capturaPorEstado: [
      {
        titulo: "Captura de robalo y chucumite en Veracruz, Campeche y Tabasco, 1978–2020 (CONAPESCA)",
        series: [
          {
            estado: "Veracruz",
            color: "#e11d48",
            datos: [
              { año: 1978, captura: 600 },
              { año: 1980, captura: 700 },
              { año: 1982, captura: 1300 },
              { año: 1984, captura: 1250 },
              { año: 1986, captura: 1150 },
              { año: 1988, captura: 1000 },
              { año: 1990, captura: 800 },
              { año: 1992, captura: 850 },
              { año: 1994, captura: 1800 },
              { año: 1996, captura: 2250 },
              { año: 1998, captura: 1900 },
              { año: 2000, captura: 1000 },
              { año: 2002, captura: 1100 },
              { año: 2004, captura: 1150 },
              { año: 2006, captura: 1250 },
              { año: 2008, captura: 1350 },
              { año: 2010, captura: 1500 },
              { año: 2012, captura: 1550 },
              { año: 2014, captura: 1600 },
              { año: 2015, captura: 2900 },
              { año: 2016, captura: 5600 },
              { año: 2017, captura: 7500 },
              { año: 2018, captura: 6900 },
              { año: 2019, captura: 2300 },
              { año: 2020, captura: 1800 },
            ],
          },
          {
            estado: "Campeche",
            color: "#0891b2",
            datos: [
              { año: 1978, captura: 100 },
              { año: 1980, captura: 600 },
              { año: 1982, captura: 2000 },
              { año: 1984, captura: 1200 },
              { año: 1986, captura: 1300 },
              { año: 1988, captura: 1400 },
              { año: 1990, captura: 900 },
              { año: 1992, captura: 1000 },
              { año: 1994, captura: 1050 },
              { año: 1996, captura: 950 },
              { año: 1998, captura: 1000 },
              { año: 2000, captura: 1500 },
              { año: 2002, captura: 3200 },
              { año: 2003, captura: 3850 },
              { año: 2004, captura: 2500 },
              { año: 2006, captura: 2000 },
              { año: 2008, captura: 2100 },
              { año: 2010, captura: 3150 },
              { año: 2012, captura: 2000 },
              { año: 2014, captura: 2050 },
              { año: 2016, captura: 1900 },
              { año: 2018, captura: 3200 },
              { año: 2019, captura: 2400 },
              { año: 2020, captura: 1800 },
            ],
          },
          {
            estado: "Tabasco",
            color: "#0d9488",
            datos: [
              { año: 1978, captura: 500 },
              { año: 1980, captura: 800 },
              { año: 1982, captura: 900 },
              { año: 1984, captura: 1100 },
              { año: 1986, captura: 1200 },
              { año: 1988, captura: 1100 },
              { año: 1990, captura: 900 },
              { año: 1992, captura: 700 },
              { año: 1994, captura: 600 },
              { año: 1996, captura: 700 },
              { año: 1998, captura: 800 },
              { año: 2000, captura: 2000 },
              { año: 2002, captura: 2800 },
              { año: 2003, captura: 3000 },
              { año: 2005, captura: 2700 },
              { año: 2007, captura: 3200 },
              { año: 2010, captura: 1300 },
              { año: 2012, captura: 2000 },
              { año: 2015, captura: 1700 },
              { año: 2018, captura: 2400 },
              { año: 2019, captura: 2300 },
              { año: 2020, captura: 1100 },
            ],
          },
        ],
        nota: "Figura 1a de la CNP. Serie reconstruida a partir de la figura; los valores son aproximados.",
      },
      // Figura 1b. Tendencia histórica de las capturas de Tamaulipas, Yucatán y
      // Quintana Roo, 1978–2020. Fuente: CONAPESCA.
      {
        titulo: "Captura de robalo y chucumite en Tamaulipas, Yucatán y Quintana Roo, 1978–2020 (CONAPESCA)",
        series: [
          {
            estado: "Tamaulipas",
            color: "#e11d48",
            datos: [
              { año: 1978, captura: 160 },
              { año: 1980, captura: 50 },
              { año: 1982, captura: 270 },
              { año: 1983, captura: 200 },
              { año: 1984, captura: 580 },
              { año: 1985, captura: 200 },
              { año: 1986, captura: 450 },
              { año: 1988, captura: 460 },
              { año: 1989, captura: 530 },
              { año: 1990, captura: 250 },
              { año: 1992, captura: 380 },
              { año: 1994, captura: 400 },
              { año: 1996, captura: 460 },
              { año: 1997, captura: 280 },
              { año: 1998, captura: 120 },
              { año: 2000, captura: 60 },
              { año: 2002, captura: 80 },
              { año: 2004, captura: 80 },
              { año: 2006, captura: 90 },
              { año: 2008, captura: 110 },
              { año: 2010, captura: 230 },
              { año: 2012, captura: 150 },
              { año: 2014, captura: 230 },
              { año: 2016, captura: 480 },
              { año: 2017, captura: 850 },
              { año: 2018, captura: 970 },
              { año: 2019, captura: 660 },
              { año: 2020, captura: 570 },
            ],
          },
          {
            estado: "Yucatán",
            color: "#0891b2",
            datos: [
              { año: 1978, captura: 20 },
              { año: 1982, captura: 80 },
              { año: 1986, captura: 60 },
              { año: 1990, captura: 130 },
              { año: 1994, captura: 40 },
              { año: 1998, captura: 30 },
              { año: 2002, captura: 60 },
              { año: 2006, captura: 100 },
              { año: 2010, captura: 100 },
              { año: 2014, captura: 90 },
              { año: 2018, captura: 110 },
              { año: 2020, captura: 90 },
            ],
          },
          {
            estado: "Quintana Roo",
            color: "#0d9488",
            datos: [
              { año: 1978, captura: 10 },
              { año: 1982, captura: 20 },
              { año: 1986, captura: 20 },
              { año: 1990, captura: 20 },
              { año: 1994, captura: 30 },
              { año: 1998, captura: 40 },
              { año: 2002, captura: 70 },
              { año: 2006, captura: 110 },
              { año: 2010, captura: 130 },
              { año: 2014, captura: 70 },
              { año: 2018, captura: 60 },
              { año: 2020, captura: 40 },
            ],
          },
        ],
        nota: "Figura 1b de la CNP. Serie reconstruida a partir de la figura; los valores son aproximados.",
      },
    ],
    // Figura 1c. Participación estatal en las capturas de robalo y chucumite en los
    // últimos cinco años (2016–2020). Fuente: CONAPESCA.
    participacionPorEspecie: [
      {
        titulo: "Participación estatal en las capturas de robalo y chucumite, 2016–2020",
        nota: "Figura 1c de la CNP. Fuente: Anuarios Estadísticos y bases de datos de Acuacultura y Pesca, CONAPESCA.",
        estados: [
          { estado: "Veracruz", porcentaje: 47.8 },
          { estado: "Campeche", porcentaje: 24.6 },
          { estado: "Tabasco", porcentaje: 19.0 },
          { estado: "Tamaulipas", porcentaje: 7.0 },
          { estado: "Yucatán", porcentaje: 1.0 },
          { estado: "Quintana Roo", porcentaje: 0.6 },
        ],
      },
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
    // Tabla I. Rendimiento máximo sustentable (RMS) de robalo estimado para cada estado
    // del Golfo de México y mar Caribe.
    rmsPorEstado: [
      { estado: "Tamaulipas", rms: 502.83, icMenos: 372.71, icMas: 633.09 },
      { estado: "Veracruz", rms: 3687.04, icMenos: 2766.03, icMas: 4542.16 },
      { estado: "Tabasco", rms: 2049.28, icMenos: 1938.65, icMas: 2217.16 },
      { estado: "Campeche", rms: 2225.15, icMenos: 2032.40, icMas: 2373.90 },
      { estado: "Yucatán", rms: 116.25, icMenos: 106.07, icMas: 125.06 },
      { estado: "Quintana Roo", rms: 117.85, icMenos: 109.22, icMas: 131.00 },
      { estado: "Golfo de México", rms: 7956.20, icMenos: 6582.77, icMas: 9392.00 },
    ],
    rmsNota:
      "Tabla I de la CNP. Rendimiento máximo sustentable (RMS) de robalo estimado para cada estado del Golfo de México y mar Caribe, con sus intervalos de confianza inferior (IC -) y superior (IC +).",
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
    // Capturas promedio del último periodo de cada especie, tal como las reporta la CNP.
    // No se usa capturaAnual porque su recuadro rotula "Captura anual" y estas cifras son
    // promedios de un periodo, no de un solo año.
    indicadoresClave: [
      {
        etiqueta: "Captura de mero (2021-2023)",
        valor: "4,950",
        unidad: "toneladas anuales en promedio (± 500)",
        icono: "rendimiento",
      },
      {
        etiqueta: "Captura de negrillo (2019-2022)",
        valor: "2,390",
        unidad: "toneladas anuales en promedio (± 180)",
        icono: "rendimiento",
      },
    ],
    capturaPorEstado: [
      {
        titulo: "Captura total de mero rojo (Epinephelus morio) en el Banco de Campeche, 1970-2023",
        nota: "Serie leída de la figura 1b de la Carta Nacional Pesquera (Sistema de Información de Pesca y Acuacultura, Anuarios Estadísticos de Acuacultura y Pesca, CONAPESCA); los valores anuales son aproximados. La CNP distingue tres periodos: I, el crecimiento de la pesquería hasta su madurez (1970-1975), con una captura promedio de 17,800 ± 1,175 toneladas y el máximo histórico en 1972; II, el inicio de la declinación (1976-1995), con 12,400 ± 1,400 toneladas en promedio y un mínimo de 9,900 toneladas en 1983, asociado a la pesca de juveniles y a la falla de la clase anual de 1981 tras el derrame de petróleo en la Sonda de Campeche; y III (1996-2023), que inicia con una caída a 7,580 toneladas —57% menor que la producción máxima— y continúa el deterioro hasta 4,950 ± 500 toneladas en promedio en los últimos tres años (2021-2023).",
        series: [
          {
            estado: "Captura total",
            color: "#0f172a",
            datos: [
              { año: 1970, captura: 17600 },
              { año: 1971, captura: 18000 },
              { año: 1972, captura: 19700 },
              { año: 1973, captura: 17900 },
              { año: 1974, captura: 16500 },
              { año: 1975, captura: 16600 },
              { año: 1976, captura: 14150 },
              { año: 1977, captura: 14000 },
              { año: 1978, captura: 14600 },
              { año: 1979, captura: 14300 },
              { año: 1980, captura: 13100 },
              { año: 1981, captura: 12700 },
              { año: 1982, captura: 11700 },
              { año: 1983, captura: 9900 },
              { año: 1984, captura: 11300 },
              { año: 1985, captura: 11000 },
              { año: 1986, captura: 10050 },
              { año: 1987, captura: 11100 },
              { año: 1988, captura: 13300 },
              { año: 1989, captura: 12500 },
              { año: 1990, captura: 12700 },
              { año: 1991, captura: 12300 },
              { año: 1992, captura: 11900 },
              { año: 1993, captura: 11000 },
              { año: 1994, captura: 10700 },
              { año: 1995, captura: 11500 },
              { año: 1996, captura: 7580 },
              { año: 1997, captura: 7900 },
              { año: 1998, captura: 8700 },
              { año: 1999, captura: 7600 },
              { año: 2000, captura: 9800 },
              { año: 2001, captura: 8000 },
              { año: 2002, captura: 8600 },
              { año: 2003, captura: 6600 },
              { año: 2004, captura: 5800 },
              { año: 2005, captura: 5900 },
              { año: 2006, captura: 7400 },
              { año: 2007, captura: 6600 },
              { año: 2008, captura: 8900 },
              { año: 2009, captura: 9100 },
              { año: 2010, captura: 9400 },
              { año: 2011, captura: 6000 },
              { año: 2012, captura: 9500 },
              { año: 2013, captura: 7700 },
              { año: 2014, captura: 6700 },
              { año: 2015, captura: 6400 },
              { año: 2016, captura: 5900 },
              { año: 2017, captura: 5800 },
              { año: 2018, captura: 5200 },
              { año: 2019, captura: 5600 },
              { año: 2020, captura: 4600 },
              { año: 2021, captura: 5450 },
              { año: 2022, captura: 5000 },
              { año: 2023, captura: 4400 },
            ],
          },
        ],
        referencias: [{ valor: 10115, etiqueta: "Captura promedio", tipo: "punteada" }],
      },
      {
        titulo: "Captura de mero rojo por tipo de flota en el Banco de Campeche, 1970-2023",
        nota: "Serie leída de la figura 1c de la Carta Nacional Pesquera; los valores anuales son aproximados y las tres flotas suman la captura total de la gráfica anterior. Los promedios por periodo sí corresponden a las cifras que cita el texto: de 1970 a 1975 la flota mayor aportó 8,800 ± 1,360 toneladas (50%), la cubana 6,200 ± 1,990 (35%) y la menor 2,700 ± 870 (15%); de 1987 a 1995 las flotas mexicanas promediaron 11,150 ± 920 toneladas, con 7,335 ± 670 de la flota mayor (65%) y 3,910 ± 845 de la menor (35%), tras el cambio de embarcaciones nodriza con alijos y palangres de mano por palangres de línea larga de hasta 2,000 anzuelos y la disminución de la actividad cubana; y de 2021 a 2023 la relación se invirtió: 3,235 ± 538 toneladas de la flota menor (65%) y 1,710 ± 105 de la mayor (35%).",
        series: [
          {
            estado: "Flota mayor",
            color: "#0d9488",
            datos: [
              { año: 1970, captura: 7100 },
              { año: 1971, captura: 7000 },
              { año: 1972, captura: 10300 },
              { año: 1973, captura: 8600 },
              { año: 1974, captura: 9700 },
              { año: 1975, captura: 9900 },
              { año: 1976, captura: 7850 },
              { año: 1977, captura: 8000 },
              { año: 1978, captura: 8200 },
              { año: 1979, captura: 8600 },
              { año: 1980, captura: 7900 },
              { año: 1981, captura: 7200 },
              { año: 1982, captura: 5500 },
              { año: 1983, captura: 5600 },
              { año: 1984, captura: 7500 },
              { año: 1985, captura: 6500 },
              { año: 1986, captura: 5550 },
              { año: 1987, captura: 6700 },
              { año: 1988, captura: 7900 },
              { año: 1989, captura: 7900 },
              { año: 1990, captura: 7750 },
              { año: 1991, captura: 7900 },
              { año: 1992, captura: 7300 },
              { año: 1993, captura: 6800 },
              { año: 1994, captura: 7000 },
              { año: 1995, captura: 6800 },
              { año: 1996, captura: 4000 },
              { año: 1997, captura: 4400 },
              { año: 1998, captura: 4600 },
              { año: 1999, captura: 4200 },
              { año: 2000, captura: 5600 },
              { año: 2001, captura: 4400 },
              { año: 2002, captura: 4800 },
              { año: 2003, captura: 4800 },
              { año: 2004, captura: 4000 },
              { año: 2005, captura: 4100 },
              { año: 2006, captura: 3900 },
              { año: 2007, captura: 3900 },
              { año: 2008, captura: 4700 },
              { año: 2009, captura: 4800 },
              { año: 2010, captura: 4900 },
              { año: 2011, captura: 3650 },
              { año: 2012, captura: 5350 },
              { año: 2013, captura: 4000 },
              { año: 2014, captura: 3500 },
              { año: 2015, captura: 3000 },
              { año: 2016, captura: 2700 },
              { año: 2017, captura: 2900 },
              { año: 2018, captura: 2500 },
              { año: 2019, captura: 2600 },
              { año: 2020, captura: 1900 },
              { año: 2021, captura: 1810 },
              { año: 2022, captura: 1700 },
              { año: 2023, captura: 1620 },
            ],
          },
          {
            estado: "Flota menor",
            color: "#0891b2",
            datos: [
              { año: 1970, captura: 1400 },
              { año: 1971, captura: 3200 },
              { año: 1972, captura: 3000 },
              { año: 1973, captura: 3700 },
              { año: 1974, captura: 2600 },
              { año: 1975, captura: 2000 },
              { año: 1976, captura: 2000 },
              { año: 1977, captura: 2100 },
              { año: 1978, captura: 3000 },
              { año: 1979, captura: 2600 },
              { año: 1980, captura: 2300 },
              { año: 1981, captura: 2500 },
              { año: 1982, captura: 4100 },
              { año: 1983, captura: 2300 },
              { año: 1984, captura: 1150 },
              { año: 1985, captura: 2300 },
              { año: 1986, captura: 2600 },
              { año: 1987, captura: 3200 },
              { año: 1988, captura: 4500 },
              { año: 1989, captura: 3900 },
              { año: 1990, captura: 4400 },
              { año: 1991, captura: 4000 },
              { año: 1992, captura: 4250 },
              { año: 1993, captura: 3900 },
              { año: 1994, captura: 3450 },
              { año: 1995, captura: 4500 },
              { año: 1996, captura: 3430 },
              { año: 1997, captura: 3400 },
              { año: 1998, captura: 4020 },
              { año: 1999, captura: 3340 },
              { año: 2000, captura: 4150 },
              { año: 2001, captura: 3570 },
              { año: 2002, captura: 3770 },
              { año: 2003, captura: 1780 },
              { año: 2004, captura: 1780 },
              { año: 2005, captura: 1780 },
              { año: 2006, captura: 3470 },
              { año: 2007, captura: 2670 },
              { año: 2008, captura: 4000 },
              { año: 2009, captura: 4100 },
              { año: 2010, captura: 4320 },
              { año: 2011, captura: 2200 },
              { año: 2012, captura: 4050 },
              { año: 2013, captura: 3700 },
              { año: 2014, captura: 3200 },
              { año: 2015, captura: 3400 },
              { año: 2016, captura: 3200 },
              { año: 2017, captura: 2900 },
              { año: 2018, captura: 2700 },
              { año: 2019, captura: 3000 },
              { año: 2020, captura: 2700 },
              { año: 2021, captura: 3640 },
              { año: 2022, captura: 3300 },
              { año: 2023, captura: 2780 },
            ],
          },
          {
            estado: "Flota cubana",
            color: "#f59e0b",
            punteada: true,
            datos: [
              { año: 1970, captura: 9100 },
              { año: 1971, captura: 7800 },
              { año: 1972, captura: 6400 },
              { año: 1973, captura: 5600 },
              { año: 1974, captura: 4200 },
              { año: 1975, captura: 4700 },
              { año: 1976, captura: 4300 },
              { año: 1977, captura: 3900 },
              { año: 1978, captura: 3400 },
              { año: 1979, captura: 3100 },
              { año: 1980, captura: 2900 },
              { año: 1981, captura: 3000 },
              { año: 1982, captura: 2100 },
              { año: 1983, captura: 2000 },
              { año: 1984, captura: 2650 },
              { año: 1985, captura: 2200 },
              { año: 1986, captura: 1900 },
              { año: 1987, captura: 1200 },
              { año: 1988, captura: 900 },
              { año: 1989, captura: 700 },
              { año: 1990, captura: 550 },
              { año: 1991, captura: 400 },
              { año: 1992, captura: 350 },
              { año: 1993, captura: 300 },
              { año: 1994, captura: 250 },
              { año: 1995, captura: 200 },
              { año: 1996, captura: 150 },
              { año: 1997, captura: 100 },
              { año: 1998, captura: 80 },
              { año: 1999, captura: 60 },
              { año: 2000, captura: 50 },
              { año: 2001, captura: 30 },
              { año: 2002, captura: 30 },
              { año: 2003, captura: 20 },
              { año: 2004, captura: 20 },
              { año: 2005, captura: 20 },
              { año: 2006, captura: 30 },
              { año: 2007, captura: 30 },
              { año: 2008, captura: 200 },
              { año: 2009, captura: 200 },
              { año: 2010, captura: 180 },
              { año: 2011, captura: 150 },
              { año: 2012, captura: 100 },
            ],
          },
        ],
      },
      {
        titulo: "Captura total y por tipo de flota de negrillo (Mycteroperca bonaci) en el Banco de Campeche, 2000-2022",
        nota: "Serie leída de la figura 2 de la Carta Nacional Pesquera (Sistema de Información de Pesca y Acuacultura, CONAPESCA); los valores anuales son aproximados y las dos flotas suman la captura total. Los promedios por periodo sí corresponden a las cifras que cita el texto: I (2000-2011), 572 ± 197 toneladas anuales, con 90% aportado por la flota de mediana altura; II (2012-2018), 1,312 ± 175 toneladas, con 59% de la flota de mediana altura y 41% de la artesanal; y III (2019-2022), 2,390 ± 180 toneladas, en el que la flota artesanal ya aporta el 56% del total. A diferencia del mero rojo, la captura de negrillo ha crecido de forma sostenida: entre el segundo y el tercer periodo casi se duplicó.",
        series: [
          {
            estado: "Ambas flotas",
            color: "#0f172a",
            datos: [
              { año: 2000, captura: 400 },
              { año: 2001, captura: 275 },
              { año: 2002, captura: 290 },
              { año: 2003, captura: 300 },
              { año: 2004, captura: 430 },
              { año: 2005, captura: 800 },
              { año: 2006, captura: 730 },
              { año: 2007, captura: 660 },
              { año: 2008, captura: 620 },
              { año: 2009, captura: 820 },
              { año: 2010, captura: 880 },
              { año: 2011, captura: 660 },
              { año: 2012, captura: 1190 },
              { año: 2013, captura: 1460 },
              { año: 2014, captura: 1130 },
              { año: 2015, captura: 1425 },
              { año: 2016, captura: 1075 },
              { año: 2017, captura: 1405 },
              { año: 2018, captura: 1470 },
              { año: 2019, captura: 2165 },
              { año: 2020, captura: 2500 },
              { año: 2021, captura: 2310 },
              { año: 2022, captura: 2560 },
            ],
          },
          {
            estado: "Flota mayor",
            color: "#0d9488",
            punteada: true,
            datos: [
              { año: 2000, captura: 370 },
              { año: 2001, captura: 240 },
              { año: 2002, captura: 255 },
              { año: 2003, captura: 275 },
              { año: 2004, captura: 390 },
              { año: 2005, captura: 755 },
              { año: 2006, captura: 715 },
              { año: 2007, captura: 615 },
              { año: 2008, captura: 565 },
              { año: 2009, captura: 725 },
              { año: 2010, captura: 765 },
              { año: 2011, captura: 555 },
              { año: 2012, captura: 820 },
              { año: 2013, captura: 985 },
              { año: 2014, captura: 785 },
              { año: 2015, captura: 840 },
              { año: 2016, captura: 475 },
              { año: 2017, captura: 785 },
              { año: 2018, captura: 740 },
              { año: 2019, captura: 1090 },
              { año: 2020, captura: 1235 },
              { año: 2021, captura: 1055 },
              { año: 2022, captura: 825 },
            ],
          },
          {
            estado: "Flota menor",
            color: "#0891b2",
            datos: [
              { año: 2000, captura: 30 },
              { año: 2001, captura: 35 },
              { año: 2002, captura: 35 },
              { año: 2003, captura: 25 },
              { año: 2004, captura: 40 },
              { año: 2005, captura: 45 },
              { año: 2006, captura: 15 },
              { año: 2007, captura: 45 },
              { año: 2008, captura: 55 },
              { año: 2009, captura: 95 },
              { año: 2010, captura: 115 },
              { año: 2011, captura: 105 },
              { año: 2012, captura: 370 },
              { año: 2013, captura: 475 },
              { año: 2014, captura: 345 },
              { año: 2015, captura: 585 },
              { año: 2016, captura: 600 },
              { año: 2017, captura: 620 },
              { año: 2018, captura: 730 },
              { año: 2019, captura: 1075 },
              { año: 2020, captura: 1265 },
              { año: 2021, captura: 1255 },
              { año: 2022, captura: 1735 },
            ],
          },
        ],
        referencias: [{ valor: 1111, etiqueta: "Captura promedio", tipo: "punteada" }],
      },
    ],
    participacionPorEspecie: [
      {
        titulo: "Contribución a la producción de mero por estado en el Golfo de México y Mar Caribe (promedio 2018-2022)",
        nota: "Porcentajes de la figura 1a de la Carta Nacional Pesquera. Yucatán ha perdido peso en la captura regional: de 2013 a 2017 aportó 79.0% del mero registrado en el Golfo de México y Mar Caribe, y de 2018 a 2022 sólo 68.7%.",
        estados: [
          { estado: "Yucatán", porcentaje: 68.7 },
          { estado: "Veracruz", porcentaje: 16.6 },
          { estado: "Campeche", porcentaje: 7.9 },
          { estado: "Quintana Roo", porcentaje: 4.4 },
          { estado: "Tabasco", porcentaje: 1.5 },
          { estado: "Tamaulipas", porcentaje: 0.9 },
        ],
      },
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
    figuras: [
      {
        titulo: "Diagrama de Kobe — mero rojo (Epinephelus morio)",
        src: "/images/figuras/kobe-mero-rojo.png",
        alt: "Diagrama de fases de Kobe del mero rojo del Banco de Campeche: trayectoria anual de 1986 a 2020 según Bt/BRMS y F/FMSY, con los cuatro cuadrantes de estatus. La serie parte en 1986 del cuadrante verde (Bt/BRMS de 2.0 y F/FMSY de 0.6), cruza en 1988 al cuadrante naranja, entra al rojo hacia 1992 y desde entonces permanece ahí, con el máximo de mortalidad por pesca en 2012 (F/FMSY de 2.0) y 2020 en 1.1.",
        nota: "Estatus del stock de mero rojo (Epinephelus morio) de la Plataforma de la Península de Yucatán o Banco de Campeche (panel a de la figura 3 de la CNP). Desde principios de los años noventa la pesquería se mantiene en el cuadrante rojo: biomasa por debajo de la que produciría el rendimiento máximo sostenible y mortalidad por pesca por encima de la de referencia.",
      },
      {
        titulo: "Diagrama de Kobe — negrillo (Mycteroperca bonaci)",
        src: "/images/figuras/kobe-negrillo.png",
        alt: "Diagrama de fases de Kobe del negrillo del Banco de Campeche: trayectoria anual de 2000 a 2021 según Bt/BRMS y F/FMSY, con los cuatro cuadrantes de estatus y los intervalos de confianza de 50%, 80% y 95% alrededor del último año. La serie permanece en el cuadrante verde entre 2000 y 2012 con F/FMSY menor a 1, y a partir de 2013 la mortalidad por pesca se dispara hasta situar 2021 en Bt/BRMS de 0.9 y F/FMSY de 2.0, con 60.9% de probabilidad de estar en el cuadrante rojo y 39.1% en el naranja.",
        nota: "Estatus del stock de negrillo (Mycteroperca bonaci) de la Plataforma de la Península de Yucatán o Banco de Campeche (panel b de la figura 3 de la CNP). A diferencia del mero rojo, el negrillo se mantuvo en el cuadrante verde hasta 2012 y el deterioro es reciente: para 2021 la probabilidad de encontrarse en el cuadrante rojo (sobrepesca y biomasa por debajo del RMS) es de 60.9%, y de 39.1% en el naranja; en ningún caso en los cuadrantes verde o amarillo.",
      },
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

fichas["gm-jurel-y-cojinuda-del-golfo-de-mexico-y-mar-caribe"] = {
  generalidades: {
    descripcion: [
      "Los carángidos son especies dominantes por su abundancia —tanto en biomasa como en número de individuos— y por su frecuencia, con importancia económica en los sistemas arrecifales de la región del Caribe. Sin embargo, su talla es relativamente pequeña y en el Golfo de México se explotan en baja escala, su consumo es local y no se conocen estadísticas exactas de su pesquería. En los arrecifes coralinos del Caribe mexicano, por el papel ecológico que desempeñan los pámpanos en la transferencia de energía del sistema a través de sus relaciones tróficas y por sus perspectivas como recurso pesquero explotable, es conveniente el estudio de sus aspectos biológicos y de la dinámica de sus poblaciones.",
      "Los carángidos son peces que se encuentran en todos los hábitats tropicales y subtropicales del mundo; se distribuyen desde el Atlántico occidental —Nueva Jersey (EE. UU.), Bermudas y el norte del Golfo de México— hasta São Paulo, Brasil (Silvano et al., 2006). En el Golfo de México las principales especies que se capturan son el jurel y la cojinuda: se considera jurel a las dos especies más importantes de la pesquería en Veracruz, Caranx hippos y Caranx latus, y cojinuda a Caranx crysos.",
    ],
    embarcaciones:
      "Para la captura de jurel y cojinuda se utilizan embarcaciones menores de fibra de vidrio de 7.6 metros de eslora con un motor fuera de borda de 40 a 115 caballos de fuerza y de dos a cuatro tripulantes.",
    artesPesca:
      "Se utilizan redes de enmalle con tamaño de malla de 76.2 milímetros (3\") o superior y longitud de 300 a 800 metros. En Veracruz se usa la red de enmalle de 89 a 127 milímetros (3.5 a 5\") de tamaño de malla, chinchorro playero, curricán, líneas de mano y palangre. La pesca con red de enmalle se lleva a cabo con paños de 5\" de tamaño de malla y calibre de hilo de 0.47 a 0.55 milímetros; la caída de la red varía de 50 a 100 mallas según la profundidad y la zona de operación, y para su construcción se emplean entre 3 y 10 paños de 100 metros de longitud en paño estirado cada uno. La línea de mano o cordel es un equipo pasivo operado individualmente por un pescador, constituido por una línea de hilo nylon monofilamento a la que se unen uno o varios anzuelos con sus destorcedores y plomos: para cojinuda se utiliza hilo del número 80 y anzuelo recto del 13/0 al 15/0, y para jurel calibre de hilo del número 110 a 120 milímetros con anzuelo recto (noruego) del 6/0 al 4/0. Los palangres son equipos pasivos —en ocasiones la captura de jureles con ellos es incidental— construidos con una línea madre de multifilamento de poliamida, polietileno, polipropileno o monofilamento, dos orinques unidos a flotadores y varias líneas secundarias o reinales con un anzuelo en el extremo; tienen una longitud de 500 a 4,000 metros y de 350 a 800 reinales separados entre sí aproximadamente 1.8 metros (una braza).",
    especiesObjetivo: [
      { nombre: "Jurel amarillo, común", cientifico: "Caranx hippos" },
      { nombre: "Jurel blanco, jurel ojón", cientifico: "Caranx latus" },
      { nombre: "Cojinuda, cojinúa", cientifico: "Caranx crysos" },
    ],
    especiesAsociadas: [
      { nombre: "Jurel negro", cientifico: "Caranx lugubris" },
      { nombre: "Pámpano de hebra", cientifico: "Alectis ciliaris" },
      { nombre: "Sargo", cientifico: "Archosargus probatocephalus" },
      { nombre: "Sargo, posthá", cientifico: "Archosargus rhomboidalis" },
      { nombre: "Bandera", cientifico: "Bagre marinus" },
      { nombre: "Bagre o curuco", cientifico: "Ariopsis felis" },
      { nombre: "Lengua, brótula, rótula", cientifico: "Brotula barbata" },
      { nombre: "Pluma, mojarrón", cientifico: "Calamus bajonado" },
      { nombre: "Tiburón puntas negras", cientifico: "Carcharhinus brevipinna" },
      { nombre: "Tiburón prieto", cientifico: "Carcharhinus falciformis" },
      { nombre: "Tiburón puntas negras, jaquetón", cientifico: "Carcharhinus limbatus" },
      { nombre: "Tiburón toro, chato", cientifico: "Carcharhinus leucas" },
      { nombre: "Ronco amarillo, canario", cientifico: "Conodon nobilis" },
      { nombre: "Trucha blanca, corvina blanca", cientifico: "Cynoscion arenarius" },
      { nombre: "Trucha pinta, corvina pinta", cientifico: "Cynoscion nebulosus" },
      { nombre: "Raya látigo blanca, balá, manta", cientifico: "Hypanus americanus" },
      { nombre: "Macabí, machete", cientifico: "Elops saurus" },
      { nombre: "Bonito, boquilla", cientifico: "Euthynnus alletteratus" },
      { nombre: "Chac-chi", cientifico: "Haemulon plumierii" },
      { nombre: "Conejo blanco, botete grande", cientifico: "Lagocephalus laevigatus" },
      { nombre: "Cubera, pargo lunarejo", cientifico: "Lutjanus analis" },
      { nombre: "Huachinango de castilla", cientifico: "Lutjanus campechanus" },
      { nombre: "Cubera, pargo mulato", cientifico: "Lutjanus cyanopterus" },
      { nombre: "Parguete", cientifico: "Lutjanus griseus" },
      { nombre: "Pargo perro, caballera", cientifico: "Lutjanus jocu" },
      { nombre: "Villajaiba, rubia", cientifico: "Lutjanus synagris" },
      { nombre: "Abadejo, negrillo", cientifico: "Mycteroperca microlepis" },
      { nombre: "Mero aceitero, guacamaya", cientifico: "Mycteroperca venenosa" },
      { nombre: "Lisa", cientifico: "Mugil cephalus" },
      { nombre: "Rubia, rubio, canané", cientifico: "Ocyurus chrysurus" },
      { nombre: "Tambor negro", cientifico: "Pogonias cromis" },
      { nombre: "Ojón", cientifico: "Priacanthus arenatus" },
      { nombre: "Palometa, pámpano", cientifico: "Peprilus paru" },
      { nombre: "Cobia, bacalao", cientifico: "Rachycentron canadum" },
      { nombre: "Medregal, esmedregal", cientifico: "Seriola dumerili" },
      { nombre: "Raya tigre, raya del Golfo", cientifico: "Rostroraja texana" },
      { nombre: "Cazón tripa, caña hueca, cazón ley", cientifico: "Rhizoprionodon terraenovae" },
      { nombre: "Corvina ocelada, trucha", cientifico: "Sciaenops ocellatus" },
      { nombre: "Peto, carito", cientifico: "Scomberomorus cavalla" },
      { nombre: "Sierra", cientifico: "Scomberomorus maculatus" },
      { nombre: "Sierra", cientifico: "Scomberomorus regalis" },
      { nombre: "Pámpano amarillo", cientifico: "Trachinotus carolinus" },
      { nombre: "Palometa", cientifico: "Trachinotus falcatus" },
      { nombre: "Pámpano", cientifico: "Trachinotus goodei" },
      { nombre: "Cintilla, yegua, sable", cientifico: "Trichiurus lepturus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "En 2018 se registraron 10,419 toneladas de jurel y 6,741 toneladas de cojinuda en el Golfo de México.",
      "La producción pasó de alrededor de 900 toneladas por especie en 1990 a más de 10,000 toneladas de jurel a partir de 2015, con un salto marcado entre 2014 y 2015.",
      "En el Golfo de México estos recursos se explotan en baja escala y su consumo es local, por lo que no se conocen estadísticas exactas de la pesquería.",
    ],
    // Figura 1. Producción de jurel y cojinuda para el Golfo de México, 1990–2018. Fuente: subdelegación de pesca.
    capturaPorEstado: [
      {
        titulo: "Producción de jurel y cojinuda en el Golfo de México, 1990–2018 (subdelegación de pesca)",
        series: [
          {
            estado: "Jurel",
            color: "#0d9488",
            datos: [
              { año: 1990, captura: 900 },
              { año: 1992, captura: 1800 },
              { año: 1994, captura: 2400 },
              { año: 1996, captura: 3300 },
              { año: 1997, captura: 4300 },
              { año: 1998, captura: 4800 },
              { año: 1999, captura: 4200 },
              { año: 2000, captura: 3300 },
              { año: 2001, captura: 3200 },
              { año: 2002, captura: 3200 },
              { año: 2003, captura: 3400 },
              { año: 2004, captura: 3500 },
              { año: 2005, captura: 3400 },
              { año: 2006, captura: 3900 },
              { año: 2007, captura: 4000 },
              { año: 2008, captura: 3600 },
              { año: 2009, captura: 3200 },
              { año: 2010, captura: 4000 },
              { año: 2011, captura: 5400 },
              { año: 2012, captura: 5000 },
              { año: 2013, captura: 5100 },
              { año: 2014, captura: 5300 },
              { año: 2015, captura: 11554 },
              { año: 2016, captura: 10200 },
              { año: 2017, captura: 10300 },
              { año: 2018, captura: 10419 },
            ],
          },
          {
            estado: "Cojinuda",
            color: "#f59e0b",
            datos: [
              { año: 1990, captura: 900 },
              { año: 1992, captura: 2000 },
              { año: 1994, captura: 2300 },
              { año: 1996, captura: 2400 },
              { año: 1997, captura: 3200 },
              { año: 1998, captura: 3700 },
              { año: 1999, captura: 3000 },
              { año: 2000, captura: 2500 },
              { año: 2001, captura: 2500 },
              { año: 2002, captura: 2600 },
              { año: 2003, captura: 4000 },
              { año: 2004, captura: 4200 },
              { año: 2005, captura: 3600 },
              { año: 2006, captura: 3700 },
              { año: 2007, captura: 4100 },
              { año: 2008, captura: 3800 },
              { año: 2009, captura: 3900 },
              { año: 2010, captura: 5800 },
              { año: 2011, captura: 4900 },
              { año: 2012, captura: 4600 },
              { año: 2013, captura: 5100 },
              { año: 2014, captura: 5300 },
              { año: 2015, captura: 9000 },
              { año: 2016, captura: 10543 },
              { año: 2017, captura: 9000 },
              { año: 2018, captura: 6741 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Entre los estudios sobre la relación de los procesos oceanográficos y los peces, Gutiérrez et al. (2008) mostraron el efecto de la influencia del fenómeno El Niño Oscilación del Sur (ENOS) en la temperatura superficial del mar (TSM) y las larvas de peces sobre aguas oceánicas adyacentes de Cuba, y demostraron que las anomalías positivas de la TSM provocaron un aumento en la abundancia de larvas de las familias Scombridae y Carangidae. En un estudio más reciente, Mohan et al. (2017) identificaron la relación entre postlarvas y juveniles de carángidos y las condiciones oceanográficas físicas en el norte del Golfo de México: el jurel presentó mayores abundancias de postlarvas y juveniles en salinidades bajas y temperaturas cálidas, mientras que la salinidad fue el único factor significativamente relacionado con la abundancia de la cojinuda. Ambas especies presentaron una superposición espacial similar pero distribuciones temporales diferentes, lo que sugiere una separación del hábitat entre ellas, especialmente en el desove, para reducir la competencia por los recursos.",
    "En cuanto a la relación con los procesos oceanográficos y ambientales, Caranx crysos se encuentra en el norte del Golfo de México en salinidades desde 26 a 28 gramos por litro, aunque presenta mayor abundancia entre 30 y 40 gramos por litro; los estadios de vida postlarvales son más abundantes en salinidades más bajas y temperaturas altas.",
    "Para Caranx hippos, Mohan et al. (2017) describen que en el norte del Golfo de México la especie es abundante a temperaturas superficiales del mar mayores a 29.5 grados centígrados con salinidades entre 26 y 32 gramos por litro; la etapa postlarvaria presenta mayor abundancia a temperaturas de 25 a 28 grados centígrados con salinidades mayores a 35 gramos por litro. En el Atlántico central oriental es común encontrarlos en aguas salobres, y pueden ingresar a los ríos.",
    "Un estudio de Chaires (2019) sobre la captura de los principales recursos pesqueros de carángidos (Caranx hippos y C. crysos) en la parte occidental del Golfo de México y su relación con algunas variables oceanográficas demostró que las capturas de jurel y cojinuda están asociadas a una notable distribución espacio-temporal con una marcada periodicidad; los resultados sugieren que variables como la temperatura superficial del mar (TSM) y la clorofila (Cl-a) pueden tener un papel influyente en la determinación de la captura de carángidos.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial para escama marina.",
      sustento: "Opinión técnica del INAPESCA.",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: false,
      disposicion: "En proceso de investigación.",
      sustento: "",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Red agallera; red de enmalle para escama. También se usan línea de mano, curricán y palangre.",
      sustento: "Permisos de pesca comercial para la captura de escama marina.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "Investigación en proceso.", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores (lancha o panga) con motor fuera de borda de 25 a 75 caballos de fuerza.",
      sustento: "Permisos de pesca comercial para la captura de escama marina.",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion:
        "Embarcaciones menores: Campeche 2,102; Quintana Roo 513; Tabasco 1,133; Tamaulipas 1,374; Veracruz 1,592 y Yucatán 2,734. Embarcaciones mayores: Campeche 18; Quintana Roo 7; Tabasco 27; Tamaulipas 56; Veracruz 8 y Yucatán 563.",
      sustento: "Base de datos de la CONAPESCA.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "Aguas marinas de jurisdicción federal del Golfo de México y Mar Caribe.",
      sustento: "Permisos de pesca comercial para la captura de escama marina.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Jurel (Caranx hippos, Caranx latus)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Cojinuda (Caranx crysos)",
        zona: "Golfo de México y Mar Caribe",
      },
    ],
    estrategia:
      "Tasa de aprovechamiento variable. Se requiere realizar estudios de reproducción, reclutamiento y biomasa de las poblaciones o stocks de carángidos de importancia comercial en el Golfo de México, para determinar la posibilidad y factibilidad de establecer periodos de veda, cuotas o zonas de refugio pesquero, tallas mínimas de captura y el nivel de biomasa disponible.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Talla mínima de captura",
      "Veda reproductiva",
      "Regulación del arte y método de pesca",
      "Zona de refugio pesquero",
    ],
  },
  recomendaciones: [
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información" },
    {
      recomendacion:
        "Elaborar y publicar el Plan de Manejo Pesquero para ordenar el aprovechamiento de estos recursos.",
      avance: "Sin información",
    },
  ],
}

fichas["gm-langosta-del-golfo-de-mexico-y-mar-caribe"] = {
  generalidades: {
    descripcion: [
      "La pesquería de langosta de la península de Yucatán es una de las más importantes de la región. Se lleva a cabo en las costas de Yucatán y Quintana Roo, y la soporta en un 99% la langosta del Caribe (Panulirus argus). Su inicio data de hace aproximadamente 50 años y, aunque la producción de langosta es menor que la de otras especies que se capturan en la región (mero, pulpo, caracol y pepino de mar), su importancia radica en que la especie tiene una alta demanda en el mercado internacional y un alto valor comercial. La langosta es principalmente un producto de exportación y en el mercado nacional se comercializa en puntos de importancia turística; su pesquería representa una significativa fuente de empleo, proporciona altos retornos económicos y es generadora de divisas.",
      "La explotación de P. argus se lleva a cabo en una extensa área de la plataforma de Yucatán y el Caribe (Quintana Roo), en la cual existen diferencias en términos de distribución del recurso, distribución del esfuerzo, forma de captura, nivel organizativo de las comunidades pesqueras, políticas de manejo local y federal, y demanda del recurso en el mercado local, nacional e internacional.",
      "Los campos pesqueros están delimitados geográficamente para ser aprovechados por diferentes comunidades pesqueras. Con base en sus características geomorfológicas y de disponibilidad de hábitat, su tamaño, el número y tipo de embarcaciones, las técnicas de captura y el nivel organizativo de las comunidades, y con el fin de facilitar la investigación, evaluar el recurso y proponer medidas de manejo, se han definido nueve zonas: Poniente, Centro, Oriente, Alacranes y Zona profunda en la plataforma de Yucatán, y Norte, Noreste, Centro y Sur en la costa de Quintana Roo.",
      "La zona Poniente va de Celestún a Telchac; la zona Centro, de Chabihau al faro de Yalkubul; la zona Oriente, del faro de Yalkubul al límite entre Yucatán y Quintana Roo; la zona Profunda considera la porción centro-occidental de la plataforma de Yucatán y el área profunda alrededor del Parque Nacional Arrecife Alacranes (PNAA), y Alacranes se refiere a la zona de islas y lagunas del PNAA. En el Caribe, la zona Norte comprende la laguna Yalahau, Isla Holbox, Chiquilá y Cabo Catoche, dentro del Área de Protección de Flora y Fauna Yum Balam y de la Reserva de la Biosfera Tiburón Ballena; la zona Noreste la integran Isla Contoy (Parque Nacional Isla Contoy), Isla Mujeres, Cancún y Banco Arrow Smith (Parque Nacional Isla Mujeres) y Puerto Morelos (Parque Nacional Arrecife de Puerto Morelos); la zona Centro incluye en la costa las bahías de la Ascensión y del Espíritu Santo y Tulum, dentro de la Reserva de la Biosfera de Sian Ka'an, además de Isla Cozumel (Parque Nacional Arrecifes de Cozumel); y la zona Sur considera Banco Chinchorro —Reserva de la Biosfera de Banco Chinchorro, parte a su vez del Sistema Arrecifal Mesoamericano— y Xcalak (Parque Nacional Arrecifes de Xcalak).",
    ],
    embarcaciones:
      "Operan embarcaciones menores de madera o fibra de vidrio, de hasta 10.5 metros de eslora, con motor estacionario o fuera de borda de hasta 115 caballos de fuerza y 3 pescadores, así como embarcaciones de mediana altura de entre 12 y 18 metros de eslora con motor estacionario, que pueden operar como nodrizas transportando de 10 a 12 pescadores y hasta 6 «alijos», o sin alijos.",
    artesPesca:
      "Se utilizan diferentes técnicas y artes de pesca según las características de las zonas y el comportamiento del recurso, pero la técnica generalizada y más utilizada es el buceo con hookah o semiautónomo. En las zonas Poniente, Centro de Yucatán, Oriente y Alacranes se emplea buceo libre o con hookah, según la profundidad, y en ambos casos se usa un gancho como arte de pesca. En la zona Profunda de la plataforma de Yucatán se utiliza la trampa plegable y, en algunos casos, buceo con hookah y gancho. En la zona Norte se usa buceo libre y con hookah y, en menor medida, refugios artificiales en Yalahau; en la zona Noreste, buceo libre, con hookah y autónomo (SCUBA) y trampas rígidas. En ambas zonas —Norte y Noreste— también se utilizan redes de enmalle durante la corrida invernal (noviembre-febrero). En la zona Centro de Quintana Roo, donde se encuentran las bahías de la Ascensión y del Espíritu Santo, se practica el buceo libre en refugios naturales y artificiales usando jamo y lazada, y en Isla Cozumel, buceo SCUBA. En la zona Sur (Banco Chinchorro) se utiliza buceo libre con gancho o lazada.",
    especiesObjetivo: [
      { nombre: "Langosta del Caribe", cientifico: "Panulirus argus" },
      { nombre: "Langosta pinta", cientifico: "Panulirus guttatus" },
    ],
    especiesAsociadas: [
      { nombre: "Mero", cientifico: "Epinephelus morio" },
      { nombre: "Negrillo", cientifico: "Mycteroperca bonaci" },
      { nombre: "Abadejo", cientifico: "Mycteroperca microlepis" },
      { nombre: "Boquinete", cientifico: "Lachnolaimus maximus" },
      { nombre: "Pargos", cientifico: "Lutjanus spp." },
      { nombre: "Mojarras", cientifico: "Gerres cinereus y Calamus spp." },
      { nombre: "Esmedregal", cientifico: "Rachycentron canadum" },
      { nombre: "Sargo", cientifico: "Archosargus probatocephalus" },
      { nombre: "Pulpo", cientifico: "Octopus maya" },
      { nombre: "Cojinuda", cientifico: "Caranx ruber" },
      { nombre: "Jurel", cientifico: "Caranx hippos" },
      { nombre: "Lenguado", cientifico: "Paralichthys albigutta" },
      { nombre: "Róbalo", cientifico: "Centropomus undecimalis" },
    ],
  },
  indicadores: {
    empleos: "1,500",
    embarcaciones: "546",
    datosDestacados: [
      "Participan alrededor de 1,500 pescadores en cooperativas: se estima que el 58% pertenece a cooperativas de Yucatán y el 42% a cooperativas de Quintana Roo. Además, hay una población de aproximadamente 4,452 pescadores aspirantes que participa en la pesquería.",
      "En Yucatán están registradas 511 embarcaciones menores (lanchas) y 35 de mediana altura (barcos).",
      "La langosta del Caribe (Panulirus argus) soporta el 99% de la pesquería de la península de Yucatán.",
    ],
    // Figura 1. Producción de langosta P. argus en la Península de Yucatán, 1958-2020.
    capturaPorEstado: [
      {
        titulo: "Producción de langosta (Panulirus argus) en la península de Yucatán, 1959–2019",
        series: [
          {
            estado: "Total",
            color: "#64748b",
            datos: [
              { año: 1959, captura: 30 },
              { año: 1963, captura: 200 },
              { año: 1967, captura: 200 },
              { año: 1971, captura: 350 },
              { año: 1975, captura: 650 },
              { año: 1976, captura: 900 },
              { año: 1978, captura: 850 },
              { año: 1980, captura: 1200 },
              { año: 1982, captura: 1250 },
              { año: 1984, captura: 1300 },
              { año: 1986, captura: 1350 },
              { año: 1987, captura: 1696 },
              { año: 1988, captura: 1335 },
              { año: 1990, captura: 1000 },
              { año: 1992, captura: 750 },
              { año: 1994, captura: 1250 },
              { año: 1995, captura: 1450 },
              { año: 1996, captura: 1000 },
              { año: 1998, captura: 780 },
              { año: 2000, captura: 1580 },
              { año: 2001, captura: 950 },
              { año: 2002, captura: 1400 },
              { año: 2004, captura: 950 },
              { año: 2006, captura: 750 },
              { año: 2008, captura: 780 },
              { año: 2009, captura: 800 },
              { año: 2010, captura: 1420 },
              { año: 2012, captura: 750 },
              { año: 2013, captura: 1400 },
              { año: 2014, captura: 900 },
              { año: 2015, captura: 1250 },
              { año: 2016, captura: 900 },
              { año: 2017, captura: 1450 },
              { año: 2018, captura: 1250 },
              { año: 2019, captura: 1300 },
            ],
          },
          {
            estado: "Quintana Roo",
            color: "#0d9488",
            datos: [
              { año: 1976, captura: 550 },
              { año: 1978, captura: 650 },
              { año: 1980, captura: 900 },
              { año: 1982, captura: 950 },
              { año: 1984, captura: 1000 },
              { año: 1986, captura: 1050 },
              { año: 1987, captura: 1150 },
              { año: 1988, captura: 950 },
              { año: 1990, captura: 750 },
              { año: 1992, captura: 550 },
              { año: 1994, captura: 650 },
              { año: 1995, captura: 600 },
              { año: 1996, captura: 550 },
              { año: 1998, captura: 450 },
              { año: 2000, captura: 800 },
              { año: 2001, captura: 600 },
              { año: 2002, captura: 550 },
              { año: 2004, captura: 500 },
              { año: 2006, captura: 450 },
              { año: 2008, captura: 500 },
              { año: 2009, captura: 500 },
              { año: 2010, captura: 550 },
              { año: 2012, captura: 400 },
              { año: 2013, captura: 500 },
              { año: 2014, captura: 500 },
              { año: 2015, captura: 450 },
              { año: 2016, captura: 450 },
              { año: 2017, captura: 500 },
              { año: 2018, captura: 550 },
              { año: 2019, captura: 550 },
            ],
          },
          {
            estado: "Yucatán",
            color: "#f59e0b",
            datos: [
              { año: 1976, captura: 200 },
              { año: 1978, captura: 300 },
              { año: 1980, captura: 250 },
              { año: 1982, captura: 100 },
              { año: 1984, captura: 350 },
              { año: 1986, captura: 450 },
              { año: 1987, captura: 450 },
              { año: 1988, captura: 400 },
              { año: 1990, captura: 350 },
              { año: 1992, captura: 450 },
              { año: 1994, captura: 550 },
              { año: 1995, captura: 500 },
              { año: 1996, captura: 400 },
              { año: 1998, captura: 350 },
              { año: 2000, captura: 550 },
              { año: 2001, captura: 950 },
              { año: 2002, captura: 650 },
              { año: 2004, captura: 450 },
              { año: 2006, captura: 400 },
              { año: 2008, captura: 500 },
              { año: 2009, captura: 500 },
              { año: 2010, captura: 650 },
              { año: 2012, captura: 250 },
              { año: 2013, captura: 550 },
              { año: 2014, captura: 550 },
              { año: 2015, captura: 600 },
              { año: 2016, captura: 650 },
              { año: 2017, captura: 750 },
              { año: 2018, captura: 850 },
              { año: 2019, captura: 700 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "La distribución y la dinámica de la población de langosta dependen de procesos inherentes a su historia de vida, mediados por factores físicos, químicos y biológicos, así como de la disponibilidad de hábitat. Tanto los fenómenos naturales como los cambios ambientales ocasionados en la zona costera por actividades antropogénicas afectan de diferentes formas la dinámica poblacional de la langosta, la producción y el desarrollo de la pesquería.",
    "Las costas de la península de Yucatán son afectadas por fenómenos naturales como huracanes, marea roja, nortes de alta intensidad, El Niño Oscilación del Sur (ENOS) y, en los últimos años, la llegada masiva atípica de sargazo a la costa de Quintana Roo. Todos ellos ocasionan cambios en el ecosistema, en el hábitat y en la disposición del recurso en las zonas de pesca, dando lugar muchas veces a oscilaciones extraordinarias en la producción.",
    "Los conocimientos sobre las corrientes marinas del Gran Caribe sugieren una gran influencia sobre la dispersión de larvas de P. argus en la región, sobre el reclutamiento y sobre el hábitat. Los huracanes, que generan grandes movimientos de masas de agua, juegan un papel importante; los giros de mesoescala con influencia de ciclos estacionarios crean condiciones para la retención larval, el proceso de fertilización y el incremento de la productividad en los sistemas propiciados por las surgencias en la región. Todos ellos influyen en el repoblamiento de las áreas de pesca e impactan la magnitud del reclutamiento.",
    "Por otra parte, los huracanes pueden alterar de manera considerable la configuración del hábitat costero. Durante su paso ocasionan cambios en la dinámica de los sedimentos, la biota arrecifal, los pastos marinos y los manglares. Su efecto rompe equilibrios sobre las comunidades marinas y, después de presentarse, estas comunidades tienden a nuevos equilibrios, algunas veces bajo condiciones considerablemente distintas.",
    "Uno de los hábitats preferidos por la langosta son los arrecifes coralinos, usados para el asentamiento, el crecimiento y la reproducción. El blanqueamiento de coral representa la muerte y la pérdida de hábitat para la langosta, y afecta la dinámica de la población en toda su área de distribución, incluyendo el Caribe y la plataforma de Yucatán.",
    "La marea roja en la región de la plataforma de Yucatán es un fenómeno que ocurre con frecuencia, ocasionando el movimiento masivo de los organismos y en ocasiones su muerte, el empobrecimiento de las zonas de pesca, el cambio en la dinámica del recurso y pérdidas económicas a los pescadores.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "Resolución por la que se modifica la Norma Oficial Mexicana NOM-006-PESC-1993, para regular el aprovechamiento de todas las especies de langosta en las aguas de jurisdicción federal del Golfo de México y Mar Caribe, así como del Océano Pacífico incluyendo el Golfo de California.",
      sustento: "DOF: 07/09/2016.",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Plan de Manejo Pesquero para la langosta espinosa (Panulirus argus) de la Península de Yucatán.",
      sustento: "DOF: 13/03/2014.",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos y concesiones de pesca comercial de langosta.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion:
        "Langosta pinta (Panulirus guttatus): 135 milímetros de longitud abdominal. Langosta del Caribe (Panulirus argus): 135 milímetros de longitud abdominal, equivalentes a 74.6 milímetros de longitud de cefalotórax y 223 milímetros de longitud total.",
      sustento: "Numeral 4.2.1 de la NOM-006-SAG/PESC-2016.",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Trampas cuyas especificaciones técnicas se presentan en el Anexo Normativo «A» de la NOM-006. La captura de langosta podrá realizarse mediante buceo libre o en «apnea», buceo autónomo con «scuba», buceo con «hookah» o compresor y con el auxilio de refugios artificiales denominados «casitas», pudiéndose utilizar ganchos como instrumentos complementarios; queda prohibido el uso de arpones o sus modalidades.",
      sustento: "Numeral 4.3.1 y Anexo Normativo «A» de la NOM-006-SAG/PESC-2016.",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion: "Del 1 de marzo al 30 de junio de cada año.",
      sustento:
        "DOF: 16/03/1994. Aviso por el que se da a conocer el establecimiento de épocas y zonas de veda para la pesca de diferentes especies de la fauna acuática en aguas de jurisdicción federal de los Estados Unidos Mexicanos.",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores de madera o fibra de vidrio, de hasta 10.5 metros de eslora, con motor estacionario o fuera de borda de hasta 115 caballos de fuerza y 3 pescadores. Embarcaciones de mediana altura de entre 12 y 18 metros de eslora con motor estacionario, que puedan operar como nodrizas transportando de 10 a 12 pescadores y hasta 6 «alijos», o sin alijos.",
      sustento: "Numeral 4.3.1.1 de la NOM-006-SAG/PESC-2016.",
    },
    { instrumento: "9. Esfuerzo actual autorizado", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "10. Zona de pesca", aplica: false, disposicion: "", sustento: "" },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Langosta del Caribe (Panulirus argus)",
        zona: "Península de Yucatán",
      },
      {
        categoria: "Con signos de sobreexplotación",
        color: "red",
        especie: "Langosta del Caribe (Panulirus argus)",
        zona: "Zonas focales Poniente, Centro de Yucatán y Norte",
      },
    ],
    estrategia:
      "Estacionalidad de pesca, control de la composición de la captura, entrada límite a la pesquería y asignación de derechos de propiedad territorial mediante concesiones de pesca por 20 años y permisos de pesca anuales, con el fin de prevenir la pesca ilegal, mantener la eficiencia económica, propiciar mayor rentabilidad, reducir la sobrecapitalización, generar valor agregado al recurso, ampliar el mercado y aumentar la cooperación.",
    tacticas: [
      "Veda del 1 de marzo al 30 de junio, para proteger el periodo de desove, permitir el reclutamiento y el crecimiento de juveniles y limitar la captura",
      "Talla mínima de 135 mm de longitud abdominal, 74.6 mm de longitud de cefalotórax y 223 mm de longitud total, para lograr un mayor rendimiento por recluta, evitar la sobrepesca del crecimiento e incrementar la captura a mediano plazo",
      "Prohibición de capturar hembras ovígeras, dirigida a permitir la reproducción y el reclutamiento de nuevos organismos a la población",
      "Concesiones y permisos de pesca otorgados a sociedades cooperativas de producción pesquera, que fomentan el co-manejo, el sentido de propiedad y el cumplimiento de la normatividad, y limitan el esfuerzo de pesca",
      "Delimitación de las zonas de pesca y del número de pescadores, embarcaciones y equipos de pesca",
    ],
  },
  recomendaciones: [
    { recomendacion: "Cumplimiento estricto de las medidas de regulación vigentes.", avance: "Sin información" },
    { recomendacion: "No incrementar el esfuerzo en ninguna de las zonas de pesca.", avance: "Sin información" },
    { recomendacion: "Concesionar el recurso en todas las zonas de pesca a los usuarios.", avance: "Sin información" },
  ],
}

fichas["gm-lisa-y-liseta-o-lebrancha-del-golfo-de-mexico"] = {
  generalidades: {
    descripcion: [
      "En el Golfo de México la pesquería de lisa (Mugil cephalus) está posicionada en el decimoquinto lugar de la producción pesquera de México y en el vigésimo respecto a su valor económico. La pesquería de lebrancha (Mugil curema) se encuentra en el lugar 37 de la producción pesquera y en el 46 según su valor. Ambas especies son de gran interés para los habitantes ribereños de las lagunas, ríos y esteros de las costas de Tamaulipas y Veracruz, principalmente por la gran demanda de la «hueva de lisa» y la «hueva de lebrancha», que alcanzan un valor mayor en el mercado.",
      "La Laguna Madre (Texas y Tamaulipas) es el cuerpo de agua hipersalino más grande del mundo. Se extiende a lo largo de 445 kilómetros de línea costera, desde la bahía de Corpus Christi, Texas, en el norte, hasta el río Soto la Marina, Tamaulipas, en el sur. El delta del río Bravo, que cubre alrededor de 75 kilómetros de línea de costa, separa la Laguna Madre en dos: al norte la Laguna Madre de Texas y al sur la Laguna Madre de Tamaulipas.",
      "Tamaulipas es el mayor productor de lisa en el Golfo de México: la Laguna Madre contribuyó hasta 2014 con alrededor del 90% de su captura y en los últimos años con un promedio del 76%; le siguen en importancia las lagunas Morales y San Andrés, además de ríos adyacentes como el Soto la Marina, Carrizales, Tigre y Barberena. La Laguna Madre se ubica entre los 23° y 25° de latitud norte y los 97° y 98° de longitud oeste, colinda con los municipios de Matamoros, San Fernando y Soto la Marina, y es la laguna costera más grande y extensa de la República mexicana, con 5,854 kilómetros cuadrados (alrededor de 200,000 hectáreas) y un frente marino hacia el Golfo de 200 kilómetros.",
      "Veracruz es el mayor productor de lebrancha en el Golfo de México, donde la laguna de Tamiahua contribuye con alrededor del 70%, seguida de las lagunas de Alvarado y Cetmaco. La laguna de Tamiahua, con una superficie de 88,000 hectáreas, se localiza en la zona norte del estado, entre los 22°06' y 21°18' de latitud norte y los 97°23' y 97°46' de longitud oeste; la limitan al norte el río Pánuco a través del canal del Chijol y la laguna de Pueblo Viejo, al sur el río Tuxpan, al este la barrera arenosa e insular conocida como Cabo Rojo y al oeste una amplia zona de pastizales ganaderos y tierras agrícolas. Presenta dos bocas: Boca de Corazones en su parte sur y boca de Tampachiche en la porción norte. Tiene forma alargada, con una longitud de 77 kilómetros, su eje mayor orientado noreste-sureste y un ancho máximo de 22 kilómetros.",
    ],
    embarcaciones:
      "Se utilizan embarcaciones menores tipo panga, de fibra de vidrio, de 22 pies de eslora (6.6 metros), 5 de manga y 2 de puntal, con motores fuera de borda de entre 45 y 55 caballos de fuerza.",
    artesPesca:
      "Desde la embarcación se operan redes de enmalle o agalleras de monofilamento con una longitud total que varía de 450 a 1,650 metros y tamaño de malla de 4 pulgadas para lisa y de 3 pulgadas para lebrancha, conforme a la NOM-016-SAG/PESC-2014. En algunas ocasiones estas redes están combinadas por diversas secciones de diferente tamaño de malla y calibre de hilo.",
    especiesObjetivo: [
      { nombre: "Lisa", cientifico: "Mugil cephalus" },
      { nombre: "Lebrancha", cientifico: "Mugil curema" },
    ],
    especiesAsociadas: [
      { nombre: "Trucha pinta", cientifico: "Cynoscion nebulosus" },
      { nombre: "Trucha blanca", cientifico: "Cynoscion arenarius" },
      { nombre: "Curvina ocelada o roja", cientifico: "Sciaenops ocellatus" },
      { nombre: "Croca", cientifico: "Leiostomus xanthurus" },
      { nombre: "Gurrubata", cientifico: "Micropogonias undulatus" },
      { nombre: "Tambor, tontón", cientifico: "Pogonias cromis" },
      { nombre: "Sargo, mojarra negra", cientifico: "Archosargus probatocephalus" },
      { nombre: "Mojarra blanca", cientifico: "Diapterus auratus" },
      { nombre: "Mojarra rayada", cientifico: "Eugerres plumieri" },
      { nombre: "Mojarra plateada", cientifico: "Eucinostomus argenteus" },
      { nombre: "Ronco amarillo, canario", cientifico: "Conodon nobilis" },
      { nombre: "Róbalo blanco", cientifico: "Centropomus undecimalis" },
      { nombre: "Chucumite", cientifico: "Centropomus parallelus" },
      { nombre: "Guabina de río", cientifico: "Eleotris pisonis" },
      { nombre: "Ratón del Golfo, verrugato", cientifico: "Menticirrhus americanus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "El 68% de la captura de lisa en el Golfo de México proviene de Tamaulipas.",
      "Veracruz es el estado de mayor producción de lebrancha en el Golfo de México, con el 94%; la laguna de Tamiahua ha contribuido en promedio con el 63% de esa captura.",
      "La lisa alcanza su primer periodo de reproducción a los tres años de edad aproximadamente, con una talla promedio de 26 centímetros en machos y 30 centímetros en hembras; es la edad más explotada en la Laguna Madre.",
      "En la Laguna Madre, los organismos capturados con redes de 101 milímetros (4 pulgadas) de tamaño de malla se obtienen a tallas mayores de 38 centímetros y generan el máximo rendimiento económico durante el periodo reproductivo, por el precio que alcanza la gónada en el mercado.",
      "La lebrancha alcanza su primer periodo de reproducción a los tres años aproximadamente, con una talla promedio de 23 centímetros en hembras y 25 en machos; en promedio, el 35% de su captura corresponde a organismos de menor talla que la recomendada en la norma.",
    ],
    // Figura 1. Tendencias de captura de lisa y lebrancha por estado. Fuente: Anuarios Estadísticos
    // de Acuacultura y Pesca, CONAPESCA, SADER.
    capturaPorEstado: [
      {
        titulo: "Captura de lisa en Tamaulipas y Veracruz, 1980–2019 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Tamaulipas",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 2400 },
              { año: 1982, captura: 3000 },
              { año: 1984, captura: 4400 },
              { año: 1986, captura: 5200 },
              { año: 1988, captura: 6300 },
              { año: 1990, captura: 5000 },
              { año: 1992, captura: 3300 },
              { año: 1994, captura: 4200 },
              { año: 1996, captura: 6100 },
              { año: 1998, captura: 5300 },
              { año: 2000, captura: 3000 },
              { año: 2002, captura: 3600 },
              { año: 2004, captura: 3700 },
              { año: 2006, captura: 3500 },
              { año: 2008, captura: 3200 },
              { año: 2010, captura: 3500 },
              { año: 2012, captura: 3300 },
              { año: 2014, captura: 3000 },
              { año: 2015, captura: 3500 },
              { año: 2016, captura: 6291 },
              { año: 2017, captura: 6291 },
              { año: 2018, captura: 4844 },
              { año: 2019, captura: 4844 },
            ],
          },
          {
            estado: "Veracruz",
            color: "#f59e0b",
            datos: [
              { año: 1980, captura: 700 },
              { año: 1982, captura: 750 },
              { año: 1984, captura: 800 },
              { año: 1986, captura: 900 },
              { año: 1988, captura: 1000 },
              { año: 1990, captura: 1200 },
              { año: 1992, captura: 1500 },
              { año: 1994, captura: 1800 },
              { año: 1996, captura: 2100 },
              { año: 1998, captura: 600 },
              { año: 2000, captura: 600 },
              { año: 2002, captura: 500 },
              { año: 2004, captura: 600 },
              { año: 2006, captura: 500 },
              { año: 2008, captura: 500 },
              { año: 2010, captura: 500 },
              { año: 2012, captura: 500 },
              { año: 2014, captura: 500 },
              { año: 2015, captura: 900 },
              { año: 2016, captura: 1782 },
              { año: 2017, captura: 1782 },
              { año: 2018, captura: 1782 },
              { año: 2019, captura: 552 },
            ],
          },
        ],
      },
      {
        titulo: "Captura de lisa en Tabasco, Campeche, Yucatán y Quintana Roo, 1980–2019 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Tabasco",
            color: "#0891b2",
            datos: [
              { año: 1980, captura: 100 },
              { año: 1985, captura: 800 },
              { año: 1988, captura: 1480 },
              { año: 1990, captura: 400 },
              { año: 1995, captura: 500 },
              { año: 2000, captura: 950 },
              { año: 2005, captura: 500 },
              { año: 2010, captura: 500 },
              { año: 2014, captura: 523 },
              { año: 2015, captura: 889 },
              { año: 2016, captura: 889 },
              { año: 2017, captura: 889 },
              { año: 2018, captura: 498 },
              { año: 2019, captura: 498 },
            ],
          },
          {
            estado: "Campeche",
            color: "#f59e0b",
            datos: [
              { año: 1980, captura: 50 },
              { año: 1985, captura: 300 },
              { año: 1988, captura: 200 },
              { año: 1990, captura: 200 },
              { año: 1995, captura: 250 },
              { año: 2000, captura: 220 },
              { año: 2005, captura: 200 },
              { año: 2010, captura: 250 },
              { año: 2014, captura: 250 },
              { año: 2015, captura: 250 },
              { año: 2016, captura: 319 },
              { año: 2017, captura: 319 },
              { año: 2018, captura: 319 },
              { año: 2019, captura: 319 },
            ],
          },
          {
            estado: "Yucatán",
            color: "#8b5cf6",
            datos: [
              { año: 1980, captura: 40 },
              { año: 1985, captura: 45 },
              { año: 1988, captura: 45 },
              { año: 1990, captura: 48 },
              { año: 1995, captura: 50 },
              { año: 2000, captura: 51 },
              { año: 2005, captura: 51 },
              { año: 2010, captura: 51 },
              { año: 2014, captura: 51 },
              { año: 2015, captura: 51 },
              { año: 2016, captura: 51 },
              { año: 2017, captura: 51 },
              { año: 2018, captura: 51 },
              { año: 2019, captura: 51 },
            ],
          },
          {
            estado: "Quintana Roo",
            color: "#e11d48",
            datos: [
              { año: 1980, captura: 25 },
              { año: 1985, captura: 28 },
              { año: 1988, captura: 28 },
              { año: 1990, captura: 28 },
              { año: 1995, captura: 30 },
              { año: 2000, captura: 30 },
              { año: 2005, captura: 30 },
              { año: 2010, captura: 30 },
              { año: 2014, captura: 30 },
              { año: 2015, captura: 30 },
              { año: 2016, captura: 30 },
              { año: 2017, captura: 30 },
              { año: 2018, captura: 30 },
              { año: 2019, captura: 30 },
            ],
          },
        ],
      },
      {
        titulo: "Captura de lebrancha en Veracruz, Tamaulipas y Campeche, 1980–2019 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Veracruz",
            color: "#0d9488",
            datos: [
              { año: 1980, captura: 2900 },
              { año: 1985, captura: 2200 },
              { año: 1990, captura: 1000 },
              { año: 1995, captura: 5500 },
              { año: 2000, captura: 7200 },
              { año: 2003, captura: 3170 },
              { año: 2010, captura: 3170 },
              { año: 2014, captura: 3170 },
              { año: 2015, captura: 3800 },
              { año: 2016, captura: 4200 },
              { año: 2017, captura: 4628 },
              { año: 2018, captura: 4628 },
              { año: 2019, captura: 2400 },
            ],
          },
          {
            estado: "Tamaulipas",
            color: "#f59e0b",
            datos: [
              { año: 1980, captura: 200 },
              { año: 1985, captura: 300 },
              { año: 1990, captura: 200 },
              { año: 1995, captura: 250 },
              { año: 2000, captura: 250 },
              { año: 2003, captura: 116 },
              { año: 2010, captura: 116 },
              { año: 2014, captura: 116 },
              { año: 2015, captura: 233 },
              { año: 2016, captura: 233 },
              { año: 2017, captura: 233 },
              { año: 2018, captura: 233 },
              { año: 2019, captura: 150 },
            ],
          },
          {
            estado: "Campeche",
            color: "#0891b2",
            datos: [
              { año: 1980, captura: 50 },
              { año: 1985, captura: 100 },
              { año: 1990, captura: 150 },
              { año: 1995, captura: 180 },
              { año: 2000, captura: 180 },
              { año: 2003, captura: 180 },
              { año: 2010, captura: 200 },
              { año: 2014, captura: 180 },
              { año: 2015, captura: 180 },
              { año: 2016, captura: 28 },
              { año: 2017, captura: 28 },
              { año: 2018, captura: 28 },
              { año: 2019, captura: 28 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "El cambio climático ha generado afectaciones en los recursos pesqueros, causando trastornos en la estacionalidad de algunos procesos biológicos, como en las redes tróficas marinas y de aguas dulces. Además, ha ocasionado acontecimientos extremos —inundaciones, sequías, tormentas— que alteran la estabilidad de los recursos, con consecuencias imprevisibles para la producción pesquera. Se ha registrado un desplazamiento hacia los polos de las especies de aguas templadas, con los consiguientes cambios en el tamaño y la productividad de sus hábitats; según las regiones y latitudes, tendrá efectos tanto positivos como negativos en las pesquerías y en las actividades acuícolas. La afectación a las pesquerías no se debe sólo al efecto climático: éste es un factor más que se suma a los que ya inciden en la actividad.",
    "Por ello es necesario hacer estudios para medir y conocer los efectos negativos, que permitan tomar decisiones con un enfoque ecosistémico, mejorar el marco legal que contemple este evento y permitir a las comunidades participar en medidas de adaptación, ya que las alteraciones físicas repercutirán en los recursos acuáticos, en los ecosistemas y en las dimensiones humanas. Se deben priorizar los esfuerzos de adaptación de los individuos para enfrentar los problemas que se advierten en el ámbito de la pesca y la acuicultura.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion: "Para ambos recursos, NOM-016-SAG/PESC-2014.",
      sustento: "DOF: 29/07/2015.",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: true,
      disposicion:
        "Plan de Manejo Pesquero de lisa (Mugil cephalus) y lebrancha (Mugil curema) en las costas de Tamaulipas y Veracruz.",
      sustento: "DOF: 31/03/2014.",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial de escama marina.",
      sustento: "CONAPESCA.",
    },
    {
      instrumento: "4. Talla mínima",
      aplica: true,
      disposicion: "30 centímetros para Mugil cephalus y 26 centímetros para Mugil curema.",
      sustento: "Numeral 4.2.2 de la NOM-016-SAG/PESC-2014.",
    },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Red de enmalle tipo agallera con tamaño de malla de 102 milímetros (4 pulgadas) como mínimo para la captura de lisa y de 76 milímetros (3 pulgadas) como mínimo para la captura de lebrancha.",
      sustento: "Numeral 4.3.2 de la NOM-016-SAG/PESC-2014.",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Acuerdo de veda conjunta para ambos recursos, del 1 al 31 de diciembre y del 1 al 28 de febrero de cada año. Modificación al acuerdo de veda específicamente para la Laguna Madre, Tamaulipas, que aplica además del anterior, del 1 de septiembre al 10 de noviembre.",
      sustento: "DOF: 16/10/2015.",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcaciones menores con motor fuera de borda de hasta 75 caballos de fuerza.",
      sustento: "Numeral 4.4 de la NOM-016-SAG/PESC-2014.",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion: "2,491 permisos y 9,448 embarcaciones.",
      sustento: "CONAPESCA.",
    },
    { instrumento: "10. Zona de pesca", aplica: false, disposicion: "No aplica.", sustento: "" },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Lisa (Mugil cephalus)",
        zona: "Tamaulipas",
      },
      {
        categoria: "En deterioro",
        color: "red",
        especie: "Lisa (Mugil cephalus)",
        zona: "Veracruz",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Liseta o lebrancha (Mugil curema)",
        zona: "Veracruz",
      },
      {
        categoria: "En deterioro",
        color: "red",
        especie: "Liseta o lebrancha (Mugil curema)",
        zona: "Tamaulipas",
      },
    ],
    estrategia:
      "En la Laguna Madre se sugiere mantener el nivel de explotación de lisa (M. cephalus) alrededor de las 3,000 toneladas, de acuerdo con el punto de referencia límite. En ambos recursos, mantener el mismo esquema de manejo basado en veda, tamaño de malla y talla mínima de captura, y diseñar estrategias de recuperación mediante análisis y evaluaciones en cada temporada de pesca anual, principalmente para el estado de Veracruz.",
    tacticas: [
      "Veda conjunta para ambos recursos",
      "Tamaño de malla mínimo diferenciado por especie",
      "Talla mínima de captura",
      "Líneas de investigación: realizar los estudios biológicos y pesqueros propuestos en las líneas de acción del Plan de Manejo Pesquero de lisa y lebrancha en Tamaulipas y Veracruz, que coadyuven a la conservación y recuperación de las poblaciones de ambos recursos",
    ],
  },
  recomendaciones: [
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información" },
    {
      recomendacion:
        "Para ambas especies, en los estados donde están aprovechadas al máximo sustentable, mantener las capturas por debajo del rendimiento máximo sustentable; en el caso de las que se encuentran en deterioro, disminuir en lo posible el esfuerzo.",
      avance: "Sin información",
    },
  ],
}

fichas["gm-rayas-del-golfo-de-mexico"] = {
  generalidades: {
    descripcion: [
      "La pesquería de rayas es una actividad de gran importancia económica, ya que la captura de este recurso proporciona una fuente de ingresos alternativa cuando otros recursos de mayor importancia económica escasean o se encuentran en veda. Son aprovechadas casi en su totalidad y presentan características biológicas típicas de organismos estrategas K —crecimiento lento, periodos largos de gestación, baja productividad y madurez tardía— que las hacen altamente vulnerables a intensos y prolongados periodos de pesca.",
      "La pesca de rayas ocurre en aguas marinas de jurisdicción federal del Golfo de México, entre 3 y 100 metros de profundidad, y se captura principalmente en los estados de Campeche y Tabasco.",
    ],
    embarcaciones:
      "Para la pesquería ribereña artesanal de rayas se utilizan embarcaciones menores de hasta 10.5 metros de eslora, con un motor fuera de borda de potencia nominal máxima de 115 caballos de fuerza. A bordo participan de dos a tres pescadores.",
    artesPesca:
      "Los equipos autorizados son los palangres o cimbras, las redes de enmalle y los arpones de liga o neumáticos; estos últimos sólo podrán autorizarse en el estado de Yucatán. El palangre o cimbra de deriva en la zona marina admite un máximo de 350 anzuelos, un anzuelo por reinal, reinales de entre 5 y 7 metros de longitud, una sección de «alambrada» mínima de 20 centímetros y un anzuelo recto de tamaño mínimo igual o superior a 64 milímetros de largo por 22 milímetros de abertura, o circular de 45 milímetros de largo por 18 milímetros; se puede utilizar afuera de una franja costera de 18.53 kilómetros (10 millas náuticas) contados a partir de la línea de base con la cual se mide el mar territorial. El palangre o cimbra de fondo en la zona marina admite un máximo de 500 anzuelos, con reinales de hasta 5 metros de longitud y las mismas especificaciones de alambrada y anzuelo. Por embarcación se puede utilizar una red de enmalle de fondo, con un máximo de 750 metros de longitud por 50 mallas de altura máxima, de hilo de poliamida multifilamento de un máximo de 2.4 milímetros de diámetro o de poliamida monofilamento de 2.1 milímetros de diámetro máximo, con tamaño de malla igual o superior a 152.4 milímetros (6 pulgadas). Las redes y los palangres no podrán unirse para su utilización en serie.",
    especiesObjetivo: [
      { nombre: "Balá, raya blanca, raya látigo", cientifico: "Hypanus americanus" },
      { nombre: "Raya chucho, raya pinta", cientifico: "Aetobatus narinari" },
      { nombre: "Raya tecolota, chucha", cientifico: "Rhinoptera bonasus" },
      { nombre: "Raya mariposa, libro, comal", cientifico: "Gymnura micrura" },
      { nombre: "Raya guitarra, diablito", cientifico: "Pseudobatos lentiginosus" },
      { nombre: "Raya lebiza, raya lija", cientifico: "Styracura schmardae" },
      // La ficha de la CNP no registra nombre común para esta especie (celda "----------").
      { nombre: "Sin nombre común registrado", cientifico: "Bathytoshia centroura" },
    ],
    especiesAsociadas: [
      { nombre: "Bagre bandera", cientifico: "Bagre marinus" },
      { nombre: "Cazón tutzún, cazón de ley", cientifico: "Rhizoprionodon terraenovae" },
      { nombre: "Cazón pech, cazón cabeza de pala", cientifico: "Sphyrna tiburo" },
      { nombre: "Villajaiba, rubia", cientifico: "Lutjanus synagris" },
      { nombre: "Chac-chi", cientifico: "Haemulon plumierii" },
      { nombre: "Jaquetón rollizo, tiburón puntas negras, volador", cientifico: "Carcharhinus limbatus" },
      { nombre: "Besugo rosado", cientifico: "Rhomboplites aurorubens" },
      { nombre: "Ixponpol, conejo", cientifico: "Lagocephalus laevigatus" },
      { nombre: "Ronco", cientifico: "Conodon nobilis" },
      { nombre: "Pargo mulato, cabellera mulata", cientifico: "Lutjanus griseus" },
      { nombre: "Cubera", cientifico: "Lutjanus cyanopterus" },
      { nombre: "Cochino, xcochin", cientifico: "Balistes capriscus" },
      { nombre: "Trucha", cientifico: "Cynoscion arenarius" },
      { nombre: "Cazón canguay, cazón amarillo, cazón limón", cientifico: "Carcharhinus acronotus" },
      { nombre: "Coronado, medregal", cientifico: "Seriola dumerili" },
      { nombre: "Huachinango", cientifico: "Lutjanus campechanus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "Históricamente, más del 80% de la producción proviene de los estados de Campeche, Tabasco y Veracruz.",
      "Composición de la captura en peso vivo por especie en el Golfo de México y Mar Caribe: Hypanus americanus 75%, Aetobatus narinari 10%, Rhinoptera bonasus 7%, Gymnura micrura 4%, Pseudobatos lentiginosus 2%, Styracura schmardae 1% y Bathytoshia centroura menos del 1%.",
    ],
    // Figura 2. Tendencia de la captura de rayas por estado, 2005-2019.
    capturaPorEstado: [
      {
        titulo: "Captura de rayas en Tabasco, Campeche y Veracruz, 2005–2019",
        series: [
          {
            estado: "Tabasco",
            color: "#0d9488",
            datos: [
              { año: 2005, captura: 900 },
              { año: 2006, captura: 1000 },
              { año: 2007, captura: 1200 },
              { año: 2008, captura: 950 },
              { año: 2009, captura: 900 },
              { año: 2010, captura: 950 },
              { año: 2011, captura: 1697 },
              { año: 2012, captura: 950 },
              { año: 2013, captura: 1410 },
              { año: 2014, captura: 950 },
              { año: 2015, captura: 900 },
              { año: 2016, captura: 1000 },
              { año: 2017, captura: 1300 },
              { año: 2018, captura: 900 },
              { año: 2019, captura: 300 },
            ],
          },
          {
            estado: "Campeche",
            color: "#f59e0b",
            datos: [
              { año: 2005, captura: 1000 },
              { año: 2006, captura: 1200 },
              { año: 2007, captura: 1100 },
              { año: 2008, captura: 900 },
              { año: 2009, captura: 850 },
              { año: 2010, captura: 900 },
              { año: 2011, captura: 950 },
              { año: 2012, captura: 1000 },
              { año: 2013, captura: 950 },
              { año: 2014, captura: 1050 },
              { año: 2015, captura: 1150 },
              { año: 2016, captura: 1276 },
              { año: 2017, captura: 710 },
              { año: 2018, captura: 1000 },
              { año: 2019, captura: 1100 },
            ],
          },
          {
            estado: "Veracruz",
            color: "#0891b2",
            datos: [
              { año: 2005, captura: 450 },
              { año: 2006, captura: 400 },
              { año: 2007, captura: 350 },
              { año: 2008, captura: 320 },
              { año: 2009, captura: 350 },
              { año: 2010, captura: 380 },
              { año: 2011, captura: 400 },
              { año: 2012, captura: 500 },
              { año: 2013, captura: 600 },
              { año: 2014, captura: 500 },
              { año: 2015, captura: 550 },
              { año: 2016, captura: 650 },
              { año: 2017, captura: 900 },
              { año: 2018, captura: 1000 },
              { año: 2019, captura: 700 },
            ],
          },
        ],
      },
      {
        titulo: "Captura de rayas en Tamaulipas y Yucatán, 2005–2019",
        series: [
          {
            estado: "Tamaulipas",
            color: "#8b5cf6",
            datos: [
              { año: 2005, captura: 180 },
              { año: 2006, captura: 190 },
              { año: 2007, captura: 150 },
              { año: 2008, captura: 130 },
              { año: 2009, captura: 180 },
              { año: 2010, captura: 230 },
              { año: 2011, captura: 150 },
              { año: 2012, captura: 130 },
              { año: 2013, captura: 150 },
              { año: 2014, captura: 220 },
              { año: 2015, captura: 230 },
              { año: 2016, captura: 300 },
              { año: 2017, captura: 400 },
              { año: 2018, captura: 400 },
              { año: 2019, captura: 380 },
            ],
          },
          {
            estado: "Yucatán",
            color: "#e11d48",
            datos: [
              { año: 2005, captura: 90 },
              { año: 2006, captura: 150 },
              { año: 2007, captura: 100 },
              { año: 2008, captura: 60 },
              { año: 2009, captura: 50 },
              { año: 2010, captura: 80 },
              { año: 2011, captura: 40 },
              { año: 2012, captura: 60 },
              { año: 2013, captura: 100 },
              { año: 2014, captura: 130 },
              { año: 2015, captura: 150 },
              { año: 2016, captura: 250 },
              { año: 2017, captura: 180 },
              { año: 2018, captura: 300 },
              { año: 2019, captura: 400 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "En los organismos marinos, los efectos ambientales juegan un papel importante en la biología y la distribución de las especies. La alteración de algún factor, como la temperatura del agua, puede causar trastornos en las migraciones, las agregaciones reproductivas y las temporadas de nacimiento de muchas especies, y afectar de distintas formas a las pesquerías.",
    "Con base en lo anterior, es necesario incorporar aspectos ambientales en la evaluación y el manejo de la pesquería de rayas en el Golfo de México y Mar Caribe.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "Norma Oficial Mexicana NOM-029-PESC-2006, Pesca responsable de tiburones y rayas. Especificaciones para su aprovechamiento.",
      sustento: "DOF: 14/02/2007.",
    },
    {
      instrumento: "2. Plan de Manejo Pesquero",
      aplica: false,
      disposicion: "En proceso de elaboración.",
      sustento: "",
    },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial de tiburones y escama marina.",
      sustento: "Opinión técnica del INAPESCA.",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Palangres o cimbras, redes de enmalle y arpones de liga o neumáticos. Los arpones de liga o neumáticos sólo podrán autorizarse en el estado de Yucatán.",
      sustento: "Numerales 4.4.2.1, 4.4.2.2, 4.4.2.3 y 4.5.1 de la NOM-029-PESC-2006.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcaciones menores.",
      sustento: "DOF: 14/02/2007.",
    },
    { instrumento: "9. Esfuerzo actual autorizado", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Queda prohibida la pesca: a) en zonas y temporadas de veda; b) en una franja marina de cinco kilómetros de ancho alrededor de las zonas arrecifales coralinas que se especifican en el Apéndice Normativo «E» de la NOM-029-PESC-2006; c) en las aguas marinas localizadas frente a la desembocadura de ríos y lagunas costeras, en un área delimitada por un semicírculo que tenga como diámetro una distancia que comprenda la boca del cuerpo de agua y la línea litoral adyacente hasta 2.5 kilómetros a cada lado de los extremos de la boca; y d) en una franja marina de cinco kilómetros de ancho frente a las principales playas de anidación de tortuga marina durante las temporadas en que desovan, playas especificadas en el Apéndice Normativo «B».",
      sustento: "Numeral 4.3.4 de la NOM-029-PESC-2006.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Raya (Hypanus americanus)",
        zona: "Golfo de México y Mar Caribe",
      },
    ],
    estrategia:
      "Control del esfuerzo por medio de permisos de escama comercial y regulación del arte de pesca por medio de la NOM-029-PESC-2006.",
    tacticas: [
      "Control del esfuerzo pesquero mediante permisos de pesca comercial de escama",
      "Regulación del arte de pesca conforme a la NOM-029-PESC-2006",
      "Zonas prohibidas a la pesca: arrecifes coralinos, desembocaduras de ríos y lagunas costeras y playas de anidación de tortuga marina",
    ],
  },
  recomendaciones: [
    {
      recomendacion:
        "Aplicar las medidas de manejo consideradas pertinentes en el Plan de Acción Nacional para el Manejo y Conservación de Tiburones, Rayas y especies afines (PANMCTR) y en la NOM-029-PESC-2006.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Publicar el Plan de Manejo Pesquero elaborado de manera participativa por el INAPESCA, que detalla los lineamientos y estrategias de manejo para este recurso.",
      avance: "Sin información",
    },
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información" },
  ],
}

fichas["gm-sierra-y-peto-del-golfo-de-mexico"] = {
  generalidades: {
    descripcion: [
      "Los peces marinos que participan de manera importante en la pesca ribereña se capturan en la zona costera. Pueden ser pelágicos (pequeños túnidos), como las especies de la familia Scombridae —la sierra (Scomberomorus maculatus) y el peto (Scomberomorus cavalla)—, o demersales, representados por la familia Lutjanidae (huachinango, pargo, besugo).",
      "Habitan en la porción oeste del océano Atlántico; el peto se distribuye más hacia el sur del Atlántico, ya que la sierra sólo llega a la península de Yucatán. En cuanto a su migración, estas especies tienen un patrón que responde a dos temporadas del año: cuando las aguas del norte se enfrían migran hacia el sur en otoño-invierno y, por el contrario, cuando las aguas se calientan en el sur la migración se invierte, en primavera-verano, que es cuando la sierra y el peto van hacia el norte.",
    ],
    embarcaciones:
      "Se utilizan embarcaciones ribereñas de fibra de vidrio con una eslora máxima de 7.6 metros y motor fuera de borda de dos o cuatro tiempos, con potencia en su mayoría de 55 a 75 caballos de fuerza.",
    artesPesca:
      "Las artes de pesca difieren de acuerdo con la zona. En aguas mexicanas del Golfo de México la captura comercial se realiza principalmente con red de enmalle, curricán y, en menor medida, palangre. La red de enmalle está construida con paños de poliamida monofilamento o multifilamento de 100 metros de longitud cada uno, tamaño de malla mínimo de 76.2 milímetros (3\"), calibre del hilo de 0.40 a 0.55 milímetros y una caída de la red que puede oscilar entre 50 y 100 mallas dependiendo de la profundidad de trabajo; para su construcción se utilizan entre 3 y 20 paños, con una longitud total de la red de 300 a 2,000 metros y un encabalgado de 40 a 60% según la experiencia del pescador. La pesca con curricán se realiza de forma activa con líneas de mano, principalmente para la captura de peto de mayor tamaño, al que se le colocan señuelos que se llevan arrastrando o «troleando» en el agua. El curricán consiste en un cordel de poliamida monofilamento de 0.8 a 1.2 milímetros y aproximadamente 150 a 500 metros de longitud; lleva una plomada para que la línea mantenga la vertical, destorcedores y, al final, anzuelos o señuelo, utilizando anzuelos tipo recto del número 6 al 8.",
    especiesObjetivo: [
      { nombre: "Peto o carito", cientifico: "Scomberomorus cavalla" },
      { nombre: "Sierra", cientifico: "Scomberomorus maculatus" },
      { nombre: "Sierra, cero", cientifico: "Scomberomorus regalis" },
    ],
    especiesAsociadas: [
      { nombre: "Sargo, mojarra negra", cientifico: "Archosargus probatocephalus" },
      { nombre: "Sargo", cientifico: "Archosargus rhomboidalis" },
      { nombre: "Bandera", cientifico: "Bagre marinus" },
      { nombre: "Cojinuda", cientifico: "Caranx bartholomaei" },
      { nombre: "Cojinuda, cojinúa", cientifico: "Caranx crysos" },
      { nombre: "Jurel común, vaca, amarillo", cientifico: "Caranx hippos" },
      { nombre: "Jurel blanco, jurel ojón", cientifico: "Caranx latus" },
      { nombre: "Jurel negro", cientifico: "Caranx lugubris" },
      { nombre: "Ronco amarillo, canario", cientifico: "Conodon nobilis" },
      { nombre: "Trucha o corvina blanca", cientifico: "Cynoscion arenarius" },
      { nombre: "Trucha pinta, corvina pinta", cientifico: "Cynoscion nebulosus" },
      { nombre: "Trucha plateada, corvina", cientifico: "Cynoscion nothus" },
      { nombre: "Bonito", cientifico: "Euthynnus alletteratus" },
      { nombre: "Bonito del Atlántico", cientifico: "Sarda sarda" },
      { nombre: "Boquilla, chac-chí", cientifico: "Haemulon plumierii" },
      { nombre: "Chopa amarilla", cientifico: "Kyphosus vaigiensis" },
      { nombre: "Chopa negra", cientifico: "Kyphosus sectatrix" },
      { nombre: "Pargos", cientifico: "Lutjanus spp." },
      { nombre: "Villajaiba, rubia", cientifico: "Lutjanus synagris" },
      { nombre: "Zapatero", cientifico: "Oligoplites saurus" },
      { nombre: "Ocho barbas, ratón", cientifico: "Polydactylus octonemus" },
      { nombre: "Anchoa", cientifico: "Pomatomus saltatrix" },
      { nombre: "Sabalete, ojón, orijuelo", cientifico: "Priacanthus arenatus" },
      { nombre: "Cazón, cazón de ley, tripa", cientifico: "Rhizoprionodon terraenovae" },
      { nombre: "Cazón pech, chata, cabeza de pala", cientifico: "Sphyrna tiburo" },
      { nombre: "Cazón limón, canguay", cientifico: "Carcharhinus acronotus" },
      { nombre: "Corvina ocelada, corvina roja", cientifico: "Sciaenops ocellatus" },
      { nombre: "Jorobado", cientifico: "Selene brownii" },
      { nombre: "Jorobado", cientifico: "Selene vomer" },
      { nombre: "Jorobada, caballa, papelillo", cientifico: "Selene setapinnis" },
      { nombre: "Medregal, esmedregal, coronado", cientifico: "Seriola dumerili" },
      { nombre: "Tolete, picuda", cientifico: "Sphyraena guachancho" },
      { nombre: "Pámpano amarillo", cientifico: "Trachinotus carolinus" },
      { nombre: "Palometa, pampanera", cientifico: "Trachinotus falcatus" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "La captura conjunta alcanzó su máximo histórico en 1996, con 11,024 toneladas de sierra, y volvió a repuntar en 2018 con 8,300 toneladas de sierra y 7,441 de peto.",
      "La mayor captura de sierra en Veracruz se realiza cuando la temperatura superficial del mar anual es cálida, entre 24 y 27 grados centígrados; la de peto, cuando es templada (22 grados centígrados), dentro de un rango de 20 a 29 grados centígrados.",
    ],
    // Figura 1. Serie histórica de la captura de sierra y peto en el Golfo de México y Mar Caribe,
    // 1990-2019 (Fuente: Anuarios Estadísticos de Acuacultura y Pesca).
    capturaPorEstado: [
      {
        titulo: "Captura de sierra y peto en el Golfo de México y Mar Caribe, 1990–2019 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Sierra",
            color: "#0d9488",
            datos: [
              { año: 1990, captura: 8600 },
              { año: 1991, captura: 9200 },
              { año: 1992, captura: 9700 },
              { año: 1993, captura: 10100 },
              { año: 1994, captura: 9000 },
              { año: 1995, captura: 7700 },
              { año: 1996, captura: 11024 },
              { año: 1997, captura: 8300 },
              { año: 1998, captura: 8400 },
              { año: 1999, captura: 6300 },
              { año: 2000, captura: 5900 },
              { año: 2001, captura: 5700 },
              { año: 2002, captura: 5900 },
              { año: 2003, captura: 6200 },
              { año: 2004, captura: 6600 },
              { año: 2005, captura: 7150 },
              { año: 2006, captura: 6700 },
              { año: 2007, captura: 6100 },
              { año: 2008, captura: 5700 },
              { año: 2009, captura: 4600 },
              { año: 2010, captura: 5500 },
              { año: 2011, captura: 6500 },
              { año: 2012, captura: 7200 },
              { año: 2013, captura: 6200 },
              { año: 2014, captura: 4400 },
              { año: 2015, captura: 3200 },
              { año: 2016, captura: 5000 },
              { año: 2017, captura: 7700 },
              { año: 2018, captura: 8300 },
              { año: 2019, captura: 4300 },
            ],
          },
          {
            estado: "Peto",
            color: "#f59e0b",
            datos: [
              { año: 1990, captura: 2900 },
              { año: 1991, captura: 3300 },
              { año: 1992, captura: 3400 },
              { año: 1993, captura: 3000 },
              { año: 1994, captura: 3100 },
              { año: 1995, captura: 2900 },
              { año: 1996, captura: 3300 },
              { año: 1997, captura: 4600 },
              { año: 1998, captura: 5300 },
              { año: 1999, captura: 4700 },
              { año: 2000, captura: 4800 },
              { año: 2001, captura: 4600 },
              { año: 2002, captura: 5300 },
              { año: 2003, captura: 5500 },
              { año: 2004, captura: 5800 },
              { año: 2005, captura: 5600 },
              { año: 2006, captura: 4900 },
              { año: 2007, captura: 4400 },
              { año: 2008, captura: 5000 },
              { año: 2009, captura: 4600 },
              { año: 2010, captura: 4400 },
              { año: 2011, captura: 7100 },
              { año: 2012, captura: 6600 },
              { año: 2013, captura: 4300 },
              { año: 2014, captura: 3900 },
              { año: 2015, captura: 3200 },
              { año: 2016, captura: 3600 },
              { año: 2017, captura: 4700 },
              { año: 2018, captura: 7441 },
              { año: 2019, captura: 3700 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "La influencia de los factores ambientales en la disponibilidad de algunos recursos pesqueros ha sido estudiada por diversos autores utilizando como indicadores el análisis de series de tiempo de variables como la temperatura superficial del mar y la concentración de clorofila a. Se considera que los factores ambientales juegan un papel importante en las pesquerías de peces pelágicos: las migraciones de estas especies se relacionan principalmente con fines alimenticios y reproductivos, y se alimentan en aguas costeras de organismos epipelágicos y neríticos, como pelágicos menores (sardinas y anchovetas) y camarones.",
    "Estudios recientes sobre la idoneidad ambiental para estas especies en el Golfo de México han indicado que las variables que más aportan a su distribución potencial y su abundancia son la temperatura superficial del mar, la ocurrencia de frentes, la concentración de clorofila a y la velocidad superficial de las corrientes.",
    "Uno de los factores climáticos a los que se puede relacionar la modificación de las fluctuaciones de sierra y peto a lo largo del Golfo de México y el litoral veracruzano podría ser el índice de oscilación del sur en su fase negativa (El Niño) y su fase positiva (La Niña), ya que este fenómeno se refleja de manera positiva —aumentando la temperatura superficial del mar (TSM)— en eventos de El Niño y de manera negativa —disminuyendo la TSM— en eventos de La Niña en el océano Atlántico, lo que permite que la mayoría de las especies de importancia emigren mar afuera y a mayor profundidad. Este fenómeno generó aguas cálidas en las costas, lo que favorecería un incremento en la captura de sierra y, posteriormente, conforme trascendía, los vientos alisios dieron lugar a aguas frías y con ello al incremento de las capturas de ambas especies en 1999.",
    "La mayor captura de sierra en Veracruz se realiza cuando la TSM anual es cálida, oscilando entre los 24 y 27 grados centígrados. La mayor captura de peto en Veracruz se realiza cuando la TSM es templada (22 grados centígrados), dentro del rango de 20 a 29 grados centígrados. La captura de peto en Veracruz tiene una relación significativa (r = -0.780) con la anomalía estandarizada de TSM del estado, lo que indica que mayores capturas de peto se pueden asociar a temperaturas frías, de acuerdo con la zona de pesca.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "No se ha elaborado.", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "No se ha elaborado.", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial para escama marina.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "Investigación en proceso.", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Red agallera con longitud de 400 a 800 metros, calibre de hilo de 0.40, 0.47 y 0.55 milímetros y tamaño de malla de 76 a 88.9 milímetros. También se usa el curricán con uno o dos anzuelos del número 6/0 y 7/0.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "Investigación en proceso.", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores con motor fuera de borda de hasta 115 caballos de fuerza, 3 pescadores, 2 redes agalleras y un curricán.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion:
        "Embarcaciones menores: Campeche 2,102; Quintana Roo 513; Tabasco 1,133; Tamaulipas 1,374; Veracruz 1,592 y Yucatán 2,734.",
      sustento: "Bases de datos de la CONAPESCA.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion: "Aguas marinas de jurisdicción federal del Golfo de México y Mar Caribe.",
      sustento: "Permisos de pesca comercial para la captura de escama marina.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Sierra (Scomberomorus maculatus)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Peto (Scomberomorus cavalla)",
        zona: "Golfo de México y Mar Caribe",
      },
    ],
    estrategia:
      "A escala nacional es recomendable que se expidan permisos específicos para estos recursos, dado que pueden constituir una pesquería independiente con artes de pesca específicas, y reducir el esfuerzo en la medida de lo posible. A nivel internacional, la Comisión Internacional para la Conservación del Atún del Atlántico (CICAA) recomienda que estas especies sean administradas a nivel regional y subregional.",
    tacticas: [
      "Expedición de permisos específicos para sierra y peto",
      "Reducción del esfuerzo pesquero en la medida de lo posible",
      "No utilizar el chinchorro playero",
      "Realizar trabajos de investigación para la evaluación biológico-pesquera de ambos recursos en el Golfo de México, con el fin de proponer medidas de regulación y contar con puntos de referencia",
    ],
  },
  recomendaciones: [
    {
      recomendacion: "Elaborar un Plan de Manejo Pesquero para sierra y peto en el Golfo de México y Mar Caribe.",
      avance: "Sin información",
    },
    { recomendacion: "Proponer periodos y zonas de veda para estas especies.", avance: "Sin información" },
    { recomendacion: "No incrementar el esfuerzo pesquero.", avance: "Sin información" },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería que permita evaluar su impacto, bajo la coordinación y supervisión del INAPESCA.",
      avance: "Sin información",
    },
  ],
}

fichas["gm-tiburones-del-golfo-de-mexico-y-mar-caribe"] = {
  generalidades: {
    descripcion: [
      "En México, la captura de tiburones se considera una pesquería artesanal multiespecífica que opera de acuerdo con la abundancia estacional de alrededor de 50 especies, las cuales proporcionan valiosas fuentes de alimento, empleo y divisas a las comunidades ribereñas. Su pesca está representada por dos tipos de unidades pesqueras: la ribereña artesanal, que se realiza a lo largo del litoral con embarcaciones menores de 10 metros de eslora, y la de mediana altura, con embarcaciones de 10 a 27 metros de eslora en aguas costeras.",
      "La pesca ocurre en aguas marinas de jurisdicción federal de la plataforma continental del Golfo de México y Mar Caribe.",
    ],
    embarcaciones:
      "Se usan embarcaciones menores con motor fuera de borda de 115 caballos de fuerza y de uno a tres días de autonomía, en las que participan entre dos y tres pescadores. Además, existen algunas embarcaciones de mediana altura de 10 a 27 metros de eslora, con motor estacionario, de 4 a 25 días de autonomía y de 4 a 8 pescadores.",
    artesPesca: "Se emplean palangre y redes de enmalle.",
    especiesObjetivo: [
      { nombre: "Cazón de ley, tutzún", cientifico: "Rhizoprionodon terraenovae" },
      { nombre: "Cazón cabeza de pala", cientifico: "Sphyrna tiburo" },
      { nombre: "Tiburón puntas negras", cientifico: "Carcharhinus limbatus" },
      { nombre: "Cazón limón, canguay", cientifico: "Carcharhinus acronotus" },
      { nombre: "Cornuda común", cientifico: "Sphyrna lewini" },
      { nombre: "Tiburón chato, toro", cientifico: "Carcharhinus leucas" },
      { nombre: "Tiburón prieto, sedoso", cientifico: "Carcharhinus falciformis" },
      { nombre: "Cazón poroso, chacpat", cientifico: "Carcharhinus porosus" },
      { nombre: "Tiburón punta de lápiz", cientifico: "Carcharhinus brevipinna" },
    ],
    especiesAsociadas: [
      { nombre: "Jureles", cientifico: "Caranx hippos, Caranx latus" },
      { nombre: "Peto", cientifico: "Scomberomorus cavalla" },
      { nombre: "Bacalao", cientifico: "Rachycentron canadum" },
      { nombre: "Esmedregal", cientifico: "Seriola spp." },
      { nombre: "Meros", cientifico: "Epinephelus spp." },
      { nombre: "Pargos, cuberas", cientifico: "Lutjanus spp." },
      { nombre: "Rayas", cientifico: "Hypanus americanus, Gymnura micrura" },
    ],
  },
  indicadores: {
    embarcaciones: "1,816",
    datosDestacados: [
      "La pesquería opera sobre alrededor de 50 especies, de acuerdo con su abundancia estacional.",
      "El esfuerzo autorizado se compone de 1,781 embarcaciones menores y 35 embarcaciones mayores.",
      "La captura alcanzó su máximo histórico en 1984, con 14,620 toneladas; tras un descenso prolongado hasta 3,600 toneladas en 2014, repuntó a 9,350 toneladas en 2018.",
    ],
    // Figura 1. Serie de tiempo (1937-2019) del total de las capturas de tiburón y cazón del Golfo
    // de México y Mar Caribe. Fuente: Anuarios Estadísticos de Pesca.
    capturaPorEstado: [
      {
        titulo: "Captura total de tiburón y cazón en el Golfo de México y Mar Caribe, 1937–2019 (Anuarios Estadísticos)",
        series: [
          {
            estado: "Captura total",
            color: "#0891b2",
            datos: [
              { año: 1937, captura: 50 },
              { año: 1940, captura: 100 },
              { año: 1945, captura: 200 },
              { año: 1950, captura: 300 },
              { año: 1955, captura: 400 },
              { año: 1957, captura: 450 },
              { año: 1960, captura: 500 },
              { año: 1963, captura: 600 },
              { año: 1965, captura: 700 },
              { año: 1967, captura: 900 },
              { año: 1969, captura: 1000 },
              { año: 1970, captura: 1300 },
              { año: 1972, captura: 1800 },
              { año: 1974, captura: 2600 },
              { año: 1976, captura: 3500 },
              { año: 1977, captura: 4200 },
              { año: 1978, captura: 5500 },
              { año: 1979, captura: 7500 },
              { año: 1980, captura: 9500 },
              { año: 1981, captura: 10800 },
              { año: 1982, captura: 11200 },
              { año: 1983, captura: 13000 },
              { año: 1984, captura: 14620 },
              { año: 1985, captura: 13500 },
              { año: 1986, captura: 11300 },
              { año: 1987, captura: 11400 },
              { año: 1988, captura: 13800 },
              { año: 1989, captura: 10200 },
              { año: 1990, captura: 13900 },
              { año: 1991, captura: 12900 },
              { año: 1992, captura: 10500 },
              { año: 1993, captura: 9500 },
              { año: 1994, captura: 8700 },
              { año: 1995, captura: 8200 },
              { año: 1996, captura: 7900 },
              { año: 1997, captura: 7200 },
              { año: 1998, captura: 6700 },
              { año: 1999, captura: 6000 },
              { año: 2000, captura: 6300 },
              { año: 2001, captura: 6900 },
              { año: 2002, captura: 6300 },
              { año: 2003, captura: 5700 },
              { año: 2004, captura: 5000 },
              { año: 2005, captura: 4700 },
              { año: 2006, captura: 4500 },
              { año: 2007, captura: 5000 },
              { año: 2008, captura: 4300 },
              { año: 2009, captura: 3800 },
              { año: 2010, captura: 4600 },
              { año: 2011, captura: 3643 },
              { año: 2012, captura: 4800 },
              { año: 2013, captura: 4300 },
              { año: 2014, captura: 3600 },
              { año: 2015, captura: 4700 },
              { año: 2016, captura: 6300 },
              { año: 2017, captura: 8000 },
              { año: 2018, captura: 9350 },
              { año: 2019, captura: 7300 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "La presencia de tiburones en la zona costera se relaciona con anomalías negativas/positivas de la temperatura superficial del mar (TSM) y con la mínima/máxima formación de perturbaciones atmosféricas, desde bajas presiones hasta huracanes, en el Golfo de México y Mar Caribe.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion:
        "Norma Oficial Mexicana NOM-029-PESC-2006, Pesca responsable de tiburones y rayas. Especificaciones para su aprovechamiento.",
      sustento: "DOF: 14/07/2007.",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "En proceso de elaboración.", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permisos y concesiones de pesca comercial para tiburón.",
      sustento: "Opinión técnica del INAPESCA.",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "Investigación en proceso.", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Artesanal: en la zona marina, afuera de una franja costera de 18.53 kilómetros (10 millas náuticas), se permite un palangre o cimbra de deriva por embarcación con máximo 350 anzuelos y alambrada mínima de 20 centímetros; una red de enmalle de fondo por embarcación con máximo 750 metros de longitud por 50 mallas de altura máxima, hilo de poliamida multifilamento de un máximo de 2.4 milímetros de diámetro o de poliamida monofilamento de 2.1 milímetros de diámetro máximo, con tamaño de malla mínimo de 154.4 milímetros (6 pulgadas). En la zona marina costera se permite un palangre de fondo por embarcación con máximo 500 anzuelos con alambrada mínima de 20 centímetros y un anzuelo recto con tamaño mínimo de 64 milímetros de largo por 22 milímetros de abertura, o circular de 45 milímetros de largo por 18 milímetros de abertura. Mediana altura: un palangre o cimbra de fondo por embarcación, con máximo 1,000 anzuelos, uno por reinal, alambrada mínima de 20 centímetros y anzuelos circulares con un tamaño mínimo igual o superior a 64 milímetros de largo por 22 milímetros de abertura; los palangres deben llevar un dispositivo de señalización en su extremo libre.",
      sustento: "NOM-029-PESC-2006 (DOF: 14/07/2007).",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Del 1 de marzo al 30 de junio de cada año en Tamaulipas, Veracruz y Quintana Roo. Del 15 de mayo al 15 de junio y del 1 al 29 de agosto de cada año en Tabasco, Campeche y Yucatán.",
      sustento: "DOF: 15/05/2014.",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores con motor fuera de borda de hasta 115 caballos de fuerza, 3 pescadores, un palangre o cimbra y redes de enmalle de acuerdo con los numerales 4.4.2.1, 4.4.2.2 y 4.4.2.3. Embarcaciones de mediana altura de 10.5 a 23 metros con palangres de acuerdo con los numerales 4.5.1 y 4.5.2.",
      sustento: "NOM-029-PESC-2006 (DOF: 14/07/2007).",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion: "1,781 embarcaciones menores y 35 mayores.",
      sustento: "Bases de datos de la CONAPESCA.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal de la plataforma continental del Golfo de México y Mar Caribe.",
      sustento: "DOF: 14/07/2007.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Tiburón puntas negras (Carcharhinus limbatus)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Tiburón chato o toro (Carcharhinus leucas)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Cornuda común (Sphyrna lewini)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Cazón de ley o tutzún (Rhizoprionodon terraenovae)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Cazón cabeza de pala (Sphyrna tiburo)",
        zona: "Golfo de México y Mar Caribe",
      },
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Cazón limón o canguay (Carcharhinus acronotus)",
        zona: "Golfo de México y Mar Caribe",
      },
    ],
    estrategia: "No se debe incrementar el esfuerzo pesquero y se deben respetar las épocas de veda.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Veda temporal diferenciada por estado",
      "Regulación del arte de pesca conforme a la NOM-029-PESC-2006",
    ],
  },
  recomendaciones: [
    {
      recomendacion: "Publicar el Plan de Manejo Pesquero de tiburones y rayas del Golfo de México y Mar Caribe.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "No expedir nuevos permisos de pesca comercial, excepto en el caso de que se sustituyan embarcaciones o se renueven permisos.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar el programa de monitoreo y seguimiento de la pesquería mediante el llenado de bitácoras de captura.",
      avance: "Sin información",
    },
  ],
}

fichas["pac-calamar-loligo"] = {
  generalidades: {
    descripcion: [
      "Especie demersal distribuida desde Oregón, Estados Unidos (46°N), hasta Ensenada, Baja California, México (31°N). Su distribución se asocia con la Corriente de California. Habita áreas someras de la plataforma continental, desde 25 hasta 200 metros de profundidad, y se alimenta de peces y poliquetos. Tiene un ciclo de vida corto, de hasta 245 días de edad. En Baja California se han reportado organismos desde 7.5 hasta 22.0 centímetros de longitud del manto. Es de resiliencia alta: su población se duplica en un tiempo mínimo de 238 días. Se captura en aguas marinas de jurisdicción federal de la costa occidental de Baja California, hasta los 31° de latitud norte.",
    ],
    embarcaciones:
      "Embarcación mayor con capacidad de 10 toneladas de registro bruto, operada por hasta 10 pescadores. Puede contar con el apoyo de una embarcación adicional con sistema de iluminación de atracción del calamar. La duración de los viajes de pesca es de una noche.",
    artesPesca: "Red de cerco con jareta y pangón.",
    especiesObjetivo: [{ nombre: "Calamar loligo", cientifico: "Doryteuthis opalescens" }],
  },
  indicadores: {
    embarcaciones: "15",
    datosDestacados: [
      "Las capturas han fluctuado en función de la disponibilidad del recurso en la zona de pesca (costas de Ensenada, Baja California).",
      "El INAPESCA ha documentado que en Ensenada los mayores rendimientos se presentan durante junio y octubre.",
    ],
    capturaPorEstado: [
      {
        titulo: "Captura de calamar loligo en Baja California, 2009–2014",
        series: [
          {
            estado: "Baja California",
            color: "#0891b2",
            datos: [
              { año: 2009, captura: 90 },
              { año: 2010, captura: 350 },
              { año: 2011, captura: 2450 },
              { año: 2012, captura: 800 },
              { año: 2013, captura: 7796 },
              { año: 2014, captura: 2000 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "La abundancia se incrementa en épocas cálidas (verano y otoño) en la región sur de la península de Baja California, y disminuye en años Niño. Su presencia en las pesquerías parece guardar relación con los índices climáticos del Pacífico nororiental. En el periodo 2015-2016 no se registraron capturas significativas debido a una disminución de la abundancia relacionada con factores ambientales.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "No tiene.", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "No tiene.", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca comercial.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion: "Red de cerco con jareta y pangón.",
      sustento: "Permiso de pesca comercial.",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "No aplica.", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcación mayor y embarcación adicional con sistema de iluminación.",
      sustento: "Permiso de pesca comercial.",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion: "15 embarcaciones.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Aguas marinas de jurisdicción federal de la costa occidental de Baja California, hasta los 31° de latitud norte, respetando los lineamientos de la Reserva de la Biosfera Islas del Pacífico de la Península de Baja California (RBIPPBC).",
      sustento: "DOF: 07/12/2016.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Con potencial de desarrollo",
        color: "green",
        especie: "Calamar loligo (Doryteuthis opalescens)",
        zona: "Costa occidental de Baja California",
      },
    ],
    estrategia: "Tasa de aprovechamiento para proteger el stock reproductor.",
    tacticas: ["Control del esfuerzo mediante permisos de pesca"],
  },
  recomendaciones: [
    {
      recomendacion: "Elaborar y publicar la Norma Oficial Mexicana para regular el aprovechamiento.",
      avance: "Sin información",
    },
    {
      recomendacion: "Elaborar y publicar el Plan de Manejo Pesquero para ordenar el aprovechamiento del recurso.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Autorizar permisos de pesca comercial a las embarcaciones que cuentan con permisos de pesca de fomento. La autorización de permisos de pesca comercial adicionales requerirá dictamen técnico del INAPESCA.",
      avance: "Sin información",
    },
    { recomendacion: "Promover el aprovechamiento integral del recurso.", avance: "Sin información" },
    {
      recomendacion:
        "En el caso de observar un porcentaje mayor al 30% de hembras pre-desove, no realizar captura, toda vez que se puede poner en riesgo la viabilidad biológica de la población.",
      avance: "Sin información",
    },
    { recomendacion: "La potencia de las luces de atracción no deberá superar los 30,000 watts.", avance: "Sin información" },
    { recomendacion: "Promover el sistema de información oportuna de los usuarios al INAPESCA.", avance: "Sin información" },
  ],
}

fichas["pac-camaron-del-pacifico"] = {
  generalidades: {
    descripcion: [
      "La pesquería opera con embarcaciones menores en: a) aguas interiores, incluyendo sistemas lagunario-estuarinos del océano Pacífico; b) aguas marinas costeras del centro norte de Sinaloa y aguas marinas costeras de Sonora; y c) aguas marinas del Alto Golfo de California.",
      "Las embarcaciones mayores operan en aguas marinas de jurisdicción federal, desde el Golfo de California hasta el Golfo de Tehuantepec, incluyendo la costa occidental de la península de Baja California.",
    ],
    embarcaciones:
      "Embarcación menor: eslora inferior a 10.5 metros, con o sin motor fuera de borda, con o sin sistema de conservación de la captura a base de hielo y con una autonomía máxima de 3 días; participan 3 pescadores como máximo. Embarcación mayor: eslora superior a 10.5 metros, con motor estacionario, cubierta corrida, arboladura (mástil, pluma real, tangones, pescante), área de maniobras de pesca y puente de mando con equipos de navegación, comunicación, ecodetección y localización satelital, con autonomía mínima de 20 días; participan entre 6 y 8 pescadores.",
    artesPesca:
      "La embarcación menor utiliza atarrayas en sistemas lagunar-estuarinos; red suripera en sistemas lagunar-estuarinos del centro norte de Sinaloa y Bahía Magdalena-Almejas, Baja California Sur; chinchorro de línea en aguas marinas de Sonora, desde el límite con Sinaloa hasta Puerto Peñasco, y en sistemas lagunar-estuarinos de Sonora y del norte de Sinaloa; red de arrastre en aguas marinas de Sinaloa y red de arrastre «Magdalena I» en sistemas lagunar-estuarinos de Bahía Magdalena-Almejas. La embarcación mayor emplea 2 redes de arrastre.",
    especiesObjetivo: [
      { nombre: "Camarón azul", cientifico: "Litopenaeus stylirostris" },
      { nombre: "Camarón blanco", cientifico: "Litopenaeus vannamei" },
      { nombre: "Camarón café", cientifico: "Farfantepenaeus californiensis" },
      { nombre: "Camarón cristal", cientifico: "Farfantepenaeus brevirostris" },
    ],
    especiesAsociadas: [
      { nombre: "Camarón blanco sur", cientifico: "Litopenaeus occidentalis" },
      { nombre: "Camarón siete barbas", cientifico: "Xiphopenaeus riveti" },
      { nombre: "Camarón de roca", cientifico: "Sicyonia disdorsalis" },
      { nombre: "Camarón de roca", cientifico: "Sicyonia penicillata" },
      { nombre: "Camarón cebra", cientifico: "Rimapenaeus faoe" },
      { nombre: "Camarón botalón", cientifico: "Rimapenaeus pacificus" },
    ],
  },
  indicadores: {
    embarcaciones: "850",
    datosDestacados: [
      "En la fauna de acompañamiento se identifican 537 especies: 74% peces y 17% crustáceos.",
      "El camarón se destina al consumo humano directo, preferentemente congelado. El mercado es regional, nacional e internacional (Estados Unidos, Japón y Francia).",
      "El consumo per cápita anual en México es de 1.37 kilogramos.",
      "Se cuenta con 57 plantas procesadoras registradas, 82% localizadas en Sonora, Sinaloa y Baja California.",
      "Proporción de captura por especie 2013-2015 en embarcaciones mayores: café 67%, azul 26%, blanco 5% y cristal 2%. En embarcaciones menores: azul 56%, blanco 33% y café 11%.",
      "El esfuerzo autorizado es de 850 barcos, 93% concentrados en Sinaloa y Sonora.",
    ],
    // Fuente: Avisos de arribo (captura en peso entero).
    capturaPorEstado: [
      {
        titulo: "Captura de camarón en el Pacífico por tipo de flota, 2000–2015 (avisos de arribo)",
        series: [
          {
            estado: "Pacífico (total)",
            color: "#64748b",
            datos: [
              { año: 2000, captura: 34500 },
              { año: 2001, captura: 33000 },
              { año: 2002, captura: 35000 },
              { año: 2003, captura: 31000 },
              { año: 2004, captura: 36500 },
              { año: 2005, captura: 41000 },
              { año: 2006, captura: 51000 },
              { año: 2007, captura: 33000 },
              { año: 2008, captura: 47000 },
              { año: 2009, captura: 36500 },
              { año: 2010, captura: 35000 },
              { año: 2011, captura: 53347 },
              { año: 2012, captura: 36500 },
              { año: 2013, captura: 38000 },
              { año: 2014, captura: 42500 },
              { año: 2015, captura: 31500 },
            ],
          },
          {
            estado: "Embarcaciones mayores",
            color: "#0d9488",
            datos: [
              { año: 2000, captura: 20500 },
              { año: 2001, captura: 21000 },
              { año: 2002, captura: 19500 },
              { año: 2003, captura: 21500 },
              { año: 2004, captura: 18000 },
              { año: 2005, captura: 24500 },
              { año: 2006, captura: 33500 },
              { año: 2007, captura: 19000 },
              { año: 2008, captura: 27500 },
              { año: 2009, captura: 21000 },
              { año: 2010, captura: 18500 },
              { año: 2011, captura: 28000 },
              { año: 2012, captura: 19500 },
              { año: 2013, captura: 19000 },
              { año: 2014, captura: 22000 },
              { año: 2015, captura: 18500 },
            ],
          },
          {
            estado: "Embarcaciones menores",
            color: "#f59e0b",
            datos: [
              { año: 2000, captura: 13500 },
              { año: 2001, captura: 12500 },
              { año: 2002, captura: 12000 },
              { año: 2003, captura: 13500 },
              { año: 2004, captura: 14000 },
              { año: 2005, captura: 16000 },
              { año: 2006, captura: 18500 },
              { año: 2007, captura: 13500 },
              { año: 2008, captura: 19500 },
              { año: 2009, captura: 15000 },
              { año: 2010, captura: 17000 },
              { año: 2011, captura: 25500 },
              { año: 2012, captura: 17000 },
              { año: 2013, captura: 16500 },
              { año: 2014, captura: 20000 },
              { año: 2015, captura: 13000 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Las capturas de camarón azul y blanco disminuyen en años con evento El Niño Oscilación del Sur (ENOS). La abundancia de camarón café y cristal se incrementa cuando se presentan condiciones cálidas en el medio ambiente marino.",
  ],
  normatividad: [
    {
      instrumento: "1. Norma Oficial Mexicana",
      aplica: true,
      disposicion: "NOM-002-SAG/PESC-2013.",
      sustento: "DOF: 11/07/2013.",
    },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "En proceso de elaboración.", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso comercial o concesión de pesca para camarón.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Embarcación mayor: red de arrastre con luz de malla de 50.8 milímetros (2 pulgadas) y de 38.1 milímetros (1½ pulgadas) en el bolso, con dispositivos excluidores de tortugas marinas (DET) y dispositivos excluidores de peces (DEP); la relinga superior no debe exceder los 36.57 metros (120 pies). Embarcación menor: red de arrastre con luz de malla mínima de 44.4 milímetros (1¾ pulgadas) y de 38.1 milímetros (1½ pulgadas) en el bolso, con relinga inferior de un máximo de 18.3 metros (60 pies); atarraya con luz de malla mínima de 37.5 milímetros (1½ pulgadas); red suripera con luz de malla mínima de 31.75 milímetros (1¼ pulgadas); chinchorros de línea con luz de malla mínima de 63.50 milímetros (2½ pulgadas) y longitud máxima de 200 metros, con un encabalgado de entre el 50 y el 70%.",
      sustento:
        "Numerales 4.3.2.1 y 4.3.2.3 y Apéndices Normativos «A», «B» y «C» de la NOM-002-SAG/PESC-2013.",
    },
    {
      instrumento: "6. Veda",
      aplica: true,
      disposicion:
        "Veda temporal para proteger la reproducción y el crecimiento, con fechas variables, generalmente entre marzo y septiembre de cada año.",
      sustento: "Numeral 4.4 de la NOM-002-SAG/PESC-2013. Dictamen técnico del INAPESCA.",
    },
    { instrumento: "7. Cuota", aplica: false, disposicion: "No aplica.", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcaciones mayores y menores.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "9. Esfuerzo actual autorizado",
      aplica: true,
      disposicion: "850 barcos, 93% concentrados en Sinaloa y Sonora.",
      sustento: "Dictamen técnico del INAPESCA.",
    },
    {
      instrumento: "10. Zona de pesca",
      aplica: true,
      disposicion:
        "Embarcaciones menores en: a) aguas interiores, incluyendo sistemas lagunario-estuarinos del océano Pacífico; b) aguas marinas costeras del centro norte de Sinaloa y aguas marinas costeras de Sonora; y c) aguas marinas del Alto Golfo de California. Embarcaciones mayores en aguas marinas de jurisdicción federal, desde el Golfo de California hasta el Golfo de Tehuantepec, incluyendo la costa occidental de la península de Baja California. En todos los casos se deberán considerar los lineamientos normativos establecidos en los programas de manejo de las Reservas de la Biosfera Islas del Pacífico de la Península de Baja California y El Vizcaíno, la Reserva de la Biosfera Alto Golfo de California y Delta del Río Colorado, y el Acuerdo mediante el cual se establece el área de refugio para la protección de la vaquita (Phocoena sinus).",
      sustento: "NOM-002-SAG/PESC-2013. DOF: 07/12/2016, 01/09/2000, 25/09/2009 y 08/09/2005.",
    },
  ],
  status: {
    cards: [
      {
        categoria: "Aprovechado al máximo sustentable",
        color: "yellow",
        especie: "Camarón (Litopenaeus spp., Farfantepenaeus spp.)",
        zona: "Litoral del Pacífico",
      },
    ],
    estrategia: "Mantener una biomasa mínima reproductora al final de la temporada de pesca.",
    tacticas: [
      "Control del esfuerzo pesquero",
      "Veda reproductiva y de crecimiento espacio-temporal variable",
      "Regulaciones en el arte de pesca",
    ],
  },
  recomendaciones: [
    {
      recomendacion: "Elaborar y publicar el Plan de Manejo Pesquero para ordenar el aprovechamiento del recurso.",
      avance: "Sin información",
    },
    { recomendacion: "No incrementar el esfuerzo.", avance: "Sin información" },
    {
      recomendacion: "Promover el mejoramiento en la calidad de la información proporcionada por los usuarios.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Fortalecer las acciones de inspección y vigilancia a efecto de hacer efectivas las medidas de manejo de la pesquería.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Fomentar la participación obligatoria de los usuarios en los programas de investigación y muestreo de camarón.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Implementar un programa de monitoreo y seguimiento de la pesquería que permita evaluar su impacto, bajo la coordinación y supervisión del INAPESCA.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Constituir un Comité Pesquero como mecanismo de coordinación y coadyuvancia para la administración.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Modificar la NOM-002-SAG/PESC-2013 para incluir la red suripera como arte de pesca autorizado para la pesca de camarón en el Alto Golfo de California.",
      avance: "Sin información",
    },
  ],
}

fichas["gm-sargazo-holopelagico-del-caribe"] = {
  generalidades: {
    descripcion: [
      "El sargazo (género Sargassum) es una macroalga marina que pertenece al grupo de las algas cafés o pardas, presenta la mayor complejidad morfológica del grupo y habita en los mares de latitudes tropicales, subtropicales y templadas de todo el mundo. El cuerpo del alga (talo) es de tipo arbustivo y se compone de estructuras como el cauloide, que corresponde a los ejes del talo; el filoide, que corresponde a la parte del talo en forma de hojas o láminas que se insertan en los ejes; y la vesícula, llamada también pneumatocisto o aerocisto, una estructura esférica llena de aire que permite la flotación del talo. Las formas más comunes de Sargassum holopelágico encontradas en el Atlántico son: Sargassum natans I, que muestra los característicos apéndices en forma de espina en las vesículas; Sargassum fluitans III, que muestra espinas características en el eje; y S. natans VIII, que no muestra apéndices espinosos ni espinas.",
      "Se reconocen 358 nombres de especies de sargazo aceptados taxonómicamente, con diferentes vías reproductivas (sexual y asexual) y tipos de vida: especies bentónicas (individuos adheridos al fondo marino) y holopelágicas (individuos flotantes). En el océano Atlántico existen más de 60 especies bentónicas y dos holopelágicas —Sargassum natans y S. fluitans—, ambas documentadas en México, con tres morfotipos o ecotipos registrados para la región mexicana. Las especies holopelágicas se reproducen vegetativamente mediante crecimiento y fragmentación; debido a que sus requerimientos de nitrógeno y fósforo son mínimos, encuentran oportunidades de crecimiento en aguas ligeramente enriquecidas en zonas frontales o plumas de ríos. Bajo condiciones óptimas de luz, temperatura y salinidad, estas especies son capaces de crecer mucho más rápido, llegando a duplicar su biomasa en el transcurso de 9 a 20 días.",
      "Tradicionalmente, en el océano Atlántico las principales fuentes de sargazo holopelágico eran las originadas en el mar de los Sargazos y el Golfo de México. Sin embargo, su distribución y abundancia han cambiado con la formación del «Gran Cinturón de Sargazo del Atlántico» (GASB, por sus siglas en inglés), fuente desarrollada recientemente más al sur, en la Región de Recirculación Ecuatorial del Norte (NERR, por sus siglas en inglés), entre Brasil y África occidental. A partir de ello se han reportado grandes cantidades de sargazo holopelágico en el Atlántico central y el mar Caribe. De manera natural, el sargazo forma agregaciones superficiales conocidas como balsas neustónicas, de forma más o menos circular (parches) o de largas líneas (hileras), que pueden alcanzar decenas de metros de ancho —hasta 50 metros, con un área de 2,000 metros cuadrados— y estar rodeadas por las aguas del mar abierto. Estas balsas viajan con las corrientes oceánicas, influenciadas también por los vientos superficiales, y pueden acumularse a lo largo de regiones persistentes de convergencia superficial. En mar abierto, las grandes acumulaciones de sargazo holopelágico forman un ecosistema marino único e insustituible que contribuye a la fijación de carbono y a la bioabsorción de metales pesados, y proporciona refugio, fondeadero, alimento y rutas de migración a diferentes especies marinas. Por ello se recomienda que la recolección del recurso se realice con base en los lineamientos técnicos establecidos por la autoridad mexicana, mediante una embarcación sargacera con aditamentos para la remoción de organismos.",
      "La deposición de sargazo en las costas del territorio continental e islas, en pequeñas cantidades, ayuda a prevenir la erosión costera y aporta nutrientes para la vegetación de dunas. Por otra parte, las grandes biomasas existentes de sargazo holopelágico se consideran un recurso natural potencialmente explotable, que puede utilizarse como materia prima para la producción de complemento alimenticio en la cría de animales, fertilizantes, biocombustibles, bioplásticos, biorremediadores y purificadores para el tratamiento de aguas, fibras y tintes para la industria textil y del calzado, y biomateriales para la elaboración de ladrillos, entre otros.",
    ],
    embarcaciones:
      "Embarcación sargacera equipada con sistema para recolección de sargazo. El Buque Sargacero Oceánico diseñado por la Secretaría de Marina, denominado ARM Natans BSO-101, tiene una eslora de 43.80 metros, una manga de 9.44 metros y un calado máximo de 3.56 metros, con una capacidad de recolección de 250 toneladas de sargazo; por sus características puede permanecer en altamar hasta cinco días.",
    artesPesca:
      "Sistema de recolección de sargazo compuesto por maquinaria y bandas recolectoras instaladas en la embarcación sargacera.",
    especiesObjetivo: [
      { nombre: "Sargazo", cientifico: "Sargassum natans I" },
      { nombre: "Sargazo", cientifico: "Sargassum natans VIII" },
      { nombre: "Sargazo", cientifico: "Sargassum fluitans III" },
    ],
    // Tabla 2 de la ficha: fauna asociada a las balsas neustónicas de sargazo holopelágico en el
    // Caribe mexicano. El nombre común se sustituye por el grupo taxonómico, que es lo que
    // registra el documento; se marcan las especies de valor comercial.
    especiesAsociadas: [
      { nombre: "Annelida", cientifico: "Platynereis dumerilii" },
      { nombre: "Arthropoda", cientifico: "Anoplodactylus petiolatus" },
      { nombre: "Arthropoda", cientifico: "Axiidea" },
      { nombre: "Arthropoda", cientifico: "Belzebub faxoni" },
      { nombre: "Arthropoda", cientifico: "Biancolina brassicacephala" },
      { nombre: "Arthropoda", cientifico: "Carpias minutus" },
      { nombre: "Arthropoda", cientifico: "Cumella sp." },
      { nombre: "Arthropoda", cientifico: "Discoconchoecia sp." },
      { nombre: "Arthropoda", cientifico: "Eupronoe maculata" },
      { nombre: "Arthropoda", cientifico: "Halobates (Halobates) micans" },
      { nombre: "Arthropoda", cientifico: "Hyale sp." },
      { nombre: "Arthropoda", cientifico: "Latreutes fucorum" },
      { nombre: "Arthropoda", cientifico: "Leander tenuicornis" },
      { nombre: "Arthropoda", cientifico: "Lucifer typus" },
      { nombre: "Arthropoda", cientifico: "Lycaeopsis themistoides" },
      { nombre: "Arthropoda", cientifico: "Parapronoe parva" },
      { nombre: "Arthropoda", cientifico: "Periclimenes sp." },
      { nombre: "Arthropoda", cientifico: "Porcellanidae" },
      { nombre: "Arthropoda", cientifico: "Portunus sayi" },
      { nombre: "Arthropoda", cientifico: "Probopyrinella latreuticola" },
      { nombre: "Arthropoda", cientifico: "Sapphirina sp." },
      { nombre: "Arthropoda", cientifico: "Sunamphitoe pelagica" },
      { nombre: "Arthropoda", cientifico: "Synopia sp." },
      { nombre: "Chaetognatha", cientifico: "Sagitta sp." },
      { nombre: "Chordata", cientifico: "Brama sp." },
      { nombre: "Chordata (valor comercial)", cientifico: "Canthidermis maculata" },
      { nombre: "Chordata (valor comercial)", cientifico: "Canthidermis sufflamen" },
      { nombre: "Chordata (valor comercial)", cientifico: "Caranx bartholomaei" },
      { nombre: "Chordata (valor comercial)", cientifico: "Caranx crysos" },
      { nombre: "Chordata", cientifico: "Cheilopogon sp." },
      { nombre: "Chordata", cientifico: "Clupea sp." },
      { nombre: "Chordata (valor comercial)", cientifico: "Coryphaena equiselis" },
      { nombre: "Chordata (valor comercial)", cientifico: "Coryphaena hippurus" },
      { nombre: "Chordata (valor comercial)", cientifico: "Diodon holocanthus" },
      { nombre: "Chordata (valor comercial)", cientifico: "Elagatis bipinnulata" },
      { nombre: "Chordata", cientifico: "Hemiramphus sp." },
      { nombre: "Chordata", cientifico: "Hirundichthys sp." },
      { nombre: "Chordata", cientifico: "Histrio histrio" },
      { nombre: "Chordata (valor comercial)", cientifico: "Seriola dumerili" },
      { nombre: "Chordata", cientifico: "Stephanolepis hispida" },
      { nombre: "Chordata", cientifico: "Stephanolepis setifer" },
      { nombre: "Chordata", cientifico: "Syngnathus typhle" },
      { nombre: "Chordata (valor comercial)", cientifico: "Trachurus lathami" },
      { nombre: "Mollusca", cientifico: "Cavolinia tridentata" },
      { nombre: "Mollusca", cientifico: "Litiopa melanostoma" },
      { nombre: "Mollusca", cientifico: "Styliola subula" },
      { nombre: "Nematoda", cientifico: "Nematoda" },
      { nombre: "Nemertea", cientifico: "Nemertea" },
      { nombre: "Platyhelminthes", cientifico: "Gnesioceros sargassicola" },
    ],
  },
  indicadores: {
    datosDestacados: [
      "Las estimaciones de biomasa total existente de sargazo holopelágico en el Caribe mexicano —el que llega a las playas— han oscilado entre 13,207.9 y 63,252.7 toneladas durante el periodo 2018-2024.",
      "El valor máximo de biomasa se registró en 2022 con 63,252.7 toneladas, seguido de 2018 con 54,197.5 y 2019 con 50,935.8. Los valores mínimos corresponden a 2023 y 2024, con 28,441.2 y 13,207.9 toneladas respectivamente.",
      "Los valores de biomasa muestran un comportamiento diferente cada año, con mínimos y máximos en distintos meses: en 2018 la mayor biomasa se presentó entre julio y agosto, y en 2022 entre abril y mayo. De manera general, el periodo de mayor biomasa se encuentra entre abril y agosto.",
      "Volúmenes de sargazo flotante detectados en imágenes satelitales Landsat (volumen húmedo promedio, km³): 4,021 en 2016; 1,871 en 2017; 19,063 en 2018; 14,207 en 2019 y 48,834 en 2020. El volumen seco promedio anual equivale a 402, 187, 1,906, 1,421 y 4,883 km³, respectivamente.",
    ],
    // Biomasa de sargazo holopelágico que arriba a las playas del Caribe mexicano. La ficha sólo
    // cita los años 2018, 2019 y 2022-2024; 2020 y 2021 no aparecen en el documento.
    capturaPorEstado: [
      {
        titulo: "Biomasa estimada de sargazo holopelágico que arriba al Caribe mexicano, 2018–2024",
        series: [
          {
            estado: "Caribe mexicano",
            color: "#0d9488",
            datos: [
              { año: 2018, captura: 54198 },
              { año: 2019, captura: 50936 },
              { año: 2022, captura: 63253 },
              { año: 2023, captura: 28441 },
              { año: 2024, captura: 13208 },
            ],
          },
        ],
      },
    ],
  },
  ambiente: [
    "Las causas que contribuyen a estas afluencias y su origen son multifacéticas y complejas. Entre ellas se encuentran el aumento de la temperatura superficial del mar, el aporte de nutrientes de múltiples fuentes, los regímenes de viento anormales de 2009 a 2010 en el Atlántico central oriental, el cambio en los patrones de surgencia frente a la costa noreste de África y en mar abierto, los cambios en los patrones de dispersión del polvo del Sahara, los cambios en la capa de mezcla relacionados con el suministro de nutrientes, o el resultado de todas estas causas en conjunto.",
    "Las costas del Caribe mexicano son particularmente susceptibles a las afluencias de sargazo holopelágico debido a que la península de Yucatán crea una barrera frontal al transporte hacia el oeste inducido por la corriente de Caimán y los vientos.",
  ],
  normatividad: [
    { instrumento: "1. Norma Oficial Mexicana", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "2. Plan de Manejo Pesquero", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "3. Tipo de acceso",
      aplica: true,
      disposicion: "Permiso de pesca de fomento.",
      sustento:
        "Artículo 24, fracción III de la LGPAS (DOF: 01/04/2024). Reglamento de la Ley de Pesca, artículo 20 sobre la pesca de fomento y sus respectivos lineamientos, enmarcados en el Capítulo III, artículos 69 al 78 (DOF: 28/01/2004).",
    },
    { instrumento: "4. Talla mínima", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "5. Arte de pesca y método de captura",
      aplica: true,
      disposicion:
        "Buque Sargacero Oceánico diseñado por la Secretaría de Marina y denominado ARM Natans BSO-101, con una eslora de 43.80 metros, una manga de 9.44 metros y un calado máximo de 3.56 metros, con capacidad de recolección de 250 toneladas de sargazo; por sus características puede permanecer en altamar hasta cinco días. Está equipado con un sistema de recolección de sargazo compuesto por maquinaria y bandas recolectoras.",
      sustento: "Ficha Técnica Buque Sargacero Oceánico (SEMAR, 01/04/2022).",
    },
    { instrumento: "6. Veda", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "7. Cuota", aplica: false, disposicion: "", sustento: "" },
    {
      instrumento: "8. Unidad de pesca",
      aplica: true,
      disposicion: "Embarcación sargacera equipada con sistema para recolección de sargazo.",
      sustento: "Ficha Técnica Buque Sargacero Oceánico (SEMAR, 01/04/2022).",
    },
    { instrumento: "9. Esfuerzo nominal autorizado", aplica: false, disposicion: "", sustento: "" },
    { instrumento: "10. Zona de pesca", aplica: false, disposicion: "", sustento: "" },
  ],
  status: {
    cards: [
      {
        categoria: "Con potencial de desarrollo",
        color: "green",
        especie: "Sargazo holopelágico (Sargassum natans, S. fluitans)",
        zona: "Caribe mexicano",
      },
    ],
    estrategia:
      "El volumen calculado del promedio anual de sargazo flotante en la región del Caribe occidental, considerando datos de imágenes satelitales Landsat de alta resolución (30 × 30 kilómetros de píxel) de enero de 2016 a diciembre de 2020, es de 29,835 km³/año, si bien hay una variabilidad considerable tanto entre años como entre meses de un mismo año. El cálculo se realiza considerando que el sargazo flotante se encuentra expandido y que su volumen podría reducirse a una tercera parte al ser recolectado, lo que equivale a un volumen húmedo recolectado de aproximadamente 9,945 km³/año (9,945,000 toneladas); el sargazo húmedo recolectado se seca y en el proceso se reduce en una razón de 10:1. Por lo anterior, su estatus de forma precautoria es con potencial de desarrollo y se propone un aprovechamiento anual de 945 km³/año (945,000 toneladas). La estrategia de manejo es la cuota de captura por temporada de pesca.",
    tacticas: ["Por desarrollar"],
  },
  recomendaciones: [
    {
      recomendacion:
        "Investigación e innovación tecnológica: desarrollar investigación científica e innovación tecnológica para el desarrollo de artes y métodos de pesca que permitan buenas capturas minimizando la fauna de acompañamiento, y una adecuada regulación de las artes y métodos de pesca. Desarrollar estudios para conocer la biomasa del recurso y establecer los puntos de referencia correspondientes; dada la alta variabilidad en el arribo de sargazo, los estimadores de biomasa deberán considerar análisis de riesgo e incertidumbre para proponer escenarios.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Gobernanza: desarrollar y fortalecer la ordenación pesquera del sargazo holopelágico en las zonas marinas mexicanas con base en el desarrollo de la normatividad e instrumentos de política y manejo pesquero, tales como dictámenes técnicos y el Plan de Manejo Pesquero correspondiente. Es importante que el proceso de gobernanza sea participativo, con base en los productores y con participación de los gobiernos municipal, estatal y federal en sus diferentes ámbitos de competencia, con apoyo del sector académico.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Estrategias y tácticas de manejo: utilizar la información derivada de los permisos de pesca de fomento para el establecimiento de la cuota de captura por temporada de pesca. Es necesario proponer y evaluar la eficiencia y el rendimiento de la unidad de pesca para definir el esfuerzo nominal encaminado al control del esfuerzo pesquero.",
      avance: "Sin información",
    },
    {
      recomendacion:
        "Gestión del conocimiento: desarrollar e implementar el enfoque de Manejo Integrado de Zonas Costeras (MIZC) a través de la información generada mediante permisos de pesca de fomento.",
      avance: "Sin información",
    },
  ],
}

// Adjunta cada ficha a su especie: `especie.ficha` es la fuente única del detalle.
for (const especie of especies) {
  especie.ficha = fichas[especie.id]
}
