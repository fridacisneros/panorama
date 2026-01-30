"use client"

import { useState, useEffect, useCallback } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Fish,
  Calendar,
  Loader2,
  AlertCircle,
  RefreshCw,
  Database,
  MapPin,
  Anchor,
  Scale,
  Filter,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Colores para gráficos
const COLORS = ["#0d9488", "#06b6d4", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#ec4899"]

// Formatear números grandes
const formatNumber = (num: number | string | null) => {
  if (num === null || num === undefined) return "0"
  const n = typeof num === "string" ? parseFloat(num) : num
  if (isNaN(n)) return "0"
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n.toFixed(0)
}

// Formatear moneda
const formatCurrency = (num: number | string | null) => {
  if (num === null || num === undefined) return "$0"
  const n = typeof num === "string" ? parseFloat(num) : num
  if (isNaN(n)) return "$0"
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

interface Filtros {
  años: (number | null)[]
  estados: (string | null)[]
  especies: (string | null)[]
  litorales: (string | null)[]
}

interface Resumen {
  total_registros: number
  total_especies: number
  total_estados: number
  captura_total_kg: string | null
  valor_total_pesos: string | null
}

// Componente para estado vacío (fuera del componente principal)
function EmptyState({ message }: { message: string }) {
  return (
    <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-gray-500 gap-3">
      <Database className="w-10 h-10 text-gray-300" />
      <p className="text-sm text-center">{message}</p>
    </div>
  )
}

export default function Dashboard() {
  // Estados de datos
  const [filtrosDisponibles, setFiltrosDisponibles] = useState<Filtros | null>(null)
  const [resumen, setResumen] = useState<Resumen | null>(null)
  const [capturaAnual, setCapturaAnual] = useState([])
  const [capturaMensual, setCapturaMensual] = useState([])
  const [precios, setPrecios] = useState([])
  const [especiesTop, setEspeciesTop] = useState([])
  const [estadosTop, setEstadosTop] = useState([])
  const [litorales, setLitorales] = useState([])

  // Estados de UI
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filtros seleccionados
  const [añoInicio, setAñoInicio] = useState("")
  const [añoFin, setAñoFin] = useState("")
  const [añoSeleccionado, setAñoSeleccionado] = useState("")
  const [especieSeleccionada, setEspecieSeleccionada] = useState("__all__")
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("__all__")
  const [litoralSeleccionado, setLitoralSeleccionado] = useState("__all__")

  // Cargar filtros disponibles al inicio
  useEffect(() => {
    cargarFiltros()
  }, [])

  // Cargar datos cuando cambian los filtros
  useEffect(() => {
    if (filtrosDisponibles && añoInicio && añoFin && añoSeleccionado) {
      cargarDatos()
    }
  }, [añoInicio, añoFin, añoSeleccionado, especieSeleccionada, estadoSeleccionado, litoralSeleccionado])

  async function cargarFiltros() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/stats?tipo=filtros")
      if (!res.ok) throw new Error("Error al cargar filtros")
      const data = await res.json()
      const filtros = data.data as Filtros

      setFiltrosDisponibles(filtros)

      // Establecer valores por defecto
      const años = filtros.años.filter((a): a is number => a !== null).sort((a, b) => a - b)
      if (años.length > 0) {
        setAñoInicio(años[0].toString())
        setAñoFin(años[años.length - 1].toString())
        setAñoSeleccionado(años[años.length - 1].toString())
      }
    } catch (err) {
      console.error("Error:", err)
      setError("No se pudieron cargar los filtros. Verifica tu conexión.")
    }
    setLoading(false)
  }

  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams()
    if (especieSeleccionada && especieSeleccionada !== "__all__") params.set("especie", especieSeleccionada)
    if (estadoSeleccionado && estadoSeleccionado !== "__all__") params.set("estado", estadoSeleccionado)
    if (litoralSeleccionado && litoralSeleccionado !== "__all__") params.set("litoral", litoralSeleccionado)
    return params.toString()
  }, [especieSeleccionada, estadoSeleccionado, litoralSeleccionado])

  async function cargarDatos() {
    setLoadingData(true)
    setError(null)
    try {
      const baseParams = buildQueryParams()
      const añoParams = `añoInicio=${añoInicio}&añoFin=${añoFin}`
      const añoMensualParam = `año=${añoSeleccionado}`

      const requests = [
        fetch(`/api/stats?tipo=resumen&${añoParams}&${baseParams}`),
        fetch(`/api/stats?tipo=captura-anual&${añoParams}&${baseParams}`),
        fetch(`/api/stats?tipo=captura-mensual&${añoMensualParam}&${baseParams}`),
        fetch(`/api/stats?tipo=precios&${añoParams}&${baseParams}`),
        fetch(`/api/stats?tipo=especies-top&${añoMensualParam}&${baseParams}`),
        fetch(`/api/stats?tipo=estados-top&${añoMensualParam}&${baseParams}`),
        fetch(`/api/stats?tipo=litorales&${añoMensualParam}&${baseParams}`),
      ]

      const responses = await Promise.all(requests)

      // Verificar errores
      for (const res of responses) {
        if (!res.ok) throw new Error("Error al obtener datos")
      }

      const [
        resumenData,
        capturaAnualData,
        capturaMensualData,
        preciosData,
        especiesData,
        estadosData,
        litoralesData,
      ] = await Promise.all(responses.map((r) => r.json()))

      setResumen(resumenData.data)
      setCapturaAnual(capturaAnualData.data || [])
      setCapturaMensual(capturaMensualData.data || [])
      setPrecios(preciosData.data || [])
      setEspeciesTop(especiesData.data || [])
      setEstadosTop(estadosData.data || [])
      setLitorales(litoralesData.data || [])
    } catch (err) {
      console.error("Error:", err)
      setError("No se pudieron cargar los datos. Intenta de nuevo.")
    }
    setLoadingData(false)
  }

  const limpiarFiltros = () => {
    setEspecieSeleccionada("__all__")
    setEstadoSeleccionado("__all__")
    setLitoralSeleccionado("__all__")
  }
  
  const hayFiltrosActivos = especieSeleccionada !== "__all__" || estadoSeleccionado !== "__all__" || litoralSeleccionado !== "__all__"

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-teal-700">
          <Loader2 className="w-10 h-10 animate-spin" />
          <span className="text-lg font-medium">Cargando dashboard...</span>
        </div>
      </div>
    )
  }

  if (error && !filtrosDisponibles) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/90 border-red-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Error de conexión</h2>
                <p className="text-gray-600 mb-4">{error}</p>
              </div>
              <Button onClick={cargarFiltros} className="bg-teal-600 hover:bg-teal-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const años = filtrosDisponibles?.años.filter((a): a is number => a !== null).sort((a, b) => a - b) || []
  const estados = filtrosDisponibles?.estados.filter((e): e is string => e !== null) || []
  const especies = filtrosDisponibles?.especies.filter((e): e is string => e !== null) || []
  const litoralesOpciones = filtrosDisponibles?.litorales.filter((l): l is string => l !== null) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Dashboard de Pesquerías
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Análisis interactivo de capturas, precios y distribución por especie, estado y región
          </p>
        </div>

        {/* Tarjetas Resumen */}
        {resumen && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-xs font-medium">Captura Total</p>
                    <p className="text-2xl font-bold">{formatNumber(resumen.captura_total_kg)} kg</p>
                  </div>
                  <Scale className="w-8 h-8 text-teal-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-100 text-xs font-medium">Valor Total</p>
                    <p className="text-2xl font-bold">{formatCurrency(resumen.valor_total_pesos)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-cyan-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-xs font-medium">Especies</p>
                    <p className="text-2xl font-bold">{resumen.total_especies}</p>
                  </div>
                  <Fish className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-xs font-medium">Registros</p>
                    <p className="text-2xl font-bold">{formatNumber(resumen.total_registros)}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filtros */}
        <Card className="bg-white/80 backdrop-blur-sm border-teal-200 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-teal-800">
              <Filter className="w-5 h-5" />
              Filtros de Análisis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Año Inicio */}
              <div className="space-y-2">
                <Label className="text-gray-700 text-sm">Año Inicio</Label>
                <Select value={añoInicio} onValueChange={setAñoInicio}>
                  <SelectTrigger className="bg-white border-teal-200">
                    <SelectValue placeholder="Inicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {años.map((año) => (
                      <SelectItem key={año} value={año.toString()}>
                        {año}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Año Fin */}
              <div className="space-y-2">
                <Label className="text-gray-700 text-sm">Año Fin</Label>
                <Select value={añoFin} onValueChange={setAñoFin}>
                  <SelectTrigger className="bg-white border-teal-200">
                    <SelectValue placeholder="Fin" />
                  </SelectTrigger>
                  <SelectContent>
                    {años.map((año) => (
                      <SelectItem key={año} value={año.toString()}>
                        {año}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Año Mensual */}
              <div className="space-y-2">
                <Label className="text-gray-700 text-sm">Año Detalle</Label>
                <Select value={añoSeleccionado} onValueChange={setAñoSeleccionado}>
                  <SelectTrigger className="bg-white border-teal-200">
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                    {años.map((año) => (
                      <SelectItem key={año} value={año.toString()}>
                        {año}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Especie */}
              <div className="space-y-2">
                <Label className="text-gray-700 text-sm">Especie</Label>
                <Select value={especieSeleccionada} onValueChange={setEspecieSeleccionada}>
                  <SelectTrigger className="bg-white border-teal-200">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todas las especies</SelectItem>
                    {especies.slice(0, 100).map((esp) => (
                      <SelectItem key={esp} value={esp}>
                        {esp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Estado */}
              <div className="space-y-2">
                <Label className="text-gray-700 text-sm">Estado</Label>
                <Select value={estadoSeleccionado} onValueChange={setEstadoSeleccionado}>
                  <SelectTrigger className="bg-white border-teal-200">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todos los estados</SelectItem>
                    {estados.map((est) => (
                      <SelectItem key={est} value={est}>
                        {est}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Litoral */}
              <div className="space-y-2">
                <Label className="text-gray-700 text-sm">Litoral</Label>
                <Select value={litoralSeleccionado} onValueChange={setLitoralSeleccionado}>
                  <SelectTrigger className="bg-white border-teal-200">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todos los litorales</SelectItem>
                    {litoralesOpciones.map((lit) => (
                      <SelectItem key={lit} value={lit}>
                        {lit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botón limpiar */}
            {hayFiltrosActivos && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={limpiarFiltros} className="border-teal-200">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading overlay para datos */}
        {loadingData && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <Card className="bg-white p-6">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                <span>Actualizando datos...</span>
              </div>
            </Card>
          </div>
        )}

        {/* Error de datos */}
        {error && filtrosDisponibles && (
          <Card className="bg-red-50 border-red-200 mb-8">
            <CardContent className="py-4">
              <div className="flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
                <Button size="sm" variant="outline" onClick={cargarDatos} className="ml-auto">
                  Reintentar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs de gráficos */}
        <Tabs defaultValue="tendencias" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-teal-200">
            <TabsTrigger value="tendencias" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800">
              <TrendingUp className="w-4 h-4 mr-2" />
              Tendencias
            </TabsTrigger>
            <TabsTrigger value="distribucion" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800">
              <MapPin className="w-4 h-4 mr-2" />
              Distribución
            </TabsTrigger>
            <TabsTrigger value="rankings" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800">
              <BarChart3 className="w-4 h-4 mr-2" />
              Rankings
            </TabsTrigger>
          </TabsList>

          {/* Tab Tendencias */}
          <TabsContent value="tendencias" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Captura Anual */}
              <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-teal-800 text-lg">
                    <TrendingUp className="w-5 h-5 text-teal-600" />
                    Captura por Año
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {capturaAnual.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={capturaAnual}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => formatNumber(v)} />
                        <Tooltip
                          formatter={(value: number) => [formatNumber(value) + " kg", "Captura"]}
                          contentStyle={{ backgroundColor: "white", border: "1px solid #14b8a6", borderRadius: "8px" }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="total" stroke="#0d9488" strokeWidth={2} name="Captura (kg)" dot={{ fill: "#0d9488" }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState message="Sin datos de captura para los filtros seleccionados" />
                  )}
                </CardContent>
              </Card>

              {/* Captura Mensual */}
              <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-teal-800 text-lg">
                    <Calendar className="w-5 h-5 text-cyan-600" />
                    Captura Mensual - {añoSeleccionado}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {capturaMensual.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={capturaMensual}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="mes" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => formatNumber(v)} />
                        <Tooltip
                          formatter={(value: number) => [formatNumber(value) + " kg", "Promedio"]}
                          contentStyle={{ backgroundColor: "white", border: "1px solid #06b6d4", borderRadius: "8px" }}
                        />
                        <Legend />
                        <Bar dataKey="promedio" fill="#06b6d4" name="Promedio (kg)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState message="Sin datos mensuales para los filtros seleccionados" />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Precios */}
            <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-teal-800 text-lg">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  Tendencia de Precios
                </CardTitle>
              </CardHeader>
              <CardContent>
                {precios.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={precios}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="año" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${formatNumber(v)}`} />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        contentStyle={{ backgroundColor: "white", border: "1px solid #f59e0b", borderRadius: "8px" }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="precio_promedio" stroke="#f59e0b" strokeWidth={2} name="Precio Promedio" dot={{ fill: "#f59e0b" }} />
                      <Line type="monotone" dataKey="precio_max" stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" name="Precio Máximo" />
                      <Line type="monotone" dataKey="precio_min" stroke="#3b82f6" strokeWidth={1} strokeDasharray="5 5" name="Precio Mínimo" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState message="Sin datos de precios para los filtros seleccionados" />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Distribución */}
          <TabsContent value="distribucion" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Por Litoral - Pie Chart */}
              <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-teal-800 text-lg">
                    <Anchor className="w-5 h-5 text-blue-600" />
                    Captura por Litoral - {añoSeleccionado}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {litorales.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={litorales}
                          dataKey="total_captura"
                          nameKey="litoral"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ name, percent }) => `${name || "N/A"}: ${((percent || 0) * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {litorales.map((entry: { litoral: string | null }, index: number) => (
                            <Cell key={`cell-${entry.litoral || index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [formatNumber(value) + " kg", "Captura"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState message="Sin datos por litoral" />
                  )}
                </CardContent>
              </Card>

              {/* Por Estado - Bar horizontal */}
              <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-teal-800 text-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    Top 10 Estados - {añoSeleccionado}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {estadosTop.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={estadosTop} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(v) => formatNumber(v)} />
                        <YAxis dataKey="estado" type="category" width={100} stroke="#64748b" fontSize={11} />
                        <Tooltip
                          formatter={(value: number) => [formatNumber(value) + " kg", "Captura"]}
                          contentStyle={{ backgroundColor: "white", border: "1px solid #8b5cf6", borderRadius: "8px" }}
                        />
                        <Bar dataKey="total_captura" fill="#8b5cf6" name="Captura (kg)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState message="Sin datos por estado" />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Rankings */}
          <TabsContent value="rankings" className="space-y-6">
            {/* Top Especies */}
            <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-teal-800 text-lg">
                  <Fish className="w-5 h-5 text-teal-600" />
                  Top 10 Especies por Captura - {añoSeleccionado}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {especiesTop.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={especiesTop} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(v) => formatNumber(v)} />
                      <YAxis dataKey="especie" type="category" width={150} stroke="#64748b" fontSize={11} />
                      <Tooltip
                        formatter={(value: number) => [formatNumber(value) + " kg", "Captura"]}
                        contentStyle={{ backgroundColor: "white", border: "1px solid #0d9488", borderRadius: "8px" }}
                      />
                      <Legend />
                      <Bar dataKey="total_captura" fill="#0d9488" name="Captura Total (kg)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState message="Sin datos de especies para los filtros seleccionados" />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
