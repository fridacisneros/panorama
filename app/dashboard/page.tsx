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
  ScatterChart,
  Scatter,
  ComposedChart,
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
  DollarSign,
  Building2,
  Activity,
  PieChartIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
const COLORS = ["#0d9488", "#06b6d4", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#ec4899", "#6366f1", "#14b8a6"]
const HEATMAP_COLORS = ["#f0fdfa", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59"]

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
  tiposZona: (string | null)[]
}

interface Resumen {
  total_registros: number
  total_especies: number
  total_estados: number
  captura_total_kg: string | null
  valor_total_pesos: string | null
}

// Componente para estado vacío
function EmptyState({ message }: { message: string }) {
  return (
    <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-gray-500 gap-3">
      <Database className="w-8 h-8 text-gray-300" />
      <p className="text-sm text-center">{message}</p>
    </div>
  )
}

// Componente Heatmap para estacionalidad
function HeatmapChart({ data }: { data: { especie: string; mes: string; mes_num: number; peso_desembarcado: string }[] }) {
  if (!data || data.length === 0) return <EmptyState message="Sin datos de estacionalidad" />

  const especies = [...new Set(data.map(d => d.especie))].filter(Boolean)
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  
  const matrix: { [especie: string]: { [mes: number]: number } } = {}
  let maxValue = 0
  
  especies.forEach(esp => {
    matrix[esp] = {}
    for (let i = 1; i <= 12; i++) {
      const found = data.find(d => d.especie === esp && d.mes_num === i)
      const value = found ? parseFloat(found.peso_desembarcado || '0') : 0
      matrix[esp][i] = value
      if (value > maxValue) maxValue = value
    }
  })

  const getColor = (value: number) => {
    if (value === 0) return HEATMAP_COLORS[0]
    const intensity = Math.min(Math.floor((value / maxValue) * 7), 7)
    return HEATMAP_COLORS[intensity]
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="grid gap-1" style={{ gridTemplateColumns: `120px repeat(12, 1fr)` }}>
          <div className="text-xs font-medium text-gray-500 p-1"></div>
          {meses.map((mes, i) => (
            <div key={i} className="text-[10px] font-medium text-gray-500 p-1 text-center">{mes}</div>
          ))}
          
          {especies.slice(0, 8).map(especie => (
            <div key={especie} className="contents">
              <div className="text-[11px] text-gray-700 p-1 truncate" title={especie}>
                {especie.length > 15 ? especie.substring(0, 15) + '...' : especie}
              </div>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(mes => {
                const value = matrix[especie]?.[mes] || 0
                return (
                  <div
                    key={`${especie}-${mes}`}
                    className="rounded-sm p-0.5 text-center cursor-pointer hover:opacity-80"
                    style={{ backgroundColor: getColor(value) }}
                    title={`${especie} - ${meses[mes - 1]}: ${formatNumber(value)} kg`}
                  >
                    <span className="text-[8px] text-gray-700">{value > 0 ? formatNumber(value) : ''}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1 mt-3">
          <span className="text-[10px] text-gray-500">Menor</span>
          {HEATMAP_COLORS.map((color, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
          ))}
          <span className="text-[10px] text-gray-500">Mayor</span>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  // Estados de datos - Tab Producción
  const [capturaAnual, setCapturaAnual] = useState([])
  const [capturaMensual, setCapturaMensual] = useState([])
  const [capturaEstado, setCapturaEstado] = useState([])
  const [especiesTop, setEspeciesTop] = useState([])
  const [litorales, setLitorales] = useState([])
  const [estacionalidad, setEstacionalidad] = useState([])

  // Estados de datos - Tab Economía
  const [preciosTendencia, setPreciosTendencia] = useState([])
  const [valorMensual, setValorMensual] = useState([])
  const [precioVolumen, setPrecioVolumen] = useState([])
  const [roi, setRoi] = useState([])

  // Estados de datos - Tab Análisis
  const [unidadesEconomicas, setUnidadesEconomicas] = useState([])
  const [eficiencia, setEficiencia] = useState([])
  const [biodiversidad, setBiodiversidad] = useState([])
  const [paretoEspecies, setParetoEspecies] = useState([])
  const [tipoZona, setTipoZona] = useState([])

  // Estados generales
  const [filtrosDisponibles, setFiltrosDisponibles] = useState<Filtros | null>(null)
  const [resumen, setResumen] = useState<Resumen | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("produccion")

  // Filtros
  const [añoInicio, setAñoInicio] = useState("")
  const [añoFin, setAñoFin] = useState("")
  const [añoSeleccionado, setAñoSeleccionado] = useState("")
  const [especieSeleccionada, setEspecieSeleccionada] = useState("__all__")
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("__all__")
  const [litoralSeleccionado, setLitoralSeleccionado] = useState("__all__")

  useEffect(() => { cargarFiltros() }, [])

  useEffect(() => {
    if (filtrosDisponibles && añoInicio && añoFin) {
      cargarDatos()
    }
  }, [añoInicio, añoFin, añoSeleccionado, especieSeleccionada, estadoSeleccionado, litoralSeleccionado, activeTab])

  async function cargarFiltros() {
    setLoading(true)
    try {
      const res = await fetch("/api/stats?tipo=filtros")
      if (!res.ok) throw new Error("Error al cargar filtros")
      const data = await res.json()
      const filtros = data.data as Filtros
      setFiltrosDisponibles(filtros)
      const años = filtros.años.filter((a): a is number => a !== null).sort((a, b) => a - b)
      if (años.length > 0) {
        setAñoInicio(años[0].toString())
        setAñoFin(años[años.length - 1].toString())
        setAñoSeleccionado(años[años.length - 1].toString())
      }
    } catch (err) {
      setError("No se pudieron cargar los filtros.")
    }
    setLoading(false)
  }

  const buildParams = useCallback(() => {
    const params = new URLSearchParams()
    params.set("añoInicio", añoInicio)
    params.set("añoFin", añoFin)
    if (especieSeleccionada !== "__all__") params.set("especie", especieSeleccionada)
    if (estadoSeleccionado !== "__all__") params.set("estado", estadoSeleccionado)
    if (litoralSeleccionado !== "__all__") params.set("litoral", litoralSeleccionado)
    return params.toString()
  }, [añoInicio, añoFin, especieSeleccionada, estadoSeleccionado, litoralSeleccionado])

  async function cargarDatos() {
    setLoadingData(true)
    setError(null)
    try {
      const params = buildParams()
      const añoParam = `año=${añoSeleccionado}`

      // Siempre cargar resumen
      const resumenRes = await fetch(`/api/stats?tipo=resumen&${params}`)
      if (resumenRes.ok) {
        const r = await resumenRes.json()
        setResumen(r.data)
      }

      // Cargar datos según el tab activo
      if (activeTab === "produccion") {
        const [r1, r2, r3, r4, r5, r6] = await Promise.all([
          fetch(`/api/stats?tipo=captura-anual&${params}`),
          fetch(`/api/stats?tipo=captura-mensual&${añoParam}&${params}`),
          fetch(`/api/stats?tipo=captura-estado&${params}`),
          fetch(`/api/stats?tipo=especies-top&${params}&limit=10`),
          fetch(`/api/stats?tipo=litorales&${params}`),
          fetch(`/api/stats?tipo=estacionalidad&${params}`),
        ])
        const data = await Promise.all([r1, r2, r3, r4, r5, r6].map(r => r.json()))
        setCapturaAnual(data[0].data || [])
        setCapturaMensual(data[1].data || [])
        setCapturaEstado(data[2].data || [])
        setEspeciesTop(data[3].data || [])
        setLitorales(data[4].data || [])
        setEstacionalidad(data[5].data || [])
      } else if (activeTab === "economia") {
        const [r1, r2, r3, r4] = await Promise.all([
          fetch(`/api/stats?tipo=precios-tendencia&${params}`),
          fetch(`/api/stats?tipo=valor-mensual&${añoParam}&${params}`),
          fetch(`/api/stats?tipo=precio-volumen&${params}`),
          fetch(`/api/stats?tipo=roi&${params}`),
        ])
        const data = await Promise.all([r1, r2, r3, r4].map(r => r.json()))
        setPreciosTendencia(data[0].data || [])
        setValorMensual(data[1].data || [])
        setPrecioVolumen(data[2].data || [])
        setRoi(data[3].data || [])
      } else if (activeTab === "analisis") {
        const [r1, r2, r3, r4, r5] = await Promise.all([
          fetch(`/api/stats?tipo=unidades-economicas&${params}`),
          fetch(`/api/stats?tipo=eficiencia&${params}`),
          fetch(`/api/stats?tipo=biodiversidad&${params}`),
          fetch(`/api/stats?tipo=pareto-especies&${params}`),
          fetch(`/api/stats?tipo=tipo-zona&${params}`),
        ])
        const data = await Promise.all([r1, r2, r3, r4, r5].map(r => r.json()))
        setUnidadesEconomicas(data[0].data || [])
        setEficiencia(data[1].data || [])
        setBiodiversidad(data[2].data || [])
        setParetoEspecies(data[3].data || [])
        setTipoZona(data[4].data || [])
      }
    } catch (err) {
      setError("Error al cargar datos")
    }
    setLoadingData(false)
  }

  const limpiarFiltros = () => {
    setEspecieSeleccionada("__all__")
    setEstadoSeleccionado("__all__")
    setLitoralSeleccionado("__all__")
  }

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
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={cargarFiltros}><RefreshCw className="w-4 h-4 mr-2" />Reintentar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const años = filtrosDisponibles?.años.filter((a): a is number => a !== null).sort((a, b) => a - b) || []
  const estados = filtrosDisponibles?.estados.filter((e): e is string => e !== null) || []
  const especies = filtrosDisponibles?.especies.filter((e): e is string => e !== null) || []
  const litoralesOpciones = filtrosDisponibles?.litorales.filter((l): l is string => l !== null) || []
  const hayFiltrosActivos = especieSeleccionada !== "__all__" || estadoSeleccionado !== "__all__" || litoralSeleccionado !== "__all__"

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full">
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Dashboard de Pesquerías
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Análisis integral de producción, economía y operaciones pesqueras
          </p>
        </div>

        {/* Tarjetas Resumen */}
        {resumen && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-xs">Captura Total</p>
                    <p className="text-xl font-bold">{formatNumber(resumen.captura_total_kg)} kg</p>
                  </div>
                  <Scale className="w-6 h-6 text-teal-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-100 text-xs">Valor Total</p>
                    <p className="text-xl font-bold">{formatCurrency(resumen.valor_total_pesos)}</p>
                  </div>
                  <DollarSign className="w-6 h-6 text-cyan-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-xs">Especies</p>
                    <p className="text-xl font-bold">{resumen.total_especies}</p>
                  </div>
                  <Fish className="w-6 h-6 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-xs">Estados</p>
                    <p className="text-xl font-bold">{resumen.total_estados}</p>
                  </div>
                  <MapPin className="w-6 h-6 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filtros */}
        <Card className="bg-white/80 backdrop-blur-sm border-teal-200 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-teal-800 text-base">
              <Filter className="w-4 h-4" /> Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Año Inicio</Label>
                <Select value={añoInicio} onValueChange={setAñoInicio}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>{años.map(a => <SelectItem key={a} value={a.toString()}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Año Fin</Label>
                <Select value={añoFin} onValueChange={setAñoFin}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>{años.map(a => <SelectItem key={a} value={a.toString()}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Año Detalle</Label>
                <Select value={añoSeleccionado} onValueChange={setAñoSeleccionado}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>{años.map(a => <SelectItem key={a} value={a.toString()}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Especie</Label>
                <Select value={especieSeleccionada} onValueChange={setEspecieSeleccionada}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todas</SelectItem>
                    {especies.slice(0, 100).map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Estado</Label>
                <Select value={estadoSeleccionado} onValueChange={setEstadoSeleccionado}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todos</SelectItem>
                    {estados.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Litoral</Label>
                <Select value={litoralSeleccionado} onValueChange={setLitoralSeleccionado}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todos</SelectItem>
                    {litoralesOpciones.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {hayFiltrosActivos && (
              <div className="mt-3 flex justify-end">
                <Button variant="outline" size="sm" onClick={limpiarFiltros}>Limpiar filtros</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading */}
        {loadingData && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <Card className="p-4"><Loader2 className="w-6 h-6 animate-spin text-teal-600 inline mr-2" />Cargando...</Card>
          </div>
        )}

        {/* Tabs Simplificados */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 border border-teal-200 h-auto p-1">
            <TabsTrigger value="produccion" className="data-[state=active]:bg-teal-100 text-sm py-2.5">
              <Scale className="w-4 h-4 mr-2" /> Producción
            </TabsTrigger>
            <TabsTrigger value="economia" className="data-[state=active]:bg-amber-100 text-sm py-2.5">
              <DollarSign className="w-4 h-4 mr-2" /> Economía
            </TabsTrigger>
            <TabsTrigger value="analisis" className="data-[state=active]:bg-blue-100 text-sm py-2.5">
              <Activity className="w-4 h-4 mr-2" /> Análisis
            </TabsTrigger>
          </TabsList>

          {/* ==================== TAB 1: PRODUCCIÓN ==================== */}
          <TabsContent value="produccion" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Captura por Año */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-teal-600" /> Captura por Año
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {capturaAnual.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={capturaAnual}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Bar dataKey="peso_desembarcado" fill="#0d9488" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* Captura por Mes */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-600" /> Captura Mensual ({añoSeleccionado})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {capturaMensual.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={capturaMensual}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="mes" fontSize={10} tickFormatter={v => v?.substring(0, 3)} />
                        <YAxis fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Line type="monotone" dataKey="peso_desembarcado" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* Captura por Estado */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" /> Captura por Estado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {capturaEstado.length > 0 ? (
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={capturaEstado.slice(0, 10)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <YAxis dataKey="estado" type="category" width={100} fontSize={10} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Bar dataKey="peso_desembarcado" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* Captura por Litoral */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Anchor className="w-4 h-4 text-blue-600" /> Distribución por Litoral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {litorales.length > 0 ? (
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <Pie 
                          data={litorales} 
                          dataKey="peso_desembarcado" 
                          nameKey="litoral" 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={100}
                          innerRadius={40}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={{ stroke: '#64748b', strokeWidth: 1 }}
                        >
                          {litorales.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(v: number) => formatNumber(v) + " kg"} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>
            </div>

            {/* Top 10 Especies */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Fish className="w-4 h-4 text-teal-600" /> Top 10 Especies por Captura
                </CardTitle>
              </CardHeader>
              <CardContent>
                {especiesTop.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={especiesTop} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                      <YAxis 
                        dataKey="especie" 
                        type="category" 
                        width={140} 
                        fontSize={10} 
                        tickFormatter={v => v?.length > 20 ? v.substring(0, 20) + '...' : v} 
                      />
                      <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                      <Bar dataKey="peso_desembarcado" fill="#0d9488" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState message="Sin datos" />}
              </CardContent>
            </Card>

            {/* Estacionalidad */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" /> Estacionalidad por Especie
                </CardTitle>
                <CardDescription className="text-xs">Captura mensual de las principales especies</CardDescription>
              </CardHeader>
              <CardContent>
                <HeatmapChart data={estacionalidad} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== TAB 2: ECONOMÍA ==================== */}
          <TabsContent value="economia" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Tendencia de Precios */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-600" /> Tendencia de Precios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {preciosTendencia.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={preciosTendencia}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), ""]} />
                        <Legend />
                        <Line type="monotone" dataKey="precio_promedio" stroke="#f59e0b" strokeWidth={2} name="Promedio" dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="precio_max" stroke="#ef4444" strokeDasharray="5 5" name="Máximo" />
                        <Line type="monotone" dataKey="precio_min" stroke="#3b82f6" strokeDasharray="5 5" name="Mínimo" />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* Valor Mensual */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-600" /> Valor Económico Mensual ({añoSeleccionado})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {valorMensual.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={valorMensual}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="mes" fontSize={10} tickFormatter={v => v?.substring(0, 3)} />
                        <YAxis fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), "Valor"]} />
                        <Bar dataKey="valor_total" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* Precio vs Volumen */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-600" /> Relación Precio vs Volumen
                  </CardTitle>
                  <CardDescription className="text-xs">Correlación entre precio promedio y volumen de captura</CardDescription>
                </CardHeader>
                <CardContent>
                  {precioVolumen.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="volumen_total" name="Volumen" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <YAxis dataKey="precio_promedio" name="Precio" fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <Tooltip 
                          formatter={(v: number, name) => [
                            name === 'precio_promedio' ? formatCurrency(v) : formatNumber(v) + ' kg', 
                            name === 'precio_promedio' ? 'Precio' : 'Volumen'
                          ]} 
                        />
                        <Scatter data={precioVolumen} fill="#8b5cf6" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* ROI */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-teal-600" /> Retorno por Esfuerzo
                  </CardTitle>
                  <CardDescription className="text-xs">Valor económico generado por unidad de esfuerzo pesquero</CardDescription>
                </CardHeader>
                <CardContent>
                  {roi.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={roi}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis yAxisId="left" fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <YAxis yAxisId="right" orientation="right" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip 
                          formatter={(v: number, name) => [
                            name === 'valor_por_esfuerzo' ? formatCurrency(v) : formatNumber(v), 
                            name === 'valor_por_esfuerzo' ? '$/esfuerzo' : 'Esfuerzo'
                          ]} 
                        />
                        <Legend />
                        <Bar yAxisId="right" dataKey="esfuerzo" fill="#e2e8f0" name="Esfuerzo (días×emb)" />
                        <Line yAxisId="left" type="monotone" dataKey="valor_por_esfuerzo" stroke="#0d9488" strokeWidth={2} name="$/Esfuerzo" dot={{ r: 4 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==================== TAB 3: ANÁLISIS ==================== */}
          <TabsContent value="analisis" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Unidades Económicas */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" /> Top Unidades Económicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {unidadesEconomicas.length > 0 ? (
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={unidadesEconomicas.slice(0, 10)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <YAxis 
                          dataKey="unidad" 
                          type="category" 
                          width={140} 
                          fontSize={9} 
                          tickFormatter={v => v?.length > 20 ? v.substring(0, 20) + '...' : v} 
                        />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Bar dataKey="peso_desembarcado" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* Eficiencia */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" /> Eficiencia: Días vs Captura
                  </CardTitle>
                  <CardDescription className="text-xs">Relación entre días de pesca y captura obtenida</CardDescription>
                </CardHeader>
                <CardContent>
                  {eficiencia.length > 0 ? (
                    <ResponsiveContainer width="100%" height={320}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="dias_efectivos" name="Días" fontSize={11} />
                        <YAxis dataKey="peso_capturado" name="Peso" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip 
                          formatter={(v: number, name) => [
                            name === 'peso_capturado' ? formatNumber(v) + ' kg' : v, 
                            name === 'dias_efectivos' ? 'Días' : 'Captura'
                          ]} 
                        />
                        <Scatter data={eficiencia} fill="#10b981" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* Biodiversidad */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Fish className="w-4 h-4 text-green-600" /> Biodiversidad por Año
                  </CardTitle>
                  <CardDescription className="text-xs">Número de especies y estados con actividad pesquera</CardDescription>
                </CardHeader>
                <CardContent>
                  {biodiversidad.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={biodiversidad}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis yAxisId="left" fontSize={11} />
                        <YAxis yAxisId="right" orientation="right" fontSize={11} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="num_especies" fill="#10b981" name="Especies" radius={[4, 4, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="num_estados" stroke="#6366f1" strokeWidth={2} name="Estados" dot={{ r: 4 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* Tipo de Zona */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-600" /> Captura por Tipo de Zona
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tipoZona.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={tipoZona}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="tipo_zona" fontSize={10} />
                        <YAxis fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Bar dataKey="peso_desembarcado" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>
            </div>

            {/* Curva de Pareto */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-purple-600" /> Concentración de Captura (Pareto)
                </CardTitle>
                <CardDescription className="text-xs">
                  Las primeras especies concentran la mayor parte de la captura total
                </CardDescription>
              </CardHeader>
              <CardContent>
                {paretoEspecies.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={paretoEspecies.slice(0, 20)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="posicion" fontSize={11} />
                      <YAxis yAxisId="left" fontSize={11} tickFormatter={v => formatNumber(v)} />
                      <YAxis yAxisId="right" orientation="right" fontSize={11} domain={[0, 100]} tickFormatter={v => v + '%'} />
                      <Tooltip 
                        formatter={(v: number, name) => [
                          name === 'porcentaje_acumulado' ? v.toFixed(1) + '%' : formatNumber(v) + ' kg', 
                          name === 'porcentaje_acumulado' ? '% Acumulado' : 'Captura'
                        ]} 
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="peso_desembarcado" fill="#8b5cf6" name="Captura (kg)" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="porcentaje_acumulado" stroke="#ef4444" strokeWidth={2} name="% Acumulado" dot={{ r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : <EmptyState message="Sin datos" />}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
