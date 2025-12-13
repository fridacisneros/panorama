// app/api/stats/route.js
import Database from 'better-sqlite3';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo'); // 'captura', 'precios', 'mensual'
    const año = searchParams.get('año');
    const añoInicio = searchParams.get('añoInicio');
    const añoFin = searchParams.get('añoFin');
    
    const db = new Database('data.db', { readonly: true });
    let result;
    
    if (tipo === 'captura-anual') {
      // Captura total por año
      let query = 'SELECT año, SUM(CAST(peso_vivo as REAL)) as total FROM datos';
      const params = [];
      
      if (añoInicio && añoFin) {
        query += ' WHERE año BETWEEN ? AND ?';
        params.push(añoInicio, añoFin);
      }
      
      query += ' GROUP BY año ORDER BY año';
      result = db.prepare(query).all(...params);
      
    } else if (tipo === 'captura-mensual') {
      // Captura promedio mensual (ajusta según tu columna de mes)
      let query = `
        SELECT 
          mes,
          AVG(CAST(peso_vivo as REAL)) as promedio,
          COUNT(*) as registros
        FROM datos
        WHERE 1=1
      `;
      const params = [];
      
      if (año) {
        query += ' AND año = ?';
        params.push(año);
      }
      
      query += ' GROUP BY mes ORDER BY mes';
      result = db.prepare(query).all(...params);
      
    } else if (tipo === 'precios') {
      // Tendencia de precios (ajusta según tu columna de precio)
      let query = `
        SELECT 
          año,
          AVG(CAST(precio as REAL)) as precio_promedio,
          MIN(CAST(precio as REAL)) as precio_min,
          MAX(CAST(precio as REAL)) as precio_max
        FROM datos
        WHERE precio IS NOT NULL AND precio != ''
      `;
      const params = [];
      
      if (añoInicio && añoFin) {
        query += ' AND año BETWEEN ? AND ?';
        params.push(añoInicio, añoFin);
      }
      
      query += ' GROUP BY año ORDER BY año';
      result = db.prepare(query).all(...params);
      
    } else if (tipo === 'especies-top') {
      // Top especies por captura
      let query = `
        SELECT 
          especie,
          SUM(CAST(peso_vivo as REAL)) as total_captura,
          COUNT(*) as registros
        FROM datos
        WHERE especie IS NOT NULL
      `;
      const params = [];
      
      if (año) {
        query += ' AND año = ?';
        params.push(año);
      }
      
      query += ' GROUP BY especie ORDER BY total_captura DESC LIMIT 10';
      result = db.prepare(query).all(...params);
    }
    
    db.close();
    
    return NextResponse.json({ data: result });
    
  } catch (error) {
    console.error('Error en stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
