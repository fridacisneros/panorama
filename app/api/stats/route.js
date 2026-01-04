// app/api/stats/route.js
import { db, schema } from '@/lib/db';
import { produccionPesquera } from '@/lib/schema';
import { NextResponse } from 'next/server';
import { 
  eq, 
  and, 
  between, 
  ilike, 
  isNotNull, 
  sql, 
  desc, 
  asc,
  gt,
  count,
  sum,
  avg,
  min,
  max,
  countDistinct
} from 'drizzle-orm';

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
      // Construir condiciones dinámicamente
      const conditions = [];
      
      if (añoInicio && añoFin) {
        conditions.push(between(produccionPesquera.anoCorte, parseInt(añoInicio), parseInt(añoFin)));
      }
      if (especie) {
        conditions.push(ilike(produccionPesquera.nombrePrincipal, `%${especie}%`));
      }
      if (estado) {
        conditions.push(ilike(produccionPesquera.nombreEstado, `%${estado}%`));
      }
      
      result = await db
        .select({
          año: produccionPesquera.anoCorte,
          total: sql`COALESCE(SUM(${produccionPesquera.pesoVivoKilogramos}), 0)`,
          valor_total: sql`COALESCE(SUM(${produccionPesquera.valorPesos}), 0)`,
          registros: count(),
        })
        .from(produccionPesquera)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .groupBy(produccionPesquera.anoCorte)
        .orderBy(asc(produccionPesquera.anoCorte));
      
    } else if (tipo === 'captura-mensual') {
      const conditions = [isNotNull(produccionPesquera.mesCorte)];
      
      if (año) {
        conditions.push(eq(produccionPesquera.anoCorte, parseInt(año)));
      }
      if (especie) {
        conditions.push(ilike(produccionPesquera.nombrePrincipal, `%${especie}%`));
      }
      if (estado) {
        conditions.push(ilike(produccionPesquera.nombreEstado, `%${estado}%`));
      }
      
      result = await db
        .select({
          mes: produccionPesquera.mesCorte,
          promedio: avg(produccionPesquera.pesoVivoKilogramos),
          total: sum(produccionPesquera.pesoVivoKilogramos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.mesCorte)
        .orderBy(asc(produccionPesquera.mesCorte));
      
    } else if (tipo === 'precios') {
      const conditions = [
        isNotNull(produccionPesquera.precioPesos),
        gt(produccionPesquera.precioPesos, '0')
      ];
      
      if (añoInicio && añoFin) {
        conditions.push(between(produccionPesquera.anoCorte, parseInt(añoInicio), parseInt(añoFin)));
      }
      if (especie) {
        conditions.push(ilike(produccionPesquera.nombrePrincipal, `%${especie}%`));
      }
      if (estado) {
        conditions.push(ilike(produccionPesquera.nombreEstado, `%${estado}%`));
      }
      
      result = await db
        .select({
          año: produccionPesquera.anoCorte,
          precio_promedio: avg(produccionPesquera.precioPesos),
          precio_min: min(produccionPesquera.precioPesos),
          precio_max: max(produccionPesquera.precioPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.anoCorte)
        .orderBy(asc(produccionPesquera.anoCorte));
      
    } else if (tipo === 'especies-top') {
      const conditions = [
        sql`(${produccionPesquera.nombrePrincipal} IS NOT NULL OR ${produccionPesquera.nombreEspecie} IS NOT NULL)`
      ];
      
      if (año) {
        conditions.push(eq(produccionPesquera.anoCorte, parseInt(año)));
      }
      if (estado) {
        conditions.push(ilike(produccionPesquera.nombreEstado, `%${estado}%`));
      }
      
      result = await db
        .select({
          especie: sql`COALESCE(${produccionPesquera.nombrePrincipal}, ${produccionPesquera.nombreEspecie})`,
          total_captura: sum(produccionPesquera.pesoVivoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(sql`COALESCE(${produccionPesquera.nombrePrincipal}, ${produccionPesquera.nombreEspecie})`)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoVivoKilogramos})`))
        .limit(10);
      
    } else if (tipo === 'estados-top') {
      const conditions = [isNotNull(produccionPesquera.nombreEstado)];
      
      if (año) {
        conditions.push(eq(produccionPesquera.anoCorte, parseInt(año)));
      }
      if (especie) {
        conditions.push(ilike(produccionPesquera.nombrePrincipal, `%${especie}%`));
      }
      
      result = await db
        .select({
          estado: produccionPesquera.nombreEstado,
          total_captura: sum(produccionPesquera.pesoVivoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreEstado)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoVivoKilogramos})`))
        .limit(10);
      
    } else if (tipo === 'litorales') {
      const conditions = [isNotNull(produccionPesquera.litoral)];
      
      if (año) {
        conditions.push(eq(produccionPesquera.anoCorte, parseInt(año)));
      }
      
      result = await db
        .select({
          litoral: produccionPesquera.litoral,
          total_captura: sum(produccionPesquera.pesoVivoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.litoral)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoVivoKilogramos})`));
      
    } else if (tipo === 'resumen') {
      const [resumen] = await db
        .select({
          total_registros: count(),
          total_especies: countDistinct(produccionPesquera.nombrePrincipal),
          total_estados: countDistinct(produccionPesquera.nombreEstado),
          captura_total_kg: sum(produccionPesquera.pesoVivoKilogramos),
          valor_total_pesos: sum(produccionPesquera.valorPesos),
          año_inicio: min(produccionPesquera.anoCorte),
          año_fin: max(produccionPesquera.anoCorte),
        })
        .from(produccionPesquera);
      
      result = resumen;
      
    } else if (tipo === 'filtros') {
      const [años, estados, especies, litorales] = await Promise.all([
        db.selectDistinct({ año: produccionPesquera.anoCorte })
          .from(produccionPesquera)
          .orderBy(asc(produccionPesquera.anoCorte)),
        db.selectDistinct({ estado: produccionPesquera.nombreEstado })
          .from(produccionPesquera)
          .where(isNotNull(produccionPesquera.nombreEstado))
          .orderBy(asc(produccionPesquera.nombreEstado)),
        db.selectDistinct({ especie: produccionPesquera.nombrePrincipal })
          .from(produccionPesquera)
          .where(isNotNull(produccionPesquera.nombrePrincipal))
          .orderBy(asc(produccionPesquera.nombrePrincipal)),
        db.selectDistinct({ litoral: produccionPesquera.litoral })
          .from(produccionPesquera)
          .where(isNotNull(produccionPesquera.litoral))
          .orderBy(asc(produccionPesquera.litoral)),
      ]);
      
      result = {
        años: años.map(r => r.año),
        estados: estados.map(r => r.estado),
        especies: especies.map(r => r.especie),
        litorales: litorales.map(r => r.litoral),
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
