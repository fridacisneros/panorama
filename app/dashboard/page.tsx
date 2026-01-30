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
  Area,
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
  Ship,
  Target,
  Thermometer,
  DollarSign,
  Building2,
  FileText,
  Globe,
  Layers,
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
  // Estados de datos - Categoría 1: Producción
  const [capturaAnual, setCapturaAnual] = useState([])
  const [capturaMensual, setCapturaMensual] = useState([])
  const [capturaEstado, setCapturaEstado] = useState([])
  const [especiesTop, setEspeciesTop] = useState([])
  const [litorales, setLitorales] = useState([])
  const [tipoZona, setTipoZona] = useState([])
  const [estacionalidad, setEstacionalidad] = useState([])
  const [eficiencia, setEficiencia] = useState([])
  const [sitiosDesembarque, setSitiosDesembarque] = useState([])
  const [tendenciaEmbarcaciones, setTendenciaEmbarcaciones] = useState([])

  // Estados de datos - Categoría 2: Económico
  const [preciosTendencia, setPreciosTendencia] = useState([])
  const [valorEstado, setValorEstado] = useState([])
  const [precioEspecie, setPrecioEspecie] = useState([])
  const [precioVolumen, setPrecioVolumen] = useState([])
  const [valorMensual, setValorMensual] = useState([])
  const [precioLitoral, setPrecioLitoral] = useState([])
  const [especiesValor, setEspeciesValor] = useState([])
  const [roi, setRoi] = useState([])

  // Estados de datos - Categoría 3: Operativo
  const [unidadesEconomicas, setUnidadesEconomicas] = useState([])
  const [duracionViajes, setDuracionViajes] = useState([])
  const [tiposAviso, setTiposAviso] = useState([])
  const [eficienciaFlota, setEficienciaFlota] = useState([])
  const [lugaresCaptura, setLugaresCaptura] = useState([])
  const [actividadOficina, setActividadOficina] = useState([])
  const [acuaculturalVsCaptura, setAcuaculturalVsCaptura] = useState([])

  // Estados de datos - Categoría 4: Especies
  const [biodiversidad, setBiodiversidad] = useState([])
  const [pesoDesembarcadoVsVivo, setPesoDesembarcadoVsVivo] = useState([])
  const [paretoEspecies, setParetoEspecies] = useState([])

  // Estados de datos - Categoría 5: Geográfico
  const [mapaEstados, setMapaEstados] = useState([])
  const [comparativaCostera, setComparativaCostera] = useState([])
  const [migracionZonas, setMigracionZonas] = useState([])

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
        const [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10] = await Promise.all([
          fetch(`/api/stats?tipo=captura-anual&${params}`),
          fetch(`/api/stats?tipo=captura-mensual&${añoParam}&${params}`),
          fetch(`/api/stats?tipo=captura-estado&${params}`),
          fetch(`/api/stats?tipo=especies-top&${params}&limit=10`),
          fetch(`/api/stats?tipo=litorales&${params}`),
          fetch(`/api/stats?tipo=tipo-zona&${params}`),
          fetch(`/api/stats?tipo=estacionalidad&${params}`),
          fetch(`/api/stats?tipo=eficiencia&${params}`),
          fetch(`/api/stats?tipo=sitios-desembarque&${params}`),
          fetch(`/api/stats?tipo=tendencia-embarcaciones&${params}`),
        ])
        const data = await Promise.all([r1, r2, r3, r4, r5, r6, r7, r8, r9, r10].map(r => r.json()))
        setCapturaAnual(data[0].data || [])
        setCapturaMensual(data[1].data || [])
        setCapturaEstado(data[2].data || [])
        setEspeciesTop(data[3].data || [])
        setLitorales(data[4].data || [])
        setTipoZona(data[5].data || [])
        setEstacionalidad(data[6].data || [])
        setEficiencia(data[7].data || [])
        setSitiosDesembarque(data[8].data || [])
        setTendenciaEmbarcaciones(data[9].data || [])
      } else if (activeTab === "economico") {
        const [r1, r2, r3, r4, r5, r6, r7, r8] = await Promise.all([
          fetch(`/api/stats?tipo=precios-tendencia&${params}`),
          fetch(`/api/stats?tipo=valor-estado&${params}`),
          fetch(`/api/stats?tipo=precio-especie&${params}&limit=15`),
          fetch(`/api/stats?tipo=precio-volumen&${params}`),
          fetch(`/api/stats?tipo=valor-mensual&${añoParam}&${params}`),
          fetch(`/api/stats?tipo=precio-litoral&${params}`),
          fetch(`/api/stats?tipo=especies-valor&${params}&limit=10`),
          fetch(`/api/stats?tipo=roi&${params}`),
        ])
        const data = await Promise.all([r1, r2, r3, r4, r5, r6, r7, r8].map(r => r.json()))
        setPreciosTendencia(data[0].data || [])
        setValorEstado(data[1].data || [])
        setPrecioEspecie(data[2].data || [])
        setPrecioVolumen(data[3].data || [])
        setValorMensual(data[4].data || [])
        setPrecioLitoral(data[5].data || [])
        setEspeciesValor(data[6].data || [])
        setRoi(data[7].data || [])
      } else if (activeTab === "operativo") {
        const [r1, r2, r3, r4, r5, r6, r7] = await Promise.all([
          fetch(`/api/stats?tipo=unidades-economicas&${params}`),
          fetch(`/api/stats?tipo=duracion-viajes&${params}`),
          fetch(`/api/stats?tipo=tipos-aviso&${params}`),
          fetch(`/api/stats?tipo=eficiencia-flota&${params}`),
          fetch(`/api/stats?tipo=lugares-captura&${params}`),
          fetch(`/api/stats?tipo=actividad-oficina&${params}`),
          fetch(`/api/stats?tipo=acuacultural-vs-captura&${params}`),
        ])
        const data = await Promise.all([r1, r2, r3, r4, r5, r6, r7].map(r => r.json()))
        setUnidadesEconomicas(data[0].data || [])
        setDuracionViajes(data[1].data || [])
        setTiposAviso(data[2].data || [])
        setEficienciaFlota(data[3].data || [])
        setLugaresCaptura(data[4].data || [])
        setActividadOficina(data[5].data || [])
        setAcuaculturalVsCaptura(data[6].data || [])
      } else if (activeTab === "especies") {
        const [r1, r2, r3] = await Promise.all([
          fetch(`/api/stats?tipo=biodiversidad&${params}`),
          fetch(`/api/stats?tipo=peso-desembarcado-vs-vivo&${params}`),
          fetch(`/api/stats?tipo=pareto-especies&${params}`),
        ])
        const data = await Promise.all([r1, r2, r3].map(r => r.json()))
        setBiodiversidad(data[0].data || [])
        setPesoDesembarcadoVsVivo(data[1].data || [])
        setParetoEspecies(data[2].data || [])
      } else if (activeTab === "geografico") {
        const [r1, r2, r3] = await Promise.all([
          fetch(`/api/stats?tipo=mapa-estados&${params}`),
          fetch(`/api/stats?tipo=comparativa-costera&${params}`),
          fetch(`/api/stats?tipo=migracion-zonas&${params}`),
        ])
        const data = await Promise.all([r1, r2, r3].map(r => r.json()))
        setMapaEstados(data[0].data || [])
        setComparativaCostera(data[1].data || [])
        setMigracionZonas(data[2].data || [])
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
            Análisis integral de producción, economía, operaciones y biodiversidad pesquera
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 border border-teal-200 h-auto p-1">
            <TabsTrigger value="produccion" className="data-[state=active]:bg-teal-100 text-xs md:text-sm py-2">
              <Scale className="w-4 h-4 mr-1 hidden md:inline" /> Producción
            </TabsTrigger>
            <TabsTrigger value="economico" className="data-[state=active]:bg-amber-100 text-xs md:text-sm py-2">
              <DollarSign className="w-4 h-4 mr-1 hidden md:inline" /> Económico
            </TabsTrigger>
            <TabsTrigger value="operativo" className="data-[state=active]:bg-blue-100 text-xs md:text-sm py-2">
              <Building2 className="w-4 h-4 mr-1 hidden md:inline" /> Operativo
            </TabsTrigger>
            <TabsTrigger value="especies" className="data-[state=active]:bg-green-100 text-xs md:text-sm py-2">
              <Fish className="w-4 h-4 mr-1 hidden md:inline" /> Especies
            </TabsTrigger>
            <TabsTrigger value="geografico" className="data-[state=active]:bg-purple-100 text-xs md:text-sm py-2">
              <Globe className="w-4 h-4 mr-1 hidden md:inline" /> Geográfico
            </TabsTrigger>
          </TabsList>

          {/* ==================== TAB 1: PRODUCCIÓN ==================== */}
          <TabsContent value="produccion" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* 1.1 Captura por Año */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="w-4 h-4 text-teal-600" /> Captura por Año</CardTitle>
                </CardHeader>
                <CardContent>
                  {capturaAnual.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
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

              {/* 1.2 Captura por Mes */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-600" /> Captura por Mes ({añoSeleccionado})</CardTitle>
                </CardHeader>
                <CardContent>
                  {capturaMensual.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={capturaMensual}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="mes" fontSize={10} tickFormatter={v => v?.substring(0, 3)} />
                        <YAxis fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Line type="monotone" dataKey="peso_desembarcado" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 1.3 Captura por Estado */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-purple-600" /> Captura por Estado</CardTitle>
                </CardHeader>
                <CardContent>
                  {capturaEstado.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={capturaEstado.slice(0, 12)} layout="vertical">
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

              {/* 1.4 Top 10 Especies */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Fish className="w-4 h-4 text-teal-600" /> Top 10 Especies</CardTitle>
                </CardHeader>
                <CardContent>
                  {especiesTop.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={especiesTop} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <YAxis dataKey="especie" type="category" width={120} fontSize={9} tickFormatter={v => v?.length > 18 ? v.substring(0, 18) + '...' : v} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Bar dataKey="peso_desembarcado" fill="#0d9488" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 1.5 Captura por Litoral */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Anchor className="w-4 h-4 text-blue-600" /> Captura por Litoral</CardTitle>
                </CardHeader>
                <CardContent>
                  {litorales.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={litorales} dataKey="peso_desembarcado" nameKey="litoral" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                          {litorales.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(v: number) => formatNumber(v) + " kg"} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 1.6 Captura por Tipo de Zona */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Target className="w-4 h-4 text-indigo-600" /> Captura por Tipo de Zona</CardTitle>
                </CardHeader>
                <CardContent>
                  {tipoZona.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
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

            {/* 1.7 Estacionalidad */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Thermometer className="w-4 h-4 text-amber-600" /> Estacionalidad por Especie (Heatmap)</CardTitle>
              </CardHeader>
              <CardContent><HeatmapChart data={estacionalidad} /></CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* 1.8 Eficiencia */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-600" /> Eficiencia: Días vs Captura</CardTitle>
                </CardHeader>
                <CardContent>
                  {eficiencia.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="dias_efectivos" name="Días" fontSize={11} />
                        <YAxis dataKey="peso_capturado" name="Peso" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number, name) => [name === 'peso_capturado' ? formatNumber(v) + ' kg' : v, name === 'dias_efectivos' ? 'Días' : 'Peso']} />
                        <Scatter data={eficiencia} fill="#10b981" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 1.10 Tendencia Embarcaciones */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Ship className="w-4 h-4 text-blue-600" /> Tendencia de Embarcaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  {tendenciaEmbarcaciones.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={tendenciaEmbarcaciones}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => [formatNumber(v), "Embarcaciones"]} />
                        <Line type="monotone" dataKey="total_embarcaciones" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>
            </div>

            {/* 1.9 Sitios de Desembarque */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Anchor className="w-4 h-4 text-teal-600" /> Top 15 Sitios de Desembarque</CardTitle>
              </CardHeader>
              <CardContent>
                {sitiosDesembarque.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={sitiosDesembarque} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                      <YAxis dataKey="sitio" type="category" width={150} fontSize={9} tickFormatter={v => v?.length > 22 ? v.substring(0, 22) + '...' : v} />
                      <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                      <Bar dataKey="peso_desembarcado" fill="#0d9488" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState message="Sin datos" />}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== TAB 2: ECONÓMICO ==================== */}
          <TabsContent value="economico" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* 2.1 Tendencia de Precios */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-amber-600" /> Tendencia de Precios</CardTitle>
                </CardHeader>
                <CardContent>
                  {preciosTendencia.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={preciosTendencia}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), ""]} />
                        <Legend />
                        <Line type="monotone" dataKey="precio_promedio" stroke="#f59e0b" strokeWidth={2} name="Promedio" />
                        <Line type="monotone" dataKey="precio_max" stroke="#ef4444" strokeDasharray="5 5" name="Máximo" />
                        <Line type="monotone" dataKey="precio_min" stroke="#3b82f6" strokeDasharray="5 5" name="Mínimo" />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 2.2 Valor por Estado */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /> Valor Total por Estado</CardTitle>
                </CardHeader>
                <CardContent>
                  {valorEstado.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={valorEstado.slice(0, 10)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <YAxis dataKey="estado" type="category" width={100} fontSize={10} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), "Valor"]} />
                        <Bar dataKey="valor_total" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 2.3 Precio por Especie */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Fish className="w-4 h-4 text-amber-600" /> Precio Promedio por Especie</CardTitle>
                </CardHeader>
                <CardContent>
                  {precioEspecie.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={precioEspecie.slice(0, 10)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <YAxis dataKey="especie" type="category" width={120} fontSize={9} tickFormatter={v => v?.length > 18 ? v.substring(0, 18) + '...' : v} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), "Precio"]} />
                        <Bar dataKey="precio_promedio" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 2.4 Precio vs Volumen */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-purple-600" /> Precio vs Volumen</CardTitle>
                </CardHeader>
                <CardContent>
                  {precioVolumen.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="volumen_total" name="Volumen" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <YAxis dataKey="precio_promedio" name="Precio" fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <Tooltip formatter={(v: number, name) => [name === 'precio_promedio' ? formatCurrency(v) : formatNumber(v) + ' kg', name === 'precio_promedio' ? 'Precio' : 'Volumen']} />
                        <Scatter data={precioVolumen} fill="#8b5cf6" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 2.5 Valor Mensual */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-600" /> Valor Económico por Mes ({añoSeleccionado})</CardTitle>
                </CardHeader>
                <CardContent>
                  {valorMensual.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
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

              {/* 2.6 Precio por Litoral */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Anchor className="w-4 h-4 text-blue-600" /> Precio Promedio por Litoral</CardTitle>
                </CardHeader>
                <CardContent>
                  {precioLitoral.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={precioLitoral}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="litoral" fontSize={11} />
                        <YAxis fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), "Precio"]} />
                        <Bar dataKey="precio_promedio" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 2.7 Especies por Valor */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-600" /> Top Especies por Valor</CardTitle>
                </CardHeader>
                <CardContent>
                  {especiesValor.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={especiesValor} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <YAxis dataKey="especie" type="category" width={120} fontSize={9} tickFormatter={v => v?.length > 18 ? v.substring(0, 18) + '...' : v} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), "Valor"]} />
                        <Bar dataKey="valor_total" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 2.9 ROI */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-teal-600" /> ROI: Valor por Esfuerzo</CardTitle>
                </CardHeader>
                <CardContent>
                  {roi.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={roi}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis yAxisId="left" fontSize={11} tickFormatter={v => formatCurrency(v)} />
                        <YAxis yAxisId="right" orientation="right" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number, name) => [name === 'valor_por_esfuerzo' ? formatCurrency(v) : formatNumber(v), name === 'valor_por_esfuerzo' ? '$/esfuerzo' : 'Esfuerzo']} />
                        <Legend />
                        <Bar yAxisId="right" dataKey="esfuerzo" fill="#e2e8f0" name="Esfuerzo (días×emb)" />
                        <Line yAxisId="left" type="monotone" dataKey="valor_por_esfuerzo" stroke="#0d9488" strokeWidth={2} name="$/Esfuerzo" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>
            </div>

          </TabsContent>

          {/* ==================== TAB 3: OPERATIVO ==================== */}
          <TabsContent value="operativo" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* 3.1 Unidades Económicas */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Building2 className="w-4 h-4 text-blue-600" /> Top Unidades Económicas</CardTitle>
                </CardHeader>
                <CardContent>
                  {unidadesEconomicas.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={unidadesEconomicas.slice(0, 10)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <YAxis dataKey="unidad" type="category" width={140} fontSize={8} tickFormatter={v => v?.length > 20 ? v.substring(0, 20) + '...' : v} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Bar dataKey="peso_desembarcado" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 3.2 Duración de Viajes */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-600" /> Duración Promedio de Viajes</CardTitle>
                </CardHeader>
                <CardContent>
                  {duracionViajes.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={duracionViajes}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="tipo_zona" fontSize={10} />
                        <YAxis fontSize={11} />
                        <Tooltip formatter={(v: number) => [v.toFixed(1) + " días", "Duración"]} />
                        <Bar dataKey="duracion_promedio" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 3.3 Tipos de Aviso */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><FileText className="w-4 h-4 text-amber-600" /> Distribución de Tipos de Aviso</CardTitle>
                </CardHeader>
                <CardContent>
                  {tiposAviso.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={tiposAviso} dataKey="cantidad" nameKey="tipo_aviso" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                          {tiposAviso.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 3.4 Eficiencia por Flota */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Ship className="w-4 h-4 text-teal-600" /> Eficiencia por Flota</CardTitle>
                </CardHeader>
                <CardContent>
                  {eficienciaFlota.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="embarcaciones" name="Embarcaciones" fontSize={11} />
                        <YAxis dataKey="peso_total" name="Captura" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number, name) => [name === 'peso_total' ? formatNumber(v) + ' kg' : v, name === 'embarcaciones' ? 'Embarcaciones' : 'Captura']} />
                        <Scatter data={eficienciaFlota} fill="#0d9488" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 3.5 Lugares de Captura */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /> Lugares de Captura Más Productivos</CardTitle>
                </CardHeader>
                <CardContent>
                  {lugaresCaptura.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={lugaresCaptura.slice(0, 10)} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <YAxis dataKey="lugar" type="category" width={140} fontSize={8} tickFormatter={v => v?.length > 20 ? v.substring(0, 20) + '...' : v} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Bar dataKey="peso_desembarcado" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 3.7 Acuacultural vs Captura */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Layers className="w-4 h-4 text-cyan-600" /> Acuacultural vs Captura</CardTitle>
                </CardHeader>
                <CardContent>
                  {acuaculturalVsCaptura.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={acuaculturalVsCaptura}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="tipo" fontSize={11} />
                        <YAxis fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                        <Bar dataKey="peso_desembarcado" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>
            </div>

            {/* 3.6 Actividad por Oficina */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Building2 className="w-4 h-4 text-indigo-600" /> Actividad por Oficina</CardTitle>
              </CardHeader>
              <CardContent>
                {actividadOficina.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={actividadOficina} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                      <YAxis dataKey="oficina" type="category" width={180} fontSize={8} tickFormatter={v => v?.length > 25 ? v.substring(0, 25) + '...' : v} />
                      <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                      <Bar dataKey="peso_desembarcado" fill="#6366f1" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState message="Sin datos" />}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== TAB 4: ESPECIES ==================== */}
          <TabsContent value="especies" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* 4.1 Biodiversidad */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Fish className="w-4 h-4 text-green-600" /> Biodiversidad Capturada por Año</CardTitle>
                </CardHeader>
                <CardContent>
                  {biodiversidad.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <ComposedChart data={biodiversidad}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis yAxisId="left" fontSize={11} />
                        <YAxis yAxisId="right" orientation="right" fontSize={11} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="num_especies" fill="#10b981" name="Especies" />
                        <Line yAxisId="right" type="monotone" dataKey="num_estados" stroke="#6366f1" strokeWidth={2} name="Estados" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 4.3 Peso Desembarcado vs Vivo */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Scale className="w-4 h-4 text-teal-600" /> Relación Peso Desembarcado vs Vivo</CardTitle>
                </CardHeader>
                <CardContent>
                  {pesoDesembarcadoVsVivo.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="peso_vivo" name="Peso Vivo" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <YAxis dataKey="peso_desembarcado" name="Peso Desembarcado" fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", ""]} />
                        <Scatter data={pesoDesembarcadoVsVivo} fill="#0d9488" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>
            </div>

            {/* 4.4 Curva de Pareto */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><PieChartIcon className="w-4 h-4 text-purple-600" /> Concentración de Captura (Pareto)</CardTitle>
                <CardDescription className="text-xs">Porcentaje acumulado de captura por especie</CardDescription>
              </CardHeader>
              <CardContent>
                {paretoEspecies.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={paretoEspecies.slice(0, 20)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="posicion" fontSize={11} />
                      <YAxis yAxisId="left" fontSize={11} tickFormatter={v => formatNumber(v)} />
                      <YAxis yAxisId="right" orientation="right" fontSize={11} domain={[0, 100]} tickFormatter={v => v + '%'} />
                      <Tooltip formatter={(v: number, name) => [name === 'porcentaje_acumulado' ? v + '%' : formatNumber(v) + ' kg', name === 'porcentaje_acumulado' ? '% Acumulado' : 'Captura']} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="peso_desembarcado" fill="#8b5cf6" name="Captura (kg)" />
                      <Line yAxisId="right" type="monotone" dataKey="porcentaje_acumulado" stroke="#ef4444" strokeWidth={2} name="% Acumulado" />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : <EmptyState message="Sin datos" />}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== TAB 5: GEOGRÁFICO ==================== */}
          <TabsContent value="geografico" className="space-y-4">
            {/* 5.1 Mapa de Estados */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-purple-600" /> Producción por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                {mapaEstados.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={mapaEstados} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" fontSize={11} tickFormatter={v => formatNumber(v)} />
                      <YAxis dataKey="estado" type="category" width={120} fontSize={10} />
                      <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", "Captura"]} />
                      <Legend />
                      <Bar dataKey="peso_desembarcado" fill="#8b5cf6" name="Captura (kg)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState message="Sin datos" />}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* 5.3 Comparativa Costera */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Anchor className="w-4 h-4 text-blue-600" /> Comparativa Costera por Año</CardTitle>
                </CardHeader>
                <CardContent>
                  {comparativaCostera.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={
                        // Agrupar por año
                        [...new Set(comparativaCostera.map((d: { año: number }) => d.año))].map(año => {
                          const items = comparativaCostera.filter((d: { año: number }) => d.año === año)
                          const result: { año: number; [key: string]: number | string } = { año: año as number }
                          items.forEach((item: { litoral: string; peso_desembarcado: string }) => {
                            result[item.litoral || 'Otro'] = parseFloat(item.peso_desembarcado || '0')
                          })
                          return result
                        })
                      }>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="año" fontSize={11} />
                        <YAxis fontSize={11} tickFormatter={v => formatNumber(v)} />
                        <Tooltip formatter={(v: number) => [formatNumber(v) + " kg", ""]} />
                        <Legend />
                        {litoralesOpciones.map((lit, i) => (
                          <Bar key={lit} dataKey={lit} fill={COLORS[i % COLORS.length]} stackId="a" />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  ) : <EmptyState message="Sin datos" />}
                </CardContent>
              </Card>

              {/* 5.4 Migración de Zonas (Heatmap) */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-teal-600" /> Estacionalidad por Estado</CardTitle>
                </CardHeader>
                <CardContent>
                  <HeatmapChart data={migracionZonas.map((d: { estado: string; mes: string; mes_num: number; peso_desembarcado: string }) => ({ especie: d.estado, mes: d.mes, mes_num: d.mes_num, peso_desembarcado: d.peso_desembarcado }))} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
