// app/api/stats/route.js
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');
    const año = searchParams.get('año');
    const añoInicio = searchParams.get('añoInicio');
    const añoFin = searchParams.get('añoFin');
    const especie = searchParams.get('especie');
    const estado = searchParams.get('estado');
    
    let result;
    
    if (tipo === 'captura-anual') {
      // Captura total por año (usando ano_corte o ano_corte)
      let sql = `
        SELECT 
          ano_corte as año,
          COALESCE(SUM(peso_vivo_kilogramos), 0) as total,
          COALESCE(SUM(valor_pesos), 0) as valor_total,
          COUNT(*) as registros
        FROM produccion_pesquera
        WHERE 1=1
      `;
      const params = [];
      let paramIndex = 1;
      
      if (añoInicio && añoFin) {
        sql += ` AND ano_corte BETWEEN $${paramIndex} AND $${paramIndex + 1}`;
        params.push(parseInt(añoInicio), parseInt(añoFin));
        paramIndex += 2;
      }
      
      if (especie) {
        sql += ` AND nombre_principal ILIKE $${paramIndex}`;
        params.push(`%${especie}%`);
        paramIndex++;
      }
      
      if (estado) {
        sql += ` AND nombre_estado ILIKE $${paramIndex}`;
        params.push(`%${estado}%`);
        paramIndex++;
      }
      
      sql += ' GROUP BY ano_corte ORDER BY ano_corte';
      
      const res = await query(sql, params);
      result = res.rows;
      
    } else if (tipo === 'captura-mensual') {
      // Captura promedio mensual
      let sql = `
        SELECT 
          mes_corte as mes,
          AVG(peso_vivo_kilogramos) as promedio,
          SUM(peso_vivo_kilogramos) as total,
          COUNT(*) as registros
        FROM produccion_pesquera
        WHERE mes_corte IS NOT NULL
      `;
      const params = [];
      let paramIndex = 1;
      
      if (año) {
        sql += ` AND ano_corte = $${paramIndex}`;
        params.push(parseInt(año));
        paramIndex++;
      }
      
      if (especie) {
        sql += ` AND nombre_principal ILIKE $${paramIndex}`;
        params.push(`%${especie}%`);
        paramIndex++;
      }
      
      if (estado) {
        sql += ` AND nombre_estado ILIKE $${paramIndex}`;
        params.push(`%${estado}%`);
        paramIndex++;
      }
      
      sql += ' GROUP BY mes_corte ORDER BY mes_corte';
      
      const res = await query(sql, params);
      result = res.rows;
      
    } else if (tipo === 'precios') {
      // Tendencia de precios
      let sql = `
        SELECT 
          ano_corte as año,
          AVG(precio_pesos) as precio_promedio,
          MIN(precio_pesos) as precio_min,
          MAX(precio_pesos) as precio_max,
          COUNT(*) as registros
        FROM produccion_pesquera
        WHERE precio_pesos IS NOT NULL AND precio_pesos > 0
      `;
      const params = [];
      let paramIndex = 1;
      
      if (añoInicio && añoFin) {
        sql += ` AND ano_corte BETWEEN $${paramIndex} AND $${paramIndex + 1}`;
        params.push(parseInt(añoInicio), parseInt(añoFin));
        paramIndex += 2;
      }
      
      if (especie) {
        sql += ` AND nombre_principal ILIKE $${paramIndex}`;
        params.push(`%${especie}%`);
        paramIndex++;
      }
      
      if (estado) {
        sql += ` AND nombre_estado ILIKE $${paramIndex}`;
        params.push(`%${estado}%`);
        paramIndex++;
      }
      
      sql += ' GROUP BY ano_corte ORDER BY ano_corte';
      
      const res = await query(sql, params);
      result = res.rows;
      
    } else if (tipo === 'especies-top') {
      // Top especies por captura
      let sql = `
        SELECT 
          COALESCE(nombre_principal, nombre_especie) as especie,
          SUM(peso_vivo_kilogramos) as total_captura,
          SUM(valor_pesos) as valor_total,
          COUNT(*) as registros
        FROM produccion_pesquera
        WHERE nombre_principal IS NOT NULL OR nombre_especie IS NOT NULL
      `;
      const params = [];
      let paramIndex = 1;
      
      if (año) {
        sql += ` AND ano_corte = $${paramIndex}`;
        params.push(parseInt(año));
        paramIndex++;
      }
      
      if (estado) {
        sql += ` AND nombre_estado ILIKE $${paramIndex}`;
        params.push(`%${estado}%`);
        paramIndex++;
      }
      
      sql += ' GROUP BY COALESCE(nombre_principal, nombre_especie) ORDER BY total_captura DESC NULLS LAST LIMIT 10';
      
      const res = await query(sql, params);
      result = res.rows;
      
    } else if (tipo === 'estados-top') {
      // Top estados por captura
      let sql = `
        SELECT 
          nombre_estado as estado,
          SUM(peso_vivo_kilogramos) as total_captura,
          SUM(valor_pesos) as valor_total,
          COUNT(*) as registros
        FROM produccion_pesquera
        WHERE nombre_estado IS NOT NULL
      `;
      const params = [];
      let paramIndex = 1;
      
      if (año) {
        sql += ` AND ano_corte = $${paramIndex}`;
        params.push(parseInt(año));
        paramIndex++;
      }
      
      if (especie) {
        sql += ` AND nombre_principal ILIKE $${paramIndex}`;
        params.push(`%${especie}%`);
        paramIndex++;
      }
      
      sql += ' GROUP BY nombre_estado ORDER BY total_captura DESC NULLS LAST LIMIT 10';
      
      const res = await query(sql, params);
      result = res.rows;
      
    } else if (tipo === 'litorales') {
      // Producción por litoral
      let sql = `
        SELECT 
          litoral,
          SUM(peso_vivo_kilogramos) as total_captura,
          SUM(valor_pesos) as valor_total,
          COUNT(*) as registros
        FROM produccion_pesquera
        WHERE litoral IS NOT NULL
      `;
      const params = [];
      let paramIndex = 1;
      
      if (año) {
        sql += ` AND ano_corte = $${paramIndex}`;
        params.push(parseInt(año));
        paramIndex++;
      }
      
      sql += ' GROUP BY litoral ORDER BY total_captura DESC NULLS LAST';
      
      const res = await query(sql, params);
      result = res.rows;
      
    } else if (tipo === 'resumen') {
      // Resumen general
      let sql = `
        SELECT 
          COUNT(*) as total_registros,
          COUNT(DISTINCT nombre_principal) as total_especies,
          COUNT(DISTINCT nombre_estado) as total_estados,
          SUM(peso_vivo_kilogramos) as captura_total_kg,
          SUM(valor_pesos) as valor_total_pesos,
          MIN(ano_corte) as año_inicio,
          MAX(ano_corte) as año_fin
        FROM produccion_pesquera
      `;
      
      const res = await query(sql, []);
      result = res.rows[0];
      
    } else if (tipo === 'filtros') {
      // Obtener valores únicos para filtros
      const [años, estados, especies, litorales] = await Promise.all([
        query('SELECT DISTINCT ano_corte FROM produccion_pesquera ORDER BY ano_corte'),
        query('SELECT DISTINCT nombre_estado FROM produccion_pesquera WHERE nombre_estado IS NOT NULL ORDER BY nombre_estado'),
        query('SELECT DISTINCT nombre_principal FROM produccion_pesquera WHERE nombre_principal IS NOT NULL ORDER BY nombre_principal'),
        query('SELECT DISTINCT litoral FROM produccion_pesquera WHERE litoral IS NOT NULL ORDER BY litoral')
      ]);
      
      result = {
        años: años.rows.map(r => r.ano_corte),
        estados: estados.rows.map(r => r.nombre_estado),
        especies: especies.rows.map(r => r.nombre_principal),
        litorales: litorales.rows.map(r => r.litoral)
      };
    } else {
      return NextResponse.json({ error: 'Tipo de consulta no válido' }, { status: 400 });
    }
    
    return NextResponse.json({ data: result });
    
  } catch (error) {
    console.error('Error en stats:', error);
    return NextResponse.json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

