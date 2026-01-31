// app/api/stats/route.ts
import { db } from '@/lib/db';
import { produccionPesquera } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';
import { 
  eq, 
  and, 
  between, 
  isNotNull, 
  sql, 
  desc, 
  asc,
  gt,
  ne,
  count,
  sum,
  avg,
  min,
  max,
  countDistinct,
  type SQL
} from 'drizzle-orm';

// Mapeo de nombres de mes a número para ordenamiento
const MES_ORDER: { [key: string]: number } = {
  'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
  'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
  'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');
    const año = searchParams.get('año');
    const añoInicio = searchParams.get('añoInicio');
    const añoFin = searchParams.get('añoFin');
    const especie = searchParams.get('especie');
    const estado = searchParams.get('estado');
    const litoral = searchParams.get('litoral');
    const tipoZona = searchParams.get('tipoZona');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Helper para agregar filtros comunes
    const addCommonFilters = (conditions: SQL[]) => {
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      if (tipoZona) conditions.push(eq(produccionPesquera.tipoZona, tipoZona));
    };
    
    // Helper para agregar filtro de año
    const addYearFilter = (conditions: SQL[]) => {
      if (añoInicio && añoFin) {
        conditions.push(between(produccionPesquera.anoCorte, parseInt(añoInicio), parseInt(añoFin)));
      } else if (año) {
        conditions.push(eq(produccionPesquera.anoCorte, parseInt(año)));
      }
    };
    
    let result: unknown;
    
    // ==========================================
    // CATEGORÍA 1: ANÁLISIS DE PRODUCCIÓN
    // ==========================================
    
    // 1.1 Captura por año
    if (tipo === 'captura-anual') {
      const conditions: SQL[] = [];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          año: produccionPesquera.anoCorte,
          peso_vivo: sql<string>`COALESCE(SUM(${produccionPesquera.pesoVivoKilogramos}), 0)`,
          peso_desembarcado: sql<string>`COALESCE(SUM(${produccionPesquera.pesoDesembarcadoKilogramos}), 0)`,
          valor_total: sql<string>`COALESCE(SUM(${produccionPesquera.valorPesos}), 0)`,
          registros: count(),
        })
        .from(produccionPesquera)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .groupBy(produccionPesquera.anoCorte)
        .orderBy(asc(produccionPesquera.anoCorte));
    
    // 1.2 Captura por mes
    } else if (tipo === 'captura-mensual') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.mesCorte)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      const rawResult = await db
        .select({
          mes: produccionPesquera.mesCorte,
          peso_vivo: sum(produccionPesquera.pesoVivoKilogramos),
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.mesCorte);
      
      result = rawResult
        .map(r => ({ ...r, mes_num: r.mes ? MES_ORDER[r.mes.toLowerCase()] || 0 : 0 }))
        .sort((a, b) => (a.mes_num || 0) - (b.mes_num || 0));
    
    // 1.2b Heatmap de captura mensual por año
    } else if (tipo === 'captura-mensual-heatmap') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.mesCorte),
        isNotNull(produccionPesquera.anoCorte)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      const rawResult = await db
        .select({
          año: produccionPesquera.anoCorte,
          mes: produccionPesquera.mesCorte,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.anoCorte, produccionPesquera.mesCorte)
        .orderBy(asc(produccionPesquera.anoCorte));
      
      result = rawResult.map(r => ({
        ...r,
        mes_num: r.mes ? MES_ORDER[r.mes.toLowerCase()] || 0 : 0,
      }));
    
    // 1.3 Captura por estado
    } else if (tipo === 'captura-estado') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombreEstado)];
      addYearFilter(conditions);
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          estado: produccionPesquera.nombreEstado,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          peso_vivo: sum(produccionPesquera.pesoVivoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreEstado)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
    
    // 1.4 Top especies por peso desembarcado
    } else if (tipo === 'especies-top') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombrePrincipal)];
      addYearFilter(conditions);
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          especie: produccionPesquera.nombrePrincipal,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          peso_vivo: sum(produccionPesquera.pesoVivoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombrePrincipal)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(limit);
    
    // 1.5 Captura por litoral
    } else if (tipo === 'litorales') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.litoral)];
      addYearFilter(conditions);
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      
      result = await db
        .select({
          litoral: produccionPesquera.litoral,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          peso_vivo: sum(produccionPesquera.pesoVivoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.litoral)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
    
    // 1.6 Captura por tipo de zona
    } else if (tipo === 'tipo-zona') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.tipoZona)];
      addYearFilter(conditions);
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          tipo_zona: produccionPesquera.tipoZona,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          peso_vivo: sum(produccionPesquera.pesoVivoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.tipoZona)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
    
    // 1.7 Estacionalidad por especie (heatmap)
    } else if (tipo === 'estacionalidad') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.mesCorte),
        isNotNull(produccionPesquera.nombrePrincipal)
      ];
      addYearFilter(conditions);
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      // Obtener top especies
      const topEspecies = await db
        .select({ especie: produccionPesquera.nombrePrincipal })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombrePrincipal)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(8);
      
      const especiesNames = topEspecies.map(e => e.especie).filter(Boolean);
      
      if (especiesNames.length > 0) {
        conditions.push(sql`${produccionPesquera.nombrePrincipal} IN (${sql.join(especiesNames.map(e => sql`${e}`), sql`, `)})`);
        
        const rawResult = await db
          .select({
            especie: produccionPesquera.nombrePrincipal,
            mes: produccionPesquera.mesCorte,
            peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          })
          .from(produccionPesquera)
          .where(and(...conditions))
          .groupBy(produccionPesquera.nombrePrincipal, produccionPesquera.mesCorte);
        
        result = rawResult.map(r => ({
          ...r,
          mes_num: r.mes ? MES_ORDER[r.mes.toLowerCase()] || 0 : 0,
        }));
      } else {
        result = [];
      }
    
    // 1.8 Eficiencia pesquera
    } else if (tipo === 'eficiencia') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.diasEfectivos),
        gt(produccionPesquera.diasEfectivos, 0)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          dias_efectivos: produccionPesquera.diasEfectivos,
          peso_capturado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.diasEfectivos)
        .orderBy(asc(produccionPesquera.diasEfectivos))
        .limit(100);
    
    // 1.9 Sitios de desembarque
    } else if (tipo === 'sitios-desembarque') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombreSitioDesembarque)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          sitio: produccionPesquera.nombreSitioDesembarque,
          estado: produccionPesquera.nombreEstado,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreSitioDesembarque, produccionPesquera.nombreEstado)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(15);
    
    // 1.10 Tendencia de embarcaciones
    } else if (tipo === 'tendencia-embarcaciones') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.numeroEmbarcaciones),
        gt(produccionPesquera.numeroEmbarcaciones, 0)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          año: produccionPesquera.anoCorte,
          total_embarcaciones: sum(produccionPesquera.numeroEmbarcaciones),
          promedio_embarcaciones: avg(produccionPesquera.numeroEmbarcaciones),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.anoCorte)
        .orderBy(asc(produccionPesquera.anoCorte));
    
    // ==========================================
    // CATEGORÍA 2: ANÁLISIS ECONÓMICO
    // ==========================================
    
    // 2.1 Tendencia de precios
    } else if (tipo === 'precios-tendencia') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.precioPesos),
        gt(produccionPesquera.precioPesos, '0')
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
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
    
    // 2.2 Valor por estado
    } else if (tipo === 'valor-estado') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombreEstado)];
      addYearFilter(conditions);
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          estado: produccionPesquera.nombreEstado,
          valor_total: sum(produccionPesquera.valorPesos),
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          precio_promedio: avg(produccionPesquera.precioPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreEstado)
        .orderBy(desc(sql`SUM(${produccionPesquera.valorPesos})`));
    
    // 2.3 Precio promedio por especie
    } else if (tipo === 'precio-especie') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.nombrePrincipal),
        isNotNull(produccionPesquera.precioPesos),
        gt(produccionPesquera.precioPesos, '0')
      ];
      addYearFilter(conditions);
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          especie: produccionPesquera.nombrePrincipal,
          precio_promedio: avg(produccionPesquera.precioPesos),
          precio_min: min(produccionPesquera.precioPesos),
          precio_max: max(produccionPesquera.precioPesos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombrePrincipal)
        .orderBy(desc(sql`AVG(${produccionPesquera.precioPesos})`))
        .limit(limit);
    
    // 2.4 Precio vs Volumen (scatter)
    } else if (tipo === 'precio-volumen') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.nombrePrincipal),
        isNotNull(produccionPesquera.precioPesos),
        gt(produccionPesquera.precioPesos, '0')
      ];
      addYearFilter(conditions);
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          especie: produccionPesquera.nombrePrincipal,
          precio_promedio: avg(produccionPesquera.precioPesos),
          volumen_total: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombrePrincipal)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(50);
    
    // 2.5 Valor económico por mes
    } else if (tipo === 'valor-mensual') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.mesCorte)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      const rawResult = await db
        .select({
          mes: produccionPesquera.mesCorte,
          valor_total: sum(produccionPesquera.valorPesos),
          precio_promedio: avg(produccionPesquera.precioPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.mesCorte);
      
      result = rawResult
        .map(r => ({ ...r, mes_num: r.mes ? MES_ORDER[r.mes.toLowerCase()] || 0 : 0 }))
        .sort((a, b) => (a.mes_num || 0) - (b.mes_num || 0));
    
    // 2.6 Precio promedio por litoral
    } else if (tipo === 'precio-litoral') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.litoral),
        isNotNull(produccionPesquera.precioPesos),
        gt(produccionPesquera.precioPesos, '0')
      ];
      addYearFilter(conditions);
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      
      result = await db
        .select({
          litoral: produccionPesquera.litoral,
          precio_promedio: avg(produccionPesquera.precioPesos),
          valor_total: sum(produccionPesquera.valorPesos),
          volumen_total: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.litoral)
        .orderBy(desc(sql`AVG(${produccionPesquera.precioPesos})`));
    
    // 2.7 Top especies por valor económico
    } else if (tipo === 'especies-valor') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombrePrincipal)];
      addYearFilter(conditions);
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          especie: produccionPesquera.nombrePrincipal,
          valor_total: sum(produccionPesquera.valorPesos),
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          precio_promedio: avg(produccionPesquera.precioPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombrePrincipal)
        .orderBy(desc(sql`SUM(${produccionPesquera.valorPesos})`))
        .limit(limit);
    
    // 2.8 Variación precios interanual
    } else if (tipo === 'precios-variacion') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.precioPesos),
        gt(produccionPesquera.precioPesos, '0'),
        isNotNull(produccionPesquera.nombrePrincipal)
      ];
      addYearFilter(conditions);
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      // Top especies por volumen para comparar precios
      const topEspecies = await db
        .select({ especie: produccionPesquera.nombrePrincipal })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombrePrincipal)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(5);
      
      const especiesNames = topEspecies.map(e => e.especie).filter(Boolean);
      
      if (especiesNames.length > 0) {
        conditions.push(sql`${produccionPesquera.nombrePrincipal} IN (${sql.join(especiesNames.map(e => sql`${e}`), sql`, `)})`);
        
        result = await db
          .select({
            especie: produccionPesquera.nombrePrincipal,
            año: produccionPesquera.anoCorte,
            precio_promedio: avg(produccionPesquera.precioPesos),
          })
          .from(produccionPesquera)
          .where(and(...conditions))
          .groupBy(produccionPesquera.nombrePrincipal, produccionPesquera.anoCorte)
          .orderBy(asc(produccionPesquera.anoCorte));
      } else {
        result = [];
      }
    
    // 2.9 ROI aproximado
    } else if (tipo === 'roi') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.diasEfectivos),
        gt(produccionPesquera.diasEfectivos, 0),
        isNotNull(produccionPesquera.valorPesos)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          año: produccionPesquera.anoCorte,
          valor_total: sum(produccionPesquera.valorPesos),
          dias_totales: sum(produccionPesquera.diasEfectivos),
          embarcaciones_totales: sum(produccionPesquera.numeroEmbarcaciones),
          esfuerzo: sql<string>`SUM(${produccionPesquera.diasEfectivos} * COALESCE(${produccionPesquera.numeroEmbarcaciones}, 1))`,
          valor_por_esfuerzo: sql<string>`SUM(${produccionPesquera.valorPesos}) / NULLIF(SUM(${produccionPesquera.diasEfectivos} * COALESCE(${produccionPesquera.numeroEmbarcaciones}, 1)), 0)`,
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.anoCorte)
        .orderBy(asc(produccionPesquera.anoCorte));
    
    // ==========================================
    // CATEGORÍA 3: ANÁLISIS OPERATIVO
    // ==========================================
    
    // 3.1 Top unidades económicas
    } else if (tipo === 'unidades-economicas') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.unidadEconomica)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          unidad: produccionPesquera.unidadEconomica,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.unidadEconomica)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(15);
    
    // 3.1b Unidades económicas por estado
    } else if (tipo === 'ue-por-estado') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.unidadEconomica),
        isNotNull(produccionPesquera.nombreEstado)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          estado: produccionPesquera.nombreEstado,
          num_ue: countDistinct(produccionPesquera.rnpaUnidadEconomica),
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreEstado)
        .orderBy(desc(sql`COUNT(DISTINCT ${produccionPesquera.rnpaUnidadEconomica})`));
    
    // 3.1c Tendencia de UE activas por año
    } else if (tipo === 'ue-tendencia') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.unidadEconomica)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          año: produccionPesquera.anoCorte,
          num_ue: countDistinct(produccionPesquera.rnpaUnidadEconomica),
          num_embarcaciones: sum(produccionPesquera.numeroEmbarcaciones),
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.anoCorte)
        .orderBy(asc(produccionPesquera.anoCorte));
    
    // 3.1d Pareto de Unidades Económicas (concentración)
    } else if (tipo === 'pareto-ue') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.unidadEconomica)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      const ues = await db
        .select({
          unidad: produccionPesquera.unidadEconomica,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.unidadEconomica)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
      
      const total = ues.reduce((sum, e) => sum + parseFloat(e.peso_desembarcado || '0'), 0);
      let acumulado = 0;
      result = ues.slice(0, 30).map((e, i) => {
        acumulado += parseFloat(e.peso_desembarcado || '0');
        return {
          unidad: e.unidad,
          peso_desembarcado: e.peso_desembarcado,
          porcentaje: ((parseFloat(e.peso_desembarcado || '0') / total) * 100).toFixed(2),
          porcentaje_acumulado: ((acumulado / total) * 100).toFixed(2),
          posicion: i + 1,
        };
      });
    
    // 3.1e Distribución de tamaño de flota
    } else if (tipo === 'distribucion-flota') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.numeroEmbarcaciones),
        gt(produccionPesquera.numeroEmbarcaciones, 0)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          rango: sql<string>`CASE 
            WHEN ${produccionPesquera.numeroEmbarcaciones} = 1 THEN '1 embarcación'
            WHEN ${produccionPesquera.numeroEmbarcaciones} BETWEEN 2 AND 5 THEN '2-5 embarcaciones'
            WHEN ${produccionPesquera.numeroEmbarcaciones} BETWEEN 6 AND 10 THEN '6-10 embarcaciones'
            ELSE '11+ embarcaciones'
          END`,
          cantidad: count(),
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(sql`CASE 
            WHEN ${produccionPesquera.numeroEmbarcaciones} = 1 THEN '1 embarcación'
            WHEN ${produccionPesquera.numeroEmbarcaciones} BETWEEN 2 AND 5 THEN '2-5 embarcaciones'
            WHEN ${produccionPesquera.numeroEmbarcaciones} BETWEEN 6 AND 10 THEN '6-10 embarcaciones'
            ELSE '11+ embarcaciones'
          END`)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
    
    // 3.2 Duración promedio de viajes
    } else if (tipo === 'duracion-viajes') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.duracion),
        gt(produccionPesquera.duracion, 0),
        isNotNull(produccionPesquera.tipoZona)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          tipo_zona: produccionPesquera.tipoZona,
          duracion_promedio: avg(produccionPesquera.duracion),
          duracion_min: min(produccionPesquera.duracion),
          duracion_max: max(produccionPesquera.duracion),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.tipoZona)
        .orderBy(desc(sql`AVG(${produccionPesquera.duracion})`));
    
    // 3.3 Distribución de tipos de aviso
    } else if (tipo === 'tipos-aviso') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.tipoAviso)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          tipo_aviso: produccionPesquera.tipoAviso,
          cantidad: count(),
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.tipoAviso)
        .orderBy(desc(count()));
    
    // 3.3b Distribución por origen
    } else if (tipo === 'distribucion-origen') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.origen)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          origen: produccionPesquera.origen,
          cantidad: count(),
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.origen)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
    
    // 3.4 Eficiencia por flota
    } else if (tipo === 'eficiencia-flota') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.numeroEmbarcaciones),
        gt(produccionPesquera.numeroEmbarcaciones, 0)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          embarcaciones: produccionPesquera.numeroEmbarcaciones,
          peso_total: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          peso_promedio_por_embarcacion: sql<string>`SUM(${produccionPesquera.pesoDesembarcadoKilogramos}) / ${produccionPesquera.numeroEmbarcaciones}`,
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.numeroEmbarcaciones)
        .orderBy(asc(produccionPesquera.numeroEmbarcaciones))
        .limit(50);
    
    // 3.5 Lugares de captura más productivos
    } else if (tipo === 'lugares-captura') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombreLugarCaptura)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          lugar: produccionPesquera.nombreLugarCaptura,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreLugarCaptura)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(15);
    
    // 3.6 Actividad por oficina
    } else if (tipo === 'actividad-oficina') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombreOficina)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          oficina: produccionPesquera.nombreOficina,
          estado: produccionPesquera.nombreEstado,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreOficina, produccionPesquera.nombreEstado)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(15);
    
    // 3.7 Comparativa acuacultural vs captura
    } else if (tipo === 'acuacultural-vs-captura') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.produccionAcuacultural)];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          tipo: produccionPesquera.produccionAcuacultural,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.produccionAcuacultural)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
    
    // ==========================================
    // CATEGORÍA 4: ANÁLISIS DE ESPECIES
    // ==========================================
    
    // 4.1 Biodiversidad capturada
    } else if (tipo === 'biodiversidad') {
      const conditions: SQL[] = [];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          año: produccionPesquera.anoCorte,
          num_especies: countDistinct(produccionPesquera.nombrePrincipal),
          num_estados: countDistinct(produccionPesquera.nombreEstado),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .groupBy(produccionPesquera.anoCorte)
        .orderBy(asc(produccionPesquera.anoCorte));
    
    // 4.2 Especies principales por región
    } else if (tipo === 'especies-region') {
      const region = estado || litoral;
      if (!region) {
        result = [];
      } else {
        const conditions: SQL[] = [isNotNull(produccionPesquera.nombrePrincipal)];
        addYearFilter(conditions);
        if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
        if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
        
        result = await db
          .select({
            especie: produccionPesquera.nombrePrincipal,
            peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
            valor_total: sum(produccionPesquera.valorPesos),
            registros: count(),
          })
          .from(produccionPesquera)
          .where(and(...conditions))
          .groupBy(produccionPesquera.nombrePrincipal)
          .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
          .limit(10);
      }
    
    // 4.3 Relación peso desembarcado vs peso vivo
    } else if (tipo === 'peso-desembarcado-vs-vivo') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.nombrePrincipal),
        isNotNull(produccionPesquera.pesoDesembarcadoKilogramos),
        isNotNull(produccionPesquera.pesoVivoKilogramos),
        gt(produccionPesquera.pesoDesembarcadoKilogramos, '0'),
        gt(produccionPesquera.pesoVivoKilogramos, '0')
      ];
      addYearFilter(conditions);
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          especie: produccionPesquera.nombrePrincipal,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          peso_vivo: sum(produccionPesquera.pesoVivoKilogramos),
          ratio: sql<string>`SUM(${produccionPesquera.pesoDesembarcadoKilogramos}) / NULLIF(SUM(${produccionPesquera.pesoVivoKilogramos}), 0)`,
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombrePrincipal)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(20);
    
    // 4.4 Concentración de captura (Pareto)
    } else if (tipo === 'pareto-especies') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombrePrincipal)];
      addYearFilter(conditions);
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      const especies = await db
        .select({
          especie: produccionPesquera.nombrePrincipal,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombrePrincipal)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
      
      // Calcular acumulado
      const total = especies.reduce((sum, e) => sum + parseFloat(e.peso_desembarcado || '0'), 0);
      let acumulado = 0;
      result = especies.slice(0, 30).map((e, i) => {
        acumulado += parseFloat(e.peso_desembarcado || '0');
        return {
          especie: e.especie,
          peso_desembarcado: e.peso_desembarcado,
          porcentaje: ((parseFloat(e.peso_desembarcado || '0') / total) * 100).toFixed(2),
          porcentaje_acumulado: ((acumulado / total) * 100).toFixed(2),
          posicion: i + 1,
        };
      });
    
    // ==========================================
    // CATEGORÍA 5: ANÁLISIS GEOGRÁFICO
    // ==========================================
    
    // 5.1 Producción por estado (para mapa)
    } else if (tipo === 'mapa-estados') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.nombreEstado)];
      addYearFilter(conditions);
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      result = await db
        .select({
          estado: produccionPesquera.nombreEstado,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
          num_especies: countDistinct(produccionPesquera.nombrePrincipal),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreEstado)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`));
    
    // 5.2 Flujo origen-captura-desembarque
    } else if (tipo === 'flujo-geografico') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.origen),
        isNotNull(produccionPesquera.nombreSitioDesembarque)
      ];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      result = await db
        .select({
          origen: produccionPesquera.origen,
          lugar_captura: produccionPesquera.nombreLugarCaptura,
          sitio_desembarque: produccionPesquera.nombreSitioDesembarque,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          registros: count(),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(
          produccionPesquera.origen, 
          produccionPesquera.nombreLugarCaptura, 
          produccionPesquera.nombreSitioDesembarque
        )
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(20);
    
    // 5.3 Comparativa costera por año
    } else if (tipo === 'comparativa-costera') {
      const conditions: SQL[] = [isNotNull(produccionPesquera.litoral)];
      addYearFilter(conditions);
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (estado) conditions.push(eq(produccionPesquera.nombreEstado, estado));
      
      result = await db
        .select({
          año: produccionPesquera.anoCorte,
          litoral: produccionPesquera.litoral,
          peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total: sum(produccionPesquera.valorPesos),
        })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.anoCorte, produccionPesquera.litoral)
        .orderBy(asc(produccionPesquera.anoCorte));
    
    // 5.4 Migración de zonas (temporal-espacial)
    } else if (tipo === 'migracion-zonas') {
      const conditions: SQL[] = [
        isNotNull(produccionPesquera.nombreEstado),
        isNotNull(produccionPesquera.mesCorte)
      ];
      addYearFilter(conditions);
      if (especie) conditions.push(eq(produccionPesquera.nombrePrincipal, especie));
      if (litoral) conditions.push(eq(produccionPesquera.litoral, litoral));
      
      // Top 5 estados
      const topEstados = await db
        .select({ estado: produccionPesquera.nombreEstado })
        .from(produccionPesquera)
        .where(and(...conditions))
        .groupBy(produccionPesquera.nombreEstado)
        .orderBy(desc(sql`SUM(${produccionPesquera.pesoDesembarcadoKilogramos})`))
        .limit(5);
      
      const estadosNames = topEstados.map(e => e.estado).filter(Boolean);
      
      if (estadosNames.length > 0) {
        conditions.push(sql`${produccionPesquera.nombreEstado} IN (${sql.join(estadosNames.map(e => sql`${e}`), sql`, `)})`);
        
        const rawResult = await db
          .select({
            estado: produccionPesquera.nombreEstado,
            mes: produccionPesquera.mesCorte,
            peso_desembarcado: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          })
          .from(produccionPesquera)
          .where(and(...conditions))
          .groupBy(produccionPesquera.nombreEstado, produccionPesquera.mesCorte);
        
        result = rawResult.map(r => ({
          ...r,
          mes_num: r.mes ? MES_ORDER[r.mes.toLowerCase()] || 0 : 0,
        }));
      } else {
        result = [];
      }
    
    // ==========================================
    // UTILIDADES
    // ==========================================
    
    // Resumen general
    } else if (tipo === 'resumen') {
      const conditions: SQL[] = [];
      addYearFilter(conditions);
      addCommonFilters(conditions);
      
      const [resumen] = await db
        .select({
          total_registros: count(),
          total_especies: countDistinct(produccionPesquera.nombrePrincipal),
          total_estados: countDistinct(produccionPesquera.nombreEstado),
          total_unidades_economicas: countDistinct(produccionPesquera.rnpaUnidadEconomica),
          captura_total_kg: sum(produccionPesquera.pesoDesembarcadoKilogramos),
          valor_total_pesos: sum(produccionPesquera.valorPesos),
          año_inicio: min(produccionPesquera.anoCorte),
          año_fin: max(produccionPesquera.anoCorte),
        })
        .from(produccionPesquera)
        .where(conditions.length > 0 ? and(...conditions) : undefined);
      
      result = resumen;
    
    // Filtros disponibles
    } else if (tipo === 'filtros') {
      const [años, estados, especies, litorales, tiposZona] = await Promise.all([
        db.selectDistinct({ año: produccionPesquera.anoCorte })
          .from(produccionPesquera)
          .where(isNotNull(produccionPesquera.anoCorte))
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
        db.selectDistinct({ tipoZona: produccionPesquera.tipoZona })
          .from(produccionPesquera)
          .where(isNotNull(produccionPesquera.tipoZona))
          .orderBy(asc(produccionPesquera.tipoZona)),
      ]);
      
      result = {
        años: años.map(r => r.año),
        estados: estados.map(r => r.estado),
        especies: especies.map(r => r.especie),
        litorales: litorales.map(r => r.litoral),
        tiposZona: tiposZona.map(r => r.tipoZona),
      };
      
    } else {
      return NextResponse.json({ error: 'Tipo de consulta no válido' }, { status: 400 });
    }
    
    return NextResponse.json({ data: result });
    
  } catch (error) {
    console.error('Error en stats:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    const stack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json({ 
      error: message,
      details: process.env.NODE_ENV === 'development' ? stack : undefined
    }, { status: 500 });
  }
}
