"use client"

import { useState } from "react"
import { Calendar, Info, GanttChartSquare, List } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VedasFilters } from "@/components/vedas-filters"
import { VedasTimeline } from "@/components/vedas-timeline"
import { VedasList } from "@/components/vedas-list"
import { PageHeader } from "@/components/page-header"
import { vedasData } from "@/lib/vedas-data"
import { cn } from "@/lib/utils"

export default function VedasPage() {
  const [filteredVedas, setFilteredVedas] = useState(vedasData)
  const [viewMode, setViewMode] = useState<"timeline" | "list">("timeline")

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          icon={Calendar}
          title="Calendario de Vedas"
          subtitle="Consulta los períodos de veda por especie y región para una pesca responsable"
        />

        <VedasFilters vedas={vedasData} onFilter={setFilteredVedas} />

        {/* Selector de vista */}
        <div className="flex items-center justify-end mb-6">
          <div className="inline-flex rounded-lg border border-teal-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode("timeline")}
              aria-pressed={viewMode === "timeline"}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                viewMode === "timeline" ? "bg-teal-100 text-teal-700" : "text-gray-500 hover:text-teal-600"
              )}
            >
              <GanttChartSquare className="w-4 h-4" />
              Línea de Tiempo
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                viewMode === "list" ? "bg-teal-100 text-teal-700" : "text-gray-500 hover:text-teal-600"
              )}
            >
              <List className="w-4 h-4" />
              Vista Lista
            </button>
          </div>
        </div>

        {viewMode === "timeline" && <VedasTimeline vedas={filteredVedas} />}
        {viewMode === "list" && <VedasList vedas={filteredVedas} />}

        {/* Información adicional */}
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center text-teal-800">
              <Info className="w-5 h-5 mr-2" />
              Información Importante
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">¿Qué es una veda?</h4>
                <p className="text-gray-700 text-sm">
                  Las vedas son períodos de prohibición temporal o permanente de captura, extracción o aprovechamiento de especies para permitir su
                  reproducción y conservación, garantizando la sustentabilidad de los recursos pesqueros.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Cumplimiento</h4>
                <p className="text-gray-700 text-sm">
                  El respeto a los períodos de veda es obligatorio y su incumplimiento está sujeto a sanciones
                  establecidas en la normatividad pesquera vigente.
                </p>
              </div>
            </div>

            {/* Tipos de Vedas */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Tipos de Vedas</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Veda Fija */}
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                  <h5 className="font-bold text-orange-800 mb-2 flex items-center">
                    Veda Fija
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Tiene fechas específicas que se repiten todos los años.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>No cambia aunque varíen las condiciones climáticas o biológicas.</span>
                    </li>
                  </ul>
                </div>

                {/* Veda Variable */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <h5 className="font-bold text-yellow-800 mb-2 flex items-center">
                    Veda Variable
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>No tiene fechas fijas: la autoridad la ajusta según información científica.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Se basa en: periodos reales de reproducción, niveles de población, condiciones ambientales.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Puede cambiar cada año o iniciarse solo cuando se detecta cierta condición biológica en la especie.</span>
                    </li>
                  </ul>
                </div>

                {/* Veda Permanente */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <h5 className="font-bold text-red-800 mb-2 flex items-center">
                    Veda Permanente
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Se establece por tiempo indefinido.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Generalmente se aplica cuando una especie está muy presionada, en peligro, o para proteger zonas críticas (guarderías, arrecifes, manglares).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Prohíbe la captura todo el año, cada año.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
