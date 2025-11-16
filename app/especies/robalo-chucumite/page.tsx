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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

// Datos históricos de captura de robalo y chucumite
const datosCapturasHistoricas = [
  { año: 2000, captura: 7200, valor: 580 },
  { año: 2002, captura: 7450, valor: 610 },
  { año: 2004, captura: 7680, valor: 640 },
  { año: 2006, captura: 7820, valor: 670 },
  { año: 2008, captura: 7950, valor: 700 },
  { año: 2010, captura: 8100, valor: 730 },
  { año: 2012, captura: 8050, valor: 760 },
  { año: 2014, captura: 7980, valor: 790 },
  { año: 2016, captura: 7970, valor: 820 },
  { año: 2018, captura: 7960, valor: 850 },
  { año: 2020, captura: 7956, valor: 880 },
]

// Datos de participación por estado
const datosEstados = [
  { estado: "Veracruz", porcentaje: 32.5, captura: 2586 },
  { estado: "Tabasco", porcentaje: 28.2, captura: 2244 },
  { estado: "Campeche", porcentaje: 18.3, captura: 1456 },
  { estado: "Tamaulipas", porcentaje: 12.0, captura: 955 },
  { estado: "Otros", porcentaje: 9.0, captura: 715 },
]

export default function RobaloChucumitePage() {
  const [activeTab, setActiveTab] = useState("generalidades")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/especies" className="hover:text-blue-600 transition-colors">
            Especies
          </Link>
          <span>/</span>
          <span className="text-green-600 font-medium">Robalo y Chucumite</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-green-800 mb-2">Robalo y Chucumite</h1>
              <p className="text-xl text-gray-600 italic">Centropomus undecimalis</p>
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
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Fish className="w-5 h-5 mr-2" />
                  Descripción General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  El robalo común (Centropomus undecimalis) y el chucumite son peces eurihalinos de gran importancia
                  comercial y deportiva en México. Estas especies habitan tanto en aguas dulces como saladas, utilizando
                  estuarios, lagunas costeras y ríos para su desarrollo. Son altamente valorados por su carne de
                  excelente calidad y su importancia en la pesca deportiva.
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
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Ship className="w-5 h-5 mr-2" />
                    Tipos de Embarcaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    El robalo común (Centropomus undecimalis) y el chucumite son peces eurihalinos de gran importancia
                    comercial y deportiva en México. Estas especies habitan tanto en aguas dulces como saladas, utilizando
                    estuarios, lagunas costeras y ríos para su desarrollo. Son altamente valorados por su carne de
                    excelente calidad y su importancia en la pesca deportiva.
                  </p>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                    <div className="text-center">
                      <Ship className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-blue-600 font-medium">Tipos de Embarcaciones</p>
                      <p className="text-xs text-blue-500">Sube imagen de embarcaciones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Anchor className="w-5 h-5 mr-2" />
                    Artes de Pesca
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    El robalo común (Centropomus undecimalis) y el chucumite son peces eurihalinos de gran importancia
                    comercial y deportiva en México. Estas especies habitan tanto en aguas dulces como saladas, utilizando
                    estuarios, lagunas costeras y ríos para su desarrollo. Son altamente valorados por su carne de
                    excelente calidad y su importancia en la pesca deportiva.
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
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Especies Objetivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Robalo Común</h5>
                      <p className="text-sm text-green-700 italic">Centropomus undecimalis</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Robalo Prieto</h5>
                      <p className="text-sm text-green-700 italic">Centropomus parallelus</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Chucumite</h5>
                      <p className="text-sm text-green-700 italic">Centropomus poeyi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Fish className="w-5 h-5 mr-2" />
                    Especies Asociadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Sábalo</h5>
                      <p className="text-sm text-blue-700 italic">Megalops atlanticus</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Lisa</h5>
                      <p className="text-sm text-blue-700 italic">Mugil cephalus</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Jurel</h5>
                      <p className="text-sm text-blue-700 italic">Caranx hippos</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Pargo</h5>
                      <p className="text-sm text-blue-700 italic">Lutjanus campechanus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Indicadores */}
          <TabsContent value="indicadores" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Captura Anual</p>
                      <p className="text-2xl font-bold text-green-800">7,956</p>
                      <p className="text-xs text-gray-500">toneladas</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Valor Producción</p>
                      <p className="text-2xl font-bold text-green-800">$880</p>
                      <p className="text-xs text-gray-500">millones MXN</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Empleos Directos</p>
                      <p className="text-2xl font-bold text-green-800">5,200</p>
                      <p className="text-xs text-gray-500">pescadores</p>
                    </div>
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Embarcaciones</p>
                      <p className="text-2xl font-bold text-green-800">1,850</p>
                      <p className="text-xs text-gray-500">activas</p>
                    </div>
                    <Anchor className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800">Captura Histórica</CardTitle>
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
                      <Line type="monotone" dataKey="captura" stroke="#10B981" strokeWidth={2} name="Captura" />
                      <Line type="monotone" dataKey="valor" stroke="#059669" strokeWidth={2} name="Valor (millones)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800">Esfuerzo Pesquero</CardTitle>
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

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800">Participación por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {datosEstados.map((item) => (
                    <div key={item.estado} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.estado}</span>
                        <span className="text-sm font-bold text-green-600">{item.porcentaje}%</span>
                      </div>
                      <Progress value={item.porcentaje} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800">Valor Económico</CardTitle>
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
                      <Line type="monotone" dataKey="valor" stroke="#059669" strokeWidth={3} name="Valor Económico" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ambiente y Clima */}
          <TabsContent value="ambiente" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Efectos Ambientales y del Cambio Climático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed"></p>
                      El cambio climático ha generado una afectación en los recursos pesqueros, ya que el calentamiento global
