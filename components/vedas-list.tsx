"use client"

import { Calendar, MapPin, Fish, Clock, AlertTriangle } from "lucide-react"
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
      <div className="grid grid-cols-1 gap-4">
        {filteredVedas.length > 0 ? (
          filteredVedas.map((veda, index) => {
            const active = isVedaActive(veda)
            return (
              <Card
                key={index}
                className={`bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-lg ${
                  active ? "border-red-200 hover:border-red-300" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Fish className="w-5 h-5 text-teal-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{veda.pesqueria}</h3>
                        <Badge
                          variant={active ? "default" : "secondary"}
                          className={`${active ? "bg-red-600 hover:bg-red-700" : "bg-gray-500 hover:bg-gray-600"}`}
                        >
                          {active ? "ACTIVA" : "INACTIVA"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 italic mb-3">{veda.nombreCientifico}</p>

                      {/* Información reorganizada según el orden solicitado */}
                      <div className="space-y-4 text-sm">
                        {/* Primera fila: Región, Zona, Tipo */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Región:</span>
                            <span className="ml-1">{veda.region}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Zona:</span>
                            <span className="ml-1">{veda.zona}</span>
                          </div>

                          <div className="flex items-center text-gray-600">
                            <AlertTriangle className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Tipo:</span>
                            <span className="ml-1">{veda.tipoVeda}</span>
                          </div>
                        </div>

                        {/* Segunda fila: Períodos */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Período 1:</span>
                            <span className="ml-1">
                              {veda.tipoVeda === "Permanente"
                                ? "Todo el año"
                                : `${formatDateToDDMM(veda.fechaInicio1)} - ${formatDateToDDMM(veda.fechaTermino1)}`}
                            </span>
                          </div>

                          {veda.fechaInicio2 && veda.fechaTermino2 && (
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="font-medium">Período 2:</span>
                              <span className="ml-1">
                                {formatDateToDDMM(veda.fechaInicio2)} - {formatDateToDDMM(veda.fechaTermino2)}
                              </span>
                            </div>
                          )}

                          {veda.fechaInicio3 && veda.fechaTermino3 && (
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="font-medium">Período 3:</span>
                              <span className="ml-1">
                                {formatDateToDDMM(veda.fechaInicio3)} - {formatDateToDDMM(veda.fechaTermino3)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Nombre del acuerdo */}
                        <div className="pt-2 border-t border-gray-200">
                          <div className="text-gray-600">
                            <span className="font-medium">Acuerdo:</span>
                            <p className="ml-1 text-xs mt-1 leading-relaxed">{veda.nombreAcuerdo}</p>
                          </div>
                        </div>

                        {/* Fecha de publicación y botón DOF */}
                        <div className="flex items-center justify-between text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Publicación:</span>
                            <span className="ml-1">{veda.fechaPublicacion}</span>
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
                      </div>
                    </div>
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
