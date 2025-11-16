import Link from "next/link"
import {
  ArrowRight,
  UsersIcon,
  Fish,
  Waves,
  TrendingUp,
  Shield,
  Calendar,
  BookOpen,
  Clock,
  Activity,
  Send,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 text-white">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6"></div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200 bg-clip-text text-white">
              Panorama
            </h1>

            <p className="text-xl md:text-2xl text-teal-100 mb-8 leading-relaxed">
              Plataforma de consulta para navegar a través de la legislación mexicana
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white border-0 px-8 py-4 text-lg">
                <Link href="/especies">
                  <Fish className="w-5 h-5 mr-2" />
                  Explorar Pesquerías
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-teal-300 text-teal-100 hover:bg-teal-500/20 px-8 py-4 text-lg bg-transparent"
              >
                <Link href="/vedas">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ver Vedas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100 text-sm font-medium"> Pesquerías</p>
                    <p className="text-3xl font-bold">10</p>
                    <p className="text-teal-200 text-xs">registradas</p>
                  </div>
                  <div className="bg-teal-400/30 p-3 rounded-full">
                    <Fish className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-100 text-sm font-medium">Vedas</p>
                    <p className="text-3xl font-bold">147</p>
                    <p className="text-cyan-200 text-xs">programadas</p>
                  </div>
                  <div className="bg-cyan-400/30 p-3 rounded-full">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Normativas</p>
                    <p className="text-3xl font-bold">114</p>
                    <p className="text-blue-200 text-xs">registradas</p>
                  </div>
                  <div className="bg-blue-400/30 p-3 rounded-full">
                    <Waves className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Carta Nacional Pesquera</p>
                    <p className="text-3xl font-bold">2025</p>
                    <p className="text-emerald-200 text-xs">última actualización</p>
                  </div>
                  <div className="bg-emerald-400/30 p-3 rounded-full">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explora las secciones</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Accede a información detallada sobre pesquerías, vedas y normativas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/especies">
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-teal-500 p-3 rounded-full text-white group-hover:bg-teal-600 transition-colors">
                      <Fish className="w-8 h-8" />
                    </div>
                    <Badge className="bg-teal-100 text-teal-700 border-teal-300">10 Pesquerías</Badge>
                  </div>
                  <CardTitle className="text-2xl text-teal-800 group-hover:text-teal-900">Pesquerías</CardTitle>
                  <CardDescription className="text-teal-600">
                    Información detallada sobre pesquerías comerciales y su estado de acuerdo con CNP
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-teal-600 mb-4">
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" /> CNP 2025
                    </span>
                  </div>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white group-hover:bg-teal-600">
                    Explorar Pesquerías
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/vedas">
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-cyan-500 p-3 rounded-full text-white group-hover:bg-cyan-600 transition-colors">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <Badge className="bg-cyan-100 text-cyan-700 border-cyan-300">8 Activas</Badge>
                  </div>
                  <CardTitle className="text-2xl text-cyan-800 group-hover:text-cyan-900">Vedas y Temporadas</CardTitle>
                  <CardDescription className="text-cyan-600">
                    Calendario de vedas, períodos de protección y regulaciones temporales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-cyan-600 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> 147 programadas
                    </span>
                  </div>
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white group-hover:bg-cyan-600">
                    Ver Calendario
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/normativas">
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-500 p-3 rounded-full text-white group-hover:bg-blue-600 transition-colors">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300">114 Documentos</Badge>
                  </div>
                  <CardTitle className="text-2xl text-blue-800 group-hover:text-blue-900">
                    Biblioteca Normativa
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Acceso a leyes, reglamentos y normativas del sector pesquero
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-blue-600 mb-4">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" /> Para descargar
                    </span>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white group-hover:bg-blue-600">
                    Consultar Biblioteca
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Species */}
      <section className="py-16 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Pesquerías agregadas </h2>
            <p className="text-xl text-gray-600">Algunas de las pesquerías más recientes en la página </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-teal-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-teal-800">Bagre Bandera</h3>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Bagre marinus</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Valor comercial:</span>
                    <span className="font-medium text-emerald-600">$2.5M/año</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tendencia:</span>
                    <span className="font-medium text-emerald-600">+12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-cyan-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-cyan-800">Camarón Café</h3>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Penaeus aztecus</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Valor comercial:</span>
                    <span className="font-medium text-cyan-600">$1.8M/año</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tendencia:</span>
                    <span className="font-medium text-cyan-600">+8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-blue-800">Mero Negrillo</h3>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Mycteroperca bonaci</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Valor comercial:</span>
                    <span className="font-medium text-blue-600">$3.2M/año</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tendencia:</span>
                    <span className="font-medium text-red-600">-5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      {/* Buzón de Sugerencias Simplificado */}
      <section
        id="buzon-sugerencias"
        className="py-16 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Buzón de Sugerencias</h2>
              <p className="text-teal-100">Comparte tus ideas y comentarios para mejorar nuestra plataforma</p>
            </div>

            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                      Nombre
                    </Label>
                    <Input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Tu nombre"
                      className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Correo electrónico
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tu@email.com"
                      className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sugerencia" className="text-sm font-medium text-gray-700">
                      Sugerencia o comentario
                    </Label>
                    <Textarea
                      id="sugerencia"
                      name="sugerencia"
                      rows={5}
                      placeholder="Comparte tu sugerencia, comentario o idea para mejorar la plataforma..."
                      className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Sugerencia
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="text-center mt-6"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12"></footer>
    </div>
  )
}
