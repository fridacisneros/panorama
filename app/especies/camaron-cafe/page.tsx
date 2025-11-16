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

// Datos históricos de captura de camarón café
const datosCapturasHistoricas = [
  { año: 2000, captura: 15200, valor: 890 },
  { año: 2002, captura: 14800, valor: 920 },
  { año: 2004, captura: 13900, valor: 950 },
  { año: 2006, captura: 13200, valor: 980 },
  { año: 2008, captura: 12800, valor: 1020 },
  { año: 2010, captura: 12200, valor: 1080 },
  { año: 2012, captura: 11800, valor: 1150 },
  { año: 2014, captura: 11400, valor: 1200 },
  { año: 2016, captura: 11100, valor: 1280 },
  { año: 2018, captura: 10900, valor: 1350 },
  { año: 2020, captura: 11071, valor: 1420 },
]

// Datos de participación por estado
const datosEstados = [
  { estado: "Tamaulipas", porcentaje: 45.2, captura: 5004 },
  { estado: "Veracruz", porcentaje: 28.1, captura: 3111 },
  { estado: "Tabasco", porcentaje: 15.7, captura: 1738 },
  { estado: "Campeche", porcentaje: 11.0, captura: 1218 },
]

export default function CamaronCafePage() {
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
          <span className="text-green-600 font-medium">Camarón Café</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-green-800 mb-2">Camarón Café</h1>
              <p className="text-xl text-gray-600 italic">Penaeus aztecus</p>
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
                La pesquería de camarón en el noreste de México es la más importante desde el punto de vista social y económico. Esta pesquería es de carácter secuencial, es decir, que el aprovechamiento de esta especie de camarón se realiza en las lagunas costeras, así como en la zona marina o altamar. La especie predominante en las capturas es el camarón café, Penaeus aztecus. Esta especie soporta la pesquería en el noroeste del Golfo de México, principalmente en los estados de Tamaulipas y Veracruz. Ambos estados participan con un 83% respecto a la producción total del Golfo de México, de los cuales Tamaulipas aporta el 71% y Veracruz el 12%.
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
                  Se utilizan embarcaciones tipo florida con capacidad superior a las 10 toneladas de arqueo neto, con cuatro equipos de dos redes de arrastre por banda provistas con dispositivos excluidores de tortugas marinas. La eslora de las embarcaciones fluctúa entre los 19 y 26 metros. La potencia del motor varía entre los 272 y 1,150 caballos de fuerza (HP). La tripulación puede ser hasta de seis pescadores que incluyen: capitán, motorista, winchero, cocinero, pacotillero y marinero.
                  Todos los barcos están dotados con equipo electrónico de navegación y eco detección del fondo, además poseen radios SSB (por sus siglas en ingles de Single Side Band), radios de alta frecuencia o VHF (por sus siglas en ingles de Very High Frecuency), compás magnético, compás magnético y Sistema de Localización Satelital, este último es obligatorio para todas las embarcaciones mayores, especificado en la NOM-062-SAG/PESC-2014.
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
                  Las características del sistema de captura empleado consisten en redes gemelas de uno de los diseños siguientes: plana, portuguesa, hawaiana y semibalón. El tamaño de la red lo determina la potencia del buque, fluctuando generalmente entre 45 y 70 pies de longitud de relinga superior. De igual manera, las puertas de arrastre tienen tamaños desde 6’ x 32” hasta 8´x 42”. Asimismo, obligatoriamente deben traer el excluidor de tortugas marinas de diseño rígido establecido en la NOM-002-SAG/PESC-2016 y sus modificaciones, así como en la NOM-061-SAG-PESC/SEMARNAT-2016. El sistema presenta una buena eficiencia relativa de captura y baja selectividad, y se caracteriza por capturar ejemplares en un amplio intervalo de tallas. 
                  Para la pesca en sistemas lagunares y estuarinos se utiliza, la "charanga" la cual es un sistema de pesca del tipo de las trampas. Se instala en zonas someras de lagunas costeras o canales de estuarios por donde circulan corrientes de agua generadas principalmente por los cambios de marea. Cada charanga está constituida por dos barreras o aleros (estacadas o encañizadas de material vegetal o de paño de red), dispuestas en forma de "V" sin vértice, que inducen el recurso objeto de pesca hacia un matadero en donde se localiza el "yagual". El "yagual" es desmontable en función de los periodos y temporadas de pesca, lo que le confiere al sistema la posibilidad de permanecer "inactivo" durante el periodo en que no está instalado.
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
                      <h5 className="font-medium text-green-800">Camarón Café</h5>
                      <p className="text-sm text-green-700 italic">Penaeus aztecus</p>
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
                      <h5 className="font-medium text-blue-800">Camarón blanco</h5>
                      <p className="text-sm text-blue-700 italic">Penaeus setiferus</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Camarón rosado</h5>
                      <p className="text-sm text-blue-700 italic">Penaeus duorarum</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Camarón roca</h5>
                      <p className="text-sm text-blue-700 italic">Sicyonia brevirostris</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Camarón siete barbas</h5>
                      <p className="text-sm text-blue-700 italic">Xiphopenaeus kroyeri</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Chile</h5>
                      <p className="text-sm text-blue-700 italic">Synodus foetens</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Chile</h5>
                      <p className="text-sm text-blue-700 italic">Synodus intermedius</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Huachinango</h5>
                      <p className="text-sm text-blue-700 italic">Lutjanus campechanus</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Lenguado</h5>
                      <p className="text-sm text-blue-700 italic">Cyclopseta chittendeni</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Paloma</h5>
                      <p className="text-sm text-blue-700 italic">Prionotus punctatus</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Calamar</h5>
                      <p className="text-sm text-blue-700 italic">Loligo pealeii</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Jaiba café</h5>
                      <p className="text-sm text-blue-700 italic">Portunus gibbesii</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Cangrejo</h5>
                      <p className="text-sm text-blue-700 italic">Calappa sulcata</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Tiburón angelito</h5>
                      <p className="text-sm text-blue-700 italic">Squatina mexicana</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800">Gurrubata</h5>
                      <p className="text-sm text-blue-700 italic">Micropogonias undulatus</p>
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
                      <p className="text-2xl font-bold text-green-800">11,071</p>
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
                      <p className="text-2xl font-bold text-green-800">$1,420</p>
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
                      <p className="text-2xl font-bold text-green-800">8,500</p>
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
                      <p className="text-2xl font-bold text-green-800">2,400</p>
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
                Los escenarios mensuales proporcionados por el Instituto Nacional de Ecología y Cambio Climático (INECC) de la Secretaría de Medio Ambiente y Recursos Naturales (SEMARNAT) para dos períodos de tiempo: Futuro cercano (2015-2039) y futuro lejano (2075-2099), menciona que para Tamaulipas la lluvia disminuirá en el futuro cercano (2015-2039) de 70 a 90 milímetros por año y en el futuro lejano (2075-2099) disminuirá de 100 a 170 milímetros por año, en la actualidad caen 711 mm de lluvia por año. Las regiones del norte del estado, donde se registran las menores precipitaciones anuales (400-600 milímetros) se verán severamente afectadas con disminuciones máximas del 15% y 28% respectivamente para cada escenario. Esta condición podría repercutir en menor sobrevivencia y crecimiento de las poblaciones de camarón teniendo como resultado menores capturas.
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
                          NORMA	Oficial	Mexicana	NOM-002-SAG/PESC-2013,	Para	ordenar	el aprovechamiento  de  las  especies  de camarón en aguas de jurisdicción federal de los Estados Unidos Mexicanos.
                          
                          NORMA	Oficial	Mexicana	NOM-062-SAG/PESC-2014, Para la utilización del Sistema  de  Localización  y  Monitoreo Satelital de Embarcaciones Pesqueras.
                          
                          NORMA Oficial Mexicana NOM-061-SAG-PESC/SEMARNAT-2016, Especificaciones técnicas de los excluidores de tortugas marinas utilizados por la flota de arrastre camaronera  en  aguas  de  jurisdicción federal de los Estados Unidos Mexicanos.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 11/07/2013
                          
                          DOF: 03/07/2015
                          
                          DOF: 13/12/2016
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
                          Acuerdo por el que se da a conocer el Plan de Manejo Pesquero de Camarón Café (Farfantepenaeus aztecus) y Camarón Blanco (Litopenaeus setiferus) en las costas de Tamaulipas y Veracruz.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 12/03/2014
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
                          Permiso comercial o concesión de pesca para camarón.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Dictamen técnico del IMIPAS
                          
                          Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">4. Talla mínima</div>
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
                      <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">5. Arte de pesca y método de captura</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          En altamar, una embarcación mayor con capacidad superior a las 10 toneladas de arqueo neto, con cuatro redes de arrastre provistas con excluidores de tortugas marinas; hasta con seis pescadores. En el Golfo de México y Mar Caribe, la luz de malla en las secciones de la red conocidas como alas, cielo o "square", cuerpo y ante bolso  no  podrá  ser  menor  a  44.45 milímetros (1 ¾ pulgadas) y en el bolso de 38.1 milímetros (1 ½ pulgadas).
                          
                          En lagunas una charanga operada por un pescador. Las características están definidas en el Aviso DOF 21/11/97, y están  autorizadas  para  los  sistemas lagunarios estuarinos de Tamaulipas y norte de Veracruz. 
                          
                          La "charanga" es un sistema de pesca del tipo de las trampas. Se instala en zonas someras de lagunas costeras, o canales de estuarios por donde circulan corrientes de agua generadas principalmente por los cambios de marea. Cada charanga está constituida por dos barreras o aleros (estacadas o encañizadas de material vegetal o de paño de red), dispuestas en forma de "V" sin vértice, que inducen el recurso objeto de pesca hacia un matadero en donde se localiza el "yagual". El "yagual" es desmontable en función de los periodos y temporadas de pesca, lo que le confiere al sistema la posibilidad de permanecer "inactivo" durante el periodo en que no está instalado.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numerales	4.3.1., 4.3.2.2. y 4.3.2.3 de la NOM-002- SAG/PESC- 2013 (DOF, 11/07/2013).
                          
                          NOM-061-SAG- PESC/SEMARNAT-2016 (DOF, 13/12/2016).

                          DOF: 21/11/1997
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
                          Veda temporal variable que se emite anualmente o por temporada para proteger los principales eventos biológicos (reproducción y reclutamiento).
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          NOM-009-SAG/PESC- 2015
                          
                          Numeral 4.4, NOM-002- SAG/PESC-2013.
                          
                          Dictamen	técnico	del IMIPAS.
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
                          Embarcación mayor: Una embarcación con capacidad superior a las 10 toneladas de arqueo neto, con cuatro redes de arrastre provistas con excluidores de tortugas marinas.

                          Sistema	de	localización	satelital	y monitoreo de embarcaciones pesqueras.
                          
                          Tamaulipas y norte de Veracruz: extracción manual con el uso de Charangas
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numerales 4.2.1., 4.3.1., 4.3.2.2. y 4.3.2.3. NOM-002-SAG/PESC- 2013 (DOF, 11/07/2013).
                          
                          Carta Nacional Pesquera (CNP)	(DOF,25/08/2006).	Ficha: Arrastre de Camarón en el Golfo de México y Caribe, en el apartado Sistemas de captura.
                          
                          NOM-062-SAG/PESC- 2014 (DOF, 03/07/2015).
                          
                          DOF: 21/11/1997: AVISO por el que se da a conocer la autorización para utilizar charangas como equipos de pesca para la captura de camarón en los sistemas lagunarios estuarinos de Tamaulipas y del norte de Veracruz
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
                          No	existen	permisos	o	concesiones específicos	de	pesca	comercial	de camarón café.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            
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
                          Queda prohibida la pesca con redes de arrastre independientemente de la especie que se pretenda capturar, dentro de la franja marina comprendida entre 0 y 9.14 metros de profundidad (0 y 5 brazas de profundidad).
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                           DOF: 11/07/2013
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
                      {/* Aprovechados al máximo sustentable */}
                      <div className="bg-gradient-to-r from-yellow-50 to-yellow-50 border-2 border-yellow-300 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-yellow-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-yellow-800 mb-1">Aprovechado al máximo sustentable</h4>
                          <p className="text-sm text-gray-700 font-medium">Camarón café</p>
                          <p className="text-xs text-gray-600 mt-1">Golfo de México y Mar Caribe</p>
                        </div>
                      </div>
                    </div>

                    {/* Estrategia */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-200 pb-2">Estrategia</h3>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <p className="text-gray-800 font-medium">Tasa de aprovechamiento variable que no exceda el rendimiento máximo sostenible.</p>
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
                            <span>Veda espacial y temporal variable</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span>Regulación en el arte y método de captura</span>
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
                      <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">
                            Reforzar la vigilancia para controlar de manera efectiva el uso de artes de pesca no permitidos.
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
                            Cumplir los lineamientos de manejo que se encuentran señalados en el Plan de manejo pesquero de este recurso.
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
