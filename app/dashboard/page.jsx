'use client';
import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [capturaAnual, setCapturaAnual] = useState([]);
  const [capturaMensual, setCapturaMensual] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [especiesTop, setEspeciesTop] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [añoInicio, setAñoInicio] = useState('2018');
  const [añoFin, setAñoFin] = useState('2025');
  const [añoSeleccionado, setAñoSeleccionado] = useState('2024');

  useEffect(() => {
    cargarDatos();
  }, [añoInicio, añoFin, añoSeleccionado]);

  async function cargarDatos() {
    setLoading(true);
    try {
      // Captura anual
      const resCapturaAnual = await fetch(
        `/api/stats?tipo=captura-anual&añoInicio=${añoInicio}&añoFin=${añoFin}`
      );
      const dataCapturaAnual = await resCapturaAnual.json();
      setCapturaAnual(dataCapturaAnual.data || []);

      // Captura mensual del año seleccionado
      const resCapturaMensual = await fetch(
        `/api/stats?tipo=captura-mensual&año=${añoSeleccionado}`
      );
      const dataCapturaMensual = await resCapturaMensual.json();
      setCapturaMensual(dataCapturaMensual.data || []);

      // Tendencia de precios
      const resPrecios = await fetch(
        `/api/stats?tipo=precios&añoInicio=${añoInicio}&añoFin=${añoFin}`
      );
      const dataPrecios = await resPrecios.json();
      setPrecios(dataPrecios.data || []);

      // Top especies
      const resEspecies = await fetch(
        `/api/stats?tipo=especies-top&año=${añoSeleccionado}`
      );
      const dataEspecies = await resEspecies.json();
      setEspeciesTop(dataEspecies.data || []);

    } catch (error) {
      console.error('Error cargando datos:', error);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Dashboard de Pesquerías
        </h1>

        {/* Filtros */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año Inicio
              </label>
              <select
                value={añoInicio}
                onChange={(e) => setAñoInicio(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(año => (
                  <option key={año} value={año}>{año}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año Fin
              </label>
              <select
                value={añoFin}
                onChange={(e) => setAñoFin(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(año => (
                  <option key={año} value={año}>{año}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año para Análisis Mensual
              </label>
              <select
                value={añoSeleccionado}
                onChange={(e) => setAñoSeleccionado(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(año => (
                  <option key={año} value={año}>{año}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Gráfica: Captura Anual */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">Captura Total por Año</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={capturaAnual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="año" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Captura Total (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica: Captura Mensual Promedio */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Captura Promedio Mensual - {añoSeleccionado}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={capturaMensual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="promedio" 
                fill="#10b981" 
                name="Promedio (kg)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica: Tendencia de Precios */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tendencia de Precios</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={precios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="año" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="precio_promedio" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Precio Promedio"
              />
              <Line 
                type="monotone" 
                dataKey="precio_max" 
                stroke="#ef4444" 
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Precio Máximo"
              />
              <Line 
                type="monotone" 
                dataKey="precio_min" 
                stroke="#3b82f6" 
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Precio Mínimo"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 10 Especies */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Top 10 Especies por Captura - {añoSeleccionado}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={especiesTop} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="especie" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="total_captura" 
                fill="#8b5cf6" 
                name="Captura Total (kg)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}