// app/api/especies/[especie]/indicadores/route.ts
import { db } from '@/lib/db';
import { produccionPesquera } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';
import { 
  eq, 
  and, 
  or,
  ilike, 
  isNotNull, 
  gt,
  desc, 
  asc,
  count,
  sum,
  avg,
  min,
  max,
  countDistinct,
  sql,
  type SQL
} from 'drizzle-orm';

// Tipos para las respuestas
interface IndicadorAnual {
  año: number | null;
  captura_total_kg: string | null;
  peso_desembarcado_kg: string | null;
  valor_total: string | null;
  precio_promedio: string | null;
  registros: number;
  estados_productores: number;
}

interface ProduccionMensual {
  mes: string | null;
  captura_total: string | null;
  promedio: string | null;
  registros: number;
}

interface ProduccionEstado {
  estado: string | null;
  captura_total: string | null;
  valor_total: string | null;
  registros: number;
}

interface Resumen {
  captura_total_kg: string | null;
  valor_total: string | null;
  precio_promedio: string | null;
  total_registros: number;
  total_estados: number;
  año_inicio: number | null;
  año_fin: number | null;
}

interface TendenciaPrecio {
  año: number | null;
  precio_promedio: string | null;
  precio_min: string | null;
  precio_max: string | null;
}

interface IndicadoresResponse {
  especie: string;
  resumen: Resumen;
  indicadoresAnuales: IndicadorAnual[];
  produccionMensual: ProduccionMensual[];
  produccionPorEstado: ProduccionEstado[];
  tendenciaPrecios: TendenciaPrecio[];
}

interface RouteParams {
  params: Promise<{ especie: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { especie } = await params;
    const { searchParams } = new URL(request.url);
    const año = searchParams.get('año');
    
    // Decodificar el nombre de la especie (viene de la URL)
    const nombreEspecie = decodeURIComponent(especie).replace(/-/g, ' ');
    
    // Condición base para la especie
    const especieCondition = or(
      ilike(produccionPesquera.nombrePrincipal, `%${nombreEspecie}%`),
      ilike(produccionPesquera.nombreEspecie, `%${nombreEspecie}%`)
    )!;
    
    // Condiciones con año opcional
    const conditionsWithYear: SQL[] = año 
      ? [especieCondition, eq(produccionPesquera.anoCorte, parseInt(año))]
      : [especieCondition];
    
    // Query para indicadores anuales
    const indicadoresAnuales = await db
      .select({
        año: produccionPesquera.anoCorte,
        captura_total_kg: sum(produccionPesquera.pesoVivoKilogramos),
        peso_desembarcado_kg: sum(produccionPesquera.pesoDesembarcadoKilogramos),
        valor_total: sum(produccionPesquera.valorPesos),
        precio_promedio: avg(produccionPesquera.precioPesos),
        registros: count(),
        estados_productores: countDistinct(produccionPesquera.nombreEstado),
      })
      .from(produccionPesquera)
      .where(and(...conditionsWithYear))
      .groupBy(produccionPesquera.anoCorte)
      .orderBy(desc(produccionPesquera.anoCorte));
    
    // Query para producción mensual
    const produccionMensual = await db
      .select({
        mes: produccionPesquera.mesCorte,
        captura_total: sum(produccionPesquera.pesoVivoKilogramos),
        promedio: avg(produccionPesquera.pesoVivoKilogramos),
        registros: count(),
      })
      .from(produccionPesquera)
      .where(and(...conditionsWithYear, isNotNull(produccionPesquera.mesCorte)))
      .groupBy(produccionPesquera.mesCorte)
      .orderBy(asc(produccionPesquera.mesCorte));
    
    // Query para producción por estado
    const produccionPorEstado = await db
      .select({
        estado: produccionPesquera.nombreEstado,
        captura_total: sum(produccionPesquera.pesoVivoKilogramos),
        valor_total: sum(produccionPesquera.valorPesos),
        registros: count(),
      })
      .from(produccionPesquera)
      .where(and(...conditionsWithYear, isNotNull(produccionPesquera.nombreEstado)))
      .groupBy(produccionPesquera.nombreEstado)
      .orderBy(desc(sql`SUM(${produccionPesquera.pesoVivoKilogramos})`))
      .limit(10);
    
    // Query para resumen general
    const [resumen] = await db
      .select({
        captura_total_kg: sum(produccionPesquera.pesoVivoKilogramos),
        valor_total: sum(produccionPesquera.valorPesos),
        precio_promedio: avg(produccionPesquera.precioPesos),
        total_registros: count(),
        total_estados: countDistinct(produccionPesquera.nombreEstado),
        año_inicio: min(produccionPesquera.anoCorte),
        año_fin: max(produccionPesquera.anoCorte),
      })
      .from(produccionPesquera)
      .where(and(...conditionsWithYear));
    
    // Query para tendencia de precios (sin filtro de año)
    const tendenciaPrecios = await db
      .select({
        año: produccionPesquera.anoCorte,
        precio_promedio: avg(produccionPesquera.precioPesos),
        precio_min: min(produccionPesquera.precioPesos),
        precio_max: max(produccionPesquera.precioPesos),
      })
      .from(produccionPesquera)
      .where(and(
        especieCondition,
        isNotNull(produccionPesquera.precioPesos),
        gt(produccionPesquera.precioPesos, '0')
      ))
      .groupBy(produccionPesquera.anoCorte)
      .orderBy(asc(produccionPesquera.anoCorte));
    
    const response: IndicadoresResponse = {
      especie: nombreEspecie,
      resumen,
      indicadoresAnuales,
      produccionMensual,
      produccionPorEstado,
      tendenciaPrecios,
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error en indicadores de especie:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    const stack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json({ 
      error: message,
      details: process.env.NODE_ENV === 'development' ? stack : undefined
    }, { status: 500 });
  }
}

