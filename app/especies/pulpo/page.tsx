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

// Datos históricos de captura de pulpo
const datosCapturasHistoricas = [
  { año: 2000, captura: 28500, valor: 1850 },
  { año: 2002, captura: 31200, valor: 2050 },
  { año: 2004, captura: 33800, valor: 2250 },
  { año: 2006, captura: 35200, valor: 2450 },
  { año: 2008, captura: 36800, valor: 2650 },
  { año: 2010, captura: 38200, valor: 2850 },
  { año: 2012, captura: 37500, valor: 3050 },
  { año: 2014, captura: 36900, valor: 3250 },
  { año: 2016, captura: 37200, valor: 3450 },
  { año: 2018, captura: 37100, valor: 3650 },
  { año: 2020, captura: 37000, valor: 3850 },
]

// Datos de participación por estado
const datosEstados = [
  { estado: "Yucatán", porcentaje: 82.5, captura: 30525 },
  { estado: "Campeche", porcentaje: 15.2, captura: 5624 },
  { estado: "Quintana Roo", porcentaje: 2.3, captura: 851 },
]

export default function PulpoPage() {
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
          <span className="text-yellow-600 font-medium">Pulpo</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-yellow-800 mb-2">Pulpo</h1>
              <p className="text-xl text-gray-600 italic">Octopus maya, Octopus americanus</p>
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
                <CardTitle className="text-yellow-800 flex items-center">
                  <Fish className="w-5 h-5 mr-2" />
                  Descripción General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                La pesquería de pulpo en México es una de las más importantes del país, aporta una producción promedio de 37,000 toneladas anuales, registrándose incluso las 47,000 toneladas durante el 2021, lo que representó el 2.4% de la producción pesquera nacional y cuyo valor fue de 3,289 millones de pesos. Su alto valor económico la posiciona en la tercera pesquería más importante del país, sólo después del camarón y el atún. A nivel nacional, los estados Yucatán y Campeche son los principales productores de este recurso pesquero, aportando el 94.5% de las capturas (SIAP, 2022) y en donde esta pesquería de la Península de Yucatán es considerada la más grande del Continente Americano, aportando el 30% de la producción del continente.
                En la región del Golfo de México y Mar Caribe, la pesquería de pulpo está basada principalmente en la captura de dos especies: el pulpo maya o rojo (Octopus maya) y el pulpo patón (O. americanus, anteriormente determinado como O. vulgaris). Sin embargo, O. maya representa aproximadamente el 75% de las capturas totales desde 1998, incluso hasta el 86% durante el año 2020. Una tercera especie denominada pulpo insular (O. insularis, anteriormente determinado como O. vulgaris) es capturada en Veracruz en menor proporción (0.1%) a nivel regional, pero de gran valor económico local y cultural.
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
                  <CardTitle className="text-yellow-800 flex items-center">
                    <Ship className="w-5 h-5 mr-2" />
                    Tipos de Embarcaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                  En esta pesquería participan dos tipos de flota pesquera: la flota menor o artesanal y la flota de mediana altura. La primera es la más numerosa, opera en todo el litoral de Campeche, Yucatán y norte de Quintana Roo. La flota que pesca en el Sistema Arrecifal Veracruzano también se puede considerar dentro de esta categoría. La flota de mediana altura en Yucatán opera casi exclusivamente en el puerto de Progreso, Yucatán.
                  Flota artesanal (Yucatán, Campeche y Quintana Roo): Embarcación menor equipada con motor fuera de borda (115 caballos de fuerza) con un máximo de 2 alijos y 4 pescadores. Captura al “gareteo” con dos varas con hasta siete líneas cada una y hasta cinco líneas más en un costado de la embarcación.
                  La pesca de pulpo se realiza exclusivamente durante el día, utilizando el método campechano o "gareteo", el cual consiste en dejar la embarcación a la deriva, arrastrando líneas de monofilamento o cordeles donde se sujeta la carnada, principalmente jaiba y cangrejo araña. La carnada va atada al extremo libre de la línea, el otro extremo, no sumergido, se ata a uno de los costados de la embarcación y a dos "jimbas", parte de las cuales se fija a la embarcación y parte pende a proa y popa. Los alijos emplean jimbas de dos a tres metros y de seis a siete líneas, en tanto que la embarcación usada como nodriza usa jimbas de cuatro a cinco metros y 16 líneas. Es un método de pesca muy selectivo.
                  Flota artesanal (Veracruz): Embarcaciones de fibra vidrio y motor fuera de borda y de dos a seis pescadores por embarcación. En el litoral veracruzano, específicamente en el Sistema Arrecifal Veracruzano (SAV), la pesca de pulpo se realiza por medio de buceo libre o apnea. Debido a las características del fondo marino, corrientes y profundidad del SAV, se usa el denominado gancho o bastón pulpero, de aproximadamente un metro de largo, es una varilla atada por uno de sus extremos a un tramo de madera a manera de mango, y por el otro lado, termina en una punta doblada en forma de gancho.
                  Flota de mediana altura (Yucatán): Embarcación mayor a 10 toneladas de arqueo neto que actúa como nodriza llevando hasta 12 alijos. Cada alijo lleva un par de varas de bambú (jimbas) y 5 líneas cebadas (2 por vara y una al costado). Participa un pescador por alijo.
                  En el caso de los alijos utilizados en las embarcaciones de mediana altura que se dedican casi exclusivamente a la captura de O. americanus, el arte de pesca y la operación son similares a los de la captura de O. maya, con excepción del tipo de carnadas pues además de los crustáceos mencionados, utilizan especies de escama como el vulcay (Diplectrum spp) y el chac-chi (Haemulon plumieri). En el caso de O. americanus, con el fin de asegurar la captura del molusco, el arte de pesca lleva al final de la línea un anzuelo, dado que la pesca es en aguas más profundas y el pulpo podría escapar al ser levantado el cordel.
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

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center">
                    <Anchor className="w-5 h-5 mr-2" />
                    Artes de Pesca
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    
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
                  <CardTitle className="text-yellow-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Especies Objetivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h5 className="font-medium text-yellow-800">Pulpo Maya o rojo</h5>
                      <p className="text-sm text-yellow-700 italic">Octopus maya</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h5 className="font-medium text-yellow-800">Pulpo Patón</h5>
                      <p className="text-sm text-yellow-700 italic">Octopus americanus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center">
                    <Fish className="w-5 h-5 mr-2" />
                    Especies Asociadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Pulpo insular de Veracruz</h5>
                      <p className="text-sm text-blue-700 italic">Octopus insularis</p>
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
                      <p className="text-2xl font-bold text-yellow-800">37,000</p>
                      <p className="text-xs text-gray-500">toneladas</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Valor Producción</p>
                      <p className="text-2xl font-bold text-yellow-800">$3,850</p>
                      <p className="text-xs text-gray-500">millones MXN</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Empleos Directos</p>
                      <p className="text-2xl font-bold text-yellow-800">15,500</p>
                      <p className="text-xs text-gray-500">pescadores</p>
                    </div>
                    <Users className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Embarcaciones</p>
                      <p className="text-2xl font-bold text-yellow-800">3,850</p>
                      <p className="text-xs text-gray-500">activas</p>
                    </div>
                    <Anchor className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
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

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
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

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
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

            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
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
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Efectos Ambientales y del Cambio Climático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                Con base en evidencia indirecta, se ha planteado la hipótesis de que las poblaciones de pulpos y, en general, de cefalópodos han estado proliferando en todo el mundo y específicamente alrededor de la Península de Yucatán debido a las condiciones ambientales más favorables provocadas por las tendencias del calentamiento global y el agotamiento de las pesquerías de peces que podrían ser competidores o depredadores de pulpos y cefalópodos. La incidencia del afloramiento derivado de la Corriente de Lazo, presente durante la primavera y el verano, enfría el agua del fondo a 20 °C en toda el área de muestreo, lo que favorecería los eventos de agregación y reproducción poblacional como se muestra al menos para O. maya.
                De acuerdo a los estudios realizados por Reyes-Bonilla et al. (2021), sobre dos escenarios de cambio climático: 1) el SSP5 (SSP585), que refleja un desarrollo impulsado por combustibles fósiles y 2) el SSP1 (SSP126), que refleja sustentabilidad para el horizonte 2050; se encontró que la distribución de la especie O. maya, abarca alrededor de 42,000 km2 y de acuerdo a las proyecciones, se obtuvo que, en promedio para los dos escenarios futuros, se tendría una disminución en el hábitat del 19%, limitando su presencia a las zonas más someras del Banco de Campeche y Yucatán, lo cual reduciría su área de distribución a 34,000 km2.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Normatividad */}
          <TabsContent value="normatividad" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
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
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          NORMA Oficial Mexicana NOM-008- SAG/PESC-2015, Para ordenar el aprovechamiento de las especies de pulpo en las aguas de jurisdicción federal del Golfo de México y Mar Caribe.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 13/04/2016
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">2. Plan de Manejo Pesquero</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          ACUERDO por el que se da a conocer el Plan de Manejo Pesquero de pulpo (O. maya y O. vulgaris) del Golfo de México y Mar Caribe.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 15/07/2014 
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
                          Permiso de pesca comercial para pulpo y concesiones de pesca.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Opinión técnica del IMIPAS.
                          Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">4. Talla mínima</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          110 mm de longitud de manto para ambos sexos y especies (Octopus maya y O. americanus) en el Golfo de México y Mar Caribe.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numeral 4.2, NOM-008- SAG/PESC-2015 (DOF: 13/04/2016).
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
                          Una embarcación menor equipada con un motor fuera de borda con una potencia nominal máxima de hasta 85.76 kilovatios (equivalentes a 115 caballos de fuerza), con un máximo de dos alijos y cuatro pescadores. Captura al "gareteo" con dos varas con hasta siete líneas cada una y hasta cinco líneas más en un costado de la embarcación.
                          Una embarcación mayor con hasta 12 alijos y 12 pescadores (un alijo por pescador a bordo), en cada alijo, un par de varas ("jimbas") y cinco líneas pulperas (dos por vara y una al costado del alijo).
                          En el Parque Nacional Sistema Arrecifal Veracruzano (PNSAV), la pesca deberá realizarse mediante buceo por apnea a profundidades menores a tres metros, pudiendo auxiliarse de un bastón pulpero para la captura. Para la pesca en esta zona deberá observarse lo dispuesto en el Decreto de creación del PNSAV y su Programa de Manejo.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numeral 4.3, NOM-008- SAG/PESC-2015 (DOF: 13/04/2016).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">6. Veda</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Del 16 de diciembre al 31 de julio de cada año en Campeche, Yucatán y Quintana Roo.
                          Del 1 de enero al último día de febrero y del 1 al 30 de agosto de cada año para pulpo rojo en el Parque Nacional Sistema Arrecifal Veracruzano.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          NOM-009-PESC-1993 (DOF: 04/03/1994).
                          Acuerdo	modificatorio (DOF: 30/07/2015).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">7. Cuota</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Varía anualmente de acuerdo a dictamen técnico emitido por IMIPAS.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Dictamen	técnico	del IMIPAS.
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
                          Flota artesanal (Península de Yucatán): embarcaciones de fibra de vidrio, de 5 a 10.5 m de eslora con motor fuera de borda, que lleva un par de jimbas y que puede incrementar su esfuerzo con un máximo de dos alijos y un par de jimbas cada uno, haciendo un total de 6 jimbas como máximo.
                          Flota	artesanal	(Veracruz): Embarcaciones de fibra vidrio y motor fuera de borda y de dos a seis pescadores por embarcación. En el litoral veracruzano, específicamente en el Sistema Arrecifal Veracruzano (SAV), la pesca de pulpo se realiza por medio de buceo libre o apnea. Debido a las características del fondo marino, corrientes y profundidad del SAV, se usa el denominado gancho o bastón pulpero, de aproximadamente un metro de largo, es una varilla atada por uno de sus extremos a un tramo de madera a manera de mango, y por el otro lado, termina en una punta doblada en forma de gancho.
                          Flota de mediana altura (Yucatán): Embarcación mayor a 10 t de arqueo neto que actúa como nodriza llevando hasta 12 alijos como máximo. Cada alijo lleva un par de varas de bambú (jimbas) y 5 líneas cebadas (2 por vara y una al costado). Participa un pescador por alijo.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Opinión técnica del IMIPAS.
                          Permisos de pesca comercial.
                          NOM-008-SAG/PESC- 2015 (DOF: 13/04/2016).
                          Artículo 4, Sección XVII, LGPAS	(DOF: 24/04/2018).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">9. Esfuerzo nominal autorizado</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          En Yucatán 901 permisos, que amparan 2,768 embarcaciones menores y 411 embarcaciones mayores.
                          Campeche hay 628 permisos que amparan 1,178 embarcaciones menores y 1 embarcación mayor.
                          Quintana Roo, 15 permisos que amparan 245 embarcaciones menores.
                          Veracruz, 18 permisos que amparan 75 embarcaciones menores.
                          Tabasco, un permiso que ampara una embarcación mayor.
                          Tamaulipas, un permiso de pesca que ampara dos embarcaciones menores.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de	Administración Pesquera vigentes a abril de 2024
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
                          Aguas de jurisdicción federal y sistemas lagunares del Golfo de México y Mar Caribe.
                          ACUERDO por el que se establece una zona de refugio pesquero parcial temporal en aguas marinas de jurisdicción federal en el área que se ubica frente al Municipio de Celestún, en el Estado de Yucatán.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Permiso de pesca comercial para pulpo y concesiones de pesca.
                          DOF: 02/10/2019
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
                      {/* Pulpo maya - Aprovechado al máximo sustentable */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-10 h-10 text-yellow-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-yellow-800 mb-1">Aprovechado al máximo sustentable</h4>
                          <p className="text-sm text-gray-700 font-medium">Pulpo maya (Octopus maya)</p>
                          <p className="text-xs text-gray-600 mt-1">Península de Yucatán</p>
                        </div>
                      </div>
                      {/* Pulpo patón - Con potencial de desarrollo */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-green-800 mb-1">Con potencial de desarrollo</h4>
                          <p className="text-sm text-gray-700 font-medium">Pulpo patón (Octopus americanus)</p>
                          <p className="text-xs text-gray-600 mt-1">Península de Yucatán</p>
                        </div>
                      </div>
                    </div>

                    {/* Estrategia */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-yellow-800 border-b-2 border-yellow-200 pb-2">Estrategia</h3>
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <p className="text-gray-800 font-medium">Cuota de captura por temporada de pesca</p>
                      </div>
                        </div>

                    {/* Tácticas */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-yellow-800 border-b-2 border-yellow-200 pb-2">Tácticas</h3>
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <ul className="space-y-2 text-gray-800">
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Control del esfuerzo</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Talla mínima de captura</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Veda reproductiva y de crecimiento</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Regulación en el arte de pesca</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Zona de refugio pesquero</span>
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
                          <p className="text-sm text-gray-800 font-medium">Instrumentar las estrategias y acciones establecidas en el Plan de Manejo Pesquero.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Mantener el esfuerzo pesquero actual y no incrementarlo.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Actualizar el Plan de Manejo Pesquero y la NOM-008-SAG/PESC-2015.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Fomentar el comanejo a través del Comité Consultivo de Manejo Pesquero.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Implementar la productividad latente total promedio (PLT) como Punto de Referencia Límite y actualizarlo anualmente con la información pesquera disponible de cada año.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Regular el número de alijos permitidos por tipo de embarcación y verificar las artes de pesca de acuerdo a la NOM-008-SAG/PESC-2015.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Evitar el uso de grampines en el arte del garete cuando la pesca se realice por debajo y hasta la isobata de 30 m de profundidad, zona de mayor abundancia de Octopus maya.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">La cuota de pesca no debe sobrepasar el Punto de Referencia Límite.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Reforzar las acciones de inspección y vigilancia para evitar la pesca furtiva con buceo y demás artes no permitidas.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Prohibir el uso de especies que se encuentren en categoría de riesgo o bajo alguna protección especial en las normas nacionales o internacionales, como cebo o carnada para la captura de pulpo.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Desagregar las capturas por especie en los avisos de arribo.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
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
