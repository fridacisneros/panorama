"use client"

import { useState } from "react"
import Link from "next/link"
import { Fish, Search, Filter, TrendingUp, AlertTriangle, CheckCircle, XCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const especies = [
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
    status: ["Aprovechado al máximo sustentable","En deterioro"],
    statusColor: ["yellow","red"],
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
]

const toArray = <T,>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])

const getStatusIcon = (statusColor: string) => {
  switch (statusColor) {
    case "green":
      return <CheckCircle className="w-4 h-4" />
    case "red":
      return <XCircle className="w-4 h-4" />
    case "yellow":
      return <TrendingUp className="w-4 h-4" />
    default:
      return <Fish className="w-4 h-4" />
  }
}

const getStatusBadgeClass = (statusColor: string) => {
  switch (statusColor) {
    case "green":
      return "bg-green-100 text-green-800 border-green-200"
    case "red":
      return "bg-red-100 text-red-800 border-red-200"
    case "yellow":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Get unique regions for filter
const getUniqueRegions = () => {
  const regions = especies.map((especie) => especie.region)
  return [...new Set(regions)].sort()
}

export default function EspeciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [regionFilter, setRegionFilter] = useState("todas")

  const filteredEspecies = especies.filter((especie) => {
    const statusColors = toArray(especie.statusColor)
    const matchesSearch =
      especie.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      especie.nombreCientifico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      especie.zona.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || statusColors.includes(statusFilter)
    const matchesRegion = regionFilter === "todas" || especie.region === regionFilter

    return matchesSearch && matchesStatus && matchesRegion
  })

  // Estadísticas por estado de conservación
  const estadisticas = {
    saludable: especies.filter((e) => toArray(e.statusColor).includes("green")).length,
    critico: especies.filter((e) => toArray(e.statusColor).includes("red")).length,
    desarrollo: especies.filter((e) => toArray(e.statusColor).includes("yellow")).length,
  }

  const uniqueRegions = getUniqueRegions()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4">
            <Fish className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Pesquerías
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Información sobre las principales pesquerías de México de acuerdo a la Carta Nacional Pesquera.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Con potencial de desarrollo</p>
                  <p className="text-3xl font-bold">{estadisticas.saludable}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Aprovechado al máximo sustentable</p>
                  <p className="text-3xl font-bold">{estadisticas.desarrollo}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">En deterioro</p>
                  <p className="text-3xl font-bold">{estadisticas.critico}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h3>
            </div>

            {/* Search input moved inside */}
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar especies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-blue-200"
                  />
                </div>

                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-white border-blue-200">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      <SelectItem value="green">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Con potencial de desarrollo
                        </div>
                      </SelectItem>
                      <SelectItem value="yellow">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-yellow-600" />
                          Aprovechado al máximo sustentable
                        </div>
                      </SelectItem>
                      <SelectItem value="red">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          En deterioro
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={regionFilter} onValueChange={setRegionFilter}>
                    <SelectTrigger className="bg-white border-blue-200">
                      <SelectValue placeholder="Región" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          Todas las regiones
                        </div>
                      </SelectItem>
                      {uniqueRegions.map((region) => (
                        <SelectItem key={region} value={region}>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            {region}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("todos")
                      setRegionFilter("todas")
                    }}
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-white"
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            </div>

            {/* Resultados de filtros */}
          </CardContent>
        </Card>

        {/* Grid de especies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEspecies.map((especie) => (
            <Link key={especie.id} href={`/especies/${especie.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-blue-200 hover:border-blue-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {especie.nombre}
                      </CardTitle>
                      <p className="text-sm text-gray-600 italic mt-1">{especie.nombreCientifico}</p>
                    </div>
                    <Fish className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    

                    

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Región:</span>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {especie.region}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Fuente:</span>
                      <span className="text-sm font-medium">CNP, 2025</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-600">Estado:</span>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {toArray(especie.status).map((status, i) => {
                          const statusColor = toArray(especie.statusColor)[i] ?? toArray(especie.statusColor)[0]
                          return (
                            <Badge
                              key={`${especie.id}-status-${i}`}
                              className={`${getStatusBadgeClass(statusColor)} flex items-center space-x-1`}
                            >
                              {getStatusIcon(statusColor)}
                              <span className="text-xs">{status}</span>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredEspecies.length === 0 && (
          <div className="text-center py-12">
            <Fish className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron especies</h3>
            <p className="text-gray-600 mb-4">Intenta ajustar los filtros de búsqueda</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("todos")
                setRegionFilter("todas")
              }}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Limpiar todos los filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
