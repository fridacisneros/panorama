"use client"

import { MapPin, Fish, Clock, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type VedaData, formatDateToDDMM } from "@/lib/vedas-data"

interface VedasListProps {
  vedas: VedaData[]
}

export function VedasList({ vedas }: VedasListProps) {
  // Los datos ya vienen filtrados desde VedasFilters
  const filteredVedas = vedas

  return (
    <div className="space-y-6">

      {/* Lista de vedas */}
      {filteredVedas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVedas.map((veda, index) => {
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
                className="relative overflow-hidden border border-teal-200 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* Barra de acento lateral */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"
                  aria-hidden="true"
                />
                <CardContent className="flex h-full flex-col gap-2.5 p-4 pl-5">
                  {/* Clasificación */}
                  <Badge
                    variant="outline"
                    className="w-fit text-xs font-semibold bg-teal-50 text-teal-700 border-teal-200"
                  >
                    Veda
                  </Badge>

                  {/* Nombre y nombre científico */}
                  <div>
                    <h3 className="text-base font-semibold leading-snug text-gray-900">{veda.pesqueria}</h3>
                    {veda.nombreCientifico && (
                      <p className="text-xs italic text-gray-500">{veda.nombreCientifico}</p>
                    )}
                  </div>

                  {/* Datos: zona, región, tipo de veda y períodos */}
                  <div className="flex-1 space-y-1 text-xs text-gray-600">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                      <span>
                        {veda.zona} · {veda.region} · {veda.tipoVeda}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                      <span>{periodos.join(" · ")}</span>
                    </div>
                  </div>

                  {/* Botón de descarga (abre la publicación del DOF) */}
                  <div className="mt-auto flex justify-end">
                    <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700">
                      <a href={veda.enlaceDOF} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
          <CardContent className="p-12 text-center">
            <Fish className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron vedas</h3>
            <p className="text-gray-600">No hay vedas que coincidan con los filtros seleccionados.</p>
          </CardContent>
        </Card>
      )}

      {/* Resumen */}
      {filteredVedas.length > 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">
              Mostrando {filteredVedas.length} {filteredVedas.length === 1 ? "veda" : "vedas"}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
