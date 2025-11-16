"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Fish,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Anchor,
  Thermometer,
  Droplets,
  Wind,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Target,
  MapPin,
  Ship,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

// Datos históricos de captura de pez espada
const datosCapturasHistoricas = [
  { año: 2000, captura: 850, valor: 680 },
  { año: 2002, captura: 920, valor: 750 },
  { año: 2004, captura: 1050, valor: 850 },
  { año: 2006, captura: 1180, valor: 950 },
  { año: 2008, captura: 1320, valor: 1050 },
  { año: 2010, captura: 1450, valor: 1150 },
  { año: 2012, captura: 1580, valor: 1250 },
  { año: 2014, captura: 1680, valor: 1350 },
  { año: 2016, captura: 1750, valor: 1450 },
  { año: 2018, captura: 1820, valor: 1550 },
  { año: 2020, captura: 1900, valor: 1650 },
]

// Datos de participación por estado
const datosEstados = [
  { estado: "Baja California", porcentaje: 45.2, captura: 859 },
  { estado: "Baja California Sur", porcentaje: 28.5, captura: 542 },
  { estado: "Sinaloa", porcentaje: 15.8, captura: 300 },
  { estado: "Sonora", porcentaje: 10.5, captura: 199 },
]

export default function PezEspadaPage() {
  const [activeTab, setActiveTab] = useState("generalidades")

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/especies" className="hover:text-yellow-600 transition-colors">
            Especies
          </Link>
          <span>/</span>
          <span className="text-yellow-600 font-medium">Pez Espada</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-yellow-800 mb-2">Pez Espada</h1>
              <p className="text-xl text-gray-600 italic">Xiphias gladius</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 gap-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 p-2 rounded-xl shadow-2xl border-2 border-teal-700 h-auto">
            <TabsTrigger
              value="generalidades"
              className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:font-bold text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
            >
              <Fish className="w-4 h-4 mr-2" />
              Generalidades
            </TabsTrigger>
            <TabsTrigger
              value="indicadores"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:font-bold text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Indicadores
            </TabsTrigger>
            <TabsTrigger
              value="ambiente"
              className="data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:font-bold text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
            >
              <Thermometer className="w-4 h-4 mr-2" />
              Amb. y Clima
            </TabsTrigger>
            <TabsTrigger
              value="normatividad"
              className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:font-bold text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
            >
              <Shield className="w-4 h-4 mr-2" />
              Normatividad
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:font-bold text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
            >
              <Target className="w-4 h-4 mr-2" />
              Status
            </TabsTrigger>
            <TabsTrigger
              value="recomendaciones"
              className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:font-bold text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
            >
              <FileText className="w-4 h-4 mr-2" />
              Recomendaciones
            </TabsTrigger>
          </TabsList>

          {/* Generalidades */}
          <TabsContent value="generalidades" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <Fish className="w-5 h-5 mr-2" />
                  Descripción General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  El pez espada (Xiphias gladius) es una especie pelágica de gran tamaño y alto valor comercial. Se distribuye
                  en aguas tropicales y templadas del Pacífico mexicano, siendo una pesquería con gran potencial de desarrollo
                  debido a la subutilización actual del recurso y la alta demanda internacional. Es una especie migratoria
                  de aguas profundas que puede alcanzar tamaños considerables y es altamente valorada por su carne de calidad.
                </p>
                  </div>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                      <div className="flex flex-col items-center space-y-2">
                        <MapPin className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-500 font-medium">Mapa de Distribución</p>
                        <p className="text-sm text-gray-400">Sube el mapa de distribución geográfica</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Subir Mapa
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sección de Imágenes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center">
                    <Ship className="w-5 h-5 mr-2" />
                    Tipos de Embarcaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    La captura de pez espada se realiza principalmente con embarcaciones de altura especializadas en palangre
                    (60%), pangas artesanales para pesca costera (25%) y embarcaciones industriales de gran capacidad (15%).
                    Las embarcaciones palangreras son las más importantes, siendo barcos de mediano y gran tamaño equipados
                    con sistemas de manejo de líneas largas.
                  </p>
                  <div className="aspect-video bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center border-2 border-dashed border-yellow-300">
                    <div className="text-center">
                      <Ship className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-sm text-yellow-600 font-medium">Tipos de Embarcaciones</p>
                      <p className="text-xs text-yellow-500">Sube imagen de embarcaciones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center">
                    <Anchor className="w-5 h-5 mr-2" />
                    Artes de Pesca
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Las principales artes de pesca incluyen palangre pelágico (80%), arpón para pesca selectiva (15%) y
                    red de enmalle (5%). El palangre pelágico es el arte principal, consistente en líneas largas con múltiples
                    anzuelos desplegadas en aguas pelágicas. El arpón se usa principalmente en embarcaciones menores para
                    pesca selectiva. La red de enmalle tiene uso limitado debido a regulaciones.
                  </p>
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg flex items-center justify-center border-2 border-dashed border-orange-300">
                    <div className="text-center">
                      <Anchor className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <p className="text-sm text-orange-600 font-medium">Artes de Pesca</p>
                      <p className="text-xs text-orange-500">Sube imagen de artes de pesca</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Especies Objetivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h5 className="font-medium text-yellow-800">Pez Espada</h5>
                      <p className="text-sm text-yellow-700 italic">Xiphias gladius</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center">
                    <Fish className="w-5 h-5 mr-2" />
                    Especies Asociadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Atún Aleta Amarilla</h5>
                      <p className="text-sm text-blue-700 italic">Thunnus albacares</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Dorado</h5>
                      <p className="text-sm text-blue-700 italic">Coryphaena hippurus</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Marlín</h5>
                      <p className="text-sm text-blue-700 italic">Makaira spp.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Indicadores */}
          <TabsContent value="indicadores" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Captura Anual</p>
                      <p className="text-2xl font-bold text-yellow-800">1,900</p>
                      <p className="text-xs text-gray-500">toneladas</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Valor Producción</p>
                      <p className="text-2xl font-bold text-yellow-800">$1,650</p>
                      <p className="text-xs text-gray-500">millones MXN</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Empleos Directos</p>
                      <p className="text-2xl font-bold text-yellow-800">1,200</p>
                      <p className="text-xs text-gray-500">pescadores</p>
                    </div>
                    <Users className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Embarcaciones</p>
                      <p className="text-2xl font-bold text-yellow-800">450</p>
                      <p className="text-xs text-gray-500">activas</p>
                    </div>
                    <Anchor className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Captura Histórica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={datosCapturasHistoricas}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="año" tick={{ fontSize: 12 }} />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        label={{ value: "Toneladas", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        formatter={(value, name) => [
                          `${value.toLocaleString()} ${name === "captura" ? "ton" : "MXN"}`,
                          name === "captura" ? "Captura" : "Valor",
                        ]}
                        labelFormatter={(label) => `Año: ${label}`}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="captura" stroke="#EAB308" strokeWidth={2} name="Captura" />
                      <Line type="monotone" dataKey="valor" stroke="#CA8A04" strokeWidth={2} name="Valor (millones)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Esfuerzo Pesquero</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={datosCapturasHistoricas}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="año" tick={{ fontSize: 12 }} />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        label={{ value: "Embarcaciones", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value.toLocaleString()}`, "Embarcaciones"]}
                        labelFormatter={(label) => `Año: ${label}`}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="captura" stroke="#3B82F6" strokeWidth={2} name="Esfuerzo Pesquero" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Participación por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {datosEstados.map((item) => (
                    <div key={item.estado} className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.estado}</span>
                        <span className="text-sm font-bold text-yellow-600">{item.porcentaje}%</span>
                    </div>
                      <Progress value={item.porcentaje} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Valor Económico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={datosCapturasHistoricas}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="año" tick={{ fontSize: 12 }} />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        label={{ value: "Millones MXN", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip
                        formatter={(value) => [`$${value.toLocaleString()} MXN`, "Valor Económico"]}
                        labelFormatter={(label) => `Año: ${label}`}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="valor" stroke="#CA8A04" strokeWidth={3} name="Valor Económico" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ambiente y Clima */}
          <TabsContent value="ambiente" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Efectos Ambientales y del Cambio Climático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  El cambio climático ha generado una afectación en los recursos pesqueros, ya que el calentamiento global
                  ha causado trastornos en la estacionalidad de algunos procesos biológicos, como en las redes tróficas
                  marinas. El pez espada, siendo una especie pelágica de aguas profundas, es particularmente vulnerable a
                  cambios en la temperatura del agua y las corrientes oceánicas que afectan su distribución y migración.
                  El aumento de la temperatura puede modificar los patrones de migración estacional y las áreas de
                  alimentación. Los cambios en las corrientes oceánicas pueden afectar la disponibilidad de presas y la
                  distribución espacial de las poblaciones. La acidificación oceánica puede tener efectos indirectos en las
                  redes tróficas pelágicas de las que depende el pez espada.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Normatividad */}
          <TabsContent value="normatividad" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200 shadow-xl">
                <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Normatividad e instrumentos de política y manejo pesquero
                  </CardTitle>
                </CardHeader>
              <CardContent className="p-8">
                <div className="overflow-x-auto shadow-lg rounded-xl border-2 border-gray-200">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200">
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-yellow-700" />
                            Instrumento de Manejo
                    </div>
                        </th>
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-yellow-700" />
                            Sí/No
                    </div>
                        </th>
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-3 text-amber-700" />
                            Disposición
                    </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-orange-700" />
                            Sustento
                  </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">1. Norma Oficial Mexicana</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No existe una NOM específica para pez espada. Oportunidad de mejora.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Necesidad identificada para manejo sustentable. Requerimiento de estudios científicos.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">2. Plan de Manejo Pesquero</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No existe un Plan de Manejo Pesquero específico. Oportunidad de mejora.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Necesidad identificada para manejo sustentable. Requerimiento de estudios científicos.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">3. Tipo de acceso</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Permiso de pesca comercial para especies pelágicas. Regulación de acceso.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Ley General de Pesca y Acuacultura Sustentables.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">4. Talla mínima</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No existen tallas mínimas establecidas. Oportunidad de mejora.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Necesidad de estudios de madurez sexual y biología pesquera.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">5. Arte de pesca y método de captura</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Palangre pelágico, arpón y red de enmalle regulados. Especificaciones técnicas establecidas.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Regulaciones internacionales y nacionales. Protección de especies asociadas.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">6. Veda</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No hay vedas establecidas específicamente para pez espada. Oportunidad de mejora.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Necesidad de estudios de reproducción y ciclo de vida. Evaluaciones de stock.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">7. Cuota</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No hay cuotas de captura establecidas. Oportunidad de mejora.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Necesidad de evaluaciones de stock. Análisis de rendimiento máximo sostenible.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">8. Unidad de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Embarcaciones de altura y artesanales autorizadas. Regulación de embarcaciones.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Clasificación de embarcaciones. Registro Nacional.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">9. Esfuerzo nominal autorizado</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No existe control específico del esfuerzo. Recomendación: No incrementar el esfuerzo pesquero.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Necesidad de evaluaciones de capacidad. Estudios de sostenibilidad.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">10. Zona de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Zonas delimitadas en el Pacífico mexicano. Aguas de jurisdicción federal.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Delimitación de aguas territoriales y zona económica exclusiva.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                    </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-bold mb-3 text-lg">Resumen de Instrumentos de Manejo:</p>
                      <ul className="list-disc list-inside space-y-2 text-yellow-700 font-medium">
                        <li><strong>Implementados (3):</strong> Tipo de acceso, Artes de pesca, Unidad de pesca, Zona de pesca</li>
                        <li><strong>Oportunidades de mejora (6):</strong> NOM, Plan de Manejo, Talla mínima, Veda, Cuota, Esfuerzo nominal autorizado</li>
                        <li><strong>Total evaluado:</strong> 10 instrumentos de manejo pesquero</li>
                      </ul>
                    </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>

          {/* Status */}
          <TabsContent value="status" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Estado de la Pesquería
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Columna Izquierda - Estado, Estrategia y Tácticas */}
                  <div className="space-y-6">
                    {/* Tarjetas de Estado */}
                  <div className="space-y-4">
                      {/* Con potencial de desarrollo */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Star className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-green-800 mb-1">Con Potencial de Desarrollo</h4>
                          <p className="text-sm text-gray-700 font-medium">Pacífico Mexicano</p>
                          <p className="text-xs text-gray-600 mt-1">Recurso subutilizado con potencial</p>
                        </div>
                      </div>
                        </div>

                    {/* Estrategia */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-yellow-800 border-b-2 border-yellow-200 pb-2">Estrategia</h3>
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <p className="text-gray-800 font-medium">Desarrollo sustentable del recurso mediante regulación y monitoreo</p>
                      </div>
                        </div>

                    {/* Tácticas */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-yellow-800 border-b-2 border-yellow-200 pb-2">Tácticas</h3>
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <ul className="space-y-2 text-gray-800">
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Desarrollo de normatividad específica</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Regulación de artes de pesca</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Monitoreo de poblaciones</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Control de acceso a recursos</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha - Espacio para Imagen */}
                  <div className="space-y-4">
                    <div className="h-full min-h-[600px] border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Target className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium mb-2">Imagen de Status</p>
                        <p className="text-sm text-gray-400 mb-4">Sube una imagen relacionada con el estado de la pesquería</p>
                        <Button variant="outline" size="sm">
                          Subir Imagen
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recomendaciones */}
          <TabsContent value="recomendaciones" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recomendaciones de Manejo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="overflow-x-auto shadow-lg rounded-xl border-2 border-gray-200">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200">
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-yellow-700" />
                            Recomendación
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-orange-700" />
                            Implementado / Avance
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Desarrollar y publicar una Norma Oficial Mexicana específica para pez espada.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Desarrollar y publicar un Plan de Manejo Pesquero específico para pez espada.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Establecer tallas mínimas de captura basadas en estudios de madurez sexual.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Establecer vedas reproductivas basadas en estudios de ciclo de vida.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Establecer cuotas de captura basadas en evaluaciones de stock.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Implementar sistemas de monitoreo y vigilancia más efectivos.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
