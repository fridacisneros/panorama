import { notFound } from "next/navigation"
import { Fish, MapPin, Calendar, TrendingUp, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos simulados de especies
const especiesData = {
  "bagre-bandera": {
    nombre: "Bagre Bandera",
    nombreCientifico: "Bagre marinus",
    descripcion: "Especie de bagre marino de gran importancia comercial en el Golfo de México",
    estado: "Bajo manejo",
    zona: "Golfo de México",
    temporadaPesca: "Octubre - Marzo",
    tallaMinima: "35 cm",
    cuotaAnual: "2,500 toneladas",
    caracteristicas: [
      "Longitud máxima: 70 cm",
      "Peso máximo: 4.5 kg",
      "Madurez sexual: 2-3 años",
      "Longevidad: 8-10 años",
    ],
    habitat: "Aguas costeras y estuarios del Golfo de México, prefiere fondos arenosos y lodosos",
    importanciaEconomica: "Alta - Representa el 15% de la captura total de bagres en la región",
    amenazas: ["Sobrepesca", "Degradación del hábitat", "Contaminación costera", "Cambio climático"],
    medidasConservacion: [
      "Talla mínima de captura establecida",
      "Temporada de veda reproductiva",
      "Cuotas de pesca anuales",
      "Monitoreo poblacional continuo",
    ],
  },
}

interface PageProps {
  params: {
    especie: string
  }
}

export default function EspeciePage({ params }: PageProps) {
  const especie = especiesData[params.especie as keyof typeof especiesData]

  if (!especie) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-teal-600">
            Inicio
          </a>
          <span>/</span>
          <a href="/especies" className="hover:text-teal-600">
            Especies
          </a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{especie.nombre}</span>
        </nav>

        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-teal-200 p-8 mb-8 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Fish className="h-8 w-8 text-teal-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{especie.nombre}</h1>
                  <p className="text-lg text-gray-600 italic">{especie.nombreCientifico}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{especie.descripcion}</p>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">
                  <MapPin className="w-3 h-3 mr-1" />
                  {especie.zona}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Calendar className="w-3 h-3 mr-1" />
                  {especie.temporadaPesca}
                </Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200">{especie.estado}</Badge>
              </div>
            </div>

            <div className="ml-8">
              <img
                src="/placeholder.svg?height=200&width=300&text=Bagre+Bandera"
                alt={especie.nombre}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Información detallada en tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/90 backdrop-blur-sm border border-teal-200">
            <TabsTrigger value="general" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-700">
              <Info className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="biologia" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-700">
              <Fish className="w-4 h-4 mr-2" />
              Biología
            </TabsTrigger>
            <TabsTrigger value="pesca" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Pesca
            </TabsTrigger>
            <TabsTrigger
              value="conservacion"
              className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-700"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Conservación
            </TabsTrigger>
            <TabsTrigger
              value="regulacion"
              className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Regulación
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-teal-700">
                    <Fish className="w-5 h-5 mr-2" />
                    Características Generales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {especie.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-teal-700">
                    <MapPin className="w-5 h-5 mr-2" />
                    Hábitat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{especie.habitat}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="biologia" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700">Información Biológica</CardTitle>
                <CardDescription>Datos sobre el ciclo de vida y comportamiento de la especie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-700 mb-2">Reproducción</h3>
                    <p className="text-sm text-gray-600">Desove en primavera, huevos pelágicos</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-700 mb-2">Alimentación</h3>
                    <p className="text-sm text-gray-600">Omnívoro, crustáceos y peces pequeños</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-700 mb-2">Migración</h3>
                    <p className="text-sm text-gray-600">Movimientos estacionales costeros</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pesca" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                <CardHeader>
                  <CardTitle className="text-teal-700">Datos de Pesca</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Talla mínima:</span>
                    <Badge variant="outline">{especie.tallaMinima}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Cuota anual:</span>
                    <Badge variant="outline">{especie.cuotaAnual}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Temporada:</span>
                    <Badge variant="outline">{especie.temporadaPesca}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
                <CardHeader>
                  <CardTitle className="text-teal-700">Importancia Económica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{especie.importanciaEconomica}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conservacion" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Amenazas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {especie.amenazas.map((amenaza, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        {amenaza}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Fish className="w-5 h-5 mr-2" />
                    Medidas de Conservación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {especie.medidasConservacion.map((medida, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {medida}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regulacion" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
              <CardHeader>
                <CardTitle className="text-teal-700">Marco Regulatorio</CardTitle>
                <CardDescription>Normativas y regulaciones aplicables a esta especie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-700">NOM-009-SAG/PESC-2015</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Establece el procedimiento para determinar las épocas y zonas de veda para la captura de las
                      diferentes especies de la flora y fauna acuáticas.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-700">Acuerdo Secretarial</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Acuerdo por el que se establece veda para las especies de bagre en aguas marinas y estuarinas del
                      Golfo de México.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Acciones */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Ver Estadísticas
          </Button>
          <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent">
            <Calendar className="w-4 h-4 mr-2" />
            Consultar Vedas
          </Button>
        </div>
      </div>
    </div>
  )
}
