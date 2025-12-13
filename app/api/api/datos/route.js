// app/api/datos/route.js
import Database from 'better-sqlite3';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parámetros de filtrado
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const año = searchParams.get('año');
    const añoInicio = searchParams.get('añoInicio');
    const añoFin = searchParams.get('añoFin');
    
    // Filtros adicionales (ajusta según tus columnas)
    const entidad = searchParams.get('entidad');
    const especie = searchParams.get('especie');
    
    const db = new Database('data.db', { readonly: true });
    
    // Construir query dinámicamente
    let query = 'SELECT * FROM datos WHERE 1=1';
    const params = [];
    
    if (año) {
      query += ' AND año = ?';
      params.push(año);
    }
    
    if (añoInicio && añoFin) {
      query += ' AND año BETWEEN ? AND ?';
      params.push(añoInicio, añoFin);
    }
    
    // Agregar más filtros según tus columnas
    if (entidad) {
      query += ' AND entidad_um LIKE ?';
      params.push(`%${entidad}%`);
    }
    
    if (especie) {
      query += ' AND especie LIKE ?';
      params.push(`%${especie}%`);
    }
    
    // Contar total
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as count');
    const totalResult = db.prepare(countQuery).get(...params);
    const total = totalResult.count;
    
    // Agregar paginación
    query += ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
    
    const rows = db.prepare(query).all(...params);
    
    db.close();
    
    return NextResponse.json({
      data: rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
    
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}