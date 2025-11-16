"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Fish, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type VedaData, isVedaActive, formatDateToDDMM } from "@/lib/vedas-data"

interface VedasCalendarProps {
  vedas: VedaData[]
}

export function VedasCalendar({ vedas }: VedasCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  // Inicializar después de la hidratación para evitar errores de SSR
  useEffect(() => {
    setMounted(true)
    setCurrentDate(new Date())
  }, [])

  // Si aún no está montado, renderizar un placeholder
  if (!mounted || !currentDate) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
          <CardContent className="p-6">
            <div className="h-96 flex items-center justify-center">
              <p className="text-gray-500">Cargando calendario...</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
          <CardContent className="p-6">
            <div className="h-96 flex items-center justify-center">
              <p className="text-gray-500">Cargando...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Obtener el primer día del mes y el número de días
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Generar días del calendario
  const calendarDays = []

  // Días vacíos al inicio
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null)
  }

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  // Separar vedas permanentes de las temporales
  const vedasPermanentes = vedas.filter((veda) => veda.tipoVeda === "Permanente")
  const vedasTemporales = vedas.filter((veda) => veda.tipoVeda !== "Permanente")

  // Obtener vedas temporales para un día específico (excluye permanentes)
  const getVedasForDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return vedasTemporales.filter((veda) => {
      // Parse ISO date strings (YYYY-MM-DD)
      const startDate = parseVedaDate(veda.fechaInicio1)
      const endDate = parseVedaDate(veda.fechaTermino1)
      
      if (!startDate || !endDate) return false
      
      // Verificar si la fecha está dentro del período
      let isInPeriod = date >= startDate && date <= endDate
      
      // Verificar segundo período si existe
      if (veda.fechaInicio2 && veda.fechaTermino2) {
        const startDate2 = parseVedaDate(veda.fechaInicio2)
        const endDate2 = parseVedaDate(veda.fechaTermino2)
        if (startDate2 && endDate2) {
          isInPeriod = isInPeriod || (date >= startDate2 && date <= endDate2)
        }
      }
      
      // Verificar tercer período si existe
      if (veda.fechaInicio3 && veda.fechaTermino3) {
        const startDate3 = parseVedaDate(veda.fechaInicio3)
        const endDate3 = parseVedaDate(veda.fechaTermino3)
        if (startDate3 && endDate3) {
          isInPeriod = isInPeriod || (date >= startDate3 && date <= endDate3)
        }
      }
      
      return isInPeriod
    })
  }

  // Helper function to parse ISO date strings (YYYY-MM-DD)
  const parseVedaDate = (dateStr: string): Date | null => {
    if (!dateStr || dateStr === "Todo el año" || dateStr === "Por definir") return null
    
    try {
      const date = new Date(dateStr)
      // Verificar que la fecha es válida
      if (isNaN(date.getTime())) return null
      return date
    } catch {
      return null
    }
  }

  // Obtener vedas para el día seleccionado
  const selectedDayVedas = selectedDay ? getVedasForDay(selectedDay) : []

  const navigateMonth = (direction: "prev" | "next") => {
    if (!currentDate) return
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentMonth - 1)
    } else {
      newDate.setMonth(currentMonth + 1)
    }
    setCurrentDate(newDate)
    setSelectedDay(null)
  }

  const goToToday = () => {
    const todayDate = new Date()
    setCurrentDate(todayDate)
    setSelectedDay(todayDate.getDate())
  }

  const getEstadoBadgeColor = (status: string) => {
    switch (status) {
      case "Activa":
        return "bg-red-100 text-red-800 border-red-200"
      case "Inactiva":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "Permanente":
        return "bg-red-100 text-red-800 border-red-200"
      case "Temporal Fija":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Temporal Variable":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendario */}
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-teal-800">
                {monthNames[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                  className="border-teal-200 hover:bg-teal-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="border-teal-200 hover:bg-teal-50 text-xs px-2 bg-transparent"
                >
                  Hoy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                  className="border-teal-200 hover:bg-teal-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Días del calendario */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="p-2 h-12"></div>
                }

                const dayVedas = getVedasForDay(day)
                const isToday =
                  day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                const isSelected = day === selectedDay
                const hasVedas = dayVedas.length > 0

                return (
                  <button
                    key={`${currentYear}-${currentMonth}-${day}`}
                    onClick={() => setSelectedDay(day)}
                    className={`
                      p-2 h-12 text-sm rounded-lg border transition-all duration-200 relative
                      ${
                        isSelected
                          ? "bg-teal-100 border-teal-300 text-teal-800 font-semibold"
                          : isToday
                            ? "bg-blue-100 border-blue-300 text-blue-800 font-semibold"
                            : hasVedas
                              ? "bg-red-50 border-red-200 text-red-800 hover:bg-red-100"
                              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {day}
                    {hasVedas && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detalles del día seleccionado */}
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center text-teal-800">
              <Calendar className="w-5 h-5 mr-2" />
              {selectedDay ? `${selectedDay} de ${monthNames[currentMonth]}, ${currentYear}` : "Selecciona un día"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDay ? (
              selectedDayVedas.length > 0 ? (
                <div className="space-y-4">
                  {selectedDayVedas.map((veda) => (
                    <div key={veda.id} className="p-4 border border-teal-200 rounded-lg bg-white/50">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 flex items-center">
                          <Fish className="w-4 h-4 mr-2 text-teal-600" />
                          {veda.pesqueria}
                        </h4>
                        <Badge className={getEstadoBadgeColor(isVedaActive(veda) ? "Activa" : "Inactiva")}>
                          {isVedaActive(veda) ? "ACTIVA" : "INACTIVA"}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="font-medium">Región:</span>
                          <span className="ml-1">{veda.region}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="font-medium">Zona:</span>
                          <span className="ml-1">{veda.zona}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-medium">Período:</span>
                          <span className="ml-1">
                            {veda.tipoVeda === "Permanente"
                              ? "Todo el año"
                              : `${formatDateToDDMM(veda.fechaInicio1)} - ${formatDateToDDMM(veda.fechaTermino1)}`}
                          </span>
                        </div>
                        {veda.fechaInicio2 && veda.fechaTermino2 && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-medium">Período 2:</span>
                            <span className="ml-1">
                              {formatDateToDDMM(veda.fechaInicio2)} - {formatDateToDDMM(veda.fechaTermino2)}
                            </span>
                          </div>
                        )}
                        {veda.fechaInicio3 && veda.fechaTermino3 && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-medium">Período 3:</span>
                            <span className="ml-1">
                              {formatDateToDDMM(veda.fechaInicio3)} - {formatDateToDDMM(veda.fechaTermino3)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={getTipoBadgeColor(veda.tipoVeda)}>
                          {veda.tipoVeda}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {veda.nombreCientifico}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Fish className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin vedas activas</h3>
                  <p className="text-gray-600">No hay vedas programadas para este día.</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona un día</h3>
                <p className="text-gray-600">Haz clic en cualquier día del calendario para ver las vedas programadas.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lista de Vedas Permanentes */}
      {vedasPermanentes.length > 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center text-teal-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Vedas Permanentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vedasPermanentes.map((veda) => (
                <div key={veda.id} className="p-4 border border-red-200 rounded-lg bg-red-50/50 hover:bg-red-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Fish className="w-4 h-4 mr-2 text-red-600" />
                      {veda.pesqueria}
                    </h4>
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      PERMANENTE
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">Región:</span>
                      <span className="ml-1">{veda.region}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">Zona:</span>
                      <span className="ml-1">{veda.zona}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">Período:</span>
                      <span className="ml-1">Todo el año</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {veda.nombreCientifico}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
