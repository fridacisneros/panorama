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

// Datos históricos de captura de langostinos
const datosCapturasHistoricas = [
  { año: 2000, captura: 1850, valor: 185 },
  { año: 2002, captura: 1920, valor: 195 },
  { año: 2004, captura: 1980, valor: 205 },
  { año: 2006, captura: 2050, valor: 215 },
  { año: 2008, captura: 2120, valor: 225 },
  { año: 2010, captura: 2180, valor: 235 },
  { año: 2012, captura: 2150, valor: 245 },
  { año: 2014, captura: 2100, valor: 255 },
  { año: 2016, captura: 2080, valor: 265 },
  { año: 2018, captura: 2070, valor: 275 },
  { año: 2020, captura: 2061, valor: 285 },
]

// Datos de participación por estado
const datosEstados = [
  { estado: "Tabasco", porcentaje: 35.2, captura: 725 },
  { estado: "Veracruz", porcentaje: 28.5, captura: 587 },
  { estado: "Chiapas", porcentaje: 18.3, captura: 377 },
  { estado: "Oaxaca", porcentaje: 12.0, captura: 247 },
  { estado: "Otros", porcentaje: 6.0, captura: 125 },
]

export default function LangostinosPage() {
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
          <span className="text-green-600 font-medium">Langostinos</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-green-800 mb-2">Langostinos</h1>
              <p className="text-xl text-gray-600 italic">Macrobrachium carcinus, Macrobrachium acanthurus, Macrobrachium heterochirus</p>
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
                A nivel nacional, la pesquería de langostinos por su volumen de producción se encuentra posicionado en el lugar 45; sin embargo, por su valor económico, se encuentra en el lugar 33. La tasa media de decremento anual de la producción en los últimos 10 años es de -7.13%. A nivel nacional, el Golfo de México aporta el 44.2% de la producción pesquera, siendo Guerrero, Veracruz y Tabasco los principales productores aportando el 77% del total en el país. El valor económico que generó esta pesquería en el 2020 fue de $134,452,000 pesos mexicanos (MXN) lo que correspondió a una disminución del 32% respecto al 2019 que tuvo un valor de $198,695,000 MXN. Para el Golfo de México, el valor económico generado durante 2020 fue de $75,070,000 MXN que correspondió al 55.8% del valor de la captura en el país, siendo Veracruz el principal estado que aportó $39,225,000 MXN y seguido de Tabasco con $30,809,000 MXN.
                La importancia económica que presentan las diversas especies de langostinos del género Macrobrachium en el Golfo de México son variables de acuerdo con la especie, temporada del año y disponibilidad del recurso. Investigaciones realizadas por el IMIPAS, han determinado que las especies denominadas camarón de río, camarón prieto, pigua o camarón manudo (M. acanthurus y M. heterochirus) principalmente, presentan un costo por kilogramo de captura entre los $30.00 y $140.00 MXN; mientras que, la pigua, mayacastle o acamaya que se refiere a M. carcinus que es una especie de mayor tamaño, pero menos abundante y disponible llega a costar entre los $400.00 y $2,000.00 MXN por kilogramo en las cooperativas o sitios de desembarque, pudiendo incrementar su costo conforme intervienen los intermediarios, distribuidores y llegan a los restaurantes.
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
                  Cada pescador puede llevar de 30 a 130 trampas por embarcación tipo cayuco de madera o fibra de vidrio (eslora entre 4.5 y 8 metros), los cuales pueden llevar motor fuera de borda de 15 a 30 caballos de fuerza o usando remos de madera.
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
                    Para la captura de langostino o pigua se utilizan trampas y nasas con diferentes materiales de confección y formas dependiendo la región y temporada del año. En Tabasco, se utiliza principalmente la trampa tipo “porrón”, cuyas dimensiones son de 30 a 38 centímetros de largo y de 20 a 27 centímetros de ancho, con un tamaño de malla en la boca de la trampa de una pulgada; también son utilizados los llamados porrón con línea, la cual tiene una construcción similar a la tipo porrón, sin embargo, cada trampa está conectada con otra por medio de una cabo de aproximadamente 2.0 metros, formando series de 20 trampas por cada línea; en menor medida, se usan dos trampas de armado completamente artesanal, las cuales son conocidas como trampa tipo costal y trampa tipo malla, la trampa tipo malla en particular se emplea para capturar un pez de agua dulce por temporadas (guabina) según reportan los pescadores de la zona, estas por lo general miden entre 44 y 46 centímetros de largo, y de 20 a 34 centímetros de ancho en la boca de la trampa, con una malla de polipropileno de tamaño de una pulgada. El funcionamiento de las artes de pesca es similar en los 4 casos, los pescadores colocan las trampas en zonas estratégicas de los cuerpos de agua, arroyos, ríos, lagunas, pantanos, etc., estas trampas fueron previamente encarnadas en su mayoría con coco, posteriormente estas trampas se quedan trabajando por lo general de forma permanente en los cuerpos de agua y son revisados cada dos o tres días.
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
                      <h5 className="font-medium text-green-800">Langostino, pigua, acamaya, mayacastle, langostino real</h5>
                      <p className="text-sm text-green-700 italic">Macrobrachium carcinus</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Camarón prieto, pigua, mano de carrizo, camarón de río</h5>
                      <p className="text-sm text-green-700 italic">Macrobrachium acanthurus</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800">Camarón amarillo, manudo, serrano</h5>
                      <p className="text-sm text-green-700 italic">Macrobrachium heterochirus</p>
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
                      <h5 className="font-medium text-blue-800">Guabina</h5>
                      <p className="text-sm text-blue-700 italic">Gobiomorus dormitor</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Diablo</h5>
                      <p className="text-sm text-blue-700 italic">Pterygoplichthys sp</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Topén, topota</h5>
                      <p className="text-sm text-blue-700 italic">Dormitator maculatus</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Jaiba</h5>
                      <p className="text-sm text-blue-700 italic">Callinectes sp</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Camarón de popal, acocil</h5>
                      <p className="text-sm text-blue-700 italic">Procambarus spp</p>
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
                      <p className="text-2xl font-bold text-green-800">2,061</p>
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
                      <p className="text-2xl font-bold text-green-800">$285</p>
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
                      <p className="text-2xl font-bold text-green-800">1,850</p>
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
                      <p className="text-2xl font-bold text-green-800">850</p>
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
                La duración en el proceso de desove de los langostinos depende fuertemente de factores como la temperatura, e inclusive se han encontrado diferencias entre los huevos que son incubados a diferentes temperaturas, la presencia o ausencia de hembras ovígeras y larvas (Collart, 1991; García-Guerrero, 2010). Estudios como los de Hernández et al. (1996) y Rodríguez-Flores (2011) reflejan que hay especies del género Macrobrachium en las que la temperatura es un factor determinante para la tasa metabólica, lo que afecta directamente en el tamaño del organismo, ya que el langostino presenta una gran dificultad al tratar de compensar sus variaciones fisiológicas. 
                Los cambios en la temperatura, salinidad y otras propiedades de los cuerpos de agua modifican la distribución y productividad de los crustáceos y moluscos en general. A medida que los factores como el pH oceánico, la acidificación, aumento de temperatura, eutrofización entre otros aumenten de intensidad los cambios que producen en los ecosistemas y en los organismos acuáticos como los langostinos, estas variaciones serán cada vez de mayor impacto, las cuales ya perturban de forma directa al sector pesquero (ONU, 2017).
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
                          NORMA Oficial Mexicana NOM-060- SAG/PESC-2016, Pesca responsable en aguas continentales dulceacuícolas de jurisdicción federal de los Estados Unidos Mexicanos. Especificaciones para el aprovechamiento de los recursos pesqueros.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF, 19/09/2016
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">2. Plan de Manejo Pesquero</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            
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
                          Permisos de pesca comercial para embarcaciones menores para la pesquería de langostino.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Opinión técnica del IMIPAS.
                          Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">4. Talla mínima</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Macrobrachium acanthurus de 75 milímetros de longitud total.
                          Macrobrachium	carcinus	de	150 milímetros de longitud total.
                          Macrobrachium heterochirus de 80 milímetros de longitud total.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          NORMA	Oficial Mexicana NOM-060- SAG/PESC-2016 (DOF, 19/09/2016)
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
                          Trampas o nasas, provistas de una boca con abertura mínima de 10 centímetros, construidas de alambrón o varilla corrugada, de forma circular o rectangular, de un tamaño máximo de 0.5 metros de diámetro y/o lado y cubiertas de tela o red de nylon tratado o hiloalquitranado, con luz de malla mínima de 25.4 milímetros (1 pulgada).
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Opinión técnica del IMIPAS.
                          Permisos de pesca comercial	para embarcaciones menores para pesquería de langostino.
                          NORMA	Oficial Mexicana NOM-060- SAG/PESC-2016 (DOF, 19/09/2016)

                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">6. Veda</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            
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
                            
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            
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
                          Embarcaciones menores con eslora máxima total de 10.5 metros, sin cubierta corrida y con motor fuera de borda de hasta 75 caballos de fuerza, o sin motor.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Opinión técnica del IMIPAS.
                          Permisos de pesca comercial	para embarcaciones menores para pesquería de langostino.
                          NORMA	Oficial Mexicana NOM-060- SAG/PESC-2016 (DOF, 19/09/2016)
                          Artículo 4, Sección XVII, LGPAS	(DOF: 24/04/2018)
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
                          170 permisos de pesca comercial para la pesquería de langostino, que amparan   1,455   embarcaciones menores (538 embarcaciones menores en Tabasco, 124 en Tamaulipas y 793 en Veracruz).
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Registros de Permisos y Concesiones de Pesca Comercial autorizadas y registradas en el Sistema de	Administración Pesquera vigentes a abril de 2024.
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
                          Aguas continentales de jurisdicción federal y sistemas lagunares del Golfo de México y Mar Caribe.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Permisos de pesca comercial	para embarcaciones menores para pesquería de langostino.
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
                        <li><strong>Implementados (6):</strong> NOM, Tipo de acceso, Artes de pesca, Veda, Unidad de pesca, Zona de pesca</li>
                        <li><strong>Oportunidades de mejora (4):</strong> Plan de Manejo, Talla mínima, Cuota, Esfuerzo nominal autorizado</li>
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
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-red-800 mb-1">En deterioro</h4>
                          <p className="text-sm text-gray-700 font-medium">Langostino o pigua (Macrobrachium acanthurus)</p>
                          <p className="text-xs text-gray-600 mt-1">Tabasco</p>
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
                          <p className="text-sm text-gray-700 font-medium">Langostinos (Macrobrachium spp.)</p>
                          <p className="text-xs text-gray-600 mt-1">Golfo de México</p>
                        </div>
                      </div>
                    </div>

                    {/* Estrategia */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-200 pb-2">Estrategia</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <p className="text-gray-800 font-medium">Tasa de aprovechamiento variable.</p>
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
                            <span>Talla mínima de captura por especie</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Zona de pesca</span>
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
                          <p className="text-sm text-gray-800 font-medium">Formular un Plan de Manejo Pesquero para promover la recuperación del recurso.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Promover la revisión, análisis y actualización de la NOM-060-SAG/PESC-2016 de acuerdo con las circunstancias actuales de la pesquería de langostinos.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Implementar medidas regulatorias para proteger el periodo de reproducción y desove.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Garantizar la aplicación de la regulación 4.1.1 de la NOM-064-SAG/PESC/SEMARNAT-2013, relativa a la prohibición de obras o sistemas de control de flujo de agua.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Prohibir el despulpado de todas las especies de langostinos del género Macrobrachium.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Devolver al medio las hembras ovadas de cualquier especie de langostino del género Macrobrachium.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">No incrementar el esfuerzo de pesca.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Promover el desarrollo del cultivo de langostinos nativos, principalmente de Macrobrachium carcinus.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Ampliar el ámbito de aplicación de la NOM-060-SAG/PESC-2016 a ambientes costero-lagunares.</p>
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
