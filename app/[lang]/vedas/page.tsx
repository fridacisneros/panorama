"use client"

import { useState } from "react"
import { AlertTriangle, Calendar, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VedasFilters } from "@/components/vedas-filters"
import { VedasTimeline } from "@/components/vedas-timeline"
import { PageHeader } from "@/components/page-header"
import { vedasData } from "@/lib/vedas-data"
import { useIdioma } from "@/components/idioma-provider"
import { AvisoIdioma } from "@/components/aviso-idioma"
import type { Idioma } from "@/lib/i18n"

const TEXTOS = {
  es: {
    titulo: "Calendario de Vedas",
    subtitulo: "Consulta los períodos de veda por especie y región",
    info: "Información Importante",
    queEs: "¿Qué es una veda?",
    queEsTexto:
      "Las vedas son períodos de prohibición temporal o permanente de captura, extracción o aprovechamiento de especies para permitir su reproducción y conservación, garantizando la sustentabilidad de los recursos pesqueros.",
    cumplimiento: "Cumplimiento",
    cumplimientoTexto:
      "El respeto a los períodos de veda es obligatorio y su incumplimiento está sujeto a sanciones establecidas en la normatividad pesquera vigente.",
    tipos: "Tipos de Vedas",
    fija: "Veda Fija",
    fijaPuntos: [
      "Tiene fechas específicas que se repiten todos los años.",
      "No cambia aunque varíen las condiciones climáticas o biológicas.",
    ],
    variable: "Veda Variable",
    variablePuntos: [
      "No tiene fechas fijas: la autoridad la ajusta según información científica.",
      "Se basa en: periodos reales de reproducción, niveles de población, condiciones ambientales.",
      "Puede cambiar cada año o iniciarse solo cuando se detecta cierta condición biológica en la especie.",
    ],
    permanente: "Veda Permanente",
    permanentePuntos: [
      "Se establece por tiempo indefinido.",
      "Generalmente se aplica cuando una especie está muy presionada, en peligro, o para proteger zonas críticas (guarderías, arrecifes, manglares).",
      "Prohíbe la captura todo el año, cada año.",
    ],
    avisoTitulo: "Información de carácter informativo, no oficial",
    avisoAntes:
      "Las fechas y condiciones de veda mostradas aquí pueden estar desactualizadas: las vedas variables se modifican periódicamente y pueden publicarse nuevos acuerdos en cualquier momento. La única fuente con validez legal es el",
    dof: "Diario Oficial de la Federación (DOF)",
    avisoDespues: ". Antes de pescar, confirma la veda vigente en el acuerdo publicado en el DOF o con la CONAPESCA.",
  },
  en: {
    titulo: "Fishing Closure Calendar",
    subtitulo: "Check closure periods by species and region",
    info: "Important information",
    queEs: "What is a fishing closure?",
    queEsTexto:
      "Closures (vedas) are temporary or permanent bans on catching, extracting or using a species so it can reproduce and recover, keeping fishery resources sustainable.",
    cumplimiento: "Compliance",
    cumplimientoTexto:
      "Observing closure periods is mandatory, and violations are subject to the penalties set out in current fisheries regulations.",
    tipos: "Types of closures",
    fija: "Fixed closure",
    fijaPuntos: [
      "It has specific dates that repeat every year.",
      "It doesn't change even if weather or biological conditions vary.",
    ],
    variable: "Variable closure",
    variablePuntos: [
      "It has no fixed dates: the authority adjusts it based on scientific information.",
      "It is based on actual spawning periods, population levels and environmental conditions.",
      "It may change every year or start only when a certain biological condition is detected in the species.",
    ],
    permanente: "Permanent closure",
    permanentePuntos: [
      "It is set for an indefinite period.",
      "It usually applies when a species is under heavy pressure or endangered, or to protect critical areas (nurseries, reefs, mangroves).",
      "It bans catch all year, every year.",
    ],
    avisoTitulo: "For information only, not official",
    avisoAntes:
      "The closure dates and conditions shown here may be out of date: variable closures change periodically and new agreements can be published at any time. The only legally valid source is the",
    dof: "Official Gazette of the Federation (DOF)",
    avisoDespues: ". Before fishing, confirm the closure in force in the agreement published in the DOF or with CONAPESCA.",
  },
} satisfies Record<Idioma, unknown>

// Tarjetas de "Tipos de vedas": colores fijos por tipo.
const TIPOS = [
  { titulo: "fija", puntos: "fijaPuntos", caja: "bg-orange-50 border-orange-200", texto: "text-orange-800", vineta: "text-orange-600" },
  { titulo: "variable", puntos: "variablePuntos", caja: "bg-yellow-50 border-yellow-200", texto: "text-yellow-800", vineta: "text-yellow-600" },
  { titulo: "permanente", puntos: "permanentePuntos", caja: "bg-red-50 border-red-200", texto: "text-red-800", vineta: "text-red-600" },
] as const

export default function VedasPage() {
  const { idioma } = useIdioma()
  const t = TEXTOS[idioma]
  const [filteredVedas, setFilteredVedas] = useState(vedasData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:bg-none dark:bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader icon={Calendar} title={t.titulo} subtitle={t.subtitulo} />

        <AvisoIdioma />

        <VedasFilters vedas={vedasData} onFilter={setFilteredVedas} />

        <VedasTimeline vedas={filteredVedas} />

        {/* Información adicional */}
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-teal-800">
              <Info className="w-5 h-5 mr-2" />
              {t.info}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t.queEs}</h4>
                <p className="text-gray-700 text-sm">{t.queEsTexto}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t.cumplimiento}</h4>
                <p className="text-gray-700 text-sm">{t.cumplimientoTexto}</p>
              </div>
            </div>

            {/* Tipos de Vedas */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">{t.tipos}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TIPOS.map((tipo) => (
                  <div key={tipo.titulo} className={`${tipo.caja} border-2 rounded-lg p-4`}>
                    <h5 className={`font-bold ${tipo.texto} mb-2 flex items-center`}>{t[tipo.titulo]}</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {t[tipo.puntos].map((punto) => (
                        <li key={punto} className="flex items-start">
                          <span className={`${tipo.vineta} mr-2`}>•</span>
                          <span>{punto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aviso legal */}
        <Alert className="mt-8 border-amber-300 bg-amber-50 text-amber-900 [&>svg]:text-amber-600">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="font-semibold">{t.avisoTitulo}</AlertTitle>
          <AlertDescription className="text-sm leading-relaxed">
            {t.avisoAntes}{" "}
            <a
              href="https://dof.gob.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-amber-700"
            >
              {t.dof}
            </a>
            {t.avisoDespues}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
