"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Fish,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { FilterBar } from "@/components/filter-bar"
import { FichaDetalle } from "@/components/ficha-detalle"
import { cn } from "@/lib/utils"
import { especies } from "@/lib/especies-data"

const toArray = <T,>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])

const statusDotColor = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-500"
    case "red":
      return "bg-red-500"
    case "yellow":
      return "bg-yellow-500"
    default:
      return "bg-gray-400"
  }
}

const getUniqueRegions = () => [...new Set(especies.map((e) => e.region))].sort()

function EspecieMiniatura({ id, nombre, className }: { id: string; nombre: string; className?: string }) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100", className)}>
        <Fish className="w-1/2 h-1/2 text-teal-400" />
      </div>
    )
  }
  return <img src={`/images/especies/${id}.jpg`} alt={nombre} className={className} onError={() => setError(true)} />
}

export default function EspeciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [regionFilter, setRegionFilter] = useState("todas")
  const [selectedId, setSelectedId] = useState<string>(especies[0]?.id ?? "")
  const [detailOpenMobile, setDetailOpenMobile] = useState(false)

  const uniqueRegions = useMemo(getUniqueRegions, [])

  // Enlace profundo: leer ?id= al cargar y mantener la URL sincronizada.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    if (id && especies.some((e) => e.id === id)) {
      setSelectedId(id)
      setDetailOpenMobile(true)
    }
  }, [])

  const filteredEspecies = useMemo(
    () =>
      especies.filter((especie) => {
        const statusColors = toArray(especie.statusColor)
        const matchesSearch =
          especie.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          especie.nombreCientifico.toLowerCase().includes(searchTerm.toLowerCase()) ||
          especie.zona.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "todos" || statusColors.includes(statusFilter)
        const matchesRegion = regionFilter === "todas" || especie.region === regionFilter
        return matchesSearch && matchesStatus && matchesRegion
      }),
    [searchTerm, statusFilter, regionFilter],
  )

  const selected = especies.find((e) => e.id === selectedId) ?? filteredEspecies[0] ?? especies[0]

  const selectEspecie = (id: string) => {
    setSelectedId(id)
    setDetailOpenMobile(true)
    const url = new URL(window.location.href)
    url.searchParams.set("id", id)
    window.history.replaceState(null, "", url.toString())
  }

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

        <p className="text-sm text-gray-600 mb-4">
          {filteredEspecies.length} {filteredEspecies.length === 1 ? "pesquería" : "pesquerías"}
        </p>

        {/* Panel lateral: lista + detalle en la misma pantalla */}
        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-5 lg:items-start">
          {/* Lista */}
          <div
            className={cn(
              "rounded-xl border border-teal-200 bg-white/90 backdrop-blur-sm p-2 lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto",
              detailOpenMobile && "hidden lg:block",
            )}
            role="listbox"
            aria-label="Pesquerías"
          >
            {filteredEspecies.length === 0 ? (
              <div className="text-center py-10 px-4">
                <Fish className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-700 font-medium mb-1">No se encontraron especies</p>
                <p className="text-sm text-gray-500 mb-3">Intenta ajustar los filtros</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("todos")
                    setRegionFilter("todas")
                  }}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {filteredEspecies.map((especie) => {
                  const colores = toArray(especie.statusColor)
                  const activo = selected?.id === especie.id
                  return (
                    <button
                      key={especie.id}
                      type="button"
                      role="option"
                      aria-selected={activo}
                      onClick={() => selectEspecie(especie.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg p-2 text-left transition-colors border",
                        activo
                          ? "bg-teal-50 border-teal-300"
                          : "border-transparent hover:bg-gray-50",
                      )}
                    >
                      <div className="w-11 h-11 flex-shrink-0 rounded-lg overflow-hidden">
                        <EspecieMiniatura id={especie.id} nombre={especie.nombre} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("font-semibold text-sm leading-tight truncate", activo ? "text-teal-700" : "text-gray-900")}>
                          {especie.nombre}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{especie.region}</p>
                      </div>
                      <div className="flex flex-shrink-0 gap-0.5">
                        {colores.map((c, i) => (
                          <span key={i} className={cn("w-2.5 h-2.5 rounded-full", statusDotColor(c))} />
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Detalle */}
          <div className={cn("mt-4 lg:mt-0", !detailOpenMobile && "hidden lg:block")}>
            <div className="rounded-xl border border-teal-200 bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden">
              <div className="lg:hidden border-b border-teal-100 p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDetailOpenMobile(false)}
                  className="text-teal-700 hover:bg-teal-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Volver a la lista
                </Button>
              </div>
              {selected && <FichaDetalle key={selected.id} especie={selected} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
