// Vínculos de cada pesquería con sus vedas (lib/vedas-data.ts) y con los documentos
// de la biblioteca normativa (lib/normativas-data.ts): NOM, planes de manejo y zonas
// de refugio pesquero. Se curan a mano, por id, a partir de lo que cita la sección
// de normatividad de cada ficha de la CNP: un emparejamiento automático por nombre
// confunde, por ejemplo, las vedas de lisa del Pacífico con las del Golfo.
//
// Sólo se listan pesquerías con ficha; las que no aparecen no tienen vínculos.

import { documents, type DocumentItem } from "@/lib/normativas-data"
import { vedasData, type VedaData } from "@/lib/vedas-data"

interface VinculoPesqueria {
  vedas?: string[] // ids de vedasData
  documentos?: string[] // ids de documents (NOM, planes y ZRP)
}

export const vinculos: Record<string, VinculoPesqueria> = {
  // Golfo de México y Mar Caribe
  "mero-negrillo": { vedas: ["117"], documentos: ["102", "31"] },
  "pepino-mar": { vedas: ["29", "30"], documentos: ["34"] },
  "pez-espada": { vedas: ["39"], documentos: ["75"] },
  "camaron-cafe": { vedas: ["6", "145", "146"], documentos: ["56", "99", "22"] },
  "camaron-rojo-roca": { vedas: ["8"], documentos: ["56", "99", "23"] },
  caracoles: { vedas: ["11", "12", "13", "14", "15", "79", "80", "81"], documentos: ["69", "25", "50"] },
  langostinos: { documentos: ["97"] },
  pulpo: { vedas: ["123", "124", "125"], documentos: ["66", "35"] },
  "robalo-chucumite": { vedas: ["129", "130"], documentos: ["80", "84", "36"] },
  "gm-camaron-rosado-del-golfo-de-mexico": { vedas: ["5", "146"], documentos: ["56", "99", "24", "39"] },
  "gm-ostion-del-golfo-de-mexico": { vedas: ["121"], documentos: ["71"] },
  "gm-langosta-del-golfo-de-mexico-y-mar-caribe": {
    vedas: ["101", "102", "103"],
    documentos: ["64", "29", "40", "41", "47", "50"],
  },
  "gm-lisa-y-liseta-o-lebrancha-del-golfo-de-mexico": {
    vedas: ["108", "109", "112", "113"],
    documentos: ["72", "30"],
  },
  "gm-rayas-del-golfo-de-mexico": { documentos: ["78", "9"] },
  "gm-tiburones-del-golfo-de-mexico-y-mar-caribe": {
    vedas: ["131", "132", "40", "41", "42"],
    documentos: ["78", "9"],
  },

  // Litoral del Pacífico
  "pac-abulon": { vedas: ["57", "58", "59", "60"], documentos: ["63", "46"] },
  "pac-almeja-catarina": { vedas: ["61"], documentos: ["62"] },
  "pac-almeja-chocolata": { vedas: ["63"], documentos: ["11"] },
  "pac-almeja-generosa": { vedas: ["64"], documentos: ["70"] },
  "pac-callo-de-hacha": { vedas: ["73", "74", "75", "76", "77", "78"] },
  "pac-curvina-golfina": { vedas: ["84"], documentos: ["100", "26"] },
  "pac-dorado-pesca-deportiva": { vedas: ["33", "34", "35", "38"], documentos: ["73"] },
  "pac-erizo-de-mar": { vedas: ["85"], documentos: ["65", "27"] },
  "pac-huachinango-y-pargos-del-pacifico": { documentos: ["12"] },
  "pac-jaiba-del-pacifico": { vedas: ["86", "87", "88"], documentos: ["86", "28"] },
  "pac-langostas-espinosas-del-pacifico": {
    vedas: ["89", "90", "92", "93", "95", "96", "98", "99"],
    documentos: ["64"],
  },
  "pac-langostino": { vedas: ["104", "105"] },
  "pac-lisa-del-pacifico": { vedas: ["106", "107", "110", "111"], documentos: ["72"] },
  "pac-ostion-del-pacifico": { vedas: ["118", "119", "120"] },
  "pac-pulpo-del-pacifico": { vedas: ["126", "127"], documentos: ["10"] },
  "pac-robalo-del-pacifico": { documentos: ["97", "101", "12"] },
  "pac-tiburones-del-pacifico": { vedas: ["133", "128", "40", "41", "42"], documentos: ["78"] },
  "pac-tunidos-del-pacifico": { vedas: ["65", "66"], documentos: ["55", "74", "19", "13"] },
  "pac-verdillo": { documentos: ["16"] },
  "pac-calamar-gigante": { documentos: ["20"] },
  "pac-marlin-pesca-deportiva": { vedas: ["33", "34", "35", "37"], documentos: ["73"] },
  "pac-pelagicos-menores": { documentos: ["61", "32", "33"] },
  "pac-camaron-del-pacifico": { vedas: ["144"], documentos: ["56"] },
}

export interface VinculosResueltos {
  vedas: VedaData[]
  noms: DocumentItem[]
  planes: DocumentItem[]
  zrp: DocumentItem[]
}

const vedaPorId = new Map(vedasData.map((v) => [v.id, v]))
const documentoPorId = new Map(documents.map((d) => [d.id, d]))

export function vinculosDe(especieId: string): VinculosResueltos {
  const v = vinculos[especieId]
  const vedas = (v?.vedas ?? []).map((id) => vedaPorId.get(id)).filter((x): x is VedaData => !!x)
  const docs = (v?.documentos ?? [])
    .map((id) => documentoPorId.get(id))
    .filter((x): x is DocumentItem => !!x)
  return {
    vedas,
    noms: docs.filter((d) => d.category === "noms"),
    planes: docs.filter((d) => d.category === "planes"),
    zrp: docs.filter((d) => d.category === "zrp"),
  }
}
