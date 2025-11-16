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

// Datos históricos de captura de mero y negrillo
const datosCapturasHistoricas = [
  { año: 2000, captura: 3200, valor: 3200 },
  { año: 2002, captura: 2800, valor: 2800 },
  { año: 2004, captura: 2400, valor: 2400 },
  { año: 2006, captura: 2100, valor: 2100 },
  { año: 2008, captura: 1950, valor: 1950 },
  { año: 2010, captura: 1900, valor: 1900 },
  { año: 2012, captura: 1880, valor: 2750 },
  { año: 2014, captura: 1860, valor: 2800 },
  { año: 2016, captura: 1840, valor: 2850 },
  { año: 2018, captura: 1850, valor: 2880 },
  { año: 2020, captura: 1850, valor: 2890 },
]

// Datos de participación por estado
const datosEstados = [
  { estado: "Yucatán", porcentaje: 45.2, captura: 836 },
  { estado: "Campeche", porcentaje: 35.8, captura: 662 },
  { estado: "Quintana Roo", porcentaje: 19.0, captura: 352 },
]

export default function MeroNegrilloPage() {
  const [activeTab, setActiveTab] = useState("generalidades")

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/especies" className="hover:text-red-600 transition-colors">
            Especies
          </Link>
          <span>/</span>
          <span className="text-red-600 font-medium">Mero y Negrillo</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-red-800 mb-2">Mero y Negrillo</h1>
              <p className="text-xl text-gray-600 italic">Epinephelus morio, Mycteroperca bonaci</p>
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
            <Card className="bg-white/90 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Fish className="w-5 h-5 mr-2" />
                  Descripción General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                La pesquería de mero de la Plataforma de la Península de Yucatán o Banco de Campeche, ha sido una actividad de gran importancia social, económica y cultural para las comunidades de la zona costera de Yucatán. Esta pesquería durante las décadas de 1970 y 1980, estimuló el desarrollo costero del estado de Yucatán con infraestructura portuaria, crecimiento de las flotas (artesanal y mediana altura), con la creación de las primeras plantas de procesamiento en Progreso-Yucalpetén, y con la industria ya en desarrolló se iniciaron las exportaciones principalmente a los Estados Unidos. Así mismo se ha contribuido al bienestar de 12 mil pescadores y sus familias. Esta pesquería, por muchos años estuvo conformada principalmente por el mero rojo Epinephelus morio (Valenciennes, 1828), que registró su máxima producción a principios de la década de 1970 (19,000 toneladas por año-1). Posteriormente, en la década de 1980 la captura total de mero rojo descendió a 12,000 ± 1,300 toneladas (t) anuales. Sin embargo, estos niveles de producción no se lograron mantener en el tiempo. Actualmente, el stock de mero rojo del Banco de Campeche está clasificado como sobre-explotado y se encuentra catalogado como una especie vulnerable en la lista roja de la Unión Internacional para la Conservación de la Naturaleza (UICN).
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
              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Ship className="w-5 h-5 mr-2" />
                    Tipos de Embarcaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                  En la pesquería de mero del Banco de Campeche participan dos flotas comerciales mexicanas flota menor (artesanal) y mayor (mediana altura), con diferente poder de pesca y que operan de forma secuencial capturando diferentes componentes de la población de mero. Otra flota que ejercen presión de pesca sobre este recurso, son las embarcaciones deportivo-recreativa y hasta el año 2021 tenía permiso de pesca para la captura de meros embarcaciones cubanas de mediana altura. Actualmente, la captura de ambas flotas es multi-específica y las dos principales especies objetivo son el mero rojo (E. morio) y negrillo Mycteroperca bonaci. La composición y proporción de especies asociadas a la captura depende del tipo flota, zona y arte de pesca. 
                  La flota artesanal utiliza embarcaciones menores con eslora de 6.5 a 7.5 metros (22 a 26 pies), con motor fuera de borda no mayor a 63.4 kilowatts (85 caballos de fuerza), o con motor estacionario con una potencia nominal no mayor a los 22.4 kilowatts (30 caballos de fuerza), con o sin alijos (embarcaciones de madera de 3 metros de eslora, sin motor Esta flota se caracteriza por su poca autonomía y por lo general realizan viajes de ida y regreso el mismo día, con dos a tres pescadores por viaje (embarcación). La flota opera en aguas someras a lo largo del litoral yucateco desde el suroeste de Celestún y siguiendo el contorno de la isobata de las 22.2 brazas o 40.3 metros, hasta llegar al extremo este de Contoy.
                  La flota de mediana altura emplea embarcaciones con o sin alijos (embarcaciones pequeñas de 3 metros de eslora, de madera y sin motor), los tamaños de estas embarcaciones tienen una eslora que puede variar entre 10 y 23 metros de longitud, 82% se encuentran entre 13 y 19 metros; la potencia del motor es muy variada pero el 77% de la flota tiene motores entre 150 y 250 caballos de fuerza.
                  </p>
                  <div className="aspect-video bg-gradient-to-br from-red-100 to-orange-100 rounded-lg flex items-center justify-center border-2 border-dashed border-red-300">
                    <div className="text-center">
                      <Ship className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-red-600 font-medium">Tipos de Embarcaciones</p>
                      <p className="text-xs text-red-500">Sube imagen de embarcaciones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Anchor className="w-5 h-5 mr-2" />
                    Artes de Pesca
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                  Para la flota artesanal, las artes de pesca permitidas en la NOM-065-SAG/PESC-2014, son el palangre no mayor de 750 metros de línea madre y 250 anzuelos curvo tipo huachinanguero del número 10/0 a 12/0 o una línea de mano por pescador con anzuelos de las mismas características.
                  Para la flota de mediana altura, las artes de pesca permitidas en la NOM-065-SAG/PESC-2014, son: no más de cuatro palangres, con un máximo 500 anzuelos cada uno o un palangre con un máximo de 2,000 anzuelos tipo circulares (garra de águila) del número 14/0 o 15/0 o de mayor tamaño.
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
              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Especies Objetivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-800">Mero Rojo, cherna americana</h5>
                      <p className="text-sm text-red-700 italic">Epinephelus morio</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-800">Negrillo,bonaci arara</h5>
                      <p className="text-sm text-red-700 italic">Mycteroperca bonaci</p>
                    </div>

                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Fish className="w-5 h-5 mr-2" />
                    Especies Asociadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto rounded-lg border border-red-200">
                    <table className="w-full text-sm bg-white">
                      <thead>
                        <tr className="bg-gradient-to-r from-red-100 to-orange-100">
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Nombre común</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">Nombre científico</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700 border-b">
                            <div className="flex items-center justify-center space-x-2">
                              <Ship className="w-5 h-5 text-red-600" />
                              <span>Flota mediana altura</span>
                            </div>
                          </th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700 border-b">
                            <div className="flex items-center justify-center space-x-2">
                              <Anchor className="w-5 h-5 text-orange-600" />
                              <span>Flota artesanal</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Abadejo</td>
                          <td className="px-4 py-3 italic text-gray-700">Mycteroperca microlepis</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Gallina</td>
                          <td className="px-4 py-3 italic text-gray-700">Mycteroperca phenax</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Gallineta, Cabrilla</td>
                          <td className="px-4 py-3 italic text-gray-700">Mycteroperca interstitialis</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Guacamayo</td>
                          <td className="px-4 py-3 italic text-gray-700">Mycteroperca venenosa</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Payaso verde</td>
                          <td className="px-4 py-3 italic text-gray-700">Epinephelus adscensionis</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Payaso rojo, cabrilla</td>
                          <td className="px-4 py-3 italic text-gray-700">Epinephelus guttatus</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Lenteja</td>
                          <td className="px-4 py-3 italic text-gray-700">Epinephelus drummondhayi</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Mero blanco, extraviado</td>
                          <td className="px-4 py-3 italic text-gray-700">Hyporthodus flavolimbatus</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Plateado</td>
                          <td className="px-4 py-3 italic text-gray-700">Hyporthodus niveatus</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Cherna</td>
                          <td className="px-4 py-3 italic text-gray-700">Epinephelus itajara</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Huachinango de castilla</td>
                          <td className="px-4 py-3 italic text-gray-700">Lutjanus campechanus</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Huachinango aleta negra</td>
                          <td className="px-4 py-3 italic text-gray-700">Lutjanus buccanella</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Huachinango ojo amarillo</td>
                          <td className="px-4 py-3 italic text-gray-700">Lutjanus vivanus</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Huachinango seda</td>
                          <td className="px-4 py-3 italic text-gray-700">Etelis oculatus</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Besugo, Caribbean</td>
                          <td className="px-4 py-3 italic text-gray-700">Rhomboplites aurorubens</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Pargo criollo</td>
                          <td className="px-4 py-3 italic text-gray-700">Lutjanus analis</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Pargo mulato</td>
                          <td className="px-4 py-3 italic text-gray-700">Lutjanus griseus</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Pargo perro</td>
                          <td className="px-4 py-3 italic text-gray-700">Lutjanus jocu</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Rubia</td>
                          <td className="px-4 py-3 italic text-gray-700">Lutjanus synagris</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Canané</td>
                          <td className="px-4 py-3 italic text-gray-700">Ocyurus chrysurus</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Corvinato</td>
                          <td className="px-4 py-3 italic text-gray-700">Lopholatilus chamaeleonticeps</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Coronado</td>
                          <td className="px-4 py-3 italic text-gray-700">Seriola zonata</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Mojaras</td>
                          <td className="px-4 py-3 italic text-gray-700">Calamus spp.</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Esmedregal, cobia</td>
                          <td className="px-4 py-3 italic text-gray-700">Rachycentron canadum</td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Esmedregal coronado</td>
                          <td className="px-4 py-3 italic text-gray-700">Seriola dumerili</td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                          <td className="px-4 py-3 text-center"><Anchor className="w-5 h-5 inline text-orange-600" /></td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Esmedregal limón</td>
                          <td className="px-4 py-3 italic text-gray-700">Seriola rivoliana</td>
                          <td className="px-4 py-3 text-center"><Ship className="w-5 h-5 inline text-red-600" /></td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Picuda</td>
                          <td className="px-4 py-3 italic text-gray-700">Sphyraena barracuda</td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Chac-chi</td>
                          <td className="px-4 py-3 italic text-gray-700">Haemulon plumierii</td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                        <tr className="hover:bg-red-50/40">
                          <td className="px-4 py-3">Boquinete</td>
                          <td className="px-4 py-3 italic text-gray-700">Lachnolaimus maximus</td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                          <td className="px-4 py-3 text-center text-gray-300">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Indicadores */}
          <TabsContent value="indicadores" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Captura Anual</p>
                      <p className="text-2xl font-bold text-red-800">1,850</p>
                      <p className="text-xs text-gray-500">toneladas</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Valor Producción</p>
                      <p className="text-2xl font-bold text-red-800">$2,890</p>
                      <p className="text-xs text-gray-500">millones MXN</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Empleos Directos</p>
                      <p className="text-2xl font-bold text-red-800">3,200</p>
                      <p className="text-xs text-gray-500">pescadores</p>
                    </div>
                    <Users className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Embarcaciones</p>
                      <p className="text-2xl font-bold text-red-800">1,245</p>
                      <p className="text-xs text-gray-500">activas</p>
                    </div>
                    <Anchor className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Captura Histórica</CardTitle>
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
                      <Line type="monotone" dataKey="captura" stroke="#EF4444" strokeWidth={2} name="Captura" />
                      <Line type="monotone" dataKey="valor" stroke="#DC2626" strokeWidth={2} name="Valor (millones)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Esfuerzo Pesquero</CardTitle>
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

            <Card className="bg-white/90 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Participación por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {datosEstados.map((item) => (
                    <div key={item.estado} className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.estado}</span>
                        <span className="text-sm font-bold text-red-600">{item.porcentaje}%</span>
                    </div>
                      <Progress value={item.porcentaje} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Valor Económico</CardTitle>
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
                      <Line type="monotone" dataKey="valor" stroke="#DC2626" strokeWidth={3} name="Valor Económico" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ambiente y Clima */}
          <TabsContent value="ambiente" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Efectos Ambientales y del Cambio Climático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                La sobreexplotación pesquera, identificada como la principal amenaza para el mero rojo, se entrelaza con fenómenos ambientales que inciden en su ciclo de vida y poblaciones. Uno de los aspectos más notables es la influencia directa de las variaciones en la temperatura del agua. El mero rojo, siendo una especie tropical, se desarrolla en un entorno termal relativamente estable. Sin embargo, el aumento de las temperaturas, atribuido al cambio climático, está alterando este equilibrio. Se ha reportado que las altas temperaturas pueden inhibir la madurez reproductiva, lo que afecta la capacidad de la especie para mantener sus poblaciones. Otros autores han señalado que cambios ambientales (anomalías térmicas), tales como la temperatura superficial del mar (TSM), el índice del Caribe (CAR) y la Oscilación Multidecadal del Atlántico (AMO), han afectado el éxito del reclutamiento en el Banco de Campeche. Otros eventos climatológicos extremos, como huracanes, tienen un impacto significativo en el hábitat del mero rojo. Estos fenómenos pueden modificar los fondos marinos y los arrecifes de coral, áreas esenciales para la alimentación y reproducción de esta especie. Otro factor a considerar es la incidencia de mareas rojas, estos eventos, cada vez más frecuentes y severos, tienen un impacto negativo en la salud de los ecosistemas marinos. La marea roja puede provocar la mortalidad masiva de peces y otros organismos marinos, desencadenando desequilibrios en la cadena alimentaria y alteraciones en la comunidad bentónica.
                Otro efecto del cambio climático que opera a diferentes niveles y escalas de organización es sobre la ingeniería del hábitat en la zona costera con un incremento en la elevación del mar superando a las especies biogénicas, que proveen hábitats críticos a numerosas especies, incluyendo especies claves del ecosistema, como, por ejemplo: E. morio y E. itajara. Aunque, algunas especies puedan mantener el ritmo de migración hacia sus áreas de alimentación y reproducción (manglares, salinas y zonas arrecifales), esto dependerá que la tasa de elevación del agua sea suficientemente lenta para permitir que esto ocurra. Sin embargo, los escenarios pueden diferir en ciertos aspectos, pero muchos de estos hábitats ya han sufrido pérdidas significativas, por diversas razones, tal como la industria o el desarrollo urbano-costero creando en algunos casos un cuello de botella a la productividad. En estos casos el impacto de la elevación del nivel del mar podría remover lo que queda de los hábitats críticos.

                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Normatividad */}
          <TabsContent value="normatividad" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-red-200 shadow-xl">
                <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Normatividad e instrumentos de política y manejo pesquero
                  </CardTitle>
                </CardHeader>
              <CardContent className="p-8">
                <div className="overflow-x-auto shadow-lg rounded-xl border-2 border-gray-200">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200">
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-red-700" />
                            Instrumento de Manejo
                    </div>
                        </th>
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-center text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-red-700" />
                            Sí/No
                    </div>
                        </th>
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-3 text-orange-700" />
                            Disposición
                    </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-yellow-700" />
                            Sustento
                  </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">1. Norma Oficial Mexicana</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            NORMA Oficial Mexicana NOM-065-SAG/PESC-2014, Para regular el aprovechamiento de las especies de mero y especies asociadas, en aguas de jurisdicción federal del litoral del Golfo de México y Mar Caribe.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            DOF: 03/07/2015
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">2. Plan de Manejo Pesquero</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          ACUERDO por el que se da a conocer el Plan de Manejo Pesquero de Mero (Epinephelus morio) y especies asociadas en la Península de Yucatán.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 25/11/2014
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-red-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">3. Tipo de acceso</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Permiso	para	pesca	comercial	de escama marina.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Opinión técnica del IMIPAS.
                          Artículo 36, Fracción III de la LGPAS (DOF, 24/04/2018).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">4. Talla mínima</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          La talla mínima de captura para el mero rojo (Epinephelus morio) es de 36.3 centímetros de longitud total.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numeral 4.8 de la NORMA	Oficial Mexicana NOM-065- SAG/PESC-2014 (DOF: 03/07/2015).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">5. Arte de pesca y método de captura</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Para embarcaciones mayores se autorizan no más de cuatro palangres, con máximo 500 anzuelos cada uno o un palangre con máximo 2000 anzuelos; los anzuelos serán curvos, tipo huachinangueros (garra de águila), del número 14/0 y 15/0 o de mayor tamaño.
                          Para embarcaciones menores de 10 toneladas de registro bruto, con motor estacionario o fuera de borda se autoriza un palangre no mayor de 750 metros de línea madre y 250 anzuelos curvo tipo huachinanguero del número 10/0 a 12/0 o equivalentes y una línea de mano por pescador con anzuelos de las mismas características.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numeral 4.3, 4.3.1, 4.3.2, 4.3.3,  4.3.4  de  la
                          NORMA	Oficial Mexicana NOM-065- SAG/PESC-2014 (DOF: 03/07/2015).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-red-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">6. Veda</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          ACUERDO por el que se modifica el similar por el que se establece veda para la captura de todas las especies de mero en las aguas de jurisdicción federal del Golfo de México correspondientes al litoral de los estados de Campeche, Yucatán y Quintana Roo.
                          Se establece veda temporal para la captura de todas las especies de mero en las aguas de jurisdicción federal del Golfo de México, correspondientes al litoral de los Estados de Tabasco, Campeche, Yucatán y Quintana Roo, en el área comprendida entre los límites de Veracruz y Tabasco y desde ese punto siguiendo una línea imaginaria con rumbo al Norte trazada sobre los 92 °28'16" de longitud Oeste que se prolonga hasta el límite de la Zona Económica Exclusiva mexicana y continúa por este límite hasta la frontera con Belice, en las fechas que a continuación se indican:
                          A partir de las 00:00 horas del 1 de febrero hasta las 24:00 horas del 31 de marzo.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          DOF: 03/03/2017
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300">
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
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">8. Unidad de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Embarcaciones mayores con o sin alijos y embarcaciones menores operadas con motores fuera de borda o estacionarios, los motores fuera de borda serán con potencia nominal no mayor a 63.43 kilowatts (85 caballos de fuerza) y los estacionarios con una potencia nominal no mayor a los 22.38 kilowatts (30 caballos de fuerza).
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Numeral	4.2	de	la NOM-065-SAG/PESC- 2014 (DOF: 03/07/2015).
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-red-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">9. Esfuerzo nominal autorizado</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-red-700 font-bold text-lg">✗ No</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          No existen permisos o concesiones específicos de pesca comercial de mero y negrillo (amparado por el permiso de pesca comercial de escama marina en la región).
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
        
                          </p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <div className="font-semibold text-gray-800">10. Zona de pesca</div>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 text-center align-top">
                          <span className="text-green-700 font-bold text-lg">✓ Sí</span>
                        </td>
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          Aguas de jurisdicción federal del litoral del Golfo de México y Mar Caribe.
                          ACUERDO por el que se establece una red de zonas de refugio pesquero en aguas marinas de jurisdicción federal ubicadas en el área de Sian Ka an, dentro de la Bahía Espíritu Santo en el Estado de Quintana Roo.
                          ACUERDO por el que se establece una zona de refugio pesquero en aguas marinas de jurisdicción federal ubicadas en la zona de Akumal en el Estado de Quintana Roo. 
                          ACUERDO por el que se establece una red de dos zonas de refugio pesquero totales temporales en aguas marinas de jurisdicción federal ubicadas en la Bahía de la Ascensión en el Estado de Quintana Roo.
                          ACUERDO por el que se establece una zona de refugio pesquero total temporal en aguas de jurisdicción federal en el área de Banco Chinchorro, adyacentes al Municipio de Othón P. Blanco, en el Estado de Quintana Roo.
                          ACUERDO por el que se establece una zona de refugio pesquero parcial temporal en aguas marinas de jurisdicción federal en el área que se ubica frente al Municipio de Celestún, en el Estado de Yucatán.
                          </p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">
                          NOM-065-SAG/PESC- 2014 (DOF: 03/07/2015)
                          DOF: 30/11/2012
                          DOF: 13/04/2015
                          DOF: 23/09/2016
                          DOF: 31/05/2019
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
            <Card className="bg-white/90 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
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
                      {/* Mero rojo en deterioro */}
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-red-800 mb-1">En deterioro</h4>
                          <p className="text-sm text-gray-700 font-medium">Mero rojo (Epinephelus morio)</p>
                          <p className="text-xs text-gray-600 mt-1">Banco de Campeche</p>
                        </div>
                      </div>
                      {/* Negrillo en deterioro */}
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-lg p-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-red-800 mb-1">En deterioro</h4>
                          <p className="text-sm text-gray-700 font-medium">Negrillo (Mycteroperca bonaci)</p>
                          <p className="text-xs text-gray-600 mt-1">Banco de Campeche</p>
                        </div>
                      </div>
                    </div>

                    {/* Estrategia */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-red-800 border-b-2 border-red-200 pb-2">Estrategia</h3>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <p className="text-gray-800 font-medium">Tasa de aprovechamiento variable</p>
                      </div>
                        </div>

                    {/* Tácticas */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-red-800 border-b-2 border-red-200 pb-2">Tácticas</h3>
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <ul className="space-y-2 text-gray-800">
                          <li className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            <span>Control del esfuerzo pesquero</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            <span>Regulación en el arte y método de captura</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            <span>Talla mínima de captura</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            <span>Veda temporal y espacial</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            <span>Zona de pesca</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
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
            <Card className="bg-white/90 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recomendaciones de Manejo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="overflow-x-auto shadow-lg rounded-xl border-2 border-gray-200">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200">
                        <th className="border-r-2 border-gray-300 px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-3 text-red-700" />
                            Recomendación
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-3 text-yellow-700" />
                            Implementado / Avance
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Promover un ordenamiento pesquero en el Estado de Yucatán.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Promover la actualización de la NOM-065-PESC-2014.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-red-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">No incrementar el esfuerzo pesquero.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Analizar la viabilidad de modificar la talla mínima de captura del mero rojo (de 36.3 a 40.0 cm de longitud total).</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Promover la aplicación de una talla mínima de captura precautoria para el negrillo (Mycteroperca bonaci) de 58.0 cm de longitud furcal.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-red-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Promover la implementación y fortalecimiento de las zonas de refugio pesquero dirigidas a la protección de juveniles de mero rojo y negrillo.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Promover que la flota mayor no use alijos para la captura de escama.</p>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <p className="text-sm text-gray-700 leading-relaxed">Sin información</p>
                        </td>
                      </tr>
                      <tr className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 transition-all duration-300">
                        <td className="border-r-2 border-gray-200 px-6 py-4 align-top">
                          <p className="text-sm text-gray-800 font-medium">Diseñar y promover programas para prevenir la pesca, compra y venta de productos ilegales.</p>
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
