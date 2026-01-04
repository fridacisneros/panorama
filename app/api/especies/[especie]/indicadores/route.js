// app/api/especies/[especie]/indicadores/route.js
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { especie } = params;
    const { searchParams } = new URL(request.url);
    const año = searchParams.get('año');
    
    // Decodificar el nombre de la especie (viene de la URL)
    const nombreEspecie = decodeURIComponent(especie).replace(/-/g, ' ');
    
    // Query para obtener indicadores de la especie
    const indicadoresSql = `
      SELECT 
        ano_corte as año,
        SUM(peso_vivo_kilogramos) as captura_total_kg,
        SUM(peso_desembarcado_kilogramos) as peso_desembarcado_kg,
        SUM(valor_pesos) as valor_total,
        AVG(precio_pesos) as precio_promedio,
        COUNT(*) as registros,
        COUNT(DISTINCT nombre_estado) as estados_productores
      FROM produccion_pesquera
      WHERE (
        nombre_principal ILIKE $1 
        OR nombre_especie ILIKE $1
      )
      ${año ? 'AND ano_corte = $2' : ''}
      GROUP BY ano_corte
      ORDER BY ano_corte DESC
    `;
    
    const indicadoresParams = año 
      ? [`%${nombreEspecie}%`, parseInt(año)]
      : [`%${nombreEspecie}%`];
    
    const indicadores = await query(indicadoresSql, indicadoresParams);
    
    // Query para producción mensual
    const mensualSql = `
      SELECT 
        mes_corte as mes,
        SUM(peso_vivo_kilogramos) as captura_total,
        AVG(peso_vivo_kilogramos) as promedio,
        COUNT(*) as registros
      FROM produccion_pesquera
      WHERE (
        nombre_principal ILIKE $1 
        OR nombre_especie ILIKE $1
      )
      ${año ? 'AND ano_corte = $2' : ''}
      AND mes_corte IS NOT NULL
      GROUP BY mes_corte
      ORDER BY mes_corte
    `;
    
    const mensual = await query(mensualSql, indicadoresParams);
    
    // Query para producción por estado
    const estadosSql = `
      SELECT 
        nombre_estado as estado,
        SUM(peso_vivo_kilogramos) as captura_total,
        SUM(valor_pesos) as valor_total,
        COUNT(*) as registros
      FROM produccion_pesquera
      WHERE (
        nombre_principal ILIKE $1 
        OR nombre_especie ILIKE $1
      )
      ${año ? 'AND ano_corte = $2' : ''}
      AND nombre_estado IS NOT NULL
      GROUP BY nombre_estado
      ORDER BY captura_total DESC NULLS LAST
      LIMIT 10
    `;
    
    const estados = await query(estadosSql, indicadoresParams);
    
    // Query para resumen general
    const resumenSql = `
      SELECT 
        SUM(peso_vivo_kilogramos) as captura_total_kg,
        SUM(valor_pesos) as valor_total,
        AVG(precio_pesos) as precio_promedio,
        COUNT(*) as total_registros,
        COUNT(DISTINCT nombre_estado) as total_estados,
        MIN(ano_corte) as año_inicio,
        MAX(ano_corte) as año_fin
      FROM produccion_pesquera
      WHERE (
        nombre_principal ILIKE $1 
        OR nombre_especie ILIKE $1
      )
      ${año ? 'AND ano_corte = $2' : ''}
    `;
    
    const resumen = await query(resumenSql, indicadoresParams);
    
    // Query para tendencia de precios
    const preciosSql = `
      SELECT 
        ano_corte as año,
        AVG(precio_pesos) as precio_promedio,
        MIN(precio_pesos) as precio_min,
        MAX(precio_pesos) as precio_max
      FROM produccion_pesquera
      WHERE (
        nombre_principal ILIKE $1 
        OR nombre_especie ILIKE $1
      )
      AND precio_pesos IS NOT NULL 
      AND precio_pesos > 0
      GROUP BY ano_corte
      ORDER BY ano_corte
    `;
    
    const precios = await query(preciosSql, [`%${nombreEspecie}%`]);
    
    return NextResponse.json({
      especie: nombreEspecie,
      resumen: resumen.rows[0],
      indicadoresAnuales: indicadores.rows,
      produccionMensual: mensual.rows,
      produccionPorEstado: estados.rows,
      tendenciaPrecios: precios.rows
    });
    
  } catch (error) {
    console.error('Error en indicadores de especie:', error);
    return NextResponse.json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

