"use client"

import { useState, useEffect } from "react"
import { Calendar, Fish, Clock, MapPin, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VedasFilters } from "@/components/vedas-filters"
import { VedasCalendar } from "@/components/vedas-calendar"
import { VedasList } from "@/components/vedas-list"
import { vedasData, type VedaData, isVedaActive } from "@/lib/vedas-data"

export default function VedasPage() {
  const [filteredVedas, setFilteredVedas] = useState(vedasData)
  const [activeTab, setActiveTab] = useState("calendar")
  const [mounted, setMounted] = useState(false)
  const [activeVedas, setActiveVedas] = useState<VedaData[]>([])
  const [inactiveVedas, setInactiveVedas] = useState<VedaData[]>([])

  // Calcular estadísticas solo después de la hidratación
  useEffect(() => {
    setMounted(true)
    const active = vedasData.filter((veda) => isVedaActive(veda))
    const inactive = vedasData.filter((veda) => !isVedaActive(veda))
    setActiveVedas(active)
    setInactiveVedas(inactive)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Calendario de Vedas
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Consulta los períodos de veda por especie y región para una pesca responsable
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Vedas Activas</p>
                  <p className="text-3xl font-bold">{mounted ? activeVedas.length : "..."}</p>
                  <p className="text-red-200 text-xs">En curso</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Vedas Inactivas</p>
                  <p className="text-3xl font-bold">{mounted ? inactiveVedas.length : "..."}</p>
                  <p className="text-yellow-200 text-xs">No vigentes</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm font-medium">Total Especies</p>
                  <p className="text-3xl font-bold">{vedasData.length}</p>
                  <p className="text-teal-200 text-xs">Reguladas</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Fish className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="bg-white/80 backdrop-blur-sm border-teal-200 mb-6">
          <CardContent className="p-6">
            <VedasFilters vedas={vedasData} onFilter={setFilteredVedas} />
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-teal-200">
            <TabsTrigger
              value="calendar"
              className="flex items-center data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Vista Calendario
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="flex items-center data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800"
            >
              <Fish className="w-4 h-4 mr-2" />
              Vista Lista
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <VedasCalendar vedas={filteredVedas} />
          </TabsContent>

          <TabsContent value="list">
            <VedasList vedas={filteredVedas} />
          </TabsContent>
        </Tabs>

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
