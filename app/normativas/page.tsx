"use client"

import { useState, useMemo } from "react"
import { Search, Download, Eye, FileText, Scale, Clipboard, Map } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DocumentItem {
  id: string
  title: string
  type: string
  category: "leyes" | "noms" | "planes" | "zrp" | "cnp"
  description: string
  date: string
  tags: string[]
  url: string
}

const documents: DocumentItem[] = [
  // Leyes y Reglamentos
  {
    id: "1",
    title: "Ley General del Equilibrio Ecológico y la Protección al Ambiente (LGEEPA)",
    type: "PDF",
    category: "leyes",
    description: "Marco jurídico que establece las bases para la preservación y restauración del equilibrio ecológico, así como la protección al ambiente",
    date: "2022-04-28",
    tags: ["Ley", "Equilibrio Ecológico", "Protección Ambiental", "LGEEPA"],
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGEEPA.pdf"
  },
  {
    id: "2",
    title: "Ley General de Pesca y Acuacultura Sustentables (LGPAS)",
    type: "PDF",
    category: "leyes",
    description: "Marco jurídico general que regula la actividad pesquera y acuícola en México",
    date: "2022-12-07",

    tags: ["Ley", "Pesca", "Acuacultura", "Sustentabilidad", "LGPAS"],
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPAS.pdf"
  },
  {
    id: "3",
    title: "Ley General de Vida Silvestre (LGVS)",
    type: "PDF",
    category: "leyes",
    description: "Regulación para la conservación y aprovechamiento sustentable de la vida silvestre y su hábitat",
    date: "2021-05-20",
    tags: ["Ley", "Vida Silvestre", "Conservación", "LGVS"],
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGVS.pdf"
  },
  {
    id: "4",
    title: "Ley General de Bienes Nacionales",
    type: "PDF",
    category: "leyes",
    description: "Marco jurídico que regula la administración y disposición de los bienes del dominio público y privado de la nación",
    date: "2025-07-16",
    tags: ["Ley", "Bienes Nacionales", "Dominio Público"],
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGBN.pdf"
  },
  {
    id: "5",
    title: "Ley Federal del Mar",
    type: "PDF",
    category: "leyes",
    description: "Regulación del aprovechamiento de los recursos marinos y la delimitación de zonas marinas mexicanas",
    date: "1986-01-08",
    tags: ["Ley", "Mar", "Recursos Marinos", "Zonas Marinas"],
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/124.pdf"
  },
  {
    id: "6",
    title: "Ley de Aguas Nacionales",
    type: "PDF",
    category: "leyes",
    description: "Marco jurídico que regula la explotación, uso o aprovechamiento de las aguas nacionales",
    date: "2023-05-08",
    tags: ["Ley", "Aguas Nacionales", "Recursos Hídricos"],
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LAN.pdf"
  },
  {
    id: "7",
    title: "Reglamento de la Ley de Pesca",
    type: "PDF",
    category: "leyes",
    description: "Reglamento que establece las disposiciones para la aplicación de la Ley de Pesca",
    date: "2004-01-28",
    tags: ["Reglamento", "Pesca", "Aplicación"],
    url: "https://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LPesca.pdf"
  },
  {
    id: "8",
    title: "Reglamento de la Ley General de Vida Silvestre",
    type: "PDF",
    category: "leyes",
    description: "Reglamento que establece las disposiciones para la aplicación de la LGVS",
    date: "2014-05-09",
    tags: ["Reglamento", "Vida Silvestre", "LGVS"],
    url: "https://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LGVS.pdf"
  },
  // Planes de Manejo Pesquero
  {
    id: "9",
    title: "Plan de Manejo Pesquero - Tiburones y Rayas del Golfo de México y Mar Caribe",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero para la conservación y aprovechamiento sustentable de tiburones y rayas",
    date: "2022-06-09",
    tags: ["Plan de Manejo", "Tiburones", "Rayas", "Golfo de México", "Mar Caribe"],
    url: "https://www.gob.mx/imipas/documentos/pmp-para-tiburones-y-rayas-del-golfo-de-mexico"
  },
  {
    id: "10",
    title: "Plan de Manejo Pesquero - Pulpo en la Costa Oriental de Baja California",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero para el pulpo en la costa oriental de Baja California",
    date: "2022-02-15",
    tags: ["Plan de Manejo", "Pulpo", "Baja California", "Costa Oriental"],
    url: "https://www.gob.mx/imipas/documentos/97664"
  },
  {
    id: "11",
    title: "Plan de Manejo Pesquero - Almeja Chocolata en Loreto, BCS",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de almeja chocolata en el municipio de Loreto, Baja California Sur",
    date: "2022-01-26",
    tags: ["Plan de Manejo", "Almeja Chocolata", "Loreto", "Baja California Sur"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-almeja-chocolata-en-el-municipio-de-loreto-baja-california-sur"
  },
  {
    id: "12",
    title: "Plan de Manejo Pesquero - Robalo Garabato, Pargo Colorado y Curvinas",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero en marismas nacionales, Nayarit y Sinaloa",
    date: "2021-04-12",
    tags: ["Plan de Manejo", "Robalo Garabato", "Pargo Colorado", "Curvinas", "Nayarit", "Sinaloa"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-robalo-garabato-pargo-colorado-y-curvinas"
  },
  {
    id: "13",
    title: "Plan de Manejo Pesquero - Atún Aleta Azul en el Pacífico Oriental",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero para atún aleta azul en el Pacífico Oriental",
    date: "2021-04-07",
    tags: ["Plan de Manejo", "Atún", "Aleta Azul", "Pacífico Oriental"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-para-atun-aleta-azul"
  },
  {
    id: "14",
    title: "Plan de Manejo Pesquero - Presa Ignacio Allende, San Miguel de Allende",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de la Presa Ignacio Allende, municipio de San Miguel de Allende, Guanajuato",
    date: "2021-03-05",
    tags: ["Plan de Manejo", "Presa Ignacio Allende", "San Miguel de Allende", "Guanajuato"],
    url: "https://www.gob.mx/imipas/documentos/pmp-presa-ignacio-allende"
  },
  {
    id: "15",
    title: "Plan de Manejo Pesquero - Presa Cebolletas",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de la Presa Cebolletas",
    date: "2021-03-04",
    tags: ["Plan de Manejo", "Presa Cebolletas"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-la-presa-cebolletas"
  },
  {
    id: "16",
    title: "Plan de Manejo Pesquero - Verdillo en la Península de Baja California",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero para verdillo (Paralabrax nebulifer) en la Península de Baja California",
    date: "2021-03-01",
    tags: ["Plan de Manejo", "Verdillo", "Paralabrax nebulifer", "Península de Baja California"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-para-verdillo-en-la-peninsula-de-baja-california"
  },
  {
    id: "17",
    title: "Plan de Manejo Pesquero - Sistema Lagunar Altata-Ensenada del Pabellón",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero ecosistémico del Sistema Lagunar Altata-Ensenada del Pabellón, Sinaloa",
    date: "2019-09-25",
    tags: ["Plan de Manejo", "Sistema Lagunar", "Altata", "Ensenada del Pabellón", "Sinaloa", "Ecosistémico"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-ecosistemico-del-sistema-lagunar-altata-ensenada-del-pabellon-sinaloa"
  },
  {
    id: "18",
    title: "Plan de Manejo Pesquero - Atún Aleta Amarilla en el Golfo de México",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de atún aleta amarilla en el Golfo de México",
    date: "2015-05-11",
    tags: ["Plan de Manejo", "Atún", "Aleta Amarilla", "Golfo de México"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-atun-aleta-amarilla-en-el-golfo-de-mexico"
  },
  {
    id: "19",
    title: "Plan de Manejo Pesquero - Atún Aleta Amarilla del Océano Pacífico",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de atún aleta amarilla del Océano Pacífico Mexicano",
    date: "2014-07-16",
    tags: ["Plan de Manejo", "Atún", "Aleta Amarilla", "Océano Pacífico"],
    url: "https://www.gob.mx/imipas/documentos/atun-aleta-amarilla-del-oceano-pacifico"
  },
  {
    id: "20",
    title: "Plan de Manejo Pesquero - Calamar Gigante",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de calamar gigante",
    date: "2014-07-14",
    tags: ["Plan de Manejo", "Calamar Gigante"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-calamar-gigante"
  },
  {
    id: "21",
    title: "Plan de Manejo Pesquero - Camarón Siete Barbas",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de camarón siete barbas en Campeche y Tabasco",
    date: "2014-03-31",
    tags: ["Plan de Manejo", "Camarón", "Siete Barbas", "Campeche", "Tabasco"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-camaron-siete-barbas"
  },
  {
    id: "22",
    title: "Plan de Manejo Pesquero - Camarón Café y Blanco",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de camarón café y camarón blanco de Tamaulipas y Veracruz",
    date: "2014-03-12",
    tags: ["Plan de Manejo", "Camarón", "Café", "Blanco", "Tamaulipas", "Veracruz"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-camaron-cafe-y-blanco"
  },
  {
    id: "23",
    title: "Plan de Manejo Pesquero - Camarón Rojo y de Roca",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de camarón rojo y camarón de roca de los Caladeros de Contoy, Quintana Roo",
    date: "2014-03-25",
    tags: ["Plan de Manejo", "Camarón", "Rojo", "Roca", "Contoy", "Quintana Roo"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-camaron-rojo-y-camaron-de-roca"
  },
  {
    id: "24",
    title: "Plan de Manejo Pesquero - Camarón Rosado",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de camarón rosado en la Sonda de Campeche",
    date: "2014-03-28",
    tags: ["Plan de Manejo", "Camarón", "Rosado", "Sonda de Campeche"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-camaron-rosado"
  },
  {
    id: "25",
    title: "Plan de Manejo Pesquero - Caracol del Litoral de Campeche",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de caracol del litoral del Estado de Campeche",
    date: "2014-03-25",
    tags: ["Plan de Manejo", "Caracol", "Litoral", "Campeche"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-caracol-del-litoral-del-estado-de-campeche"
  },
  {
    id: "26",
    title: "Plan de Manejo Pesquero - Curvina Golfina",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de curvina golfina del Golfo de California",
    date: "2012-12-06",
    tags: ["Plan de Manejo", "Curvina Golfina", "Golfo de California"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-curvina-golfina"
  },
  {
    id: "27",
    title: "Plan de Manejo Pesquero - Erizo de Mar",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de erizo rojo y morado",
    date: "2012-12-20",
    tags: ["Plan de Manejo", "Erizo", "Rojo", "Morado"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-erizo-rojo-y-morado"
  },
  {
    id: "28",
    title: "Plan de Manejo Pesquero - Jaiba de Sinaloa y Sonora",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de jaiba de Sinaloa y Sonora",
    date: "2014-07-15",
    tags: ["Plan de Manejo", "Jaiba", "Sinaloa", "Sonora"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-jaiba-de-sinaloa-y-sonora"
  },
  {
    id: "29",
    title: "Plan de Manejo Pesquero - Langosta Espinosa de Yucatán",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de langosta espinosa de Yucatán",
    date: "2014-03-13",
    tags: ["Plan de Manejo", "Langosta Espinosa", "Yucatán"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-langosta-espinosa-de-yucatan"
  },
  {
    id: "30",
    title: "Plan de Manejo Pesquero - Lisa y Lebrancha",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de lisa y lebrancha en Tamaulipas y Veracruz",
    date: "2014-03-31",
    tags: ["Plan de Manejo", "Lisa", "Lebrancha", "Tamaulipas", "Veracruz"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-lisa-y-lebrancha"
  },
  {
    id: "31",
    title: "Plan de Manejo Pesquero - Mero y Especies Asociadas",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de mero y especies asociadas en la Península de Yucatán",
    date: "2014-11-25",
    tags: ["Plan de Manejo", "Mero", "Especies Asociadas", "Península de Yucatán"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-mero-en-yucatan"
  },
  {
    id: "32",
    title: "Plan de Manejo Pesquero - Pelágicos Menores del Noroeste (2023)",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de pelágicos menores del Noroeste de México (actualización 2023)",
    date: "2023-08-03",
    tags: ["Plan de Manejo", "Pelágicos Menores", "Noroeste", "México", "2023"],
    url: "https://www.gob.mx/cms/uploads/attachment/file/848506/DOF_-_Diario_Oficial_de_la_Federaci_n.pdf"
  },
  {
    id: "33",
    title: "Plan de Manejo Pesquero - Pelágicos Menores del Noroeste (2012)",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de pelágicos menores del Noroeste de México (versión 2012)",
    date: "2012-11-08",
    tags: ["Plan de Manejo", "Pelágicos Menores", "Noroeste", "México", "2012"],
    url: "https://www.gob.mx/cms/uploads/attachment/file/481997/PMP_Pelagicos_menores_NO_mexico.pdf"
  },
  {
    id: "34",
    title: "Plan de Manejo Pesquero - Pepino de Mar en Yucatán",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de pepino de mar en la Península de Yucatán",
    date: "2015-05-12",
    tags: ["Plan de Manejo", "Pepino de Mar", "Península de Yucatán"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-pepino-de-mar-en-la-peninsula-de-yucatan"
  },
  {
    id: "35",
    title: "Plan de Manejo Pesquero - Pulpo del Golfo de México y Mar Caribe",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de pulpo en el Golfo de México y Mar Caribe",
    date: "2014-03-28",
    tags: ["Plan de Manejo", "Pulpo", "Golfo de México", "Mar Caribe"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-pulpo-en-el-golfo-de-mexico-y-mar-caribe"
  },
  {
    id: "36",
    title: "Plan de Manejo Pesquero - Robalo del Golfo de México y Mar Caribe",
    type: "PDF",
    category: "planes",
    description: "Plan de manejo pesquero de robalo del Golfo de México y Mar Caribe",
    date: "2014-03-25",
    tags: ["Plan de Manejo", "Robalo", "Golfo de México", "Mar Caribe"],
    url: "https://www.gob.mx/imipas/documentos/plan-de-manejo-pesquero-de-robalo-del-golfo-de-mexico-y-mar-caribe"
  },
  // Zonas de Refugio Pesquero
  {
    id: "37",
    title: "Zona de Refugio Pesquero - Red de Zonas San Cosme a Punta Coyote, BCS",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que modifica y amplía por segunda ocasión la vigencia de la red de zonas de refugio en aguas marinas frente a la costa oriental de Baja California Sur",
    date: "2022-11-10",
    tags: ["ZRP", "Zona de Refugio", "San Cosme", "Punta Coyote", "Baja California Sur"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5670969&fecha=10/11/2022#gsc.tab=0"
  },
  {
    id: "38",
    title: "Zona de Refugio Pesquero - Costa Occidental de Baja California Sur",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero y nuevas medidas para reducir la interacción de la pesca con tortugas marinas",
    date: "2023-06-23",
    tags: ["ZRP", "Zona de Refugio", "Tortugas Marinas", "Costa Occidental", "Baja California Sur"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5693203&fecha=23/06/2023#gsc.tab=0"
  },
  {
    id: "39",
    title: "Zona de Refugio Pesquero - Laguna de Términos, Campeche",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio parcial permanente en aguas marinas de la Laguna de Términos, Campeche",
    date: "2023-11-23",
    tags: ["ZRP", "Zona de Refugio", "Laguna de Términos", "Campeche", "Permanente"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5709274&fecha=23/11/2023#gsc.tab=0"
  },
  {
    id: "40",
    title: "Zona de Refugio Pesquero - Sian Ka'an, Quintana Roo",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que amplía por segunda ocasión la red de zonas de refugio pesquero en el área de Sian Ka'an, Bahía Espíritu Santo",
    date: "2022-11-30",
    tags: ["ZRP", "Zona de Refugio", "Sian Ka'an", "Bahía Espíritu Santo", "Quintana Roo"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5672860&fecha=30/11/2022#gsc.tab=0"
  },
  {
    id: "41",
    title: "Zona de Refugio Pesquero - Bahía de la Ascensión, Quintana Roo",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece red de dos zonas de refugio pesquero parciales permanentes en la Bahía de la Ascensión",
    date: "2022-12-12",
    tags: ["ZRP", "Zona de Refugio", "Bahía de la Ascensión", "Quintana Roo", "Permanente"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5673896&fecha=12/12/2022#gsc.tab=0"
  },
  {
    id: "42",
    title: "Zona de Refugio Pesquero - San Felipe y Dzilam de Bravo, Yucatán",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio parcial temporal frente a los municipios de San Felipe y Dzilam de Bravo",
    date: "2024-12-19",
    tags: ["ZRP", "Zona de Refugio", "San Felipe", "Dzilam de Bravo", "Yucatán", "Temporal"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5745672&fecha=19/12/2024#gsc.tab=0"
  },
  {
    id: "43",
    title: "Zona de Refugio Pesquero - El Cuyo, Tizimín, Yucatán",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio parcial temporal en el área paralela al poblado de El Cuyo, Municipio de Tizimín",
    date: "2025-02-18",
    tags: ["ZRP", "Zona de Refugio", "El Cuyo", "Tizimín", "Yucatán", "Temporal"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5749411&fecha=18/02/2025#gsc.tab=0"
  },
  {
    id: "44",
    title: "Zona de Refugio Pesquero - Chabihau, Yobaín, Yucatán",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio parcial temporal frente al poblado de Chabihau, Municipio de Yobaín",
    date: "2025-02-26",
    tags: ["ZRP", "Zona de Refugio", "Chabihau", "Yobaín", "Yucatán", "Temporal"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5750315&fecha=26/02/2025#gsc.tab=0"
  },
  {
    id: "45",
    title: "Zona de Refugio Pesquero - Celestún, Yucatán",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero parcial temporal frente al Municipio de Celestún",
    date: "2025-05-09",
    tags: ["ZRP", "Zona de Refugio", "Celestún", "Yucatán", "Temporal"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5756895&fecha=09/05/2025#gsc.tab=0"
  },
  {
    id: "46",
    title: "Zona de Refugio Pesquero - Isla Natividad, Mulegé, BCS",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece red de dos zonas de refugio pesquero parciales permanentes adyacentes a Isla Natividad",
    date: "2018-06-07",
    tags: ["ZRP", "Zona de Refugio", "Isla Natividad", "Mulegé", "Baja California Sur", "Permanente"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5525396&fecha=07/06/2018#gsc.tab=0"
  },
  {
    id: "47",
    title: "Zona de Refugio Pesquero - Punta Herrero, Quintana Roo",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero total temporal en aguas de Punta Herrero, adyacentes a Felipe Carrillo Puerto y Tulum",
    date: "2019-08-27",
    tags: ["ZRP", "Zona de Refugio", "Punta Herrero", "Felipe Carrillo Puerto", "Tulum", "Quintana Roo", "Temporal"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5570414&fecha=27/08/2019#gsc.tab=0"
  },
  {
    id: "48",
    title: "Zona de Refugio Pesquero - Akumal, Quintana Roo",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero en aguas marinas ubicadas en la zona de Akumal",
    date: "2021-10-05",
    tags: ["ZRP", "Zona de Refugio", "Akumal", "Quintana Roo"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5631634&fecha=05/10/2021"
  },
  {
    id: "49",
    title: "Zona de Refugio Pesquero - Canal Nizuc, Benito Juárez, Quintana Roo",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero total permanente en aguas del Canal Nizuc, adyacentes al Municipio de Benito Juárez",
    date: "2018-04-24",
    tags: ["ZRP", "Zona de Refugio", "Canal Nizuc", "Benito Juárez", "Quintana Roo", "Permanente"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5520485&fecha=24/04/2018#gsc.tab=0"
  },
  {
    id: "50",
    title: "Zona de Refugio Pesquero - Banco Chinchorro, Othón P. Blanco, Quintana Roo",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero total temporal en el área de Banco Chinchorro, adyacentes al Municipio de Othón P. Blanco",
    date: "2019-05-31",
    tags: ["ZRP", "Zona de Refugio", "Banco Chinchorro", "Othón P. Blanco", "Quintana Roo", "Temporal"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5561621&fecha=31/05/2019#gsc.tab=0"
  },
  {
    id: "51",
    title: "Zona de Refugio Pesquero - Sistema Lagunar Bahía de Altata-Ensenada del Pabellón, Sinaloa",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero total permanente en el Sistema Lagunar Bahía de Altata-Ensenada del Pabellón",
    date: "2018-04-24",
    tags: ["ZRP", "Zona de Refugio", "Sistema Lagunar", "Bahía de Altata", "Ensenada del Pabellón", "Navolato", "Sinaloa", "Permanente"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5520486&fecha=24/04/2018#gsc.tab=0"
  },
  {
    id: "52",
    title: "Zona de Refugio Pesquero - Sistema Lagunar Bahía Jitzamuri-Agiabampo, Sinaloa",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero total permanente en el Sistema Lagunar Bahía Jitzamuri-Agiabampo",
    date: "2018-04-24",
    tags: ["ZRP", "Zona de Refugio", "Sistema Lagunar", "Bahía Jitzamuri", "Agiabampo", "Ahome", "Sinaloa", "Permanente"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5520487&fecha=24/04/2018#gsc.tab=0"
  },
  {
    id: "53",
    title: "Zona de Refugio Pesquero - Puerto Libertad, Pitiquito, Sonora",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece zona de refugio pesquero total temporal en aguas marinas de Puerto Libertad, Municipio de Pitiquito",
    date: "2017-07-12",
    tags: ["ZRP", "Zona de Refugio", "Puerto Libertad", "Pitiquito", "Sonora", "Temporal"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5489928&fecha=12/07/2017#gsc.tab=0"
  },
  {
    id: "54",
    title: "Zona de Refugio Pesquero - Isla San Pedro Nolasco, Guaymas, Sonora",
    type: "PDF",
    category: "zrp",
    description: "Acuerdo que establece red de tres zonas de refugio pesquero totales temporales en la Isla San Pedro Nolasco, frente a Guaymas",
    date: "2017-07-12",
    tags: ["ZRP", "Zona de Refugio", "Isla San Pedro Nolasco", "Guaymas", "Sonora", "Temporal"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5489927&fecha=12/07/2017#gsc.tab=0"
  },
  // NOMs
  {
    id: "55",
    title: "NOM-001-SAG/PESC-2013 - Pesca Responsable de Túnidos con Red de Cerco",
    type: "PDF",
    category: "noms",
    description: "Norma que establece especificaciones para las operaciones de pesca responsable de túnidos con red de cerco",
    date: "2014-01-16",
    tags: ["NOM", "Túnidos", "Red de Cerco", "Pesca Responsable"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/1_NOM_001_SAG_PESC_2013.pdf"
  },
  {
    id: "56",
    title: "NOM-002-SAG/PESC-2013 - Aprovechamiento de Especies de Camarón",
    type: "PDF",
    category: "noms",
    description: "Norma para ordenar el aprovechamiento de las especies de camarón en aguas de jurisdicción federal",
    date: "2013-07-11",
    tags: ["NOM", "Camarón", "Aprovechamiento", "Aguas Federales"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/2_NOM_002_SAG_PESC_2013.pdf"
  },
  {
    id: "57",
    title: "Aviso Autorización Pesca Camarón Siete Barbas",
    type: "PDF",
    category: "noms",
    description: "Aviso de autorización para la pesca comercial de camarón siete barbas en aguas marinas costeras de Campeche y Tabasco",
    date: "1997-11-14",
    tags: ["Aviso", "Camarón Siete Barbas", "Campeche", "Tabasco", "Pesca Comercial"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/2A_AVISO_PESCA_CAMARON_7_BARBAS.pdf"
  },
  {
    id: "58",
    title: "Aviso Autorización de Charangas",
    type: "PDF",
    category: "noms",
    description: "Aviso de autorización para utilizar charangas como equipos de pesca para camarón en sistemas lagunarios estuarinos de Tamaulipas y norte de Veracruz",
    date: "1997-11-21",
    tags: ["Aviso", "Charangas", "Equipos de Pesca", "Tamaulipas", "Veracruz"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/2CAVISOAUTSURIPERAYMADGALENA_I.pdf"
  },
  {
    id: "59",
    title: "Aviso Autorización Redes Magdalena I y Suripera",
    type: "PDF",
    category: "noms",
    description: "Aviso de autorización para utilizar redes Magdalena I y Suripera para captura de camarón en Sistema Lagunar Bahía Magdalena-Almejas, BCS",
    date: "2001-09-07",
    tags: ["Aviso", "Redes", "Magdalena I", "Suripera", "Bahía Magdalena", "Baja California Sur"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/2CAVISOAUTSURIPERAYMADGALENA_I.pdf"
  },
  {
    id: "60",
    title: "Aviso Embarcaciones Menores en Sinaloa",
    type: "PDF",
    category: "noms",
    description: "Aviso de autorización para operación de embarcaciones menores con redes de arrastre para camarón en aguas marinas costeras de Sinaloa",
    date: "2002-09-20",
    tags: ["Aviso", "Embarcaciones Menores", "Redes de Arrastre", "Sinaloa", "Camarón"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/2D_AVISO_EMB_MENORES_SINALOA.pdf"
  },
  {
    id: "61",
    title: "NOM-003-SAG/PESC-2018 - Peces Pelágicos Menores con Embarcaciones de Cerco",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de peces pelágicos menores con embarcaciones de cerco en aguas del Océano Pacífico y Golfo de California",
    date: "2019-03-12",
    tags: ["NOM", "Pelágicos Menores", "Embarcaciones de Cerco", "Océano Pacífico", "Golfo de California"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2019/normas/NOM_003_SAG_PESC_2018.pdf"
  },
  {
    id: "62",
    title: "NOM-004-SAG/PESC-2015 - Almeja Catarina",
    type: "PDF",
    category: "noms",
    description: "Especificaciones para el aprovechamiento de la almeja catarina (Argopecten circularis) en aguas de jurisdicción federal",
    date: "2015-10-06",
    tags: ["NOM", "Almeja Catarina", "Argopecten circularis", "Aprovechamiento"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/4_NOM_004_SAG_PESC_2015.pdf"
  },
  {
    id: "63",
    title: "NOM-005-PESC-1993 - Abulón en Península de Baja California",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de las poblaciones de distintas especies de abulón en aguas de la península de Baja California",
    date: "1993-12-21",
    tags: ["NOM", "Abulón", "Península de Baja California", "Aprovechamiento"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/5_NOM_005_PESC_1993.pdf"
  },
  {
    id: "64",
    title: "NOM-006-SAG/PESC-2016 - Todas las Especies de Langosta",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de todas las especies de langosta en aguas del Golfo de México, Mar Caribe y Océano Pacífico",
    date: "2016-09-07",
    tags: ["NOM", "Langosta", "Golfo de México", "Mar Caribe", "Océano Pacífico"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/6_NOM_006_SAG_PESC_2016.pdf"
  },
  {
    id: "65",
    title: "NOM-007-SAG/PESC-2015 - Erizo Rojo y Morado",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de las poblaciones de erizo rojo y morado en aguas del Océano Pacífico de la costa oeste de Baja California",
    date: "2015-06-24",
    tags: ["NOM", "Erizo Rojo", "Erizo Morado", "Océano Pacífico", "Baja California"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/7_NOM_007_SAG_PESC_2015.pdf"
  },
  {
    id: "66",
    title: "NOM-008-SAG/PESC-2015 - Especies de Pulpo",
    type: "PDF",
    category: "noms",
    description: "Norma para ordenar el aprovechamiento de las especies de pulpo en aguas del Golfo de México y Mar Caribe",
    date: "2016-04-13",
    tags: ["NOM", "Pulpo", "Golfo de México", "Mar Caribe", "Aprovechamiento"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/8_NOM_008_SAG_PESC_2015.pdf"
  },
  {
    id: "67",
    title: "NOM-009-SAG/PESC-2015 - Procedimiento para Épocas y Zonas de Veda",
    type: "PDF",
    category: "noms",
    description: "Norma que establece el procedimiento para determinar las épocas y zonas de veda para la captura de flora y fauna acuáticas",
    date: "2016-02-12",
    tags: ["NOM", "Épocas de Veda", "Zonas de Veda", "Flora Acuática", "Fauna Acuática"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/9_NOM_009_SAG_PESC_2016.pdf"
  },
  {
    id: "68",
    title: "NOM-012-SAG/PESC-2014 - Presa El Cuchillo-Solidaridad, Nuevo León",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de recursos pesqueros en el embalse de la presa El Cuchillo-Solidaridad, Municipio de China, N.L.",
    date: "2014-12-26",
    tags: ["NOM", "Presa El Cuchillo", "Solidaridad", "China", "Nuevo León"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/10_NOM_012_SAG_PESC_2014.pdf"
  },
  {
    id: "69",
    title: "NOM-013-SAG/PESC-2016 - Especies de Caracol",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de las especies de caracol en aguas del Golfo de México y Mar Caribe",
    date: "2016-08-19",
    tags: ["NOM", "Caracol", "Golfo de México", "Mar Caribe", "Aprovechamiento"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/11_NOM_013_SAG_PESC_2016.pdf"
  },
  {
    id: "70",
    title: "NOM-014-SAG/PESC-2015 - Almeja Generosa",
    type: "PDF",
    category: "noms",
    description: "Especificaciones para regular el aprovechamiento de almeja generosa (Panopea generosa y Panopea globosa) en aguas del Océano Pacífico y Golfo de California",
    date: "2015-06-25",
    tags: ["NOM", "Almeja Generosa", "Panopea generosa", "Panopea globosa", "Océano Pacífico"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/12_NOM_014_SAG_PESC_2015.pdf"
  },
  {
    id: "71",
    title: "NOM-015-SAG/PESC-2016 - Ostión en Tabasco",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de ostión (Crassostrea virginica) en los sistemas lagunarios estuarinos del Estado de Tabasco",
    date: "2016-08-17",
    tags: ["NOM", "Ostión", "Crassostrea virginica", "Tabasco", "Sistemas Lagunarios"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/13_NOM_015_SAG_PESC_2016.pdf"
  },
  {
    id: "72",
    title: "NOM-016-SAG/PESC-2014 - Lisa y Liseta o Lebrancha",
    type: "PDF",
    category: "noms",
    description: "Norma para regular la pesca de lisa y liseta o lebrancha en aguas del Golfo de México, Mar Caribe y Océano Pacífico",
    date: "2015-07-29",
    tags: ["NOM", "Lisa", "Liseta", "Lebrancha", "Golfo de México", "Océano Pacífico"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/14_NOM_016_SAG_PESC_2014.pdf"
  },
  {
    id: "73",
    title: "Modificación NOM-017-PESC-1994 - Pesca Deportivo-Recreativa",
    type: "PDF",
    category: "noms",
    description: "Modificación a la norma para regular las actividades de pesca deportivo-recreativa en aguas de jurisdicción federal",
    date: "1995-05-09",
    tags: ["NOM", "Modificación", "Pesca Deportiva", "Pesca Recreativa", "Aguas Federales"],
    url: "https://www.dof.gob.mx/nota_detalle_popup.php?codigo=5323155"
  },
  {
    id: "74",
    title: "NOM-022-SAG/PESC-2015 - Túnidos con Embarcaciones Vareras",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de especies de túnidos con embarcaciones vareras en aguas de jurisdicción federal",
    date: "2015-06-12",
    tags: ["NOM", "Túnidos", "Embarcaciones Vareras", "Aprovechamiento"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/16_NOM_022_SAG_PESC_2015.pdf"
  },
  {
    id: "75",
    title: "NOM-023-SAG/PESC-2014 - Túnidos con Embarcaciones Palangreras",
    type: "PDF",
    category: "noms",
    description: "Norma que regula el aprovechamiento de túnidos con embarcaciones palangreras en aguas del Golfo de México y Mar Caribe",
    date: "2014-04-16",
    tags: ["NOM", "Túnidos", "Embarcaciones Palangreras", "Golfo de México", "Mar Caribe"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/17_NOM_023_SAG_PESC_2014.pdf"
  },
  {
    id: "76",
    title: "NOM-026-SAG/PESC-2016 - Presa Aguamilpa, Nayarit",
    type: "PDF",
    category: "noms",
    description: "Norma que establece regulaciones para el aprovechamiento de recursos pesqueros en el embalse de la presa Aguamilpa, Nayarit",
    date: "2016-09-06",
    tags: ["NOM", "Presa Aguamilpa", "Nayarit", "Embalse", "Recursos Pesqueros"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/18_NOM_026_SAG_PESC_2016.pdf"
  },
  {
    id: "77",
    title: "NOM-028-SAG/PESC-2016 - Presa Fernando Hiriart Balderrama (Zimapán)",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en la presa Ing. Fernando Hiriart Balderrama (Zimapán) en Hidalgo y Querétaro, especificaciones para aprovechamiento",
    date: "2016-09-23",
    tags: ["NOM", "Presa Zimapán", "Fernando Hiriart", "Hidalgo", "Querétaro"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/19_NOM_028_SAG_PESC_2016.pdf"
  },
  {
    id: "78",
    title: "NOM-029-PESC-2006 - Pesca Responsable de Tiburones y Rayas",
    type: "PDF",
    category: "noms",
    description: "Norma de pesca responsable de tiburones y rayas, especificaciones para su aprovechamiento",
    date: "2007-02-14",
    tags: ["NOM", "Tiburones", "Rayas", "Pesca Responsable", "Aprovechamiento"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/20_NOM_029_PESC_2006.pdf"
  },
  {
    id: "79",
    title: "NOM-032-SAG/PESC-2015 - Lago de Chapala, Jalisco y Michoacán",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el Lago de Chapala ubicado en Jalisco y Michoacán, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2015-06-19",
    tags: ["NOM", "Lago de Chapala", "Jalisco", "Michoacán", "Pesca Responsable"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/21_NOM_032_SAG_PESC_2015.pdf"
  },
  {
    id: "80",
    title: "NOM-033-SAG/PESC-2014 - Sistema Lagunar Champayán y Río Tamesí, Tamaulipas",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el Sistema Lagunar Champayán y Río Tamesí, incluyendo lagunas Chairel y La Escondida, Tamaulipas",
    date: "2014-12-23",
    tags: ["NOM", "Sistema Lagunar", "Champayán", "Río Tamesí", "Tamaulipas"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/22_NOM_033_SAG_PESC_2014.pdf"
  },
  {
    id: "81",
    title: "NOM-034-SAG/PESC-2014 - Presa Emilio Portes Gil (San Lorenzo), Tamaulipas",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el embalse de la presa Emilio Portes Gil (San Lorenzo) ubicada en Tamaulipas",
    date: "2014-12-10",
    tags: ["NOM", "Presa Emilio Portes Gil", "San Lorenzo", "Tamaulipas", "Embalse"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/23_NOM_034_SAG_PESC_2014.pdf"
  },
  {
    id: "82",
    title: "NOM-035-SAG/PESC-2014 - Presa José S. Noriega (Vaquerías), Nuevo León",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el embalse de la presa José S. Noriega (Vaquerías o Mimbres) ubicada en Nuevo León",
    date: "2014-12-26",
    tags: ["NOM", "Presa José S. Noriega", "Vaquerías", "Mimbres", "Nuevo León"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/24_NOM_035_SAG_PESC_2014.pdf"
  },
  {
    id: "83",
    title: "NOM-036-SAG/PESC-2015 - Lago de Pátzcuaro, Michoacán",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el Lago de Pátzcuaro ubicado en Michoacán, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2015-06-11",
    tags: ["NOM", "Lago de Pátzcuaro", "Michoacán", "Pesca Responsable"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/25_NOM_036_SAG_PESC_2015.pdf"
  },
  {
    id: "84",
    title: "NOM-037-PESC-2004 - Sistema Lagunar Humedales del Usumacinta",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el Sistema Lagunar de humedales del Usumacinta en Chiapas, Tabasco y Campeche",
    date: "2007-03-21",
    tags: ["NOM", "Humedales", "Usumacinta", "Chiapas", "Tabasco", "Campeche"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/26_NOM_037_PESC_2004.pdf"
  },
  {
    id: "85",
    title: "Modificación NOM-037-PESC-2004 - Pesca Deportivo Recreativa",
    type: "PDF",
    category: "noms",
    description: "Modificación a la NOM-037-PESC-2004 para precisar que las actividades de pesca deportivo recreativa podrán efectuarse todos los días",
    date: "2007-05-29",
    tags: ["NOM", "Modificación", "Pesca Deportiva", "Pesca Recreativa"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/26A_MOD_NOM_037_PESC_2004.pdf"
  },
  {
    id: "86",
    title: "NOM-039-PESC-2003 - Pesca Responsable de Jaiba en Océano Pacífico",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable de jaiba en aguas de jurisdicción federal del litoral del Océano Pacífico, especificaciones para su aprovechamiento",
    date: "2006-07-26",
    tags: ["NOM", "Jaiba", "Océano Pacífico", "Pesca Responsable"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/27_NOM_039_PESC_2003.pdf"
  },
  {
    id: "87",
    title: "NOM-041-PESC-2004 - Lago de Catemaco, Veracruz",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el lago de Catemaco ubicado en Veracruz, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2007-03-15",
    tags: ["NOM", "Lago de Catemaco", "Veracruz", "Pesca Responsable"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/28_NOM_041_PESC_2004.pdf"
  },
  {
    id: "88",
    title: "NOM-042-PESC-2003 - Presa Falcón, Tamaulipas",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el embalse de la presa Falcón en Tamaulipas, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2006-07-19",
    tags: ["NOM", "Presa Falcón", "Tamaulipas", "Embalse"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/29_NOM_042_PESC_2003.pdf"
  },
  {
    id: "89",
    title: "NOM-043-PESC-2003 - Presa Marte R. Gómez, Tamaulipas",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el embalse de la presa Marte R. Gómez en Tamaulipas, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2006-07-20",
    tags: ["NOM", "Presa Marte R. Gómez", "Tamaulipas", "Embalse"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/30_NOM_043_PESC_2003.pdf"
  },
  {
    id: "90",
    title: "NOM-044-PESC-2004 - Presa La Boquilla, Chihuahua",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el embalse de la presa La Boquilla en Chihuahua, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2017-08-23",
    tags: ["NOM", "Presa La Boquilla", "Chihuahua", "Embalse"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5494807&fecha=23/08/2017"
  },
  {
    id: "91",
    title: "NOM-045-SAG/PESC-2015 - Cangrejo Moro en Campeche",
    type: "PDF",
    category: "noms",
    description: "Especificaciones para regular el aprovechamiento de cangrejo moro (Menippe mercenaria) en aguas de jurisdicción federal de Campeche",
    date: "2016-02-15",
    tags: ["NOM", "Cangrejo Moro", "Menippe mercenaria", "Campeche"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/32_NOM_045_SAG_PESC_2015.pdf"
  },
  {
    id: "92",
    title: "NOM-046-PESC-2005 - Presa La Amistad, Coahuila",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el embalse de la presa La Amistad en Coahuila, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2017-07-27",
    tags: ["NOM", "Presa La Amistad", "Coahuila", "Embalse"],
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5492067&fecha=27/07/2017"
  },
  {
    id: "93",
    title: "NOM-047-SAG/PESC-2014 - Identificación del Origen de Camarones",
    type: "PDF",
    category: "noms",
    description: "Norma para la identificación del origen de camarones cultivados, de aguas marinas y de esteros, marismas y bahías",
    date: "2014-04-15",
    tags: ["NOM", "Identificación", "Camarones Cultivados", "Aguas Marinas", "Esteros"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/34_NOM_047_SAG_PESC_2014.pdf"
  },
  {
    id: "94",
    title: "NOM-049-SAG/PESC-2014 - Procedimiento para Zonas de Refugio",
    type: "PDF",
    category: "noms",
    description: "Norma que determina el procedimiento para establecer zonas de refugio para recursos pesqueros en aguas de jurisdicción federal",
    date: "2014-04-14",
    tags: ["NOM", "Zonas de Refugio", "Recursos Pesqueros", "Procedimiento"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/35_NOM_049_SAG_PESC_2014.pdf"
  },
  {
    id: "95",
    title: "NOM-050-PESC-2004 - Lago Tecocomulco, Hidalgo",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el embalse del lago Tecocomulco en Hidalgo, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2006-08-14",
    tags: ["NOM", "Lago Tecocomulco", "Hidalgo", "Embalse"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/36_NOM_050_PESC_2004.pdf"
  },
  {
    id: "96",
    title: "NOM-058-SAG/PESC/SEMARNAT-2013 - Cultivo de Ostras Perleras",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el cultivo de ostras perleras: madreperla, concha nacar, madreperla del Atlántico y ostra perlera alada del Atlántico",
    date: "2013-12-23",
    tags: ["NOM", "Ostras Perleras", "Madreperla", "Concha Nacar", "Cultivo"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/37_NOM_058_SAG_SEMARNAT.pdf"
  },
  {
    id: "97",
    title: "NOM-060-SAG/PESC-2016 - Pesca Responsable en Aguas Continentales Dulceacuícolas",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en cuerpos de aguas continentales dulceacuícolas de jurisdicción federal, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2016-09-19",
    tags: ["NOM", "Aguas Continentales", "Dulceacuícolas", "Pesca Responsable"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/38_NOM_060_SAG_PESC_2016.pdf"
  },
  {
    id: "98",
    title: "NOM-061-PESC-2006 - Excluidores de Tortugas Marinas",
    type: "PDF",
    category: "noms",
    description: "Especificaciones técnicas de los excluidores de tortugas marinas utilizados por la flota de arrastre camaronera en aguas de jurisdicción federal",
    date: "2016-12-13",
    tags: ["NOM", "Excluidores", "Tortugas Marinas", "Flota de Arrastre", "Camaronera"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/39_NOM_061_PESC_2016_161213.pdf"
  },
  {
    id: "99",
    title: "NOM-062-SAG/PESC-2014 - Sistema de Localización y Monitoreo Satelital",
    type: "PDF",
    category: "noms",
    description: "Norma para la utilización del Sistema de Localización y Monitoreo Satelital de Embarcaciones Pesqueras",
    date: "2015-07-03",
    tags: ["NOM", "Localización", "Monitoreo Satelital", "Embarcaciones Pesqueras"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/40_NOM_062_SAG_PESC_2014.pdf"
  },
  {
    id: "100",
    title: "NOM-063-PESC-2005 - Curvina Golfina en Alto Golfo de California",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable de curvina golfina (Cynoscion othonopterus) en aguas del Alto Golfo de California y Delta del Río Colorado",
    date: "2007-08-16",
    tags: ["NOM", "Curvina Golfina", "Cynoscion othonopterus", "Alto Golfo de California", "Delta del Río Colorado"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/41_NOM_063_PESC_2005.pdf"
  },
  {
    id: "101",
    title: "NOM-064-SAG/PESC/SEMARNAT-2013 - Sistemas, Métodos y Técnicas de Captura Prohibidos",
    type: "PDF",
    category: "noms",
    description: "Norma sobre sistemas, métodos y técnicas de captura prohibidos en la pesca en aguas de jurisdicción federal",
    date: "2015-01-21",
    tags: ["NOM", "Sistemas Prohibidos", "Métodos de Captura", "Técnicas Prohibidas"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/42_NOM_064_SAG_PESC_SEMARNAT_2013.pdf"
  },
  {
    id: "102",
    title: "NOM-065-SAG/PESC-2014 - Mero y Especies Asociadas",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el aprovechamiento de especies de mero y especies asociadas en aguas del litoral del Golfo de México y Mar Caribe",
    date: "2015-07-03",
    tags: ["NOM", "Mero", "Especies Asociadas", "Golfo de México", "Mar Caribe"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/43_NOM_065_SAG_PESC_2014.pdf"
  },
  {
    id: "103",
    title: "NOM-070-SAG/PESC-2014 - Presa La Muñeca, San Luis Potosí",
    type: "PDF",
    category: "noms",
    description: "Pesca responsable en el embalse de la presa La Muñeca ubicada en San Luis Potosí, especificaciones para aprovechamiento de recursos pesqueros",
    date: "2014-12-09",
    tags: ["NOM", "Presa La Muñeca", "San Luis Potosí", "Embalse"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/44_NOM_070_SAG_PESC_2014.pdf"
  },
  {
    id: "104",
    title: "NOM-074-SAG/PESC-2014 - Sistemas de Exclusión de Fauna Acuática (SEFA)",
    type: "PDF",
    category: "noms",
    description: "Norma para regular el uso de sistemas de exclusión de fauna acuática (SEFA) en unidades de producción acuícola para cultivo de camarón en Sinaloa",
    date: "2014-04-28",
    tags: ["NOM", "SEFA", "Sistemas de Exclusión", "Fauna Acuática", "Cultivo de Camarón", "Sinaloa"],
    url: "https://www.conapesca.gob.mx/work/sites/cona/dgop/2018/normas/45_NOM_074_SAG_PESC_2014.pdf"
  },
    // CNP
    {
      id: "105",
      title: "Carta Nacional Pesquera Versión 2025",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2025",
      date: "2025-03-10",
      tags: ["CNP", "Carta Nacional Pesquera", "2025", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/982574/CNP_2025.pdf"
    },
    {
      id: "106",
      title: "Carta Nacional Pesquera Versión 2023",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2023",
      date: "2023-07-21",
      tags: ["CNP", "Carta Nacional Pesquera", "2023", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892410/CNP_2023.pdf"
    },
    {
      id: "107",
      title: "Carta Nacional Pesquera Versión 2022",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2022",
      date: "2022-07-26",
      tags: ["CNP", "Carta Nacional Pesquera", "2022", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892409/CNP_2022.pdf"
    },
    {
      id: "108",
      title: "Carta Nacional Pesquera Versión 2018",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2018",
      date: "2018-06-11",
      tags: ["CNP", "Carta Nacional Pesquera", "2018", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892407/CNP_2017.pdf"
    },
    {
      id: "109",
      title: "Carta Nacional Pesquera Versión 2012 - Actualización",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, actualización de la versión 2012",
      date: "2012-08-24",
      tags: ["CNP", "Carta Nacional Pesquera", "2012", "Actualización", "Política Pesquera"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892415/CNP_2012_Actualizaci_n.pdf"
    },
    {
      id: "110",
      title: "Carta Nacional Pesquera Versión 2012",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2012",
      date: "2012-08-24",
      tags: ["CNP", "Carta Nacional Pesquera", "2012", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892408/CNP_2012.pdf"
    },
    {
      id: "111",
      title: "Carta Nacional Pesquera Versión 2010",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2010",
      date: "2010-12-02",
      tags: ["CNP", "Carta Nacional Pesquera", "2010", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892412/CNP_2010.pdf"
    },
    {
      id: "112",
      title: "Carta Nacional Pesquera Versión 2006",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2006",
      date: "2006-08-25",
      tags: ["CNP", "Carta Nacional Pesquera", "2006", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892413/CNP_2006.pdf"
    },
    {
      id: "113",
      title: "Carta Nacional Pesquera Versión 2004",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2004",
      date: "2003-12-19",
      tags: ["CNP", "Carta Nacional Pesquera", "2004", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892414/CNP_2004.pdf"
    },
    {
      id: "114",
      title: "Carta Nacional Pesquera Versión 2000",
      type: "PDF",
      category: "cnp",
      description: "Instrumento de política pesquera que contiene el diagnóstico de la actividad pesquera y acuícola nacional, versión 2000",
      date: "2000-08-17",
      tags: ["CNP", "Carta Nacional Pesquera", "2000", "Política Pesquera", "Diagnóstico"],
      url: "https://www.gob.mx/cms/uploads/attachment/file/892411/CNP_2000.pdf"
  },
]

export default function NormativasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("leyes")

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = doc.category === activeTab
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeTab])

  const getDocumentsByCategory = (category: string) => {
    return documents.filter((doc) => doc.category === category)
  }

  const categoryStats = {
    leyes: getDocumentsByCategory("leyes").length,
    noms: getDocumentsByCategory("noms").length,
    planes: getDocumentsByCategory("planes").length,
    zrp: getDocumentsByCategory("zrp").length,
    cnp: getDocumentsByCategory("cnp").length,
  }

  const handleDownload = async (doc: DocumentItem) => {
    try {
      const response = await fetch(`/api/download?file=${encodeURIComponent(doc.url)}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = window.document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `${doc.title}.pdf`
        window.document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        window.document.body.removeChild(a)
      } else {
        console.error("Error downloading file")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "leyes":
        return Scale
      case "noms":
        return Clipboard
      case "planes":
        return FileText
      case "zrp":
        return Map
      case "cnp":
        return FileText
      default:
        return FileText
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "leyes":
        return "from-blue-500 to-blue-600"
      case "noms":
        return "from-green-500 to-green-600"
      case "planes":
        return "from-purple-500 to-purple-600"
      case "zrp":
        return "from-orange-500 to-orange-600"
      case "cnp":
        return "from-yellow-500 to-yellow-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "leyes":
        return "Leyes y Reglamentos"
      case "noms":
        return "NOMs"
      case "planes":
        return "Planes de Manejo Pesquero"
      case "zrp":
        return "Zonas de Refugio Pesquero"
      case "cnp":
        return "Carta Nacional Pesquera"
      default:
        return category
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Biblioteca Normativa
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Accede a leyes, reglamentos, normas oficiales y documentos técnicos de la pesca sustentable
          </p>
        </div>

        {/* Estadísticas por categoría */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {Object.entries(categoryStats).map(([category, count]) => {
            const Icon = getCategoryIcon(category)
            const colorClass = getCategoryColor(category)
            return (
              <Card key={category} className={`bg-gradient-to-br ${colorClass} text-white border-0 shadow-xl`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium">{getCategoryName(category)}</p>
                      <p className="text-3xl font-bold">{count}</p>
                      <p className="text-white/70 text-xs">Documentos</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Search */}
        <Card className="bg-white/80 backdrop-blur-sm border-teal-200 mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar documentos, leyes, normas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-teal-200 focus:border-teal-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm border border-teal-200">
            <TabsTrigger
              value="leyes"
              className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
            >
              <Scale className="w-4 h-4 mr-2" />
              Leyes
            </TabsTrigger>
            <TabsTrigger
              value="noms"
              className="flex items-center data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
            >
              <Clipboard className="w-4 h-4 mr-2" />
              NOMs
            </TabsTrigger>
            <TabsTrigger
              value="planes"
              className="flex items-center data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
            >
              <FileText className="w-4 h-4 mr-2" />
              Planes
            </TabsTrigger>
            <TabsTrigger
              value="zrp"
              className="flex items-center data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              <Map className="w-4 h-4 mr-2" />
              ZRP
            </TabsTrigger>
            <TabsTrigger
              value="cnp"
              className="flex items-center data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800"
            >
              <FileText className="w-4 h-4 mr-2" />
              CNP
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          {["leyes", "noms", "planes", "zrp", "cnp"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <Card
                    key={doc.id}
                    className="bg-white/90 backdrop-blur-sm border-teal-200 hover:shadow-lg transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <FileText className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                              <p className="text-gray-700 mb-3">{doc.description}</p>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                <div>Fecha: {new Date(doc.date).toLocaleDateString("es-MX")}</div>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {doc.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {doc.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{doc.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <Badge variant="secondary" className="flex-shrink-0">
                            {doc.type}
                          </Badge>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleDownload(doc)}
                              className="bg-teal-600 hover:bg-teal-700"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Descargar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-teal-200 hover:bg-teal-50 bg-transparent"
                              onClick={() => window.open(doc.url, '_blank')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredDocuments.length === 0 && (
                <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                  <CardContent className="p-12 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron documentos</h3>
                    <p className="text-gray-600">
                      {searchTerm
                        ? `No hay documentos que coincidan con "${searchTerm}" en esta categoría.`
                        : "No hay documentos disponibles en esta categoría."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
