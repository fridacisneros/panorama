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

export default function AlmejasPage() {
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
          <span className="text-green-600 font-medium">Almejas</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-2">Almejas</h1>
            <p className="text-xl text-gray-600 italic">Rangia cuneata, Rangia flexuosa, Mercenaria campechiensis</p>
            <p className="text-sm text-gray-500 mt-2">Golfo de México y Mar Caribe | Fuente: CNP, 2023</p>
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
                      En los últimos años, la captura de moluscos ha disminuido considerablemente de 7,129 mil toneladas en 2015 a 5,959 mil toneladas en 2018. Cabe señalar, que la producción en América de moluscos cultivados representa el 3.69% de las 17,304 mil toneladas que se reportaron a nivel mundial para el 2018, considerando a China como el mayor productor con 14.4 millones de toneladas, es decir, en términos económicos y de producción la acuacultura de moluscos está supliendo la demanda por extracción como tendencia firme a nivel mundial.
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

            {/* Distribución Geográfica */}
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Distribución Geográfica y Zonas de Captura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Las almejas habitan diferentes tipos de ambientes desde lagunas costeras, esteros de baja salinidad y zonas riparias con leve influencia marina, se encuentran enterradas en sustratos blandos hasta arenosos. Su distribución es extensa desde Tamaulipas hasta Quintana Roo, sin embargo, las pesquerías se han concentrado en Tamaulipas y Veracruz.
                </p>
              </CardContent>
            </Card>

            {/* Sección de Embarcaciones y Artes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Ship className="w-5 h-5 mr-2" />
                    Tipo de Embarcación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    La unidad básica de pesca consiste en: 1 pescador con embarcación de 3 metros de eslora, que la utiliza a modo de contenedor para colocar el producto extraído, así como medios tambos de plástico, taras con flotadores o bolsos con flotadores o cámaras de llanta con una red integrada; Las unidades más grandes cuentan con 5 o 10 pescadores embarcados en lanchas de fibra de vidrio de 7.5 metros de eslora y motor fuera de borda de hasta 60 caballos de potencia que funcionan como nodrizas.
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
                    Las almejas se extraen manualmente por buceo libre o palas en zonas con aguas claras y someras, mientras que en zonas con sustrato lodoso o arenoso se utilizan cucharas de mango largo manipuladas desde la embarcación o bien tocando el fondo con los pies y manos.
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

            {/* Especies Objetivo y Asociadas */}
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
                      <h5 className="font-medium text-green-800">Almeja gallo</h5>
                      <p className="text-sm text-green-700 italic">Rangia cuneata</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Almeja burra, casco</h5>
                      <p className="text-sm text-green-700 italic">Rangia flexuosa</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Almeja bola</h5>
                      <p className="text-sm text-green-700 italic">Mercenaria campechiensis</p>
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
                      <h5 className="font-medium text-blue-800">Almeja roñosa</h5>
                      <p className="text-sm text-blue-700 italic">Chione cancellata</p>
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
                      <p className="text-sm font-medium text-gray-600">Producción Nacional</p>
                      <p className="text-2xl font-bold text-green-800">30,211</p>
                      <p className="text-xs text-gray-500">toneladas (2018)</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Valor Total</p>
                      <p className="text-2xl font-bold text-green-800">$752.5</p>
                      <p className="text-xs text-gray-500">millones MXN (2018)</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Posición Nacional</p>
                      <p className="text-2xl font-bold text-green-800">12º</p>
                      <p className="text-xs text-gray-500">por volumen</p>
                    </div>
                    <Target className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tasa de Crecimiento</p>
                      <p className="text-2xl font-bold text-red-800">-6.29%</p>
                      <p className="text-xs text-gray-500">últimos 10 años</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-500 rotate-180" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Capturas Históricas */}
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Capturas Históricas por Estado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    De acuerdo al Anuario Estadístico de Acuacultura y Pesca 2018, las almejas están en 12º lugar a nivel nacional en relación a su importancia por volumen, mientras que están en el 11º por el valor comercial. Han presentado una tasa de crecimiento negativa (-6.29%) en los últimos 10 años, aun siendo especies que se encuentran en el 7º lugar de productos exportados. El total producido a nivel nacional es de 30,211 toneladas, Veracruz es el 4º productor con 2,096 toneladas que representan el 6.94% y Tamaulipas mantiene el 8º sitio con 7 toneladas con una aportación de apenas 0.02%.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    En términos de valor, la situación de las almejas del Golfo de México en comparación con la producción del litoral del Pacífico resulta muy desigual, mientras que el valor total de la pesquería se calculó para el 2018 en 752.5 millones de pesos, el Pacífico contribuyó con el 97.4% (733.1 millones de pesos) y el Golfo de México con el 2.6% (19.3 millones de pesos). Para cada litoral respectivamente la pesquería de almejas representa el 2.4% en el Pacífico y en el Golfo de México tan solo el 0.2%.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                      <TrendingUp className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-500 font-medium">Gráfica de Tendencia de Captura</p>
                      <p className="text-sm text-gray-400">Figura 1. Tendencia de la captura de almeja para a) Veracruz, b) Campeche, Tabasco y Tamaulipas (1987-2020). Fuente: Anuarios Estadísticos de Pesca.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Espacio para más indicadores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-green-800 text-sm">Captura Mensual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Gráfica de captura mensual</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-green-800 text-sm">Esfuerzo Pesquero</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                    <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Gráfica de esfuerzo pesquero</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-green-800 text-sm">Tendencia de Precios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                    <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Gráfica de tendencia de precios</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ambiente y Clima */}
          <TabsContent value="ambiente" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Efectos Ambientales y Cambio Climático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  El cambio climático está modificando la distribución de especies marinas y de agua dulce. Las especies están experimentando cambios en el tamaño y productividad de sus hábitats. Los parámetros ambientales ejercen una gran influencia sobre las almejas, los factores de variabilidad y cambio climático influyen en el desove y en la reproducción, el crecimiento, reclutamiento y la incorporación de los individuos en la población madura.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  La combinación de su explotación pesquera, así como la alteración del hábitat por la contaminación, fenómenos meteorológicos y/o la modificación del transporte litoral (por dragados de bocas barras y desestabilización), producen una variación de las condiciones ambientales estuarinas que pueden afectar las pesquerías hasta niveles críticos para su aprovechamiento e inclusive el agotamiento del recurso.
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
                            Control de manejo
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
                            Disposiciones
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
                          <div className="font-semibold text-gray-800">Norma Oficial Mexicana</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">-</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">-</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Plan de Manejo Pesquero</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">-</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">-</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Tipo de acceso</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Permiso para pesca comercial para Almeja.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Dictamen técnico del INAPESCA. Artículo 36, Fracción III de la LGPAS (DOF: 19/01/2023).</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Talla mínima</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">R. flexuosa 25 milímetros; R. cuneata y C. orbicularis 35 milímetros; M. campechiensis 47 milímetros; I. alatus 51 milímetros.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Dictamen técnico del INAPESCA.</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Arte de captura y método de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Buceo libre y cuchara de mango largo.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Dictamen técnico del INAPESCA.</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Veda</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">-</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">-</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Cuota</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">-</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">-</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Unidad de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Embarcación menor con o sin motor fuera de borda.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Dictamen técnico del INAPESCA.</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Esfuerzo nominal autorizado</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Veracruz: 9 embarcaciones.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de Administración Pesquera.</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">Zona de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sistemas lagunares, esteros y riparios del Golfo de México</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Permiso para pesca comercial.</p>
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
                    {/* Estado */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">Estado de la Pesquería</h3>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4">
                          <h4 className="font-bold text-yellow-800 mb-2">Tamaulipas</h4>
                          <p className="text-sm text-gray-700">Laguna Madre Norte y La Pesca: <span className="font-semibold">Aprovechamiento Máximo Sustentable</span></p>
                          <p className="text-sm text-gray-700 mt-1">Laguna Madre: <span className="font-semibold">Potencial de Desarrollo</span></p>
                          <p className="text-sm text-gray-700 mt-1">Estero el Tordo y Laguna San Andrés: <span className="font-semibold">Indeterminados</span></p>
                        </div>
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-lg p-4">
                          <h4 className="font-bold text-red-800 mb-2">Veracruz</h4>
                          <p className="text-sm text-gray-700">Laguna La Mancha, Laguna Mandinga, Sistema Lagunar de Alvarado Norte, Sistema Lagunar de Alvarado Sur y Laguna Mezcalapa: <span className="font-semibold">En deterioro</span></p>
                        </div>
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-lg p-4">
                          <h4 className="font-bold text-red-800 mb-2">Tabasco y Campeche</h4>
                          <p className="text-sm text-gray-700"><span className="font-semibold">Deteriorado</span></p>
                        </div>
                      </div>
                    </div>

                    {/* Estrategia */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-yellow-800 border-b-2 border-yellow-200 pb-2">Estrategia</h3>
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <p className="text-gray-800 font-medium">Tasa de aprovechamiento temporal variable, en función de las capturas históricas y el esfuerzo nominal.</p>
                      </div>
                    </div>

                    {/* Tácticas */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-yellow-800 border-b-2 border-yellow-200 pb-2">Tácticas</h3>
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <ul className="space-y-2 text-gray-800">
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Control del esfuerzo pesquero</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span>Talla mínima de captura</span>
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
                            Acción
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">No incrementar el número de permisos de pesca comercial.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Disminuir y distribuir del esfuerzo pesquero en las áreas de extracción ubicadas, así como mantener informados y capacitados a los permisionarios.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Desarrollar la investigación acuícola para todas las especies, debido a las modificaciones ambientales en los sistemas lagunares, promoviendo la repoblación con semillas de laboratorio.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Promover la clasificación y certificación sanitaria de las zonas de extracción de almejas.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Buscar continuamente con las autoridades estatales correspondientes, un manejo controlado del recurso, así como una vigilancia constante.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">No permitir el esfuerzo pesquero de ninguna de las especies especificadas en las fichas en las zonas núcleo de las Áreas Naturales Protegidas</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Señalar en los permisos de pesca comercial de almeja la prohibición de la captura de la almeja negra o prieta (Polymesoda caroliniana) y la almeja plana o callo de árbol (Isognomon alatus) por presentar un estatus de riesgo en la NOM-059-SEMARNAT-2010.</p>
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

