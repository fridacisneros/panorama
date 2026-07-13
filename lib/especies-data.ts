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
  { id: "pac-abulon", nombre: "Abulón", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-almeja-blanca-o-mantequilla", nombre: "Almeja blanca o mantequilla", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-almeja-catarina", nombre: "Almeja catarina", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-almeja-chocolata", nombre: "Almeja chocolata", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-almeja-concha-espina", nombre: "Almeja concha espina", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-almeja-generosa", nombre: "Almeja generosa", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-almeja-pata-de-mula", nombre: "Almeja pata de mula", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-almeja-ronosa", nombre: "Almeja roñosa", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-botete", nombre: "Botete", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-callo-de-hacha", nombre: "Callo de hacha", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-caracol-chino", nombre: "Caracol chino", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-caracol-panocha", nombre: "Caracol panocha", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-cucaracha-de-mar", nombre: "Cucaracha de mar", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-curvina-golfina", nombre: "Curvina golfina", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-dorado-pesca-deportiva", nombre: "Dorado (Pesca deportiva)", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-erizo-de-mar", nombre: "Erizo de mar", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-huachinango-y-pargos-del-pacifico", nombre: "Huachinango y pargos del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-jaiba-del-pacifico", nombre: "Jaiba del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-langostas-espinosas-del-pacifico", nombre: "Langostas espinosas del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-langostino", nombre: "Langostino", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-lisa-del-pacifico", nombre: "Lisa del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-medusa-bola-de-canon", nombre: "Medusa bola de cañón", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-mejillon", nombre: "Mejillón", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-ostion-del-pacifico", nombre: "Ostión del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-pepino-de-mar-del-pacifico", nombre: "Pepino de mar del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-pulpo-del-pacifico", nombre: "Pulpo del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-robalo-del-pacifico", nombre: "Robalo del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-sierra-del-pacifico", nombre: "Sierra del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-tiburones-del-pacifico", nombre: "Tiburones del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
  { id: "pac-tunidos-del-pacifico", nombre: "Túnidos del Pacífico", region: "Litoral del Pacífico", ultimaActualizacion: 2023 },
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
