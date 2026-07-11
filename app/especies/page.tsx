"use client"

import { useState } from "react"
import Link from "next/link"
import { Fish, TrendingUp, AlertTriangle, CheckCircle, XCircle, MapPin, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { FilterBar } from "@/components/filter-bar"
import { cn } from "@/lib/utils"
import { especies } from "@/lib/especies-data"

const toArray = <T,>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])

const getStatusIcon = (statusColor: string) => {
  switch (statusColor) {
    case "green":
      return <CheckCircle className="w-4 h-4" />
    case "red":
      return <XCircle className="w-4 h-4" />
    case "yellow":
      return <TrendingUp className="w-4 h-4" />
    case "gray":
      return <AlertTriangle className="w-4 h-4" />
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
    case "gray":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Get unique regions for filter
const getUniqueRegions = () => {
  const regions = especies.map((especie) => especie.region)
  return [...new Set(regions)].sort()
}

// Imagen de la especie con respaldo (ícono) si aún no existe la foto.
// Coloca las fotos en public/images/especies/{id}.jpg
function EspecieImagen({
  especie,
  className,
}: {
  especie: { id: string; nombre: string }
  className?: string
}) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100", className)}>
        <Fish className="w-1/3 h-1/3 text-teal-400" />
      </div>
    )
  }

  return (
    <img
      src={`/images/especies/${especie.id}.jpg`}
      alt={especie.nombre}
      className={className}
      onError={() => setError(true)}
    />
  )
}

export default function EspeciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [regionFilter, setRegionFilter] = useState("todas")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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

  const uniqueRegions = getUniqueRegions()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          icon={Fish}
          title="Pesquerías"
          subtitle="Información sobre las principales pesquerías de México de acuerdo a la Carta Nacional Pesquera."
        />

        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar especies..."
          onClear={() => {
            setSearchTerm("")
            setStatusFilter("todos")
            setRegionFilter("todas")
          }}
        >
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-full md:w-52 bg-white border-gray-200">
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
              <SelectItem value="gray">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-gray-600" />
                  Indeterminado
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="h-9 w-full md:w-52 bg-white border-gray-200">
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
        </FilterBar>

        {/* Selector de vista */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            {filteredEspecies.length} {filteredEspecies.length === 1 ? "pesquería" : "pesquerías"}
          </p>
          <div className="inline-flex rounded-lg border border-teal-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                viewMode === "grid" ? "bg-teal-100 text-teal-700" : "text-gray-500 hover:text-teal-600"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Fichas
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
              Lista
            </button>
          </div>
        </div>

        {/* Vista de fichas: imagen + nombre + región */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredEspecies.map((especie) => (
              <Link key={especie.id} href={`/especies/${especie.id}`}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-teal-200 hover:border-teal-300 cursor-pointer group">
                  <div className="aspect-square w-full overflow-hidden">
                    <EspecieImagen
                      especie={especie}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-teal-700 transition-colors leading-tight">
                      {especie.nombre}
                    </h3>
                    <div className="mt-1.5 flex items-start text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-teal-600 flex-shrink-0 mt-px" />
                      <span>{especie.region}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Vista de lista: foto + especie + nombre científico + región + fuente + estado */}
        {viewMode === "list" && (
          <div className="space-y-3">
            {filteredEspecies.map((especie) => (
              <Link key={especie.id} href={`/especies/${especie.id}`}>
                <Card className="hover:shadow-md transition-all duration-300 bg-white/90 backdrop-blur-sm border-teal-200 hover:border-teal-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-full sm:w-20 h-40 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <EspecieImagen especie={especie} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                          {especie.nombre}
                        </h3>
                        <p className="text-sm text-gray-600 italic">{especie.nombreCientifico}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-teal-600" />
                            {especie.region}
                          </span>
                          <span>Fuente: CNP, 2025</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 sm:justify-end sm:max-w-[45%]">
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
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

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
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              Limpiar todos los filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
