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

// Datos históricos de captura de caracoles
const datosCapturasHistoricas = [
  { año: 2000, captura: 18500, valor: 420 },
  { año: 2002, captura: 17800, valor: 445 },
  { año: 2004, captura: 16900, valor: 470 },
  { año: 2006, captura: 15800, valor: 495 },
  { año: 2008, captura: 15200, valor: 520 },
  { año: 2010, captura: 14800, valor: 545 },
  { año: 2012, captura: 14500, valor: 570 },
  { año: 2014, captura: 14200, valor: 595 },
  { año: 2016, captura: 14100, valor: 620 },
  { año: 2018, captura: 14050, valor: 645 },
  { año: 2020, captura: 14062, valor: 670 },
]

// Datos de participación por estado
const datosEstados = [
  { estado: "Yucatán", porcentaje: 78.5, captura: 11039 },
  { estado: "Campeche", porcentaje: 15.2, captura: 2137 },
  { estado: "Quintana Roo", porcentaje: 6.3, captura: 886 },
]

export default function CaracolesPage() {
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
          <span className="text-green-600 font-medium">Caracoles</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-green-800 mb-2">Caracoles</h1>
              <p className="text-xl text-gray-600 italic">Varios</p>
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
                En el litoral de Campeche las especies más abundantes de caracol de importancia pesquera más abundantes son negro o tomburro (Turbinella angulata) y sacabocado o lix (Sinistrofulgur perversum) cuyo aporte es el 87%, el resto lo constituyen los caracoles blanco (Macrostrombus costatus), chacpel o rojo (Triplofusus gigantea) y ocasionalmente la campechana (Fasciolaria tulipa). Por su parte el caracol chacpel es la especie con el mayor valor comercial con respecto al resto de los caracoles que conforma el recurso caracol en el estado de Campeche, al mismo tiempo es también la especie con el menor porcentaje de captura registrado en los últimos años y representa solo el 2.5% del total de captura comercial.
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
                  La unidad de pesca para la captura de caracol en Campeche consiste en una embarcación menor de entre 5 y 8 metros de eslora con motor fuera de borda entre 60 y 115 caballos de fuerza (HP), con capacidad máxima de almacenaje de 0.5 toneladas. Las embarcaciones son tripuladas por entre cuatro y siete pescadores con equipo de buceo autónomo y la recolección de las especies se realiza manualmente. En Campeche la pesca se realiza en cinco comunidades pesqueras concentrándose las descargas en los puertos de Isla Aguada, Champotón, Seybaplaya, puerto de Campeche e Isla Arena en los límites con el estado de Yucatán.
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
                  La explotación de caracol se realiza mediante métodos artesanales tales como recolección manual en la zona intermareal, mejor conocido como método de colecta de baja marea, hasta buceo libre o de apnea y buceo semiautónomo para la extracción de las especies de mayor talla; de los anteriores los métodos de colecta de baja marea y buceo semiautónomo no están permitidos de acuerdo con las NORMAS Oficiales Mexicanas NOM-064-SAG/PESC/SEMARNAT-2013 y NOM-013-SAG/PESC-2016 para este recurso. La pesca por medio de buceo se desarrolla en toda la zona litoral del estado de Campeche desde Isla Aguada hasta Isla Arena a profundidades comprendidas entre 2 y 12 metros. Para el transporte a los sitios de pesca se utilizan embarcaciones menores de 5.5 y 7.0 metros de eslora con motor fuera de borda de entre 40 y 115 caballos de fuerza.
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
                      <h5 className="font-medium text-green-800">Caracol tomburro</h5>
                      <p className="text-sm text-green-700 italic">Turbinella angulatata</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Caracol sacabocado</h5>
                      <p className="text-sm text-green-700 italic">Sinistrofulgur perversum</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Caracol lanceta</h5>
                      <p className="text-sm text-green-700 italic">Lobatus costatus</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Caracol rojo, Chac-pel</h5>
                      <p className="text-sm text-green-700 italic">Triplofusus gigantea</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Caracol campechana</h5>
                      <p className="text-sm text-green-700 italic">Fasciolaria tulipa</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Caracol canelo o lancetita</h5>
                      <p className="text-sm text-green-700 italic">Strombus pugilis</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Caracol nolón</h5>
                      <p className="text-sm text-green-700 italic">Melongena melongena</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Caracol chivita</h5>
                      <p className="text-sm text-green-700 italic">Melongena corona bispinosa</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Caracol rosado o abanico</h5>
                      <p className="text-sm text-green-700 italic">Lobatus gigas</p>
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
                      <p className="text-2xl font-bold text-green-800">14,062</p>
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
                      <p className="text-2xl font-bold text-green-800">$670</p>
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
                      <p className="text-2xl font-bold text-green-800">6,500</p>
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
                      <p className="text-2xl font-bold text-green-800">2,800</p>
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
                <p className="text-gray-700 leading-relaxed">
                El recurso pesquero de caracol mantiene una amplia distribución a lo largo del Golfo de México y Mar Caribe, este recurso se encuentra representado por diversas especies en aguas de territorio mexicano, las cuales son especialmente susceptible a los efectos que produce el cambio climático. Los efectos producidos pueden ser de forma directa o indirecta, afectando el hábitat, vegetación, fauna y modificación de corrientes u oleaje. La composición en la concha de los caracoles es principalmente de carbonato de calcio, la cual se ve directamente afectada ante el aumento de la acidificación en los mares, dando como resultado una concha menos densa y provocando un mayor gasto energético en la generación de esta, provocando a su vez efectos en cadena que afectan la tasa de crecimiento de los organismos (Vázquez-Botello et al. 2005; Cepeda- González et al. 2009; Rivera-Arriaga et al., 2010).
                Los incrementos en la temperatura atribuidos al cambio climático producen un aumento de las corrientes y el oleaje, modificación en los patrones de nortes y huracanes y aumento del nivel del mar, los cuales afectan directamente los sitios de crianza, reclutamiento, refugio y reproducción de los caracoles.
                Por otra parte, el cambio climático ha incrementado en la frecuencia de ocurrencia de marea roja, la cual afecta a los caracoles por la transferencia de las biotoxinas producidas por estas algas, problema que afectan directamente al ser humano al consumir estos organismos (Cepeda-González et al., 2009; Rivera-Arriaga et al., 2010).
                </p>
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
                          NORMA Oficial Mexicana NOM-013- SAG/PESC-2016, para regular el aprovechamiento de las especies de caracol en aguas de jurisdicción federal del Golfo de México y Mar Caribe.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 19/08/2016
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">2. Plan de Manejo Pesquero</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          ACUERDO por el que se da a conocer el Plan de Manejo Pesquero de las especies de caracol negro o tomburro (Turbinella angulata); sacabocado o lix (Sinistrofulgur perversum); rojo o chacpel (Triplofusus giganteus); campechana (Fasciolaria tulipa); blanco o lanceta (Macrostrombus costatus); canelo o boxeador (Strombus pugilis); molón o nolón (Melongena melongena) y chivita o noloncito (Melongena corona bispinosa) del litoral del Estado de Campeche.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 25/03/2014
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
                            Permiso de pesca comercial
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Opinión	técnica	del IMIPAS 
                          Artículo 36, Fracción III de la LGPAS
                          (DOF: 24/04/2018)
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">4. Talla mínima</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          30 centímetros de longitud de concha (LC) Triplofusus giganteus; 22 centímetros de longitud de concha Sinistrofulgur    perversum;    20 centímetros de longitud de concha Lobatus gigas y Turbinella angulata; 18 centímetros de longitud de concha Macrostrombus costatus; 7 centímetros de longitud de concha Strombus pugilis; 4 centímetros de longitud de concha Melongena corona
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numeral 4.3, NOM- 013-SAG/PESC-2016 (DOF: 19/08/2016)
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
                          Manualmente en la zona intermareal y mediante buceo libre y autónomo en la zona costera hasta los 12 metros de profundidad.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numeral 4.2.2, NOM-013-SAG/PESC-2016 (DOF: 19/08/2016)
                          Dictamen técnico del IMIPAS
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
                          Campeche: veda temporal para todas las especies del 1 de enero al 14 de marzo y del 16 de julio al 31 de diciembre de cada año.
                          Yucatán: veda permanente para la pesca de caracol rosado (Lobatus gigas), caracol lanceta (Macrostrombus costatus), caracol tomburro (Turbinella angulata), caracol chivita (Busycom sp.) y caracol chacpel (Triplofusus giganteus).
                          Quintana Roo: veda temporal del 21 de noviembre de 2012 al 28 de febrero de 2017 y a partir de 2018 y años sucesivos, durante todo el mes de febrero y del 1 de mayo al 30 de noviembre de cada año para caracol rosado (Lobatus gigas).
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 06/05/2008 DOF: 16/03/1994 DOF: 20/03/2015
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">7. Cuota</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Cuota de captura variable por zona y banco en Quintana Roo
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Dictamen	técnico	del IMIPAS.
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
                            Embarcaciones menores
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Dictamen técnico del IMIPAS
                          Artículo 4, Sección XVII, LGPAS	(DOF 24/04/2018)
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">9. Esfuerzo nominal autorizado</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          108	permisos	que	amparan	255 embarcaciones en tres Estados: Campeche, Quintana Roo y Veracruz.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de	Administración Pesquera vigentes a abril de 2024
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
                          Aguas marinas costeras de Jurisdicción Federal de Veracruz, Tabasco, Campeche y Yucatán entre 2-12 m de profundidad. 
                          Quintana Roo, 2-10 m de profundidad y en la zona intermareal de lagunas costeras. El caracol rosado sólo se puede pescar en la Reserva de la Biosfera Banco Chinchorro.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Permiso	para	pesca comercial.
                          DOF: 19/07/2017
                          NOM	-013-SAG/PESC- 2016 (DOF: 19/08/2016).
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                      {/* Con riesgo de deterioro */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-10 h-10 text-yellow-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-yellow-800 mb-1">Aprovechado al máximo sustentable</h4>
                          <p className="text-sm text-gray-700 font-medium">Caracol tomburro (Turbinella angulata) y trompillo (Sinistrofulgur perversum)</p>
                          <p className="text-xs text-gray-600 mt-1"></p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-red-800 mb-1">En deterioro</h4>
                          <p className="text-sm text-gray-700 font-medium">Caracol rosado (Lobatus gigas), blanco (Macrostrombus costatus), chacpel (Triplofusus giganteus)</p>
                          <p className="text-xs text-gray-600 mt-1"></p>
                        </div>
                      </div>
                    </div>

                    {/* Estrategia */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-200 pb-2">Estrategia</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <p className="text-gray-800 font-medium">Cuota de captura anual para el caracol rosado en el estado de Quintana Roo y tasa de aprovechamiento variable en el resto de las entidades federativas del Golfo de México.</p>
                      </div>
                    </div>

                    {/* Tácticas */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-200 pb-2">Tácticas</h3>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <ul className="space-y-2 text-gray-800">
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Control de esfuerzo pesquero</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Regulación en el arte y método de captura</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Vedaa termporales en Campeche y Quintana Roo y permanente en Yucatán</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Talla mínima de captura</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Zonas de refugio pesquero</span>
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
                          Modificar la NOM-013-SAG/PESC-2016, promoviendo la prohibición del buceo autónomo y semiautónomo para la captura de caracol y especificar que la colecta manual deberá realizarse únicamente a través del buceo libre o de apnea.
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
                          Establecer la proporción peso-talla para las diferentes especies de caracol.
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
                          Prohibir la captura fuera de las áreas de pesca autorizadas, conforme a la NOM-013-SAG/PESC- 2016.
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