ha causado trastornos en la estacionalidad de algunos procesos biológicos, como en las redes tróficas
marinas y de aguas dulces. Además, ocasiona acontecimientos extremos tales como inundaciones, sequias y
tormentas, con consecuencias imprevisibles para la producción pesquera. Con este evento se ha registrado
un desplazamiento hacia los polos de las especies de aguas templadas con los consiguientes cambios en el
tamaño y productividad de sus hábitats, y según las regiones y latitudes, tendrá efectos tanto positivos como
negativos en las pesquerías y en las actividades acuícolas.

              </CardContent>
            </Card>
          </TabsContent>

          {/* Normatividad */}
          <TabsContent value="normatividad" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Normatividad e instrumentos de política y manejo pesquero
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="overflow-x-auto shadow-lg rounded-xl border-2 border-gray-200">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-green-700" />
                            Instrumento de Manejo
                    </div>
                        </th>
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-green-700" />
                            Sí/No
                    </div>
                        </th>
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-3 text-blue-700" />
                            Disposición
                    </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-purple-700" />
                            Sustento
                    </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">1. Norma Oficial Mexicana</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            NOM-033-SAG/PESC-2014, Pesca responsable en el Sistema Lagunar Champayán y Río Tamesí. NOM-037-PESC-2004, Pesca responsable en el Sistema Lagunar formado por las humedales del Usumacinta. Especificaciones para el aprovechamiento de los recursos pesqueros.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Normas Oficiales Mexicanas publicadas en el Diario Oficial de la Federación. Basadas en estudios técnicos del IMIPAS y CONAPESCA. Regulación federal para el aprovechamiento sustentable de recursos pesqueros.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">2. Plan de Manejo Pesquero</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            ACUERDO por el que se da a conocer el Plan de Manejo Pesquero de robalo (Centropomus undecimalis) del Golfo de México y Mar Caribe. Lineamientos, estrategias y acciones de manejo establecidas.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Acuerdo publicado en el Diario Oficial de la Federación. Basado en estudios científicos del IMIPAS. Estrategia integral para el manejo sustentable de la pesquería.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">3. Tipo de acceso</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Permiso/Concesiones de pesca comercial para escama marina con dictamen técnico del IMIPAS. No existen permisos o concesiones específicos de pesca comercial de robalo.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Ley General de Pesca y Acuacultura Sustentables. Reglamento de la Ley General de Pesca y Acuacultura Sustentables. Amparado por el permiso de pesca comercial de escama marina en la región.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">4. Talla mínima</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No existen tallas mínimas establecidas para robalo y chucumite. Oportunidad de mejora para establecer regulaciones de talla mínima de captura.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Estudios de biología pesquera y tallas de primera madurez. Recomendaciones del Plan de Manejo Pesquero. Mejores prácticas internacionales para manejo sustentable.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">5. Arte de pesca y método de captura</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            El robalo se captura con red de enmalle, y el chucumite con red de enmalle y atarrayas principalmente. Para robalo blanco, C. undecimalis, se recomienda redes de enmalle con tamaño de malla de 6.0 pulgadas.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Estudios de selectividad de artes de pesca. Recomendaciones del Plan de Manejo Pesquero. Análisis de eficiencia y impacto de diferentes métodos de captura.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">6. Veda</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Acuerdo de veda para robalo prieto y robalo blanco en el Golfo de México del 15 de mayo al 30 de junio desde Soto la Marina, Tamaulipas, hasta Chachalacas, Veracruz; del 01 de julio al 15 de agosto desde Chachalacas, Ver., hasta Tonalá, entre los límites de Veracruz y Tabasco.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Estudios de reproducción y época de desove. Acuerdo publicado en el Diario Oficial de la Federación. Protección de los periodos reproductivos críticos de las especies.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">7. Cuota</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No hay cuotas establecidas para robalo y chucumite. Oportunidad de mejora para implementar cuotas de captura anuales basadas en evaluaciones de stock.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Evaluaciones de stock y biomasa reproductiva. Análisis de rendimiento máximo sostenible (RMS). Experiencias internacionales en manejo por cuotas. Recomendaciones del Plan de Manejo Pesquero.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">8. Unidad de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Embarcaciones menores autorizadas para la pesca de robalo y chucumite. Regulación del tipo y tamaño de embarcaciones permitidas para esta pesquería.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Clasificación de embarcaciones por la Secretaría de Marina. Regulaciones de pesca costera y artesanal. Permisos de pesca comercial para embarcaciones menores.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">9. Esfuerzo nominal autorizado</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            No existen permisos o concesiones específicos de pesca comercial de robalo. Amparado por el permiso de pesca comercial de escama marina en la región. Recomendación: No incrementar el esfuerzo pesquero.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Evaluaciones de capacidad de carga del ecosistema. Análisis de impacto del esfuerzo pesquero actual. Recomendaciones del Plan de Manejo Pesquero. Estudios de sostenibilidad a largo plazo.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">10. Zona de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Aguas marinas de Jurisdicción Federal ríos y sistemas lagunares del Golfo de México y Mar Caribe. Considerando los lineamientos de la Zona de Refugio pesquero parcial temporal Akumal en Quintana Roo.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Delimitación de aguas territoriales y zona económica exclusiva. Regulaciones de pesca en aguas federales. Establecimiento de zonas de refugio pesquero. Protección de áreas de reproducción y crianza.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                    </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-bold mb-3 text-lg">Resumen de Instrumentos de Manejo:</p>
                      <ul className="list-disc list-inside space-y-2 text-blue-700 font-medium">
                        <li><strong>Implementados (6):</strong> NOM, Plan de Manejo, Tipo de acceso, Artes de pesca, Veda, Unidad de pesca, Zona de pesca</li>
                        <li><strong>Oportunidades de mejora (3):</strong> Talla mínima, Cuota, Esfuerzo nominal autorizado</li>
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
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
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
                      {/* Aprovechados al máximo sustentable */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-green-800 mb-1">Máximo Sustentable</h4>
                          <p className="text-sm text-gray-700 font-medium">Veracruz, Tabasco y Quintana Roo</p>
                          <p className="text-xs text-gray-600 mt-1">Aprovechados al máximo sustentable</p>
                        </div>
                      </div>

                      {/* Con riesgo de deterioro */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-yellow-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-yellow-800 mb-1">Con Riesgo de Deterioro</h4>
                          <p className="text-sm text-gray-700 font-medium">Tamaulipas, Campeche y Yucatán</p>
                          <p className="text-xs text-gray-600 mt-1">Aprovechado al máximo con riesgo</p>
                        </div>
                      </div>
                    </div>

                    {/* Estrategia */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-200 pb-2">Estrategia</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <p className="text-gray-800 font-medium">Tasa de aprovechamiento variable</p>
                      </div>
                    </div>

                    {/* Tácticas */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-200 pb-2">Tácticas</h3>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <ul className="space-y-2 text-gray-800">
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Control del esfuerzo pesquero</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Regulación en el arte y método de captura</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Zona de pesca</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Veda espacial y temporal variable</span>
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
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recomendaciones de Manejo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="overflow-x-auto shadow-lg rounded-xl border-2 border-gray-200">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-green-700" />
                            Recomendación
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-purple-700" />
                            Implementado / Avance
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Elaborar y publicar una Norma Oficial Mexicana específica para regular el aprovechamiento del recurso robalo en zonas costeras y marinas.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Actualizar las NOM-060-SAG/PESC-2016 para cuerpos de agua continentales.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Instrumentar los lineamientos, estrategias y acciones de manejo que se encuentran establecidos en el Plan de Manejo Pesquero de robalo.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            No incrementar el esfuerzo pesquero.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Para el robalo blanco, C. undecimalis, se recomienda que la captura de este recurso se realice con redes de enmalle con tamaño de malla de 6.0 pulgadas.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Sin información de avance.
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Establecer una veda reproductiva de julio a agosto de cada año a nivel Golfo de México y Mar Caribe.
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
