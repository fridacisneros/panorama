// app/api/datos/route.js
import { db } from '@/lib/db';
import { produccionPesquera } from '@/lib/schema';
import { NextResponse } from 'next/server';
import { 
  eq, 
  and, 
  between, 
  ilike, 
  or,
  desc, 
  count,
  sql
} from 'drizzle-orm';

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
    
    // Construir condiciones
    const conditions = [];
    
    if (año) {
      conditions.push(eq(produccionPesquera.anoCorte, parseInt(año)));
    }
    
    if (añoInicio && añoFin) {
      conditions.push(between(produccionPesquera.anoCorte, parseInt(añoInicio), parseInt(añoFin)));
    }
    
    if (estado) {
      conditions.push(ilike(produccionPesquera.nombreEstado, `%${estado}%`));
    }
    
    if (especie) {
      conditions.push(
        or(
          ilike(produccionPesquera.nombrePrincipal, `%${especie}%`),
          ilike(produccionPesquera.nombreEspecie, `%${especie}%`)
        )
      );
    }
    
    if (litoral) {
      conditions.push(eq(produccionPesquera.litoral, litoral));
    }
    
    if (origen) {
      conditions.push(ilike(produccionPesquera.origen, `%${origen}%`));
    }
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    // Contar total
    const [countResult] = await db
      .select({ total: count() })
      .from(produccionPesquera)
      .where(whereClause);
    
    const total = countResult.total;
    
    // Obtener datos paginados
    const data = await db
      .select({
        id: produccionPesquera.id,
        nombreActivo: produccionPesquera.nombreActivo,
        nombreSitioDesembarque: produccionPesquera.nombreSitioDesembarque,
        unidadEconomica: produccionPesquera.unidadEconomica,
        nombreEstado: produccionPesquera.nombreEstado,
        nombreOficina: produccionPesquera.nombreOficina,
        tipoAviso: produccionPesquera.tipoAviso,
        folioAviso: produccionPesquera.folioAviso,
        fechaAviso: produccionPesquera.fechaAviso,
        origen: produccionPesquera.origen,
        nombreLugarCaptura: produccionPesquera.nombreLugarCaptura,
        mesCorte: produccionPesquera.mesCorte,
        anoCorte: produccionPesquera.anoCorte,
        periodoInicio: produccionPesquera.periodoInicio,
        periodoFin: produccionPesquera.periodoFin,
        duracion: produccionPesquera.duracion,
        diasEfectivos: produccionPesquera.diasEfectivos,
        tipoZona: produccionPesquera.tipoZona,
        produccionAcuacultural: produccionPesquera.produccionAcuacultural,
        nombrePrincipal: produccionPesquera.nombrePrincipal,
        claveEspecie: produccionPesquera.claveEspecie,
        nombreEspecie: produccionPesquera.nombreEspecie,
        pesoDesembarcadoKilogramos: produccionPesquera.pesoDesembarcadoKilogramos,
        pesoVivoKilogramos: produccionPesquera.pesoVivoKilogramos,
        precioPesos: produccionPesquera.precioPesos,
        valorPesos: produccionPesquera.valorPesos,
        litoral: produccionPesquera.litoral,
        createdAt: produccionPesquera.createdAt,
      })
      .from(produccionPesquera)
      .where(whereClause)
      .orderBy(desc(produccionPesquera.anoCorte), desc(produccionPesquera.id))
      .limit(limit)
      .offset(offset);
    
    return NextResponse.json({
      data,
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
