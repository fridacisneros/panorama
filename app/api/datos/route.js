// app/api/datos/route.js
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parámetros de paginación
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = (page - 1) * limit;
    
    // Filtros
    const año = searchParams.get('año');
    const añoInicio = searchParams.get('añoInicio');
    const añoFin = searchParams.get('añoFin');
    const estado = searchParams.get('estado');
    const especie = searchParams.get('especie');
    const litoral = searchParams.get('litoral');
    const origen = searchParams.get('origen');
    
    // Construir query dinámicamente
    let sql = `
      SELECT 
        id,
        ano_corte,
        nombre_activo,
        nombre_sitio_desembarque,
        unidad_economica,
        nombre_estado,
        nombre_oficina,
        tipo_aviso,
        folio_aviso,
        fecha_aviso,
        origen,
        nombre_lugar_captura,
        mes_corte,
        ano_corte,
        periodo_inicio,
        periodo_fin,
        duracion,
        dias_efectivos,
        tipo_zona,
        produccion_acuacultural,
        nombre_principal,
        clave_especie,
        nombre_especie,
        peso_desembarcado_kilogramos,
        peso_vivo_kilogramos,
        precio_pesos,
        valor_pesos,
        litoral,
        created_at
      FROM produccion_pesquera
      WHERE 1=1
    `;
    
    const params = [];
    let paramIndex = 1;
    
    if (año) {
      sql += ` AND ano_corte = $${paramIndex}`;
      params.push(parseInt(año));
      paramIndex++;
    }
    
    if (añoInicio && añoFin) {
      sql += ` AND ano_corte BETWEEN $${paramIndex} AND $${paramIndex + 1}`;
      params.push(parseInt(añoInicio), parseInt(añoFin));
      paramIndex += 2;
    }
    
    if (estado) {
      sql += ` AND nombre_estado ILIKE $${paramIndex}`;
      params.push(`%${estado}%`);
      paramIndex++;
    }
    
    if (especie) {
      sql += ` AND (nombre_principal ILIKE $${paramIndex} OR nombre_especie ILIKE $${paramIndex})`;
      params.push(`%${especie}%`);
      paramIndex++;
    }
    
    if (litoral) {
      sql += ` AND litoral = $${paramIndex}`;
      params.push(litoral);
      paramIndex++;
    }
    
    if (origen) {
      sql += ` AND origen ILIKE $${paramIndex}`;
      params.push(`%${origen}%`);
      paramIndex++;
    }
    
    // Contar total
    const countSql = sql.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) as count FROM');
    const countResult = await query(countSql, params);
    const total = parseInt(countResult.rows[0].count);
    
    // Agregar ordenamiento y paginación
    sql += ` ORDER BY ano_corte DESC, id DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);
    
    const result = await query(sql, params);
    
    return NextResponse.json({
      data: result.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
    
  } catch (error) {
    console.error('Error en API datos:', error);
    return NextResponse.json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

