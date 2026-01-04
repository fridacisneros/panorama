// lib/db.js
// Configuración de conexión a PostgreSQL
import { Pool } from 'pg';

// Configuración del pool de conexiones
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'fisheries',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  max: 20, // máximo de conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Función helper para ejecutar queries
export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query ejecutada', { text: text.substring(0, 100), duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error en query:', error);
    throw error;
  }
}

// Función para obtener un cliente del pool (para transacciones)
export async function getClient() {
  const client = await pool.connect();
  return client;
}

// Cerrar el pool (útil para cleanup)
export async function closePool() {
  await pool.end();
}

export default pool;

