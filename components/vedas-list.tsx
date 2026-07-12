"use client"

import { MapPin, Fish, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type VedaData, isVedaActive, formatDateToDDMM } from "@/lib/vedas-data"

interface VedasListProps {
  vedas: VedaData[]
}

export function VedasList({ vedas }: VedasListProps) {
  // Los datos ya vienen filtrados desde VedasFilters
  const filteredVedas = vedas

  return (
    <div className="space-y-6">

      {/* Lista de vedas */}
      <div className="grid grid-cols-1 gap-2">
        {filteredVedas.length > 0 ? (
          filteredVedas.map((veda, index) => {
            const active = isVedaActive(veda)

            // Períodos de la veda (uno o varios), listos para mostrar en línea
            const periodos =
              veda.tipoVeda === "Permanente"
                ? ["Todo el año"]
                : [
                    `${formatDateToDDMM(veda.fechaInicio1)} - ${formatDateToDDMM(veda.fechaTermino1)}`,
                    veda.fechaInicio2 && veda.fechaTermino2
                      ? `${formatDateToDDMM(veda.fechaInicio2)} - ${formatDateToDDMM(veda.fechaTermino2)}`
                      : null,
                    veda.fechaInicio3 && veda.fechaTermino3
                      ? `${formatDateToDDMM(veda.fechaInicio3)} - ${formatDateToDDMM(veda.fechaTermino3)}`
                      : null,
                  ].filter(Boolean)

            return (
              <Card
                key={index}
                className={`relative overflow-hidden border backdrop-blur-sm transition-all duration-200 hover:shadow-md ${
                  active ? "border-red-200 bg-red-50/70 hover:border-red-300" : "border-gray-200 bg-white/90 hover:border-gray-300"
                }`}
              >
                {/* Barra de acento lateral: rojo = activa, gris = inactiva */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-1 ${active ? "bg-red-600" : "bg-gray-400"}`}
                  aria-hidden="true"
                />
                <CardContent className="py-3.5 pl-5 pr-4 text-sm">
                  {/* Encabezado: nombre, estado y nombre científico */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <Fish className="w-4 h-4 text-teal-600 shrink-0" />
                    <h3 className="text-base font-semibold text-gray-900">{veda.pesqueria}</h3>
                    <Badge
                      variant={active ? "default" : "secondary"}
                      className={`${active ? "bg-red-600 hover:bg-red-700" : "bg-gray-500 hover:bg-gray-600"}`}
                    >
                      {active ? "ACTIVA" : "INACTIVA"}
                    </Badge>
                    <span className="text-gray-600 italic">{veda.nombreCientifico}</span>
                  </div>

                  {/* Datos en una sola línea con separadores */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{veda.zona}</span>
                    <span className="text-gray-400">·</span>
                    <span>{veda.region}</span>
                    <span className="text-gray-400">·</span>
                    <span>{veda.tipoVeda}</span>
                  </div>

                  {/* Períodos y enlace al DOF */}
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-medium">{periodos.length > 1 ? "Períodos:" : "Período:"}</span>
                      {periodos.map((p, i) => (
                        <span key={i} className="flex items-center gap-x-2">
                          {i > 0 && <span className="text-gray-400">·</span>}
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-xs bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                    >
                      <a
                        href={veda.enlaceDOF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Ver DOF
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
            <CardContent className="p-12 text-center">
              <Fish className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron vedas</h3>
              <p className="text-gray-600">No hay vedas que coincidan con los filtros seleccionados.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Resumen */}
      <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Mostrando {filteredVedas.length} vedas
            </span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                {filteredVedas.filter(isVedaActive).length} Activas
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                {filteredVedas.filter((veda) => !isVedaActive(veda)).length} Inactivas
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
